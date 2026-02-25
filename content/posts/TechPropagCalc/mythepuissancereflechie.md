---
title: "SWR, puissance réfléchie et pertes réelles : ce qui se passe vraiment"
date: 2026-02-25T12:58:10
draft: false
tags: ["radioamateur", "SWR", "VSWR", "ligne de transmission", "RF", "impédance", "tuner", "FT-991"]
categories: ["Théorie RF"]
summary: "Comprendre pourquoi « puissance réfléchie » ne veut pas dire « puissance perdue », ce que mesure vraiment la mismatch loss, et pourquoi un transceiver moderne peut réduire sa puissance en cas de mauvaise adaptation."

cover:
  image: "https://github.com/user-attachments/assets/cd61def0-89b1-4b26-939e-5d3858055817"

---

# SWR, puissance réfléchie et pertes réelles  
## Ce qui se passe vraiment (et pourquoi ça contredit souvent les idées reçues)

[!illustration](https://github.com/user-attachments/assets/ced9f760-b089-427c-8277-3152e1d76f0e)

---

# 1. Mise au clair dès le départ

On entend partout, et souvent avec beaucoup d’assurance, que « si le SWR monte, la puissance réfléchie est perdue », comme si l’énergie repartait dans le coax pour être “mangée” par la station, ou pire, pour “disparaître”.

Ce raccourci mélange en réalité **trois notions** qui ne décrivent pas la même chose :

- **Le SWR (VSWR)** : c’est un indicateur de **désadaptation d’impédance** à un endroit donné du système (un *plan de mesure*), pas une mesure de rendement.
- **La puissance réfléchie** : c’est une partie de l’onde qui n’a pas été absorbée à la charge et qui repart vers la source ; tant que rien ne dissipe cette énergie, elle n’est pas “perdue”, elle est simplement **en circulation**.
- **La “mismatch loss”** : dans la pratique, beaucoup l’utilisent comme un “pourcentage perdu à cause du SWR”, alors que la source IZ2UUF explique explicitement que cette valeur représente surtout l’**incapacité d’un générateur idéal à délivrer sa puissance maximale en cas de désadaptation**, ce qui est très différent d’une dissipation dans la ligne.

Si tu ne sépares pas ces trois niveaux, tu arrives forcément à des contradictions entre ce que disent les formules “de tableau” et ce que tu observes sur un transceiver réel (par exemple ton Yaesu qui baisse sa puissance quand l’impédance est mauvaise).

---

# 2. Le cœur du sujet : onde incidente, onde réfléchie, onde stationnaire

On prend une ligne de transmission d’impédance caractéristique \(Z_0\) (typiquement 50 Ω) et une charge \(Z_L\) (l’antenne au point d’alimentation, ou un montage de test).

Le **coefficient de réflexion** au niveau de la charge est :

\[
\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}
\]

En amplitude (valeur absolue), le SWR est :

\[
SWR = \frac{1 + |\Gamma_L|}{1 - |\Gamma_L|}
\qquad \Longleftrightarrow \qquad
|\Gamma_L| = \frac{SWR - 1}{SWR + 1}
\]

La **fraction de puissance réfléchie à la charge** (dans le modèle d’ondes de puissance) est :

\[
\frac{P_r}{P_f} = |\Gamma_L|^2
\]

Donc oui : si SWR = 3:1, alors \( |\Gamma| = 0.5 \) et \( |\Gamma|^2 = 0.25 \), ce que rappelle aussi le PDF ZS6WR.

Mais ce résultat ne dit encore **rien** sur “où va” cette puissance réfléchie, ni sur “combien est réellement perdu”.

[!coubres](https://github.com/user-attachments/assets/f1da44c9-f031-49cd-b338-faf8d05395f2)

---

# 3. Premier vrai/faux : « réfléchi = perdu » ?

**Faux**, et c’est exactement le point que martèlent plusieurs sources.

Une onde réfléchie **n’est pas une perte**, c’est un phénomène de propagation : l’énergie repart parce que la charge n’a pas absorbé instantanément l’intégralité de l’énergie incidente au moment où l’onde l’atteint.

Ce qui fait une perte réelle, c’est qu’à chaque aller-retour, l’énergie traverse des éléments **non idéaux** qui possèdent une partie résistive (cuivre, diélectrique, ferrites, condensateurs, bobines, contacts) et qui dissipent une fraction de l’énergie sous forme de chaleur.

Autrement dit, la perte réelle n’est pas “le SWR” en tant que tel : la perte réelle est une combinaison de **désadaptation + atténuation de ligne + pertes des composants**. C’est précisément ce que IZ2UUF résume par l’idée que la ligne devient un transformateur d’impédance, et que “la seule puissance perdue est celle dissipée en chaleur par la ligne”.

Pour visualiser ça sans discours mystique, voici le schéma mental le plus utile : l’énergie ne “disparaît” pas, elle **rebondit** (ping‑pong) entre charge et source tant qu’il reste une désadaptation, et à chaque trajet, une petite partie est retirée du système sous forme de pertes réelles.

---

# 4. Ce que la “mismatch loss” signifie réellement (et ce qu’elle ne signifie pas)

C’est ici que beaucoup de discussions partent dans le décor.

La mismatch loss est souvent écrite :

\[
ML = -10\log_{10}(1 - |\Gamma|^2)
\]

C’est une valeur en dB qu’on retrouve dans des tableaux, et qui est souvent interprétée comme “la perte due au SWR”.

Or, IZ2UUF dit explicitement ceci (et c’est la phrase que tu citais) :

> “The Mismatch Loss value does not tell how much power is actually lost due to other dissipated, but it represents the inability of the generator to generate power due to mismatch.”

Donc **ce n’est pas une ‘perte dans la ligne’** : c’est une mesure du fait que, dans un modèle de générateur donné (typique : générateur de labo “proche d’un idéal 50 Ω”), la puissance disponible/maximale ne peut pas être transférée à une charge désadaptée sans réseau d’adaptation.

L’image suivante de IZ2UUF est très parlante car elle montre deux circuits simples : en adaptation parfaite, le générateur “dissipe” une partie dans sa résistance interne ; en désadaptation, le générateur délivre moins de puissance totale, mais peut paradoxalement avoir une meilleure efficacité interne, ce qui tue l’idée “SWR = inefficacité” :

![Mismatch loss — circuits A/B (IZ2UUF)](https://www.iz2uuf.net/wp/wp-content/uploads/2017/07/MismatchLoss3.jpg)

**Conséquence pratique immédiate :** si tu utilises un générateur de laboratoire, tu peux mesurer une baisse de puissance “par mismatch” parce que le générateur est conçu pour se comporter comme un 50 Ω très propre. Mais cette baisse n’est pas “la ligne qui mange ta puissance”, c’est le générateur qui ne la fournit pas (ou pas autant).

RF.Guru fait exactement le même reproche au “modèle scolaire” : le schéma “source idéale + résistance série 50 Ω” est utile pour un exercice, mais il décrit un émetteur fictif que personne ne veut construire en HF, parce que ce serait une machine à gaspiller de la puissance dans un “50 Ω interne”.

---

# 5. Ligne idéale vs ligne réelle : pourquoi la perte dépend de l’atténuation

## 5.1 Ligne idéale (sans pertes)

Sur une ligne parfaite, si rien ne dissipe l’énergie, alors aucune quantité d’énergie ne peut “s’évanouir” à cause du SWR. L’énergie circule, s’additionne ou se retranche localement (ondes stationnaires), mais globalement elle finit absorbée soit par la charge, soit par la source, selon les conditions aux limites.

C’est exactement le type de situation qu’on “voit” dans l’expérience impulsionnelle de IZ2UUF, où il suit l’onde et observe les rebonds temporels, puis compare le comportement impulsionnel et le comportement en excitation continue.

Image de principe montrant que, en excitation impulsionnelle, on voit clairement les évènements et les retours (rebonds) :

![Impulsion et réflexions (IZ2UUF)](https://www.iz2uuf.net/wp/wp-content/uploads/2017/07/pulse-B01d.jpg)

Et image conceptuelle “A/B” de IZ2UUF qui illustre pourquoi, en régime continu, la réflexion se comporte comme une “source équivalente” et modifie l’impédance vue au départ de ligne :

![La réflexion modifie l’impédance vue au générateur (IZ2UUF)](https://www.iz2uuf.net/wp/wp-content/uploads/2017/07/impedance_with_voltage.png)

La phrase clé de IZ2UUF derrière ce schéma est : **“les réflexions changent l’impédance de la ligne au point d’alimentation”**, et la ligne agit alors comme un transformateur d’impédance.

## 5.2 Ligne réelle (avec pertes)

Dans le monde réel, une ligne a une atténuation. Donc quand l’énergie fait des allers-retours, elle repasse à chaque fois dans un milieu dissipatif, et la puissance finira par se transformer en chaleur.

C’est pour cela que ZL3DW insiste sur un point très concret : **“99.9+% des pertes du système sont dues au coax”** (formulation volontairement provocatrice, mais l’idée est claire : c’est le coax qui domine très souvent le budget de pertes, surtout si tu montes en fréquence ou si tu as un coax “moyen”).

Le mécanisme réel n’est donc pas “SWR = perte”, c’est :

- SWR élevé → plus d’énergie rebondit et repasse dans la ligne,
- ligne non idéale → chaque passage dissipe un peu,
- donc SWR élevé **multiplie** les pertes de ligne, surtout si la ligne est déjà très atténuante.

---

# 6. Démonstration simple : la “ping‑pong loss” (réflexions multiples)

Cette partie vaut de l’or, parce qu’elle te donne une intuition quantitative solide sans te perdre.

On prend :

- \(L\) : le facteur de transmission **en puissance** sur un trajet aller (ligne en conditions adaptées), donc si la ligne fait 1 dB de perte en aller, alors \(L = 10^{-1/10} \approx 0.794\).
- \( \rho = |\Gamma_L| \) : la magnitude du coefficient de réflexion à la charge.
- On suppose que la “borne côté station” (tuner / sortie) se comporte comme un miroir quasi parfait pour l’onde réfléchie, c’est-à-dire qu’elle renvoie l’énergie vers l’antenne au lieu de la dissiper. C’est exactement l’esprit de l’explication “step-by-step” de ZL3DW, où le retour n’est pas “absorbé”, mais repart.

Dans ce cas :

1. Première arrivée à la charge : puissance \(P_0 L\).
2. La charge absorbe une fraction \((1-\rho^2)\), donc absorbé : \(P_0 L(1-\rho^2)\), réfléchi : \(P_0 L\rho^2\).
3. L’onde réfléchie revient à la station avec un facteur \(L\) supplémentaire : \(P_0 L^2 \rho^2\), puis repart, et revient à la charge avec encore \(L\) : \(P_0 L^3 \rho^2\).
4. Deuxième passage à la charge : absorbé \(P_0 L^3\rho^2(1-\rho^2)\).
5. Puis ça recommence.

La puissance absorbée totale par la charge est donc une somme de série géométrique :

\[
P_{abs} =
P_0L(1-\rho^2)\left[1 + (L^2\rho^2) + (L^2\rho^2)^2 + \dots\right]
\]

et comme :

\[
1 + x + x^2 + \dots = \frac{1}{1-x}
\]

on obtient :

\[
P_{abs} = \frac{P_0L(1-\rho^2)}{1 - L^2\rho^2}
\]

C’est exactement la logique de ZL3DW quand il fait son exemple chiffré “1 dB de coax + SWR 2:1” : le deuxième passage n’est pas nul, et c’est la raison pour laquelle il ne faut pas raisonner avec un seul aller.

---

# 7. Courbes utiles : ce que SWR implique mathématiquement… et ce qu’il n’implique pas

## 7.1 Table de conversion SWR → \( |\Gamma| \) → puissance réfléchie → mismatch loss → return loss

| SWR | \(|\Gamma|\) | \(|\Gamma|^2\) (fraction réfléchie) | Mismatch loss (dB) | Return loss (dB) |
|---:|---:|---:|---:|---:|
| 1.0 | 0.000 | 0.000 | 0.00 | ∞ |
| 1.5 | 0.200 | 0.040 | 0.18 | 13.98 |
| 2.0 | 0.333 | 0.111 | 0.51 | 9.54 |
| 3.0 | 0.500 | 0.250 | 1.25 | 6.02 |
| 5.0 | 0.667 | 0.444 | 2.55 | 3.52 |
| 10.0 | 0.818 | 0.669 | 4.81 | 1.74 |

Ce tableau est “mathématiquement vrai”, mais il ne répond pas à la question radioamateur la plus importante, qui est : **combien de watts arrivent réellement à l’antenne et combien partent réellement en chaleur**, parce qu’il manque le terme dominant : **les pertes de la ligne et des composants**.

## 7.2 Courbe 1 — mismatch loss (dB) en fonction du SWR

<svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <title>Mismatch loss (dB) vs SWR</title>
  <desc>Courbe ML = -10 log10(1 - |Gamma|^2) de SWR 1 à 10</desc>

  <!-- axes -->
  <line x1="70" y1="390" x2="770" y2="390" stroke="black"/>
  <line x1="70" y1="30"  x2="70"  y2="390" stroke="black"/>

  <!-- ticks x -->
  <g font-size="12" fill="black">
    <text x="65" y="410">1</text>
    <text x="140" y="410">2</text>
    <text x="215" y="410">3</text>
    <text x="290" y="410">4</text>
    <text x="365" y="410">5</text>
    <text x="440" y="410">6</text>
    <text x="515" y="410">7</text>
    <text x="590" y="410">8</text>
    <text x="665" y="410">9</text>
    <text x="735" y="410">10</text>
  </g>

  <!-- ticks y 0..5 -->
  <g font-size="12" fill="black">
    <text x="40" y="395">0</text>
    <text x="40" y="323">1</text>
    <text x="40" y="251">2</text>
    <text x="40" y="179">3</text>
    <text x="40" y="107">4</text>
    <text x="40" y="35">5</text>
  </g>

  <!-- grid (light) -->
  <g stroke="black" stroke-opacity="0.15">
    <line x1="70" y1="318" x2="770" y2="318"/>
    <line x1="70" y1="246" x2="770" y2="246"/>
    <line x1="70" y1="174" x2="770" y2="174"/>
    <line x1="70" y1="102" x2="770" y2="102"/>
  </g>

  <!-- curve -->
  <polyline fill="none" stroke="black" stroke-width="3"
    points="70.0,390.0 77.1,389.4 84.1,387.8 91.2,385.5 98.3,382.5 105.4,379.1 112.4,375.3 119.5,371.2 126.6,366.9 133.7,362.4 140.7,357.7 147.8,352.9 154.9,348.0 162.0,343.0 169.0,337.9 176.1,332.8 183.2,327.7 190.3,322.5 197.3,317.4 204.4,312.3 211.5,307.2 218.6,302.2 225.6,297.2 232.7,292.2 239.8,287.3 246.9,282.4 253.9,277.6 261.0,272.9 268.1,268.2 275.2,263.6 282.2,259.0 289.3,254.5 296.4,250.1 303.5,245.8 310.5,241.5 317.6,237.3 324.7,233.1 331.8,229.1 338.8,225.1 345.9,221.1 353.0,217.3 360.1,213.5 367.1,209.7 374.2,206.1 381.3,202.5 388.4,198.9 395.4,195.5 402.5,192.1 409.6,188.8 416.7,185.5 423.7,182.3 430.8,179.2 437.9,176.1 445.0,173.1 452.0,170.1 459.1,167.2 466.2,164.4 473.3,161.6 480.3,158.9 487.4,156.2 494.5,153.6 501.6,151.1 508.6,148.6 515.7,146.2 522.8,143.8 529.9,141.5 536.9,139.2 544.0,137.0 551.1,134.8 558.2,132.7 565.2,130.6 572.3,128.6 579.4,126.6 586.5,124.7 593.5,122.8 600.6,121.0 607.7,119.2 614.8,117.4 621.8,115.7 628.9,114.1 636.0,112.4 643.1,110.8 650.1,109.3 657.2,107.8 664.3,106.3 671.4,104.8 678.4,103.4 685.5,102.0 692.6,100.7 699.7,99.4 706.7,98.1 713.8,96.9 720.5,60.6 727.6,58.1 734.6,55.7 741.7,53.3 748.8,50.9 755.9,48.6 762.9,46.2 770.0,43.9"
  />

  <!-- labels -->
  <text x="320" y="440" font-size="14">SWR</text>
  <text x="18" y="210" font-size="14" transform="rotate(-90 18,210)">Mismatch loss (dB)</text>
</svg>

Ce graphique est utile pour comprendre le chiffre “1.25 dB à 3:1”, mais si tu l’utilises pour conclure “donc 1.25 dB sont perdus dans ma ligne à cause du SWR”, tu fais exactement l’erreur décrite par IZ2UUF et RF.Guru : tu appliques un modèle de transfert (ou de source) hors contexte.

## 7.3 Courbe 2 — perte totale (ligne + rebonds) selon la perte du coax

Ici, on montre une idée très pratique : à SWR identique, **la pénalité réelle dépend énormément de la perte de la ligne**, ce qui rejoint directement la logique “les pertes sont surtout dans le coax” (ZL3DW) et “une formule qui ne dépend que du SWR est forcément incomplète” (IZ2UUF).

On trace la **perte totale** (en dB) entre la station et la charge en supposant :
- un coax ayant une perte “matched” donnée (0.5 dB, 1 dB, 3 dB sur l’aller),
- une charge présentant un SWR donné,
- et un comportement de type “ping‑pong” (réflexions multiples), comme dans l’exemple de ZL3DW.

<svg width="100%" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <title>Perte totale vs SWR pour différentes pertes de ligne</title>
  <desc>Trois courbes (0.5 dB, 1 dB, 3 dB) en noir avec motifs de trait différents</desc>

  <!-- axes -->
  <line x1="70" y1="390" x2="770" y2="390" stroke="black"/>
  <line x1="70" y1="30"  x2="70"  y2="390" stroke="black"/>

  <!-- ticks x -->
  <g font-size="12" fill="black">
    <text x="65" y="410">1</text>
    <text x="140" y="410">2</text>
    <text x="215" y="410">3</text>
    <text x="290" y="410">4</text>
    <text x="365" y="410">5</text>
    <text x="440" y="410">6</text>
    <text x="515" y="410">7</text>
    <text x="590" y="410">8</text>
    <text x="665" y="410">9</text>
    <text x="735" y="410">10</text>
  </g>

  <!-- ticks y 0..8 -->
  <g font-size="12" fill="black">
    <text x="40" y="395">0</text>
    <text x="40" y="350">1</text>
    <text x="40" y="305">2</text>
    <text x="40" y="260">3</text>
    <text x="40" y="215">4</text>
    <text x="40" y="170">5</text>
    <text x="40" y="125">6</text>
    <text x="40" y="80">7</text>
    <text x="40" y="35">8</text>
  </g>

  <!-- grid -->
  <g stroke="black" stroke-opacity="0.15">
    <line x1="70" y1="345" x2="770" y2="345"/>
    <line x1="70" y1="300" x2="770" y2="300"/>
    <line x1="70" y1="255" x2="770" y2="255"/>
    <line x1="70" y1="210" x2="770" y2="210"/>
    <line x1="70" y1="165" x2="770" y2="165"/>
    <line x1="70" y1="120" x2="770" y2="120"/>
    <line x1="70" y1="75"  x2="770" y2="75"/>
  </g>

  <!-- curves -->
  <!-- 0.5 dB: solid -->
  <polyline fill="none" stroke="black" stroke-width="3"
    points="70.0,345.0 77.1,344.9 84.1,344.5 91.2,343.9 98.3,343.3 105.4,342.5 112.4,341.6 119.5,340.7 126.6,339.7 133.7,338.6 140.7,337.5 147.8,336.3 154.9,335.1 162.0,333.8 169.0,332.5 176.1,331.2 183.2,329.8 190.3,328.4 197.3,326.9 204.4,325.5 211.5,324.0 218.6,322.5 225.6,320.9 232.7,319.4 239.8,317.8 246.9,316.2 253.9,314.6 261.0,313.0 268.1,311.3 275.2,309.7 282.2,308.0 289.3,306.3 296.4,304.6 303.5,302.9 310.5,301.2 317.6,299.5 324.7,297.7 331.8,296.0 338.8,294.2 345.9,292.5 353.0,290.7 360.1,288.9 367.1,287.2 374.2,285.4 381.3,283.6 388.4,281.8 395.4,280.0 402.5,278.2 409.6,276.4 416.7,274.6 423.7,272.8 430.8,271.0 437.9,269.2 445.0,267.4 452.0,265.6 459.1,263.8 466.2,262.0 473.3,260.2 480.3,258.4 487.4,256.6 494.5,254.8 501.6,253.0 508.6,251.2 515.7,249.4 522.8,247.6 529.9,245.8 536.9,244.0 544.0,242.2 551.1,240.4 558.2,238.6 565.2,236.8 572.3,235.0 579.4,233.2 586.5,231.4 593.5,229.6 600.6,227.8 607.7,226.0 614.8,224.2 621.8,222.4 628.9,220.6 636.0,218.8 643.1,217.0 650.1,215.2 657.2,213.4 664.3,211.6 671.4,209.8 678.4,208.0 685.5,206.2 692.6,204.4 699.7,202.6 706.7,200.8 713.8,199.0 720.9,197.2 728.0,195.4 735.0,193.6 742.1,191.8 749.2,190.0 756.3,188.2 763.3,186.4 770.0,184.6"
  />

  <!-- 1 dB: dashed -->
  <polyline fill="none" stroke="black" stroke-width="3" stroke-dasharray="10,6"
    points="70.0,300.0 77.1,299.8 84.1,299.2 91.2,298.4 98.3,297.4 105.4,296.2 112.4,294.8 119.5,293.3 126.6,291.6 133.7,289.9 140.7,288.0 147.8,286.1 154.9,284.1 162.0,282.0 169.0,279.9 176.1,277.7 183.2,275.5 190.3,273.2 197.3,270.9 204.4,268.6 211.5,266.2 218.6,263.9 225.6,261.5 232.7,259.1 239.8,256.7 246.9,254.3 253.9,252.0 261.0,249.6 268.1,247.3 275.2,244.9 282.2,242.6 289.3,240.3 296.4,238.0 303.5,235.8 310.5,233.5 317.6,231.3 324.7,229.1 331.8,226.9 338.8,224.8 345.9,222.6 353.0,220.5 360.1,218.4 367.1,216.3 374.2,214.2 381.3,212.2 388.4,210.2 395.4,208.2 402.5,206.2 409.6,204.2 416.7,202.3 423.7,200.4 430.8,198.5 437.9,196.6 445.0,194.7 452.0,192.9 459.1,191.1 466.2,189.3 473.3,187.5 480.3,185.7 487.4,184.0 494.5,182.3 501.6,180.6 508.6,178.9 515.7,177.2 522.8,175.6 529.9,174.0 536.9,172.4 544.0,170.8 551.1,169.2 558.2,167.7 565.2,166.1 572.3,164.6 579.4,163.1 586.5,161.7 593.5,160.2 600.6,158.8 607.7,157.3 614.8,155.9 621.8,154.5 628.9,153.2 636.0,151.8 643.1,150.4 650.1,149.1 657.2,147.8 664.3,146.5 671.4,145.2 678.4,143.9 685.5,142.6 692.6,141.4 699.7,140.1 706.7,138.9 713.8,137.7 720.9,136.5 728.0,135.3 735.0,134.1 742.1,132.9 749.2,131.8 756.3,130.6 763.3,129.5 770.0,128.4"
  />

  <!-- 3 dB: dotted -->
  <polyline fill="none" stroke="black" stroke-width="3" stroke-dasharray="3,6"
    points="70.0,210.0 77.1,209.1 84.1,206.8 91.2,203.8 98.3,200.4 105.4,196.6 112.4,192.6 119.5,188.4 126.6,184.0 133.7,179.6 140.7,175.0 147.8,170.4 154.9,165.7 162.0,161.0 169.0,156.2 176.1,151.4 183.2,146.6 190.3,141.8 197.3,137.0 204.4,132.3 211.5,127.6 218.6,122.9 225.6,118.2 232.7,113.6 239.8,109.0 246.9,104.4 253.9,99.9 261.0,95.4 268.1,90.9 275.2,86.5 282.2,82.1 289.3,77.8 296.4,73.5 303.5,69.2 310.5,65.0 317.6,60.8 324.7,56.7 331.8,52.6 338.8,48.6 345.9,44.6 353.0,40.7 360.1,36.8 367.1,33.0 374.2,29.2 381.3,25.5 388.4,21.8 395.4,18.2 402.5,14.6 409.6,11.1 416.7,7.6 423.7,4.2 430.8,0.8 437.9,-2.5 445.0,-5.8 452.0,-9.0 459.1,-12.2 466.2,-15.3 473.3,-18.4 480.3,-21.4 487.4,-24.4 494.5,-27.3 501.6,-30.2 508.6,-33.0 515.7,-35.8 522.8,-38.5 529.9,-41.2 536.9,-43.8 544.0,-46.4 551.1,-48.9 558.2,-51.4 565.2,-53.9 572.3,-56.3 579.4,-58.7 586.5,-61.0 593.5,-63.3 600.6,-65.6 607.7,-67.8 614.8,-70.0 621.8,-72.2 628.9,-74.3 636.0,-76.4 643.1,-78.4 650.1,-80.5 657.2,-82.5 664.3,-84.4 671.4,-86.4 678.4,-88.3 685.5,-90.2 692.6,-92.1 699.7,-93.9 706.7,-95.7 713.8,-97.5 720.9,-99.3 728.0,-101.0 735.0,-102.8 742.1,-104.5 749.2,-106.2 756.3,-107.8 763.3,-109.5 770.0,-111.1"
  />

  <!-- legend -->
  <g font-size="14" fill="black">
    <line x1="520" y1="60" x2="610" y2="60" stroke="black" stroke-width="3"/>
    <text x="620" y="65">Ligne 0.5 dB (matched)</text>

    <line x1="520" y1="90" x2="610" y2="90" stroke="black" stroke-width="3" stroke-dasharray="10,6"/>
    <text x="620" y="95">Ligne 1 dB (matched)</text>

    <line x1="520" y1="120" x2="610" y2="120" stroke="black" stroke-width="3" stroke-dasharray="3,6"/>
    <text x="620" y="125">Ligne 3 dB (matched)</text>
  </g>

  <!-- labels -->
  <text x="320" y="440" font-size="14">SWR</text>
  <text x="18" y="240" font-size="14" transform="rotate(-90 18,240)">Perte totale (dB)</text>
</svg>

**Lecture qualitative du graphique :** quand la ligne est peu perdante (0.5 dB), même un SWR élevé ajoute une pénalité qui reste limitée ; quand la ligne est déjà très perdante (3 dB), alors le même SWR devient réellement coûteux, et tu comprends pourquoi “la même antenne” peut avoir l’air “catastrophique” chez quelqu’un et “acceptable” chez un autre : la différence n’est pas mystique, elle est dans les pertes.

---

# 8. Pourquoi ton FT‑991 baisse sa puissance alors que certains rigs semblent “tenir”

Ta question est exactement celle que beaucoup se posent après avoir lu IZ2UUF : si la puissance réfléchie n’est pas “perdue” au sens magique, pourquoi mon émetteur baisse-t-il réellement sa puissance quand le SWR monte ?

Parce qu’il faut séparer **le comportement de la ligne** du **comportement de l’émetteur**.

VK1OD explique très clairement que l’idée “la puissance réfléchie est absorbée par le PA et donc chauffe et casse” est une explication trop simpliste ; en pratique, ce qui change réellement, c’est **l’impédance vue aux bornes de l’étage de sortie**, donc le rapport V/I au niveau du PA, et ce changement suffit à expliquer via la théorie des circuits pourquoi la puissance et la dissipation peuvent varier (parfois même dans le “bon” sens).

ZS6WR ajoute un élément très concret côté matériel moderne : les fabricants implémentent souvent un “power back off” dès que le SWR dépasse un seuil (souvent autour de 2:1), non pas parce que “sinon ça casse instantanément”, mais parce que les étages finals fixes (et en particulier certains montages avec transfos ferrite large bande) n’aiment pas les forts courants/tensions réactifs, ce qui dégrade notamment l’intermodulation ; réduire la puissance est une manière simple de rester dans une zone sûre (thermiquement et en linéarité).

Donc, si ton FT‑991 baisse sa puissance, ce n’est pas une preuve que “le SWR mange la puissance”, c’est une preuve que ton transceiver **décide de ne pas maintenir la puissance nominale** hors de sa zone de confort. Et c’est cohérent avec ce qu’écrit IZ2UUF sur la différence entre un générateur de labo “idéal 50 Ω” et un transceiver réel : un transceiver peut, selon sa conception, maintenir une puissance quasi constante jusqu’à un seuil, puis réduire brutalement quand la protection s’active, alors qu’un générateur de labo, lui, peut “ne pas générer” la puissance attendue bien avant toute protection, parce que son modèle interne est différent.

---

# 9. Le rôle du tuner (et l’erreur classique “le tuner supprime le SWR”)

Un tuner ne change pas l’impédance physique de l’antenne. Ce qu’il fait, c’est transformer l’impédance complexe “ligne + antenne” pour que l’émetteur voie quelque chose de proche de 50 Ω à son port.

C’est pour cela que RF.Guru insiste sur le fait qu’un tuner “fixe ce qui compte pour le PA”, même si la ligne et l’antenne restent désadaptées entre elles.

IZ2UUF le montre expérimentalement quand il ajoute un tuner : la puissance perdue dans la ligne reste pratiquement la même (à quelques centièmes de dB près), parce que la ligne reste la même et la charge reste la même ; le tuner ne rend pas le coax “magiquement moins dissipatif”. En revanche, il permet au générateur de fonctionner à son point normal, donc de réellement fournir la puissance attendue.

Ces images illustrent le cas “direct vs tuned” chez IZ2UUF :

![Mesure direct vs tuned (IZ2UUF)](https://www.iz2uuf.net/wp/wp-content/uploads/2017/07/IMG_1487_small.jpg)

et la mesure en présence de tuner (accord VNA) :

![Accord via tuner (IZ2UUF)](https://www.iz2uuf.net/wp/wp-content/uploads/2017/07/Tuned_20MHz.jpg)

**Conclusion opérationnelle :**
- Un tuner **au shack** protège ton PA et restaure une bonne adaptation *côté station*, mais il ne supprime pas les ondes stationnaires sur la ligne.
- Un tuner **au pied d’antenne** (ou une adaptation au point d’alimentation) réduit réellement le SWR **sur la ligne**, donc réduit aussi les pertes supplémentaires et les tensions/courants extrêmes sur le coax.

---

# 10. Exemple numérique complet (avec rebonds, pas juste un aller)

On reprend un exemple volontairement simple, parce que le but n’est pas de “coller à une datasheet”, mais de comprendre les ordres de grandeur, exactement comme ZL3DW le fait.

Hypothèses :

- Puissance injectée au départ de la ligne : \(P_0 = 100\ \text{W}\)
- Perte “matched” de la ligne (aller) : 1 dB  
  donc \(L = 10^{-1/10} \approx 0.794\)
- SWR à la charge : 3:1  
  donc \(|\Gamma| = 0.5\), \(\rho^2 = 0.25\)

## 10.1 Premier passage

Puissance qui arrive à la charge au premier aller :

\[
P_{inc,1} = P_0 L = 100 \times 0.794 = 79.4\ \text{W}
\]

Puissance absorbée au premier passage :

\[
P_{abs,1} = P_{inc,1}(1-\rho^2) = 79.4 \times 0.75 = 59.55\ \text{W}
\]

Puissance réfléchie au premier passage :

\[
P_{ref,1} = 79.4 \times 0.25 = 19.85\ \text{W}
\]

À ce stade, si tu t’arrêtes là, tu fais l’erreur “un seul aller”, et tu conclus : “il n’y a que 59.6 W qui servent”. Mais ZL3DW explique justement que l’onde réfléchie revient et peut repartir, donc il faut continuer.

## 10.2 Second passage (rebond)

La puissance réfléchie revient à la station avec une perte de 1 dB :

\[
P_{retour} = P_{ref,1} L = 19.85 \times 0.794 = 15.75\ \text{W}
\]

Si cette énergie est majoritairement renvoyée vers l’antenne (cas “ping‑pong” décrit par ZL3DW), elle repart et revient à la charge avec encore 1 dB :

\[
P_{inc,2} = 15.75 \times 0.794 = 12.50\ \text{W}
\]

Absorbée au second passage :

\[
P_{abs,2} = 12.50 \times 0.75 = 9.38\ \text{W}
\]

Réfléchie encore :

\[
P_{ref,2} = 12.50 \times 0.25 = 3.13\ \text{W}
\]

On voit déjà ce qui se passe : le second passage n’est pas énorme, mais il est loin d’être nul, et il explique pourquoi une station réelle “récupère” une partie de ce que les tableaux laissent croire “perdu”.

## 10.3 Somme totale (formule compacte)

Avec la formule de la section 6 :

\[
P_{abs} = \frac{P_0L(1-\rho^2)}{1 - L^2\rho^2}
\]

\[
P_{abs} = \frac{100 \times 0.794 \times 0.75}{1 - (0.794)^2 \times 0.25}
\approx 70.7\ \text{W}
\]

Donc, dans ce scénario réaliste “rebonds + pertes”, on n’est ni à 79.4 W (cas parfait), ni à 59.6 W (cas où le retour serait entièrement absorbé et ne repartirait jamais), mais à environ 70 W.

Ce résultat est totalement cohérent avec l’exemple “1 dB + SWR 2:1” donné par ZL3DW, où l’on retrouve numériquement que les rebonds “récupèrent” quelques watts supplémentaires, jusqu’à extinction progressive de l’énergie par pertes de coax.

---

# 11. Vrai / Faux (avec explications, sans slogans)

## Vrai
- Un SWR élevé signifie qu’il y a désadaptation, donc une onde réfléchie existe, et elle crée des maxima/minima de tension et de courant sur la ligne (ZL3DW l’explique au niveau des nœuds de tension/courant).
- Un SWR élevé **peut** augmenter les pertes réelles de la ligne, parce que l’énergie repasse plusieurs fois dans un élément dissipatif (ZL3DW + IZ2UUF).
- Un transceiver moderne **peut** réduire sa puissance quand le SWR dépasse un seuil, parce que c’est une stratégie de protection/linéarité (ZS6WR) ; cette baisse est donc une action de l’émetteur, pas une preuve que “le SWR a mangé la puissance”.

## Faux (ou très incomplet)
- “La puissance réfléchie est perdue” : non, elle est réfléchie ; la perte réelle dépend des dissipations (IZ2UUF, RF.Guru, ZL3DW).
- “Le SWR mesure l’efficacité d’une antenne” : non ; ZS6WR rappelle même qu’un dipôle ~73 Ω sur du coax 50 Ω donne un SWR ~1.46, et que chercher absolument 1:1 peut pousser certains à dégrader l’efficacité (par exemple en ajoutant des pertes vers le sol).
- “Le SWR > 1 détruit forcément l’émetteur” : VK1OD explique que c’est une exagération ; le risque dépend de la conception, de la plage d’impédances tolérée et des protections.

---

# 12. Conclusion pratique : ce que tu dois retenir en station

Si tu veux résumer tout ça en une phrase utile :

> Le SWR n’est pas un compteur de watts perdus ; c’est un indicateur de désadaptation qui, combiné aux pertes réelles de ta ligne et de tes composants (et au comportement de ton PA), détermine combien de puissance arrive réellement au radiateur.

Donc, en pratique :

- Si ton coax est court et peu perdant, un SWR “pas beau” n’est pas automatiquement une catastrophe, et ZL3DW insiste sur le fait que la différence “sur l’air” se joue souvent à quelques dB.
- Si tu es en VHF/UHF ou avec un coax déjà très atténuant, alors le même SWR devient beaucoup plus pénalisant, parce que les rebonds multiplient des pertes déjà élevées.
- Si ton transceiver foldback (comme tu l’as observé), il te montre surtout que tu es au‑delà de son seuil de confort, et la priorité devient alors : **présenter une charge acceptable au PA** (tuner, adaptation, réparation de la ligne/antenne), indépendamment du débat “réfléchi/perdu”.

---

# Sources (liens)

- IZ2UUF — The Myth of Reflected Power  
  https://www.iz2uuf.net/wp/index.php/2017/07/29/the-myth-of-reflected-power/

- RF.Guru — The SWR Myth: The Story of the “Lost” Power That Isn’t Really Lost  
  https://shop.rf.guru/pages/the-swr-myth-the-story-of-the-lost-power-that-isnt-really-lost

- RF.Guru — “SWR Loss” Is Largely a Myth — and Why Textbook Models Mislead Hams  
  https://shop.rf.guru/pages/swr-loss-is-largely-a-myth-and-why-textbook-models-mislead-hams

- ZS6WR — SWR (John Fielding) PDF  
  https://zs6wr.co.za/documents/SWR.pdf

- ZL3DW — SWR Myths and Mysteries (PDF)  
  https://www.qsl.net/zl3dw/pdf/SWR%20myths%20and%20mysteries.pdf

- VK1OD (archive) — Does SWR damage HF ham transmitters?  
  https://web.archive.org/web/20110121024549/http://vk1od.net/transmissionline/VSWR/damage.htm
