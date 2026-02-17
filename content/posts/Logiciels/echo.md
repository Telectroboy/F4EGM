---
title: "Echo : un client iOS natif pour KiwiSDR, OpenWebRX et WebSDR"
date: 2026-02-17
draft: true
author: "F4EGM"
tags: ["ios", "kiwisdr", "openwebrx", "websdr", "rtl-sdr", "adrasec", "echo"]

cover:
  image: "https://github.com/user-attachments/assets/e59b3bbd-6eea-4bc5-8892-8143805da62a"

---

# Echo : le récepteur radio universel pour iOS

Une nouvelle application attire fortement l’attention dans le monde du SDR accessible au grand public : **Echo**, un client iOS natif permettant d’accéder à plus de **2000 récepteurs SDR communautaires** répartis sur tous les continents.

🔗 Article RTL-SDR.com :  
https://www.rtl-sdr.com/echo-a-native-ios-client-for-kiwisdr-openwebrx/

L’application est actuellement en **beta via TestFlight**, et je fais partie de l’équipe qui la teste sous iOS.

Dans notre contexte ADRASEC08, cela pourrait devenir un outil extrêmement intéressant pour exploiter nos serveurs **OpenWebRX** sur le terrain.

---

# Le concept

Echo se présente comme :

> *The universal radio receiver for iOS.*

Concrètement, l’application permet d’accéder de manière native aux réseaux :

- KiwiSDR  
- OpenWebRX  
- WebSDR  
- FM-DX  

Contrairement à un simple navigateur web, Echo encapsule les flux dans une application iOS native écrite en **SwiftUI**, ce qui permet des fonctionnalités impossibles à obtenir via Safari seul.

---

# Ce que permet Echo

Avec un simple iPhone :

- Écoute des bandes HF mondiales  
- Aviation transatlantique  
- Stations FM lointaines (FM-DX)  
- Réseaux VHF/UHF  
- Numéros stations  
- Récepteurs distants partout dans le monde  

Le tout avec une interface optimisée tactile.

---

# Interface et ergonomie

## Vue principale

![Interface Echo](https://www.rtl-sdr.com/wp-content/uploads/2026/01/echo_ios_app.png)

L’interface combine :

- Waterfall temps réel
- FFT
- Contrôles de tuning
- Gestion des profils serveur
- Scanner intégré

Le moteur audio repose sur le client web officiel des serveurs (Kiwi/OpenWebRX/etc.), garantissant **100% de compatibilité avec les extensions et décodeurs existants**.

---

## Carte mondiale intégrée

![Carte Echo](https://private-user-images.githubusercontent.com/254171883/543474183-d80ed25f-76d6-45ba-9869-c0db3cb7646e.PNG)

Grâce à l’intégration **MapKit native**, il est possible de :

- Explorer visuellement les récepteurs
- Filtrer par réseau (Kiwi, OpenWebRX, WebSDR, FM-DX)
- Filtrer par région (ex : USA uniquement)
- Identifier rapidement les stations les plus performantes

---

# Fonctionnalités techniques intéressantes

## 1️⃣ Audio en arrière-plan

L’application maintient :

- La connexion
- Le décodage
- L’audio

Même écran verrouillé ou en multitâche.

Pour un usage terrain ou ADRASEC, c’est un point majeur.

---

## 2️⃣ Smart Manual Tuner

Saisie intelligente :

- "101.1" → FM
- "15000" → 15 MHz
- Pas besoin de basculer kHz/MHz

Un détail ergonomique, mais extrêmement efficace en usage mobile.

---

## 3️⃣ Scan intelligent

Mode scanner configurable :

- Liste de fréquences
- Pause sur squelch
- Cycle automatique

Intéressant pour surveillance VHF ou HF.

---

## 4️⃣ Métriques temps réel

Tri des serveurs par :

- SNR
- Niveau signal
- Réactivité

Cela permet de choisir immédiatement le meilleur récepteur distant.

---

## 5️⃣ Base de données locale

- 10 000+ fréquences intégrées
- Logs personnels
- Favoris sauvegardés localement

Aucune dépendance cloud externe.

---

# Implémentation technique

- Interface : **100% SwiftUI natif**
- Base de données locale
- Aucun tracking
- Aucun serveur propriétaire
- Données stockées localement ou dans iCloud personnel chiffré

Cela rassure énormément côté sécurité.

---

# Pour nos OpenWebRX ADRASEC08

Dans notre configuration :

- Serveurs OpenWebRX exposés
- Utilisation en mobilité
- Besoin d’accès rapide
- Consultation terrain

Echo pourrait :

- Simplifier l’accès mobile
- Éviter les problèmes Safari
- Maintenir l’audio en arrière-plan
- Offrir un scanner pratique

L’ajout de serveurs privés est possible :

> Sélection du type (OpenWebRX)
> Saisie de l’URL
> Connexion immédiate

---

# Ce qui arrive bientôt

Roadmap annoncée :

- 🎙 Smart Interpreter (speech-to-text + traduction temps réel)
- 🎧 Smart Recording avec transcription automatique
- Capture IQ simplifiée
- Automatisation des logs

Si cela fonctionne correctement, cela pourrait transformer l’usage mobile du SDR.

---

# Compatibilité

- iOS 17+
- iPhone
- iPad
- macOS Apple Silicon

---

# Statut actuel

- Version : Beta
- Distribution : TestFlight
- Développement actif

---

# Conclusion

Echo ne remplace pas OpenWebRX ou KiwiSDR.

Il agit comme une **surcouche mobile intelligente**.

Pour un radioamateur, un DXer, un passionné HF, ou une structure comme l’ADRASEC :

- Accès mondial instantané
- Interface optimisée mobile
- Scanner intégré
- Zéro tracking

L’application mérite clairement d’être suivie.

Je continue les tests sous iOS et publierai un retour plus technique après plusieurs semaines d’usage réel.

---

73  
F4EGM
