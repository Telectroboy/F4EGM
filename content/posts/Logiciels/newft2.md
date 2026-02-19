---
title: "FT2 : analyse approfondie du nouveau mode numérique ultra-rapide"
date: 2026-02-19
draft: false
tags: ["FT2", "WSJT-X", "Modes numériques", "HF", "Contest", "Digital"]

cover:
  image: "https://github.com/user-attachments/assets/3b46d35f-ed52-47fa-b63a-0c9377d9750a"

---

# FT2 : un nouveau mode numérique qui intrigue la communauté

Depuis le 16 février 2026, un nouveau mode numérique baptisé **FT2** commence à apparaître dans les statistiques de PSKReporter ainsi que dans plusieurs discussions sur Reddit et sur DXZone, suscitant à la fois curiosité, enthousiasme technique et scepticisme parmi les opérateurs HF habitués aux modes FT8 et FT4.

FT2 est présenté comme un mode numérique **hautement expérimental**, basé sur un fork de WSJT-X, dont l’objectif est clair et assumé : **réduire drastiquement la durée d’un QSO numérique**, en compressant le cycle émission/réception à un niveau jamais atteint jusqu’à présent dans la famille des modes FT.

---

# Origine et contexte du projet

Selon les informations disponibles, FT2 serait développé par **IU8LMC**, avec le support de l’**ARI Caserta Team**, à partir d’un fork de **WSJT-X v3.0.0-rc1**, baptisé **Decodium 3 v3.0.0-rc1**.  

Il est important de préciser qu’il ne s’agit pas d’une version officielle de WSJT-X validée par l’équipe de développement historique (K1JT et collaborateurs), mais bien d’un projet indépendant qui explore les limites techniques de la compression temporelle.

D’après DXZone, les premiers tests on-air auraient eu lieu le **16 février 2026 à 22:47 UTC**, marquant le début d’une phase d’expérimentation en conditions réelles, hors laboratoire.

---

# Premiers essais en conditions réelles

Les stations suivantes sont mentionnées lors des premiers essais :

- IZ8VYF  
- IZ8XXE  
- IC8TEM  

Les bandes principalement utilisées pour ces tests ont été :

- 40 mètres  
- 80 mètres  

Durant ces essais, plusieurs dizaines de QSO auraient été complétés avec succès, avec une durée totale de contact comprise entre **7 et 11 secondes**, ce qui représente une rupture significative par rapport aux standards actuels.

À titre de comparaison :

| Mode | Durée du cycle | QSO complet typique | QSOs théoriques/heure |
|------|----------------|---------------------|-----------------------|
| FT8  | 15 s          | ~60 s               | ~60                   |
| FT4  | 7.5 s         | ~30 s               | ~120                  |
| FT2  | 3.8 s         | 7–11 s              | ~240                  |

En théorie, FT2 permettrait donc de multiplier par quatre le nombre de QSO par heure par rapport à FT8, ce qui ouvre des perspectives intéressantes pour les environnements à fort trafic.

![Comparaison](https://github.com/user-attachments/assets/063caf18-af5a-4ccd-8e80-7321d4a76045)

---

# Architecture technique : continuité et rupture

Sur le plan technique, FT2 conserve les fondations éprouvées des modes FT :

- Payload de **77 bits**
- Codage **LDPC (174,91)**
- Modulation **8-GFSK**
- Structure de message comparable à FT8 et FT4

La véritable innovation ne réside donc pas dans la structure logique du message, mais dans la **compression temporelle extrême** du cycle transmission/réception, qui est réduit à environ **3,75 à 3,8 secondes**.

Cette réduction drastique du temps de symbole entraîne mécaniquement une modification du compromis fondamental entre durée d’intégration, bande passante et sensibilité.

![WSJT-X](https://github.com/user-attachments/assets/493c34ba-439e-4971-acc7-bff6559d1c09)


---

# Bande passante et sensibilité : le compromis assumé

FT2 nécessite environ **150 Hz de bande passante**, contre 50 Hz pour FT8 et 83 Hz pour FT4. Cela signifie que chaque signal FT2 occupe environ trois fois l’espace spectral d’un signal FT8, ce qui peut devenir significatif sur des portions de bande étroites.

En contrepartie de cette augmentation de débit, la sensibilité observée lors des premiers essais se situe autour de **–12 à –14 dB**, ce qui reste performant mais sensiblement moins robuste que FT8, qui descend typiquement vers –20 / –21 dB.

Le compromis est donc clairement assumé : FT2 ne cherche pas à battre FT8 sur le terrain du weak-signal extrême, mais à optimiser le **débit de contacts lorsque les signaux sont déjà suffisamment forts**.

---

# Synchronisation : un point critique

La compression du cycle implique également une exigence accrue en matière de synchronisation d’horloge.  

Alors que FT8 tolère une erreur de l’ordre de ±200 ms, FT2 ne permettrait qu’une dérive d’environ **±50 ms**, ce qui impose une discipline NTP rigoureuse. Une horloge mal synchronisée pourrait empêcher totalement le décodage, le créneau temporel étant désormais beaucoup plus court.

---

# Fréquences de test actuellement observées

Les fréquences mentionnées pour l’activité FT2 sont :

- 160m : 1.843 MHz  
- 80m : 3.578 MHz  
- 60m : 5.360 MHz  
- 40m : 7.052 MHz  
- 30m : 10.144 MHz  
- 20m : 14.084 MHz  
- 17m : 18.108 MHz  
- 15m : 21.144 MHz  
- 12m : 24.923 MHz  
- 10m : 28.184 MHz  

Des spots FT2 commencent déjà à apparaître sur PSKReporter, signe que l’expérimentation dépasse désormais le cercle très restreint des premiers testeurs.

---

# Distribution et statut actuel

FT2 est actuellement en phase **alpha très limitée**, avec une diffusion contrôlée, notamment via un groupe WhatsApp privé, afin de centraliser les retours techniques pendant la phase de mise au point.

Le lien pour le téléchargement ou l’information est :

- https://hampass.com/ft2  

À ce stade, il ne s’agit pas d’un logiciel officiellement intégré aux dépôts publics classiques de WSJT-X.

---

# Réactions et débats sur Reddit

Sur r/amateurradio, les réactions sont contrastées.  

Certains saluent l’initiative et voient dans FT2 une évolution logique vers davantage d’efficacité en contest. D’autres s’interrogent sur l’intérêt réel d’un mode moins sensible, rappelant que beaucoup utilisent FT8 précisément parce qu’ils ne peuvent pas établir de contacts phonie dans des environnements bruités ou défavorables.

Un commentaire résume le compromis de manière concise : **trois fois plus de bande passante pour réduire la durée du QSO d’un facteur quatre, avec une perte de sensibilité d’environ 8 dB**.

Des discussions techniques ont également émergé autour du caractère non publié du protocole complet, certains faisant le parallèle avec VARA ou PACTOR, et rappelant la distinction fondamentale entre algorithme non documenté et chiffrement, en référence au principe de Kerckhoffs.

---

# Rôle de l’intelligence artificielle

Selon les informations disponibles, l’IA — notamment le modèle Claude d’Anthropic — aurait été utilisée comme outil d’assistance au développement pour modifier le code source WSJT-X et implémenter les ajustements nécessaires à la compression temporelle.

Il s’agirait d’un outil d’aide à la programmation et non d’un protocole généré automatiquement sans supervision humaine.

---

# Cas d’usage visé

FT2 semble clairement positionné pour :

- Contest numérique à haut débit  
- DXpeditions  
- Stations événementielles  
- Gestion rapide de pile-ups  
- Alternative moderne au RTTY en compétition  

Il ne vise pas à remplacer FT8 pour les conditions marginales, le QRP extrême ou les environnements à fort bruit local.

[WaterFall Simulation](https://github.com/user-attachments/assets/d6f76d14-9942-48ab-9059-bce542ce1c8a)


---

# Conclusion

FT2 représente une tentative audacieuse d’explorer les limites basses du cycle temporel dans la famille des modes FT, en conservant l’architecture éprouvée du payload 77 bits et du codage LDPC, tout en acceptant une réduction mesurée de la sensibilité au profit d’un débit nettement supérieur.

Reste désormais à observer si cette expérimentation restera un fork technique intéressant mais confidentiel, ou si elle influencera à terme l’évolution officielle des modes numériques WSJT-X.

---

# Sources

- Reddit r/amateurradio – discussion FT2  
- DXZone – FT2 experimental mode  
- https://hampass.com/ft2  
- https://en.wikipedia.org/wiki/Kerckhoffs's_principle  

---
