const VERCEL_DOMAIN_TOKEN = "vercel.app";
const DEFAULT_FAVICON_PATH = "src/assets/favicon/default.ico";
const JS_BASE_PATH = "src/js";
const CSS_BASE_PATH = "src/css";
const CRITICAL_JS_FILES = ["header.js", "footer.js", "paths.js"];
const CRITICAL_CSS_FILES = [
  { fileName: "style.css", media: "screen" },
  { fileName: "cards.css", media: "screen" },
  { fileName: "pc.css", media: "screen and (min-width: 990px)" },
  { fileName: "cards-pc.css", media: "screen and (min-width: 990px)" },
];
const DEFERRED_JS_FILES = ["accessibility.js", "adsense.js"];
const PRELOADABLE_FONT_ASSETS = [
  "src/assets/fonts/Tektur/Tektur-VariableFont.ttf",
  "src/assets/fonts/Sour_Gummy/SourGummy.ttf",
];
const PRECONNECT_ORIGINS = [
  "https://kit.fontawesome.com",
  "https://ka-f.fontawesome.com",
];
const DEFERRED_TASK_TIMEOUT = 1800;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await carregarContextoServidor();
    await headInsert();

    invokeGlobal("initializeNavigation");
    initializeSmoothScroll();
    initializeCookies();
    wrapCardLinks();
    stabilizeMediaLayout();
    optimizeImageLoading();
    updateDocumentTitleFromHome();

    invokeGlobal("footer");
    invokeGlobal("initializeFooter");
    invokeGlobal("paths");

    runDeferredTask(() => {
      if (shouldLoadFontAwesome()) {
        loadFontAwesome().catch((error) => {
          console.warn("Falha ao carregar Font Awesome.", error);
        });
      }

      invokeGlobal("pathNames");
      insertJS(DEFERRED_JS_FILES).catch((error) => {
        console.warn("Falha ao carregar scripts não críticos.", error);
      });
    });
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }
});

let siteContextCache = null;

primeHeadAssets();

function getCurrentSiteContext() {
  return siteContextCache;
}

window.getCurrentSiteContext = getCurrentSiteContext;

function isVercelHost() {
  const hostname = (window.location.hostname || "").toLowerCase();
  return hostname.includes(VERCEL_DOMAIN_TOKEN);
}

function invokeGlobal(functionName, ...args) {
  const fn = window[functionName];
  if (typeof fn === "function") {
    return fn(...args);
  }

  return undefined;
}

function runDeferredTask(task) {
  if (typeof task !== "function") return;

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(task, { timeout: DEFERRED_TASK_TIMEOUT });
    return;
  }

  window.setTimeout(task, 0);
}

function shouldLoadFontAwesome() {
  return Boolean(document.querySelector('[class*="fa-"]'));
}

function insertResourceHints() {
  const head = document.head;
  if (!head) return;

  PRECONNECT_ORIGINS.forEach((origin) => {
    const selector = `link[rel="preconnect"][href="${origin}"], link[rel="dns-prefetch"][href="${origin}"]`;
    if (head.querySelector(selector)) {
      return;
    }

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = origin;
    preconnect.crossOrigin = "anonymous";
    head.appendChild(preconnect);

    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = origin;
    head.appendChild(dnsPrefetch);
  });

  PRELOADABLE_FONT_ASSETS.forEach((assetPath) => {
    const fontFileName = assetPath.split("/").pop();
    const href = resolveStaticAssetPath(assetPath);
    if (
      head.querySelector(`link[data-preload="${fontFileName}"]`) ||
      head.querySelector(`link[rel="preload"][href="${href}"]`)
    ) {
      return;
    }

    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "font";
    preload.type = "font/ttf";
    preload.href = href;
    preload.crossOrigin = "anonymous";
    preload.dataset.preload = fontFileName;
    head.appendChild(preload);
  });
}

function ensureLayoutShells() {
  if (!document.body) {
    return;
  }

  const existingHeader = document.querySelector("header");
  if (existingHeader) {
    return;
  }

  const headerShell = document.createElement("header");
  headerShell.dataset.shell = "true";
  headerShell.setAttribute("aria-hidden", "true");
  headerShell.className = "app-header-shell";
  document.body.prepend(headerShell);
}

function stabilizeMediaLayout() {
  const images = document.querySelectorAll("img");
  images.forEach((image, index) => {
    if (index === 0 && !image.hasAttribute("fetchpriority")) {
      image.fetchPriority = "high";
    }

    const applyDimensions = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      if (!width || !height) {
        return;
      }

      if (!image.hasAttribute("width")) {
        image.setAttribute("width", String(width));
      }

      if (!image.hasAttribute("height")) {
        image.setAttribute("height", String(height));
      }

      if (!image.style.aspectRatio) {
        image.style.aspectRatio = `${width} / ${height}`;
      }
    };

    if (image.complete) {
      applyDimensions();
      return;
    }

    image.addEventListener("load", applyDimensions, { once: true });
  });

  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    if (!iframe.hasAttribute("loading")) {
      iframe.loading = "lazy";
    }
  });
}

function optimizeImageLoading() {
  const images = document.querySelectorAll("img");
  images.forEach((image, index) => {
    image.decoding = "async";

    const isInHomeSection = Boolean(image.closest("section#Home"));
    const shouldPrioritize = index === 0 || isInHomeSection;

    if (!shouldPrioritize && !image.hasAttribute("loading")) {
      image.loading = "lazy";
    }
  });
}

function primeHeadAssets() {
  if (!document.head) return;

  insertResourceHints();
  ensureLayoutShells();

  insertCSS(CRITICAL_CSS_FILES);

  insertFavicon().catch(() => {
    // Silencia erro inicial; favicon será revalidado durante inicialização.
  });
}

function normalizeBasePath(basePath) {
  if (!basePath) return "";
  if (basePath === "/") return "/";
  return basePath.endsWith("/") ? basePath : `${basePath}/`;
}

function getAssetBasePath() {
  const context = getCurrentSiteContext();
  if (typeof context?.assetBasePath === "string" && context.assetBasePath) {
    return normalizeBasePath(context.assetBasePath);
  }

  if (isVercelHost()) {
    return "/";
  }

  return normalizeBasePath(obterCaminhoRelativoLocal());
}

function resolveStaticAssetPath(pathFromRoot) {
  const normalizedRelativePath = String(pathFromRoot || "").replace(/^\/+/, "");

  if (isVercelHost()) {
    return `/api/asset?path=${encodeURIComponent(normalizedRelativePath)}`;
  }

  const assetBasePath = getAssetBasePath();

  if (assetBasePath === "/") {
    return `/${normalizedRelativePath}`;
  }

  return `${assetBasePath}${normalizedRelativePath}`;
}

async function loadFontAwesome() {
  const head = document.head;
  if (!head) return;

  if (document.querySelector('script[data-origin="fontawesome-kit"]')) {
    initializeFontAwesome();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/4a1e49a1ca.js";
  script.crossOrigin = "anonymous";
  script.dataset.origin = "fontawesome-kit";

  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    head.appendChild(script);
  });

  initializeFontAwesome();
}

function updateDocumentTitleFromHome() {
  const titleHome = document.querySelector("section#Home>h1");
  if (!titleHome) return;

  const title = titleHome.textContent?.trim() || "Document";
  let titlePg = document.querySelector("title");

  if (!titlePg) {
    titlePg = document.createElement("title");
    document.head.appendChild(titlePg);
  }

  titlePg.textContent = title;
}

function isOfflineContextEnabled() {
  const queryOffline = new URLSearchParams(window.location.search).get(
    "offline",
  );
  if (queryOffline === "1" || queryOffline === "true") {
    return true;
  }

  const bodyOffline = document.body?.dataset?.offlineContext;
  if (bodyOffline === "1" || bodyOffline === "true") {
    return true;
  }

  try {
    return localStorage.getItem("study_offline_context") === "1";
  } catch {
    return false;
  }
}

function shouldUseServerContext() {
  const queryParams = new URLSearchParams(window.location.search);
  const forceServer = queryParams.get("serverContext");
  if (forceServer === "1" || forceServer === "true") {
    return true;
  }

  if (isVercelHost()) {
    return true;
  }

  if (window.location.protocol === "file:") {
    return false;
  }

  const hostname = (window.location.hostname || "").toLowerCase();
  const port = window.location.port || "";
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  // API de contexto local roda no dev-server da aplicação (porta 3000).
  if (isLocalhost && port && port !== "3000") {
    return false;
  }

  return true;
}

function buildLocalSiteContext() {
  const relativeRootPath = obterCaminhoRelativoLocal();
  return {
    relativeRootPath,
    assetBasePath: relativeRootPath,
    pathParts: extrairPathPartsLocal(),
    faviconHref: `${relativeRootPath}${DEFAULT_FAVICON_PATH}`,
    contextSource: "local",
  };
}

function setOfflineContextMode(enabled) {
  try {
    if (enabled) {
      localStorage.setItem("study_offline_context", "1");
    } else {
      localStorage.removeItem("study_offline_context");
    }
  } catch (error) {
    console.warn(
      "Não foi possível persistir modo offline no localStorage.",
      error,
    );
  }
}

window.setOfflineContextMode = setOfflineContextMode;

async function carregarContextoServidor() {
  if (siteContextCache) return siteContextCache;

  if (isOfflineContextEnabled() || !shouldUseServerContext()) {
    siteContextCache = buildLocalSiteContext();
    return siteContextCache;
  }

  const bodyLabel = document.body?.ariaLabel || "book";
  const params = new URLSearchParams({
    pathname: window.location.pathname,
    bodyLabel,
  });

  try {
    const response = await fetch(`/api/site-context?${params.toString()}`);
    if (response.status === 404 || response.status === 503) {
      siteContextCache = buildLocalSiteContext();
      return siteContextCache;
    }

    if (!response.ok) {
      throw new Error(
        `Falha ao carregar contexto do servidor: ${response.status}`,
      );
    }

    const context = await response.json();
    siteContextCache = {
      ...context,
      assetBasePath:
        typeof context?.assetBasePath === "string" && context.assetBasePath
          ? context.assetBasePath
          : context?.relativeRootPath || "/",
    };
    return context;
  } catch (error) {
    console.warn(
      "Não foi possível carregar contexto no servidor. Usando fallback local.",
    );
    siteContextCache = buildLocalSiteContext();
    return siteContextCache;
  }
}

function extrairPathPartsLocal() {
  const nomeRepositorio = "study";
  const pathIgnore = ["index.html"];

  return window.location.pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => !pathIgnore.includes(part) && part !== nomeRepositorio);
}

function insertFavicon() {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return Promise.reject(new Error("Head element not found"));
  }

  const context = getCurrentSiteContext();
  const fallbackPath = resolveStaticAssetPath(DEFAULT_FAVICON_PATH);
  const faviconHref = context?.faviconHref || fallbackPath;

  const existingLinks = Array.from(
    head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]'),
  );
  const link = existingLinks[0] || document.createElement("link");
  const isPngFavicon = /(?:\.png(?:$|\?))|(?:[?&]format=png\b)/i.test(
    faviconHref,
  );
  link.rel = "icon";
  link.type = isPngFavicon ? "image/png" : "image/x-icon";
  link.href = faviconHref;

  if (!existingLinks.length) {
    head.appendChild(link);
  }

  existingLinks.slice(1).forEach((faviconLink) => faviconLink.remove());

  return Promise.resolve();
}

function insertJS(jsFiles = []) {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return Promise.reject(new Error("Head element not found"));
  }

  if (!Array.isArray(jsFiles) || jsFiles.length === 0) {
    return Promise.resolve();
  }

  function carregarScript(fileName) {
    const scriptSrc = resolveStaticAssetPath(`${JS_BASE_PATH}/${fileName}`);
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        const error = new Error(
          `[JavaScript] Erro ao carregar ${fileName} em: ${script.src}`,
        );
        console.error(error.message);
        reject(error);
      };
      head.appendChild(script);
    });
  }

  return jsFiles.reduce(
    (promise, fileName) => promise.then(() => carregarScript(fileName)),
    Promise.resolve(),
  );
}

function insertCSS(cssFiles = []) {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return;
  }

  cssFiles.forEach(({ fileName, media }) => {
    const href = resolveStaticAssetPath(`${CSS_BASE_PATH}/${fileName}`);
    if (
      document.querySelector(`link[data-css="${fileName}"]`) ||
      document.querySelector(`link[rel="stylesheet"][href="${href}"]`)
    ) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = media;
    link.dataset.css = fileName;
    link.onerror = () => {
      console.error(`[CSS] Erro ao carregar ${fileName} em: ${link.href}`);
    };
    head.appendChild(link);
  });
}

function initializeSmoothScroll() {
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Melhorar gestão de eventos de redimensionamento
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Setar configs salvas em Cookies
const cookies = document.cookie
  ? document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, ...rest] = cookie.split("=");
      const value = rest.join("=");
      try {
        acc[name] = decodeURIComponent(value);
      } catch {
        acc[name] = value;
      }
      return acc;
    }, {})
  : {};

if (cookies.fontSize) {
  const body = document.querySelector("body");
  if (body) {
    const fontValue = cookies.fontSize;
    body.style.fontSize = isNaN(Number(fontValue))
      ? fontValue
      : `${fontValue}px`;
  }
}

// Envolve links que sejam filhos diretos de `.card` dentro de um `article.buttonCard`.
// Isso evita mover links inline dentro de parágrafos e corrige páginas que
// possuem âncoras diretas nos cards sem precisar editar todos os HTMLs.
function wrapCardLinks() {
  try {
    document.querySelectorAll(".card").forEach((card) => {
      // Seleciona apenas âncoras que sejam filhos diretos do .card
      const directAnchors = Array.from(card.querySelectorAll(":scope > a"));
      if (directAnchors.length === 0) return;

      // Cria o wrapper apenas se necessário
      const wrapper = document.createElement("article");
      wrapper.className = "buttonCard";

      directAnchors.forEach((a) => wrapper.appendChild(a));

      // Anexa o wrapper ao final do card
      card.appendChild(wrapper);
    });
  } catch (e) {
    console.error("wrapCardLinks erro:", e);
  }
}

// Função auxiliar para reinicializar Font Awesome
function initializeFontAwesome() {
  if (window.FontAwesome) {
    window.FontAwesome.config.autoReplaceSvg = "nest";
  }
}

// Função auxiliar para inicializar cookies
function initializeCookies() {
  // Lógica de cookies já está implementada no escopo global
}

function obterCaminhoRelativo() {
  const context = getCurrentSiteContext();
  if (context?.relativeRootPath !== undefined) {
    return context.relativeRootPath;
  }

  return obterCaminhoRelativoLocal();
}

function obterCaminhoRelativoLocal() {
  const nomeRepositorio = "study";

  // Caminho relativo do arquivo HTML atual em relação à raiz do site
  let caminhoHTML = window.location.pathname.replace(/^\//, "");

  if (caminhoHTML.startsWith(nomeRepositorio + "/")) {
    caminhoHTML = caminhoHTML.substring(nomeRepositorio.length + 1);
  }

  // Se quiser apenas o diretório do arquivo HTML:
  const diretorioHTML = caminhoHTML.substring(
    0,
    caminhoHTML.lastIndexOf("/") + 1,
  );

  // Conta quantas pastas existem no caminho (ignorando o arquivo)
  const pastas =
    diretorioHTML === "" ? [] : diretorioHTML.split("/").filter(Boolean);

  // Gera a string com "../" para cada pasta
  const caminhoRelativoAteRaiz = pastas.map(() => "../").join("");

  return caminhoRelativoAteRaiz;
}

// Responsividade do menu ao redimensionar a janela
function mudouJanela() {
  const navLinks = document.querySelector(".nav_links");

  if (window.innerWidth >= 990) {
    navLinks?.classList.remove("active");
  }
}

async function headInsert() {
  const titleHomeEarly = document.querySelector("section#Home>h1");
  const titleText = titleHomeEarly?.textContent?.trim();
  await insertFavicon();
  await insertJS(CRITICAL_JS_FILES);

  invokeGlobal("navBar", titleText);
}
