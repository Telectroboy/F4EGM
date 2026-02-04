# Radio&Tech - F4EGM

Blog Hexo **Radio&Tech - F4EGM**, hébergé sur GitHub Pages.  
Contenu : radio amateur, SDR, électronique, domotique, antennes, logiciels — en lien avec le [forum F4EGM](https://f4egm.forumactif.com/) et le [profil QRZ](https://www.qrz.com/db/F4EGM).

---

## Prérequis

- **Node.js** 18 ou plus ([nodejs.org](https://nodejs.org/))
- Un compte **GitHub**

---

## Installation

```bash
cd F4EGM
npm install
```

---

## Lancer le site en local

```bash
npm run server
```

Ouvrir [http://localhost:4000](http://localhost:4000).

---

## Déploiement sur GitHub Pages

1. Créez un dépôt **GitHub** (ex. `F4EGM`) et poussez ce projet.
2. Dans **Settings → Pages** du dépôt :
   - **Source** : **GitHub Actions**.
3. Dans `_config.yml`, remplacez **USERNAME** par votre identifiant GitHub :
   - `url: https://USERNAME.github.io/F4EGM`
   - `root: /F4EGM/`
   - `deploy.repo: https://github.com/USERNAME/F4EGM.git`
4. À chaque push sur `main`, le workflow `.github/workflows/pages.yml` construit le site et le publie.

---

## Ajouter ou modifier des billets (interface simple)

### 1. En local (recommandé)

- **Nouveau billet** :
  ```bash
  npx hexo new "Mon titre"
  ```
  Un fichier est créé dans `source/_posts/` (ex. `mon-titre.md`). Éditez-le avec Cursor, Notepad++, etc.

- **Modifier un billet** : ouvrir le `.md` correspondant dans `source/_posts/` et sauvegarder.

### 2. Sur GitHub (sans rien installer)

- Aller sur le dépôt → dossier `source/_posts/`.
- **Nouveau billet** : **Add file → Create new file**, nommer `YYYY-MM-DD-titre.md`.
- **Modifier** : cliquer sur un fichier → **Edit** (crayon).

Pour une interface type « back-office » (formulaires, prévisualisation), vous pouvez ajouter [Decap CMS](https://decapcms.org/) (ex-Netlify CMS) : un fichier `admin/config.yml` et une page `admin/index.html` pointant vers le dépôt ; voir la doc Decap pour GitHub.

En-tête type pour un billet :

```yaml
---
title: Titre du billet
date: 2026-02-04 12:00:00
categories: SDR
tags: [openwebrx, docker]
---
```

Puis le contenu en **Markdown** en dessous.

### 3. Photos et fichiers

- **Option activée** : `post_asset_folder: true` dans `_config.yml`.
- Quand vous créez un billet `mon-sujet.md`, créez un dossier **du même nom** à côté : `source/_posts/mon-sujet/`.
- Mettez-y vos images (ex. `schema.png`) et dans le billet :
  ```markdown
  ![Légende](schema.png)
  ```
- Fichiers (PDF, ZIP, etc.) : même dossier, puis lien `[Télécharger le PDF](fichier.pdf)`.

### 4. Liens vers vos dépôts GitHub

En Markdown dans le billet :

```markdown
- Code : [mon-projet](https://github.com/USERNAME/mon-projet)
- Documentation : [wiki du repo](https://github.com/USERNAME/mon-projet/wiki)
```

---

## Import depuis le forum F4EGM

Pour importer **exhaustivement** les sujets du forum en billets Hexo :

```bash
npm run import:forum
```

Le script :

- **Découvre tous les sujets** : parcourt la page d’accueil du forum et les sections configurées (SDR, Electronique, Domotique, etc.).
- **Récupère tous les messages** de chaque sujet (premier message + réponses), y compris les pages suivantes (pagination).
- **Télécharge toutes les images** : extrait les liens vers les photos, les enregistre dans `source/images/imported/<slug-sujet>/` et remplace les URLs par des chemins locaux pour un affichage sur le blog.
- **Nettoie le contenu** : retire les blocs de profil (Admin, Messages : 69, Date d’inscription, Age, Localisation, etc.), « J’aime / Je n’aime pas », « Partager cet article », « Contenu sponsorisé », et autres éléments inutiles pour un affichage plus propre.

Les billets sont créés dans `source/_posts/` avec la catégorie appropriée. Vous pouvez ajuster les sections du forum dans `scripts/import/import-forum.js` (constante `FORUM_SECTIONS`).

---

## Import des infos QRZ

Pour mettre à jour la page « À propos » avec les infos publiques QRZ (indicatif, pays, QSL) :

```bash
npm run import:qrz
```

- Écrase `source/about/index.md`.  
- QRZ n’expose que peu d’infos sans connexion ; le lien vers votre page QRZ reste dans la page.

---

## Commentaires (Giscus)

Les commentaires sont gérés par [Giscus](https://giscus.app/) (GitHub Discussions).

1. Sur le dépôt GitHub : **Settings → General** → activer **Discussions**.
2. Aller sur [giscus.app](https://giscus.app/), choisir votre dépôt et la catégorie (ex. Announcements).
3. Récupérer **Repository ID** et **Category ID**.
4. Dans `_config.yml`, section `giscus` :
   - `repo: USERNAME/F4EGM`
   - `repo_id: "..."` (valeur fournie par Giscus)
   - `category_id: "..."` (valeur fournie par Giscus)

Après un nouveau déploiement, les commentaires s’affichent sous chaque billet.

---

## Catégories (alignées avec le forum)

Dans le front matter des billets, utilisez une des catégories définies dans `_config.yml` :

- SDR, Electronique, Domotique, Mécanique, Antennes, Logiciels, BlaBla  
- Technique/propag./calculs, Petites Annonces  

Exemple : `categories: SDR` ou `categories: [SDR, Logiciels]`.

---

## Commandes utiles

| Commande            | Description                    |
|---------------------|--------------------------------|
| `npm run server`    | Serveur local (port 4000)      |
| `npm run build`     | Génère le site dans `public/`  |
| `npm run clean`     | Nettoie le cache et `public/`  |
| `npm run new "Titre"` | Crée un nouveau billet      |
| `npm run import:forum` | Import des sujets forum   |
| `npm run import:qrz`   | Mise à jour page À propos  |

---

## Licence

Contenu du blog : à votre convenance.  
Hexo et les thèmes ont leurs propres licences.
