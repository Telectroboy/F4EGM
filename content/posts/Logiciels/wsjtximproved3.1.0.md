---
title: "Mise à jour : WSJT-X Improved 3.1.0 (260226) et arrivée du mode FT2"
date: 2026-02-26
draft: false
tags: ["radioamateur", "WSJT-X", "FT8", "FT4", "FT2", "numérique", "weak-signal"]
---
<img width="1276" height="695" alt="image" src="https://github.com/user-attachments/assets/23cd3ef7-2324-43b3-a7ec-08ae24580717" />
<img width="530" height="238" alt="image" src="https://github.com/user-attachments/assets/971452f1-b632-43f7-bd75-edd9dbadde86" />


## Où trouver WSJT-X Improved 3.1.0

Les binaires (Windows / Linux / macOS / Raspberry Pi + sources) sont ici :  
https://sourceforge.net/projects/wsjt-x-improved/files/WSJT-X_v3.1.0/  :contentReference[oaicite:0]{index=0}

## Avant d’installer (recommandé)

Le changelog recommande :
- de faire une **sauvegarde** de `WSJT-X.ini` et `wsjtx_log.adi`
- et d’installer la 3.1.0 dans un **nouveau dossier** (ex : `C:\WSJT\wsjtx-310`) :contentReference[oaicite:1]{index=1}

## Nouveautés principales (3.1.0 260226 vs 3.0.0 251212)

### 1) FT2 : un nouveau mode “ultra-rapide” (expérimental)
- **FT2** est un mode **77 bits** avec une période **TR de 3,75 s** (soit **2× plus rapide que FT4**) :contentReference[oaicite:2]{index=2}  
- Il est annoncé comme **open-source**, compatible “à l’antenne” avec l’implémentation FT2 d’IU8LMC **sans réutilisation de son code** :contentReference[oaicite:3]{index=3}  
- Le mainteneur précise que FT2 reste **expérimental** (pas certain qu’il soit conservé) :contentReference[oaicite:4]{index=4}  

*(Même si FT2 est une bonne idée en soi, ça reste à valider en usage réel : décodage, réussite des QSOs, intérêt vs FT4.)*

### 2) QSOs possibles avec indicatifs “non standards” / composés (modes 77 bits)
Nouveauté importante : prise en charge de QSOs entre stations utilisant des indicatifs :
- non standards ↔ non standards,
- composés ↔ composés,
- non standard ↔ composé,
- non standard ↔ /P,
- et aussi **deux indicatifs standards** chacun avec suffixes (/P /M /R etc.). :contentReference[oaicite:5]{index=5}

Notes pratiques :
- **les deux stations** doivent utiliser WSJT-X Improved 3.1 (ou logiciel compatible) :contentReference[oaicite:6]{index=6}
- le WSJT-X “standard” peut partir en **boucle AutoSeq** sur ces formats :contentReference[oaicite:7]{index=7}

### 3) MAP65 : nouvelle techno (taille réduite, code FORTRAN modernisé)
- `map65.exe` annoncé à **< 1/4** de sa taille précédente, avec objectif d’améliorer la stabilité :contentReference[oaicite:8]{index=8}  
- **Attention** : les builds **OFC** gardent l’ancienne version MAP65 (code éprouvé 3.0.0) :contentReference[oaicite:9]{index=9}

### 4) Divers + Hamlib 5
Exemples :
- option pour **skipper les décodes a8** (décodeur FT8 multithread) :contentReference[oaicite:10]{index=10}  
- band hopping : intervalle **1 min / 2 min** :contentReference[oaicite:11]{index=11}  
- option log : enregistrer la **fréquence dial** plutôt que la fréquence TX :contentReference[oaicite:12]{index=12}  
- support de la série **Hamlib 5** :contentReference[oaicite:13]{index=13}  

## FYI : Decodium et licence WSJT-X (GPLv3)

Il est parfaitement **autorisé** de créer un dérivé de WSJT-X **si on respecte la GPL**.

Le point soulevé publiquement (résumé) :
- Des messages relayés indiquent qu’une distribution binaire de “Decodium” (dérivé de WSJT-X/WSJT-X Improved) **sans publication du code source correspondant** serait **non conforme GPLv3**. :contentReference[oaicite:14]{index=14}  
- Rappel GPLv3 : quand on **“convey”** un logiciel (distribution), on doit fournir l’accès au **“Corresponding Source”** selon les conditions de la licence. :contentReference[oaicite:15]{index=15}  

Lien de discussion (Valley Hams) :  
https://groups.google.com/g/valleyhams/c/6s-QeUk6V2c :contentReference[oaicite:16]{index=16}

## Conseils rapides de mise à jour

1. Sauvegarder `WSJT-X.ini` + `wsjtx_log.adi` :contentReference[oaicite:17]{index=17}  
2. Installer WSJT-X Improved 3.1.0 dans un nouveau répertoire :contentReference[oaicite:18]{index=18}  
3. Choisir ton “layout” (standard / AL / widescreen) dans les téléchargements :contentReference[oaicite:19]{index=19}  
4. Si tu utilises MAP65 : vérifier si tu préfères build **OFC** (ancien MAP65) ou non-OFC (nouvelle techno MAP65) :contentReference[oaicite:20]{index=20}  

## Retours terrain FT2 (Facebook)

Source : posts Facebook (liens à renseigner)  
- Paolo : [PAOLOFBLINK](https://www.facebook.com/groups/1558570060888672/posts/26131184443200559/)
- Martino : [MARTINO_FB_LINK  ](https://www.facebook.com/groups/1558570060888672/posts/26125934877058849/?comment_id=26128979723421031)

> Contacts were made on 10,12,15m from BL01 ( Kaua'i)  
> 12m seemed funny - like another mode was operating in the same sandbox  
> I was on GPS time, people will need to tighten up their time sync  
> LotW and POTA don't accept FT2 yet as a mode  
> I recall from EARLY FT4, we'd load as MFSK SUB-mode FT4, might be the same here but I'll wait for an official ADIF update  
> Paolo IU Tre Unc

À garder en tête : FT2 est annoncé comme très exigeant sur la synchro (horloge serrée). :contentReference[oaicite:0]{index=0}  
Si LoTW/POTA ne reconnaissent pas encore FT2 chez toi, LoTW documente un mécanisme de “mode mapping” dans TQSL. :contentReference[oaicite:1]{index=1}  
POTA rappelle aussi que ses modes/submodes suivent l’ADIF, et qu’en présence de MODE+SUBMODE, **SUBMODE prime** côté POTA. :contentReference[oaicite:2]{index=2}

## Logging FT2 / QRZ : MODE vs SUBMODE (Facebook)

> We know that Decodium writes Mode=FT2 in the log. This allows FT2 to be visible in the QRZ logbook, not because it has been enabled, but because any character string can be considered valid. On the other hand, WSJT-X v3.1.0 Improved correctly writes Mode=MFSK and Submode=FT2. In this case, QRZ shows MFSK because FT2 is not currently a recognized standard. If it were, it would behave like FT4, which is logged as Mode=MFSK and Submode=FT4, but QRZ ultimately displays it as FT4.  
> Once we upload a log to QRZ, we also know how it will be displayed depending on the software we use, and we must be aware that once QSOs are uploaded and confirmed, they cannot be modified. We also know that even when FT2 is recognized as an official mode, the QRZ log will not change automatically.  
> Even if it looks “worse,” the WSJT-X v3.1.0 Improved log uses the correct implementation by inserting both Mode and Submode, not just Mode like Decodium does.

Avant d’uploader “en masse”, fais 2–3 QSOs test et regarde comment ton combo (QRZ/LoTW/POTA) affiche/accepte le couple MODE/SUBMODE. Conserve toujours une copie locale de l’ADIF avant upload.

## Débat : “DT alignment” et propriété (Facebook)

> Martino Merola  
> Let's get this straight.  
> Some people think FT2 is just "WSJT-X with a shorter timer". Wrong.  
> Go ahead — take FT8, change the timing to 3.8 seconds, and see what happens. I'll tell you: it decodes nothing. Why? Because when you compress everything into 3.8 seconds, propagation delays become a massive problem. Without a proper DT (Delta Time) alignment system, the software simply doesn't work.  
> This is exactly why DECODIUM 3.0 works and the copies don't.  
> The DT alignment algorithms in DECODIUM are proprietary software, written by me from scratch. They are the heart of FT2. They are what turns an idea into a protocol that actually works on the air. The version in WSJT-X Improved doesn't have them. It only has the raw decoder, without any of the mechanisms that make the real difference. Anyone who has tried both knows it.  
> FT2 was conceived and designed by me, Martino IU8LMC, with the aid of artificial intelligence tools — something I have always stated openly. AI helped me write code faster. But if you don't know what to build, AI won't invent it for you.  
> Nobody in the world had this idea in seven years. I did, I built it, and I put it on the air on February 16, 2026. Today we are over 1,000 operators and ADIF certification is underway.  
> These are facts, not opinions.  
> 73 de IU8LMC 🇮🇹  
> DECODIUM 3.0 — ft2.it

Pour contexte côté WSJT-X Improved 3.1.0 : FT2 est présenté comme **open-source**, compatible “on-air” avec FT2 IU8LMC, et “No code from IU8LMC was used”. :contentReference[oaicite:3]{index=3}

## FYI licence : point soulevé publiquement

Allégation vue dans une discussion publique : un dérivé distribué sans publier le “corresponding source” ne serait pas conforme GPLv3. :contentReference[oaicite:4]{index=4}

73 de F4EGM
