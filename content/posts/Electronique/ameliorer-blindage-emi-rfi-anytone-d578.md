---
title: "Améliorer le blindage interne de nos postes : EMI, RFI et gain réel en sensibilité"
date: 2026-02-17
draft: false
author: "F4EGM"
tags: ["emi", "rfi", "cem", "shielding", "rf", "anytone", "d578uv", "blindage", "radioamateur"]

cover:
  image: "https://github.com/user-attachments/assets/da532fa9-7f34-4f47-8bc2-282db5fad018"
---

# Améliorer le blindage interne de nos postes : EMI, RFI et gain réel en sensibilité

Je souhaite améliorer les blindages internes de mes postes qui ne sont pas (ou pas assez) protégés contre les **EMI** et **RFI** internes. Dit autrement : le poste est à la fois **récepteur** (donc “victime”) et **source** d’énergie électromagnétique parasite… dans le même boîtier.

![EMIRFI](https://github.com/user-attachments/assets/769adcd7-d641-4779-86da-8b4724db349f)

Ici, un article simple à lire en Français: 
https://www.eabel.com/fr/blindage-emi-rfi-pour-boitiers-electriques/


Dans un appareil moderne (Anytone D578, etc.), on trouve en permanence :

- des horloges numériques (MCU, DSP, interfaces),
- des convertisseurs DC/DC et régulateurs,
- des PLL/VCO et synthétiseurs,
- des étages RF (LNA/mélangeurs/IF),
- des étages de puissance (PA) et leurs harmoniques.

Tout cela cohabite dans un volume réduit, avec des plans de masse parfois partagés, des nappes/câbles internes, et des blindages mécaniques “minimum viable”. Résultat : **du bruit interne peut remonter le plancher de bruit**, dégrader la dynamique, et faire perdre de la sensibilité… sans qu’on s’en rende compte, parce que “ça marche quand même”.

Toutes ces zones en jaune pourraient accuellir un blindage!
![PCB D578](https://github.com/user-attachments/assets/400ae96d-6791-4ac1-a22c-f3eaaeddcf61)

---

## EMI, RFI, CEM : les termes (simplement)

- **EMI (ElectroMagnetic Interference)** : énergie électromagnétique indésirable qui perturbe un circuit.
- **RFI (Radio Frequency Interference)** : EMI spécifiquement dans la bande RF.
- **CEM (Compatibilité ÉlectroMagnétique)** : capacité d’un produit à fonctionner sans (trop) perturber les autres, et sans être (trop) perturbé.

Ce n’est pas juste une contrainte “réglementaire” : en réception, c’est directement une question de **SNR**, donc de sensibilité réelle.

---

## Comment les interférences se propagent : conduction vs rayonnement

Une perturbation passe d’une source à une victime par deux grands chemins.

### 1) Par conduction (via les conducteurs)

L’énergie circule dans :

- l’alimentation (12 V, régulateurs, rails internes),
- la masse (retours de courant, impédance de masse, boucles),
- les câbles internes (micro, HP, coax internes, nappes),
- les pistes du PCB (couplages via impédances partagées).

Symptômes typiques :

- bruit qui change avec la charge CPU/écran/activité,
- bruit qui dépend du mode (TX/RX, GPS),
- parasites “en peigne” alignés sur une fréquence d’horloge.

Contremesures typiques :

- découplage (condos proches, valeurs multiples),
- ferrites (sur rails et signaux),
- filtres LC,
- routage masse/retours, réduction des boucles.

### 2) Par rayonnement (dans l’air, dans le boîtier)

L’énergie se propage comme un champ électromagnétique dans le boîtier, et se recouple dans :

- l’entrée RF et son front-end,
- les pistes à haute impédance,
- les structures métalliques mal mises à la masse,
- les ouvertures / joints / interstices.

Dans un poste, le rayonnement interne est souvent sous-estimé : une horloge à 24/48/96 MHz n’est pas “RF” sur le papier, mais ses harmoniques et transitoires peuvent se balader très haut en fréquence et **se recoupler** là où il ne faut pas.

---

## Pourquoi un blindage métallique peut aider (et quand)

Le blindage passif (métal relié à la masse) agit principalement de trois façons :

1. réflexion des champs (effet cage),
2. absorption (pertes dans le métal),
3. réduction du couplage capacitif/inductif entre zones.

Mais il y a une règle pratique : **un blindage mal monté peut être presque inutile**.

- Un capot “posé” sans bon contact masse laisse fuir par les joints.
- Un contact masse ponctuel peut créer une impédance RF élevée.
- Les ouvertures (fentes, trous, découpes) deviennent des fuites.

---

## Le point clé : la jonction à la masse (RF ground)

Le blindage n’est pas magique. Le contact électrique entre le blindage et la masse du PCB est déterminant.

- plus le contact est continu (ou multipoints rapprochés), mieux c’est,
- plus l’impédance est faible, plus la “cage” est efficace,
- les joints (périmètre) sont souvent la faiblesse principale.

C’est pour ça que les solutions industrielles utilisent :

- des clips ou “fences” soudés au PCB,
- des capots métalliques encliquetables,
- une géométrie qui garantit un contact répétable.

---

## Pourquoi 2 dB, c’est déjà beaucoup

Si on fait correctement le travail, on peut viser un gain du type :

2 dB peuvent sembler faibles, mais en pratique :

- 2 dB de bruit en moins = 2 dB de SNR en plus (à signal constant),
- en limite FM, cela se traduit par moins de souffle et une meilleure intelligibilité,
- en numérique, 2 dB peuvent faire passer un décodage “instable” à “stable”.

Ce n’est pas un miracle, c’est juste de la physique : on baisse le plancher de bruit.

---

## Solutions industrielles prêtes à l’emploi

Je me suis appuyé sur l’article DigiKey suivant, qui explique précisément l’intérêt des blindages standards et la différence entre prototypage et production :
https://www.digikey.fr/fr/articles/use-the-right-off-the-shelf-metal-to-shield-against-emi-rfi
![Blindage](https://github.com/user-attachments/assets/9240e6a6-39ee-4aad-bb10-2b65aa312a46)

Et un exemple de produit (Würth Elektronik), c'est un kit prêt à couper et plier pour s'adapter à toutes les tailles:
https://www.digikey.fr/fr/products/detail/w%C3%BCrth-elektronik/360002/10468233


L’article rappelle un point important : bricoler un blindage en cuivre / FR‑4 plaqué peut fonctionner pour “tester”, mais c’est souvent :

- long à fabriquer,
- fragile,
- difficile à répéter,
- risqué pour le PCB (chauffe/dessoudage, arrachement de pistes).

Les systèmes à clips permettent :

- de souder les supports au PCB (refusion ou fer),
- d’encliqueter/décliqueter le capot pour mesures et maintenance,
- de garder une solution compatible “atelier” et reproductible.

---

## Refroidissement : un blindage peut aussi être un “radiateur”

Un point qui revient dans ce type d’approche : un capot empêche la convection.

Oui… mais en pratique :

- un capot fin en métal conduit bien la chaleur,
- un capot en FR‑4 (bricolage avec chute de PCB) conduit beaucoup moins bien.

Donc un capot métallique mince est souvent meilleur thermiquement qu’un bricolage FR‑4, à condition de garder du cuivre sous-jacent pour évacuer la chaleur (plans, vias thermiques, etc.).

---

## Les trous dans le blindage : attention au piège

Percer des trous peut aider la convection, mais crée des fuites RF.

Règle simple (ordre de grandeur) : ouverture < λ/10.

Le piège : la fréquence perturbatrice peut être bien plus haute que la fréquence “utile”. Une horloge numérique génère des harmoniques ; un DC/DC génère des fronts raides ; un PA génère du bruit large bande. Donc dimensionner les trous uniquement sur la bande VHF/UHF d’utilisation n’est pas forcément suffisant.

---

## Hackaday : guide très accessible (avec vidéo)

En complément, Hackaday a publié un guide “simple” (et utile) sur le blindage, avec une vidéo :

https://hackaday.com/2026/02/16/a-basic-guide-to-shielding/

Ce type de contenu est bon pour comprendre, sans être spécialiste, pourquoi :

- les joints sont critiques,
- un capot mal relié à la masse fuit,
- la masse RF n’est pas juste “0 V DC”,
- la mécanique influence la RF.

---

## Ressource : “ABC of Shielding” (Würth)

Würth propose aussi un document pédagogique :

https://www.we-online.com/en/components/products/ABC_OF_SHIELDING_ENGLISH

C’est typiquement le genre de ressource à garder sous le coude : on y trouve des notions très concrètes sur les matériaux, les méthodes, les erreurs classiques et les compromis.

Une autre page web ici très bien écrite:
https://castle-compliance.com/understanding-shielding-effectiveness-data/
![effectivness](https://castle-compliance.com/wp-content/uploads/2026/01/Shielding-Effectiveness-Performance-Curve-1024x558.jpg)

---

# Conclusion

Les EMI/RFI ne sont pas seulement un sujet de conformité : dans un poste radio, c’est un sujet de performance.

En pratique, améliorer le blindage interne vise :

- à réduire le bruit interne rayonné,
- à éviter le couplage entre zones numériques et RF,
- à stabiliser le plancher de bruit,
- à gagner quelques dB de sensibilité utile.

Et oui : 2 dB en VHF, c’est déjà un gain très appréciable.

La suite : je vais choisir des capots/solutions adaptés, identifier les zones critiques (front-end RX, PLL, etc.), et tester de manière comparative (avant/après) en conditions réelles.

---

73  
F4EGM
