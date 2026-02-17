---
title: "xSDR en crowdfunding : M.2 SDR 2x2 MIMO face au LibreSDR AD9363"
date: 2026-02-17
draft: false
author: "F4EGM"
tags: ["sdr", "xsdr", "waveletlab", "lms7002m", "ad9363", "gnuradio", "mimo", "rf"]

cover:
  image: "https://github.com/user-attachments/assets/957f49e7-be52-484f-abaa-49b19e561143"
  alt: "xSDR M.2 Software Defined Radio"
  caption: "Wavelet Lab xSDR – SDR au format M.2"
---

# xSDR : la campagne de financement est lancée

Wavelet Lab a lancé la campagne de financement participatif pour le **xSDR**, un SDR compact au format **M.2 2230 A+E Key**.

🔗 Campagne officielle :  
https://www.crowdsupply.com/wavelet-lab/xsdr  

Prix annoncé : **549 USD**  
Livraison estimée : **15 juillet 2026**

---

## Présentation technique

Le xSDR est un SDR simple face conçu pour une intégration directe dans :

- PC portables
- Tablettes compatibles
- SBC modernes
- Systèmes embarqués industriels

Caractéristiques principales :

- **2x2 MIMO RX/TX**
- Bande de fréquence : **30 MHz – 3.8 GHz**
- Jusqu’à **122.88 MSPS**
- FPGA intégré mis à jour
- Plateforme web wsdr.io pour applications RF en navigateur

Illustration du module :

![xSDR Module](https://www.crowdsupply.com/img/26b0/9b99dfa3-5409-44dc-b470-d52164bd26b0/xsdr-front-01_jpg_md-xl.jpg)
![Architecture](https://www.crowdsupply.com/img/fa7c/3d88e862-33aa-41a1-9de6-a15d76e7fa7c/xsdr-block-diagram.svg)

Il existe des cartes d'adaptation PCI vers M2 avec les ports SMA déjà prêt à etre branchés

![Carte PCI vers M2](https://www.crowdsupply.com/img/b575/e9343c69-e3c5-4db1-bd40-01f7d93fb575/m2-pcie-breakout-angle-01_jpg_md-xl.jpg)

---

# Architecture RF : LMS7002M

Le xSDR repose sur le **LMS7002M** (Lime Microsystems).

🔗 Fiche technique LMS7002M :  
https://limemicro.com/products/lms7002m/



### Points clés du LMS7002M

- Transceiver 2x2 MIMO complet
- 30 MHz – 3.8 GHz
- Large bande instantanée (~100 MHz selon configuration)
- ADC/DAC 12 bits
- TX typique : ~+10 dBm
- Architecture très configurable

Le LMS7002M équipe également les cartes LimeSDR.

---

# Comparaison avec l’AD9363 (LibreSDR)

Le **LibreSDR** basé sur **AD9363** est disponible autour de **130 €**.

Illustration type LibreSDR :

![LibreSDR AD9363](https://rf-market.fr/6285-large_default/libresdr-adi-pluto-ad9363-70mhz-6ghz.jpg)


🔗 Documentation AD9363 :  
https://www.analog.com/en/products/ad9363.html

---

## AD9363 – Caractéristiques principales

- 2x2 MIMO RX/TX
- 325 MHz – 3.8 GHz
- Bande passante ~20 MHz (officiel)
- ADC/DAC 12 bits
- TX typique : ~+7 à +8 dBm
- Très stable côté drivers (libiio)

---

# Différences majeures

| Élément | xSDR (LMS7002M) | LibreSDR (AD9363) |
|----------|----------------|-------------------|
| Prix | ~549 USD | ~130 € |
| Format | M.2 interne | Ethernet externe |
| Bande basse | 30 MHz | 70 MHz |
| Bande passante | Large (~100 MHz possible) | ~20 MHz |
| Connectivité | PCIe via M.2 | Ethernet |
| Usage typique | Intégration embarquée | Banc RF / station distante |

---

# Connectivité : M.2 vs Ethernet

## xSDR (M.2)

- Intégration directe
- Latence minimale
- Idéal pour systèmes embarqués
- Aucun câble externe

## LibreSDR (Ethernet)

- Déployable à distance
- Isolation RF plus simple
- Compatible réseau natif
- Flexible en station distante

---

# GNU Radio et écosystème logiciel

Les deux solutions sont compatibles avec :

- GNU Radio  
  https://www.gnuradio.org/
- SDRangel
- SoapySDR
- Applications personnalisées

Le LMS7002M s’appuie sur **LimeSuite**.  
L’AD9363 s’appuie sur **libiio** (Analog Devices).

En pratique :

- AD9363 : très stable et robuste
- LMS7002M : plus flexible, plus configurable

---

# Sensibilité et performances RF

Les deux utilisent des convertisseurs 12 bits.

La performance réelle dépend :

- Du filtrage analogique
- De l’implémentation PCB
- De l’alimentation
- De la calibration

En général :

- Sensibilité RX comparable
- LMS7002M offre plus de bande instantanée
- AD9363 très propre en implémentation RF

---

# Philosophie produit

## LibreSDR (~130 €)

- Excellent rapport qualité/prix
- Ethernet pratique
- Idéal labo, QO-100, expérimentation

## xSDR (~549 USD)

- Intégration embarquée moderne
- Large bande instantanée
- Format industriel compact

Ce ne sont pas des concurrents directs mais deux approches différentes du SDR 2x2 MIMO.

---

# Conclusion

L’arrivée du xSDR au format **M.2 natif** est une évolution intéressante pour :

- RF embarqué
- Recherche sans fil
- Prototypage rapide
- Applications intégrées compactes

Le LibreSDR AD9363 reste cependant une référence en termes de coût/performance.

Le choix dépendra donc :

- du budget
- du besoin en bande passante
- de l’intégration système
- de l’architecture cible

---
73 F4EGM
