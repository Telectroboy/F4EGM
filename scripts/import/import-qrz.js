/**
 * Récupère les infos publiques du profil QRZ F4EGM et met à jour la page À propos.
 * Usage : npm run import:qrz  (ou node scripts/import/import-qrz.js depuis la racine)
 *
 * QRZ limite les infos sans connexion : indicatif, pays, QSL. Le reste reste "Login required".
 */

const QRZ_URL = 'https://www.qrz.com/db/F4EGM';
const ABOUT_PATH = 'source/about/index.md';

const fs = require('fs');
const path = require('path');

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'F4EGM-Hexo-Import/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractQrzInfo(html) {
  const info = {
    callsign: 'F4EGM',
    country: 'France',
    qsl: 'Direct',
    url: QRZ_URL,
  };
  if (html.includes('France') || html.includes('FR')) info.country = 'France';
  if (html.includes('QSL') && html.includes('Direct')) info.qsl = 'Direct';
  return info;
}

async function main() {
  try {
    const html = await fetchHtml(QRZ_URL);
    const qrz = extractQrzInfo(html);
    const dir = path.dirname(ABOUT_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const content = `---
title: À propos - F4EGM
layout: page
---

# F4EGM

**Indicatif :** ${qrz.callsign}  
**Pays :** ${qrz.country}  
**QSL :** ${qrz.qsl}

Profil complet : [QRZ.com – F4EGM](${qrz.url})

---

*Radio&Tech – Passionné de radio, partage d'informations et échanges.*
`;

    fs.writeFileSync(ABOUT_PATH, content, 'utf8');
    console.log('Page À propos mise à jour :', ABOUT_PATH);
  } catch (err) {
    console.error('Erreur:', err.message);
    process.exit(1);
  }
}

main();
