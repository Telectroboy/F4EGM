---
title: "Compiler Hamlib 4.7.2 sur DigiPi (ARMHF) pour supporter le Yaesu FTX-1"
date: 2026-07-24
draft: false
tags:
  - Hamlib
  - DigiPi
  - Raspberry Pi
  - Yaesu
  - FTX-1
  - WSJT-X
---

# Compiler Hamlib 4.7.2 sur DigiPi (ARMHF)

Le DigiPi est une excellente distribution dédiée aux radioamateurs, mais il peut arriver que les paquets disponibles dans les dépôts soient un peu en retard par rapport aux dernières versions de **Hamlib**.

Dans mon cas, je souhaitais utiliser un **Yaesu FTX-1**, dont le support a été ajouté à partir de **Hamlib 4.7**. Or, DigiPi (basé sur Raspberry Pi OS Trixie ARMHF) fournit actuellement **Hamlib 4.6.2**.

Voici la procédure complète que j'ai utilisée pour mettre à jour Hamlib vers la version **4.7.2**.

---

# Vérification de la version installée

Commencez par vérifier la version actuelle :

```bash
rigctl -V
```

Par défaut, DigiPi affiche :

```text
rigctl Hamlib 4.6.2
```

---

# Installer les dépendances

```bash
sudo apt update

sudo apt install -y \
    build-essential \
    autoconf \
    automake \
    libtool \
    pkg-config \
    libusb-1.0-0-dev \
    libreadline-dev \
    libltdl-dev \
    texinfo \
    wget
```

---

# Télécharger Hamlib 4.7.2

```bash
cd /tmp

wget https://github.com/Hamlib/Hamlib/releases/download/4.7.2/hamlib-4.7.2.tar.gz
```

---

# Attention au piège de DigiPi

Sur DigiPi, **/tmp est un tmpfs de seulement 200 Mo**.

Une compilation directement dans `/tmp` se termine par :

```text
No space left on device
```

Il faut donc simplement copier les sources dans le répertoire personnel.

```bash
cd ~

tar xf /tmp/hamlib-4.7.2.tar.gz

cd hamlib-4.7.2
```

---

# Configuration

Configurer Hamlib pour une installation dans `/usr` :

```bash
./configure --prefix=/usr
```

---

# Compilation

```bash
make -j$(nproc)
```

Sur un Raspberry Pi 3, la compilation prend quelques minutes.

---

# Installation

```bash
sudo make install

sudo ldconfig
```

---

# Vérification

Normalement :

```bash
rigctl -V
```

doit afficher :

```text
rigctl Hamlib 4.7.2
```

---

# Si rigctl affiche toujours 4.6.2

Il est possible que DigiPi continue à utiliser l'ancienne bibliothèque présente dans :

```text
/lib/arm-linux-gnueabihf
```

Vérifiez :

```bash
ldd /usr/bin/rigctl | grep hamlib
```

Si vous voyez :

```text
/lib/arm-linux-gnueabihf/libhamlib.so.4
```

Il suffit de mettre à jour le lien symbolique :

```bash
sudo ln -sf libhamlib.so.4.0.7 /lib/arm-linux-gnueabihf/libhamlib.so.4

sudo ldconfig
```

Puis vérifier de nouveau :

```bash
rigctl -V
```

Vous devez maintenant obtenir :

```text
rigctl Hamlib 4.7.2
```

---

# Vérifier la présence du FTX-1

```bash
rigctl -l | grep -i FTX
```

ou

```bash
rigctl -l | grep Yaesu
```

Le nouveau transceiver doit désormais apparaître dans la liste des équipements supportés.

---

# Compatibilité avec WSJT-X

Aucune recompilation de WSJT-X n'est nécessaire.

WSJT-X utilise la bibliothèque Hamlib partagée (`libhamlib.so.4`) et profitera automatiquement de la nouvelle version.

---

# Conclusion

La compilation de Hamlib est relativement simple mais deux points sont importants sur DigiPi :

- ne pas compiler dans `/tmp`, limité à 200 Mo ;
- installer avec `--prefix=/usr` ;
- mettre à jour le lien symbolique de `libhamlib.so.4` si l'ancienne bibliothèque est encore utilisée.

Après cette mise à jour, DigiPi est parfaitement compatible avec les nouveaux équipements supportés par Hamlib 4.7.2, notamment le **Yaesu FTX-1**.

73 !

**F4EGM**
