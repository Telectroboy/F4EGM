#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
mkdir -p images/extraits-tiers

echo "Téléchargement de la photo de référence Techniczentrum..."
curl -fL --retry 3 \
  'https://techniczentrum.com/36678-large_default/module-abs-volkswagen-fox-5z0614117b-0265231626-0265800468-5z0907379a.jpg' \
  -o images/extraits-tiers/photo-abs-5z0907379a.jpg

echo "Terminé. Voir SOURCES.md avant publication."
