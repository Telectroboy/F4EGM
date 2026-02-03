/**
 * Injecte le widget Giscus (commentaires GitHub Discussions) dans les billets.
 * Config dans _config.yml → giscus
 * Voir https://giscus.app/
 */
const cfg = hexo.config.giscus || {};
const giscus = cfg.enable ? {
  repo: (cfg.repo || '').replace(/^https?:\/\/github\.com\/|\.git$/g, ''),
  repoId: cfg.repo_id || '',
  category: cfg.category || 'Announcements',
  categoryId: cfg.category_id || '',
  mapping: cfg.mapping || 'pathname',
  strict: cfg.strict !== false,
  reactions: cfg.reactions !== false,
  inputPosition: cfg.input_position || 'bottom',
  theme: cfg.theme || 'preferred_color_scheme',
  lang: cfg.lang || 'fr',
} : null;

hexo.extend.injector.register('post_end', function () {
  if (!giscus || !giscus.repo || !giscus.repoId) return '';
  return [
    '<script src="https://giscus.app/client.js"',
    '  data-repo="' + giscus.repo + '"',
    '  data-repo-id="' + giscus.repoId + '"',
    '  data-category="' + giscus.category + '"',
    '  data-category-id="' + giscus.categoryId + '"',
    '  data-mapping="' + giscus.mapping + '"',
    '  data-strict="' + giscus.strict + '"',
    '  data-reactions-enabled="' + giscus.reactions + '"',
    '  data-input-position="' + giscus.inputPosition + '"',
    '  data-theme="' + giscus.theme + '"',
    '  data-lang="' + giscus.lang + '"',
    '  crossorigin="anonymous" async></script>',
  ].join('\n');
}, 'post');
