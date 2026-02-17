---
title: "Echo : un client iOS natif pour KiwiSDR, OpenWebRX et WebSDR"
date: 2026-02-17
draft: false
author: "F4EGM"
tags: ["ios", "kiwisdr", "openwebrx", "websdr", "rtl-sdr", "adrasec", "echo"]

cover:
  image: "https://github.com/user-attachments/assets/7034a6bd-1b71-469b-a4e6-f89b48896137"
---

# Echo : le récepteur radio universel pour iOS

Une nouvelle application attire fortement l’attention dans le monde du SDR accessible au grand public : **Echo**, un client iOS natif permettant d’accéder à plus de **2000 récepteurs SDR communautaires** répartis sur tous les continents.

🔗 Article RTL-SDR.com :  
https://www.rtl-sdr.com/echo-a-native-ios-client-for-kiwisdr-openwebrx/

L’application est actuellement en **beta via TestFlight**, et je fais partie de l’équipe qui la teste sous iOS.

![screenshot](https://github.com/user-attachments/assets/e59b3bbd-6eea-4bc5-8892-8143805da62a)

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
NEWS NEWS NEWS
---
## Mise à jour – 17 février 2026 – 15h39

Quelques minutes après la publication de cet article, une nouvelle version TestFlight a été publiée :

**Version 1.0.0 (Build 2)**

Cette mise à jour apporte plusieurs changements importants, dont un point majeur initialement prévu pour une version ultérieure.

---

### Audio en arrière-plan désormais disponible

~~Background Audio prévu dans une version ultérieure~~

L’audio en arrière-plan est désormais activé dès cette version beta.

Il est maintenant possible :

- de verrouiller l’écran,
- d’utiliser d’autres applications,
- de laisser l’iPhone en veille,

tout en conservant la lecture audio active depuis KiwiSDR, OpenWebRX, WebSDR ou FM-DX.

Pour un usage terrain (veille longue durée, supervision ADRASEC, monitoring HF ou VHF en mobilité), cela change complètement l’expérience utilisateur. L’application devient réellement exploitable en écoute continue.

---

### Correctif du mode silencieux (Silent Switch Fix)

Echo se comporte désormais comme une application média standard.

Même si le commutateur Sonnerie/Silencieux de l’iPhone est activé, l’audio continue de fonctionner correctement.

Cela corrige un comportement gênant qui pouvait faire croire à un dysfonctionnement lors d’une première utilisation.

---

### Amélioration de la fiabilité audio

Plusieurs corrections ont été apportées :

- suppression de coupures audio intermittentes,
- correction d’interruptions inattendues du flux,
- amélioration globale de la stabilité.

Les premiers tests montrent une meilleure continuité de lecture, notamment sur des sessions longues.

---

## Améliorations de la carte et des serveurs

### Correction des clusters sur la carte

Avant :  
> Cliquer sur un groupe de serveurs situés au même endroit ne produisait aucune action.

Désormais :  
Un appui sur un cluster ouvre une vue listant les serveurs disponibles à cet emplacement.

Cette correction améliore fortement l’ergonomie dans les zones à forte densité de récepteurs (États-Unis, Allemagne, Europe centrale, etc.).

---

### Cohérence visuelle

Correction d’une incohérence de couleurs entre :

- les pins affichées sur la carte,
- la légende correspondante.

Un détail, mais important pour la lisibilité.

---

### Toast de connexion enrichi

La notification « Connected » est désormais plus informative et propose une nouvelle option :

- ouverture directe de l’URL originale du serveur dans le navigateur.

Cela peut être utile pour :

- accéder aux extensions natives OpenWebRX ou KiwiSDR,
- comparer l’affichage Web et l’affichage Echo,
- diagnostiquer un comportement serveur.

---

### Vérification des serveurs personnalisés

Ajout d’un mécanisme de validation des URL lors de l’ajout d’un serveur personnalisé.

L’application vérifie désormais que l’URL correspond bien à un endpoint SDR valide avant de l’enregistrer.

Pour nous, dans le contexte des OpenWebRX utilisés à l’ADRASEC08, c’est particulièrement pertinent afin d’éviter les erreurs de configuration.

---

## Correctifs et améliorations d’interface

### Manual Tuner

Corrections :

- résolution du problème de taille de la fenêtre sur iPad,
- correction du comportement sur Mac Apple Silicon.

~~Fenêtre du tuner trop petite~~

Ajout :

- possibilité d’effacer l’historique des fréquences récemment utilisées.

---

### Gestion des favoris

Il est désormais possible d’ajouter un serveur en favori même lorsque l’on est déjà connecté à un autre serveur favori.

Ce changement simplifie la gestion rapide de plusieurs stations importantes en parallèle.

---

## Impact pratique pour nos usages ADRASEC

Avec cette mise à jour, Echo passe d’un client prometteur à un outil réellement exploitable sur le terrain.

Les points déterminants sont :

- audio en arrière-plan fonctionnel,
- stabilité améliorée,
- meilleure gestion cartographique,
- validation des serveurs personnalisés.

Dans un contexte de supervision mobile de nos OpenWebRX, notamment lors d’exercices ou d’activités terrain, cette évolution est significative.

Nous continuons les tests sous TestFlight et documenterons les retours d’expérience au fur et à mesure des prochaines versions.


73  
F4EGM
