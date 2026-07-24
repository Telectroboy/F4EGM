---
title: "remoteTRX1 : transformer un Raspberry Pi Zero W en passerelle radio distante"
date: 2026-07-21
draft: false
description: "Tentative de réalisation d'une petite passerelle Web pour piloter et écouter un QMX+ ou un FT-991 à distance avec un Raspberry Pi Zero W."
tags:
  - Raspberry Pi
  - Raspberry Pi Zero W
  - QMX+
  - FT-991
  - Hamlib
  - radioamateur
  - remote
cover:
  image: "https://github.com/user-attachments/assets/aceb6e01-cbb4-4684-b761-b1aa1396b25d"

---

# remoteTRX1 : transformer un Raspberry Pi Zero W en passerelle radio distante

Je cherche depuis quelque temps une solution simple pour utiliser un poste radio à distance depuis un téléphone, une tablette ou un ordinateur.

Mon objectif n'est pas seulement de modifier la fréquence ou de passer le poste en émission. Je voudrais pouvoir :

- écouter l'audio reçu ;
- utiliser le microphone du navigateur pour émettre ;
- commander la fréquence, le mode et le PTT ;
- accéder au poste depuis une simple page Web ;
- éviter d'installer une application spécifique sur chaque appareil ;
- utiliser au départ un QMX+, puis éventuellement un Yaesu FT-991.

Le projet a pris le nom **remoteTRX1**.

L'idée est de placer un petit Raspberry Pi à côté du poste. Il servirait de passerelle entre l'USB de la radio et le réseau Wi-Fi.

Je possède déjà un **Raspberry Pi Zero W première génération**, version 1.1. Il est petit, léger et consomme peu. Ce serait donc une plateforme très intéressante pour un montage portable.

Le problème est qu'il commence à dater sérieusement.

Il utilise un processeur ARMv6 monocœur avec seulement 512 Mo de mémoire. Je ne sais pas encore s'il sera réellement assez puissant pour gérer en même temps le Wi-Fi, le CAT, l'audio bidirectionnel, la compression et une interface Web avec une latence acceptable.

C'est précisément ce que je veux vérifier.

---

## Le point de départ : DigiPi

Mon idée initiale était d'utiliser directement **DigiPi**, qui propose déjà plusieurs fonctions radioamateur accessibles depuis une interface Web.

J'ai testé l'image DigiPi 2.10 sur plusieurs Raspberry Pi :

- Raspberry Pi 5 ;
- Raspberry Pi 3B+ ;
- Raspberry Pi Zero W v1.1.

Sur le Zero W, le point d'accès Wi-Fi refusait de démarrer. Le service `autohotspot.service` restait en erreur avec notamment :

```text
Connection activation failed:
802.1X supplicant took too long to authenticate
```

Les journaux de `wpa_supplicant` montraient également :

```text
key setting validation failed
Could not connect to kernel driver
Failed to initialize AP interface
```

Craig, l'auteur de DigiPi, m'a indiqué que les Raspberry Pi 2B, 3B et Zero première génération ne sont pas supportés par la version actuelle. Il proposait malgré tout de supprimer les deux lignes suivantes dans le profil NetworkManager :

```ini
group=ccmp
pairwise=ccmp
```

J'ai fait la modification, mais le point d'accès n'a toujours pas démarré correctement sur mon Zero W.

À ce stade, continuer à modifier DigiPi me semblait peu productif.

J'ai donc décidé de repartir d'une installation propre et de construire uniquement les fonctions dont j'ai réellement besoin.

---

## Pourquoi insister avec le Raspberry Pi Zero W ?

La réponse la plus simple serait probablement d'utiliser un Raspberry Pi 3B+, un Zero 2 W ou un modèle plus récent.

Mais le Zero W présente plusieurs avantages pour ce projet :

- je le possède déjà ;
- il est très compact ;
- il est léger ;
- il peut facilement rester fixé au poste ;
- il demande peu de puissance électrique ;
- il possède déjà le Wi-Fi ;
- il dispose d'un port USB OTG.

Je ne cherche pas à faire fonctionner un environnement graphique complet, WSJT-X ou un bureau distant.

Je veux construire une passerelle spécialisée, sans écran et sans interface graphique locale.

La question devient donc :

> Jusqu'où peut-on aller avec un Raspberry Pi Zero W si l'on limite le logiciel au strict nécessaire ?

---

## Objectif fonctionnel

À terme, je voudrais obtenir quelque chose de ce type :

```text
Téléphone, tablette ou ordinateur
                 |
                 | Wi-Fi / réseau IP
                 v
+--------------------------------------+
| Raspberry Pi Zero W                  |
|                                      |
| - interface Web                      |
| - serveur Python                     |
| - contrôle CAT avec Hamlib           |
| - gestion audio ALSA                 |
| - compression/décompression audio    |
| - gestion du PTT                     |
| - sécurités de temporisation TX      |
+--------------------------------------+
                 |
                 | USB
                 v
+--------------------------------------+
| QMX+ ou FT-991                       |
|                                      |
| - port série CAT                     |
| - carte son USB                      |
| - PTT                                |
+--------------------------------------+
```

Depuis le navigateur, je voudrais voir au minimum :

```text
Fréquence : 7.074.000 MHz
Mode      : USB
État      : RX

[ -1 kHz ] [ -100 Hz ] [ +100 Hz ] [ +1 kHz ]

[ USB ] [ LSB ] [ CW ] [ DIGI ]

[ Maintenir pour émettre ]
```

La première version restera volontairement simple.

Je préfère d'abord obtenir une liaison fiable plutôt que de construire immédiatement une belle interface qui ne fonctionne pas correctement.

---

## Le matériel radio envisagé

### QMX+

Le QMX+ est ma première cible.

Le principe est particulièrement intéressant : un seul câble USB doit permettre de récupérer à la fois :

- le port série CAT ;
- l'audio reçu ;
- l'audio à transmettre ;
- la commande PTT.

Je n'ai pas encore branché le QMX+ sur le Raspberry Pi Zero W, car je ne l'ai pas sous la main au moment où j'écris ces lignes.

Il faudra donc vérifier concrètement :

```bash
lsusb
```

puis :

```bash
ls -l /dev/ttyACM* /dev/ttyUSB*
```

et enfin :

```bash
arecord -l
aplay -l
```

Je veux identifier précisément :

- le port série utilisé par le CAT ;
- la carte son USB ;
- les formats audio réellement acceptés ;
- les noms ALSA de l'entrée et de la sortie ;
- le comportement du PTT.

### Yaesu FT-991

Le FT-991 est une autre cible intéressante, car il propose également une liaison USB avec CAT et audio.

L'objectif est de ne pas écrire une application dépendante d'un seul poste.

L'interface Web devra si possible rester identique. Seule la configuration Hamlib, le port série et quelques paramètres audio devront changer.

---

## Installation actuelle

J'ai préparé une nouvelle carte avec Raspberry Pi OS Lite.

Le Raspberry Pi porte le nom :

```text
remoteTRX1
```

Il est actuellement connecté au réseau Wi-Fi local et accessible en SSH.

La plateforme détectée est :

```text
armv6l
```

Le système installé est :

```text
Raspbian GNU/Linux 13 (trixie)
```

Cela impose une contrainte importante : tous les logiciels utilisés doivent encore être compatibles avec l'architecture ARMv6.

Je ne peux pas supposer qu'un binaire annoncé comme « ARM 32 bits » fonctionnera forcément sur ce processeur.

---

## Les briques logicielles retenues pour le moment

### Hamlib

J'ai installé les outils Hamlib :

```bash
sudo apt install -y libhamlib-utils
```

La version disponible sur cette installation est :

```text
rigctld Hamlib 4.6.2
```

Le programme principal sera probablement :

```text
rigctld
```

Il fera l'interface entre le port CAT du poste et mon application Web.

L'architecture prévue est la suivante :

```text
Navigateur
    |
    | HTTP / WebSocket
    v
Serveur Python
    |
    | protocole rigctld
    v
Hamlib
    |
    | CAT série USB
    v
Poste radio
```

L'intérêt de cette couche est de ne pas avoir à réimplémenter le protocole CAT de chaque poste.

Je dois néanmoins vérifier que le QMX+ est correctement identifié par Hamlib, ou déterminer quel modèle générique ou compatible il faut utiliser.

### ALSA

J'ai également installé les outils ALSA :

```bash
sudo apt install -y alsa-utils
```

La version actuelle de `arecord` est :

```text
arecord 1.2.14
```

ALSA sera utilisé pour :

- capturer l'audio reçu depuis la carte son USB du poste ;
- envoyer l'audio du microphone vers le poste.

La première étape sera de tester l'audio sans navigateur, directement en ligne de commande.

Par exemple, pour enregistrer quelques secondes :

```bash
arecord -D hw:1,0 -f S16_LE -r 48000 -c 1 test.wav
```

Les valeurs exactes seront adaptées après détection du matériel.

### FFmpeg

FFmpeg est prévu pour réaliser les conversions et la compression audio.

L'idée est de ne pas envoyer au navigateur un flux PCM brut à 48 kHz si ce n'est pas nécessaire.

Le chemin RX envisagé est :

```text
Poste
  |
  | USB audio
  v
ALSA
  |
  | PCM
  v
FFmpeg
  |
  | audio compressé
  v
Serveur Web
  |
  | Wi-Fi
  v
Navigateur
```

Pour la réception, un flux mono compressé avec un débit modéré devrait être suffisant.

Je ne sais pas encore quel format donnera le meilleur compromis entre :

- charge processeur ;
- latence ;
- stabilité ;
- compatibilité avec les navigateurs ;
- qualité audio.

Opus semble intéressant, mais son coût CPU devra être mesuré sur ARMv6.

### Python et aiohttp

Le serveur Web sera probablement écrit en Python avec `aiohttp`.

Cette solution permet de regrouper dans un seul processus :

- le serveur HTTP ;
- les pages statiques ;
- une API ;
- les WebSockets ;
- le dialogue avec `rigctld` ;
- la supervision des processus audio.

L'installation prévue est :

```bash
sudo apt install -y python3-aiohttp ffmpeg
```

Je veux éviter une architecture trop lourde avec plusieurs serveurs, plusieurs frameworks et une base de données inutile.

Le Zero W n'a pas beaucoup de ressources. Chaque couche ajoutée devra avoir une justification.

---

## Première étape fonctionnelle : le CAT

Avant de penser à l'audio, je veux réussir à piloter le poste.

Les premiers tests devront permettre de :

1. détecter le port série ;
2. lancer `rigctld` ;
3. lire la fréquence ;
4. changer la fréquence ;
5. lire le mode ;
6. changer le mode ;
7. activer puis désactiver le PTT.

Le PTT sera testé sans audio au début.

Ce point est important : il faut pouvoir couper l'émission de manière fiable avant de commencer à transporter du son.

---

## Deuxième étape : une page Web minimale

La première interface Web ne cherchera pas à reproduire la façade complète du poste.

Elle contiendra probablement :

- la fréquence ;
- le mode ;
- l'état RX ou TX ;
- quelques boutons de pas de fréquence ;
- un bouton PTT ;
- un indicateur de connexion.

Le serveur Python interrogera régulièrement `rigctld` ou maintiendra une connexion persistante.

Le navigateur recevra les changements par WebSocket.

Je veux que l'interface fonctionne sur :

- un téléphone ;
- une tablette ;
- un ordinateur ;
- sans installation supplémentaire.

---

## Troisième étape : l'audio de réception

Le premier vrai test audio consistera à écouter le poste dans un navigateur situé sur le même réseau local.

Je ne cherche pas immédiatement la latence minimale.

Je veux d'abord obtenir :

- un flux stable ;
- sans coupures ;
- sans saturation du processeur ;
- avec une qualité suffisante pour comprendre la phonie.

La charge sera surveillée avec :

```bash
top
```

La température pourra être consultée avec :

```bash
vcgencmd measure_temp
```

Je surveillerai surtout :

- l'utilisation CPU ;
- la mémoire disponible ;
- les pertes audio ;
- la latence ;
- les interruptions ;
- la stabilité après plusieurs heures.

---

## Quatrième étape : l'audio du microphone

La partie émission sera plus délicate.

Le navigateur devra :

1. demander l'accès au microphone ;
2. capturer l'audio ;
3. l'envoyer au Raspberry Pi ;
4. le décoder ;
5. l'écrire vers la sortie ALSA du poste ;
6. gérer le PTT.

Le chemin envisagé est :

```text
Microphone du navigateur
          |
          v
Web Audio / MediaRecorder
          |
          | flux réseau
          v
Serveur Python
          |
          v
FFmpeg
          |
          | PCM
          v
ALSA
          |
          | USB
          v
Poste radio
```

Le premier mode d'utilisation sera probablement un bouton de type **appuyer pour parler**.

Je préfère éviter au départ une détection automatique de voix qui compliquerait la mise au point et pourrait provoquer des émissions involontaires.

---

## Le PTT devra rester sûr

Le contrôle d'un émetteur à distance ne doit pas dépendre d'un simple bouton JavaScript sans surveillance.

Je veux ajouter plusieurs protections :

- durée maximale d'émission ;
- coupure automatique si le WebSocket disparaît ;
- coupure si le navigateur est fermé ;
- coupure si le flux audio s'arrête ;
- retour systématique en réception en cas d'erreur ;
- journalisation des changements RX/TX ;
- indicateur visuel très clair lorsque le poste émet.

La logique devra ressembler à ceci :

```text
Si aucun message de maintien n'est reçu pendant quelques secondes :
    couper immédiatement le PTT
    arrêter l'audio TX
    revenir en réception
```

Je veux que la perte du réseau provoque toujours un retour en RX, jamais un maintien en émission.

---

## Accès local avant accès Internet

La première version fonctionnera uniquement sur le réseau local :

```text
http://remoteTRX1.local
```

Cela permettra de séparer les problèmes :

- fonctionnement USB ;
- CAT ;
- audio ;
- latence ;
- stabilité Wi-Fi ;
- interface Web.

L'accès depuis Internet viendra seulement après.

Je ne souhaite pas exposer directement le serveur Web sur Internet.

La solution la plus raisonnable sera probablement un VPN. Il faudra encore choisir entre une solution comme WireGuard, Tailscale ou une autre méthode adaptée à ce petit processeur.

---

## Organisation logicielle envisagée

Le projet pourrait être organisé de cette manière :

```text
/opt/remotetrx/
├── app.py
├── config.yaml
├── static/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── radio/
│   ├── hamlib.py
│   └── state.py
├── audio/
│   ├── rx.py
│   └── tx.py
└── systemd/
    └── remotetrx.service
```

Le fichier de configuration pourrait contenir :

```yaml
radio:
  model: QMX+
  hamlib_model: A_DETERMINER
  serial_port: /dev/remoteTRX-cat
  baudrate: 115200

audio:
  input_device: hw:1,0
  output_device: hw:1,0
  sample_rate: 48000
  channels: 1

web:
  port: 8080
```

Ces valeurs sont provisoires.

Je ne veux pas figer la configuration avant d'avoir branché le QMX+ et observé les périphériques réellement créés.

---

## Noms de périphériques stables

Les noms comme :

```text
/dev/ttyACM0
/dev/ttyUSB0
hw:1,0
```

peuvent changer après un redémarrage ou après le branchement d'un autre appareil.

Il faudra probablement créer des règles `udev` afin d'obtenir des noms stables, par exemple :

```text
/dev/remoteTRX-cat
```

Pour ALSA, il faudra également utiliser si possible le nom de la carte plutôt que son numéro dynamique.

Cette étape sera importante avant d'automatiser le démarrage.

---

## Démarrage automatique

À terme, je veux que le Raspberry Pi fonctionne comme un appareil autonome.

Le scénario idéal serait :

```text
1. Brancher le Raspberry Pi.
2. Brancher le câble USB du poste.
3. Attendre le démarrage.
4. Ouvrir http://remoteTRX1.local.
```

Un service `systemd` devra :

- attendre le réseau ;
- détecter le poste ;
- lancer `rigctld` ;
- lancer l'audio ;
- lancer le serveur Web ;
- relancer les composants en cas de panne.

Je n'en suis pas encore là.

Je veux d'abord vérifier manuellement chaque fonction avant d'automatiser quoi que ce soit.

---

## Ordre de développement prévu

### Étape 1 — Base système

- [x] Raspberry Pi OS Lite installé ;
- [x] connexion au Wi-Fi local ;
- [x] SSH activé ;
- [x] nom d'hôte `remoteTRX1` ;
- [x] Hamlib installé ;
- [x] ALSA installé ;
- [ ] FFmpeg installé et vérifié ;
- [ ] `aiohttp` installé et vérifié.

### Étape 2 — Détection du poste

- [ ] brancher le QMX+ ;
- [ ] relever le résultat de `lsusb` ;
- [ ] identifier le port CAT ;
- [ ] identifier la carte son ;
- [ ] vérifier les formats audio acceptés ;
- [ ] déterminer les bons paramètres Hamlib.

### Étape 3 — Contrôle CAT

- [ ] lancer `rigctld` ;
- [ ] lire la fréquence ;
- [ ] modifier la fréquence ;
- [ ] changer de mode ;
- [ ] tester le PTT ;
- [ ] vérifier le retour systématique en RX.

### Étape 4 — Interface Web

- [ ] afficher l'état du poste ;
- [ ] modifier la fréquence ;
- [ ] changer le mode ;
- [ ] commander le PTT ;
- [ ] gérer une reconnexion automatique.

### Étape 5 — Audio RX

- [ ] capturer l'audio avec ALSA ;
- [ ] tester plusieurs formats ;
- [ ] diffuser l'audio dans le navigateur ;
- [ ] mesurer la charge CPU ;
- [ ] mesurer la latence ;
- [ ] tester la stabilité sur plusieurs heures.

### Étape 6 — Audio TX

- [ ] capturer le microphone du navigateur ;
- [ ] envoyer le flux au Raspberry Pi ;
- [ ] décoder le flux ;
- [ ] envoyer l'audio vers le poste ;
- [ ] synchroniser l'audio et le PTT ;
- [ ] ajouter une temporisation de sécurité.

### Étape 7 — Fiabilisation

- [ ] noms de périphériques stables ;
- [ ] services `systemd` ;
- [ ] watchdog du PTT ;
- [ ] journalisation ;
- [ ] configuration simple ;
- [ ] redémarrage automatique après erreur.

### Étape 8 — Accès extérieur

- [ ] choisir une solution VPN ;
- [ ] ajouter une authentification ;
- [ ] tester depuis un réseau mobile ;
- [ ] mesurer la latence hors du réseau local.

---

## Mes doutes actuels

Plusieurs points restent totalement ouverts.

### Le Zero W sera-t-il assez puissant ?

C'est la question principale.

Le CAT et le serveur Web ne devraient pas être très exigeants.

L'audio est plus incertain, surtout si le Raspberry Pi doit encoder et décoder un codec moderne en temps réel.

Je ne sais pas encore si je devrai :

- réduire le débit ;
- utiliser uniquement du mono ;
- augmenter les tampons ;
- diminuer la fréquence d'échantillonnage ;
- choisir un codec plus simple ;
- abandonner WebRTC ;
- séparer la réception et l'émission ;
- accepter une latence plus élevée.

### Le Wi-Fi du Zero W sera-t-il suffisamment stable ?

Le Zero W ne dispose que du Wi-Fi 2,4 GHz.

Pour de l'audio compressé, la bande passante devrait être suffisante, mais la stabilité et la latence devront être testées dans un environnement réel.

### Le navigateur permettra-t-il un audio bidirectionnel propre ?

La réception audio dans un navigateur est relativement simple.

L'émission depuis le microphone impose davantage de contraintes :

- autorisation du navigateur ;
- format fourni par `MediaRecorder` ;
- découpage du flux ;
- décodage côté Raspberry Pi ;
- synchronisation avec le PTT ;
- latence.

### Hamlib prendra-t-il correctement en charge le QMX+ ?

Il faudra le vérifier avec le poste branché.

Je ne sais pas encore si Hamlib possède un profil spécifique parfaitement adapté ou s'il faudra utiliser un modèle compatible et compléter quelques commandes.

### Faut-il vraiment utiliser FFmpeg ?

FFmpeg est pratique et polyvalent, mais il peut être lourd pour un processeur ARMv6.

Il faudra comparer sa charge avec d'autres solutions plus simples si nécessaire.

---

## Ce que je cherche à apprendre

Le résultat final est important, mais le projet m'intéresse également pour les problèmes qu'il oblige à résoudre :

- contrôle CAT ;
- communication avec `rigctld` ;
- gestion des cartes son USB sous ALSA ;
- transport audio dans un navigateur ;
- WebSockets ;
- sécurité d'un PTT distant ;
- optimisation sur une plateforme très limitée ;
- gestion propre des périphériques USB ;
- démarrage automatique avec `systemd`.

Il est possible que le Zero W atteigne rapidement ses limites.

Dans ce cas, le projet ne sera pas forcément un échec. J'aurai au moins déterminé quelles fonctions sont réalistes sur cette plateforme et lesquelles nécessitent un Zero 2 W ou un Raspberry Pi plus récent.

---

## Conclusion provisoire

Pour l'instant, le Raspberry Pi Zero W fonctionne sous Raspbian Trixie, rejoint correctement le réseau Wi-Fi et reste accessible en SSH.

Hamlib et ALSA sont installés.

La prochaine vraie étape sera de brancher le QMX+ et d'observer exactement ce qu'il expose au système.

Je ne sais pas encore si remoteTRX1 deviendra une passerelle radio complète utilisable en phonie, ou seulement une interface CAT avec écoute distante.

Le projet est donc encore expérimental.

Mais son objectif reste clair :

> Construire une passerelle radio distante légère, utilisable depuis un navigateur, avec le plus petit matériel possible et sans transformer le Raspberry Pi en ordinateur de bureau miniature.
