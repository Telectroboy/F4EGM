---
title: "DigiPi : envoyer automatiquement les QSO de WSJT-X vers Wavelog"
date: 2026-07-22
draft: false
slug: "wavelogstoat-digipi-wsjtx-wavelog"
description: "Installation de WaveLogStoat sur DigiPi pour transférer automatiquement les QSO validés dans WSJT-X vers Wavelog."
tags:
  - radioamateur
  - DigiPi
  - WSJT-X
  - Wavelog
  - FT8
---

Le but est d'envoyer automatiquement chaque QSO validé dans WSJT-X vers un journal Wavelog, sans export ni import manuel d'un fichier ADIF.

La chaîne obtenue est la suivante :

```text
WSJT-X -- ADIF par UDP sur le port 2333 --> WaveLogStoat -- HTTPS --> API Wavelog
```

Cette installation a été testée sur DigiPi le 22 juillet 2026. WaveLogStoat est lancé par `systemd` et peut aussi être arrêté ou redémarré depuis la page d'accueil de DigiPi.

## Installation de WaveLogStoat

[WaveLogStoat](https://github.com/int2001/WaveLogStoat) est un petit programme écrit en Go. Il reçoit les QSO par UDP, lit les champs ADIF puis les transmet à l'API de Wavelog.

Sur DigiPi, je l'ai compilé directement depuis les sources :

```bash
cd /home/pi
git clone https://github.com/int2001/WaveLogStoat.git
cd WaveLogStoat
go mod tidy
go build -o wavelogstoat
```

On peut vérifier le binaire avec :

```bash
./wavelogstoat --help
```

La commande doit afficher l'aide de `WaveLog Stoat CLI`.

## Création de la configuration

Créer `/home/pi/WaveLogStoat/config.ini` :

```ini
[wavelog]
url = https://exemple.fr/wavelog/index.php
api_key = VOTRE_CLE_API
station_profile_id = 4
timeout = 5000

[server]
port = 2333
verbose = false
```

Les trois valeurs de la section `[wavelog]` sont à adapter :

- `url` est l'adresse de l'installation Wavelog ;
- `api_key` est la clé créée dans les paramètres de Wavelog ;
- `station_profile_id` désigne le profil de station qui recevra les QSO.

L'identifiant du profil apparaît dans l'adresse de sa page d'édition. Par exemple :

```text
https://exemple.fr/wavelog/index.php/station/edit/4
```

Dans cet exemple, l'identifiant est `4`.

La clé API ne doit jamais être publiée dans un article, une capture d'écran ou une sortie de journal. J'ai aussi laissé `verbose = false`, car le mode détaillé affiche le contenu envoyé à l'API.

## Test de l'accès à Wavelog

Avant de configurer WSJT-X, on peut tester l'URL, la clé et le profil :

```bash
cd /home/pi/WaveLogStoat
./wavelogstoat --test
```

Une connexion correcte donne notamment :

```text
WaveLog connection test - Status: 201, Response: created
WaveLog connection successful
```

Le code HTTP `201 created` confirme que Wavelog accepte la requête.

## Configuration de WSJT-X

Dans **File > Settings > Reporting**, activer la diffusion des contacts vers N1MM Logger, puis utiliser :

```text
Server name : 127.0.0.1
Server port : 2333
```

Dans le fichier `/home/pi/.config/WSJT-X.ini`, les valeurs correspondantes sont :

```ini
N1MMServer=127.0.0.1
N1MMServerPort=2333
```

Il ne faut pas utiliser ici le port UDP principal de WSJT-X, souvent configuré sur `2237`. Ce port transporte les messages binaires internes de WSJT-X. WaveLogStoat attend le QSO ADIF envoyé par la fonction N1MM sur `2333`.

Avec le mauvais port, WaveLogStoat reçoit bien des paquets, mais ne trouve pas le champ `CALL` :

```text
Failed to parse message: missing required CALL field in ADIF
```

## Premier essai manuel

WaveLogStoat crée son journal dans le répertoire courant. Sur mon DigiPi, `/home/pi/WaveLogStoat` était en lecture seule au moment de l'exécution. Je l'ai donc lancé depuis `/tmp` :

```bash
cd /tmp
/home/pi/WaveLogStoat/wavelogstoat -c /home/pi/WaveLogStoat/config.ini
```

Le démarrage correct affiche :

```text
Starting WaveLog Stoat CLI on port 2333
UDP server listening on port 2333
```

Après avoir validé un QSO avec le bouton **Log QSO** de WSJT-X, le programme doit recevoir un enregistrement ressemblant à celui-ci :

```text
<call:5>N4DWD <gridsquare:4>EM86 <mode:3>FT8 ... <band:3>20m ... <eor>
```

Puis il confirme l'envoi :

```text
Parsed ADIF QSO: N4DWD on 14.075561 MHz
QSO successfully added: N4DWD on 14.075561 MHz
```

Le contact doit alors apparaître dans Wavelog.

## Démarrage automatique avec systemd

Créer `/etc/systemd/system/wavelogstoat.service` :

```ini
[Unit]
Description=WaveLogStoat - WSJT-X to Wavelog
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pi
WorkingDirectory=/tmp
ExecStart=/home/pi/WaveLogStoat/wavelogstoat -c /home/pi/WaveLogStoat/config.ini
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Le choix de `/tmp` comme répertoire de travail permet au programme d'écrire son fichier de journal malgré le système de fichiers en lecture seule de DigiPi.

Recharger `systemd`, activer le service au démarrage puis le lancer :

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now wavelogstoat
```

Contrôler son état :

```bash
systemctl status wavelogstoat --no-pager
```

Le résultat attendu contient :

```text
Loaded: loaded (...; enabled; ...)
Active: active (running)
UDP server listening on port 2333
```

Les commandes utiles par la suite sont :

```bash
sudo systemctl restart wavelogstoat
sudo systemctl stop wavelogstoat
journalctl -u wavelogstoat --no-pager
```

## Ajout dans la page d'accueil de DigiPi

La page principale se trouve dans `/var/www/html/index.php`. Avant toute modification, j'en ai conservé une copie :

```bash
sudo cp /var/www/html/index.php /var/www/html/index.php.backup-20260722
```

J'ai d'abord ajouté le traitement du bouton avec les autres blocs `$_POST` :

```php
if (isset($_POST["wavelogstoat"])) {
  $submit = $_POST["wavelogstoat"];
  if ($submit == 'on') {
      $output = shell_exec('sudo systemctl start wavelogstoat');
  }
  if ($submit == 'off') {
      $output = shell_exec('sudo systemctl stop wavelogstoat');
  }
}
```

Le service doit aussi être ajouté à la commande qui relève l'état de tous les services :

```php
$output = shell_exec('sudo systemctl is-active tnc tnc300b digipeater tracker webchat node winlinkrms pat ardop wsjtx sstv fldigi js8call wavelogstoat');
```

Dans cette version de la page, WaveLogStoat est le quatorzième service de la liste. Son état se trouve donc à l'indice `13` :

```php
#-- WAVELOG STOAT ------------------------------------------

echo "<tr>";
$output = $status_list[13];
if ($output == "active") {
    echo '<td bgcolor="lightgreen">';
    $checked = "checked";
} elseif ($output == "failed") {
    echo '<td bgcolor="red">';
    $checked = "";
} else {
    echo '<td bgcolor="lightgrey">';
    $checked = "";
}
echo '</td>';
echo '<td><font size=+1>WaveLog Stoat</font></td>';
echo '<td nowrap>';
echo '<form action="index.php" method="post">';
echo '<label class="switch switch-light">';
echo '<input type="hidden" name="wavelogstoat" value="off">';
echo "<input onChange='this.form.submit()' class='switch-input' type='checkbox' name='wavelogstoat' value='on' $checked />";
echo '<span class="switch-label"></span>';
echo '<span class="switch-handle"></span>';
echo '</label>';
echo '</form>';
echo '</td></tr>';
```

Cet indice dépend de l'ordre exact de la liste passée à `systemctl is-active`. Il faut donc le recalculer si la page DigiPi contient d'autres services.

J'ai enfin ajouté `wavelogstoat` à la commande qui efface l'état `failed` :

```php
$output = shell_exec('sudo systemctl reset-failed fldigi sstv wsjtx ardop tnc300b tracker digipeater tnc node winlinkrms pat js8call wavelogstoat 2> /dev/null');
```

Un lien direct vers le journal peut aussi être placé dans la grille inférieure :

```html
<a href="https://exemple.fr/wavelog/" target="wavelog" title="Ouvrir Wavelog"><strong>Wavelog</strong></a>
```

Avant de remplacer la page, vérifier sa syntaxe :

```bash
php -l /tmp/index.php
```

Si PHP répond `No syntax errors detected`, le fichier peut être copié :

```bash
sudo cp /tmp/index.php /var/www/html/index.php
```

## Résultat

Dans la configuration finale :

- WSJT-X envoie uniquement les QSO validés sur `127.0.0.1:2333` ;
- WaveLogStoat les transmet à Wavelog par son API HTTPS ;
- le service démarre avec DigiPi et redémarre en cas d'erreur ;
- son état et son interrupteur apparaissent sur la page d'accueil ;
- le mode détaillé reste désactivé pour ne pas exposer la clé API dans les journaux.

Le test final a consisté à enregistrer un QSO FT8 dans WSJT-X, puis à vérifier sa présence immédiate dans le profil de station Wavelog.

## Liens

- [Dépôt officiel WaveLogStoat](https://github.com/int2001/WaveLogStoat)
- [Exemple officiel de configuration](https://github.com/int2001/WaveLogStoat/blob/master/config.ini.sample)
- [Documentation de l'API Wavelog](https://docs.wavelog.org/developer/api/)
- [Guide utilisateur WSJT-X](https://wsjt.sourceforge.io/wsjtx-main_en.html)
