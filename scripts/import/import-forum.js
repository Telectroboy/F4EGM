/**
 * Import F4EGM — NETTOYAGE FORT : supprime absolument TOUT ce qui ressemble à un artefact forum
 * (profils, likes, signatures, « AdminAdmin », "Je n’aime pas", bio, etc) après conversion Markdown.
 * Seul le texte utile & images, blocs codes sont conservés.
 */
const BASE = 'https://f4egm.forumactif.com';
const OUT_DIR = 'source/_posts';
const IMAGES_DIR = 'source/images/imported';
const fs = require('fs');
const path = require('path');
const FORUM_SECTIONS = [
  { url: '/f1-sdr', category: 'SDR' },
  { url: '/f2-electronique', category: 'Electronique' },
  { url: '/f3-domotique', category: 'Domotique' },
  { url: '/f5-antennes', category: 'Antennes' },
  { url: '/f6-logiciels', category: 'Logiciels' },
  { url: '/f7-blabla', category: 'BlaBla' },
  { url: '/c1-associations', category: 'Petites Annonces' },
];

// Regex vraiment agressives, en multi-pass
const CLEAN_PATTERNS = [
  /Admin\s*Admin((\r?\n.+)*?lien\+.*)?/gim,
  /Messages?\s*[:：]\s*\d+/gi,
  /Date d'?inscription\s*[:：][^\n\r]*/gi,
  /Age\s*[:：]\s*\d+/gi,
  /Localisation\s*[:：][^\n\r]*/gi,
  /J'?aime\s*\d?\s*(Je n'?aime pas)?/gi,
  /Je n'?aime pas/gi,
  /aime ce message/gi,
  /Partager cet article sur\s*:?/gi,
  /Contenu sponsoris[éeé]/gi,
  /S'?enregistrer pour répondre|Se connecter pour répondre/gi,
  /\[Re:[^\]]*\]\([^\)]+\)/gi,
  /(?:\n|^)[|=]{2,}.+?(?:\n|$)/g,
  /Voir le deal.*?\n/gi,
  /-\d+%.+?Voir le deal/gi,
  /((^|\n)lien\+[^\n]*\n?)/gi,
  /(^|\n)((Je )?n'?aime pas|J'?aime)[^\n]*\n/gi
];
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|svg)(\?.*)?$/i;

async function fetchHtml(url) {
  const u = url.startsWith('http') ? url : BASE + url;
  const res = await fetch(u, { headers: { 'User-Agent': 'Import-F4EGM-Hexo' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${u}`);
  return res.text();
}
function loadCheerio() {
  try { return require('cheerio'); } catch (e) { console.error('npm install cheerio'); process.exit(1); }
}
async function downloadFile(url) {
  const u = url.startsWith('http') ? url : BASE + (url.startsWith('/') ? url : '/' + url);
  const res = await fetch(u, { headers: { 'User-Agent': 'Import-F4EGM-Hexo' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${u}`);
  return Buffer.from(await res.arrayBuffer());
}
function escapeFrontMatter(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/[\r\n]/g, ' ').replace(/"/g, '\\"').trim();
}
function slugify(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function superCleanText(text) {
  let out = String(text || '');
  // Multi-pass nettoyage sur tout le texte
  for (let pass = 0; pass < 3; pass++) {
    for (const re of CLEAN_PATTERNS) out = out.replace(re, '');
  }
  // Supprime les lignes restantes vides ou ne contenant que bruit
  out = out.replace(/^(\s*\n)+/gm, '').replace(/[\n ]{3,}/g, '\n\n').trim();
  // Vire toute ligne ne contenant QUE "Admin", "lien+ ...", ou n'étant qu'un mot-clé bruit
  out = out.split('\n').filter((line) => {
    const l = line.trim();
    if (!l) return false;
    if (/^admin(admin)?$/i.test(l)) return false;
    if (/^lien\+/i.test(l)) return false;
    if (l.match(/^messages? : \d+$/i)) return false;
    if (l.match(/date d'?inscription/i)) return false;
    if (/age ?[:：]/i.test(l)) return false;
    if (/localisation ?[:：]/i.test(l)) return false;
    if (/je n'?aime pas|j'?aime|aime ce message/i.test(l)) return false;
    if (/^\s*$/i.test(l)) return false;
    return true;
  }).join('\n');
  // Final squeeze
  return out.replace(/^(\s*\n)+/gm, '').replace(/[\n ]{3,}/g, '\n\n').trim();
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
async function discoverTopicLinks($, section) {
  try {
    const html = await fetchHtml(section.url);
    return extractTopicLinksFromPage($, html, section.category);
  } catch (e) { return []; }
}
function resolveImageUrl(href) {
  if (!href || href.startsWith('data:')) return null;
  if (href.startsWith('http')) return href;
  return BASE + (href.startsWith('/') ? href : '/' + href);
}
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
async function htmlToMarkdown(html, topicSlug, $, imageIndexRef) {
  if (!html || !html.trim()) return '';
  const root = $.load(html);
  root('script, style').remove();
  // Code hexo/markdown
  let text = root.root().html() || '';
  // Regex : blocs forum [code], puis balises <pre> et <code>
  text = text
    .replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (m, code) => '\n```\n' + code.replace(/<br\s*\/?>(\n)?/g, '\n').trim() + '\n```\n')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (m, code) => '\n```\n' + code.trim() + '\n```\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (m, code) => '\n```\n' + code.trim() + '\n```\n');
  // Images forumactif & liens images
  const imageUrls = [];
  root('img[src]').each((_, el) => {
    const src = root(el).attr('src');
    const full = resolveImageUrl(src);
    if (full && !imageUrls.includes(full)) imageUrls.push(full);
  });
  root('a[href]').each((_, el) => {
    const href = root(el).attr('href');
    if (href && IMAGE_EXT.test(href)) {
      const full = resolveImageUrl(href);
      if (full && !imageUrls.includes(full)) imageUrls.push(full);
    }
  });
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
  text = text.replace(/<img\b[^>]*>/gi, ''); // on vire les <img> non traitées
  // Conversion des liens : garde le contenu texte, vire URL
  text = text.replace(/<a\s+href="[^"]+"[^>]*>([\s\S]*?)<\/a>/gi, '$1');
  text = text.replace(/<[^>]+>/g, ''); // vire tout HTML restant
  text = text.replace(/\n{3,}/g, '\n\n');
  return superCleanText(text);
}
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function parseTopicPage(html, $) {
  const root = $.load(html);
  const titleEl = root('h2.topic-title a, .topictitle, h1, .title').first();
  const title = titleEl.text().trim() || 'Sans titre';
  const posts = [];
  const postBlocks = root('.post, .row, .blockpost, [class*="post"]');
  if (postBlocks.length === 0) {
    const contentEl = root('.content, .postbody .content').first();
    const html = contentEl.html() || '';
    posts.push({ contentHtml: html });
  } else {
    postBlocks.each((_, block) => {
      const el = root(block);
      const contentEl = el.find('.content, .postbody .content, .post-body').first();
      if (contentEl.length === 0) return;
      const contentHtml = contentEl.html() || '';
      if (!contentHtml.trim()) return;
      posts.push({ contentHtml });
    });
  }
  if (posts.length === 0) {
    const bodyEl = root('.content, .postbody .content, .post').first();
    posts.push({ contentHtml: bodyEl.html() || '' });
  }
  const topicDate = new Date().toISOString().slice(0, 10);
  return { title, topicDate, posts };
}
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
  try {
    const indexHtml = await fetchHtml('/');
    const fromIndex = extractTopicLinksFromPage($, indexHtml, 'Non classé');
    for (const t of fromIndex) topicByUrl.set(t.url, t);
    console.log('Page d\'accueil →', fromIndex.length, 'sujet(s)');
  } catch (e) {
    console.warn('Page d\'accueil:', e.message);
  }
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
      const pages = await fetchAllTopicPages(topic.url, $);
      const allPosts = [];
      let title = '';
      for (const pageHtml of pages) {
        const parsed = parseTopicPage(pageHtml, $);
        if (parsed.title) title = parsed.title;
        for (const p of parsed.posts) {
          if (p.contentHtml && p.contentHtml.trim()) allPosts.push(p.contentHtml);
        }
      }
      const imageIndexRef = { current: 0 };
      const parts = [];
      for (let i = 0; i < allPosts.length; i++) {
        const md = await htmlToMarkdown(allPosts[i], topicSlug, $, imageIndexRef);
        if (!md.trim()) continue;
        parts.push(md);
      }
      // Nettoyage final du billet entier (multi-pass pour supprimer tout résidu).
      let body = parts.join('\n\n');
      body = superCleanText(body);
      const date = new Date().toISOString().slice(0,10);
      const filename = path.join(OUT_DIR, `${date}-${topicSlug}.md`);
      const frontMatter = [
        '---',
        `title: "${escapeFrontMatter(title)}"`,
        `date: ${date} 12:00:00`,
        `categories: ${topic.category}`,
        'tags: [forum, f4egm]',
        '---',
        '',
        body,
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
