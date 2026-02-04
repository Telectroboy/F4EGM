---
title: "Ajout des spots DXCluster sur l'UI d'OpenWebRX+"
date: 2026-02-04 12:00:00
categories: SDR
tags: [forum, f4egm]
---

### Message par Anonyme, 2026-02-04

Le but ici est d'utiliser le code créé par Acuantico pour afficher les spots DXCluster directement sur le waterfall d'OpenWebRX+. ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/icon_biggrin.png) Le lien vers le code de base est ici => [https://github.com/Acuantico/owrx-spider](https://github.com/Acuantico/owrx-spider) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/icon_eek.gif) Il appelle cela spider. A cause du projet DXSpider [https://www.dxcluster.org/](https://www.dxcluster.org/) Il est composé d'un fichier python nommé spiderd.py qui :
- ouvre une connexion telnet au cluster
- lit les lignes et broadcast les spots vers openwebrx+ via un websocket et un fichier spider.js
- qui s'occupe de récupérer les messages - les afficher sur le waterfall
- et ajoute une fonction installToggle() qui ajoute le checkbox dans la section Settings du panneau receiver [![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/spider10.jpg)](https://servimg.com/view/11301707/393)
Ci dessus un aperçu de ce que cela rajoute. Les spots du DXCluster arrivent au fur et à mesure qu'ils sont signalés donc les anciens spots ne sont pas repris. Il faut donc quelques 10aines de secondes pour commencer à en voir s'afficher. ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png)

---

### Message par Anonyme, 2026-02-04

Le but ici est d'utiliser le code créé par Acuantico pour afficher les spots DXCluster directement sur le waterfall d'OpenWebRX+. ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/icon_biggrin.png) Le lien vers le code de base est ici => [https://github.com/Acuantico/owrx-spider](https://github.com/Acuantico/owrx-spider) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/icon_eek.gif) Il appelle cela spider. A cause du projet DXSpider [https://www.dxcluster.org/](https://www.dxcluster.org/) Il est composé d'un fichier python nommé spiderd.py qui :
- ouvre une connexion telnet au cluster
- lit les lignes et broadcast les spots vers openwebrx+ via un websocket et un fichier spider.js
- qui s'occupe de récupérer les messages - les afficher sur le waterfall
- et ajoute une fonction installToggle() qui ajoute le checkbox dans la section Settings du panneau receiver [![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/spider10.jpg)](https://servimg.com/view/11301707/393)
Ci dessus un aperçu de ce que cela rajoute. Les spots du DXCluster arrivent au fur et à mesure qu'ils sont signalés donc les anciens spots ne sont pas repris. Il faut donc quelques 10aines de secondes pour commencer à en voir s'afficher. ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png) ![image](/images/imported/ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx/herz.png)

---

### Message par Anonyme, 2026-02-04

Voici le contenu du service spiderd qui est dans le docker-compose.yaml du mon instance openwebrx+ Code: ` spiderd: image: python:3.11-slim container_name: spiderd restart: unless-stopped working_dir: /app volumes: - /opt/owrx-docker/owrx-spider/backend/spiderd:/app:ro - /opt/owrx-docker/spiderd-config:/config command: > sh -lc " pip install --no-cache-dir -r requirements.txt; python3 /app/spiderd.py --config /config/spiderd.conf " ports: - "7373:7373" ` ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Voici la modification faite dans le fichier init.js de /plugins/receiver pour charge le plugin : Code: `// --- SPIDER CONFIGURATION (init.js) ---
window.spider_config_global = { ws_url: "wss://webrx.festival-assistant.fr/spiderws/spots", max_age_sec: 300, modes: ["CW","SSB","FT8"], enabled: true
}; Plugins.load('spider').then(function () { if (Plugins.spider && typeof Plugins.spider.init === "function") { // init différé pour éviter les races en https setTimeout(() => Plugins.spider.init(), 1000); } }); });` Puis il faut mettre le dossier spider dans ce même répertoire. Et dans le répertoire /spiderd-config j'ai mis : Code: `# spiderd configuration [cluster]
# DX Cluster host/port
host = f4iaadx.ddns.net
port = 7300
# Callsign used for login (required by most clusters)
user = F4EGM
# Password if the cluster requires one
password =
# Read timeout before reconnect (seconds)
read_timeout = 120 [server]
# WebSocket server binding (localhost only)
bind = 0.0.0.0
port = 7373
path = /spots [reconnect]
initial_delay = 3
max_delay = 60 [logging]
level = INFO
` ** J'aime** Je n'aime pas

---
*Article importé du [forum F4EGM](https://f4egm.forumactif.com/t34-ajout-des-spots-dxcluster-sur-l-ui-d-openwebrx)*