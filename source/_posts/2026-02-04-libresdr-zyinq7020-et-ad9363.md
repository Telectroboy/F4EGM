---
title: "LibreSDR Zyinq7020 et AD9363"
date: 2026-02-04 12:00:00
categories: SDR
tags: [forum, f4egm]
---

### Message par Anonyme, 2026-02-04

Achat sur AliExpress :
[https://fr.aliexpress.com/item/1005007975697734.html](https://fr.aliexpress.com/item/1005007975697734.html)
Chez OpenSourceSDRLab pour 140€ avec un bon nouvelle année Réception avec un Linux Linaro 14.04 : Code: `root@analog:/# ls bin dev home lost+found mnt proc run share sys usr boot etc lib media opt root sbin srv tmp var root@analog:/# * Setting up X socket directories... [ OK ] * STARTDISTCC is set to false in /etc/default/distcc * /usr/bin/distccd not starting * Starting IIO Daemon iiod [fail] uname -a Linux analog 4.19.0 #1 SMP PREEMPT Wed Jun 12 13:06:56 UTC 2024 armv7l armv7l ar mv7l GNU/Linux root@analog:/# cat /proc/version Linux version 4.19.0 (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP PREEMPT Wed Jun 12 13:06:56 UTC 2024 root@analog:/# cat /etc/os-release NAME="Linaro" VERSION="14.04" ID=linaro ID_LIKE=debian PRETTY_NAME="Linaro 14.04" VERSION_ID="14.04" HOME_URL="http://www.linaro.org/" SUPPORT_URL="http://linaro.zendesk.com/" BUG_REPORT_URL="http://bugs.launchpad.net/linaro-ubuntu" root@analog:/# cat /proc/cpuinfo processor : 0 model name : ARMv7 Processor rev 0 (v7l) BogoMIPS : 650.00 Features : half thumb fastmult vfp edsp neon vfpv3 tls vfpd32 CPU implementer : 0x41 CPU architecture: 7 CPU variant : 0x3 CPU part : 0xc09 CPU revision : 0 processor : 1 model name : ARMv7 Processor rev 0 (v7l) BogoMIPS : 650.00 Features : half thumb fastmult vfp edsp neon vfpv3 tls vfpd32 CPU implementer : 0x41 CPU architecture: 7 CPU variant : 0x3 CPU part : 0xc09 CPU revision : 0 Hardware : Xilinx Zynq Platform Revision : 0003 Serial : 0000000000000000 root@analog:/#` Test avec SDRConsole OK, réception et émission via port ethernet, plutot lent si bande passante de 10Mhz ok avec 5MHz Intégration avec OpenWebRX+ OK sous format Pluto
[![image](/images/imported/libresdr-zyinq7020-et-ad9363/captur10.jpg)](https://servimg.com/view/11301707/362)
Bien rajouter la ligne hostname après avoir créé le device ! Installation du firmware de F5OEO Tezuka_Fw trouvable à cette adresse :
[https://github.com/F5OEO/tezuka_fw](https://github.com/F5OEO/tezuka_fw) Il faut aller chercher le zip ici [https://github.com/F5OEO/tezuka_fw/releases/](https://github.com/F5OEO/tezuka_fw/releases/)
Puis l'installer dans une carte SD au format FAT32, attention à la taille maximale. Dans mon cas j'ai réutilisé une carte de 64Go mais j'ai du la partitionner en 16Go avec diskpart de Windows puis la formater en FAT32 pour qu'elle fonctionne.
Le premier démarrage laissait le uBoot dans cet état: Code: `resetting ...
U-Boot 2016.07 (Jan 10 2026 - 15:55:10 +0000)
I2C: ready
DRAM: ECC disabled 1 GiB
MMC: sdhci@e0100000: 0
SF: Detected W25Q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
In: serial@e0000000
Out: serial@e0000000
Err: serial@e0000000
Model: LibreSDR Rev.5 (Z7020-AD9363)
** Invalid partition 1 **
Hit any key to stop autoboot: 0
## Error: "sdboot" not defined
LIBRESDR> reset
resetting ...
` Informations soutirées par le port USB C DEBUG en 115200 bauds Une copie fraiche permet de démarrer correctement : Code: `U-Boot 2016.07 (Jan 10 2026 - 15:55:10 +0000) I2C: ready
DRAM: ECC disabled 1 GiB
MMC: sdhci@e0100000: 0
SF: Detected W25Q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
In: serial@e0000000
Out: serial@e0000000
Err: serial@e0000000
Model: LibreSDR Rev.5 (Z7020-AD9363)
reading uEnv.txt
8345 bytes read in 14 ms (582 KiB/s)
Importing environment from SD ...
Hit any key to stop autoboot: 0
Device: sdhci@e0100000
Manufacturer ID: 9f
OEM: 5449
Name: SD64G
Tran Speed: 50000000
Rd Block Len: 512
SD version 3.0
High Capacity: Yes
Capacity: 58.2 GiB
Bus Width: 4-bit
Erase Group Size: 512 Bytes
reading uEnv.txt
8345 bytes read in 15 ms (543 KiB/s)
Loaded environment from uEnv.txt
Importing environment from SD ...
Copying Linux from SD to RAM...
reading uImage
6419336 bytes read in 548 ms (11.2 MiB/s)
reading devicetree.dtb
23506 bytes read in 21 ms (1.1 MiB/s)
reading uramdisk.image.gz
22059090 bytes read in 1850 ms (11.4 MiB/s)
Loading ADI vars...
Loading devicetree using simple method...
Setting refclk internal
libfdt fdt_path_offset() returned FDT_ERR_NOTFOUND
## Booting kernel from Legacy Image at 02080000 ... Image Name: Linux kernel Image Type: ARM Linux Kernel Image (uncompressed) Data Size: 6419272 Bytes = 6.1 MiB Load Address: 02080000 Entry Point: 02080000 Verifying Checksum ... OK
## Loading init Ramdisk from Legacy Image at 04000000 ... Image Name: Image Type: ARM Linux RAMDisk Image (gzip compressed) Data Size: 22059026 Bytes = 21 MiB Load Address: 00000000 Entry Point: 00000000 Verifying Checksum ... OK
## Flattened Device Tree blob at 02000000 Booting using the fdt blob at 0x2000000 Loading Kernel Image ... OK Loading Ramdisk to 1eaf6000, end 1ffff812 ... OK Loading Device Tree to 1eaed000, end 1eaf5bd1 ... OK Starting kernel ... Booting Linux on physical CPU 0x0
Linux version 6.1.0 (runner@runnervm4c2pk) (arm-none-linux-gnueabihf-gcc (Arm GN U Toolchain 14.2.Rel1 (Build arm-14.52)) 14.2.1 20241119, GNU ld (Arm GNU Toolch ain 14.2.Rel1 (Build arm-14.52)) 2.43.1.20241119) #3 SMP PREEMPT Sat Jan 10 15:5 4:12 UTC 2026
CPU: ARMv7 Processor [413fc090] revision 0 (ARMv7), cr=18c5387d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
OF: fdt: Machine model: LibreSDR Rev.5 (Z7020/AD9363)
OF: fdt: earlycon: stdout-path /amba@0/uart@E0000000 not found
Memory policy: Data cache writealloc
cma: Reserved 32 MiB at 0x3e000000
Zone ranges: Normal [mem 0x0000000000000000-0x000000002fffffff] HighMem [mem 0x0000000030000000-0x000000003fffffff]
Movable zone start for each node
Early memory node ranges node 0: [mem 0x0000000000000000-0x0000000005ffffff] node 0: [mem 0x0000000006000000-0x000000000dffffff] node 0: [mem 0x000000000e000000-0x0000000015ffffff] node 0: [mem 0x0000000016000000-0x000000001603ffff] node 0: [mem 0x0000000016040000-0x000000003fffffff]
Initmem setup node 0 [mem 0x0000000000000000-0x000000003fffffff]
percpu: Embedded 11 pages/cpu s14100 r8192 d22764 u45056
Built 1 zonelists, mobility grouping on. Total pages: 260608
Kernel command line: console=ttyPS0,115200 rootfstype=ramfs root=/dev/ram0 rw ro otwait earlycon clk_ignore_unused cpuidle.off=1 uio_pdrv_genirq.of_id=uio_pdrv_g enirq UBOOT_MODEBOOT=sdboot UBOOT_VERSION="U-Boot 2016.07 (Jan 10 2026 - 15:55:1 0 +0000)"
Unknown kernel command line parameters "UBOOT_MODEBOOT=sdboot UBOOT_VERSION=U-Bo ot 2016.07 (Jan 10 2026 - 15:55:10 +0000)", will be passed to user space.
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes, linear)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes, linear)
mem auto-init: stack:all(zero), heap alloc:off, heap free:off
Memory: 838028K/1048576K available (10240K kernel code, 734K rwdata, 2836K rodat a, 1024K init, 148K bss, 177780K reserved, 32768K cma-reserved, 229376K highmem)
rcu: Preemptible hierarchical RCU implementation.
rcu: RCU event tracing is enabled.
rcu: RCU restricting CPUs from NR_CPUS=4 to nr_cpu_ids=2.
rcu: RCU calculated value of scheduler-enlistment delay is 10 jiffies.
rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=2
NR_IRQS: 16, nr_irqs: 16, preallocated irqs: 16
efuse mapped to (ptrval)
slcr mapped to (ptrval)
L2C: platform modifies aux control register: 0x72360000 -> 0x72760000
L2C: DT/platform modifies aux control register: 0x72360000 -> 0x72760000
L2C-310 erratum 769419 enabled
L2C-310 enabling early BRESP for Cortex-A9
L2C-310 full line of zeros enabled for Cortex-A9
L2C-310 ID prefetch enabled, offset 1 lines
L2C-310 dynamic clock gating enabled, standby mode enabled
L2C-310 cache controller enabled, 8 ways, 512 kB
L2C-310: CACHE_ID 0x410000c8, AUX_CTRL 0x76760001
rcu: srcu_init: Setting srcu_struct sizes based on contention.
zynq_clock_init: clkc starts at (ptrval)
Zynq clock init
sched_clock: 64 bits at 188MHz, resolution 5ns, wraps every 4398046511103ns
clocksource: arm_global_timer: mask: 0xffffffffffffffff max_cycles: 0x2b3e4535b1 , max_idle_ns: 440795205616 ns
Switching to timer-based delay loop, resolution 5ns
clocksource: ttc_clocksource: mask: 0xffff max_cycles: 0xffff, max_idle_ns: 4778 09044 ns
timer #0 at (ptrval), irq=25
Console: colour dummy device 80x30
Calibrating delay loop (skipped), value calculated using timer frequency.. 375.0 0 BogoMIPS (lpj=1875000)
pid_max: default: 32768 minimum: 301
Mount-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
Mountpoint-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
CPU: Testing write buffer coherency: ok
Spectre V2: workarounds disabled by configuration
CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
Setting up static identity map for 0x100000 - 0x100060
rcu: Hierarchical SRCU implementation.
rcu: Max phase no-delay instances is 1000.
smp: Bringing up secondary CPUs ...
CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
smp: Brought up 1 node, 2 CPUs
SMP: Total of 2 processors activated (750.00 BogoMIPS).
CPU: All CPU(s) started in SVC mode.
devtmpfs: initialized
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 1911 2604462750000 ns
futex hash table entries: 512 (order: 3, 32768 bytes, linear)
pinctrl core: initialized pinctrl subsystem
NET: Registered PF_NETLINK/PF_ROUTE protocol family
DMA: preallocated 256 KiB pool for atomic coherent allocations
thermal_sys: Registered thermal governor 'step_wise'
amba f8801000.etb: Fixing up cyclic dependency with replicator
amba f8803000.tpiu: Fixing up cyclic dependency with replicator
amba f8804000.funnel: Fixing up cyclic dependency with replicator
amba f889c000.ptm: Fixing up cyclic dependency with f8804000.funnel
amba f889d000.ptm: Fixing up cyclic dependency with f8804000.funnel
hw-breakpoint: found 5 (+1 reserved) breakpoint and 1 watchpoint registers.
hw-breakpoint: maximum watchpoint size is 4 bytes.
e0000000.serial: ttyPS0 at MMIO 0xe0000000 (irq = 27, base_baud = 6250000) is a xuartps
printk: console [ttyPS0] enabled
xuartps e0001000.serial: uart_add_one_port() failed; err=-22
xuartps: probe of e0001000.serial failed with error -22
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
pps_core: LinuxPPS API ver. 1 registered
pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@l inux.it>
PTP clock support registered
FPGA manager framework
Advanced Linux Sound Architecture Driver Initialized.
clocksource: Switched to clocksource arm_global_timer
NET: Registered PF_INET protocol family
IP idents hash table entries: 16384 (order: 5, 131072 bytes, linear)
tcp_listen_portaddr_hash hash table entries: 512 (order: 0, 4096 bytes, linear)
Table-perturb hash table entries: 65536 (order: 6, 262144 bytes, linear)
TCP established hash table entries: 8192 (order: 3, 32768 bytes, linear)
TCP bind hash table entries: 8192 (order: 5, 131072 bytes, linear)
TCP: Hash tables configured (established 8192 bind 8192)
UDP hash table entries: 512 (order: 2, 16384 bytes, linear)
UDP-Lite hash table entries: 512 (order: 2, 16384 bytes, linear)
NET: Registered PF_UNIX/PF_LOCAL protocol family
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Trying to unpack rootfs image as initramfs...
armv7-pmu f8891000.pmu: hw perfevents: no interrupt-affinity property, guessing.
hw perfevents: enabled with armv7_cortex_a9 PMU driver, 7 counters available
Initialise system trusted keyrings
workingset: timestamp_bits=30 max_order=18 bucket_order=0
Key type cifs.idmap registered
jffs2: version 2.2. (NAND) ![image](/images/imported/libresdr-zyinq7020-et-ad9363/00a9.png) 2001-2006 Red Hat, Inc.
Key type asymmetric registered
Asymmetric key parser 'x509' registered
bounce: pool size: 64 pages
io scheduler mq-deadline registered
io scheduler kyber registered
zynq-pinctrl 700.pinctrl: zynq pinctrl initialized
brd: module loaded
loop: module loaded
SPI driver spidev has no spi_device_id for adi,swspi
spi-nor spi1.0: w25q256 (32768 Kbytes)
4 fixed-partitions partitions found on MTD device spi1.0
Creating 4 MTD partitions on "spi1.0":
0x000000000000-0x000000100000 : "qspi-fsbl-uboot"
0x000000100000-0x000000120000 : "qspi-uboot-env"
0x000000120000-0x000000200000 : "qspi-nvmfs"
0x000000200000-0x000002000000 : "qspi-linux"
tun: Universal TUN/TAP device driver, 1.6
Freeing initrd memory: 21544K
macb e000b000.ethernet eth0: Cadence GEM rev 0x00020118 at 0xe000b000 irq 36 (00:0a:35:00:01:22)
usbcore: registered new interface driver ath9k_htc
Broadcom 43xx driver loaded [ Features: NL ]
usbcore: registered new interface driver rt2500usb
usbcore: registered new interface driver rt73usb
usbcore: registered new interface driver rt2800usb
usbcore: registered new interface driver rtl8187
usbcore: registered new interface driver rtl8192cu
usbcore: registered new interface driver rtl8xxxu
usbcore: registered new interface driver rtl8150
usbcore: registered new interface driver r8152
usbcore: registered new interface driver lan78xx
usbcore: registered new interface driver asix
usbcore: registered new interface driver ax88179_178a
usbcore: registered new interface driver cdc_ether
usbcore: registered new interface driver dm9601
usbcore: registered new interface driver smsc75xx
usbcore: registered new interface driver smsc95xx
usbcore: registered new interface driver rndis_host
usbcore: registered new interface driver r8153_ecm
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
usbcore: registered new interface driver usb-storage
usbcore: registered new interface driver usbserial_generic
usbserial: USB Serial support registered for generic
usbcore: registered new interface driver ftdi_sio
usbserial: USB Serial support registered for FTDI USB Serial Device
i2c_dev: i2c /dev entries driver
cdns-wdt f8005000.watchdog: Xilinx Watchdog Timer with timeout 10s
Xilinx Zynq CpuIdle Driver started
failed to register cpuidle driver
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
sdhci-pltfm: SDHCI platform and OF driver helper
ledtrig-cpu: registered to indicate activity on CPUs
hid: raw HID events driver (C) Jiri Kosina
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
usbcore: registered new interface driver r8712u
usbcore: registered new interface driver r8188eu
ad9361 spi0.0: ad9361_probe : enter (ad9361)
mmc0: SDHCI controller on e0100000.mmc [e0100000.mmc] using ADMA
ad9361 spi0.0: No GPIOs defined for ext band ctrl
mmc0: new high speed SDXC card at address 0001
mmcblk0: mmc0:0001 SD64G 58.2 GiB mmcblk0: p1 p2 < >
ad9361 spi0.0: ad9361_probe : AD936x Rev 0 successfully initialized
cf_axi_dds 79024000.cf-ad9361-dds-core-lpc: Analog Devices CF_AXI_DDS_DDS MASTER (9.02.b) at 0x79024000 mapped to 0x(ptrval), probed DDS AD9361
fpga_manager fpga0: Xilinx Zynq FPGA Manager registered
usbcore: registered new interface driver snd-usb-audio
NET: Registered PF_INET6 protocol family
Segment Routing with IPv6
In-situ OAM (IOAM) with IPv6
sit: IPv6, IPv4 and MPLS over IPv4 tunneling driver
NET: Registered PF_PACKET protocol family
lib80211: common routines for IEEE802.11 drivers
Key type dns_resolver registered
Registering SWP/SWPB emulation handler
Loading compiled-in X.509 certificates
cf_axi_adc 79020000.cf-ad9361-lpc: ADI AIM (10.03.) at 0x79020000 mapped to 0x(ptrval) probed ADC AD9361 as MASTER
input: gpio_keys as /devices/soc0/gpio_keys/input/input0
of_cfs_init
of_cfs_init: OK
cfg80211: Loading compiled-in X.509 certificates for regulatory database
cfg80211: Loaded X.509 cert 'sforshee: 00b28ddf47aef9cea7'
clk: Not disabling unused clocks
ALSA device list:
cfg80211: loaded regulatory.db is malformed or signature is missing/invalid #0: Dummy 1 #1: Loopback 1
Freeing unused kernel image (initmem) memory: 1024K
Run /init as init process
Saving 256 bits of non-creditable seed for next boot
Starting syslogd: OK
Starting klogd: OK
Running sysctl: OK
Starting mdev: OK
Starting watchdog: OK
Starting initializing random number generator: OK
Starting miscellaneous setup: OK
Setting serial number: random: crng init done
New serial number generated: ISF2LBLNH73MW73Z Serial number found in jffs2: ISF2LBLNH73MW73Z OK
Starting UDC Gadgets: file system registered
using random self ethernet address
using random host ethernet address
Mass Storage Function, version: 2009/09/11
LUN: removable file: (no medium)
read descriptors
read strings
usb0: HOST MAC 00:e0:22:c9:16:f4
usb0: MAC 00:05:f7:d7:a7:25
Enable console on ttyGS0
OK
Starting system message bus: done
Switching to rfinput rx1
Switch rf no relevant as we are in 2R2T
Switching to rfoutput tx1
Switch rf no relevant as we are in 2R2T
Starting network: macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
OK
Starting ifplugd for eth0: OK
Starting dhcpd Daemon & httpd Server: OK
Starting MSD Daemon:
1 listening ports: Browse files at http://127.0.0.1:80/
Run example at http://127.0.0.1:80/example
Exit at http://127.0.0.1:80/exit loop7: detected capacity change from 0 to 61440
OK
Starting chronyd: macb e000b000.ethernet eth0: Link is Down
OK
Starting crond: OK
Starting dropbear sshd: OK
Starting gpsd: OK
macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
gpsctl:ERROR: no gpsd running or network error: can't connect to host/port pair.
gpsctl:ERROR: gps_query(), write failed: Bad file descriptor(9)
gpsctl:ERROR: no DEVICES response received.
Installing maia environment. Need a reboot
Loading maia-sdr.ko: maia_sdr: loading out-of-tree module taints kernel.
OK
Generating Maia SDR certificates: ....+...+...+..+....+...+......+..+...+++++++++++++++++++++++++++++++++++++++*..+...............+......+.........+.........+.......+.....+.+...+++++++++++++++++++++++++++++++++++++++*..+...........+......+......+...+....+...........+.......+...............+.....+....+........+......+.........+......+....+......+......+.....+..........+.....+......+.......+..+....+.......................................+...+..+...+...+.......+........+.+...........+....+...........+...+..........+..............+.+..++++++
.+............+......+........+.+......+++++++++++++++++++++++++++++++++++++++*.......+.+.....+.+.....+...+.......+.....+..........+.....+++++++++++++++++++++++++++++++++++++++*...........+.+.....+..........+.....+.+.....++++++
-----
....+..+.........+.............+..+....+..+..........+...+......+...+++++++++++++++++++++++++++++++++++++++*...+.....+...................+.....+....+..+.+..+++++++++++++++++++++++++++++++++++++++*..+.......+..+............+.........+............++++++
..+...+++++++++++++++++++++++++++++++++++++++*.......+.....+.+.....+.+.....+.+++++++++++++++++++++++++++++++++++++++*....+......+........+.+......+..+......+.+......+............+......+..+...............+...+....+.....+......+.......+...+.....+......+...+..........+.....+...++++++
-----
Certificate request self-signature ok
subject=O=Maia SDR, OU=maia-httpd, CN=maia-httpd plutosdr-fw serial
OK
Starting mosquitto: OK
Starting host keys backup: Starting maia-httpd: OK
mounting NFS volume : on /mnt/nfs
mount: can't find /mnt/nfs in /etc/fstab
Mounting SD on /mnt/sd
Starting input-event-daemon: done Welcome to Tezuka
libresdr login:
` Le login est root et password analog Mais j'ai trouvé cela : Code: `Login/password is the usual
root/analog.
Welcome to Tezuka
libresdr login: root
Password:
\033[1;35m` Une fois loggé nous avons un joli prompt :
[![image](/images/imported/libresdr-zyinq7020-et-ad9363/captur10.jpg)](https://servimg.com/view/11301707/362)

---

### Message par Anonyme, 2026-02-04

Achat sur AliExpress :
[https://fr.aliexpress.com/item/1005007975697734.html](https://fr.aliexpress.com/item/1005007975697734.html)
Chez OpenSourceSDRLab pour 140€ avec un bon nouvelle année Réception avec un Linux Linaro 14.04 : Code: `root@analog:/# ls bin dev home lost+found mnt proc run share sys usr boot etc lib media opt root sbin srv tmp var root@analog:/# * Setting up X socket directories... [ OK ] * STARTDISTCC is set to false in /etc/default/distcc * /usr/bin/distccd not starting * Starting IIO Daemon iiod [fail] uname -a Linux analog 4.19.0 #1 SMP PREEMPT Wed Jun 12 13:06:56 UTC 2024 armv7l armv7l ar mv7l GNU/Linux root@analog:/# cat /proc/version Linux version 4.19.0 (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP PREEMPT Wed Jun 12 13:06:56 UTC 2024 root@analog:/# cat /etc/os-release NAME="Linaro" VERSION="14.04" ID=linaro ID_LIKE=debian PRETTY_NAME="Linaro 14.04" VERSION_ID="14.04" HOME_URL="http://www.linaro.org/" SUPPORT_URL="http://linaro.zendesk.com/" BUG_REPORT_URL="http://bugs.launchpad.net/linaro-ubuntu" root@analog:/# cat /proc/cpuinfo processor : 0 model name : ARMv7 Processor rev 0 (v7l) BogoMIPS : 650.00 Features : half thumb fastmult vfp edsp neon vfpv3 tls vfpd32 CPU implementer : 0x41 CPU architecture: 7 CPU variant : 0x3 CPU part : 0xc09 CPU revision : 0 processor : 1 model name : ARMv7 Processor rev 0 (v7l) BogoMIPS : 650.00 Features : half thumb fastmult vfp edsp neon vfpv3 tls vfpd32 CPU implementer : 0x41 CPU architecture: 7 CPU variant : 0x3 CPU part : 0xc09 CPU revision : 0 Hardware : Xilinx Zynq Platform Revision : 0003 Serial : 0000000000000000 root@analog:/#` Test avec SDRConsole OK, réception et émission via port ethernet, plutot lent si bande passante de 10Mhz ok avec 5MHz Intégration avec OpenWebRX+ OK sous format Pluto
[![image](/images/imported/libresdr-zyinq7020-et-ad9363/captur10.jpg)](https://servimg.com/view/11301707/362)
Bien rajouter la ligne hostname après avoir créé le device ! Installation du firmware de F5OEO Tezuka_Fw trouvable à cette adresse :
[https://github.com/F5OEO/tezuka_fw](https://github.com/F5OEO/tezuka_fw) Il faut aller chercher le zip ici [https://github.com/F5OEO/tezuka_fw/releases/](https://github.com/F5OEO/tezuka_fw/releases/)
Puis l'installer dans une carte SD au format FAT32, attention à la taille maximale. Dans mon cas j'ai réutilisé une carte de 64Go mais j'ai du la partitionner en 16Go avec diskpart de Windows puis la formater en FAT32 pour qu'elle fonctionne.
Le premier démarrage laissait le uBoot dans cet état: Code: `resetting ...
U-Boot 2016.07 (Jan 10 2026 - 15:55:10 +0000)
I2C: ready
DRAM: ECC disabled 1 GiB
MMC: sdhci@e0100000: 0
SF: Detected W25Q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
In: serial@e0000000
Out: serial@e0000000
Err: serial@e0000000
Model: LibreSDR Rev.5 (Z7020-AD9363)
** Invalid partition 1 **
Hit any key to stop autoboot: 0
## Error: "sdboot" not defined
LIBRESDR> reset
resetting ...
` Informations soutirées par le port USB C DEBUG en 115200 bauds Une copie fraiche permet de démarrer correctement : Code: `U-Boot 2016.07 (Jan 10 2026 - 15:55:10 +0000) I2C: ready
DRAM: ECC disabled 1 GiB
MMC: sdhci@e0100000: 0
SF: Detected W25Q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
In: serial@e0000000
Out: serial@e0000000
Err: serial@e0000000
Model: LibreSDR Rev.5 (Z7020-AD9363)
reading uEnv.txt
8345 bytes read in 14 ms (582 KiB/s)
Importing environment from SD ...
Hit any key to stop autoboot: 0
Device: sdhci@e0100000
Manufacturer ID: 9f
OEM: 5449
Name: SD64G
Tran Speed: 50000000
Rd Block Len: 512
SD version 3.0
High Capacity: Yes
Capacity: 58.2 GiB
Bus Width: 4-bit
Erase Group Size: 512 Bytes
reading uEnv.txt
8345 bytes read in 15 ms (543 KiB/s)
Loaded environment from uEnv.txt
Importing environment from SD ...
Copying Linux from SD to RAM...
reading uImage
6419336 bytes read in 548 ms (11.2 MiB/s)
reading devicetree.dtb
23506 bytes read in 21 ms (1.1 MiB/s)
reading uramdisk.image.gz
22059090 bytes read in 1850 ms (11.4 MiB/s)
Loading ADI vars...
Loading devicetree using simple method...
Setting refclk internal
libfdt fdt_path_offset() returned FDT_ERR_NOTFOUND
## Booting kernel from Legacy Image at 02080000 ... Image Name: Linux kernel Image Type: ARM Linux Kernel Image (uncompressed) Data Size: 6419272 Bytes = 6.1 MiB Load Address: 02080000 Entry Point: 02080000 Verifying Checksum ... OK
## Loading init Ramdisk from Legacy Image at 04000000 ... Image Name: Image Type: ARM Linux RAMDisk Image (gzip compressed) Data Size: 22059026 Bytes = 21 MiB Load Address: 00000000 Entry Point: 00000000 Verifying Checksum ... OK
## Flattened Device Tree blob at 02000000 Booting using the fdt blob at 0x2000000 Loading Kernel Image ... OK Loading Ramdisk to 1eaf6000, end 1ffff812 ... OK Loading Device Tree to 1eaed000, end 1eaf5bd1 ... OK Starting kernel ... Booting Linux on physical CPU 0x0
Linux version 6.1.0 (runner@runnervm4c2pk) (arm-none-linux-gnueabihf-gcc (Arm GN U Toolchain 14.2.Rel1 (Build arm-14.52)) 14.2.1 20241119, GNU ld (Arm GNU Toolch ain 14.2.Rel1 (Build arm-14.52)) 2.43.1.20241119) #3 SMP PREEMPT Sat Jan 10 15:5 4:12 UTC 2026
CPU: ARMv7 Processor [413fc090] revision 0 (ARMv7), cr=18c5387d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
OF: fdt: Machine model: LibreSDR Rev.5 (Z7020/AD9363)
OF: fdt: earlycon: stdout-path /amba@0/uart@E0000000 not found
Memory policy: Data cache writealloc
cma: Reserved 32 MiB at 0x3e000000
Zone ranges: Normal [mem 0x0000000000000000-0x000000002fffffff] HighMem [mem 0x0000000030000000-0x000000003fffffff]
Movable zone start for each node
Early memory node ranges node 0: [mem 0x0000000000000000-0x0000000005ffffff] node 0: [mem 0x0000000006000000-0x000000000dffffff] node 0: [mem 0x000000000e000000-0x0000000015ffffff] node 0: [mem 0x0000000016000000-0x000000001603ffff] node 0: [mem 0x0000000016040000-0x000000003fffffff]
Initmem setup node 0 [mem 0x0000000000000000-0x000000003fffffff]
percpu: Embedded 11 pages/cpu s14100 r8192 d22764 u45056
Built 1 zonelists, mobility grouping on. Total pages: 260608
Kernel command line: console=ttyPS0,115200 rootfstype=ramfs root=/dev/ram0 rw ro otwait earlycon clk_ignore_unused cpuidle.off=1 uio_pdrv_genirq.of_id=uio_pdrv_g enirq UBOOT_MODEBOOT=sdboot UBOOT_VERSION="U-Boot 2016.07 (Jan 10 2026 - 15:55:1 0 +0000)"
Unknown kernel command line parameters "UBOOT_MODEBOOT=sdboot UBOOT_VERSION=U-Bo ot 2016.07 (Jan 10 2026 - 15:55:10 +0000)", will be passed to user space.
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes, linear)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes, linear)
mem auto-init: stack:all(zero), heap alloc:off, heap free:off
Memory: 838028K/1048576K available (10240K kernel code, 734K rwdata, 2836K rodat a, 1024K init, 148K bss, 177780K reserved, 32768K cma-reserved, 229376K highmem)
rcu: Preemptible hierarchical RCU implementation.
rcu: RCU event tracing is enabled.
rcu: RCU restricting CPUs from NR_CPUS=4 to nr_cpu_ids=2.
rcu: RCU calculated value of scheduler-enlistment delay is 10 jiffies.
rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=2
NR_IRQS: 16, nr_irqs: 16, preallocated irqs: 16
efuse mapped to (ptrval)
slcr mapped to (ptrval)
L2C: platform modifies aux control register: 0x72360000 -> 0x72760000
L2C: DT/platform modifies aux control register: 0x72360000 -> 0x72760000
L2C-310 erratum 769419 enabled
L2C-310 enabling early BRESP for Cortex-A9
L2C-310 full line of zeros enabled for Cortex-A9
L2C-310 ID prefetch enabled, offset 1 lines
L2C-310 dynamic clock gating enabled, standby mode enabled
L2C-310 cache controller enabled, 8 ways, 512 kB
L2C-310: CACHE_ID 0x410000c8, AUX_CTRL 0x76760001
rcu: srcu_init: Setting srcu_struct sizes based on contention.
zynq_clock_init: clkc starts at (ptrval)
Zynq clock init
sched_clock: 64 bits at 188MHz, resolution 5ns, wraps every 4398046511103ns
clocksource: arm_global_timer: mask: 0xffffffffffffffff max_cycles: 0x2b3e4535b1 , max_idle_ns: 440795205616 ns
Switching to timer-based delay loop, resolution 5ns
clocksource: ttc_clocksource: mask: 0xffff max_cycles: 0xffff, max_idle_ns: 4778 09044 ns
timer #0 at (ptrval), irq=25
Console: colour dummy device 80x30
Calibrating delay loop (skipped), value calculated using timer frequency.. 375.0 0 BogoMIPS (lpj=1875000)
pid_max: default: 32768 minimum: 301
Mount-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
Mountpoint-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
CPU: Testing write buffer coherency: ok
Spectre V2: workarounds disabled by configuration
CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
Setting up static identity map for 0x100000 - 0x100060
rcu: Hierarchical SRCU implementation.
rcu: Max phase no-delay instances is 1000.
smp: Bringing up secondary CPUs ...
CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
smp: Brought up 1 node, 2 CPUs
SMP: Total of 2 processors activated (750.00 BogoMIPS).
CPU: All CPU(s) started in SVC mode.
devtmpfs: initialized
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 1911 2604462750000 ns
futex hash table entries: 512 (order: 3, 32768 bytes, linear)
pinctrl core: initialized pinctrl subsystem
NET: Registered PF_NETLINK/PF_ROUTE protocol family
DMA: preallocated 256 KiB pool for atomic coherent allocations
thermal_sys: Registered thermal governor 'step_wise'
amba f8801000.etb: Fixing up cyclic dependency with replicator
amba f8803000.tpiu: Fixing up cyclic dependency with replicator
amba f8804000.funnel: Fixing up cyclic dependency with replicator
amba f889c000.ptm: Fixing up cyclic dependency with f8804000.funnel
amba f889d000.ptm: Fixing up cyclic dependency with f8804000.funnel
hw-breakpoint: found 5 (+1 reserved) breakpoint and 1 watchpoint registers.
hw-breakpoint: maximum watchpoint size is 4 bytes.
e0000000.serial: ttyPS0 at MMIO 0xe0000000 (irq = 27, base_baud = 6250000) is a xuartps
printk: console [ttyPS0] enabled
xuartps e0001000.serial: uart_add_one_port() failed; err=-22
xuartps: probe of e0001000.serial failed with error -22
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
pps_core: LinuxPPS API ver. 1 registered
pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@l inux.it>
PTP clock support registered
FPGA manager framework
Advanced Linux Sound Architecture Driver Initialized.
clocksource: Switched to clocksource arm_global_timer
NET: Registered PF_INET protocol family
IP idents hash table entries: 16384 (order: 5, 131072 bytes, linear)
tcp_listen_portaddr_hash hash table entries: 512 (order: 0, 4096 bytes, linear)
Table-perturb hash table entries: 65536 (order: 6, 262144 bytes, linear)
TCP established hash table entries: 8192 (order: 3, 32768 bytes, linear)
TCP bind hash table entries: 8192 (order: 5, 131072 bytes, linear)
TCP: Hash tables configured (established 8192 bind 8192)
UDP hash table entries: 512 (order: 2, 16384 bytes, linear)
UDP-Lite hash table entries: 512 (order: 2, 16384 bytes, linear)
NET: Registered PF_UNIX/PF_LOCAL protocol family
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Trying to unpack rootfs image as initramfs...
armv7-pmu f8891000.pmu: hw perfevents: no interrupt-affinity property, guessing.
hw perfevents: enabled with armv7_cortex_a9 PMU driver, 7 counters available
Initialise system trusted keyrings
workingset: timestamp_bits=30 max_order=18 bucket_order=0
Key type cifs.idmap registered
jffs2: version 2.2. (NAND) ![image](/images/imported/libresdr-zyinq7020-et-ad9363/00a9.png) 2001-2006 Red Hat, Inc.
Key type asymmetric registered
Asymmetric key parser 'x509' registered
bounce: pool size: 64 pages
io scheduler mq-deadline registered
io scheduler kyber registered
zynq-pinctrl 700.pinctrl: zynq pinctrl initialized
brd: module loaded
loop: module loaded
SPI driver spidev has no spi_device_id for adi,swspi
spi-nor spi1.0: w25q256 (32768 Kbytes)
4 fixed-partitions partitions found on MTD device spi1.0
Creating 4 MTD partitions on "spi1.0":
0x000000000000-0x000000100000 : "qspi-fsbl-uboot"
0x000000100000-0x000000120000 : "qspi-uboot-env"
0x000000120000-0x000000200000 : "qspi-nvmfs"
0x000000200000-0x000002000000 : "qspi-linux"
tun: Universal TUN/TAP device driver, 1.6
Freeing initrd memory: 21544K
macb e000b000.ethernet eth0: Cadence GEM rev 0x00020118 at 0xe000b000 irq 36 (00:0a:35:00:01:22)
usbcore: registered new interface driver ath9k_htc
Broadcom 43xx driver loaded [ Features: NL ]
usbcore: registered new interface driver rt2500usb
usbcore: registered new interface driver rt73usb
usbcore: registered new interface driver rt2800usb
usbcore: registered new interface driver rtl8187
usbcore: registered new interface driver rtl8192cu
usbcore: registered new interface driver rtl8xxxu
usbcore: registered new interface driver rtl8150
usbcore: registered new interface driver r8152
usbcore: registered new interface driver lan78xx
usbcore: registered new interface driver asix
usbcore: registered new interface driver ax88179_178a
usbcore: registered new interface driver cdc_ether
usbcore: registered new interface driver dm9601
usbcore: registered new interface driver smsc75xx
usbcore: registered new interface driver smsc95xx
usbcore: registered new interface driver rndis_host
usbcore: registered new interface driver r8153_ecm
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
usbcore: registered new interface driver usb-storage
usbcore: registered new interface driver usbserial_generic
usbserial: USB Serial support registered for generic
usbcore: registered new interface driver ftdi_sio
usbserial: USB Serial support registered for FTDI USB Serial Device
i2c_dev: i2c /dev entries driver
cdns-wdt f8005000.watchdog: Xilinx Watchdog Timer with timeout 10s
Xilinx Zynq CpuIdle Driver started
failed to register cpuidle driver
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
sdhci-pltfm: SDHCI platform and OF driver helper
ledtrig-cpu: registered to indicate activity on CPUs
hid: raw HID events driver (C) Jiri Kosina
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
usbcore: registered new interface driver r8712u
usbcore: registered new interface driver r8188eu
ad9361 spi0.0: ad9361_probe : enter (ad9361)
mmc0: SDHCI controller on e0100000.mmc [e0100000.mmc] using ADMA
ad9361 spi0.0: No GPIOs defined for ext band ctrl
mmc0: new high speed SDXC card at address 0001
mmcblk0: mmc0:0001 SD64G 58.2 GiB mmcblk0: p1 p2 < >
ad9361 spi0.0: ad9361_probe : AD936x Rev 0 successfully initialized
cf_axi_dds 79024000.cf-ad9361-dds-core-lpc: Analog Devices CF_AXI_DDS_DDS MASTER (9.02.b) at 0x79024000 mapped to 0x(ptrval), probed DDS AD9361
fpga_manager fpga0: Xilinx Zynq FPGA Manager registered
usbcore: registered new interface driver snd-usb-audio
NET: Registered PF_INET6 protocol family
Segment Routing with IPv6
In-situ OAM (IOAM) with IPv6
sit: IPv6, IPv4 and MPLS over IPv4 tunneling driver
NET: Registered PF_PACKET protocol family
lib80211: common routines for IEEE802.11 drivers
Key type dns_resolver registered
Registering SWP/SWPB emulation handler
Loading compiled-in X.509 certificates
cf_axi_adc 79020000.cf-ad9361-lpc: ADI AIM (10.03.) at 0x79020000 mapped to 0x(ptrval) probed ADC AD9361 as MASTER
input: gpio_keys as /devices/soc0/gpio_keys/input/input0
of_cfs_init
of_cfs_init: OK
cfg80211: Loading compiled-in X.509 certificates for regulatory database
cfg80211: Loaded X.509 cert 'sforshee: 00b28ddf47aef9cea7'
clk: Not disabling unused clocks
ALSA device list:
cfg80211: loaded regulatory.db is malformed or signature is missing/invalid #0: Dummy 1 #1: Loopback 1
Freeing unused kernel image (initmem) memory: 1024K
Run /init as init process
Saving 256 bits of non-creditable seed for next boot
Starting syslogd: OK
Starting klogd: OK
Running sysctl: OK
Starting mdev: OK
Starting watchdog: OK
Starting initializing random number generator: OK
Starting miscellaneous setup: OK
Setting serial number: random: crng init done
New serial number generated: ISF2LBLNH73MW73Z Serial number found in jffs2: ISF2LBLNH73MW73Z OK
Starting UDC Gadgets: file system registered
using random self ethernet address
using random host ethernet address
Mass Storage Function, version: 2009/09/11
LUN: removable file: (no medium)
read descriptors
read strings
usb0: HOST MAC 00:e0:22:c9:16:f4
usb0: MAC 00:05:f7:d7:a7:25
Enable console on ttyGS0
OK
Starting system message bus: done
Switching to rfinput rx1
Switch rf no relevant as we are in 2R2T
Switching to rfoutput tx1
Switch rf no relevant as we are in 2R2T
Starting network: macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
OK
Starting ifplugd for eth0: OK
Starting dhcpd Daemon & httpd Server: OK
Starting MSD Daemon:
1 listening ports: Browse files at http://127.0.0.1:80/
Run example at http://127.0.0.1:80/example
Exit at http://127.0.0.1:80/exit loop7: detected capacity change from 0 to 61440
OK
Starting chronyd: macb e000b000.ethernet eth0: Link is Down
OK
Starting crond: OK
Starting dropbear sshd: OK
Starting gpsd: OK
macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
gpsctl:ERROR: no gpsd running or network error: can't connect to host/port pair.
gpsctl:ERROR: gps_query(), write failed: Bad file descriptor(9)
gpsctl:ERROR: no DEVICES response received.
Installing maia environment. Need a reboot
Loading maia-sdr.ko: maia_sdr: loading out-of-tree module taints kernel.
OK
Generating Maia SDR certificates: ....+...+...+..+....+...+......+..+...+++++++++++++++++++++++++++++++++++++++*..+...............+......+.........+.........+.......+.....+.+...+++++++++++++++++++++++++++++++++++++++*..+...........+......+......+...+....+...........+.......+...............+.....+....+........+......+.........+......+....+......+......+.....+..........+.....+......+.......+..+....+.......................................+...+..+...+...+.......+........+.+...........+....+...........+...+..........+..............+.+..++++++
.+............+......+........+.+......+++++++++++++++++++++++++++++++++++++++*.......+.+.....+.+.....+...+.......+.....+..........+.....+++++++++++++++++++++++++++++++++++++++*...........+.+.....+..........+.....+.+.....++++++
-----
....+..+.........+.............+..+....+..+..........+...+......+...+++++++++++++++++++++++++++++++++++++++*...+.....+...................+.....+....+..+.+..+++++++++++++++++++++++++++++++++++++++*..+.......+..+............+.........+............++++++
..+...+++++++++++++++++++++++++++++++++++++++*.......+.....+.+.....+.+.....+.+++++++++++++++++++++++++++++++++++++++*....+......+........+.+......+..+......+.+......+............+......+..+...............+...+....+.....+......+.......+...+.....+......+...+..........+.....+...++++++
-----
Certificate request self-signature ok
subject=O=Maia SDR, OU=maia-httpd, CN=maia-httpd plutosdr-fw serial
OK
Starting mosquitto: OK
Starting host keys backup: Starting maia-httpd: OK
mounting NFS volume : on /mnt/nfs
mount: can't find /mnt/nfs in /etc/fstab
Mounting SD on /mnt/sd
Starting input-event-daemon: done Welcome to Tezuka
libresdr login:
` Le login est root et password analog Mais j'ai trouvé cela : Code: `Login/password is the usual
root/analog.
Welcome to Tezuka
libresdr login: root
Password:
\033[1;35m` Une fois loggé nous avons un joli prompt :
[![image](/images/imported/libresdr-zyinq7020-et-ad9363/captur10.jpg)](https://servimg.com/view/11301707/362)

---

### Message par Anonyme, 2026-02-04

Et voici les détails du premier boot : Code: `U-Boot 2016.07 (Jan 10 2026 - 15:55:10 +0000) I2C: ready
DRAM: ECC disabled 1 GiB
MMC: sdhci@e0100000: 0
SF: Detected W25Q256 with page size 256 Bytes, erase size 4 KiB, total 32 MiB
In: serial@e0000000
Out: serial@e0000000
Err: serial@e0000000
Model: LibreSDR Rev.5 (Z7020-AD9363)
reading uEnv.txt
8345 bytes read in 14 ms (582 KiB/s)
Importing environment from SD ...
Hit any key to stop autoboot: 0
Device: sdhci@e0100000
Manufacturer ID: 9f
OEM: 5449
Name: SD64G
Tran Speed: 50000000
Rd Block Len: 512
SD version 3.0
High Capacity: Yes
Capacity: 58.2 GiB
Bus Width: 4-bit
Erase Group Size: 512 Bytes
reading uEnv.txt
8345 bytes read in 15 ms (543 KiB/s)
Loaded environment from uEnv.txt
Importing environment from SD ...
Copying Linux from SD to RAM...
reading uImage
6419336 bytes read in 548 ms (11.2 MiB/s)
reading devicetree.dtb
23506 bytes read in 21 ms (1.1 MiB/s)
reading uramdisk.image.gz
22059090 bytes read in 1850 ms (11.4 MiB/s)
Loading ADI vars...
Loading devicetree using simple method...
Setting refclk internal
libfdt fdt_path_offset() returned FDT_ERR_NOTFOUND
## Booting kernel from Legacy Image at 02080000 ... Image Name: Linux kernel Image Type: ARM Linux Kernel Image (uncompressed) Data Size: 6419272 Bytes = 6.1 MiB Load Address: 02080000 Entry Point: 02080000 Verifying Checksum ... OK
## Loading init Ramdisk from Legacy Image at 04000000 ... Image Name: Image Type: ARM Linux RAMDisk Image (gzip compressed) Data Size: 22059026 Bytes = 21 MiB Load Address: 00000000 Entry Point: 00000000 Verifying Checksum ... OK
## Flattened Device Tree blob at 02000000 Booting using the fdt blob at 0x2000000 Loading Kernel Image ... OK Loading Ramdisk to 1eaf6000, end 1ffff812 ... OK Loading Device Tree to 1eaed000, end 1eaf5bd1 ... OK Starting kernel ... Booting Linux on physical CPU 0x0
Linux version 6.1.0 (runner@runnervm4c2pk) (arm-none-linux-gnueabihf-gcc (Arm GN U Toolchain 14.2.Rel1 (Build arm-14.52)) 14.2.1 20241119, GNU ld (Arm GNU Toolch ain 14.2.Rel1 (Build arm-14.52)) 2.43.1.20241119) #3 SMP PREEMPT Sat Jan 10 15:5 4:12 UTC 2026
CPU: ARMv7 Processor [413fc090] revision 0 (ARMv7), cr=18c5387d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
OF: fdt: Machine model: LibreSDR Rev.5 (Z7020/AD9363)
OF: fdt: earlycon: stdout-path /amba@0/uart@E0000000 not found
Memory policy: Data cache writealloc
cma: Reserved 32 MiB at 0x3e000000
Zone ranges: Normal [mem 0x0000000000000000-0x000000002fffffff] HighMem [mem 0x0000000030000000-0x000000003fffffff]
Movable zone start for each node
Early memory node ranges node 0: [mem 0x0000000000000000-0x0000000005ffffff] node 0: [mem 0x0000000006000000-0x000000000dffffff] node 0: [mem 0x000000000e000000-0x0000000015ffffff] node 0: [mem 0x0000000016000000-0x000000001603ffff] node 0: [mem 0x0000000016040000-0x000000003fffffff]
Initmem setup node 0 [mem 0x0000000000000000-0x000000003fffffff]
percpu: Embedded 11 pages/cpu s14100 r8192 d22764 u45056
Built 1 zonelists, mobility grouping on. Total pages: 260608
Kernel command line: console=ttyPS0,115200 rootfstype=ramfs root=/dev/ram0 rw ro otwait earlycon clk_ignore_unused cpuidle.off=1 uio_pdrv_genirq.of_id=uio_pdrv_g enirq UBOOT_MODEBOOT=sdboot UBOOT_VERSION="U-Boot 2016.07 (Jan 10 2026 - 15:55:1 0 +0000)"
Unknown kernel command line parameters "UBOOT_MODEBOOT=sdboot UBOOT_VERSION=U-Bo ot 2016.07 (Jan 10 2026 - 15:55:10 +0000)", will be passed to user space.
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes, linear)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes, linear)
mem auto-init: stack:all(zero), heap alloc:off, heap free:off
Memory: 838028K/1048576K available (10240K kernel code, 734K rwdata, 2836K rodat a, 1024K init, 148K bss, 177780K reserved, 32768K cma-reserved, 229376K highmem)
rcu: Preemptible hierarchical RCU implementation.
rcu: RCU event tracing is enabled.
rcu: RCU restricting CPUs from NR_CPUS=4 to nr_cpu_ids=2.
rcu: RCU calculated value of scheduler-enlistment delay is 10 jiffies.
rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=2
NR_IRQS: 16, nr_irqs: 16, preallocated irqs: 16
efuse mapped to (ptrval)
slcr mapped to (ptrval)
L2C: platform modifies aux control register: 0x72360000 -> 0x72760000
L2C: DT/platform modifies aux control register: 0x72360000 -> 0x72760000
L2C-310 erratum 769419 enabled
L2C-310 enabling early BRESP for Cortex-A9
L2C-310 full line of zeros enabled for Cortex-A9
L2C-310 ID prefetch enabled, offset 1 lines
L2C-310 dynamic clock gating enabled, standby mode enabled
L2C-310 cache controller enabled, 8 ways, 512 kB
L2C-310: CACHE_ID 0x410000c8, AUX_CTRL 0x76760001
rcu: srcu_init: Setting srcu_struct sizes based on contention.
zynq_clock_init: clkc starts at (ptrval)
Zynq clock init
sched_clock: 64 bits at 188MHz, resolution 5ns, wraps every 4398046511103ns
clocksource: arm_global_timer: mask: 0xffffffffffffffff max_cycles: 0x2b3e4535b1 , max_idle_ns: 440795205616 ns
Switching to timer-based delay loop, resolution 5ns
clocksource: ttc_clocksource: mask: 0xffff max_cycles: 0xffff, max_idle_ns: 4778 09044 ns
timer #0 at (ptrval), irq=25
Console: colour dummy device 80x30
Calibrating delay loop (skipped), value calculated using timer frequency.. 375.0 0 BogoMIPS (lpj=1875000)
pid_max: default: 32768 minimum: 301
Mount-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
Mountpoint-cache hash table entries: 2048 (order: 1, 8192 bytes, linear)
CPU: Testing write buffer coherency: ok
Spectre V2: workarounds disabled by configuration
CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
Setting up static identity map for 0x100000 - 0x100060
rcu: Hierarchical SRCU implementation.
rcu: Max phase no-delay instances is 1000.
smp: Bringing up secondary CPUs ...
CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
smp: Brought up 1 node, 2 CPUs
SMP: Total of 2 processors activated (750.00 BogoMIPS).
CPU: All CPU(s) started in SVC mode.
devtmpfs: initialized
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 1911 2604462750000 ns
futex hash table entries: 512 (order: 3, 32768 bytes, linear)
pinctrl core: initialized pinctrl subsystem
NET: Registered PF_NETLINK/PF_ROUTE protocol family
DMA: preallocated 256 KiB pool for atomic coherent allocations
thermal_sys: Registered thermal governor 'step_wise'
amba f8801000.etb: Fixing up cyclic dependency with replicator
amba f8803000.tpiu: Fixing up cyclic dependency with replicator
amba f8804000.funnel: Fixing up cyclic dependency with replicator
amba f889c000.ptm: Fixing up cyclic dependency with f8804000.funnel
amba f889d000.ptm: Fixing up cyclic dependency with f8804000.funnel
hw-breakpoint: found 5 (+1 reserved) breakpoint and 1 watchpoint registers.
hw-breakpoint: maximum watchpoint size is 4 bytes.
e0000000.serial: ttyPS0 at MMIO 0xe0000000 (irq = 27, base_baud = 6250000) is a xuartps
printk: console [ttyPS0] enabled
xuartps e0001000.serial: uart_add_one_port() failed; err=-22
xuartps: probe of e0001000.serial failed with error -22
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
pps_core: LinuxPPS API ver. 1 registered
pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@l inux.it>
PTP clock support registered
FPGA manager framework
Advanced Linux Sound Architecture Driver Initialized.
clocksource: Switched to clocksource arm_global_timer
NET: Registered PF_INET protocol family
IP idents hash table entries: 16384 (order: 5, 131072 bytes, linear)
tcp_listen_portaddr_hash hash table entries: 512 (order: 0, 4096 bytes, linear)
Table-perturb hash table entries: 65536 (order: 6, 262144 bytes, linear)
TCP established hash table entries: 8192 (order: 3, 32768 bytes, linear)
TCP bind hash table entries: 8192 (order: 5, 131072 bytes, linear)
TCP: Hash tables configured (established 8192 bind 8192)
UDP hash table entries: 512 (order: 2, 16384 bytes, linear)
UDP-Lite hash table entries: 512 (order: 2, 16384 bytes, linear)
NET: Registered PF_UNIX/PF_LOCAL protocol family
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Trying to unpack rootfs image as initramfs...
armv7-pmu f8891000.pmu: hw perfevents: no interrupt-affinity property, guessing.
hw perfevents: enabled with armv7_cortex_a9 PMU driver, 7 counters available
Initialise system trusted keyrings
workingset: timestamp_bits=30 max_order=18 bucket_order=0
Key type cifs.idmap registered
jffs2: version 2.2. (NAND) ![image](/images/imported/libresdr-zyinq7020-et-ad9363/00a9.png) 2001-2006 Red Hat, Inc.
Key type asymmetric registered
Asymmetric key parser 'x509' registered
bounce: pool size: 64 pages
io scheduler mq-deadline registered
io scheduler kyber registered
zynq-pinctrl 700.pinctrl: zynq pinctrl initialized
brd: module loaded
loop: module loaded
SPI driver spidev has no spi_device_id for adi,swspi
spi-nor spi1.0: w25q256 (32768 Kbytes)
4 fixed-partitions partitions found on MTD device spi1.0
Creating 4 MTD partitions on "spi1.0":
0x000000000000-0x000000100000 : "qspi-fsbl-uboot"
0x000000100000-0x000000120000 : "qspi-uboot-env"
0x000000120000-0x000000200000 : "qspi-nvmfs"
0x000000200000-0x000002000000 : "qspi-linux"
tun: Universal TUN/TAP device driver, 1.6
Freeing initrd memory: 21544K
macb e000b000.ethernet eth0: Cadence GEM rev 0x00020118 at 0xe000b000 irq 36 (00:0a:35:00:01:22)
usbcore: registered new interface driver ath9k_htc
Broadcom 43xx driver loaded [ Features: NL ]
usbcore: registered new interface driver rt2500usb
usbcore: registered new interface driver rt73usb
usbcore: registered new interface driver rt2800usb
usbcore: registered new interface driver rtl8187
usbcore: registered new interface driver rtl8192cu
usbcore: registered new interface driver rtl8xxxu
usbcore: registered new interface driver rtl8150
usbcore: registered new interface driver r8152
usbcore: registered new interface driver lan78xx
usbcore: registered new interface driver asix
usbcore: registered new interface driver ax88179_178a
usbcore: registered new interface driver cdc_ether
usbcore: registered new interface driver dm9601
usbcore: registered new interface driver smsc75xx
usbcore: registered new interface driver smsc95xx
usbcore: registered new interface driver rndis_host
usbcore: registered new interface driver r8153_ecm
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
usbcore: registered new interface driver usb-storage
usbcore: registered new interface driver usbserial_generic
usbserial: USB Serial support registered for generic
usbcore: registered new interface driver ftdi_sio
usbserial: USB Serial support registered for FTDI USB Serial Device
i2c_dev: i2c /dev entries driver
cdns-wdt f8005000.watchdog: Xilinx Watchdog Timer with timeout 10s
Xilinx Zynq CpuIdle Driver started
failed to register cpuidle driver
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
sdhci-pltfm: SDHCI platform and OF driver helper
ledtrig-cpu: registered to indicate activity on CPUs
hid: raw HID events driver (C) Jiri Kosina
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
usbcore: registered new interface driver r8712u
usbcore: registered new interface driver r8188eu
ad9361 spi0.0: ad9361_probe : enter (ad9361)
mmc0: SDHCI controller on e0100000.mmc [e0100000.mmc] using ADMA
ad9361 spi0.0: No GPIOs defined for ext band ctrl
mmc0: new high speed SDXC card at address 0001
mmcblk0: mmc0:0001 SD64G 58.2 GiB mmcblk0: p1 p2 < >
ad9361 spi0.0: ad9361_probe : AD936x Rev 0 successfully initialized
cf_axi_dds 79024000.cf-ad9361-dds-core-lpc: Analog Devices CF_AXI_DDS_DDS MASTER (9.02.b) at 0x79024000 mapped to 0x(ptrval), probed DDS AD9361
fpga_manager fpga0: Xilinx Zynq FPGA Manager registered
usbcore: registered new interface driver snd-usb-audio
NET: Registered PF_INET6 protocol family
Segment Routing with IPv6
In-situ OAM (IOAM) with IPv6
sit: IPv6, IPv4 and MPLS over IPv4 tunneling driver
NET: Registered PF_PACKET protocol family
lib80211: common routines for IEEE802.11 drivers
Key type dns_resolver registered
Registering SWP/SWPB emulation handler
Loading compiled-in X.509 certificates
cf_axi_adc 79020000.cf-ad9361-lpc: ADI AIM (10.03.) at 0x79020000 mapped to 0x(ptrval) probed ADC AD9361 as MASTER
input: gpio_keys as /devices/soc0/gpio_keys/input/input0
of_cfs_init
of_cfs_init: OK
cfg80211: Loading compiled-in X.509 certificates for regulatory database
cfg80211: Loaded X.509 cert 'sforshee: 00b28ddf47aef9cea7'
clk: Not disabling unused clocks
ALSA device list:
cfg80211: loaded regulatory.db is malformed or signature is missing/invalid #0: Dummy 1 #1: Loopback 1
Freeing unused kernel image (initmem) memory: 1024K
Run /init as init process
Saving 256 bits of non-creditable seed for next boot
Starting syslogd: OK
Starting klogd: OK
Running sysctl: OK
Starting mdev: OK
Starting watchdog: OK
Starting initializing random number generator: OK
Starting miscellaneous setup: OK
Setting serial number: random: crng init done
New serial number generated: ISF2LBLNH73MW73Z Serial number found in jffs2: ISF2LBLNH73MW73Z OK
Starting UDC Gadgets: file system registered
using random self ethernet address
using random host ethernet address
Mass Storage Function, version: 2009/09/11
LUN: removable file: (no medium)
read descriptors
read strings
usb0: HOST MAC 00:e0:22:c9:16:f4
usb0: MAC 00:05:f7:d7:a7:25
Enable console on ttyGS0
OK
Starting system message bus: done
Switching to rfinput rx1
Switch rf no relevant as we are in 2R2T
Switching to rfoutput tx1
Switch rf no relevant as we are in 2R2T
Starting network: macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
OK
Starting ifplugd for eth0: OK
Starting dhcpd Daemon & httpd Server: OK
Starting MSD Daemon:
1 listening ports: Browse files at http://127.0.0.1:80/
Run example at http://127.0.0.1:80/example
Exit at http://127.0.0.1:80/exit loop7: detected capacity change from 0 to 61440
OK
Starting chronyd: macb e000b000.ethernet eth0: Link is Down
OK
Starting crond: OK
Starting dropbear sshd: OK
Starting gpsd: OK
macb e000b000.ethernet eth0: PHY [e000b000.ethernet-ffffffff:00] driver [RTL8211E Gigabit Ethernet] (irq=POLL)
macb e000b000.ethernet eth0: configuring for phy/rgmii-id link mode
macb e000b000.ethernet eth0: Link is Up - 100Mbps/Full - flow control tx
gpsctl:ERROR: no gpsd running or network error: can't connect to host/port pair.
gpsctl:ERROR: gps_query(), write failed: Bad file descriptor(9)
gpsctl:ERROR: no DEVICES response received.
Installing maia environment. Need a reboot
Loading maia-sdr.ko: maia_sdr: loading out-of-tree module taints kernel.
OK
Generating Maia SDR certificates: ....+...+...+..+....+...+......+..+...+++++++++++++++++++++++++++++++++++++++*..+...............+......+.........+.........+.......+.....+.+...+++++++++++++++++++++++++++++++++++++++*..+...........+......+......+...+....+...........+.......+...............+.....+....+........+......+.........+......+....+......+......+.....+..........+.....+......+.......+..+....+.......................................+...+..+...+...+.......+........+.+...........+....+...........+...+..........+..............+.+..++++++
.+............+......+........+.+......+++++++++++++++++++++++++++++++++++++++*.......+.+.....+.+.....+...+.......+.....+..........+.....+++++++++++++++++++++++++++++++++++++++*...........+.+.....+..........+.....+.+.....++++++
-----
....+..+.........+.............+..+....+..+..........+...+......+...+++++++++++++++++++++++++++++++++++++++*...+.....+...................+.....+....+..+.+..+++++++++++++++++++++++++++++++++++++++*..+.......+..+............+.........+............++++++
..+...+++++++++++++++++++++++++++++++++++++++*.......+.....+.+.....+.+.....+.+++++++++++++++++++++++++++++++++++++++*....+......+........+.+......+..+......+.+......+............+......+..+...............+...+....+.....+......+.......+...+.....+......+...+..........+.....+...++++++
-----
Certificate request self-signature ok
subject=O=Maia SDR, OU=maia-httpd, CN=maia-httpd plutosdr-fw serial
OK
Starting mosquitto: OK
Starting host keys backup: Starting maia-httpd: OK
mounting NFS volume : on /mnt/nfs
mount: can't find /mnt/nfs in /etc/fstab
Mounting SD on /mnt/sd
Starting input-event-daemon: done Welcome to Tezuka
libresdr login:
` ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Voici ce que me renvoi iio_info avec ce nouveau firmware : Code: `# iio_info
iio_info version: 0.26 (git tag:v0.26)
Libiio version: 0.26 (git tag: v0.26) backends: local xml ip usb serial
IIO context created with local backend.
Backend version: 0.26 (git tag: v0.26)
Backend description string: Linux libresdr 6.1.0 #3 SMP PREEMPT Sat Jan 10 15:54:12 UTC 2026 armv7l
IIO context has 8 attributes: hw_model: LibreSDR Rev.5 (Z7020-AD9361) hw_model_variant: 1 hw_serial: ISF2LBLNH73MW73Z fw_version: tezuka-0.2.4 ad9361-phy,xo_correction: 40000000 ad9361-phy,model: ad9361 local,kernel: 6.1.0 uri: local:
IIO context has 4 devices: iio:device0: ad9361-phy 11 channels found: altvoltage1: TX_LO (output) 9 channel-specific attributes found: attr 0: external value: 0 attr 1: fastlock_load value: 0 attr 2: fastlock_recall ERROR: Invalid argument (22) attr 3: fastlock_save value: 0 153,251,63,235,123,117,251,221,46,248,219,234,95,255,143,127 attr 4: fastlock_store value: 0 attr 5: frequency value: 2450000000 attr 6: frequency_available value: [46875001 1 6000000000] attr 7: label value: TX_LO attr 8: powerdown value: 0 voltage1: (output) 10 channel-specific attributes found: attr 0: filter_fir_en value: 0 attr 1: hardwaregain value: -10.000000 dB attr 2: hardwaregain_available value: [-89.750000 0.250000 0.000000] attr 3: rf_bandwidth value: 18000000 attr 4: rf_bandwidth_available value: [200000 1 40000000] attr 5: rf_port_select value: A attr 6: rf_port_select_available value: A B attr 7: rssi value: 0.00 dB attr 8: sampling_frequency value: 30720000 attr 9: sampling_frequency_available value: [2083333 1 61440000] voltage0: (input) 15 channel-specific attributes found: attr 0: bb_dc_offset_tracking_en value: 1 attr 1: filter_fir_en value: 0 attr 2: gain_control_mode value: slow_attack attr 3: gain_control_mode_available value: manual fast_attack slow_attack hybrid attr 4: hardwaregain value: 71.000000 dB attr 5: hardwaregain_available value: [-3 1 71] attr 6: quadrature_tracking_en value: 1 attr 7: rf_bandwidth value: 18000000 attr 8: rf_bandwidth_available value: [200000 1 56000000] attr 9: rf_dc_offset_tracking_en value: 1 attr 10: rf_port_select value: A_BALANCED attr 11: rf_port_select_available value: A_BALANCED B_BALANCED C_BALANCED A_N A_P B_N B_P C_N C_P TX_MONITOR1 TX_MONITOR2 TX_MONITOR1_2 attr 12: rssi value: 102.00 dB attr 13: sampling_frequency value: 30720000 attr 14: sampling_frequency_available value: [2083333 1 61440000] voltage1: (input) 15 channel-specific attributes found: attr 0: bb_dc_offset_tracking_en value: 1 attr 1: filter_fir_en value: 0 attr 2: gain_control_mode value: slow_attack attr 3: gain_control_mode_available value: manual fast_attack slow_attack hybrid attr 4: hardwaregain value: 71.000000 dB attr 5: hardwaregain_available value: [-3 1 71] attr 6: quadrature_tracking_en value: 1 attr 7: rf_bandwidth value: 18000000 attr 8: rf_bandwidth_available value: [200000 1 56000000] attr 9: rf_dc_offset_tracking_en value: 1 attr 10: rf_port_select value: A_BALANCED attr 11: rf_port_select_available value: A_BALANCED B_BALANCED C_BALANCED A_N A_P B_N B_P C_N C_P TX_MONITOR1 TX_MONITOR2 TX_MONITOR1_2 attr 12: rssi value: 101.50 dB attr 13: sampling_frequency value: 30720000 attr 14: sampling_frequency_available value: [2083333 1 61440000] voltage3: (output) 8 channel-specific attributes found: attr 0: filter_fir_en value: 0 attr 1: raw value: 306 attr 2: rf_bandwidth value: 18000000 attr 3: rf_bandwidth_available value: [200000 1 40000000] attr 4: rf_port_select_available value: A B attr 5: sampling_frequency value: 30720000 attr 6: sampling_frequency_available value: [2083333 1 61440000] attr 7: scale value: 1.000000 altvoltage0: RX_LO (output) 9 channel-specific attributes found: attr 0: external value: 0 attr 1: fastlock_load value: 0 attr 2: fastlock_recall ERROR: Invalid argument (22) attr 3: fastlock_save value: 0 254,156,252,124,89,79,255,116,94,247,215,95,87,252,253,252 attr 4: fastlock_store value: 0 attr 5: frequency value: 2400000000 attr 6: frequency_available value: [46875001 1 6000000000] attr 7: label value: RX_LO attr 8: powerdown value: 0 voltage2: (output) 8 channel-specific attributes found: attr 0: filter_fir_en value: 0 attr 1: raw value: 306 attr 2: rf_bandwidth value: 18000000 attr 3: rf_bandwidth_available value: [200000 1 40000000] attr 4: rf_port_select_available value: A B attr 5: sampling_frequency value: 30720000 attr 6: sampling_frequency_available value: [2083333 1 61440000] attr 7: scale value: 1.000000 temp0: (input) 1 channel-specific attributes found: attr 0: input value: 45614 voltage0: (output) 10 channel-specific attributes found: attr 0: filter_fir_en value: 0 attr 1: hardwaregain value: -10.000000 dB attr 2: hardwaregain_available value: [-89.750000 0.250000 0.000000] attr 3: rf_bandwidth value: 18000000 attr 4: rf_bandwidth_available value: [200000 1 40000000] attr 5: rf_port_select value: A attr 6: rf_port_select_available value: A B attr 7: rssi value: 0.00 dB attr 8: sampling_frequency value: 30720000 attr 9: sampling_frequency_available value: [2083333 1 61440000] voltage2: (input) 13 channel-specific attributes found: attr 0: bb_dc_offset_tracking_en value: 1 attr 1: filter_fir_en value: 0 attr 2: gain_control_mode_available value: manual fast_attack slow_attack hybrid attr 3: offset value: 57 attr 4: quadrature_tracking_en value: 1 attr 5: raw value: 0 attr 6: rf_bandwidth value: 18000000 attr 7: rf_bandwidth_available value: [200000 1 56000000] attr 8: rf_dc_offset_tracking_en value: 1 attr 9: rf_port_select_available value: A_BALANCED B_BALANCED C_BALANCED A_N A_P B_N B_P C_N C_P TX_MONITOR1 TX_MONITOR2 TX_MONITOR1_2 attr 10: sampling_frequency value: 30720000 attr 11: sampling_frequency_available value: [2083333 1 61440000] attr 12: scale value: 0.305250 out: (input, WARN:iio_channel_get_type()=UNKNOWN) 1 channel-specific attributes found: attr 0: voltage_filter_fir_en value: 0 19 device-specific attributes found: attr 0: calib_mode value: manual_tx_quad 26 attr 1: calib_mode_available value: auto manual manual_tx_quad tx_quad rf_dc_offs rssi_gain_step attr 2: dcxo_tune_coarse ERROR: No such device (19) attr 3: dcxo_tune_coarse_available value: [0 0 0] attr 4: dcxo_tune_fine ERROR: No such device (19) attr 5: dcxo_tune_fine_available value: [0 0 0] attr 6: ensm_mode value: fdd attr 7: ensm_mode_available value: sleep wait alert fdd pinctrl pinctrl_fdd_indep attr 8: filter_fir_config value: FIR Rx: 0,0 Tx: 0,0 attr 9: gain_table_config value: <gaintable AD9361 type=FULL dest=3 start=1300000000 end=4000000000>
-3, 0x00, 0x00, 0x20
-3, 0x00, 0x00, 0x00
-3, 0x00, 0x00, 0x00
-2, 0x00, 0x01, 0x00
-1, 0x00, 0x02, 0x00
0, 0x00, 0x03, 0x00
1, 0x00, 0x04, 0x00
2, 0x00, 0x05, 0x00
3, 0x01, 0x03, 0x20
4, 0x01, 0x04, 0x00
5, 0x01, 0x05, 0x00
6, 0x01, 0x06, 0x00
7, 0x01, 0x07, 0x00
8, 0x01, 0x08, 0x00
9, 0x01, 0x09, 0x00
10, 0x01, 0x0A, 0x00
11, 0x01, 0x0B, 0x00
12, 0x01, 0x0C, 0x00
13, 0x01, 0x0D, 0x00
14, 0x01, 0x0E, 0x00
15, 0x02, 0x09, 0x20
16, 0x02, 0x0A, 0x00
17, 0x02, 0x0B, 0x00
18, 0x02, 0x0C, 0x00
19, 0x02, 0x0D, 0x00
20, 0x02, 0x0E, 0x00
21, 0x02, 0x0F, 0x00
22, 0x02, 0x10, 0x00
23, 0x02, 0x2B, 0x20
24, 0x02, 0x2C, 0x00
25, 0x04, 0x27, 0x20
26, 0x04, 0x28, 0x00
27, 0x04, 0x29, 0x00
28, 0x04, 0x2A, 0x00
29, 0x04, 0x2B, 0x00
30, 0x24, 0x21, 0x20
31, 0x24, 0x22, 0x00
32, 0x44, 0x20, 0x20
33, 0x44, 0x21, 0x00
34, 0x44, 0x22, 0x00
35, 0x44, 0x23, 0x00
36, 0x44, 0x24, 0x00
37, 0x44, 0x25, 0x00
38, 0x44, 0x26, 0x00
39, 0x44, 0x27, 0x00
40, 0x44, 0x28, 0x00
41, 0x44, 0x29, 0x00
42, 0x44, 0x2A, 0x00
43, 0x44, 0x2B, 0x00
44, 0x44, 0x2C, 0x00
45, 0x44, 0x2D, 0x00
46, 0x44, 0x2E, 0x00
47, 0x44, 0x2F, 0x00
48, 0x44, 0x30, 0x00
49, 0x44, 0x31, 0x00
50, 0x64, 0x2E, 0x20
51, 0x64, 0x2F, 0x00
52, 0x64, 0x30, 0x00
53, 0x64, 0x31, 0x00
54, 0x64, 0x32, 0x00
55, 0x64, 0x33, 0x00
56, 0x64, 0x34, 0x00
57, 0x64, 0x35, 0x00
58, 0x64, 0x36, 0x00
59, 0x64, 0x37, 0x00
60, 0x64, 0x38, 0x00
61, 0x65, 0x38, 0x20
62, 0x66, 0x38, 0x20
63, 0x67, 0x38, 0x20
64, 0x68, 0x38, 0x20
65, 0x69, 0x38, 0x20
66, 0x6A, 0x38, 0x20
67, 0x6B, 0x38, 0x20
68, 0x6C, 0x38, 0x20
69, 0x6D, 0x38, 0x20
70, 0x6E, 0x38, 0x20
71, 0x6F, 0x38, 0x20
</gaintable> attr 10: multichip_sync ERROR: Permission denied (13) attr 11: rssi_gain_step_error value: lna_error: 0 0 0 0
mixer_error: 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
gain_step_calib_reg_val: 0 0 0 0 0 attr 12: rx_path_rates value: BBPLL:983040000 ADC:245760000 R2:122880000 R1:61440000 RF:30720000 RXSAMP:30720000 attr 13: trx_rate_governor value: nominal attr 14: trx_rate_governor_available value: nominal highest_osr attr 15: tx_path_rates value: BBPLL:983040000 DAC:122880000 T2:122880000 T1:61440000 TF:30720000 TXSAMP:30720000 attr 16: waiting_for_supplier value: 0 attr 17: xo_correction value: 40000000 attr 18: xo_correction_available value: [39992000 1 40008000] 183 debug attributes found: debug attr 0: digital_tune value: 0 debug attr 1: calibration_switch_control value: 0 debug attr 2: multichip_sync value: 0 debug attr 3: gaininfo_rx2 value: 71 76 0 0 0 0 0 0 debug attr 4: gaininfo_rx1 value: 70 75 0 0 0 0 0 0 debug attr 5: bist_timing_analysis value: 0 debug attr 6: gpo_set value: 0 debug attr 7: bist_tone value: 0 debug attr 8: bist_prbs value: 0 debug attr 9: loopback value: 0 debug attr 10: initialize value: 0 debug attr 11: adi,bb-clk-change-dig-tune-enable value: 0 debug attr 12: adi,axi-half-dac-rate-enable value: 0 debug attr 13: adi,txmon-2-lo-cm value: 48 debug attr 14: adi,txmon-1-lo-cm value: 48 debug attr 15: adi,txmon-2-front-end-gain value: 2 debug attr 16: adi,txmon-1-front-end-gain value: 2 debug attr 17: adi,txmon-duration value: 8192 debug attr 18: adi,txmon-delay value: 511 debug attr 19: adi,txmon-one-shot-mode-enable value: 0 debug attr 20: adi,txmon-dc-tracking-enable value: 0 debug attr 21: adi,txmon-high-gain value: 24 debug attr 22: adi,txmon-low-gain value: 0 debug attr 23: adi,txmon-low-high-thresh value: 37000 debug attr 24: adi,gpo3-tx-delay-us value: 0 debug attr 25: adi,gpo3-rx-delay-us value: 0 debug attr 26: adi,gpo2-tx-delay-us value: 0 debug attr 27: adi,gpo2-rx-delay-us value: 0 debug attr 28: adi,gpo1-tx-delay-us value: 0 debug attr 29: adi,gpo1-rx-delay-us value: 0 debug attr 30: adi,gpo0-tx-delay-us value: 0 debug attr 31: adi,gpo0-rx-delay-us value: 0 debug attr 32: adi,gpo3-slave-tx-enable value: 0 debug attr 33: adi,gpo3-slave-rx-enable value: 0 debug attr 34: adi,gpo2-slave-tx-enable value: 0 debug attr 35: adi,gpo2-slave-rx-enable value: 0 debug attr 36: adi,gpo1-slave-tx-enable value: 0 debug attr 37: adi,gpo1-slave-rx-enable value: 0 debug attr 38: adi,gpo0-slave-tx-enable value: 0 debug attr 39: adi,gpo0-slave-rx-enable value: 0 debug attr 40: adi,gpo3-inactive-state-high-enable value: 1 debug attr 41: adi,gpo2-inactive-state-high-enable value: 1 debug attr 42: adi,gpo1-inactive-state-high-enable value: 1 debug attr 43: adi,gpo0-inactive-state-high-enable value: 1 debug attr 44: adi,gpo-manual-mode-enable-mask value: 0 debug attr 45: adi,gpo-manual-mode-enable value: 0 debug attr 46: adi,aux-dac2-tx-delay-us value: 0 debug attr 47: adi,aux-dac2-rx-delay-us value: 0 debug attr 48: adi,aux-dac2-active-in-alert-enable value: 0 debug attr 49: adi,aux-dac2-active-in-tx-enable value: 0 debug attr 50: adi,aux-dac2-active-in-rx-enable value: 0 debug attr 51: adi,aux-dac2-default-value-mV value: 0 debug attr 52: adi,aux-dac1-tx-delay-us value: 0 debug attr 53: adi,aux-dac1-rx-delay-us value: 0 debug attr 54: adi,aux-dac1-active-in-alert-enable value: 0 debug attr 55: adi,aux-dac1-active-in-tx-enable value: 0 debug attr 56: adi,aux-dac1-active-in-rx-enable value: 0 debug attr 57: adi,aux-dac1-default-value-mV value: 0 debug attr 58: adi,aux-dac-manual-mode-enable value: 1 debug attr 59: adi,aux-adc-decimation value: 256 debug attr 60: adi,aux-adc-rate value: 40000000 debug attr 61: adi,temp-sense-decimation value: 256 debug attr 62: adi,temp-sense-periodic-measurement-enable value: 1 debug attr 63: adi,temp-sense-offset-signed value: 206 debug attr 64: adi,temp-sense-measurement-interval-ms value: 1000 debug attr 65: adi,elna-gaintable-all-index-enable value: 0 debug attr 66: adi,elna-rx2-gpo1-control-enable value: 0 debug attr 67: adi,elna-rx1-gpo0-control-enable value: 0 debug attr 68: adi,elna-bypass-loss-mdB value: 0 debug attr 69: adi,elna-gain-mdB value: 0 debug attr 70: adi,elna-settling-delay-ns value: 0 debug attr 71: adi,ctrl-outs-enable-mask value: 255 debug attr 72: adi,ctrl-outs-index value: 0 debug attr 73: adi,rssi-duration value: 1000 debug attr 74: adi,rssi-wait value: 1 debug attr 75: adi,rssi-delay value: 1 debug attr 76: adi,rssi-unit-is-rx-samples-enable value: 0 debug attr 77: adi,rssi-restart-mode value: 3 debug attr 78: adi,fagc-adc-large-overload-inc-steps value: 2 debug attr 79: adi,fagc-power-measurement-duration-in-state5 value: 64 debug attr 80: adi,fagc-rst-gla-if-en-agc-pulled-high-mode value: 0 debug attr 81: adi,fagc-rst-gla-en-agc-pulled-high-enable value: 0 debug attr 82: adi,fagc-rst-gla-large-lmt-overload-enable value: 1 debug attr 83: adi,fagc-rst-gla-large-adc-overload-enable value: 1 debug attr 84: adi,fagc-energy-lost-stronger-sig-gain-lock-exit-cnt value: 8 debug attr 85: adi,fagc-rst-gla-engergy-lost-sig-thresh-below-ll value: 10 debug attr 86: adi,fagc-rst-gla-engergy-lost-goto-optim-gain-enable value: 1 debug attr 87: adi,fagc-rst-gla-engergy-lost-sig-thresh-exceeded-enable value: 1 debug attr 88: adi,fagc-rst-gla-stronger-sig-thresh-above-ll value: 10 debug attr 89: adi,fagc-optimized-gain-offset value: 5 debug attr 90: adi,fagc-rst-gla-stronger-sig-thresh-exceeded-enable value: 1 debug attr 91: adi,fagc-use-last-lock-level-for-set-gain-enable value: 1 debug attr 92: adi,fagc-gain-index-type-after-exit-rx-mode value: 0 debug attr 93: adi,fagc-gain-increase-after-gain-lock-enable value: 0 debug attr 94: adi,fagc-final-overrange-count value: 3 debug attr 95: adi,fagc-lmt-final-settling-steps value: 1 debug attr 96: adi,fagc-lpf-final-settling-steps value: 1 debug attr 97: adi,fagc-lock-level-gain-increase-upper-limit value: 5 debug attr 98: adi,fagc-lock-level-lmt-gain-increase-enable value: 1 debug attr 99: adi,fagc-lp-thresh-increment-steps value: 1 debug attr 100: adi,fagc-lp-thresh-increment-time value: 5 debug attr 101: adi,fagc-allow-agc-gain-increase-enable value: 0 debug attr 102: adi,fagc-state-wait-time-ns value: 260 debug attr 103: adi,fagc-dec-pow-measurement-duration value: 64 debug attr 104: adi,agc-immed-gain-change-if-large-lmt-overload-enable value: 0 debug attr 105: adi,agc-immed-gain-change-if-large-adc-overload-enable value: 0 debug attr 106: adi,agc-gain-update-interval-us value: 1000 debug attr 107: adi,agc-sync-for-gain-counter-enable value: 0 debug attr 108: adi,agc-dig-gain-step-size value: 4 debug attr 109: adi,agc-dig-saturation-exceed-counter value: 3 debug attr 110: adi,agc-lmt-overload-large-inc-steps value: 2 debug attr 111: adi,agc-lmt-overload-small-exceed-counter value: 10 debug attr 112: adi,agc-lmt-overload-large-exceed-counter value: 10 debug attr 113: adi,agc-adc-lmt-small-overload-prevent-gain-inc-enable value: 0 debug attr 114: adi,agc-adc-large-overload-inc-steps value: 2 debug attr 115: adi,agc-adc-large-overload-exceed-counter value: 10 debug attr 116: adi,agc-adc-small-overload-exceed-counter value: 10 debug attr 117: adi,agc-dig-sat-ovrg-enable value: 0 debug attr 118: adi,agc-outer-thresh-low-inc-steps value: 2 debug attr 119: adi,agc-outer-thresh-low value: 18 debug attr 120: adi,agc-inner-thresh-low-inc-steps value: 1 debug attr 121: adi,agc-inner-thresh-low value: 12 debug attr 122: adi,agc-inner-thresh-high-dec-steps value: 1 debug attr 123: adi,agc-inner-thresh-high value: 10 debug attr 124: adi,agc-outer-thresh-high-dec-steps value: 2 debug attr 125: adi,agc-outer-thresh-high value: 5 debug attr 126: adi,agc-attack-delay-extra-margin-us value: 1 debug attr 127: adi,mgc-split-table-ctrl-inp-gain-mode value: 0 debug attr 128: adi,mgc-dec-gain-step value: 2 debug attr 129: adi,mgc-inc-gain-step value: 2 debug attr 130: adi,mgc-rx2-ctrl-inp-enable value: 0 debug attr 131: adi,mgc-rx1-ctrl-inp-enable value: 0 debug attr 132: adi,gc-use-rx-fir-out-for-dec-pwr-meas-enable value: 0 debug attr 133: adi,gc-max-dig-gain value: 15 debug attr 134: adi,gc-dig-gain-enable value: 0 debug attr 135: adi,gc-low-power-thresh value: 24 debug attr 136: adi,gc-dec-pow-measurement-duration value: 8192 debug attr 137: adi,gc-lmt-overload-low-thresh value: 704 debug attr 138: adi,gc-lmt-overload-high-thresh value: 800 debug attr 139: adi,gc-adc-large-overload-thresh value: 58 debug attr 140: adi,gc-adc-small-overload-thresh value: 47 debug attr 141: adi,gc-adc-ovr-sample-size value: 4 debug attr 142: adi,gc-rx2-mode value: 2 debug attr 143: adi,gc-rx1-mode value: 2 debug attr 144: adi,update-tx-gain-in-alert-enable value: 0 debug attr 145: adi,tx-attenuation-mdB value: 10000 debug attr 146: adi,rf-tx-bandwidth-hz value: 18000000 debug attr 147: adi,rf-rx-bandwidth-hz value: 18000000 debug attr 148: adi,qec-tracking-slow-mode-enable value: 0 debug attr 149: adi,dc-offset-count-low-range value: 50 debug attr 150: adi,dc-offset-count-high-range value: 40 debug attr 151: adi,dc-offset-attenuation-low-range value: 5 debug attr 152: adi,dc-offset-attenuation-high-range value: 6 debug attr 153: adi,dc-offset-tracking-update-event-mask value: 5 debug attr 154: adi,clk-output-mode-select value: 0 debug attr 155: adi,external-rx-lo-enable value: 0 debug attr 156: adi,external-tx-lo-enable value: 0 debug attr 157: adi,xo-disable-use-ext-refclk-enable value: 1 debug attr 158: adi,tx-lo-powerdown-managed-enable value: 1 debug attr 159: adi,trx-synthesizer-target-fref-overwrite-hz value: 80008000 debug attr 160: adi,rx1-rx2-phase-inversion-enable value: 0 debug attr 161: adi,tx-rf-port-input-select-lock-enable value: 1 debug attr 162: adi,rx-rf-port-input-select-lock-enable value: 1 debug attr 163: adi,tx-rf-port-input-select value: 0 debug attr 164: adi,rx-rf-port-input-select value: 0 debug attr 165: adi,split-gain-table-mode-enable value: 0 debug attr 166: adi,1rx-1tx-mode-use-tx-num value: 1 debug attr 167: adi,1rx-1tx-mode-use-rx-num value: 1 debug attr 168: adi,2rx-2tx-mode-enable value: 1 debug attr 169: adi,digital-interface-tune-fir-disable value: 0 debug attr 170: adi,digital-interface-tune-skip-mode value: 0 debug attr 171: adi,tx-fastlock-pincontrol-enable value: 0 debug attr 172: adi,rx-fastlock-pincontrol-enable value: 0 debug attr 173: adi,rx-fastlock-delay-ns value: 0 debug attr 174: adi,tx-fastlock-delay-ns value: 0 debug attr 175: adi,tdd-skip-vco-cal-enable value: 0 debug attr 176: adi,tdd-use-dual-synth-mode-enable value: 0 debug attr 177: adi,debug-mode-enable value: 0 debug attr 178: adi,ensm-enable-txnrx-control-enable value: 0 debug attr 179: adi,ensm-enable-pin-pulse-mode-enable value: 0 debug attr 180: adi,frequency-division-duplex-independent-mode-enable value: 0 debug attr 181: adi,frequency-division-duplex-mode-enable value: 1 debug attr 182: direct_reg_access value: 0x81 No trigger on this device iio:device1: xadc 10 channels found: voltage5: vccoddr (input) 3 channel-specific attributes found: attr 0: label value: vccoddr attr 1: raw value: 2014 attr 2: scale value: 0.732421875 voltage0: vccint (input) 3 channel-specific attributes found: attr 0: label value: vccint attr 1: raw value: 1320 attr 2: scale value: 0.732421875 voltage4: vccpaux (input) 3 channel-specific attributes found: attr 0: label value: vccpaux attr 1: raw value: 2367 attr 2: scale value: 0.732421875 temp0: (input) 3 channel-specific attributes found: attr 0: offset value: -2219 attr 1: raw value: 2618 attr 2: scale value: 123.040771484 voltage7: vrefn (input) 3 channel-specific attributes found: attr 0: label value: vrefn attr 1: raw value: -14 attr 2: scale value: 0.732421875 voltage1: vccaux (input) 3 channel-specific attributes found: attr 0: label value: vccaux attr 1: raw value: 2367 attr 2: scale value: 0.732421875 voltage2: vccbram (input) 3 channel-specific attributes found: attr 0: label value: vccbram attr 1: raw value: 1310 attr 2: scale value: 0.732421875 voltage3: vccpint (input) 3 channel-specific attributes found: attr 0: label value: vccpint attr 1: raw value: 1315 attr 2: scale value: 0.732421875 voltage8: (input) 2 channel-specific attributes found: attr 0: raw value: 0 attr 1: scale value: 0.244140625 voltage6: vrefp (input) 3 channel-specific attributes found: attr 0: label value: vrefp attr 1: raw value: 1692 attr 2: scale value: 0.732421875 2 device-specific attributes found: attr 0: sampling_frequency value: 961538 attr 1: waiting_for_supplier value: 0 No trigger on this device iio:device2: cf-ad9361-dds-core-lpc (buffer capable) 12 channels found: voltage0: (output, index: 0, format: le:S16/16>>0) 4 channel-specific attributes found: attr 0: calibphase value: 0.000000 attr 1: calibscale value: 1.000000 attr 2: sampling_frequency value: 30720000 attr 3: sampling_frequency_available value: 30720000 3840000 voltage1: (output, index: 1, format: le:S16/16>>0) 4 channel-specific attributes found: attr 0: calibphase value: 0.000000 attr 1: calibscale value: 1.000000 attr 2: sampling_frequency value: 30720000 attr 3: sampling_frequency_available value: 30720000 3840000 voltage2: (output, index: 2, format: le:S16/16>>0) 4 channel-specific attributes found: attr 0: calibphase value: 0.000000 attr 1: calibscale value: 1.000000 attr 2: sampling_frequency value: 30720000 attr 3: sampling_frequency_available value: 30720000 3840000 voltage3: (output, index: 3, format: le:S16/16>>0) 4 channel-specific attributes found: attr 0: calibphase value: 0.000000 attr 1: calibscale value: 1.000000 attr 2: sampling_frequency value: 30720000 attr 3: sampling_frequency_available value: 30720000 3840000 altvoltage3: TX1_Q_F2 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX1_Q_F2 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage1: TX1_I_F2 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX1_I_F2 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage0: TX1_I_F1 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX1_I_F1 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage7: TX2_Q_F2 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX2_Q_F2 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage6: TX2_Q_F1 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX2_Q_F1 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage5: TX2_I_F2 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX2_I_F2 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage2: TX1_Q_F1 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX1_Q_F1 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 altvoltage4: TX2_I_F1 (output) 6 channel-specific attributes found: attr 0: frequency value: 0 attr 1: label value: TX2_I_F1 attr 2: phase value: 0 attr 3: raw value: 1 attr 4: sampling_frequency value: 30720000 attr 5: scale value: 0.000000 3 device-specific attributes found: attr 0: sync_start_enable value: arm attr 1: sync_start_enable_available value: arm attr 2: waiting_for_supplier value: 0 3 buffer-specific attributes found: attr 0: data_available value: 0 attr 1: direction value: out attr 2: length_align_bytes value: 8 1 debug attributes found: debug attr 0: direct_reg_access value: 0x90262 No trigger on this device iio:device3: cf-ad9361-lpc (buffer capable) 4 channels found: voltage0: (input, index: 0, format: le:S12/16>>0) 6 channel-specific attributes found: attr 0: calibbias value: 0 attr 1: calibphase value: 0.000000 attr 2: calibscale value: 1.000000 attr 3: samples_pps ERROR: No such device (19) attr 4: sampling_frequency value: 30720000 attr 5: sampling_frequency_available value: 30720000 3840000 voltage1: (input, index: 1, format: le:S12/16>>0) 6 channel-specific attributes found: attr 0: calibbias value: 0 attr 1: calibphase value: 0.000000 attr 2: calibscale value: 1.000000 attr 3: samples_pps ERROR: No such device (19) attr 4: sampling_frequency value: 30720000 attr 5: sampling_frequency_available value: 30720000 3840000 voltage2: (input, index: 2, format: le:S12/16>>0) 6 channel-specific attributes found: attr 0: calibbias value: 0 attr 1: calibphase value: 0.000000 attr 2: calibscale value: 1.000000 attr 3: samples_pps ERROR: No such device (19) attr 4: sampling_frequency value: 30720000 attr 5: sampling_frequency_available value: 30720000 3840000 voltage3: (input, index: 3, format: le:S12/16>>0) 6 channel-specific attributes found: attr 0: calibbias value: 0 attr 1: calibphase value: 0.000000 attr 2: calibscale value: 1.000000 attr 3: samples_pps ERROR: No such device (19) attr 4: sampling_frequency value: 30720000 attr 5: sampling_frequency_available value: 30720000 3840000 3 device-specific attributes found: attr 0: sync_start_enable value: disarm attr 1: sync_start_enable_available value: arm attr 2: waiting_for_supplier value: 0 3 buffer-specific attributes found: attr 0: data_available value: 0 attr 1: direction value: in attr 2: length_align_bytes value: 8 2 debug attributes found: debug attr 0: pseudorandom_err_check value: CH0 : PN9 : Out of Sync : PN Error
CH1 : PN9 : Out of Sync : PN Error
CH2 : PN9 : Out of Sync : PN Error
CH3 : PN9 : Out of Sync : PN Error debug attr 1: direct_reg_access value: 0x0 No trigger on this device
#
` 73 de F4EGM** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Je souhaite y installer TailScale pour pouvoir y accéder rapidement mais : Code: `# curl -fsSL https://tailscale.com/install.sh | sh
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: https://curl.se/docs/sslcerts.html curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the webpage mentioned above.
` J'ai d'abord pensé à un probléme de certificat sur tailscale.com mais après les avoir forcé à la main erreur : Code: `# echo 'export SSL_CERT_FILE=/etc/ssl/cert.pem' >> /etc/profile
# curl --cacert /etc/ssl/cert.pem https://tailscale.com/install.sh | sh % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
100 19842 100 19842 0 0 38554 0 --:--:-- --:--:-- --:--:-- 39369
Couldn't determine what kind of Linux is running.
You could try the static binaries at:
https://pkgs.tailscale.com/stable/#static If you'd like us to support your system better, please email [support@tailscale.com](https://f4egm.forumactif.com/t2-libresdr-zyinq7020-et-ad9363mailto:support@tailscale.com)
and tell us what OS you're running. Please include the following information we gathered from your system: OS=other-linux
VERSION=
PACKAGETYPE=
UNAME=Linux libresdr 6.1.0 #3 SMP PREEMPT Sat Jan 10 15:54:12 UTC 2026 armv7l GNU/Linux NAME=Buildroot
VERSION=2025.05
ID=buildroot
VERSION_ID=2025.05
PRETTY_NAME="Buildroot 2025.05"
` Tailscale ne connait pas ma distribution ! Il va falloir se passer du script! ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Il faut aller chercher le fichier Code: `cd /tmp
curl --cacert /etc/ssl/cert.pem -L -o tailscale.tgz \ https://pkgs.tailscale.com/stable/tailscale_1.92.5_arm.tgz` Le décompresser : Code: `gunzip tailscale.tgz
tar xf tailscale.tar` Vérification
Après extraction : Code: `ls` On doit voir un dossier du type :
tailscale_1.92.5_arm/ Dedans : Code: `ls tailscale_1.92.5_arm` # tailscale tailscaled README.md Puis créer le répertoire Code: `mkdir -p /usr/local/bin /usr/local/sbin` Puis installer : Code: `install -m 0755 tailscale_1.92.5_arm/tailscale /usr/local/bin/tailscale
install -m 0755 tailscale_1.92.5_arm/tailscaled /usr/local/sbin/tailscaled` Et lancer : Code: `mkdir -p /var/lib/tailscale
/usr/local/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state &
/usr/local/bin/tailscale up` On finira par voir un lien : Code: `stopEngineAndWait...
stopEngineAndWait: done. To authenticate, visit: https://login.tailscale.com/a/7123456789 control: RegisterReq: onode= node=[OnpSg] fup=true nks=false` Il faut alors se connecter à son compte tailscale et simplement coller ce lien dans le navigateur! Et Hop ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

OK j'ai réussi à mettre Tailscale Code: `# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000 link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 inet 127.0.0.1/8 scope host lo valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast qlen 1000 link/ether 00:60:88:c9:16:f4 brd ff:ff:ff:ff:ff:ff inet 192.168.9.150/23 brd 192.168.9.255 scope global eth0 valid_lft forever preferred_lft forever
3: sit0@NONE: <NOARP> mtu 1480 qdisc noop qlen 1000 link/sit 0.0.0.0 brd 0.0.0.0
4: usb0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast qlen 1000 link/ether 00:05:f7:d7:a7:25 brd ff:ff:ff:ff:ff:ff inet 192.168.2.1/24 scope global usb0 valid_lft forever preferred_lft forever
6: tailscale0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1280 qdisc pfifo_fast qlen 500 link/[65534] inet 100.00.00.000/32 scope global tailscale0 valid_lft forever preferred_lft forever
` Code: `Et libiio fonctionne bien avec SDR Console!
<code>
# /sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage0_RX_LO_frequency MODIFY
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage0_RX_LO_frequency MODIFY
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
cma: cma_alloc: reserved: alloc failed, req-size: 489 pages, ret: -12
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
ad9361 spi0.0: ad9361_validate_enable_fir: Invalid: TAPS > 64 and Interpolation = 1
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage0_RX_LO_frequency MODIFY
/sys/bus/iio/devices/iio:device0/out_altvoltage0_RX_LO_frequency MODIFY
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT ON
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF
/sys/bus/iio/devices/iio:device0/out_altvoltage1_TX_LO_powerdown MODIFY
SdrConsole PTT OFF` ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

La suite des opérations, c'est de rendre possible de passer en TX BLU supérieure depuis une page Web sur TX1
De recevoir le QO-100 et de faire un suivi en fréquence sur RX1
- Option pour faire du FT-8 !!! Donc audio virtuel.
- PTT
- Ajustement de la puissance De faire une interface FM émission réception compatible SVXLink en FM seulement. Le tout par GNURadio : AD9363 ↑↓
GNU Radio (maître IIO) ├── TX audio ← OpenWebTRX ├── RX IQ → OpenWebTRX ├── RX audio → svxlink └── TX audio ← svxlink (FM)** J'aime** Je n'aime pas

---
*Article importé du [forum F4EGM](https://f4egm.forumactif.com/t2-libresdr-zyinq7020-et-ad9363)*