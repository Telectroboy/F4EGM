/**
 * Import exhaustif du forum F4EGM (forumactif.com) vers des billets Hexo.
 * - Découvre tous les sujets depuis toutes les sections du forum
 * - Récupère tous les messages de chaque sujet (y compris pagination)
 * - Extrait et télécharge toutes les images, remplace par chemins locaux
 * - Nettoie le contenu (profils utilisateur, doublons, texte inutile)
 *
 * Usage : npm run import:forum  (depuis la racine du projet)
 * Nécessite : Node.js 18+, npm install cheerio
 */

const BASE = 'https://f4egm.forumactif.com';
const OUT_DIR = 'source/_posts';
const IMAGES_DIR = 'source/images/imported';

const fs = require('fs');
const path = require('path');

// Sections du forum (URL relative → nom catégorie pour Hexo)
// Les URLs peuvent varier ; la page d'accueil est aussi parcourue pour trouver tous les sujets.
const FORUM_SECTIONS = [
  { url: '/f1-sdr', category: 'SDR' },
  { url: '/f2-electronique', category: 'Electronique' },
  { url: '/f3-domotique', category: 'Domotique' },
  { url: '/f5-antennes', category: 'Antennes' },
  { url: '/f6-logiciels', category: 'Logiciels' },
  { url: '/f7-blabla', category: 'BlaBla' },
  { url: '/c1-associations', category: 'Petites Annonces' },
];

// Patterns à retirer du contenu pour un affichage propre
const CLEAN_PATTERNS = [
  /\bAdmin\s*Admin\b/gi,
  /\bMessages\s*:\s*\d+/gi,
  /\bDate\s*d'?inscription\s*:\s*[\d\/\s\-\.]+/gi,
  /\bAge\s*:\s*\d+/gi,
  /\bLocalisation\s*:\s*[A-Z0-9]+/gi,
  /\bMessages\s*:\s*\d+Date\s*d'?inscription[^A-Z]*/gi,
  /J'?aime\s*Je n'?aime pas/gi,
  /Partager cet article sur\s*:/gi,
  /Contenu sponsorisé/gi,
  /S'?enregistrer pour répondre|Se connecter pour répondre/gi,
  /^\s*#\s*Commentaires\s*$/gm,
  /^\s*\+\s*$/gm,
  /\s*\[\s*Re:\s*[^\]]+\]\s*\(\s*[^)]+#\d+\s*\)/g,
];

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i;

async function fetchHtml(url) {
  const u = url.startsWith('http') ? url : BASE + url;
  const res = await fetch(u, {
    headers: { 'User-Agent': 'F4EGM-Hexo-Import/1.0 (https://github.com/Telectroboy/F4EGM)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${u}`);
  return res.text();
}

async function downloadFile(url) {
  const u = url.startsWith('http') ? url : BASE + (url.startsWith('/') ? url : '/' + url);
  const res = await fetch(u, {
    headers: { 'User-Agent': 'F4EGM-Hexo-Import/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${u}`);
  return Buffer.from(await res.arrayBuffer());
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

function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanText(text) {
  let out = String(text || '');
  for (const re of CLEAN_PATTERNS) out = out.replace(re, '');
  return out.replace(/\n{3,}/g, '\n\n').replace(/\s{2,}/g, ' ').trim();
}

function parseDate(str) {
  if (!str) return null;
  const s = str.trim();
  const d = s.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
  if (d) return `${d[3]}-${d[2].padStart(2, '0')}-${d[1].padStart(2, '0')}`;
  const d2 = s.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (d2) return `${d2[1]}-${d2[2]}-${d2[3]}`;
  const d3 = s.match(/(\d{1,2})(\d{2})(\d{4})/);
  if (d3) return `${d3[3]}-${d3[2]}-${d3[1].padStart(2, '0')}`;
  return null;
}

/** Extrait les liens de sujets depuis une page HTML (index ou section) */
function extractTopicLinksFromPage($, html, defaultCategory) {
  const root = $.load(html);
  const links = [];
  root('a[href*="/t"], a[href*="/d"]').each((_, el) => {
    let href = root(el).attr('href') || '';
    href = href.replace(/^https?:\/\/[^/]+/, '').split('#')[0].split('?')[0];
    const match = href.match(/^\/([td]\d+[^\/]*)/);
    if (match) {
      const url = '/' + match[1].replace(/\/$/, '');
      if (!links.some((l) => l.url === url)) links.push({ url, category: defaultCategory });
    }
  });
  return links;
}

/** Découvre tous les liens de sujets depuis une section du forum */
async function discoverTopicLinks($, section) {
  try {
    const html = await fetchHtml(section.url);
    return extractTopicLinksFromPage($, html, section.category);
  } catch (e) {
    return [];
  }
}

/** Récupère l’URL absolue d’une image (lien ou img src) */
function resolveImageUrl(href) {
  if (!href || href.startsWith('data:')) return null;
  if (href.startsWith('http')) return href;
  return BASE + (href.startsWith('/') ? href : '/' + href);
}

/** Télécharge une image et retourne le chemin relatif pour le billet (dans images/imported/slug/) */
async function downloadImage(url, topicSlug, index) {
  const parsed = new URL(url, BASE);
  const pathname = parsed.pathname;
  const ext = (pathname.match(IMAGE_EXT) || [])[1] || 'jpg';
  const baseName = path.basename(pathname).replace(/\?.*$/, '') || `img-${index}.${ext}`;
  const safeName = baseName.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 80) || `img-${index}.${ext}`;
  const dir = path.join(IMAGES_DIR, topicSlug);
  const filePath = path.join(dir, safeName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const buf = await downloadFile(url);
  fs.writeFileSync(filePath, buf);
  return `/images/imported/${topicSlug}/${safeName}`;
}

/** Convertit le HTML d’un message en Markdown propre, extrait les images, les télécharge, remplace les URLs */
async function htmlToMarkdown(html, baseUrl, topicSlug, $, imageIndexRef) {
  if (!html || !html.trim()) return '';
  const root = $.load(html);

  root('script, style').remove();
  const contentEl = root.root();

  const imageUrls = [];
  contentEl.find('img[src]').each((_, el) => {
    const src = root(el).attr('src');
    const full = resolveImageUrl(src);
    if (full && !imageUrls.includes(full)) imageUrls.push(full);
  });
  contentEl.find('a[href]').each((_, el) => {
    const href = root(el).attr('href');
    if (href && IMAGE_EXT.test(href)) {
      const full = resolveImageUrl(href);
      if (full && !imageUrls.includes(full)) imageUrls.push(full);
    }
  });

  let text = contentEl.html() || '';
  for (const imgUrl of imageUrls) {
    const idx = imageIndexRef.current++;
    try {
      const relPath = await downloadImage(imgUrl, topicSlug, idx);
      text = text.replace(new RegExp(escapeRe(imgUrl), 'g'), relPath);
      const shortRe = new RegExp(escapeRe(imgUrl.replace(BASE, '')), 'g');
      text = text.replace(shortRe, relPath);
    } catch (e) {
      console.warn('  Image non téléchargée:', imgUrl.slice(0, 60) + '...');
    }
  }

  text = text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<img\b[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*>/gi, (_, src, alt) => `![${(alt || 'image').trim()}](${src})`);
  text = convertLinksToMarkdown(text, baseUrl);
  text = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p\b[^>]*>/gi, '\n')
    .replace(/<pre\b[^>]*>/gi, '\n```\n')
    .replace(/<\/pre>/gi, '\n```\n')
    .replace(/<code\b[^>]*>/gi, '`')
    .replace(/<\/code>/gi, '`')
    .replace(/<strong\b[^>]*>|<\/strong>/gi, '**')
    .replace(/<b\b[^>]*>|<\/b>/gi, '**')
    .replace(/<em\b[^>]*>|<\/em>/gi, '*')
    .replace(/<i\b[^>]*>|<\/i>/gi, '*')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return cleanText(text);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function convertLinksToMarkdown(html, baseUrl) {
  return html.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    const url = href.startsWith('http') ? href : (href.startsWith('/') ? BASE + href : baseUrl + href);
    const text = (label || '').replace(/<[^>]+>/g, '').trim() || url;
    if (IMAGE_EXT.test(url)) return `![image](${url})`;
    return `[${text}](${url})`;
  });
}

/** Parse une page de sujet : titre + tous les messages (posts) */
function parseTopicPage(html, $) {
  const root = $.load(html);
  const titleEl = root('h2.topic-title a, .topictitle, h1, .title').first();
  const title = titleEl.text().trim() || 'Sans titre';

  const posts = [];
  const postBlocks = root('.post, .row, .blockpost, [class*="post"]');
  if (postBlocks.length === 0) {
    const contentEl = root('.content, .postbody .content').first();
    const authorEl = root('.author, .postauthor').first();
    const dateEl = root('.author .date, .posted_since, .dates').first();
    const html = contentEl.html() || '';
    const author = (authorEl.text() || '').trim();
    const dateStr = (dateEl.text() || '').trim();
    posts.push({ author: cleanText(author), date: parseDate(dateStr), contentHtml: html });
  } else {
    postBlocks.each((_, block) => {
      const el = root(block);
      const contentEl = el.find('.content, .postbody .content, .post-body').first();
      if (contentEl.length === 0) return;
      const authorEl = el.find('.author, .postauthor, .username').first();
      const dateEl = el.find('.date, .posted_since, .dates').first();
      let author = (authorEl.text() || '').trim();
      let dateStr = (dateEl.text() || '').trim();
      author = cleanText(author);
      const contentHtml = contentEl.html() || '';
      if (!contentHtml.trim()) return;
      posts.push({ author, date: parseDate(dateStr), contentHtml });
    });
  }

  if (posts.length === 0) {
    const bodyEl = root('.content, .postbody .content, .post').first();
    posts.push({
      author: 'Admin',
      date: null,
      contentHtml: bodyEl.html() || '',
    });
  }

  const firstDate = posts[0]?.date;
  const topicDate = firstDate || new Date().toISOString().slice(0, 10);
  return { title, topicDate, posts };
}

/** Récupère toutes les pages d’un sujet (pagination) */
async function fetchAllTopicPages(topicUrl, $) {
  const pages = [await fetchHtml(topicUrl)];
  const root = $.load(pages[0]);
  const pagination = root('a[href*="start="], .pagination a');
  const starts = new Set([0]);
  pagination.each((_, el) => {
    const href = root(el).attr('href') || '';
    const m = href.match(/start=(\d+)/);
    if (m) starts.add(parseInt(m[1], 10));
  });
  const sorted = [...starts].sort((a, b) => a - b);
  for (let i = 1; i < sorted.length; i++) {
    const sep = topicUrl.includes('?') ? '&' : '?';
    pages.push(await fetchHtml(`${topicUrl}${sep}start=${sorted[i]}`));
  }
  return pages;
}

async function main() {
  const $ = loadCheerio();
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const topicByUrl = new Map();

  // 1) Page d'accueil : récupérer tous les sujets (catégorie par défaut "Non classé")
  try {
    const indexHtml = await fetchHtml('/');
    const fromIndex = extractTopicLinksFromPage($, indexHtml, 'Non classé');
    for (const t of fromIndex) topicByUrl.set(t.url, t);
    console.log('Page d\'accueil →', fromIndex.length, 'sujet(s)');
  } catch (e) {
    console.warn('Page d\'accueil:', e.message);
  }

  // 2) Chaque section : récupérer les sujets et assigner la catégorie
  for (const section of FORUM_SECTIONS) {
    const links = await discoverTopicLinks($, section);
    for (const l of links) topicByUrl.set(l.url, l);
    if (links.length) console.log('Section', section.url, '→', links.length, 'sujet(s)');
  }

  const unique = [...topicByUrl.values()];
  console.log('Total sujets à importer:', unique.length);

  for (let i = 0; i < unique.length; i++) {
    const topic = unique[i];
    if (i > 0) await new Promise((r) => setTimeout(r, 400));
    try {
      const slug = slugify(topic.url.replace(/^\/[td]\d+-?/, '').replace(/^\d+-/, '')) || 'sujet';
      const topicSlug = slug || 'imported';
      console.log('Import:', topic.url, '→', topicSlug);

      // Récupérer toutes les pages du sujet (pagination) puis tous les messages
      const pages = await fetchAllTopicPages(topic.url, $);
      const allPosts = [];
      let title = '';
      let topicDate = '';

      for (const pageHtml of pages) {
        const parsed = parseTopicPage(pageHtml, $);
        if (parsed.title) title = parsed.title;
        if (parsed.topicDate) topicDate = parsed.topicDate;
        for (const p of parsed.posts) {
          if (p.contentHtml.trim()) allPosts.push(p);
        }
      }
      // allPosts contient tous les messages (premier message + toutes les réponses), pas seulement le premier

      const imageIndexRef = { current: 0 };
      const parts = [];
      for (let i = 0; i < allPosts.length; i++) {
        const p = allPosts[i];
        const md = await htmlToMarkdown(p.contentHtml, BASE + topic.url, topicSlug, $, imageIndexRef);
        if (!md.trim()) continue;
        const dateStr = p.date || topicDate;
        const header = allPosts.length > 1
          ? `### Message par ${p.author || 'Anonyme'}${dateStr ? `, ${dateStr}` : ''}\n\n`
          : '';
        parts.push(header + md);
      }

      const body = parts.join('\n\n---\n\n');
      const forumLink = BASE + topic.url;
      const footer = `\n\n---\n*Article importé du [forum F4EGM](${forumLink})*`;
      const fullBody = body.trim() ? body + footer : `*[Voir le sujet sur le forum](${forumLink})*`;

      const date = topicDate || new Date().toISOString().slice(0, 10);
      const filename = path.join(OUT_DIR, `${date}-${topicSlug}.md`);
      const frontMatter = [
        '---',
        `title: "${escapeFrontMatter(title)}"`,
        `date: ${date} 12:00:00`,
        `categories: ${topic.category}`,
        'tags: [forum, f4egm]',
        '---',
        '',
        fullBody,
      ].join('\n');

      fs.writeFileSync(filename, frontMatter, 'utf8');
      console.log('  →', filename);
    } catch (err) {
      console.error('  Erreur:', err.message);
    }
  }
  console.log('Import terminé.');
}

main();
