---
title: "Résistances et bruit en radioamateur : comprendre le bruit thermique et le bruit 1/f pour concevoir des étages réellement silencieux"
date: 2026-02-22
author: "F4EGM"
tags: ["radioamateur", "RF", "bruit", "électronique", "LNA", "conception"]
categories: ["Technique"]

cover:
  image: "https://github.com/user-attachments/assets/fe88ffe2-e539-446f-aca1-4dafd1a06fb0"
---

# Résistances et bruit en radioamateur : comprendre le bruit thermique et le bruit 1/f pour concevoir des étages réellement silencieux

Dans nos schémas radioamateurs, la résistance est probablement le composant le plus banal. Nous choisissons une valeur, une tolérance, une puissance, éventuellement un boîtier… et nous passons à autre chose. Pourtant, derrière ce symbole anodin se cachent des mécanismes physiques capables de dégrader significativement la sensibilité d’un récepteur, le bruit d’un préamplificateur ou la pureté d’un étage BF.

Une excellente vidéo de **Hans Rosenberg** intitulée *Quieting Noisy Resistors* (https://www.youtube.com/watch?v=omn_Lh0MLA4&t=1s) rappelle qu’une simple erreur de technologie de résistance peut conduire à des semaines, voire des mois de recherche de panne. En parallèle, les mesures détaillées publiées par **:contentReference[oaicite:1]{index=1}** sur le bruit induit par le courant confirment expérimentalement ce que beaucoup soupçonnaient sans toujours le quantifier.

Dans cet article, nous allons reprendre ces éléments, les expliquer clairement et surtout les relier à nos applications radioamateurs : LNA VHF/UHF, préamplis micro, réception faible signal, SDR, EME, VLF, etc.

---

# 1. Le bruit thermique : le plancher incontournable

Toute résistance, même parfaite, génère un bruit électrique appelé bruit thermique ou bruit de Johnson.
![Categories_de_resistances](https://github.com/user-attachments/assets/8a782c49-e3a4-4547-8f55-100a7b335414)

Il s’agit d’un phénomène purement physique lié à l’agitation thermique des porteurs de charge. Même sans tension appliquée, une résistance produit une tension de bruit dont la densité spectrale est donnée par :

\[
e_n = \sqrt{4 k T R \Delta f}
\]

où :

- \(k\) est la constante de Boltzmann  
- \(T\) la température absolue en Kelvin  
- \(R\) la valeur de la résistance  
- \(\Delta f\) la bande passante considérée  

Ce bruit présente plusieurs caractéristiques importantes.

Il dépend uniquement de la température et de la valeur de la résistance. Il est indépendant de la technologie utilisée : film métal, film mince, film épais ou carbone, le bruit thermique minimal reste le même pour une valeur donnée à une température donnée. Enfin, son spectre est plat : il s’agit d’un bruit blanc.

En radioamateur, cela signifie qu’une résistance élevée dans une large bande passante introduira inévitablement un bruit mesurable. C’est une limite physique incompressible. La seule manière de réduire ce bruit est de diminuer la valeur de la résistance, la température, ou la bande passante.

Mais ce n’est pas le bruit le plus insidieux.

---

# 2. Le bruit d’excès (1/f) : celui qui pose problème


En plus du bruit thermique, certaines résistances génèrent un bruit supplémentaire lorsqu’un courant les traverse. On l’appelle bruit d’excès, bruit induit par le courant, ou plus communément bruit 1/f.

Contrairement au bruit thermique, il dépend fortement de la technologie de fabrication.

Dans les résistances à film épais ou en carbone, le matériau résistif est constitué de particules ou de structures granuleuses. Le courant ne circule pas dans une couche homogène parfaitement uniforme, mais dans un réseau microscopique irrégulier. Ces irrégularités provoquent des fluctuations locales de résistance, ce qui se traduit par un bruit supplémentaire dépendant de la tension appliquée.

Ce bruit présente plusieurs propriétés essentielles :

- Il est proportionnel à la tension DC appliquée aux bornes de la résistance.  
- Il ne dépend pas directement de la valeur en ohms.  
- Il décroît avec la fréquence selon une loi 1/f, soit environ 10 dB par décade.  

Autrement dit, il domine principalement aux basses fréquences.

C’est précisément ce que montrent les mesures expérimentales de Hans Rosenberg et de Uwe Beis : lorsque la tension augmente, le bruit d’excès augmente proportionnellement. Lorsque la fréquence augmente, il diminue progressivement jusqu’à devenir négligeable devant le bruit thermique.

---

# 3. Confirmation expérimentale : ce que montrent les mesures

Les mesures réalisées par **Hans Rosenberg** et **Uwe Beis** sont particulièrement intéressantes car elles ne reposent pas uniquement sur la théorie.

Le montage de mesure utilise un préamplificateur très faible bruit à entrée FET, alimenté par batterie, totalement blindé, associé à un ADC 24 bits avec moyennage long. Ce niveau de rigueur est indispensable car on travaille à quelques nanovolts par racine de Hertz.

Les conclusions sont claires :

- Les résistances film mince (thin film) et film métal produisent un bruit quasiment égal au bruit thermique théorique.
- Les résistances film épais SMD produisent un bruit d’excès mesurable et parfois très supérieur.
- Les résistances carbone composition sont extrêmement bruyantes sous tension.
- Le bruit d’excès est proportionnel à la tension appliquée.
- À technologie identique, les résistances de plus grande taille génèrent moins de bruit.

Un point particulièrement intéressant pour nous : deux résistances film épais 10 kΩ de fabricants différents peuvent présenter des niveaux de bruit sensiblement différents. Cela signifie que les composants génériques sans spécifications précises peuvent introduire une variabilité non négligeable.

![datasheet](https://github.com/user-attachments/assets/bc20d2cc-ea12-4c1d-b146-00e83e1e65f1)


---

# 4. Dépendance à la taille : un détail qui change tout

Les mesures montrent une tendance nette : plus la résistance est physiquement grande, plus le bruit d’excès est faible.

Cela s’explique simplement. Si l’on répartit la même valeur ohmique sur une surface plus grande, la densité de courant locale diminue, les variations microscopiques deviennent moins critiques, et le bruit d’excès diminue.

En pratique, cela signifie que dans un circuit faible bruit :

- Un boîtier 1206 sera généralement meilleur qu’un 0402 à technologie équivalente.
- Un ancien modèle traversant 1/4W peut parfois être moins bruyant qu’un minuscule SMD film épais moderne.

À l’ère du tout-miniature, cette information est précieuse.

---

# 5. Applications concrètes en radioamateur

## Préamplificateurs micro et audio

Dans les étages BF, le bruit 1/f est particulièrement critique car il agit précisément dans la bande utile. Un simple pont de polarisation réalisé en film épais sous 12 V peut injecter un bruit dominant sous 100 Hz, perceptible comme un souffle ou une instabilité de fond.

Utiliser des résistances film mince ou film métal réduit immédiatement ce problème.

## LNA HF / VHF / UHF

En RF pure (144 MHz, 432 MHz, etc.), le bruit 1/f est généralement négligeable car il décroît fortement avec la fréquence. Cependant, dans les étages de polarisation d’un transistor faible bruit, une résistance film épais sous forte tension peut augmenter le bruit global si son bruit est injecté dans le point sensible du transistor.

Dans les conceptions EME ou très faible signal, où chaque dB compte, le choix technologique devient pertinent.

## SDR et réception faible signal

Dans un récepteur SDR, la partie analogique avant l’ADC est déterminante. Si un étage BF ou FI basse fréquence utilise des résistances bruyantes sous tension, le bruit 1/f peut apparaître sous forme de dérive de fond ou de bruit basse fréquence gênant les décodages faibles comme FT8, QRSS ou WSPR.

---

# 6. Ce qu’il faut retenir pour optimiser ses designs

Il n’est pas nécessaire d’utiliser des résistances ultra haut de gamme partout. En revanche, il est important d’être cohérent.

Si une résistance ne voit quasiment aucune tension DC, son bruit d’excès est négligeable et la technologie importe peu.

Si une résistance supporte une tension significative dans un étage faible bruit, il est préférable d’utiliser :

- Film mince (thin film)
- Film métal
- Éventuellement résistance à couche métallique traversante

Il est également judicieux de :

- Limiter la tension DC aux bornes quand c’est possible  
- Éviter les boîtiers 0402 en faible bruit  
- Consulter les datasheets pour rechercher un Noise Index  

---

# 7. Un mot sur les condensateurs céramiques

Les mesures de Uwe Beis montrent qu’un condensateur X7R 100 nF sous tension ne génère pas de bruit mesurable supplémentaire dans les conditions testées.

Cela signifie que, du point de vue strictement bruit thermique ou 1/f, les condensateurs céramiques à fort εr ne sont pas des sources de bruit comparables aux résistances.

En revanche, ils peuvent présenter d’autres défauts comme la microphonie, la non-linéarité ou la dépendance en température. Pour les circuits très sensibles, les diélectriques NP0/C0G restent préférables.

---

# Conclusion

Les résistances ne sont pas idéales, et elles ne se valent pas toutes.

Le bruit thermique est une limite physique incontournable, mais le bruit d’excès dépend de nos choix technologiques. En radioamateur, où quelques décibels peuvent faire la différence entre décoder ou non une station faible, ignorer cet aspect peut conduire à des performances inférieures aux attentes.

Comprendre ces phénomènes permet d’éviter des heures de recherche de panne, d’optimiser réellement un LNA ou un préampli BF, et de concevoir des montages dont les performances correspondent enfin aux calculs théoriques.

La prochaine fois que vous choisirez une résistance, ne regardez pas seulement la valeur et la tolérance. Regardez aussi la technologie.

Parce qu’en radio, le silence se mérite.

---

# Références

- Vidéo : *Quieting Noisy Resistors* – Hans Rosenberg  https://www.youtube.com/watch?v=omn_Lh0MLA4
- Mesures expérimentales : Uwe Beis – Current-Induced Resistor Noise  https://www.beis.de/Elektronik/ResistorCurrentNoise/CurrentInducedResistorNoise.html
- Document du CERN : https://cds.cern.ch/record/2814429/files/2109.02448.pdf
  => Measurement of Excess Noise in Thin Film and Metal Foil Resistor Networks par Nikolai Beev
---

73  
