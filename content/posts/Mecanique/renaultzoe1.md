---
title: "Autopsie complète d’un moteur de Renault Zoé : quand un défaut de résolveur cache un roulement usé"
date: 2026-03-06
draft: false
tags: ["Renault Zoe", "moteur électrique", "résolveur", "roulement", "diagnostic", "réparation", "véhicule électrique", "ingénierie"]
cover:
  image: ""
---

# Autopsie complète d’un moteur de Renault Zoé 5AQ601
## Quand un défaut de résolveur cache un roulement bloqué

J’ai acheté cette **Renault Zoé de 2016 directement en panne en concession Renault**, avec l’idée de comprendre ce qui avait réellement condamné le moteur. Le diagnostic posé dans le réseau orientait vers une solution simple sur le plan administratif, mais radicale sur le plan technique : **remplacer l’ensemble du groupe motopropulseur**. Dans un atelier constructeur, cette approche se comprend facilement. Le temps passé à investiguer un moteur de traction est coûteux, les procédures sont fortement cadrées, et la sécurité liée à la haute tension pousse naturellement vers l’échange standard plutôt que vers l’autopsie détaillée.
![Traction](https://github.com/user-attachments/assets/d4b26f3e-b3f8-4312-bb5b-a267f33df81a)

Pourtant, ce type de conclusion laisse toujours une question en suspens : **quelle est la panne réelle ?** Un défaut électronique affiché par un calculateur n’est pas forcément la défaillance directe de l’organe incriminé. Très souvent, il ne fait que signaler qu’une information est devenue incohérente. Dans le cas présent, le véhicule remontait un **défaut de résolveur**, c’est-à-dire un problème sur le capteur chargé de mesurer la position du rotor du moteur. À première vue, cela pouvait faire penser à un capteur défaillant, à un souci de connectique, à un défaut de câblage ou à une électronique de lecture perturbée. Mais en avançant dans l’analyse, j’ai compris que cette panne racontait en réalité quelque chose de beaucoup plus intéressant : **ce n’était pas le résolveur qui était véritablement en cause, mais la mécanique du moteur elle-même.**
 ![Défaut Résolveur](https://github.com/user-attachments/assets/16d58f01-2724-42e3-8e14-1af2a854d671)

La conclusion finale a été la suivante : **un roulement bloqué par l’oxydation empêchait le déplacement axial normal du rotor lors de sa dilatation thermique, ce qui reportait les efforts sur l’autre palier, provoquait un déplacement parasite du rotor, puis un désalignement du résolveur, et enfin un défaut de position interprété comme un défaut capteur.** Dit autrement, le calculateur voyait bien une information incohérente, mais la source profonde de cette incohérence n’était pas électronique. Elle était mécanique.

Cet article est le récit complet de cette réparation. Il explique non seulement le déroulement du démontage et du diagnostic, mais aussi les raisons physiques qui rendent cette panne cohérente. Il parle de **moteur synchrone à rotor bobiné**, de **roulements**, de **dilatation thermique**, de **collecteur et de charbons**, de **signaux SIN/COS**, de **résolveur**, de **calcul angulaire**, et surtout de la manière dont tous ces éléments interagissent dans un moteur de traction que beaucoup considèrent comme non réparable.
![Eclaté Zoé](https://github.com/user-attachments/assets/9b9430e3-1291-4539-8fdf-7e7d6ea0edcb)

---

# Pourquoi cette panne méritait d’être comprise

Lorsque Renault conclut à un remplacement complet, cela ne signifie pas forcément que le moteur est irréparable. Cela signifie souvent que **la réparation détaillée n’entre pas dans le cadre économique, procédural ou opérationnel du réseau**. Dans le cas d’une Zoé ancienne, cela revient facilement à enterrer le véhicule, alors même qu’il peut ne souffrir que d’un défaut très localisé. J’ai donc abordé cette voiture non pas comme une simple occasion en panne, mais comme un cas d’étude grandeur nature.

L’intérêt était double. D’un côté, il y avait une motivation évidente de remise en état. De l’autre, il y avait une vraie curiosité technique. La Zoé est un véhicule intéressant parce qu’il repose sur des choix de motorisation spécifiques, notamment l’usage d’un **moteur synchrone à rotor bobiné**, ce qui l’éloigne de nombreuses architectures à aimants permanents très courantes ailleurs. Cette particularité impose des contraintes et des solutions mécaniques particulières, en particulier autour de l’alimentation rotorique, du collecteur, des charbons et du comportement axial de l’ensemble tournant.

Très rapidement, il m’est apparu que le défaut ne pouvait pas être traité correctement sans remonter à cette logique d’ensemble.

J'ai d'abord commencé par reprendre le schéma de l'électronique moteur pour mieux comprendre les différents éléments, chargeur, onduleur, moteur, batterie...
![SchémaElectronique](https://github.com/user-attachments/assets/18e0940c-7cc6-462d-99c3-be1de1b6028d)


![Schéma](https://github.com/user-attachments/assets/eaf1e4d1-d8a4-4dc4-83c0-0923f159fe42)

---

# Mise en sécurité : la seule manière sérieuse d’ouvrir un moteur de Zoé

Avant tout démontage, la première étape a évidemment été la **mise en sécurité haute tension**. Cela paraît évident, mais c’est le genre d’évidence qu’il faut quand même écrire noir sur blanc lorsqu’on documente ce type d’intervention. Une Zoé n’est pas une voiture thermique sur laquelle on peut ouvrir tranquillement l’organe principal après avoir simplement débranché la batterie 12 V. Ici, la chaîne de traction travaille avec des tensions élevées, et toute intervention sur le groupe motopropulseur impose une discipline stricte.

La logique a donc été de procéder comme sur toute intervention sérieuse sur un véhicule électrique : immobilisation du véhicule, gestion de l’alimentation auxiliaire, isolement de la chaîne haute tension, puis vérification de l’absence de tension selon une méthode rigoureuse. Tant que cette séquence n’est pas terminée, il n’y a pas vraiment de démontage. Il n’y a qu’une prise de risque inutile.

Cette étape ne raconte pas encore la panne, mais elle conditionne toute la suite. Elle impose aussi un état d’esprit : ralentir, structurer, vérifier, et ne pas confondre enthousiasme technique et précipitation.

---

# Dépose du groupe motopropulseur

Une fois la voiture sécurisée, j’ai pu attaquer la dépose du groupe motopropulseur. Le moteur de Zoé forme avec le réducteur un ensemble compact, dense, et pas particulièrement conçu pour être agréable à autopsier. Tant que ce groupe reste en place dans la voiture, on ne voit à peu près rien de ce qui compte vraiment. Il faut donc accepter de travailler à l’échelle du sous-ensemble complet : déconnexion des câbles haute tension, déconnexion des connecteurs de commande, libération des périphériques et des supports, puis extraction du groupe moteur-réducteur.
![Moteur tombé](https://github.com/user-attachments/assets/fe139583-4aa1-42fe-993d-0781065fb08c)


Cette étape est plus physique qu’intellectuelle, mais elle est importante parce qu’elle permet ensuite de basculer dans une vraie logique de compréhension. Tant que le moteur est dans la voiture, on reste prisonnier de la logique “pièce à remplacer”. Une fois sur l’établi, on peut enfin commencer à raisonner sur la mécanique réelle.

![Depose Cardans](https://github.com/user-attachments/assets/aa644e7c-765c-44e5-9f80-cdabd4e60fa0)
![Suspension groupe Moteur](https://github.com/user-attachments/assets/2db02919-cabd-4384-9f55-960f97e8e5bf)

---

# Quelques rappels sur le moteur de la Zoé

![Ensemble](https://github.com/user-attachments/assets/6f3a6a7e-7e9d-43d9-ad18-d932f2caaec2)

La Renault Zoé appartient à une famille de véhicules électriques utilisant un **moteur synchrone à rotor bobiné**. Renault a beaucoup communiqué sur ce choix, en particulier pour souligner qu’il permettait d’éviter l’usage systématique d’aimants permanents à terres rares. Sur le plan du principe, cela signifie que le champ rotorique n’est pas fourni uniquement par des aimants fixes, mais par un rotor portant un enroulement alimenté. Dans la littérature électrotechnique générale, les **machines synchrones à rotor bobiné** sont bien connues, de même que les architectures classiques dans lesquelles l’alimentation du rotor passe par des **bagues et balais**, ou plus largement par un système de contact électrique sur la partie tournante.

![Rotor dans l'usine](https://github.com/user-attachments/assets/cf6edfbc-e0b8-4350-a932-4c792afbbc09)
L’intérêt de cette technologie est réel : elle permet d’ajuster le comportement magnétique du rotor tout en évitant certains compromis imposés par les aimants permanents. Mais cela a aussi une conséquence très concrète : la machine n’est pas seulement un bel objet électromagnétique. C’est aussi un assemblage mécanique qui doit faire cohabiter **rotor**, **collecteur**, **charbons**, **roulements**, **dilatation thermique**, **capteur de position** et **hauts régimes de rotation**.

Dans le cas de la Zoé, ces éléments ne peuvent pas être pensés séparément. La panne que j’ai rencontrée le montre parfaitement : ce qui se dégrade dans un roulement finit par se lire au niveau du capteur de position, puis au niveau du calculateur de traction.

---

# Le résolveur : rôle, principe et sensibilité au montage
![Bobinages Résolveur](https://github.com/user-attachments/assets/84ceca3e-878e-43fe-a585-06617bf29dc4)
Le **résolveur** est le capteur qui donne au calculateur la **position instantanée du rotor**. Sur le plan physique, il s’agit d’un dispositif électromagnétique que l’on peut assimiler à une forme de **transformateur rotatif**. On excite un enroulement avec un signal alternatif, puis on récupère sur deux enroulements statoriques disposés à 90° deux tensions analogiques qui suivent respectivement les fonctions **sinus** et **cosinus** de la position angulaire.

![RefRésolveur](https://github.com/user-attachments/assets/6f8526a8-23a1-48d9-869f-6dc513fedbf3)

En théorie, le principe est simple. En pratique, cela signifie que toute la chaîne de commande dépend de la qualité de deux signaux analogiques qui doivent rester propres, équilibrés, bien déphasés et stables. Le calculateur peut ensuite reconstruire l’angle avec une relation du type :

```text
θ = atan2(SIN, COS)
```

Ce calcul est très puissant, parce qu’il permet de retrouver un angle sur 360° en tenant compte des quadrants. Mais il suppose que les voies `SIN` et `COS` représentent fidèlement la géométrie réelle du rotor. Si l’une des amplitudes chute, si le couplage magnétique se détériore, si le positionnement relatif des éléments devient mauvais, alors `atan2` continue à produire une valeur, mais cette valeur n’est plus forcément correcte. À partir de là, le calculateur ne “comprend” plus correctement la position du rotor, et le moteur ne peut plus être piloté proprement.

C’est la raison pour laquelle un **défaut résolveur** peut parfaitement être le symptôme d’un problème mécanique. Le calculateur ne voit pas la cause profonde ; il voit uniquement que la mesure de position n’est plus crédible.

---

# Premiers indices : le résolveur n’avait pas le profil d’un capteur vraiment mort

Très tôt dans l’analyse, j’ai utilisé un **variateur industriel** comme source d’excitation pour faire des essais sur le résolveur. Le but n’était pas de faire tourner le moteur en charge, mais de disposer d’une excitation stable et de pouvoir **observer les voies SIN/COS en tournant le moteur à la main**. Cette méthode, très simple dans son principe, a été extrêmement utile.
![Resolveur](https://github.com/user-attachments/assets/a94893ab-8467-47fa-949c-37ab147895f9)

Elle m’a permis d’observer les niveaux de tension, de vérifier la présence des signaux, et surtout de constater quelque chose de très important : **les niveaux de tension SIN/COS étaient plus élevés avec un moteur correctement monté**, et, dans certaines configurations, le défaut disparaissait. Cette observation m’a tout de suite éloigné de l’hypothèse d’un résolveur purement détruit. Un capteur vraiment mort ne s’améliore pas parce que son environnement mécanique devient plus cohérent. En revanche, un capteur sain ou partiellement sain peut très bien devenir illisible si le **couplage magnétique** qu’il exploite n’est plus correctement assuré.

À ce stade, le problème se redéfinissait donc de lui-même : il ne s’agissait plus seulement de savoir si le résolveur était bon ou mauvais, mais **ce qui, dans le moteur, pouvait modifier assez fortement sa géométrie magnétique pour perturber les signaux analogiques.**

---

# Le cœur du problème : la dilatation thermique du rotor

Le point clé de toute cette panne est en réalité très mécanique. En fonctionnement, le **rotor chauffe**. En chauffant, il **s’allonge** légèrement. Ce comportement est normal. Il n’a rien d’exceptionnel. Toute la difficulté consiste à concevoir un montage qui accepte cette variation de longueur sans créer d’efforts parasites, sans faire migrer l’ensemble tournant dans le mauvais sens, et sans perturber les organes périphériques.

Dans ce moteur, l’architecture des roulements semble justement répondre à cette logique. **Le roulement côté réducteur est fixe.** Il sert d’appui de référence. **Le roulement côté collecteur de charbons, en revanche, est conçu pour être mobile axialement**, avec l’aide d’une **rondelle ressort**. Ce n’est pas un hasard, ni une tolérance de fabrication : c’est un choix fonctionnel. Ce roulement arrière doit pouvoir **avancer ou reculer légèrement** pour absorber la dilatation thermique du rotor. L’ensemble n’est donc pas monté comme deux paliers rigidement figés. Il y a un palier de position et un palier de compensation.

L’autre détail très important, qui confirme cette logique, est que **le collecteur des charbons est suffisamment large pour accepter ce déplacement**. Là encore, ce n’est pas un détail. Cela signifie que le déplacement axial du rotor n’est pas une anomalie en soi. Il est prévu, et le système de contact électrique a été conçu pour l’accepter.

Autrement dit, **le rotor a le droit de bouger axialement dans certaines limites**. Mais il doit bouger au bon endroit, de la bonne manière, et sous le contrôle du montage prévu pour cela.

![Eclaté Moteur](https://github.com/user-attachments/assets/43d58407-d6c4-4cc5-9ceb-88f91c37b893)
![DocRENAULT](https://github.com/user-attachments/assets/7e9cdfb5-10ee-47e3-8ae5-c6f093f910f4)


---

# Quand le montage prévu cesse de fonctionner : le rôle de l’oxydation

Le problème apparaît lorsque le **roulement arrière**, celui qui devrait justement pouvoir accompagner ce mouvement, **se bloque**. Dans le moteur que j’ai ouvert, il y avait de l’**oxydation**. Cet élément n’est pas secondaire ; il fait partie du scénario de panne. L’oxydation, selon son emplacement et son niveau, peut transformer un organe qui devrait coulisser légèrement en un organe pratiquement figé. Si le roulement arrière n’est plus libre axialement, alors le rotor, lui, continue malgré tout à se dilater lorsqu’il chauffe.
![oxyd](https://github.com/user-attachments/assets/2c224d88-78ca-41c7-b31d-306b5cc4de4c)

Et c’est là que la logique du montage bascule. La dilatation thermique ne disparaît pas parce qu’un roulement est grippé. Elle se reporte. Si le **palier mobile** ne peut plus jouer son rôle, les contraintes vont se décharger ailleurs, en particulier sur le **palier fixe**, côté réducteur. Dans le cas présent, c’est exactement ce qui semble s’être produit : **le roulement arrière ne reculait plus, et c’est le roulement avant qui a commencé à se déplacer**.

Ce point est fondamental, parce qu’il explique la panne complète. Le déplacement du roulement avant modifie alors la position axiale du rotor. Or le résolveur dépend d’un couplage magnétique précis entre ses différentes parties. Dès que le rotor se décale axialement, la **plaque du circuit magnétique** ne se retrouve plus correctement en face des **bobinages du résolveur**. Le signal se dégrade, les amplitudes deviennent incohérentes, et le calculateur finit par conclure à un **défaut résolveur**.

---

# Le moment de compréhension : relier le roulement au résolveur

Le véritable moment de bascule intellectuelle a été celui où j’ai compris qu’il fallait relier le problème de roulement à la **géométrie magnétique du résolveur**. Tant que l’on pense “capteur”, on cherche un capteur défectueux. Dès qu’on pense “position relative du circuit magnétique”, on cherche au contraire ce qui a déplacé le rotor là où il ne devait pas être.

C’est ce raisonnement qui a permis de sortir du diagnostic simpliste. Le défaut résolveur n’était pas un mensonge. C’était une **conséquence correcte d’un système qui n’était plus aligné mécaniquement**. À partir du moment où cette idée devient claire, toute la suite s’ordonne naturellement : il faut regarder les roulements, leur montage, leur référence, leur retenue, leur liberté axiale, la présence éventuelle d’oxydation, et la manière dont le rotor se positionne à chaud comme à froid.

---

# Les roulements : références, contraintes et choix de remplacement

Les échanges et les observations m’ont permis d’identifier plusieurs références utiles. Côté transmission, le roulement d’origine était un **NTN 2TS2 - 6007NCM30PX31V71**, avec une **gorge extérieure pour circlip NR** et un montage adapté à une utilisation à haut régime, de l’ordre de **12 000 tr/min**. C’est important, parce qu’à cette vitesse il ne suffit pas de monter “un 6007 quelconque”. Le type de flasque, le jeu interne, la vitesse admissible et le mode de retenue dans le carter comptent réellement.
![Roulement coté charbons](https://github.com/user-attachments/assets/fba2fe05-d9a9-4a0f-b0ee-5b156ef90991)

Parmi les références envisagées ou utilisées en remplacement, on retrouve notamment :

- **6206**
- **6007 ZZ**
- **6007-2RS-NR**
- des variantes **LLB/5K chez NTN**
- des références évoquées comme **6007 LHA NR** ou approchantes
- un remplacement de type **6007 ZZ C3 P6 Z3V3**

Le point déterminant n’était pas seulement le diamètre. Il fallait aussi respecter au mieux la **vitesse admissible**, la **faible friction**, la **retenue axiale** et la réalité du carter. Lorsque le remplacement ne reproduisait pas exactement la géométrie d’origine, notamment en l’absence de **gorge NR** permettant l’usage du circlip, j’ai compensé en **collant le roulement dans le boîtier avec du Loctite de frettage**, d’abord pensé en **638**, puis avec de la **648** selon disponibilité.

Cette adaptation n’est pas anodine. Elle rappelle qu’une réparation sérieuse n’est pas qu’une question de référence dimensionnelle ; c’est une question de **fonction mécanique reconstituée**.

---

# Loctite 638, Loctite 648 et logique de retenue

Le choix d’un produit de retenue type **Loctite 638/648** répond ici à un besoin très concret : si le roulement de remplacement ne possède pas la rainure de retenue pour circlip, alors il faut reconstruire une fonction de maintien axial ou de tenue dans le carter. Un collage de frettage est une réponse classique dans l’industrie lorsqu’il s’agit de rattraper un montage ou de fiabiliser une retenue, à condition que l’on sache ce que l’on fait.
![colle](https://github.com/user-attachments/assets/6e0a2cf9-7242-4bf9-b1f0-092cddbf6a6e)

Cela implique toutefois un corollaire pratique : **pour démonter ultérieurement, il faut souvent chauffer**. Ce point est utile à mentionner, parce qu’il évite de considérer le collage comme une “astuce” sans conséquence. C’est un vrai choix d’assemblage, avec ses avantages et ses contraintes.

---

# Pourquoi 12 000 tr/min changent complètement la lecture de la panne

J’avais aussi calculé des ordres de grandeur de vitesse moteur :

- environ **12 000 tr/min à 135 km/h**
- environ **2 700 tr/min à 30 km/h**

Ces valeurs donnent immédiatement une autre dimension à la panne. À 12 000 tr/min, le rotor tourne à environ **200 tours par seconde**. À cette échelle, un léger désalignement répété, une migration axiale parasite ou un roulement qui travaille mal ne restent pas des détails longtemps. Ils deviennent des générateurs d’efforts, d’échauffement, de vibration, de dégradation du signal de position, puis d’erreur de pilotage.

Cela explique aussi pourquoi les choix de roulements d’origine sont plus subtils qu’ils n’en ont l’air, et pourquoi le montage axial du rotor est si critique. Un moteur qui ne tourne qu’à quelques centaines de tours par minute tolère beaucoup de choses. Un moteur de traction électrique compacte à haut régime en tolère nettement moins.

---

# `atan2`, SIN, COS : pourquoi l’électronique réagit logiquement

Le calculateur exploite les voies `SIN` et `COS` pour reconstruire l’angle du rotor via un calcul de type `atan2`. Tant que les signaux restent propres et bien orthogonaux, la position reconstruite est fidèle. Mais dès que le couplage magnétique se dégrade, `SIN` et `COS` cessent d’être de bons représentants de la réalité géométrique. L’électronique ne sait pas “deviner” qu’un roulement a bougé. Elle voit seulement une information angulaire devenue instable, mal proportionnée ou incohérente avec le reste de ses modèles internes.

Il n’y a donc rien d’étonnant à ce qu’un calculateur remonte un défaut résolveur dans une situation comme celle-ci. Du point de vue du logiciel, c’est même une conclusion rationnelle. Toute la valeur du diagnostic humain consiste justement à aller au-delà de cette première lecture et à se demander : **qu’est-ce qui a fait mentir le signal ?**

---

# Réparation : remettre le système fonctionnel dans son état cohérent

La réparation n’a donc pas consisté simplement à changer “le roulement qui semblait mauvais”. Elle a consisté à **restaurer une architecture fonctionnelle complète** :

- un **roulement fixe** côté réducteur ;
- un **roulement mobile** côté charbons ;
- une **rondelle ressort** active ;
- une possibilité réelle de déplacement axial contrôlé ;
- un **collecteur** acceptant ce déplacement ;
- un **rotor** de nouveau correctement positionné ;
- un **résolveur** réaligné avec son environnement magnétique.

Autrement dit, ce que j’ai réparé, ce n’est pas seulement un moteur. C’est la cohérence entre **thermique**, **mécanique** et **mesure de position**.

Vue du collecteur du rotor après nettoyage et correction de la surface. La bosse trahissait un problème depuis longtemps
![Bague Collecteur](https://github.com/user-attachments/assets/d38e012d-7504-48a9-9355-0c1ff25a3bcf)

---

# Ce que cette panne m’a appris

Cette réparation m’a rappelé plusieurs choses très simples, mais qu’on oublie facilement lorsque l’électronique semble parler avec autorité.

La première, c’est qu’un **capteur signalé en défaut n’est pas forcément lui-même défaillant**. Il peut très bien être victime de la mécanique autour de lui.

La deuxième, c’est que les moteurs électriques modernes, même lorsqu’ils paraissent propres, compacts et presque “numériques” dans leur pilotage, restent des objets profondément mécaniques. Ils se dilatent. Ils s’usent. Ils s’oxydent. Ils se déplacent. Et quand ils le font, les algorithmes ne voient que les conséquences.

La troisième, c’est qu’un moteur annoncé comme pratiquement non réparable dans un cadre constructeur peut redevenir parfaitement compréhensible dès qu’on accepte de sortir de la logique “bloc à remplacer” pour entrer dans une logique d’**autopsie technique**.

---

# Conclusion

Au départ, il y avait une **Renault Zoé de 2016 achetée en panne**, un **défaut résolveur**, et une issue constructeur orientée vers le **remplacement complet du groupe motopropulseur**.

À l’arrivée, la panne se résume de manière beaucoup plus précise :

- le **rotor chauffe** en fonctionnement et **s’allonge** ;
- le montage prévoit cette dilatation grâce à un **roulement fixe** côté réducteur et un **roulement mobile** côté charbons, assisté par une **rondelle ressort** ;
- le **collecteur des charbons** est conçu pour accepter ce déplacement axial contrôlé ;
- mais lorsque le **roulement arrière se bloque par oxydation**, il ne peut plus jouer son rôle ;
- la contrainte se reporte alors sur le **roulement avant** ;
- le **rotor se décale axialement** ;
- le **résolveur se désaligne** ;
- les voies **SIN/COS** deviennent incohérentes ;
- et le calculateur conclut logiquement à un **défaut résolveur**.

Le résolveur n’était donc pas la cause première de la panne. Il en était le révélateur.

C’est précisément ce qui rend cette réparation intéressante : elle montre que sur un moteur de traction électrique, **la frontière entre mécanique et électronique n’existe pas vraiment**. L’une parle à travers l’autre. Et lorsque l’information devient fausse, il faut parfois commencer par regarder du côté du roulement.

![CT](https://github.com/user-attachments/assets/71647c25-bb54-45ef-8249-e41e9dc268b7)

Sur le trajet pour la revendre 2 ans plus tard!
![Compteur](https://github.com/user-attachments/assets/d4cbeb4c-a408-4f4e-8dc7-4e14e1376119)

---

# Références externes utiles

Les points généraux sur la Zoé, les machines synchrones, le rotor bobiné, le résolveur et le calcul `atan2` peuvent être replacés dans un cadre plus large grâce aux ressources suivantes :

- Renault Group, **Renault ZOE : moteur électrique à rotor bobiné**  
  https://www.renaultgroup.com/magazine/energies-et-motorisation/le-moteur-de-renault-zoe-puissance-et-efficacite-energetique/

- Renault Group, **Choix du rotor bobiné face aux aimants permanents**  
  https://www.renaultgroup.com/en/magazine/energy-and-motorization/e7a-the-next-gen-electric-motor-developed-by-renault-and-valeo/

- Wikipédia, **Renault Zoe**  
  https://fr.wikipedia.org/wiki/Renault_Zoe

- Wikipédia, **Machine synchrone**  
  https://fr.wikipedia.org/wiki/Machine_synchrone

- Wikipédia, **Rotor (électrotechnique)**  
  https://fr.wikipedia.org/wiki/Rotor_%28%C3%A9lectrotechnique%29

- Wikipédia, **Résolveur (électrotechnique)**  
  https://fr.wikipedia.org/wiki/R%C3%A9solveur_%28%C3%A9lectrotechnique%29

- Wikipédia, **atan2**  
  https://fr.wikipedia.org/wiki/Atan2

- Tamagawa Seiki, **VR type resolver**  
  https://www.tamagawa-seiki.co.jp/products/resolver-synchro/vr-type-resolver-singlsyn-large.html

---

# Emplacements à compléter avec les médias

## Photos à insérer
- voiture achetée en panne
- groupe motopropulseur en place
- mise en sécurité
- dépose du moteur
- ouverture du moteur
- détail collecteur / charbons
- détail oxydation
- roulement avant
- roulement arrière
- remontage
- état final

## Mesures à insérer
- capture oscilloscope des voies `SIN/COS`
- comparaison signaux conformes / signaux dégradés
- photo du montage d’essai avec variateur industriel

## Schémas à insérer
- principe du montage axial du rotor
- rôle de la rondelle ressort
- blocage du roulement arrière
- déplacement du roulement avant
- désalignement du résolveur
