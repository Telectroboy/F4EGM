---
title: "TeslaMate 3.0 : corriger l’erreur PostgreSQL \"collation version mismatch\" et restaurer Grafana"
date: 2026-03-06
draft: false
author: "F4EGM"
tags: ["teslamate", "postgresql", "docker", "grafana", "tesla", "linux", "backup"]

cover:
  image: "https://github.com/user-attachments/assets/9903f846-0989-4768-b309-c931b5bb9ad5"
---



# Mise à jour TeslaMate 3.0 : erreur PostgreSQL et Grafana vide

J'ai récemment mis à jour mon installation **TeslaMate vers la version
3.0** sur un serveur Debian exécuté via Docker.

TeslaMate est un projet open source permettant d'enregistrer toutes les
données d'un véhicule Tesla et de les visualiser via Grafana.

Projet officiel :\
https://github.com/teslamate-org/teslamate

Après la mise à jour, deux problèmes sont apparus immédiatement :

1.  **Erreur PostgreSQL : collation version mismatch**
2.  **Dashboards Grafana vides**

Le problème est connu et documenté ici :\
https://github.com/teslamate-org/teslamate/issues/5157

------------------------------------------------------------------------

# Architecture TeslaMate

TeslaMate utilise plusieurs composants :

    Tesla API
        │
        ▼
    TeslaMate (collecte)
        │
        ▼
    PostgreSQL (base principale)
        │
        ├── données historiques
        │
        ▼
    InfluxDB (métriques)
        │
        ▼
    Grafana (visualisation)

------------------------------------------------------------------------

# Contexte de l'installation

Installation Docker avec les conteneurs :

-   teslamate
-   postgres
-   grafana
-   influxdb
-   mosquitto

Après la mise à jour vers TeslaMate 3.0 et PostgreSQL 17, les logs
affichaient :

    WARNING: database "teslamate" has a collation version mismatch
    DETAIL: The database was created using collation version 2.36, but the operating system provides version 2.41.

------------------------------------------------------------------------

# Pourquoi cette erreur apparaît-elle ?

L'erreur de collation PostgreSQL apparaît généralement après une **mise
à jour du système Linux ou de PostgreSQL**.

PostgreSQL utilise la bibliothèque système **glibc** pour gérer les
règles de tri des caractères (collations).

Lorsqu'une nouvelle version de glibc est installée, les règles de tri
peuvent changer.

------------------------------------------------------------------------

# Schéma explicatif : PostgreSQL / glibc / index

               glibc
         (règles linguistiques)
                 │
                 ▼
           Collation système
                 │
                 ▼
            PostgreSQL
                 │
                 ▼
             Index texte
                 │
                 ▼
          Requêtes SQL et tri

Si glibc change de version :

    ancienne base -> collation 2.36
    nouveau système -> collation 2.41

Les index ont été construits avec l'ancienne règle de tri.

PostgreSQL détecte donc un risque d'incohérence.

------------------------------------------------------------------------

# Illustration simple du problème de collation

Ancienne règle :

    é < e

Nouvelle règle possible :

    e < é

Si un index a été construit avec l'ancienne règle, les recherches
peuvent devenir incorrectes.

C'est pour cela que PostgreSQL demande de **reconstruire les index**.

------------------------------------------------------------------------

# Vérifier que les données existent toujours

Avant toute manipulation, il faut vérifier que les données sont toujours
présentes.

Exemple :

    docker compose exec -T database psql -U teslamate -d teslamate -c "SELECT count(*) FROM drives;"

Dans mon cas :

    19586

Les données étaient donc bien présentes.

------------------------------------------------------------------------

# Correction du problème

La solution consiste à :

1.  **reindexer la base**
2.  **mettre à jour la version de collation**

## Reindexation

    docker compose exec -T database psql -U teslamate -d teslamate -c "REINDEX DATABASE teslamate;"

Cette opération peut prendre plusieurs minutes si la base contient
beaucoup de positions GPS.

## Mise à jour de la collation

    docker compose exec -T database psql -U teslamate -d teslamate -c "ALTER DATABASE teslamate REFRESH COLLATION VERSION;"

------------------------------------------------------------------------

# Corriger les bases système PostgreSQL

Le même problème peut apparaître dans les bases système :

    postgres
    template1

Correction :

    docker compose exec -T database psql -U teslamate -d postgres -c "ALTER DATABASE postgres REFRESH COLLATION VERSION;"
    docker compose exec -T database psql -U teslamate -d postgres -c "REINDEX DATABASE postgres;"

Puis :

    docker compose exec -T database psql -U teslamate -d postgres -c "ALTER DATABASE template1 REFRESH COLLATION VERSION;"
    docker compose exec -T database psql -U teslamate -d template1 -c "REINDEX DATABASE template1;"

------------------------------------------------------------------------

# Grafana affiche des dashboards vides

Après correction de la base PostgreSQL, les dashboards Grafana peuvent
rester vides.

La solution est simple.

Dans **Grafana** :

    Connections → Data Sources → TeslaMate

Cliquer sur :

    Save & Test

Résultat :

    Database Connection OK

Les dashboards se remettent immédiatement à afficher les données.

------------------------------------------------------------------------

# Mise en place d'une sauvegarde automatique

Une fois le système réparé, il est essentiel de mettre en place une
sauvegarde automatique.

## Script de sauvegarde

Créer :

    ~/teslamate/script/backup_teslamate.sh

    #!/usr/bin/env bash
    set -euo pipefail

    BACKUP_DIR="/mnt/backup/teslamate"
    COMPOSE_DIR="/home/festiassist/teslamate"

    DATE="$(date +%F_%H-%M-%S)"
    FILE="${BACKUP_DIR}/teslamate_${DATE}.sql"

    mkdir -p "${BACKUP_DIR}"

    cd "${COMPOSE_DIR}"

    docker compose exec -T database pg_dump -U teslamate teslamate > "${FILE}"

    gzip "${FILE}"

    find "${BACKUP_DIR}" -type f -name 'teslamate_*.sql.gz' -mtime +90 -delete

    echo "Sauvegarde terminée : ${FILE}.gz"

Rendre le script exécutable :

    chmod +x ~/teslamate/script/backup_teslamate.sh

------------------------------------------------------------------------

# Tester la sauvegarde

    sudo ~/teslamate/script/backup_teslamate.sh

Résultat :

    Sauvegarde terminée : /mnt/backup/teslamate/teslamate_YYYY-MM-DD_HH-MM-SS.sql.gz

------------------------------------------------------------------------

# Automatiser la sauvegarde

Éditer la crontab root :

    sudo crontab -e

Ajouter :

    0 4 * * 1 /home/festiassist/teslamate/script/backup_teslamate.sh >> /var/log/teslamate_backup.log 2>&1

Sauvegarde :

-   chaque lundi
-   à 04h00

------------------------------------------------------------------------

# Vérifier le fonctionnement

Logs :

    cat /var/log/teslamate_backup.log

Sauvegardes :

    ls -lh /mnt/backup/teslamate

------------------------------------------------------------------------

# Conclusion

Après la mise à jour vers TeslaMate 3.0 :

-   l'erreur PostgreSQL provenait d'une **mise à jour de glibc**
-   les index devaient être reconstruits
-   Grafana nécessitait simplement un **rafraîchissement de datasource**
-   une **sauvegarde automatique** a été mise en place

Le système est maintenant stable et sécurisé.
