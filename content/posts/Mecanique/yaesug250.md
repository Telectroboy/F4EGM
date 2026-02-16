---
date: '2026-02-15T12:53:16+01:00'
draft: false
title: "Réparation d'un rotor Yaesu G-250"

cover:
  image: "https://github.com/user-attachments/assets/d5002517-ff79-454f-80e7-98196e3275a0"

---
## Restauration d’un rotor G-250 – Reconstruction mécanique en impression 3D

Il y a environ 25 ans, ce rotor était installé en haut d’une barre d’acier pleine, supportant une antenne delta loop 3 éléments.  
La coquille supérieure avait cédé sous l’effet du vent.

Je ne l’ai jamais jeté.

![Rotor G-250](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNb25fyCdWll1dpLsw-DYyE1ArF33L1Uc-g&s)

## Documentation technique

Un document PDF très détaillé permet d’accéder aux vues éclatées complètes :

https://pierreprovot.wordpress.com/wp-content/uploads/2010/03/rotor-g-250.pdf

### Vue éclatée de la mécanique

![Vue éclatée](https://i.servimg.com/u/f52/11/30/17/07/g25010.jpg)

J’avais refait une coque sur un tour il y a longtemps… au point d’avoir oublié l’opération.

Il manque aujourd’hui le pignon **n°10**.

![Pignon manquant](https://i.servimg.com/u/f52/11/30/17/07/captur13.jpg)

Heureusement, la nomenclature est complète dans la documentation mais erronnée!!! 
Il faut utiliser le module de 1.25mm pour le pignon de 18 dents !

[![Image](https://i.goopics.net/10sy3h.jpg)](https://goopics.net/i/10sy3h)



## Reconstruction 3D

Objectif : reconstruire les pièces manquantes en **ASA** via modélisation 3D.

Outil utilisé : **OnShape**

Modèle :
https://cad.onshape.com/documents/97c102a7b2e5f75d46d869f3/w/27f4efea2ddeb4f046fe72d2/e/de5d6509641b21301f6501a4

![Modélisation 3D](https://i.goopics.net/ykmivm.jpg)

Un fournisseur potentiel de pièces d’origine :
https://stecker-shop.net/epages/27edac8b-bca1-4619-a0d8-f53e62f2ef2c.mobile/de_DE/?ObjectPath=/Shops/27edac8b-bca1-4619-a0d8-f53e62f2ef2c/Categories/Produkte/9/103/108/229

---

## Analyse matériau

### Acier S235

Acier de construction non allié (EN 10025)

- Limite d’élasticité minimale : 235 MPa (faible épaisseur)
- Acier doux (~0,17 % carbone typique)
- Ancienne désignation : E24
- Proche d’un A36 (US), sans être strictement équivalent

### ASA (impression 3D)

Propriétés typiques :

- Résistance traction : ~35–50 MPa
- Module d’élasticité : ~1,8–2,2 GPa
- Bonne tenue UV
- Température de ramollissement : ~95–105°C
- Sensible au fluage sous charge

---

## Application : roue dentée dans un rotor G-250

Points critiques identifiés :

- Usure des dents
- Écrasement au pied de dent
- Augmentation progressive du jeu
- Déformation sous couple important

L’ASA devrait tenir quelques années en usage modéré, mais il faudra surveiller :

- Le couple appliqué
- La vitesse de rotation
- Les charges dynamiques liées au vent

Une version renforcée (infill élevé, orientation des couches optimisée, éventuellement insert métallique) pourrait améliorer la durabilité.

---

La suite consistera à valider les dimensions du pignon n°10, vérifier le module, le nombre de dents et le jeu fonctionnel avant impression.
