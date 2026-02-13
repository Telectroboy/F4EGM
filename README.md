---
title: "Réparation Anytone D578UV Plus"
date: 2026-02-13
author: "F4EGM"
tags: ["Anytone", "D578UV", "VHF", "UHF", "RF", "Réparation", "PA", "Radioamateur"]
---

# Réparation Anytone D578UV Plus

## Réparation du PA VHF

J’ai acheté ce poste d’occasion pour **300 € fdp compris** à un OM belge qui m’indiquait qu’il fonctionnait parfaitement avant l’envoi.

Après réception, test immédiat sur **alimentation de laboratoire limitée à 6 A sous 13,5 V**.

> ⚠️ Ces alimentations limitent le courant de manière quasi instantanée.  
> Elles sont conçues pour le développement et la réparation électronique et ne contiennent pas de fortes capacités capables de délivrer une grosse impulsion d’énergie.

---

## Tests initiaux

### UHF (préréglage usine)

- Charge fictive 50 Ω
- Mesure ROS
- **50 W en sortie**
- **ROS = 1:1**
- RAS

### VHF

- Seulement **quelques milliwatts en sortie**
- Consommation TX : **1,6 A**
- Variation d’environ 100 mA entre 5 W et 50 W affichés

👉 Impossible que le poste ait fonctionné correctement avant envoi.

J’ai d’abord remis en cause mon utilisation (ne connaissant pas bien le matériel), mais après plusieurs essais et réglages, il fallait se rendre à l’évidence : **panne matérielle**.

---

## Ouverture du poste

À l’ouverture, le PA est caché sous un petit blindage métallique.

En retirant ce cache, découverte immédiate :

## 🔥 PA détruit : NXP AFT05MP075N

Trou visible dans le transistor RF :

![Trou dans le PA](https://i.servimg.com/u/f52/11/30/17/07/th/e363ec10.jpg)

Le transistor incriminé est un :

**NXP AFT05MP075N**

Transistor RF LDMOS 40 V couvrant 136–520 MHz.

Commandé ici :  
https://fr.farnell.com/nxp/aft05mp075nr1/fet-rf-40v-136mhz-520mhz-to-270wb/dp/2890588

---

## Liens utiles

- https://anytonetechzone.byethost7.com/578techmods.htm?i=2#BandError  
- https://radioamateur.org/annonce/Vente/anytone-uv578d-et-bt01?74c735aa5d86669ddaddcccc71371b56  
- https://a08.veron.nl/nieuwe-gratis-codeplug-beschikbaar-voor-anytone-578-en-878/  
- https://www.qrz.com/db/PC7MM (OM entendu sur QO-100 !)  
- https://wyomingsurvival.org/2022/12/09/at-options-opening-up-your-anytone-at-d878uv-and-at-d578uv/  
- https://forum.digirig.net/t/cat-control-for-anytone-at-d578uv-plus/2847  

---

# Démontage du transistor

Pour retirer le transistor, j’ai :

- Dessoudé les pattes
- Cassé la partie supérieure du boîtier

![Transistor démonté](https://i.servimg.com/u/f52/11/30/17/07/img_1712.jpg)

---

## PCB – Zone non peuplée

Sous le PCB, on observe une rangée complète de composants non peuplés.

![PCB dessous](https://i.servimg.com/u/f52/11/30/17/07/img_1711.jpg)

On distingue également un espace prévu pour un blindage et des zones de fixation.

![Zone blindage](https://i.servimg.com/u/f52/11/30/17/07/img_1710.jpg)

🤔 À quoi sert cette zone ?  
Probablement une version multi-bande ou variante industrielle du design.

---

## Démontage de la semelle cuivre

J’ai arraché le cuivre en pensant que c’était collé…

![Cuivre arraché](https://i.servimg.com/u/f52/11/30/17/07/img_1714.jpg)

En réalité, c’était **soudé à l’étain**.

On en apprend tous les jours…

![Cuivre soudé](https://i.servimg.com/u/f52/11/30/17/07/img_1715.jpg)

La semelle a pris quelques coups de tournevis…

![Semelle abîmée](https://i.servimg.com/u/f52/11/30/17/07/img_1713.jpg)

---

# Repose du transistor

### Chauffe "à la barbare"

- Radiant en dessous
- Gros fer à souder type toiture

![Chauffe](https://i.servimg.com/u/f52/11/30/17/07/img_1716.jpg)

Résultat : semelle bien attaquée, planéité compromise.

![Semelle attaquée](https://i.servimg.com/u/f52/11/30/17/07/img_1810.jpg)

---

## Préparation

- Polissage de la surface cuivre
- Application de pâte à braser (un peu trop…)

![Préparation](https://i.servimg.com/u/f52/11/30/17/07/img_1813.jpg)

Matériel utilisé (NO CLEAN… mais nettoyage quand même nécessaire)

![Pâte à braser](https://i.servimg.com/u/f52/11/30/17/07/img_1811.jpg)

---

## Fusion et positionnement

![Fusion](https://i.servimg.com/u/f52/11/30/17/07/img_1812.jpg)

💡 J’aurais dû positionner une des grandes vis à froid avant la chauffe.

---

## Fixation mécanique provisoire

Vis + entretoise sous PCB pour maintenir la semelle pendant le montage :

![Fixation](https://i.servimg.com/u/f52/11/30/17/07/img_1815.jpg)

Nouvelle chauffe en insistant davantage :

![Seconde chauffe](https://i.servimg.com/u/f52/11/30/17/07/img_1816.jpg)

Ajout d’un poids pendant le refroidissement :

![Poids](https://i.servimg.com/u/f52/11/30/17/07/img_1814.jpg)

Excès d’étain :

![Etain excès](https://i.servimg.com/u/f52/11/30/17/07/img_1818.jpg)

Trou de vis partiellement comblé :

![Trou comblé](https://i.servimg.com/u/f52/11/30/17/07/img_1817.jpg)

Nettoyage + léger ponçage :

![Surface finale](https://i.servimg.com/u/f52/11/30/17/07/img_1819.jpg)

---

# Résultats après réparation

## Puissances obtenues

- Low : 100 mW  
- Medium : 6 W  
- High : 18,6 W  

Spécifications attendues :

| Fréquence | Low | Mid | High | Turbo |
|-----------|------|------|-------|--------|
| 145.5 MHz | 1.2 W | 10 W | 25 W | 58 W |
| 225.0 MHz | 1.5 W | 6 W | 6 W | 6 W |
| 435.0 MHz | 1.1 W | 11 W | 26 W | 43 W |

➡ Probablement un **réglage de gain à effectuer**.

---

# Bilan des pertes – 13,3 V

## VHF

| Mode   | P RF | I conso | P elec | Rendement | Pertes |
|--------|------|---------|--------|------------|---------|
| Low    | 0,45 W | 1,10 A | 14,6 W | ~3 %  | 14,2 W |
| Medium | 6 W   | 2,65 A | 35,2 W | ~17 % | 29,2 W |
| High   | 20 W  | 4,42 A | 58,8 W | ~34 % | 38,8 W |
| Turbo  | 35 W  | — | — | — | — |

> Turbo non exploitable : alimentation limitée à 6 A.

---

## UHF

| Mode   | P RF | I conso | P elec | Rendement | Pertes |
|--------|------|---------|--------|------------|---------|
| Low    | 1 W   | 1,96 A | 26,1 W | ~4 %  | 25,1 W |
| Medium | 8,5 W | 4,57 A | 60,8 W | ~14 % | 52,3 W |

---

# Mesures à 14 V

## VHF @ 14 V

| P RF | I | Pdc | η | Chaleur |
|------|----|------|------|----------|
| 1 W | 1,85 A | 25,9 W | 3,9 % | 24,9 W |
| 6 W | 3,18 A | 44,5 W | 13,5 % | 38,5 W |
| 19,9 W | 5,46 A | 76,4 W | 26,0 % | 56,5 W |
| 50,5 W | 8,53 A | 119,4 W | 42,3 % | 68,9 W |

## UHF @ 14 V

| P RF | I | Pdc | η | Chaleur |
|------|----|------|------|----------|
| 0,93 W | 1,92 A | 26,9 W | 3,5 % | 26,0 W |
| 8,4 W | 4,31 A | 60,3 W | 13,9 % | 51,9 W |
| 19 W | 6,46 A | 90,4 W | 21,0 % | 71,4 W |
| 37 W | 9,42 A | 131,9 W | 28,1 % | 94,9 W |

---

## 🤔 Interrogation

Je m’interroge sur le **rendement de la chaîne UHF**, nettement inférieur à la VHF.

Plusieurs hypothèses :

- Polarisation différente
- Adaptation imparfaite
- Étages drivers distincts
- Dissipation thermique sous-optimale

---

# Poste réparé ✔

Nettoyé, remonté, programmé et installé dans la voiture.

![Poste remonté](https://i.servimg.com/u/f52/11/30/17/07/397e8d10.jpg)

Sortie 50 W sur charge (ROS 1.14 en VHF)

![Mesure SWR](https://i.servimg.com/u/f52/11/30/17/07/5680c310.jpg)

Étonnamment :

- VHF : ROS 1.14  
- UHF : ROS 1.00 parfait  

Bizarre…

---

# Conclusion

- PA VHF totalement détruit à l’achat
- Remplacement par AFT05MP075N neuf
- Reprise mécanique délicate
- Performances retrouvées
- Poste désormais opérationnel

👉 Seconde vie pour ce D578UV Plus.

---

Mission accomplie.

73  
F4EGM
