---
date: '2026-02-11T15:20:00+01:00'
draft: false
title: "NOOELEC Ham It Up + pour upconverter + 125MHz pour améliorer la réception de la bande HF!"

cover:
  image: "https://github.com/user-attachments/assets/232c5588-596f-4193-8e56-79835c4063cd"
---

## HackRF et réception HF : pourquoi l’upconverter change tout

La réception très basse fréquence avec le HackRF est loin d’être idéale.  
J’ai donc décidé de l’exploiter là où il est plus à l’aise et d’aller chercher les bandes HF/VLF autrement.

Sur le papier, le HackRF est capable de recevoir à partir de 1 MHz.  
Dans la pratique, c’est une autre histoire.

La courbe suivante montre le bruit ajouté par le HackRF dans la bande HF.  
Et attention : le tout premier trait visible correspond déjà à 100 MHz.

![HackRF Noise Figure](https://greatscottgadgets.com/images/hackrfpro-rx-nf.png)

Cette courbe est très parlante.  
On ne voit pas seulement le bruit thermique ou le bruit ambiant, mais bien le bruit généré par la chaîne RF elle-même.

Le HackRF est conçu comme un transceiver large bande, avec très peu de filtrage analogique en entrée.  
Résultat : tout ce qui existe dans l’environnement radio en dessous de quelques dizaines de MHz vient polluer le front-end, remonter le plancher de bruit et réduire drastiquement la capacité à décoder des signaux faibles.

---

## Comparaison avec un RTL-SDR

Pour comparaison, voici ce que donne un RTL-SDR dans un contexte similaire :

![RTL-SDR HF](https://external-preview.redd.it/Vj0KyiY912alLyTcQoWpZhjnYt55sFJ9G5xb_R0FXso.png?width=640&crop=smart&auto=webp&s=59c7c39c2a8cc6906bc4a73ed5c9c8cc91b754e6)

On voit clairement que le RTL-SDR s’en sort mieux en termes de plancher de bruit.  
Les signaux sont plus propres, mieux détachés du bruit de fond, et la dynamique semble meilleure en HF.

Ce n’est pas magique, mais logique :  
le RTL-SDR, bien que basique, est moins exposé aux signaux hors bande et bénéficie d’une architecture plus tolérante pour une écoute étroite et ciblée.

---

## Alors pourquoi ne pas utiliser uniquement le RTL-SDR ?

La réponse est simple : la bande passante.

Le RTL-SDR est excellent pour observer une petite portion de spectre.  
Mais dès que l’on veut une vision globale, cela devient frustrant.

En HF, il y a énormément de choses intéressantes à observer simultanément :

- Radiodiffusion
- Bandes radioamateurs
- Signaux utilitaires
- Balises
- Émissions numériques

Le HackRF, lui, permet de visualiser plusieurs mégahertz d’un coup.  
Et c’est précisément là que son intérêt devient évident.

À condition de ne pas l’utiliser là où il est le moins performant.

---

## La solution : l’upconverter

L’idée est simple : déplacer la HF vers une zone de fréquence où le HackRF se comporte beaucoup mieux.

Voici l’outil utilisé :

![Ham It Up Plus](https://www.passion-radio.com/6064-thickbox_default/hamitupv2.jpg)

Il s’agit du **Ham It Up Plus** de Nooelec.

Son rôle est de transposer toute la bande HF vers une fréquence plus élevée, ici autour de **125 MHz**.

Concrètement :

- 7 MHz → 132 MHz  
- 14 MHz → 139 MHz  
- etc.

Ce déplacement change complètement le comportement du HackRF.

On sort de la zone la plus polluée et la plus mal filtrée du front-end pour entrer dans une plage où l’architecture RF est beaucoup plus stable.

Le plancher de bruit chute nettement, les signaux deviennent exploitables et la réception redevient cohérente.

---

## Datasheet officielle

https://www.nooelec.com/store/downloads/dl/file/id/99/product/284/ham_it_up_plus_datasheet_revision_2.pdf

### Caractéristiques principales

**Ham It Up Plus**

- Upconvert Frequency Range : 300 Hz – 65 MHz  
- LO Frequency : 125 MHz  
- LO Stability : 1 PPM  
- Required Input Voltage : 4.0 – 5.5 VDC  
- Current Consumption (upconvert mode) : 135 – 155 mA  

---

## Résultat pratique

Grâce à ce montage, la bande HF peut être découpée en trois segments visibles.

En un coup d’œil, on obtient :

- Un aperçu rapide de la propagation
- Les bandes actives
- Les zones ouvertes
- Les portions mortes

C’est exactement l’objectif :  
une vision large et instantanée plutôt qu’une écoute ultra-fine mais fragmentée.

---

## Détail intéressant : le générateur de bruit intégré

Le Ham It Up intègre aussi un générateur de bruit.

Ce n’est pas un gadget.

Il peut servir :

- De référence de niveau
- De test pour la chaîne RX
- De validation matérielle et logicielle

Dans une démarche expérimentale, c’est un vrai plus.

---

## Essai comparatif

Avant installation de l’upconverter :

![HF avant upconverter](https://i.servimg.com/u/f52/11/30/17/07/rx_san10.png)

Après installation :

![HF après upconverter](https://i.servimg.com/u/f52/11/30/17/07/captur10.png)

La bande la plus basse est sortie du bruit.

La réception devient nettement plus exploitable dans cette partie du spectre.

---

## Conclusion

Le HackRF n’est pas un bon récepteur HF en réception directe, et il ne le sera jamais.  
Ce n’est pas un défaut, c’est un choix de conception.

En revanche, associé à un upconverter, il devient un outil très intéressant pour l’observation large bande de la HF.

L’upconverter n’est pas un bricolage ou un palliatif :  
c’est un élément clé qui rend l’ensemble cohérent et réellement exploitable.
