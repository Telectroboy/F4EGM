---
title: "OpenWebRX+"
date: 2026-02-04 12:00:00
categories: SDR
tags: [forum, f4egm]
---

### Message par Anonyme, 2026-02-04

Installation en docker avec la version de 0xAF Stanislas :
[https://hub.docker.com/r/slechev/openwebrxplus-softmbe](https://hub.docker.com/r/slechev/openwebrxplus-softmbe) Je participe autant que possible au développement :
[https://github.com/0xAF/openwebrxplus-softmbe-docker?tab=readme-ov-file](https://github.com/0xAF/openwebrxplus-softmbe-docker?tab=readme-ov-file) Oui, Telectroboy c'est moi!

---

### Message par Anonyme, 2026-02-04

Installation en docker avec la version de 0xAF Stanislas :
[https://hub.docker.com/r/slechev/openwebrxplus-softmbe](https://hub.docker.com/r/slechev/openwebrxplus-softmbe) Je participe autant que possible au développement :
[https://github.com/0xAF/openwebrxplus-softmbe-docker?tab=readme-ov-file](https://github.com/0xAF/openwebrxplus-softmbe-docker?tab=readme-ov-file) Oui, Telectroboy c'est moi!

---

### Message par Anonyme, 2026-02-04

le site est accessible ici :
[http://f4egm.adrasec08.fr](http://f4egm.adrasec08.fr) ou bien en direct sur [https://webrx.festival-assistant.fr](https://webrx.festival-assistant.fr) user adrasec08
mot de passe adrasec08** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Voici le fichier docker-compose.yaml que j'utilise pour créer mon instance openwebrx+ Code: `services: owrx: image: 'slechev/openwebrxplus-softmbe:latest' container_name: owrx-mbe restart: unless-stopped ports: - '8073:8073' environment: TZ: Europe/Paris OPENWEBRX_ADMIN_USER: ************ OPENWEBRX_ADMIN_PASSWORD: ******** devices: - /dev/bus/usb:/dev/bus/usb #pour y passer les périphériques USB volumes: - /opt/owrx-docker/etc:/etc/openwebrx - /opt/owrx-docker/var:/var/lib/openwebrx - /opt/owrx-docker/plugins:/usr/lib/python3/dist-packages/htdocs/plugins # sortie persistée sur l'hôte - /opt/owrx-docker/sstvpng:/sstvpng - /opt/owrx-docker/meteorcadu:/meteorcadu # scripts cont-init (s6-overlay) - /opt/owrx-docker/cont-init.d:/etc/cont-init.d:ro #ajout ding dans chat - ./Chat.js:/usr/lib/python3/dist-packages/htdocs/lib/Chat.js:ro # mount /tmp in memory, for RPi devices, to avoid SD card wear and make dump1090 work faster tmpfs: - /tmp:mode=1777 dns: - 1.1.1.1 - 8.8.8.8
` ** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

I need libmirisdr-5 first: [https://github.com/ericek111/libmirisdr-5.git](https://github.com/ericek111/libmirisdr-5.git)** J'aime** Je n'aime pas

---

### Message par Anonyme, 2026-02-04

Filtre audio avancé :
[https://github.com/joer123/openwebrxplus-plugins-test/tree/main/receiver/audio_filter](https://github.com/joer123/openwebrxplus-plugins-test/tree/main/receiver/audio_filter) ** J'aime** Je n'aime pas

---
*Article importé du [forum F4EGM](https://f4egm.forumactif.com/t4-openwebrx)*