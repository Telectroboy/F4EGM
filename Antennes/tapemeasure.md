+++
date = '2026-02-12T07:53:16+01:00'
draft = false
title = "Antenne Yagi VHF UHF en mètre Ruban !"

[cover]
  image = "https://i.goopics.net/ywfptn.jpg"
  alt = "Antenne Yagi VHF/UHF en mètre ruban"
  caption = "Yagi 3+2 éléments – version mètre ruban"
+++

## Antenne Satellite VHF/UHF – Yagi 3+2 éléments

Antenne Yagi bi-bande VHF/UHF réalisée avec des éléments en mètre ruban, sans duplexeur.  
Optimisée pour trafic satellite (FM et SSB).

Pièces imprimables 3D disponibles ici :  
OnShape – Yagi 3+2 éléments VHF/UHF  
https://cad.onshape.com/documents/ff718957a1ed4b35b8342b82/w/7e3276fefe589fb7dd6ad96d/e/9cbb78860579aa734ebed76b
[![Image](https://i.goopics.net/ywfptn.jpg)](https://goopics.net/i/ywfptn)
[![Image](https://i.goopics.net/ryr437.jpg)](https://goopics.net/i/ryr437)


Conception originale :  
https://www.qsl.net/dk7zb/Duoband/duoband_2-70_2-3.htm  
[![Image](https://i.goopics.net/92elyy.jpg)](https://goopics.net/i/92elyy)

Adaptation mètre ruban : F4EGM

[![Image](https://i.goopics.net/4v7wsz.jpg)](https://goopics.net/i/4v7wsz)
[![Image](https://i.goopics.net/tmkxkc.jpg)](https://goopics.net/i/tmkxkc)


---

## Configuration générale

- Type : Yagi croisée VHF/UHF
- Polarisation : linéaire (rotation manuelle pour suivi satellite)
- Duplexeur : non utilisé
- Boom : isolant avec supports imprimés 3D
- Choke RF : 6 tours de RG58 sur le boom

---

## Dimensions des éléments

### VHF (2 m)

- Réflecteur : 102,3 cm (position 0)
- Radiateur : 94,6 cm (gap 9 mm)
- Espacement réflecteur → radiateur : 37,2 cm

### UHF (70 cm)

- Réflecteur : 32 cm  
  Distance au réflecteur VHF : 23 cm (centre à centre)

- Radiateur : 32,2 cm  
  Distance au réflecteur VHF : 40 cm (ajustée)

- Directeur : 29,8 cm  
  Position : 50 cm du réflecteur VHF (centre à centre)

---

## Performances estimées

Basé sur la géométrie DK7ZB :

### VHF (2 m)
- Gain estimé : ~6 à 7 dBi
- Largeur de lobe horizontal : ~70–80°
- Rapport avant/arrière : 10–15 dB typique

### UHF (70 cm)
- Gain estimé : ~7 à 8 dBi
- Lobe plus directif que VHF
- F/B ratio similaire ou légèrement supérieur

Ces valeurs sont théoriques et dépendantes de :
- L’environnement proche
- La précision des longueurs
- L’alignement mécanique
- L’accord réel mesuré

---

## Accord et mesures

- Accord VHF : excellent
- Accord UHF : bon, ROS perfectible

Mesures réalisées au VNA :

- Bande VHF centrée correctement
- Bande UHF légèrement décalée, optimisation possible via ajustement du radiateur

Le choke de 6 spires de RG58 permet de limiter les courants de gaine et stabilise le diagramme.

---

## Usage satellite

Cette antenne est particulièrement adaptée pour :

- SO-50
- AO-91
- ISS FM
- Autres satellites FM VHF/UHF

Avantages :

- Légère
- Transportable
- Éléments souples (résistent aux chocs)
- Pas de duplexeur nécessaire

Limites :

- Polarisation linéaire → pertes possibles si polarisation croisée
- Suivi manuel nécessaire
- Gain modéré comparé à une Yagi longue

---

## Améliorations possibles

- Ajouter un directeur UHF supplémentaire (si boom plus long)
- Optimiser l’accord UHF via réglage précis du radiateur
- Ajouter un duplexeur pour utilisation simultanée RX/TX
- Version croisée (X-Yagi) pour limiter pertes de polarisation
- Ajout d’un rotor azimut/élévation pour usage fixe

---

## Conclusion

Une solution simple, efficace et robuste pour trafic satellite portable.

Le compromis gain / simplicité est excellent pour du trafic FM.  
Pour trafic SSB ou faible élévation, une version plus directive pourrait être envisagée.
