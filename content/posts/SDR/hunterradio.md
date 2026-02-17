---
title: "Analog Radio Hunter : un scanner RF intelligent basé sur GNU Radio et Fosphor"
date: 2026-02-17
draft: false
author: "F4EGM"
tags: ["sdr", "rtl-sdr", "gnu-radio", "rf", "scanner", "airspy", "hackrf", "radioamateur"]

cover:
  image: "https://github.com/user-attachments/assets/0a663ac7-554d-47f3-940b-e5edb5e6b688"
---

# Analog Radio Hunter : un scanner RF nouvelle génération

M. Khanfar a récemment publié un nouveau logiciel gratuit nommé **Analog Radio Hunter**, décrit comme une application professionnelle d’analyse et de monitoring RF construite autour de **GNU Radio** et **Fosphor**.

🔗 Site officiel :  
https://khanfar-spectrum-analyzer.web.app/5.html  

Ce logiciel se distingue par une approche de scan radicalement différente des scanners traditionnels.

---

# Philosophie du logiciel

Analog Radio Hunter est conçu pour :

- Scanner de larges portions du spectre RF
- Détecter rapidement des signaux actifs
- Se verrouiller automatiquement sur les transmissions analogiques
- Démoduler en **NFM**, **AM** ou **WFM**

Contrairement aux scanners classiques qui balayent fréquence par fréquence (step scan), Analog Radio Hunter :

> Surveille un bloc complet de spectre simultanément et réagit aux pics détectés à l’intérieur de cette fenêtre d’échantillonnage.

C’est un changement fondamental dans la logique de détection.

---

# Interface et affichage temps réel

L’application propose :

- FFT temps réel
- Waterfall dynamique
- Curseur interactif
- Click-to-tune
- Zoom et pan glissant
- Lecture fréquence sous curseur
- Suivi automatique du pic (Peak-follow)

Capture d’écran officielle :

![Analog Radio Hunter GUI](https://khanfar-spectrum-analyzer.web.app/images/n1.webp)

L’interface repose sur **Fosphor**, connu pour ses visualisations GPU ultra fluides.

---

# Matériel compatible

Le logiciel supporte actuellement :

- **RTL-SDR** (multi-index)
- **Airspy**
- **HackRF**

Détection automatique au démarrage et changement de périphérique possible depuis l’interface.

Exemple de matériel compatible :

![RTL-SDR V4](https://www.rtl-sdr.com/wp-content/uploads/2023/05/RTLSDRBlog_V4_front.jpg)

Une simple clé RTL-SDR V4 suffit pour exploiter la majorité des fonctionnalités.

---

# Fonctionnalités principales (v1.01)

## Affichage et Scan

- FFT + waterfall temps réel
- Scan rapide avec dwell
- Pause automatique sur squelch
- Skip des canaux ignorés
- Filtrage de listes de fréquences
- Profils de scan sauvegardables
- Suivi automatique du signal le plus fort dans la fenêtre MS/s

---

## Détection intelligente

- Liste de détection avec horodatage
- Log d’événements
- Smart Deactivate double logique :
  - Règle temporelle
  - Règle taux d’occupation (busy rate)
- Cooldown automatique des favoris

---

## Audio et Démodulation

- NFM
- AM
- WFM (récepteur broadcast dédié)
- Dé-emphasis 50 µs / 75 µs
- Routage audio vers :
  - Haut-parleurs
  - VB-Cable
  - Périphérique USB
- Enregistrement audio automatique
- Nom de fichier avec fréquence + timestamp
- Bip sur canal favori

---

# Signal Stability Filter : fonctionnement détaillé

Un des éléments les plus intéressants est le **Signal Stability Filter**.

Objectif :

> Éviter les ouvertures/fermetures rapides de squelch dues au bruit ou aux impulsions parasites.

## Paramètres

**Min Open (ms)**  
Durée minimale pendant laquelle le squelch brut doit rester ouvert pour être considéré comme stable.

**Grace (ms)**  
Temps de maintien après fermeture pour éviter les micro-coupures.

## Cibles d’application

- Détection
- Enregistrement
- Maintien de scan
- Gate audio

## Valeurs recommandées

- Min Open : 150 à 250 ms
- Grace : 40 à 80 ms

Si appels courts manqués → réduire Min Open  
Si bavardage persiste → augmenter Grace

Ce système améliore considérablement la fiabilité en environnement RF réel.

---

# Capture IQ avancée

Fonction **Histogram IQ Rec** :

- Capture IQ en un clic
- Visualisation histogramme
- Mode follow et idle
- Intégration inspectrum

Idéal pour analyse postérieure ou investigation d’émissions suspectes.

---

# Calibration et terrain

## Auto Squelch Calibrate

- Mesure plancher de bruit
- Ajout d’une marge
- Configuration rapide en terrain

## Correction PPM RTL-SDR

Permet d’ajuster la dérive d’oscillateur des clés RTL.

---

# Différence majeure avec un scanner classique

## Scanner traditionnel :

- Se place sur une fréquence centrale
- Attend activité
- Passe à la suivante

## Analog Radio Hunter :

- Observe une bande large complète
- Détecte instantanément les pics
- Se cale sur le plus fort signal
- Réagit à l’intérieur de la fenêtre MS/s

C’est un moteur de chasse RF plus que du simple balayage.

---

# Capabilités à fort impact

- Moteur de scan réactif large bande
- Capture IQ instantanée
- Gestion intelligente des canaux occupés
- Configuration rapide terrain
- Routage audio flexible
- Heatmaps couleur GUI
- Mode Learning avec aide contextuelle
- Barre d’état métriques live :
  - Last
  - Active
  - Favorite
  - Peak SNR
  - Level

---

# Architecture logicielle

Le logiciel repose sur :

- GNU Radio (chaîne DSP)
- Fosphor (visualisation GPU)
- Intégration multi-SDR

Il est **gratuit mais non open source**.

⚠️ Certains antivirus peuvent le signaler par heuristique.  
Cela semble être un faux positif, mais prudence recommandée.

---

# Pour qui est ce logiciel ?

- Radioamateurs
- Monitoring VHF/UHF
- Écoute analogique
- Analyse terrain rapide
- Investigations RF
- Détection d’activité intermittente

---

# Conclusion

Analog Radio Hunter apporte une approche moderne et réactive du scanning RF, bien plus proche d’un analyseur dynamique que d’un scanner à pas discret.

Sa capacité à surveiller un large bloc spectral en permanence change radicalement la logique de détection, surtout avec des clés RTL-SDR abordables.

Pour qui pratique le monitoring analogique ou l’exploration VHF/UHF, c’est un outil à tester sérieusement.

---

73  
F4EGM
