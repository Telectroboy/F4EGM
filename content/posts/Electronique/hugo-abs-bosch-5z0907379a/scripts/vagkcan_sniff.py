#!/usr/bin/env python3
"""
Native Linux sniffer for the classic VAG K+CAN Commander cable
(FT232R + PIC18F25K80/PIC18F2580 style), reverse-engineered from
HUD ECU Hacker 6.1 supplied by the user.

Default target:
  /dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A75OBPRN-if00-port0

The adapter protocol used here is binary over the FT232R UART:
  host -> adapter: [command][payload_length][payload...]
  adapter -> host: [command][payload_length][payload...]

Important commands recovered from HUD ECU Hacker 6.1:
  0x52 GetFilters
  0x53 SetFilters
  0x54 GetErrors
  0x55 SetBrgCon
  0x60 Transmit
  0x70 Receive (asynchronous CAN frame event)
  0xC0 SetBaud500 (legacy convenience command)

HUD sets the FT232R-side UART to 830000 baud and resets the PIC with
DTR low -> 50 ms -> DTR high, then RTS high.

This first tool is deliberately conservative: it configures CAN 500 kbit/s,
backs up the adapter's current acceptance filters, opens all STANDARD 11-bit
filters, sniffs, then restores the original filters on clean exit.
"""

from __future__ import annotations

import argparse
import os
import signal
import sys
import time
from dataclasses import dataclass
from typing import Optional

try:
    import serial
except ImportError:
    serial = None

DEFAULT_DEVICE = "/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A75OBPRN-if00-port0"
UART_BAUD = 830_000

CMD_GET_FILTERS = 0x52
CMD_SET_FILTERS = 0x53
CMD_GET_ERRORS = 0x54
CMD_SET_BRGCON = 0x55
CMD_TRANSMIT = 0x60
CMD_RECEIVE = 0x70
CMD_SET_BAUD500 = 0xC0

KNOWN_CMDS = {
    0x51,
    CMD_GET_FILTERS,
    CMD_SET_FILTERS,
    CMD_GET_ERRORS,
    CMD_SET_BRGCON,
    CMD_TRANSMIT,
    CMD_RECEIVE,
    CMD_SET_BAUD500,
}


@dataclass
class Message:
    cmd: int
    payload: bytes


class StreamParser:
    def __init__(self) -> None:
        self.buf = bytearray()
        self.dropped = 0

    def feed(self, data: bytes) -> list[Message]:
        self.buf.extend(data)
        out: list[Message] = []

        while len(self.buf) >= 2:
            cmd = self.buf[0]
            length = self.buf[1]

            # Re-sync conservatively if we land in junk. Known command
            # responses/events have small payloads; GetFilters is 32 bytes.
            if cmd not in KNOWN_CMDS or length > 64:
                self.buf.pop(0)
                self.dropped += 1
                continue

            total = 2 + length
            if len(self.buf) < total:
                break

            payload = bytes(self.buf[2:total])
            del self.buf[:total]
            out.append(Message(cmd, payload))

        return out


def encode_std_id(can_id: int, *, rtr: bool = False, mask: bool = False) -> bytes:
    if not 0 <= can_id <= 0x7FF:
        raise ValueError("11-bit CAN ID out of range")

    x = (can_id & 0x7FF) << 18
    low = x & 0x001FFFFF
    high = x & ~0x001FFFFF
    packed = ((high << 3) & 0xFFFFFFFF) | low

    if rtr:
        packed |= 0x00800000
    if mask:
        packed |= 0x00400000

    return packed.to_bytes(4, "big")


def decode_std_id(raw4: bytes) -> tuple[int, bool, int]:
    if len(raw4) != 4:
        raise ValueError("encoded ID must be exactly 4 bytes")

    packed = int.from_bytes(raw4, "big")
    low = packed & 0x001FFFFF
    high = packed & 0xFF000000
    rtr = bool(packed & 0x00800000)
    x = (high >> 3) | low
    can_id = (x >> 18) & 0x7FF
    return can_id, rtr, packed


def make_accept_all_standard_filters() -> bytes:
    # Six acceptance filters followed by two masks, exactly as HUD's
    # SetFilters method builds the 32-byte payload. For standard CAN mode,
    # ID 0 in all filters + ID 0 mask entries yields the broadest filter set
    # used by this script.
    payload = bytearray()
    for _ in range(6):
        payload += encode_std_id(0, mask=False)
    for _ in range(2):
        payload += encode_std_id(0, mask=True)
    assert len(payload) == 32
    return bytes(payload)


class VagKCan:
    def __init__(self, device: str, verbose: bool = False) -> None:
        self.device = device
        self.verbose = verbose
        self.ser: Optional[serial.Serial] = None
        self.parser = StreamParser()
        self.original_filters: Optional[bytes] = None
        self.frames = 0
        self.by_id: dict[int, int] = {}
        self.start_monotonic = 0.0
        self.capture_file = None

    def log(self, msg: str) -> None:
        print(msg, flush=True)

    def open(self) -> None:
        self.ser = serial.Serial(
            self.device,
            baudrate=UART_BAUD,
            bytesize=8,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            timeout=0.03,
            write_timeout=1.0,
            xonxoff=False,
            rtscts=False,
            dsrdtr=False,
        )

        # Match HUD ECU Hacker's adapter reset sequence.
        self.ser.dtr = False
        time.sleep(0.050)
        self.ser.dtr = True
        self.ser.rts = True
        time.sleep(0.080)
        self.ser.reset_input_buffer()
        self.ser.reset_output_buffer()

    def close(self) -> None:
        if not self.ser:
            return
        try:
            self.ser.rts = False
            self.ser.dtr = False
        except Exception:
            pass
        try:
            self.ser.close()
        except Exception:
            pass
        self.ser = None

    def send(self, cmd: int, payload: bytes = b"") -> None:
        if self.ser is None:
            raise RuntimeError("serial port not open")
        if len(payload) > 255:
            raise ValueError("payload too long")
        pkt = bytes((cmd, len(payload))) + payload
        if self.verbose:
            self.log(f"TX {pkt.hex(' ').upper()}")
        self.ser.write(pkt)
        self.ser.flush()

    def _read_messages_once(self) -> list[Message]:
        if self.ser is None:
            return []
        data = self.ser.read(4096)
        if not data:
            return []
        if self.verbose:
            self.log(f"RXRAW {data.hex(' ').upper()}")
        return self.parser.feed(data)

    def _handle_async(self, msg: Message, *, print_frame: bool = True) -> None:
        if msg.cmd != CMD_RECEIVE:
            if self.verbose:
                self.log(
                    f"ASYNC cmd=0x{msg.cmd:02X} len={len(msg.payload)} "
                    f"data={msg.payload.hex(' ').upper()}"
                )
            return

        if len(msg.payload) < 4:
            if self.verbose:
                self.log(
                    f"RX CAN event court: len={len(msg.payload)} "
                    f"data={msg.payload.hex(' ').upper()}"
                )
            return

        can_id, rtr, packed = decode_std_id(msg.payload[:4])
        data = msg.payload[4:]
        self.frames += 1
        self.by_id[can_id] = self.by_id.get(can_id, 0) + 1
        ts = time.time()

        flags = "R" if rtr else ""
        line = (
            f"({ts:.6f}) can0 {can_id:03X}#{data.hex().upper()}"
            f"{(' ' + flags) if flags else ''}"
        )

        if print_frame:
            self.log(line)
        if self.capture_file is not None:
            self.capture_file.write(line + "\n")
            self.capture_file.flush()

        if self.verbose:
            self.log(f"    encoded-id=0x{packed:08X}")

    def wait_response(self, expected_cmd: int, timeout: float) -> Optional[bytes]:
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            for msg in self._read_messages_once():
                if msg.cmd == expected_cmd:
                    if self.verbose:
                        self.log(
                            f"RESP 0x{msg.cmd:02X} len={len(msg.payload)} "
                            f"{msg.payload.hex(' ').upper()}"
                        )
                    return msg.payload
                self._handle_async(msg)
        return None

    def command(self, cmd: int, payload: bytes = b"", timeout: float = 0.4) -> Optional[bytes]:
        self.send(cmd, payload)
        return self.wait_response(cmd, timeout)

    def set_can_500k(self) -> None:
        # Exact HUD 6.1 path at 500 kbit/s:
        #   SetBrgCon (0x55), payload = 01 FA 07
        response = self.command(CMD_SET_BRGCON, bytes.fromhex("01 FA 07"), timeout=0.5)
        if response is not None:
            self.log(
                "CAN 500 kbit/s: commande 0x55 acceptee"
                + (f" (reponse {response.hex(' ').upper()})" if response else "")
            )
            return

        # Fallback present in the same protocol enum for older firmware.
        self.log("Pas de reponse a 0x55; essai du raccourci firmware 0xC0...")
        response = self.command(CMD_SET_BAUD500, b"", timeout=0.5)
        if response is None:
            raise RuntimeError(
                "aucune reponse du PIC aux commandes CAN 500 kbit/s (0x55 et 0xC0)"
            )
        self.log(
            "CAN 500 kbit/s: commande 0xC0 acceptee"
            + (f" (reponse {response.hex(' ').upper()})" if response else "")
        )

    def get_filters(self) -> Optional[bytes]:
        return self.command(CMD_GET_FILTERS, b"", timeout=0.5)

    def set_filters(self, payload: bytes) -> bool:
        if len(payload) != 32:
            raise ValueError("SetFilters requires exactly 32 bytes")
        return self.command(CMD_SET_FILTERS, payload, timeout=0.5) is not None

    def get_errors(self) -> Optional[bytes]:
        return self.command(CMD_GET_ERRORS, b"", timeout=0.4)

    def sniff(self, duration: float) -> None:
        self.start_monotonic = time.monotonic()
        deadline = None if duration <= 0 else self.start_monotonic + duration

        self.log("")
        self.log("=== CAPTURE CAN ACTIVE ===")
        self.log("Le K+CAN est configure en 11 bits / 500 kbit/s.")
        self.log("Tu peux maintenant couper/remettre l'alimentation de l'ABS si necessaire.")
        self.log("Ctrl-C pour arreter." if duration <= 0 else f"Duree: {duration:g} s")
        self.log("")

        while deadline is None or time.monotonic() < deadline:
            for msg in self._read_messages_once():
                self._handle_async(msg)

    def summary(self) -> None:
        elapsed = max(time.monotonic() - self.start_monotonic, 1e-9)
        self.log("")
        self.log("=== RESUME ===")
        self.log(f"Trames CAN recues: {self.frames}")
        if self.parser.dropped:
            self.log(f"Octets ignores pendant resynchronisation: {self.parser.dropped}")
        if not self.by_id:
            self.log("Aucun ID CAN recu.")
            return
        self.log("ID    trames    freq. approx.")
        for can_id, count in sorted(self.by_id.items()):
            self.log(f"{can_id:03X}   {count:6d}    {count / elapsed:8.2f} Hz")


def selftest() -> None:
    raw = encode_std_id(0x123)
    if raw != bytes.fromhex("24 0C 00 00"):
        raise AssertionError(f"encode 0x123 -> {raw.hex()} (expected 240c0000)")
    can_id, rtr, _ = decode_std_id(raw)
    if can_id != 0x123 or rtr:
        raise AssertionError("decode standard CAN ID failed")
    f = make_accept_all_standard_filters()
    if len(f) != 32:
        raise AssertionError("filter payload size")
    print("SELFTEST OK")
    print("0x123 ->", raw.hex(" ").upper())
    print("accept-all filters ->", f.hex(" ").upper())


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Sniff CAN 11-bit/500k via VAG K+CAN Commander on Linux"
    )
    ap.add_argument("--device", default=DEFAULT_DEVICE, help="serial device/by-id")
    ap.add_argument(
        "--duration",
        type=float,
        default=20.0,
        help="capture duration in seconds; <=0 means until Ctrl-C (default: 20)",
    )
    ap.add_argument(
        "--capture",
        default="",
        help="optional candump-like output file",
    )
    ap.add_argument(
        "--no-set-filters",
        action="store_true",
        help="leave adapter acceptance filters unchanged",
    )
    ap.add_argument("--verbose", action="store_true", help="show raw adapter traffic")
    ap.add_argument("--selftest", action="store_true", help="run codec self-test and exit")
    args = ap.parse_args()

    if args.selftest:
        selftest()
        return 0

    if serial is None:
        print("ERREUR: module Python 'serial' absent.", file=sys.stderr)
        print("Installe-le avec: sudo apt install python3-serial", file=sys.stderr)
        return 2

    if not os.path.exists(args.device):
        print(f"ERREUR: interface absente: {args.device}", file=sys.stderr)
        return 2

    vk = VagKCan(args.device, verbose=args.verbose)

    stop = False

    def on_signal(signum, frame):
        nonlocal stop
        stop = True
        raise KeyboardInterrupt

    signal.signal(signal.SIGINT, on_signal)
    signal.signal(signal.SIGTERM, on_signal)

    try:
        vk.log("=== VAG K+CAN natif Linux ===")
        vk.log(f"Interface : {args.device}")
        vk.log(f"UART FTDI : {UART_BAUD} bit/s")
        vk.open()
        vk.log("PIC reset: DTR 0 -> 50 ms -> DTR 1, RTS 1")

        vk.set_can_500k()

        current = vk.get_filters()
        if current is None:
            vk.log("Filtres actuels: aucune reponse a GetFilters (0x52)")
        else:
            vk.log(f"Filtres actuels ({len(current)} o): {current.hex(' ').upper()}")
            if len(current) == 32:
                vk.original_filters = current

        if not args.no_set_filters:
            broad = make_accept_all_standard_filters()
            if vk.set_filters(broad):
                vk.log("Filtres: acceptation large des IDs standard 11 bits appliquee")
            else:
                vk.log("AVERTISSEMENT: pas de reponse a SetFilters (0x53)")

        errs = vk.get_errors()
        if errs is not None:
            vk.log(
                f"Etat erreurs adaptateur ({len(errs)} o): "
                f"{errs.hex(' ').upper() if errs else '<vide>'}"
            )

        if args.capture:
            vk.capture_file = open(args.capture, "w", encoding="ascii")
            vk.log(f"Capture fichier: {args.capture}")

        vk.sniff(args.duration)

    except KeyboardInterrupt:
        vk.log("\nArret demande.")
    except serial.SerialException as e:
        vk.log(f"ERREUR serie: {e}")
        return 3
    except Exception as e:
        vk.log(f"ERREUR: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        return 4
    finally:
        try:
            if vk.original_filters is not None and not args.no_set_filters and vk.ser:
                if vk.set_filters(vk.original_filters):
                    vk.log("Filtres d'origine restaures")
                else:
                    vk.log("AVERTISSEMENT: restauration des filtres non confirmee")
        except Exception as e:
            vk.log(f"AVERTISSEMENT restauration filtres: {e}")
        if vk.capture_file is not None:
            vk.capture_file.close()
        if vk.start_monotonic:
            vk.summary()
        vk.close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
