/**
 * Bandeau de navigation en haut du site : Home, Bienvenue, puis catégories.
 * Config dans _config.yml → nav_banner
 */
const cfg = hexo.config.nav_banner || {};
const categoryMap = hexo.config.category_map || {};
const order = cfg.categories_order || Object.keys(categoryMap);
const root = (hexo.config.root || '/').replace(/\/$/, '') || '';

function buildNavHtml() {
  if (!cfg.enable) return '';

  return [
    '<nav class="nav-banner" role="navigation" style="',
    'background:#2c3e50;color:#ecf0f1;padding:0.6em 1em;margin:0;font-size:0.95em;',
    'box-shadow:0 1px 3px rgba(0,0,0,0.15);',
    '">',
    '<div style="max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:0.5em 1em;">',
    '<a href="' + (root + '/') + '" style="color:#ecf0f1;text-decoration:none;font-weight:bold;">Home</a>',
    '<span style="color:#bdc3c7;">|</span>',
    '<a href="' + (root + '/bienvenue/') + '" style="color:#ecf0f1;text-decoration:none;">Bienvenue</a>',
    '<span style="color:#bdc3c7;">|</span>',
    order
      .filter(function (name) {
        return categoryMap[name];
      })
      .map(function (name) {
        const slug = categoryMap[name];
        return '<a href="' + root + '/categories/' + slug + '/" style="color:#ecf0f1;text-decoration:none;">' + escapeHtml(name) + '</a>';
      })
      .join(' <span style="color:#bdc3c7;">|</span> '),
    '</div>',
    '</nav>',
  ].join('');
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

hexo.extend.injector.register('body_begin', buildNavHtml, 'default');
