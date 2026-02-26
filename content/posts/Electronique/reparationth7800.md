---
title: "Réparer un TYT TH-7800 qui ne s’allume plus : diagnostic du switch d’alimentation (Q30 2SB1386) et contournement"
date: 2026-02-26
draft: false
tags: ["radioamateur", "TYT", "TH-7800", "réparation", "électronique", "VHF", "UHF", "cross-band"]
description: "Acheté 47€ sur Leboncoin (fdp + frais inclus), ce TYT TH-7800 ne s’allumait plus. Diagnostic : alimentation aval absente (rails à ~1.6–1.8 V) malgré un 5 V présent. Cause trouvée : Q30 (2SB1386) en défaut. Solution : contournement (bypass) après démontage complet et dessoudage de la SO-239."
cover:
  image: 
---

## Contexte : un TH-7800 à 47€… mais en panne

J’ai récupéré un **TYT TH-7800** via Leboncoin pour **47€ (frais de port + frais Leboncoin inclus)**. Le vendeur annonçait une panne claire : **le poste ne s’allume plus**.

Voici son message (copié tel quel) :

> Bonsoir ,au debut plus de son a cause de la prise hp?  
> Je lui ai fait ressortir le son dans le hp, en ressoudant un fil dans la prise jack, il a commencé a la suite de cette manip,il fallait appuyer sur 2 touches en même temps pour qu il veuille bien s allumer et ensuite il ne s est plus allumé,,,vous savez tout , cordiales 73's  
> Marc

Objectif : remettre ce poste en route, surtout pour sa fonction **cross-band** (transpondeur/répéteur), qui m’intéresse particulièrement sur un **mobile VHF/UHF FM analogique**.

![boite](https://github.com/user-attachments/assets/77068c0c-313f-452c-b11e-ca0892f94ebc)

---

## Attention : accès aux composants = démontage complet + dessoudage SO-239

**Point critique à savoir avant de commencer :**

> **Attention :** les composants incriminés (Q30, Q32, R77) sont **sous le PCB**.  
> Pour y accéder, il faut **tout démonter** et **dessouder la prise antenne SO-239** avant de pouvoir extraire la carte et accéder à sa face inférieure.  
> Fais une **photo “avant démontage”** (vue générale) : ça sauve du temps au remontage.
![TOP](https://github.com/user-attachments/assets/6e296696-dd81-4439-ab40-fb15e29185b6)

![BOTTOM](https://github.com/user-attachments/assets/c966ac74-08de-4a68-9b67-2c7d9c513829)

---

## Symptôme et premiers constats

### Symptôme principal
- **Ne s’allume plus** (panne confirmée par le vendeur et par moi).

### Consommation anormale
Mesures à l’alimentation de labo :
- **~10 mA poste “éteint”**
- **~40 mA** quand j’appuie sur POWER (donc l’appui est bien détecté, mais le poste ne démarre pas réellement)

### Rails d’alimentation
- **5 V interne présent**
- Les autres alimentations attendues sont absentes : je ne lis que **~1,8 V / ~1,6 V** sur plusieurs étages (valeurs typiques d’une alim aval “effondrée” / alimentée par des retours ou fuites)

---

## Vérifications mécaniques : la prise HP (modif vendeur)

En inspection, j’ai trouvé un **shunt** réalisé entre la **masse du HP interne** et la **prise jack HP externe**.

À ce stade, **je ne vois pas de lien direct** entre ce shunt audio et la panne d’alimentation/boot :
- le 5 V est présent,
- mais le reste du poste n’est clairement pas alimenté correctement.

---

## Hypothèse : problème sur la distribution d’alim (pas de 8 V)

Le poste a une façade détachable. J’ai essayé le **long cordon de déport de façade** :
- Alimentation façade : **5 V OK**
- Communication RX/TX entre façade et corps du poste : **OK**
- Mais côté “corps”, les autres rails restent **à ~1,8 V** → ce n’est **pas** un problème de câble de façade.

Je ne voyais **pas** non plus les**8 V** attendus (ou rail intermédiaire équivalent) censé alimenter les régulateurs aval.

---

## Documentation : schéma du TH-9800 comme “donneur” (PCB très proche)

Je n’ai pas trouvé un schéma “service” complet du TH-7800, mais j’ai mis la main sur le schéma du **TYT TH-9800**.

- Le **PCB ressemble fortement**.
- Le TH-9800 couvre en plus le **10 m**, ce qui explique **plus de composants** sur certaines zones RF.
- Le reste est **très similaire** et exploitable pour suivre la logique d’alimentation.

Lien (schémas TH-9800) :  
`https://github.com/Telectroboy/F4EGM/tree/master/content/posts/Electronique/TH-9800`

Les silkscreen des PDF permettent de voir que la plupart des composants notamment ceux qui m'intéressent se trouvent exactement à la même place.
![silkscreen9800](https://github.com/user-attachments/assets/2440d547-0502-40e0-ae26-1237e4c5a0bf)
![silkscreenbottom9800](https://github.com/user-attachments/assets/30b21cf2-5a3f-4d8d-a10b-9dea035dcdc0)
Excellente nouvelle, je vais pouvoir rapidement cibler la localisation du composant incriminé.

---

## Point clé du diagnostic : Q30 (2SB1386) ne commute pas l’alim aval

Sur le schéma du TH-9800, un transistor **Q30 = 2SB1386** sert à **commuter** l’alimentation pour alimenter le reste des régulateurs (donc les rails qui manquaient chez moi).

Et bonne nouvelle : **c’est bien un 2SB1386 sur le schéma du 9800 et sur le PCB du 7800**.
![schema](https://github.com/user-attachments/assets/8c2ffdd5-a542-48b3-b383-348405fd00f9)

La commande de Q30 se fait via :
- **Q32 = DTC114EU**
- une résistance **R77 = 470 Ω** (dans la chaîne de pilotage)

### Mesures
- Sortie de Q30 : seulement **~1,8 V** (au lieu d’alimenter correctement les étages aval)
- Diagnostic direct : **court-circuit entre base et collecteur de Q30**

![IMG_2076](https://github.com/user-attachments/assets/040561ae-78e2-444c-8ccb-3551027fb9f3)


---

## Réparation : contournement (bypass) du switch Q30

Vu que Q30 est **défectueux** et que je voulais valider rapidement le diagnostic, j’ai choisi une réparation “fonctionnelle” : **forcer l’alimentation aval en permanence**.

### Étape 1 — Isoler la commande
- **Retirer R77 (470 Ω)**  
Objectif : éviter d’injecter des niveaux indésirables vers Q32 / la logique de commande une fois Q30 contourné.


### Étape 2 — Bypasser Q30
- Faire un **court-circuit entre collecteur et émetteur de Q30** (shunt C–E) pour valider le fonctionnement “alim aval toujours présente”.

Résultat immédiat :
- **Ça fonctionne : le poste s’allume.**
![BYPASS](https://github.com/user-attachments/assets/43526a83-afd1-4401-8fca-e53da910d6bf)

### Test de Q32
- **Q32 testé : OK**  
Donc la panne est bien localisée autour de **Q30**.

---

## Démontage : la partie qui fait perdre du temps (et comment éviter les galères)

Pour répéter : ces composants sont **sous le PCB**.

### Ce que j’ai dû faire (ordre réaliste)
1. **Photo avant démontage** (indispensable).
2. Dépose capots, déconnexion HP, câbles internes, etc.
3. Sortie de la carte principale du châssis.
4. **Dessoudage de la prise SO-239** (obligatoire pour libérer la carte).
5. Extraction de la carte, accès à la face inférieure, intervention sur Q30/Q32/R77.

---

## Spécifications du TYT TH-7800 (rappel utile)

Table récap issue de la fiche produit (pratique pour contextualiser le poste dans l’article) :

| Élément | Valeur |
|---|---|
| Bandes TX/RX (radioamateur) | 136–174 MHz et 400–480 MHz (FM) |
| Modulation | FM (RX/TX), AM (RX uniquement 108–136 MHz) |
| Puissance TX | 50/20/10/5 W (VHF) ; 35/20/10/5 W (UHF) |
| Réception airband | 108–136 MHz (AM) |
| Réception large bande | AM/FM : 108–135 / 136–180 / 320–512 / 700–950 MHz (hors fréquences GSM) |
| Double VFO / double réception | V+V, V+U, U+U (réception simultanée) |
| Cross-band / full duplex | Oui |
| Mémoire | 800 canaux |
| Signalisations | 1750 Hz, CTCSS/DCS, DTMF, 2-tons, 5-tons |
| Pas VFO | 2.5 / 5 / 6.25 / 10 / 12.5 / 20 / 25 / 50 kHz |
| Connecteur antenne | SO-239 (UHF femelle) |
| Dimensions | 140 × 42 × 168 mm |
| Poids | ~1,5 kg |

Source fiche produit :  
`https://www.passion-radio.fr/mobile-vhf-uhf/tytera-th-7800-387.html`

---

## Pourquoi ma carte RF s’appelle “TH-7900-RF-1.3” alors que le poste est un TH-7800 ?

J’ai aussi relevé une référence sérigraphiée surprenante sur la carte RF : **TH-7900-RF-1.3**.

En pratique, ce n’est **pas forcément incohérent** : ces postes TYT sont clairement une **plateforme commune** déclinée en plusieurs modèles. Côté homologation FCC (dossier PODTH-9800), on trouve des documents où **TH-7800 et TH-7900 apparaissent comme “série modèle”** d’un même ensemble, avec une différence décrite comme portant sur le **nom de modèle et l’apparence**.

Conclusion raisonnable :
- le fabricant réutilise **la même carte RF** (ou une très proche), et la référence “TH-7900-RF” est probablement un **nom interne de PCB** qui se retrouve aussi dans des TH-7800.

---

## Réparation : OK, mais ce n’est pas la solution la plus “propre”

Je laisse le bypass tel quel parce que :
- le poste est reparti,
- et je n’ai pas envie de partir en chasse d’un équivalent du **2SB1386**.

 Dans tous les cas, cette réparation ne permet plus d'éteindre le poste via son bouton : un contournement de switch d’alim peut augmenter la consommation de veille et finir par vider une batterie si le poste reste alimenté en permanence.
Dans mon cas ça ne me dérange pas car l'alimentation +12V est toujours commutée.
---

## Prochaines étapes

- Remontage complet
- Tests RX/TX (puissance, modulation, stabilité)
- Test de la fonction **cross-band**
- Programmation des canaux

Je mettrai à jour cet article après validation “terrain”.

![POWER ON!](https://github.com/user-attachments/assets/2207f91c-de00-4035-8b79-ac7b761e37df)

---

## Liens utiles

- Schémas TH-9800 (utilisés comme référence) :  
  `https://github.com/Telectroboy/F4EGM/tree/master/content/posts/Electronique/TH-9800`

- Fiche technique / caractéristiques TH-7800 :  
  `https://www.passion-radio.fr/mobile-vhf-uhf/tytera-th-7800-387.html`

- Dossier FCC (utile pour recouper TH-7800 vs TH-7900) :  
  `https://fcc.report/FCC-ID/PODTH-9800/2322758.pdf`

73 de F4EGM
