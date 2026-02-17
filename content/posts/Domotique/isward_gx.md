---
title: "ISWARD GX : Reverse Engineering et amélioration complète"
date: 2026-02-17
description: "Analyse complète de la tondeuse autonome ISWARD GX : hardware, firmware, ROS, modifications matérielles et conseils pratiques."
tags: ["ISWARD GX", "Jetson Nano", "AI Vision", "CAD", "Hardware", "Tondeuse autonome", "ROS", "Maintenance"]
draft: false
---

# ISWARD-GX : Reverse Engineering et améliorations complètes

<img width="253" height="199" alt="ISWARD GX" src="https://github.com/user-attachments/assets/3e77a95c-205e-45f0-8980-3dda9b150b8c" />

Je travaille sur la tondeuse autonome **ISWARD GX** dans une démarche de **reverse engineering**. L’objectif est de comprendre le système complet, d’optimiser le matériel et le logiciel, et d’améliorer la fiabilité globale.  

> **Ressource :** Le [dépôt GitHub du projet](https://github.com/Telectroboy/ISWARD-GX-Reverse-Engineering/tree/main/isward#readme) contient **des informations très détaillées sur le firmware, les programmes internes, les scripts ROS et la configuration logicielle complète**.

---

## Tableau résumé du hardware

| Composant | Description | Lien / Référence | Remarques / Alternative |
|-----------|-------------|-----------------|------------------------|
| CPU / Module | NVIDIA Jetson Nano P3448 (B1) | N/A | Version P3448 180-13448-DAAA-B01 |
| Baseboard | Jetson Nano Baseboard | N/A | Nécessaire pour SD card et alimentation complète |
| Carte SD | Adaptateur MicroSD 8 positions | [Farnell 503398-1892](https://fr.farnell.com/molex/503398-1892/connecteur-micro-sd-8pos/dp/2358234) | Pour backup / debug logiciel |
| Vision AI | Capteur ORBBEC 3D | [Aliexpress ORBBEC](https://fr.aliexpress.com/item/1005005544562491.html?spm=a2g0o.tesla.0.0.6bf1NhdvNhdvXI) | Compatible ROS pour navigation autonome |
| Roue | Paramétrique, 38 mm | [Onshape](https://cad.onshape.com/documents/20d94f306f5c584790ff835d/w/884df90600dd95c4d52414f8/e/e5c085e7d50f915a7c68e0e0?renderMode=0&uiState=69077b2bbb6db5b6a7837623) | Impression 3D ou fabrication mécanique |
| Ventilateur | DC 4010 24V double roulement | [Aliexpress DC 4010](https://fr.aliexpress.com/item/1005010112785292.html?spm=a2g0o.order_detail.order_detail_item.2.ec807d56JlMA3H) | Remplacement du ventilateur d’origine, beaucoup plus silencieux |
| Certification | FCC ID 2BEYJ-ISWARD001 | [FCC Report](https://fcc.report/FCC-ID/2BEYJ-ISWARD001) | Conforme normes radiocommunication |

> **Note :** Ce tableau permet de rapidement identifier les composants critiques pour maintenance ou upgrades.

---

## Refonte de la roue

La roue originale a été remplacée par une version **38 mm paramétrique**, facile à adapter. Elle peut être imprimée en **3D** ou fabriquée autrement.

<img width="253" height="250" alt="Roue paramétrique ISWARD GX" src="https://github.com/user-attachments/assets/c37feb1b-4303-4921-9250-c08fcda7b3ff" />
<img width="300" height="300" alt="Roue ISWARD GX vue" src="https://github.com/user-attachments/assets/94806798-2ad2-40fd-9a71-2fe2f7339b90" />
<img width="442" height="360" alt="Roue ISWARD GX CAD" src="https://github.com/user-attachments/assets/c9a4c2b6-a2eb-4a21-8291-4eaf1910e8a6" />

> **Alerte pratique :** Vérifier la fixation et l’alignement des roues pour éviter l’usure prématurée ou la dérive de trajectoire.

---

## Jetson Nano et système embarqué

- Module principal : **Jetson Nano P3448 (B1)**  
- OS : **Ubuntu 20.04.6 LTS**, kernel 4.9.337-tegra aarch64  
- Accès système :  

Login : isward
Password : isward

- Le système est minimalisé mais **extensible via apt**.  
- Possibilité d’ajouter une carte SD pour sauvegarde ou récupération logicielle.  

🔗 [Documentation ROS et Ubuntu Jetson](https://charon-cheung.github.io/2023/12/20/ROS/ROS%20Kinetic%E7%9F%A5%E8%AF%86/ROS%E7%BC%96%E8%AF%91%E5%92%8C%E8%BF%90%E8%A1%8C%E7%9A%84%E9%97%AE%E9%A2%98/#%E8%BF%90%E8%A1%8C%E6%97%B6%E8%8A%82%E7%82%B9%E5%87%BA%E7%8E%B0%E6%8A%A5%E9%94%99)

> **Note technique :** La carte SD permet de cloner ou restaurer le système, idéal pour expérimentations sans risquer l’eMMC interne.

---

### ROS : Robot Operating System

La tondeuse utilise **ROS** pour la navigation, le contrôle des moteurs et la lecture des capteurs.  

Exemples de topics ROS essentiels :  

/Mapping
/chassis/batteries
/chassis/fault
/chassis/gnss
/chassis/imu
/cmd_vel
/collision
/depth/scan
/move_base/recovery_status
/navi/cmd/goal
/robot_walk_path
/tf
/tf_static


> **Alerte pratique :** Étudier ces topics permet de comprendre **le comportement interne, la navigation et la gestion des obstacles**.

---

## Capteur AI Vision

L’ISWARD GX utilise un capteur **ORBBEC** pour la vision 3D et la navigation autonome. Compatible ROS, il gère reconnaissance d’objets et cartographie en temps réel.

<img width="400" height="641" alt="Capteur ORBBEC ISWARD GX" src="https://github.com/user-attachments/assets/deed0f72-5783-4a03-a669-ff73b80670d0" />

> **Ressource :** Vérifier régulièrement le firmware du capteur pour compatibilité avec ROS.

---

## Ventilateur : maintenance critique

Le ventilateur d’origine était **bruyant et peu fiable**, provoquant surchauffe du Jetson Nano.  

✅ J’ai remplacé le ventilateur par un **DC 4010 24V double roulement à billes** : résultat **immédiat**, plus silencieux et durable.

<img width="300" height="250" alt="Ventilateur DC 4010" src="https://github.com/user-attachments/assets/6840c778-7cc5-4f62-afa7-2202f49e4b71" />

> **Alerte maintenance :** Toujours surveiller la température du Jetson Nano après modification ou upgrade du ventilateur.

---

## Certification FCC

Le modèle est certifié **FCC** :  

🔗 [FCC ID 2BEYJ-ISWARD001](https://fcc.report/FCC-ID/2BEYJ-ISWARD001)  

> **Note pratique :** Certification utile pour conformité légale lors de modifications radio ou ajout d’antennes.

---

## Conseils pratiques pour le projet

1. **Remplacer le ventilateur** dès que possible pour protéger le Jetson Nano.  
2. Conserver une **copie du firmware et scripts ROS** du GitHub.  
3. Vérifier régulièrement l’état des batteries et capteurs via `/chassis/*`.  
4. Tester les modifications de roues ou moteurs en environnement sécurisé.  
5. Utiliser la carte SD pour **backups ou expérimentations** sans risquer le système principal.  
6. Documenter chaque modification pour suivi et maintenance.

---

## Prochaines étapes

- Exploiter pleinement les **topics ROS** pour créer des améliorations logicielles.  
- Étudier le firmware pour comprendre **le comportement interne et les routines de navigation**.  
- Développer des **scripts d’automatisation et de sécurité**.  
- Optimiser roues, ventilateur et autres composants pour **fiabiliser le robot**.  
- Partager des tutoriels et retours d’expérience pour la communauté.

---

**Résumé technique :**

- Tout le projet est documenté sur GitHub pour suivi et contributions.  
- Tableau hardware fourni pour maintenance rapide et upgrades.  
- ROS fournit la structure complète des commandes et capteurs.  
- Jetson Nano est extensible via SD card pour backup et debug.  
- Ventilateur remplacé pour fiabilité et silence.
