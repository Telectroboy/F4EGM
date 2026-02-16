---
title: "Antenne Dual-Band High Gain Flower Pot – Réalisation personnelle"
date: 2026-02-14
author: "F4EGM"
tags: ["antenne", "VHF", "UHF", "DIY", "Flower Pot", "RG58", "3D print"]
---

# Antenne Dual-Band High Gain Flower Pot

Voici une antenne que j’ai réalisée récemment et qui fonctionne **remarquablement bien en VHF et UHF** : la **Dual-Band High Gain Flower Pot** conçue par VK2ZOI.

 Article original (avec tous les schémas et explications détaillées) :  
**https://vk2zoi.com/articles/dual-band-high-gain-flower-pot/**

[!Schéma VK2ZOI](https://vk2zoi.com/assets/highgain-1.png)

Je l’utilise **en intérieur** pour attaquer le relais local **F5ZCE** avec un petit poste de **5 W**, et les résultats sont très satisfaisants.

---

# Principe de l’antenne

Le design de VK2ZOI est une évolution de la Flower Pot demi-onde classique.

Le principe repose sur :

- Une **section rayonnante 1/2 onde en VHF**
- Une configuration permettant de fonctionner également en **70 cm**
- Un système de **sleeves coaxiaux (manchons)** et de phasage

Sur 70 cm, l’antenne se comporte comme un empilement de sections rayonnantes en phase, ce qui améliore le diagramme vertical et le gain par rapport à une simple demi-onde.

 Tous les calculs, longueurs exactes, schémas de principe et diagrammes sont disponibles sur la page de VK2ZOI.  
Je ne les reproduis pas ici volontairement : **référez-vous directement à son article**, qui est très bien documenté.

---

# Ma réalisation

## Matériel utilisé

-  **RG58 50 Ω**
-  Papier aluminium ménager (pour réaliser les sleeves)
-  Tube IRO / PVC comme support
-  Pièces imprimées en 3D :
  - Guides pour maintenir le coax bien centré
  - Gabarits pour assurer un diamètre précis
  - Supports pour former les spires

Fichier des pièces 3D :  
https://cad.onshape.com/documents/3be0b0e486e3c2586735ab91/w/e4e606bfe45fd35704b37fb2/e/7a1ec4b8883fc0cf52e7e41b?renderMode=0&uiState=699070a04fb432e519c7a0a3

[!Aperçu des pièces 3D](https://github.com/user-attachments/assets/fac6c982-8217-454a-afe8-1cfaa1889724)


---

## Sleeves en aluminium

Sur la conception originale, les sleeves sont réalisés en cuivre ou matériau conducteur rigide.

Dans mon cas :

- J’ai utilisé **du papier aluminium ménager**
- Enroulé soigneusement autour des pièces imprimées
- Maintenu mécaniquement par du simple gaffer

Le rôle de ces sleeves est crucial :

- Ils assurent le découplage RF
- Ils participent à l’accord en VHF
- Ils influencent directement le comportement en UHF

⚠️ Le diamètre et la position sont critiques, d’où l’intérêt des pièces 3D pour garantir la répétabilité.

---

## Spires de maintien du coax

J’ai également imprimé des guides pour :

- Maintenir le coaxial bien droit
- Garantir un diamètre constant
- Éviter les déformations lors du montage

Une variation de quelques millimètres peut décaler l’accord, surtout sur 70 cm.

---

# Réglage

Le réglage se fait principalement :

- En ajustant légèrement la position des sleeves
- En vérifiant le ROS sur les deux bandes
- En affinant si nécessaire avec un NanoVNA

Sur ma réalisation :

- Très bon accord en VHF
- Très bon comportement en UHF avec un accord perfectible dans mon cas en dessous de 2:1
- Utilisable immédiatement sans optimisation extrême

---

# Utilisation réelle

Je l’utilise **en intérieur**, fixée verticalement dans la mezzanine.

Avec seulement **5 W**, j’attaque sans difficulté le relais **F5ZCE**, là où une simple antenne portable ne donnait pas satisfaction.

Le comportement est stable, reproductible, et le rapport performance / coût est excellent.

---

# Points importants

✔ Construction économique  
✔ Pas besoin d’éléments séparés pour VHF et UHF  
✔ Performances supérieures à une simple verticale portable  
✔ Compatible usage fixe léger ou intérieur  

À noter :

- Le RG58 n’est pas idéal sur de longues distances en UHF
- La précision mécanique est assez importante mais les guides en impression 3D simplifient le travail
- Le design reste expérimental → bien suivre les dimensions de VK2ZOI

---

# Conclusion

La **Dual-Band High Gain Flower Pot de VK2ZOI** est un excellent projet DIY pour qui veut une antenne performante en VHF/UHF à faible coût.

Grâce au RG58, aux sleeves en aluminium ménager et aux pièces imprimées en 3D pour garantir la géométrie, j’obtiens une antenne efficace qui me permet de travailler le relais local avec seulement 5 W.

Je recommande vivement la lecture complète de l’article original :  
👉 https://vk2zoi.com/articles/dual-band-high-gain-flower-pot/

73  
F4EGM
