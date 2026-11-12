const blacklist = [
  "cursoemvideo",
  "colegioadolpho",
  "fundacao-bradesco",
  "hashtag-programacao",
  "qlik",
  "unicesumar",
  "cursos",
  "materias",
  "hackathons",
  "boot-camps",
  "2-serie",
  "3-serie",
  "projetos",
  "trilhas",
];

async function directoryHasIndex(indexUrl) {
  try {
    const headResponse = await fetch(indexUrl, { method: "HEAD" });
    if (headResponse.ok) {
      return true;
    }
  } catch {}

  try {
    const getResponse = await fetch(indexUrl, { method: "GET" });
    return getResponse.ok;
  } catch {
    return false;
  }
}

async function loadRouteCatalog(basePath) {
  try {
    const response = await fetch(`${basePath}manus-routes.json`);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data.routes) ? data.routes : [];
  } catch {
    return [];
  }
}

function normalizeRoutePath(routePath) {
  const normalized = String(routePath || "/")
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "");

  if (!normalized || normalized === "index.html") {
    return "";
  }

  return normalized.replace(/\/index\.html$/i, "");
}

function routeHref(routePath, basePath) {
  const normalized = normalizeRoutePath(routePath);
  if (!normalized) {
    return `${basePath}index.html`;
  }

  return /\.[a-zA-Z0-9]+$/.test(normalized)
    ? `${basePath}${normalized}`
    : `${basePath}${normalized}/`;
}

function directRoutes(routes, parentPath, currentPath) {
  return routes
    .filter((route) => {
      const normalized = normalizeRoutePath(route.path);
      if (normalized === currentPath) {
        return false;
      }

      const lastSlash = normalized.lastIndexOf("/");
      const routeParent =
        lastSlash === -1 ? "" : normalized.slice(0, lastSlash);
      return routeParent === parentPath;
    })
    .sort((left, right) =>
      String(left.title).localeCompare(String(right.title), "pt-BR"),
    );
}

function createPathSeparator(routes, parentPath, currentPath, basePath) {
  const separator = document.createElement("span");
  separator.className = "root-path-separator";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-angle-right";
  icon.setAttribute("aria-hidden", "true");
  separator.appendChild(icon);

  const menuRoutes = directRoutes(routes, parentPath, currentPath);
  if (!menuRoutes.length) {
    return separator;
  }

  separator.classList.add("has-menu");
  separator.setAttribute("tabindex", "0");
  separator.setAttribute("aria-label", "Mostrar páginas diretas");

  const menu = document.createElement("div");
  menu.className = "root-path-menu";
  menu.setAttribute("role", "menu");

  menuRoutes.forEach((route) => {
    const link = document.createElement("a");
    link.href = routeHref(route.path, basePath);
    link.textContent =
      route.title || normalizeRoutePath(route.path).split("/").pop();
    link.setAttribute("role", "menuitem");
    menu.appendChild(link);
  });

  separator.appendChild(menu);
  return separator;
}

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
  const rootPaths = document.createElement("section");
  rootPaths.id = "rootPaths";
  rootPaths.setAttribute("aria-label", "Caminho do site");
  rootPaths.className = "root-paths";
  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;
  const pathParts = context?.pathParts || [];
  const currentPath = normalizeRoutePath(pathParts.join("/"));
  const routeCatalogPromise = loadRouteCatalog(caminhoRelativo);

  const homeLink = document.createElement("a");
  homeLink.href = `${caminhoRelativo}index.html`;
  homeLink.textContent = "Home";
  homeLink.dataset.pathKey = "home";
  homeLink.dataset.automatedTitle = "false";
  rootPaths.appendChild(homeLink);

  let accumulatedPath = caminhoRelativo;
  const pathChecks = pathParts.map((part) => {
    accumulatedPath += `${part}/`;
    const indexPath = `${accumulatedPath}index.html`;
    const decodedPart = decodeURIComponent(part);

    return directoryHasIndex(indexPath).then((hasIndex) => ({
      part,
      decodedPart,
      indexPath,
      hasIndex,
    }));
  });

  Promise.all([Promise.all(pathChecks), routeCatalogPromise]).then(
    ([checkedPaths, routes]) => {
      let parentPath = "";
      checkedPaths.forEach(({ part, decodedPart, indexPath, hasIndex }) => {
        const segmentPath = normalizeRoutePath(`${parentPath}/${decodedPart}`);
        if (hasIndex) {
          rootPaths.appendChild(
            createPathSeparator(
              routes,
              parentPath,
              currentPath,
              caminhoRelativo,
            ),
          );

          const link = document.createElement("a");
          link.href = indexPath;
          link.id = part;
          link.dataset.pathKey = decodedPart;
          link.textContent = decodedPart;
          rootPaths.appendChild(link);
        }

        parentPath = segmentPath;
      });

      if (typeof pathNames === "function") {
        pathNames();
      }

      if (typeof renderFontAwesomeIcons === "function") {
        renderFontAwesomeIcons(rootPaths);
      }
    },
  );

  main.prepend(rootPaths);
}

const BREADCRUMB_CACHE_KEY = "study_breadcrumb_title_cache_v3";
const BREADCRUMB_TITLE_PREFIX = "Estudos de JLBBARCO - ";

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

  const links = Array.from(pathsBar.querySelectorAll("a")).filter(
    (link) => link.dataset.automatedTitle !== "false",
  );

  function extractTitleFromHtml(htmlText) {
    const parser = new DOMParser();
    const documentHtml = parser.parseFromString(htmlText, "text/html");
    const title = documentHtml.querySelector("title")?.textContent?.trim();
    return title ? title.replace(BREADCRUMB_TITLE_PREFIX, "").trim() : null;
  }

  function normalizeHref(link) {
    const href = link.getAttribute("href") || "";
    if (!href) {
      return window.location.href;
    }
    return new URL(href, window.location.href).href;
  }

  const titleCache = readBreadcrumbCache();
  const currentPageUrl = new URL(window.location.href).href;

  Promise.all(
    links.map((link) => {
      const normalizedUrl = normalizeHref(link);

      const cachedTitle = titleCache[normalizedUrl];
      if (cachedTitle) {
        return Promise.resolve({
          link,
          title: cachedTitle,
        });
      }

      if (normalizedUrl === currentPageUrl && document.title) {
        const currentTitle = document.title
          .replace(BREADCRUMB_TITLE_PREFIX, "")
          .trim();
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
