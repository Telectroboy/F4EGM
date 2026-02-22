---
title: "Analyse technique – Roulements et balais sur les moteurs EESM Renault : retour d’expérience et problématiques de conception"
date: 2026-02-22
author: F4EGM
draft: false
tags: [Renault, EESM, moteur électrique, reverse engineering, roulements, Zoe, Megane E-Tech]

cover:
  image:
---

# Analyse technique – Roulements et balais sur les moteurs EESM Renault

Ces derniers jours, une discussion animée a émergé suite à une publication de **EV Clinic** concernant des problèmes de roulements et de balais sur le moteur de la Renault Megane E-Tech.

Ayant réalisé il y a deux ans le reverse engineering complet des moteurs de Renault Zoe, je souhaite apporter ici une analyse technique structurée, basée sur des faits observés, mes propres travaux, et l’expérience terrain.

![moteur](https://github.com/user-attachments/assets/3cb6a5cb-b527-4f1e-a7e7-e30797de8638)

---

# 1. Retour d’expérience : Reverse engineering des moteurs Zoe

En 2024, j’ai entrepris le démontage complet et l’analyse détaillée des moteurs 5AQ601 équipant les Renault Zoe.
![ensemble](https://github.com/user-attachments/assets/9c44e86b-3ae8-4436-965c-ebc6d9493e8f)
Sur cette vue vous pouvez apercevoir tout à droite que le résolveur est toujours du même type.

Objectifs :
- Comprendre l’architecture interne
- Identifier les causes de défaillance récurrentes
- Évaluer la réparabilité réelle car j'avais une voiture en panne.
- Trouver des références de pièces standards

Le principal point faible identifié était les roulements rotor.

Après analyse dimensionnelle et caractérisation :
- Identification des équivalents industriels
- Mise en place de références alternatives
- Développement des kits devenus ensuite connus sous :
  - **EVB355.00**
  - **EVB355.01**

Ces solutions couvrent l’ensemble des moteurs **5AQ601**.

Conclusion à l’époque :

> Oui, les moteurs électriques sont réparables.
> Non, ils ne sont pas jetables par nature.
> Le problème vient des choix constructeur.

---

# 2. Architecture EESM : rappel technique

Les moteurs Renault sont de type **EESM (Electrically Excited Synchronous Motor)** :

- Rotor bobiné (pas d’aimants permanents)
- Slip rings + balais pour excitation
- Avantage : champ rotor pilotable
- Inconvénient : présence de pièces d’usure

Comparé à un PMSM :

| EESM | PMSM |
|------|------|
| Pas d’aimants | Aimants permanents |
| Rotor excité | Rotor passif |
| Balais présents | Aucun contact rotor |
| Théoriquement plus durable | Moins de pièces d’usure |

Sur le papier, l’EESM est une solution élégante.

Dans la pratique, tout dépend du design mécanique.

---

# 3. Nouvelle génération : Megane E-Tech

Les informations actuellement discutées concernent le moteur de la Renault Megane E-Tech.

![roule2](https://github.com/user-attachments/assets/b6da9917-0033-4ca9-9658-1f367f6027e3)
Vue du roulement le plus critique.

Points évoqués :

- Roulements spécifiques non disponibles hors OEM FAG HSMB F-634180.02.KL
- Double circuit d’huile
- Pompe dédiée uniquement aux roulements rotor
- Injecteurs ciblant les paliers
- Slip rings de qualité discutable
- Usure prématurée des balais

## 3.1 Double circuit d’huile

Contrairement à la Zoe :

- Le réducteur possède son propre bain d’huile
- Le moteur dispose d’un carter séparé
- Pompe électrique pour pulvérisation sur roulements rotor

Problème potentiel :

> Si la lubrification dépend d’un système actif, toute défaillance accélère l’usure.

C’est une complexification inutile sur un organe qui pourrait fonctionner en bain simple.

![oxyd](https://github.com/user-attachments/assets/714fd61c-bd73-4d05-9b26-28af4551cde8)
Sur cette photo on peut détecter que l'axe comporte déjà des traces d'oxydation.
Cela va, comme sur les zoés, empécher le déplacement du roulement arrière dans son logement pour compenser l'élongation du rotor pendant l'échauffement.

![rondelle](https://github.com/user-attachments/assets/83e55411-81c1-438b-ace8-8422cfa3fc5e)
On peut identifier ici qu'ils ont utilisé la m$eme technique avec cette rondelle de compression permettant au rotor de revenir en place.


---

# 4. Problématique roulements

Un roulement rotor subit :

- Charge radiale permanente
- Contraintes dynamiques élevées (ABS / traction control)
- Variation thermique importante
- Inertie rotor élevée

Si :

- Le roulement est spécifique OEM
- Non référencé chez les fabricants standards
- Ou monté avec tolérances particulières

Alors la réparabilité chute drastiquement.

C’est exactement le type de situation que j’avais rencontrée sur les Zoés avant identification des équivalents industriels remplacés ensuite par EVB355.00 et EVB355.01 marque NTN

![roule](https://github.com/user-attachments/assets/f3a2a36e-17ac-4c20-aeb3-b301d09ab463)
Voici une photo de l'horrible roulement monté dans ces moteurs!!! 
Ca se passe de commentaire.

---

# 5. Usure des balais et bagues collectrices
![bague](https://github.com/user-attachments/assets/39fb31dd-4a22-4ab4-adf3-9d6d657732d1)
![brush](https://github.com/user-attachments/assets/bdb3bbd6-fa70-4fc0-97c0-580b3327294a)

Les EESM imposent :

- Contact permanent balai / slip ring
- Frottement mécanique
- Micro-arcs possibles
- Sensibilité à la qualité de surface

Une mauvaise qualité de bague peut entraîner :

- Dégradation accélérée des balais
- Pollution carbone interne
- Défauts d’isolement
- Arrêts système HV

Sur la Zoe, un panneau d’accès permettait inspection et remplacement.
Après démontage intégral du moteur uniquement !!! Il faut donc y passer des heures... Très mauvais choix.

La question technique cruciale :

> Le nouveau moteur conserve-t-il cette maintenabilité ?

---

# 6. Réparabilité des moteurs électriques : réalité vs marketing

Contrairement à une idée reçue :

> Un moteur électrique est mécaniquement simple et très réparable.

Les véritables causes d’irréparabilité sont :

- Roulements non standards
- Pièces internes non détaillées
- Assemblages collés ou sertis
- Absence de documentation
- Politique constructeur

Le moteur électrique en lui-même n’est pas le problème.

Le problème vient des choix industriels.

---

# 7. Renault et les choix discutables

Historiquement, Renault a fait des choix techniques audacieux.

Mais parfois discutables :

- Complexification inutile
- Intégration excessive
- Spécificités propriétaires
- Difficulté d’accès aux pièces

La Zoé était déjà perfectible.
Si la Megane introduit :

- Plus de complexité
- Plus de dépendance OEM
- Moins d’accessibilité

Alors on régresse en maintenabilité.

---

# 8. Conclusion technique

À ce stade :

- Quelques cas documentés
- Pas de campagne officielle
- Retours terrain contradictoires

Mais plusieurs signaux techniques méritent attention :

1. Roulements spécifiques
2. Lubrification active dédiée
3. Slip rings sensibles
4. Usure balais

Mon expérience sur les moteurs Zoé montre qu’il est possible de :

- Identifier les références industrielles
- Requalifier les roulements
- Restaurer la réparabilité
- Identifier les nouvelles pannes
  => Décalage du résolveur
  => Rupture des soudures des enroulements du rotot.

Reste à voir si la nouvelle génération permettra le même travail.
Mais ça semble déjà fortement compromis!!!
---

# Position personnelle

La réparabilité des moteurs électriques est **bonne par conception**.
Mais certaines marques – et Renault en particulier sur ces générations – prennent parfois les pires décisions en matière :
- De standardisation
- De maintenance
- De durabilité long terme

Un moteur électrique n’est pas un consommable.

Il le devient quand on le conçoit comme tel.

Je n'ai pas exploré l'éléctronique mais il semblerait qu'il y a à faire!
![Electronique](https://github.com/user-attachments/assets/14639943-e1e5-45db-aaef-44a7d32e9165)


---

F4EGM  

Analyse technique indépendante
