function paths() {
  const main = document.querySelector("main");
  if (!main) {
    console.error("Main element not found");
    return;
  }

  const existingRootPaths = main.querySelector(".root-paths");
  if (existingRootPaths) {
    existingRootPaths.remove();
  }

  const caminhoRelativo = obterCaminhoRelativo();
  const rootPaths = document.createElement("div");
  rootPaths.className = "root-paths";
  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;
  const pathParts = context?.pathParts || [];

  const homeLink = document.createElement("a");
  homeLink.href = caminhoRelativo;
  homeLink.textContent = "home";
  homeLink.dataset.pathKey = "home";
  rootPaths.appendChild(homeLink);

  let accumulatedPath = caminhoRelativo;
  pathParts.forEach((part) => {
    rootPaths.appendChild(document.createTextNode(" > "));
    accumulatedPath += `${part}/`;
    const link = document.createElement("a");
    link.href = accumulatedPath;
    link.id = part;
    link.dataset.pathKey = decodeURIComponent(part);
    link.textContent = decodeURIComponent(part);
    rootPaths.appendChild(link);
  });

  main.prepend(rootPaths);
}

const BREADCRUMB_CACHE_KEY = "study_breadcrumb_title_cache_v1";

function readBreadcrumbCache() {
  try {
    const raw = sessionStorage.getItem(BREADCRUMB_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeBreadcrumbCache(cache) {
  try {
    sessionStorage.setItem(BREADCRUMB_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignora falha de cache para não bloquear renderização.
  }
}

function pathNames() {
  const pathsBar = document.querySelector(".root-paths");
  if (!pathsBar) {
    return;
  }

  const links = Array.from(pathsBar.querySelectorAll("a"));
  const currentPageHeading = document.querySelector("section#Home > h1");

  function extractTitleFromHtml(htmlText) {
    const parser = new DOMParser();
    const documentHtml = parser.parseFromString(htmlText, "text/html");
    const heading = documentHtml.querySelector("section#Home > h1");
    return heading ? heading.textContent.trim() : null;
  }

  function normalizeHref(link) {
    const href = link.getAttribute("href") || "";
    if (!href) {
      return window.location.href;
    }
    return new URL(href, window.location.href).href;
  }

  const titleCache = readBreadcrumbCache();

  Promise.all(
    links.map((link, index) => {
      const isLastLink = index === links.length - 1;
      const normalizedUrl = normalizeHref(link);

      const cachedTitle = titleCache[normalizedUrl];
      if (cachedTitle) {
        return Promise.resolve({
          link,
          title: cachedTitle,
        });
      }

      if (isLastLink && currentPageHeading) {
        const currentTitle = currentPageHeading.textContent.trim();
        titleCache[normalizedUrl] = currentTitle;
        return Promise.resolve({
          link,
          title: currentTitle,
        });
      }

      return fetch(normalizedUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text();
        })
        .then((htmlText) => {
          const title = extractTitleFromHtml(htmlText);
          if (title) {
            titleCache[normalizedUrl] = title;
          }
          return {
            link,
            title,
          };
        })
        .catch((error) => {
          console.error("Error loading breadcrumb source page:", error);
          return {
            link,
            title: null,
          };
        });
    }),
  ).then((items) => {
    items.forEach(({ link, title }) => {
      if (title) {
        link.textContent = title;
      }
    });

    writeBreadcrumbCache(titleCache);
  });
}
