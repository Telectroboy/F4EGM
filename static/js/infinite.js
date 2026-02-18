(() => {
  // PaperMod: les articles "cards" sont souvent sous main.main
  const main = document.querySelector("main.main");
  if (!main) return;

  // On ne fait ça que sur les pages de liste (home / section / taxonomy)
  // et uniquement si la pagination existe.
  const nextLink =
    document.querySelector(".pagination a.next") ||
    document.querySelector("a[rel='next']");

  if (!nextLink) return;

  let nextUrl = nextLink.href;
  let loading = false;

  // Cache les boutons pagination si tu veux (optionnel)
  const pagination = document.querySelector(".pagination");
  if (pagination) pagination.style.display = "none";

  const sentinel = document.createElement("div");
  sentinel.style.height = "1px";
  sentinel.style.width = "100%";
  main.appendChild(sentinel);

  async function loadNext() {
    if (loading || !nextUrl) return;
    loading = true;

    try {
      const res = await fetch(nextUrl, { credentials: "same-origin" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();

      const doc = new DOMParser().parseFromString(html, "text/html");

      // Récupère les nouveaux articles
      const newArticles = doc.querySelectorAll("main.main > article.post-entry, main.main > article.first-entry");
      // Sur les pages suivantes, il ne devrait plus y avoir de .first-entry,
      // mais on accepte les 2 au cas où.
      newArticles.forEach(a => {
        // évite de dupliquer le hero si un theme le renvoie
        if (a.classList.contains("first-entry")) return;
        main.insertBefore(a, sentinel);
      });

      // Trouve le prochain "next"
      const newNext =
        doc.querySelector(".pagination a.next") ||
        doc.querySelector("a[rel='next']");
      nextUrl = newNext ? newNext.href : null;

      // Si plus de page, on retire l’observer
      if (!nextUrl) observer.disconnect();
    } catch (e) {
      // Si erreur, on arrête proprement
      console.warn("Infinite scroll stopped:", e);
      observer.disconnect();
    } finally {
      loading = false;
    }
  }

  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) loadNext();
  }, { rootMargin: "1200px 0px" });

  observer.observe(sentinel);
})();
