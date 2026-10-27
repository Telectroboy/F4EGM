---
title: "Suzuki Samurai 1.9 D : une panne d'injection Lucas EPIC causée par le capteur PMH"
date: 2026-10-27T21:30:00+01:00
draft: false
author: "F4EGM"
description: "Retour d'expérience sur un Suzuki Samurai 1.9 D F8Q de 2001 : absence de démarrage, pompe Lucas EPIC suspectée, puis réparation avec un capteur PMH VALEO 254017 à 16 €."
tags: ["Suzuki Samurai", "Renault F8Q", "Lucas EPIC", "capteur PMH", "injection diesel", "réparation"]
ShowToc: true
TocOpen: false
cover:
  image: "couverture-samurai-pmh.png"
  alt: "Schéma de principe : panne de démarrage du Suzuki Samurai 1.9 D et capteur PMH VALEO 254017"
  relative: true
---

Une panne de démarrage sur un **Suzuki Samurai 1.9 D de 2001**, équipé du moteur d'origine Renault **F8Q** et d'une pompe d'injection électronique **Lucas EPIC**, m'a d'abord orienté vers la pompe elle-même. Le gazole arrivait, mais je ne constatais pas de refoulement vers les injecteurs. Après plusieurs vérifications, le responsable s'est révélé être **le capteur de position du vilebrequin (PMH)**.

**Résultat :** un **VALEO 254017**, acheté **16 € sur Amazon**, remplacé en quelques minutes. Depuis son remplacement, le moteur fonctionne de nouveau.

## Le véhicule et la panne

| Élément | Identification |
|---|---|
| Véhicule | Suzuki Samurai 1.9 D, première mise en circulation le 23 juillet 2001 |
| Type | SJS04 |
| Moteur | Renault F8Q, référencé NF8Q dans certains catalogues de pièces Suzuki |
| Injection | Pompe électronique Lucas EPIC, référence relevée R8640A111B |
| Défaut | Arrêt / impossibilité de redémarrer, absence apparente de débit vers les injecteurs |
| Cause confirmée par la réparation | Capteur PMH défectueux |
| Réparation | Capteur VALEO 254017, 16 €, remplacement en quelques minutes |

![Suzuki Samurai de la même génération, photo illustrative d'un 1.9 TD de 2001](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Suzuki_Samurai_II_1.9_TD_2001_%2814574149333%29.jpg/960px-Suzuki_Samurai_II_1.9_TD_2001_%2814574149333%29.jpg)

*Photo d'illustration d'un autre Suzuki Samurai, version **1.9 TD** et non mon 1.9 D. Auteur : [order_242, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Suzuki_Samurai_II_1.9_TD_2001_(14574149333).jpg), licence [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). Image non retouchée.*

### Les symptômes observés

Le moteur ne redémarrait plus. Pourtant, l'alimentation en gazole et l'amorçage à la poire ne semblaient pas en cause. Les bougies de préchauffage avaient été contrôlées et l'antidémarrage paraissait fonctionner. En revanche, lors des essais, **le carburant ne semblait pas sortir de la pompe pour alimenter les injecteurs**.

À la mise du contact, j'entendais un petit « tic ». Je pensais à l'électrovanne d'arrêt de la pompe, mais je n'avais pas identifié avec certitude l'organe à l'origine de ce bruit. Il aurait été abusif d'en conclure que l'électrovanne était bonne ou mauvaise.

![Photographie d'un moteur Renault F8Q 1.9 diesel dans une Renault 19](https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Moteur_renault_19d.jpg/960px-Moteur_renault_19d.jpg)

*Photo d'illustration d'un F8Q monté dans une Renault 19 en 1992 ; ce n'est ni mon moteur photographié ni le montage de pompe du Samurai. Auteur : [Manuel Lasnier, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Moteur_renault_19d.jpg), licence [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/). Image non retouchée.*

## Pourquoi j'ai d'abord suspecté la pompe Lucas EPIC

Cette pompe ne se comporte pas comme une ancienne pompe diesel entièrement mécanique. Sur une Lucas EPIC, le calculateur pilote notamment le débit et l'avance au moyen d'électrovannes, en fonction des informations reçues de plusieurs capteurs.

J'avais donc exploré la piste d'un problème interne de pompe, notamment celle du **capteur de position du rotor / tiroir de débit**. J'avais déposé puis reposé mécaniquement le petit bloc maintenu par deux vis, sans toucher au noyau ni aux cales. Cette intervention n'a pas résolu la panne.

**À ne pas confondre :** le capteur de position interne de la Lucas EPIC et le **capteur PMH du moteur** sont deux organes différents. La documentation Renault indique que les capteurs internes de position des tiroirs nécessitent des opérations spécialisées de calibration. **Je déconseille donc d'ouvrir la pompe pour un non-démarrage avant d'avoir contrôlé le signal PMH.**

## Le rôle du capteur PMH dans l'injection

Le PMH est un capteur de régime et de position du vilebrequin. Son signal permet au calculateur de connaître la rotation du moteur et son repère angulaire. Sur cette génération d'injection électronique, une information de régime absente ou inexploitable peut perturber la commande d'injection.

![Schéma de principe du capteur PMH, du calculateur et de la pompe Lucas EPIC](chaine-pmh-injection.png)

*Schéma fonctionnel original. Il explique la relation entre les organes, mais ne représente pas le câblage réel du Samurai. L'absence de commande d'injection est une interprétation compatible avec les symptômes, pas une mesure électrique que j'aurais faite sur ce véhicule.*

![Capteur de vilebrequin inductif générique ouvert et représenté en coupe](https://upload.wikimedia.org/wikipedia/commons/7/7c/Crankshaft_sensor.png)

*Illustration générique d'un capteur inductif : (1) bobine, (2) noyau en fer doux, (3) aimant, (4) connexion électrique. Ce n'est **pas** une coupe du VALEO 254017. Auteur : [Tamasflex, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Crankshaft_sensor.png), licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Image non retouchée.*

## La pièce : VALEO 254017

![Photographie de la pièce VALEO 254017, capteur PMH deux broches avec bride métallique](https://media.pkwteile.de/360_photos/9386186/h-preview.jpg)

*Photographie commerciale du **VALEO 254017** diffusée sur [Piècesauto24](https://www.piecesauto24.com/valeo/9386186). Elle montre la référence de remplacement, pas le capteur que j'ai déposé. Image externe, propriété de son ayant droit ; autorisation de reproduction non vérifiée.*

J'ai retenu le **VALEO 254017**, annoncé compatible avec le Samurai 1.9 D / NF8Q dans les catalogues de pièces. Il se présente comme un capteur **inductif à deux voies**, avec prise ronde, sans câble intégré. La fiche commerciale indique une résistance nominale de **700 Ω**.

![Synthèse illustrée de la fiche technique du VALEO 254017](fiche-valeo-254017.png)

*Dessin original indicatif : pour voir la forme exacte de la pièce, consulter la [fiche produit VALEO 254017 chez Oscaro](https://www.oscaro.com/generateur-dimpulsions-vilebrequin-valeo-254017-9246948-833-p). La mention « 12 V » dans les catalogues correspond à l'application automobile ; **elle ne signifie pas qu'il faut alimenter directement les deux broches de ce capteur inductif en 12 V.***

Quelques références constructeur rapprochées du VALEO 254017 dans les catalogues : **Suzuki 33957-84A02-000**, **Renault 8201040861**. Ces équivalences servent à rechercher la pièce, mais ne remplacent pas la vérification du connecteur et du montage sur le véhicule concerné.

## Ce qu'apporte la documentation technique

J'ai retrouvé la **note technique Renault NT 3163A, janvier 1999**, relative au moteur **F8Q 622** équipé de la pompe **Lucas EPIC**. Ce document concerne une application Renault : il éclaire le fonctionnement de l'injection, **mais ne constitue pas le manuel d'atelier spécifique au Suzuki SJS04**.

Dans ce document :

- **Page 13-2 :** la résistance du capteur de régime est indiquée à **environ 650 Ω** pour cette application.
- **Pages 13-7 et 13-8 :** le capteur de régime / PMH est identifié séparément de la pompe d'injection EPIC.
- **Page 13-10 :** un défaut de capteur de régime figure parmi les anomalies susceptibles d'allumer le témoin d'injection.
- **Page 13-3 :** les capteurs de position internes des tiroirs de la pompe EPIC sont décrits comme des organes dont la position est calibrée avec un équipement spécialisé.

![Extraits documentaires sous forme de synthèse redessinée](synthese-documentation-f8q-valeo.png)

*Synthèse originale de deux sources : [NT Renault 3163A, moteur F8Q 622 / Lucas EPIC](https://pdfcoffee.com/3163a-particularites-moteur-f8q-622-pdf-free.html) et [fiche VALEO 254017](https://www.oscaro.com/generateur-dimpulsions-vilebrequin-valeo-254017-9246948-833-p). Les planches originales Renault ne sont pas reproduites.*

Il faut éviter de transformer ces **650 Ω** et **700 Ω** en un seuil universel de diagnostic. Le premier chiffre vient d'un document d'atelier pour une application F8Q précise ; le second est une caractéristique catalogue de la référence VALEO. **Je n'ai pas effectué de relevé comparatif publié de résistance sur mon ancien capteur et sur le nouveau.**

## Comment vérifier cette piste avant de démonter la pompe

Pour un véhicule présentant les mêmes symptômes, l'ordre de vérification le plus logique est le suivant :

1. Vérifier que le démarreur entraîne correctement le moteur, puis contrôler l'alimentation électrique générale et l'arrivée de gazole, sans intervenir sur les conduites haute pression moteur tournant.
2. Repérer le **capteur PMH près du volant moteur / de la jonction moteur-boîte**. Sa position exacte et l'accès peuvent varier selon le montage ; vérifier sur le véhicule avant toute dépose.
3. Contact coupé et capteur débranché, mesurer la résistance entre ses **deux broches**. Une coupure franche ou un court-circuit constituent des indices ; une valeur voisine de la nominale **ne prouve pas à elle seule que le capteur fonctionne au démarrage**.
4. Si le doute subsiste, contrôler le signal pendant l'entraînement au démarreur avec un oscilloscope adapté, ainsi que l'état du connecteur et du faisceau.
5. Ne s'intéresser aux organes internes de la Lucas EPIC qu'après avoir éliminé ces causes externes simples.

Je n'ai pas relevé ni conservé de valeur électrique de l'ancien capteur dans ce cas précis : **le diagnostic est confirmé ici par le retour au fonctionnement après remplacement**.

## Remplacement et résultat

J'ai commandé le **VALEO 254017 sur Amazon pour 16 €**. Le changement a pris **quelques minutes** et, une fois le capteur remplacé, **le moteur a de nouveau fonctionné**. Je n'ai eu à remplacer ni la pompe Lucas EPIC ni le calculateur d'injection.

Ce retour d'expérience est intéressant pour une raison précise : l'absence apparente de refoulement de gazole peut orienter à tort vers la pompe elle-même, alors que **l'information de régime moteur** fait partie des conditions nécessaires au fonctionnement de l'injection électronique.

**Conclusion :** sur un Samurai 1.9 D / F8Q avec Lucas EPIC qui refuse de démarrer, je commencerais par contrôler le capteur PMH et son faisceau **avant** d'envisager une réparation de pompe d'injection.

## Sources et crédits

- [Renault, NT 3163A (janvier 1999), F8Q 622 / Lucas EPIC](https://pdfcoffee.com/3163a-particularites-moteur-f8q-622-pdf-free.html), sections 13-2, 13-3, 13-7, 13-8 et 13-10. Document technique comparatif, reproduction des planches non autorisée sans accord.
- [VALEO 254017 : fiche technique chez Oscaro](https://www.oscaro.com/generateur-dimpulsions-vilebrequin-valeo-254017-9246948-833-p), technologie, connectique et résistance catalogue.
- [Catalogue Suzuki Samurai 1.9 D / NF8Q chez Piècesauto](https://www.piecesauto.fr/marque-automobile/pieces-detachees-suzuki/samurai-sj/25511/15032/capteur-pmh.html), plage d'application et référence de capteur.
- [Équivalences constructeur VALEO 254017 chez Motointegrator](https://www.motointegrator.fr/produits/1400974-capteur-de-vilebrequin-valeo-254017).
- Photos libres Wikimedia Commons : [Suzuki Samurai 1.9 TD 2001](https://commons.wikimedia.org/wiki/File:Suzuki_Samurai_II_1.9_TD_2001_(14574149333).jpg) (order_242, CC BY-SA 2.0), [moteur Renault F8Q](https://commons.wikimedia.org/wiki/File:Moteur_renault_19d.jpg) (Manuel Lasnier, CC BY-SA 2.5), et [coupe générique d'un capteur inductif](https://commons.wikimedia.org/wiki/File:Crankshaft_sensor.png) (Tamasflex, CC BY-SA 3.0).
- [Piècesauto24 : photographie commerciale du VALEO 254017](https://www.piecesauto24.com/valeo/9386186). La photographie est appelée depuis le serveur tiers, sans copie locale ; son autorisation de republication n'est pas établie.
- [Photographies de la pompe d'injection R8640A111B chez Eurofrance](https://eurofrance.cz/vstrikovaci-cerpadlo-delphi-r8640a111b-7700115073-epic-19d-f8q-renault.html) (illustration d'une pompe portant la même référence, sans copie des photos).
- Schémas et synthèses graphiques : illustrations originales réalisées pour cet article, **non assimilables à des extraits graphiques constructeur**.
