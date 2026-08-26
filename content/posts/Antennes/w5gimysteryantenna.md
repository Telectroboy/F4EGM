---
title: "Construire une antenne W5GI Mystery multibande 80 à 6 m"
date: 2026-08-26
draft: false
author: "F4EGM"
description: "Construction en mètres d'une W5GI Mystery Antenna avec sections en RG58, ligne symétrique et réglage au VNA."
tags: ["radioamateur", "antenne", "W5GI", "HF", "RG58", "DIY"]
categories: ["Antennes"]
cover:
  image: "https://github.com/user-attachments/assets/7ea7a188-0350-4c49-8209-92a950fd9b08"
  alt: "Schéma de construction de l'antenne W5GI Mystery"
  relative: false
---

La **W5GI Mystery Antenna**, conçue par John P. Basilotto W5GI, est une antenne filaire multibande d'environ 31 m. Elle ressemble à une G5RV, mais ses deux bras comportent chacun une section de câble coaxial qui fait partie de l'élément rayonnant. La conception est surtout pensée autour du **20 m**, tout en restant exploitable sur plusieurs bandes HF avec un coupleur si nécessaire.

Cet article reprend les dimensions publiées pour la version multibande, les convertit en mètres et adapte la réalisation à du **RG58**, que W5GI indiquait comme utilisable électriquement à la place du RG8X.

![Schéma général de la W5GI](https://github.com/user-attachments/assets/76d2cae2-da61-4b99-9399-73aa5a96a0ff)

## Dimensions de la version multibande

Pour chaque moitié de l'antenne, en partant du centre :

| Élément | Longueur |
|---|---:|
| Fil intérieur | **5,23 m** |
| RG58 | **5,08 m** |
| Fil extérieur | **5,13 m** |

La longueur totale est donc d'environ **30,9 m**.

Les dimensions d'origine publiées en unités impériales sont 17 ft 2 in, 16 ft 8 in et 16 ft 10 in. Une version plus ancienne de l'article utilisait des sections proches de 16 ft 6 in. Pour une construction neuve, j'ai retenu ici les dimensions données dans la table multibande publiée avec les mises à jour de W5GI.

## Le câblage des sections de RG58

C'est le point à respecter soigneusement.

À l'extrémité du RG58 située **vers le centre de l'antenne**, seul le conducteur central du coaxial est raccordé au fil de 5,23 m. La tresse reste isolée et non connectée.

À l'extrémité située **vers le bout de l'antenne**, l'âme et la tresse du RG58 sont reliées ensemble et raccordées au fil extérieur de 5,13 m.

![Détail des raccordements RG58](https://github.com/user-attachments/assets/351be8fb-8ae8-4f30-a271-7f5198ce10a0)


W5GI précise dans sa FAQ qu'il ne faut **pas appliquer le facteur de vélocité du RG58** à ces deux morceaux de coaxial. Les deux sections font donc bien **5,08 m de longueur physique**.

Pour une installation durable, les soudures doivent être reprises mécaniquement et protégées contre l'eau. Une corde synthétique portant toute l'antenne permet aussi d'éviter de faire supporter la traction aux raccords et au coaxial.

## La ligne symétrique au centre

Le centre de l'antenne est alimenté par une section de ligne symétrique ayant une longueur électrique d'environ une demi-onde sur 20 m.

Dans l'article d'origine, W5GI cite une ligne 300 ohms d'environ **9,1 m** lorsque son facteur de vélocité est voisin de 0,91. Une mise à jour conseille de partir d'environ **10,54 m** de ruban 300 ohms puis de raccourcir pour obtenir le meilleur ROS.

La bonne longueur dépend donc du type de ligne utilisé. W5GI indique aussi qu'une ligne 450 ohms ou une ligne ouverte fabriquée maison peut convenir, à condition de régler sa **longueur électrique**.

### Fabriquer sa propre ligne bifilaire

Une ligne peut être réalisée avec deux fils parallèles et des séparateurs imprimés en 3D. Des fils gainés conviennent également. La présence de la gaine modifie toutefois l'impédance et le facteur de vélocité par rapport à deux conducteurs nus dans l'air.

Pour deux conducteurs nus dans l'air, une approximation courante de l'impédance est `Z0 ≈ 120 × acosh(D/d)`, avec :

- \(D\) : distance centre à centre entre les fils ;
- \(d\) : diamètre du conducteur métallique.

Avec un conducteur cuivre de **0,5 mm²**, le diamètre équivalent du cuivre est d'environ **0,80 mm**. En air pur, une ligne de 300 ohms conduirait à un écartement centre à centre voisin de **4,9 mm**. Avec une gaine PVC ou PE, cette valeur n'est plus assez précise pour fabriquer la ligne uniquement par calcul.

Dans la pratique, pour la W5GI, je préfère construire la ligne mécaniquement propre puis **mesurer sa longueur électrique au VNA**. L'article d'origine accepte plusieurs impédances de ligne, alors que la longueur électrique sur 20 m est déterminante pour le comportement de l'antenne.

## Réglage de la ligne au VNA

Il est préférable de laisser la ligne un peu trop longue au départ.

Une méthode simple consiste à mesurer la fréquence correspondant à sa demi-onde électrique, puis à raccourcir progressivement. Si une longueur `L` donne une résonance à `fm` et que l'on souhaite la déplacer vers `fc`, on peut utiliser : `Lnouvelle = L × fm / fc`.

Pour cette antenne, le réglage se fait autour de la bande des **20 m**, proche de 14 MHz. Il faut faire les dernières mesures avec la ligne déployée, sans la rouler et aussi loin que possible des masses métalliques.

Un retour de construction publié par K3MGM en 2025 montre bien l'effet de ce réglage : une ligne 450 ohms livrée environ 3 m trop longue déplaçait les minima de ROS vers les fréquences basses et les rendait étroits. Le comportement s'est amélioré après raccourcissement.

## Raccordement vers le poste

W5GI ne recommande pas de transformateur d'impédance 4:1 pour la version multibande. Sa FAQ conseille plutôt un **isolateur de ligne ou choke de courant 1:1** entre la ligne symétrique et le coaxial 50 ohms allant au poste.

Le montage devient donc :

```text
W5GI
  |
ligne symétrique
  |
choke de courant 1:1
  |
RG58 50 ohms
  |
transceiver
```

Le choke limite les courants de mode commun sur la tresse du câble de descente et rend le comportement de l'antenne moins dépendant du cheminement du coaxial.

## Installation

L'article d'origine indique un centre à environ **7,6 m minimum**. Une installation plus haute est généralement préférable pour réduire l'influence du sol, en particulier sur 20 m et les bandes supérieures.

La W5GI peut être montée à l'horizontale ou en V inversé. Des essais et modélisations publiés par G0KYA montrent qu'un montage en V inversé, avec le centre vers 10 m et les extrémités vers 3 m, tend à rendre le diagramme plus régulier sur les bandes hautes.

Une fois installée, je conseille de faire un balayage complet au VNA de 3 à 54 MHz avant d'utiliser le coupleur. Le **20 m** est la première bande à vérifier, car c'est celle autour de laquelle la géométrie de la W5GI a été conçue.

## Matériel nécessaire

- 2 morceaux de fil de **5,23 m** ;
- 2 morceaux de **RG58 de 5,08 m** ;
- 2 morceaux de fil de **5,13 m** ;
- environ 10 m de ligne symétrique à ajuster ;
- 3 isolateurs ;
- gaine thermo-rétractable adhésive ou autre étanchéité RF extérieure ;
- corde synthétique de soutien si l'on veut soulager mécaniquement les conducteurs ;
- choke de courant 1:1 ;
- coaxial 50 ohms jusqu'au poste.

## Ce qu'il faut retenir

La partie inhabituelle de cette antenne n'est pas la ligne symétrique, mais la façon dont les deux sections coaxiales sont incorporées dans les bras. Le RG58 convient, mais les **5,08 m doivent rester des longueurs physiques** et non des longueurs corrigées par son facteur de vélocité.

La ligne symétrique, elle, doit au contraire être réglée selon sa longueur électrique réelle. C'est particulièrement utile avec une ligne bifilaire maison et des fils gainés, pour lesquels le facteur de vélocité est rarement connu précisément.

## Sources

- John P. Basilotto, W5GI, **The W5GI Multiband Mystery Antenna**, *CQ Magazine*, juillet 2003 :  
  <https://msr.zapto.org/radio/CQ-AR/2003/07%20July%202003.pdf>
- Reprise de l'article, mises à jour et FAQ W5GI chez IW5EDI :  
  <https://www.iw5edi.com/technical-articles/w5gi-mystery-antenna>
- Steve Nichols G0KYA, construction et essais en RG58 :  
  <https://g0kya.blogspot.com/2011/09/w5gi-mystery-antenna.html>
- Mark Mutti K3MGM, retour de construction publié en 2025 :  
  <https://k3mgm.com/building-a-k5gi/>

> Les deux schémas de cette page ont été redessinés pour cet article à partir des dimensions et connexions décrites par W5GI. Les photos et illustrations originales de W5GI ne sont pas reproduites ici.
