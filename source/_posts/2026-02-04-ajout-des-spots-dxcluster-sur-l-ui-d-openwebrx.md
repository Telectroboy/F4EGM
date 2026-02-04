---
title: "Ajout des spots DXCluster sur l'UI d'OpenWebRX+"
date: 2026-02-04 12:00:00
categories: SDR
tags: [forum, f4egm]
---

Le but ici est d'utiliser le code créé par Acuantico pour afficher les spots DXCluster directement sur le waterfall d'OpenWebRX+.
Le lien vers le code de base est ici =&gt;  https://github.com/Acuantico/owrx-spider
Il appelle cela spider. A cause du projet DXSpider https://www.dxcluster.org/ Il est composé d'un fichier python nommé spiderd.py qui :- ouvre une connexion telnet au cluster- lit les lignes et broadcast les spots vers openwebrx+ via un websocketet un fichier spider.js- qui s'occupe de récupérer les messages - les afficher sur le waterfall- et ajoute une fonction installToggle() qui ajoute le checkbox dans la section Settings du panneau receiverCi dessus un aperçu de ce que cela rajoute.Les spots du DXCluster arrivent au fur et à mesure qu'ils sont signalés donc les anciens spots ne sont pas repris. Il faut donc quelques 10aines de secondes pour commencer à en voir s'afficher.
Le but ici est d'utiliser le code créé par Acuantico pour afficher les spots DXCluster directement sur le waterfall d'OpenWebRX+.
Le lien vers le code de base est ici =&gt;  https://github.com/Acuantico/owrx-spider
Il appelle cela spider. A cause du projet DXSpider https://www.dxcluster.org/ Il est composé d'un fichier python nommé spiderd.py qui :- ouvre une connexion telnet au cluster- lit les lignes et broadcast les spots vers openwebrx+ via un websocketet un fichier spider.js- qui s'occupe de récupérer les messages - les afficher sur le waterfall- et ajoute une fonction installToggle() qui ajoute le checkbox dans la section Settings du panneau receiverCi dessus un aperçu de ce que cela rajoute.Les spots du DXCluster arrivent au fur et à mesure qu'ils sont signalés donc les anciens spots ne sont pas repris. Il faut donc quelques 10aines de secondes pour commencer à en voir s'afficher.
Voici le contenu du service spiderd qui est dans le docker-compose.yaml du mon instance openwebrx+					Code:			
```
```
Voici la modification faite dans le fichier init.js de /plugins/receiver pour charge le plugin :					Code:			
```
// --- SPIDER CONFIGURATION (init.js) ---window.spider_config_global = {&nbsp; ws_url: "wss://webrx.festival-assistant.fr/spiderws/spots",&nbsp; max_age_sec: 300,&nbsp; modes: ["CW","SSB","FT8"],&nbsp; enabled: true};Plugins.load('spider').then(function () {&nbsp; &nbsp; if (Plugins.spider &amp;&amp; typeof Plugins.spider.init === "function") {&nbsp; &nbsp; &nbsp; // init différé pour éviter les races en https&nbsp; &nbsp; &nbsp; setTimeout(() =&gt; Plugins.spider.init(), 1000);&nbsp; &nbsp; }&nbsp; });});
```
		Puis il faut mettre le dossier spider dans ce même répertoire.Et dans le répertoire /spiderd-config j'ai mis :					Code:			
```
# spiderd configuration[cluster]# DX Cluster host/porthost = f4iaadx.ddns.netport = 7300# Callsign used for login (required by most clusters)user = F4EGM# Password if the cluster requires onepassword =# Read timeout before reconnect (seconds)read_timeout = 120[server]# WebSocket server binding (localhost only)bind = 0.0.0.0port = 7373path = /spots[reconnect]initial_delay = 3max_delay = 60[logging]level = INFO
```