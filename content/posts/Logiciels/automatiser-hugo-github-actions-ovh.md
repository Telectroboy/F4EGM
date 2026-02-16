---
title: "Automatiser Hugo avec GitHub Actions vers OVH"
date: 2026-02-16
author: "F4EGM"
tags: ["hugo", "github", "github-actions", "ci-cd", "ovh", "devops", "automation"]
---
# Automatiser Hugo avec GitHub Actions vers OVH

## Contexte

Ce site fonctionne avec Hugo
[![Image](https://gohugo.io/images/hugo-logo-wide.svg)
https://gohugo.io/

Jusqu'à présent, la mise à jour du site se faisait ainsi :

1.  hugo --minify\
2.  Upload manuel via FileZilla vers l'hébergement OVH

Cela fonctionne, mais ce n'est ni reproductible ni optimal.

Objectif : un simple `git push` doit publier automatiquement le site.

Et donc tout migrer sur GitHub!

![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png)
https://github.com/Telectroboy/F4EGM

------------------------------------------------------------------------

## Structure du dépôt

Le dépôt contient :

-   hugo.toml\
-   content/\
-   themes/PaperMod/ (ajouté via submodule Git)\
-   .github/workflows/

Ajout du thème PaperMod en submodule :

git submodule add https://github.com/adityatelange/hugo-PaperMod.git
themes/PaperMod\
git commit -m "Add PaperMod as submodule"\
git push

------------------------------------------------------------------------

## GitHub Actions

Fichier : `.github/workflows/deploy-ovh.yml`

``` yaml
name: Build & Deploy Hugo to OVH

on:
  push:
    branches: ["master"]

permissions:
  contents: read

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout (with submodules)
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "0.155.3"
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy to OVH (FTP)
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.OVH_FTP_SERVER }}
          username: ${{ secrets.OVH_FTP_USERNAME }}
          password: ${{ secrets.OVH_FTP_PASSWORD }}
          local-dir: public/
          server-dir: ${{ secrets.OVH_FTP_DIR }}
```

------------------------------------------------------------------------

## Secrets GitHub

Dans Settings → Secrets and variables → Actions :

-   OVH_FTP_SERVER\
-   OVH_FTP_USERNAME\
-   OVH_FTP_PASSWORD\
-   OVH_FTP_DIR (souvent /www/)

------------------------------------------------------------------------

## Problème rencontré

Sans l'option :

submodules: true

Le thème n'était pas chargé lors du build GitHub Actions.

Résultat : Hugo générait uniquement des fichiers XML (RSS, sitemap) et
aucun HTML.

Après correction, les pages HTML ont bien été générées et synchronisées.

------------------------------------------------------------------------

## Déploiement différentiel

L'action FTP crée un fichier :

.ftp-deploy-sync-state.json

Après le premier déploiement, seuls les fichiers modifiés sont envoyés.

------------------------------------------------------------------------

## Workflow final

git add .\
git commit -m "Nouvel article"\
git push

→ Build automatique\
→ Génération Hugo\
→ Synchronisation FTP\
→ Site en ligne

------------------------------------------------------------------------

## Conclusion

GitHub Actions transforme un site statique Hugo en pipeline CI/CD propre
:
-   Plus de FTP manuel\
-   Historique des déploiements\
-   Synchronisation fiable\
-   Gain de temps

Le site devient un projet versionné, déployé automatiquement et
maintenable.
