/**
 * Import des sujets du forum F4EGM (forumactif.com) vers des billets Hexo.
 * Nécessite Node.js 18+ et : npm install cheerio
 * Usage : npm run import:forum  (ou node scripts/import/import-forum.js depuis la racine)
 *
 * Les billets sont créés dans source/_posts/ avec les catégories du forum.
 * Les liens vers le forum sont conservés en fin d'article.
 */

const BASE = 'https://f4egm.forumactif.com';
const OUT_DIR = 'source/_posts';

// Liste des sujets connus (URL relative → catégorie). À compléter si besoin.
const TOPICS = [
  { url: '/t4-openwebrx', category: 'SDR', slug: 'openwebrx-plus' },
  { url: '/t31-blindages-rfi-emi', category: 'Electronique', slug: 'blindages-rfi-emi' },
  { url: '/t15-rtl-haos-passerelle-rtl-433-vers-home-assistant', category: 'Domotique', slug: 'rtl-haos-rtl433-home-assistant' },
  { url: '/t22-qfh-137mhz-pour-sat-meteo', category: 'Antennes', slug: 'qfh-137mhz-sat-meteo' },
  { url: '/t36-opengd77-version-2026', category: 'Logiciels', slug: 'opengd77-version-2026' },
  { url: '/t28-radio-3-des-90-9-fm', category: 'BlaBla', slug: 'radio-3-des-90-9-fm' },
  { url: '/t30-zone-de-fresnel-en-radio', category: 'Technique/propag./calculs', slug: 'zone-de-fresnel-radio' },
  { url: '/t13-cloud-de-l-asso-fa', category: 'Petites Annonces', slug: 'cloud-asso-festival-assistant' },
  { url: '/d10900959-groupe-electrogene', category: 'Petites Annonces', slug: 'groupe-electrogene' },
];

const fs = require('fs');
const path = require('path');

async function fetchHtml(url) {
  const u = url.startsWith('http') ? url : BASE + url;
  const res = await fetch(u, { headers: { 'User-Agent': 'F4EGM-Hexo-Import/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${u}`);
  return res.text();
}

function loadCheerio() {
  try {
    return require('cheerio');
  } catch (e) {
    console.error('Installez cheerio : npm install cheerio');
    process.exit(1);
  }
}

function escapeFrontMatter(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/[\r\n]/g, ' ').replace(/"/g, '\\"').trim();
}

function parseTopicPage(html, $) {
  const root = $.load(html);
  const titleEl = root('h2.topic-title a, .topictitle, h1').first();
  const title = titleEl.text().trim() || 'Sans titre';
  const bodyEl = root('.content, .postbody .content, .post').first();
  let content = bodyEl.html() || '';
  content = content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<a\s+href="([^"]+)"[^>]*>/gi, (_, href) => {
      const h = href.startsWith('http') ? href : (href.startsWith('/') ? BASE + href : BASE + '/' + href);
      return `[lien](${h})`;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p\b[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const dateEl = root('.author .date, .posted_since, .dates').first();
  let dateStr = dateEl.text().trim() || new Date().toISOString().slice(0, 10);
  const match = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/) || dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  const isoDate = match ? `${match[3]}-${match[2].padStart(2,'0')}-${match[1].padStart(2,'0')}` : new Date().toISOString().slice(0, 10);
  return { title, content, date: isoDate };
}

function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const $ = loadCheerio();
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const t of TOPICS) {
    try {
      console.log('Import:', t.url);
      const html = await fetchHtml(t.url);
      const { title, content, date } = parseTopicPage(html, $);
      const slug = t.slug || slugify(title);
      const filename = path.join(OUT_DIR, `${date}-${slug}.md`);
      const forumLink = BASE + t.url;
      const body = content
        ? content + `\n\n---\n*Article importé du [forum F4EGM](${forumLink})*`
        : `*Contenu à compléter. [Voir le sujet sur le forum](${forumLink})*`;

      const frontMatter = [
        '---',
        `title: "${escapeFrontMatter(title)}"`,
        `date: ${date} 12:00:00`,
        `categories: ${t.category}`,
        `tags: [forum, f4egm]`,
        '---',
        '',
        body,
      ].join('\n');

      fs.writeFileSync(filename, frontMatter, 'utf8');
      console.log('  ->', filename);
    } catch (err) {
      console.error('  Erreur:', err.message);
    }
  }
  console.log('Import terminé.');
}

main();
