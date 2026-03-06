---

title: "Incident réseau sur serveur KVM distant : bridge Linux cassé et récupération via iDRAC"
date: 2026-03-04
draft: false
tags: ["linux", "kvm", "libvirt", "bridge", "debian", "idrac", "home-assistant", "virtualisation", "réseau"]

cover:
  image: "https://github.com/user-attachments/assets/c5ef579f-46ee-4e1b-8d0c-f1f3a43c7009"
------------------------------------------------------------------------------------------------------------

# Incident réseau sur serveur KVM distant

## Bridge Linux cassé et récupération d’un serveur à 50 km

Lors de la mise en place d’une machine virtuelle **Home Assistant OS** sur un serveur Debian utilisant **KVM/libvirt**, une modification réseau a provoqué une coupure totale du serveur : plus de SSH, plus de Tailscale, plus d’accès aux services Docker.

Le serveur se trouvant à **plus de 50 km**, toute intervention physique était impossible.
Cet article décrit **le problème, l’analyse et la procédure de récupération**.

---

# Architecture du serveur

Le serveur héberge plusieurs services :

* Docker
* Tailscale
* Machines virtuelles KVM (libvirt)
* Home Assistant OS

Le réseau est basé sur un **bridge Linux** permettant aux VM d’être directement sur le LAN.

Schéma réseau :

```
LAN
 │
eno1 (interface physique)
 │
br0 (bridge Linux)
 │
 ├── Host Debian (192.168.1.120)
 └── VM Home Assistant
```

---

# Symptôme initial

Après une modification réseau :

* Tous les services deviennent inaccessibles
* SSH ne répond plus
* Tailscale tombe
* Docker disparaît du réseau

Depuis une autre machine du LAN :

```
ssh: connect to host 192.168.1.120 port 22: No route to host
```

La table ARP montre pourtant que la machine existe encore :

```
192.168.1.120 dev enp2s0 lladdr 9a:9d:4c:5d:3a:f1 STALE
```

Le serveur est donc **allumé mais sans réseau fonctionnel**.

---

# Analyse du problème

Sur le serveur, la configuration réseau reposait sur :

```
eno1 → br0
br0 → IP du serveur
```

Mais le fichier :

```
/etc/network/interfaces
```

était **vide** :

```
auto lo
iface lo inet loopback
```

La configuration du bridge avait été créée **à chaud**, sans être persistante.

Conséquence :

* au redémarrage ou au reload réseau
* `eno1` est attaché à `br0`
* mais **br0 ne reçoit aucune configuration IP**

Résultat :

```
eno1 -> bridge
bridge -> pas d'IP
host -> plus de réseau
```

Et comme **Docker et Tailscale reposent sur le réseau du host**, tout disparaît.

---

# Récupération du serveur à distance

Le serveur étant inaccessible en SSH, il a fallu passer par **l'iDRAC Dell**.

Le contrôleur était sur un autre réseau :

```
192.168.0.120
```

Un tunnel SSH a été créé via une machine intermédiaire accessible par Tailscale :

```
ssh -L 8443:192.168.0.120:443 user@machine_du_lan
```

Puis accès à l'iDRAC :

```
https://localhost:8443
```

Cependant la **console KVM nécessite une licence iDRAC Enterprise**.

La solution a donc été d'utiliser simplement :

```
Power → Cycle d'alimentation du système
```

Ce redémarrage complet a permis à Debian de reconstruire automatiquement le bridge.

---

# État du système après redémarrage

Après reboot :

```
ip a
```

```
eno1: master br0
br0: 192.168.1.120
tailscale0: OK
docker bridges: OK
```

Le serveur est à nouveau accessible.

---

# Problème secondaire : VM arrêtée

Après redémarrage du serveur :

```
virsh list --all
```

```
haos fermé
```

La VM Home Assistant était simplement arrêtée.

Redémarrage :

```
sudo virsh start haos
```

Puis vérification :

```
sudo virsh list
```

```
haos en cours d’exécution
```

L'adresse de la VM apparaît ensuite dans la table ARP :

```
192.168.1.94 lladdr 52:54:00:ad:7d:e2
```

Une fois Home Assistant démarré :

```
http://192.168.1.94:8123
```

---

# Correction définitive

Pour éviter toute nouvelle coupure, la configuration réseau a été rendue persistante.

```
sudo nano /etc/network/interfaces
```

Configuration finale :

```
auto lo
iface lo inet loopback

auto eno1
iface eno1 inet manual

auto br0
iface br0 inet static
    address 192.168.1.120
    netmask 255.255.255.0
    gateway 192.168.1.1
    bridge_ports eno1
    bridge_stp off
    bridge_fd 0
```

Cette configuration garantit que :

* l'IP reste attachée au **bridge**
* les VM restent sur le LAN
* les redémarrages ne cassent plus le réseau.

---

# Bonnes pratiques retenues

## 1. Toujours persister la configuration réseau

Ne jamais laisser un bridge configuré uniquement **à chaud**.

---

## 2. Garder un accès matériel distant

Un contrôleur comme **iDRAC / IPMI / iLO** est indispensable pour les serveurs distants.

---

## 3. Prévoir une console série

Sans licence iDRAC Enterprise, la **console série Linux** peut servir de secours.

---

## 4. Automatiser le démarrage des VM

Pour éviter qu'elles restent arrêtées après reboot :

```
sudo virsh autostart haos
```

---

# Conclusion

Une simple modification réseau peut facilement rendre un serveur complètement inaccessible.

Dans ce cas précis :

* le serveur était toujours fonctionnel
* seul le **bridge Linux avait perdu son IP**
* l'accès **iDRAC a permis la récupération à distance**

Une configuration réseau correcte et persistante évite désormais tout risque de blocage similaire.

---

Ce type d'incident rappelle l'importance de toujours prévoir **un accès hors bande (out-of-band)** lorsqu'on administre un serveur à distance.
