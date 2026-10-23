const VERCEL_DOMAIN_TOKEN = "vercel.app";
const JS_BASE_PATH = "src/js";
const CSS_BASE_PATH = "src/css";
const JS_LOCAL_PATH = "script.js";
const CRITICAL_JS_FILES = [
  "adsense.js",
  "header.js",
  "footer.js",
  "paths.js",
  "assistant.js",
  "accessibility.js",
];
const CRITICAL_CSS_FILES = [
  { fileName: "style.css", media: "screen" },
  {
    fileName: "tablet.css",
    media: "screen and (min-width: 768px) and (max-width: 989px)",
  },
  { fileName: "pc.css", media: "screen and (min-width: 990px)" },
  { fileName: "tv.css", media: "screen and (min-width: 1200px)" },
  { fileName: "cards.css", media: "screen" },
  {
    fileName: "cards-tablet.css",
    media: "screen and (min-width: 768px) and (max-width: 989px)",
  },
  { fileName: "cards-pc.css", media: "screen and (min-width: 990px)" },
  { fileName: "cards-tv.css", media: "screen and (min-width: 1200px)" },
  { fileName: "assistant.css", media: "screen" },
  { fileName: "site-theme.css", media: "screen" },
];
const DEFERRED_JS_FILES = ["accessibility.js", "adsense.js"];
const PRECONNECT_ORIGINS = [
  "https://kit.fontawesome.com",
  "https://ka-f.fontawesome.com",
];
const DEFERRED_TASK_TIMEOUT = 1800;
const ADSENSE_PUBLISHER_ID = "ca-pub-1575745628375298";
const ADSENSE_SCRIPT_ID = "google-adsense-script";
const CSS_LINK_TIMEOUT_MS = 9000;
const CSS_GATE_TIMEOUT_MS = 12000;
const CSS_GATE_STYLE_ID = "study-css-loading-gate";
let criticalCssPromise = Promise.resolve();
let cssGateTimeoutId = 0;

function releaseCssLoadingGate() {
  document.documentElement?.removeAttribute("data-css-loading");
  document.getElementById(CSS_GATE_STYLE_ID)?.remove();

  if (cssGateTimeoutId) {
    window.clearTimeout(cssGateTimeoutId);
    cssGateTimeoutId = 0;
  }
}

function activateCssLoadingGate() {
  const root = document.documentElement;
  if (!root || root.hasAttribute("data-css-loading")) return;

  root.setAttribute("data-css-loading", "true");

  const gateStyle = document.createElement("style");
  gateStyle.id = CSS_GATE_STYLE_ID;
  gateStyle.textContent =
    'html[data-css-loading="true"] body { visibility: hidden !important; }';
  (document.head || root).appendChild(gateStyle);

  cssGateTimeoutId = window.setTimeout(() => {
    console.warn("Tempo limite do carregamento de CSS; exibindo a página.");
    releaseCssLoadingGate();
  }, CSS_GATE_TIMEOUT_MS);
}

function waitForStylesheetPaint() {
  return new Promise((resolve) => {
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(() => resolve());
      return;
    }

    window.setTimeout(resolve, 0);
  });
}

activateCssLoadingGate();

let DOCUMENT_URL_TOKEN = "";
const domain = document.URL;

if (domain.includes(VERCEL_DOMAIN_TOKEN)) {
  DOCUMENT_URL_TOKEN = "https://study-jlbbarco.vercel.app/";
} else {
  DOCUMENT_URL_TOKEN = obterCaminhoRelativoLocal();
}
console.log(`Files obtains of: ${DOCUMENT_URL_TOKEN}`);

function restoreAccessibilityPreferencesEarly() {
  const root = document.documentElement;
  let themePreference = "system";
  let contrastPreference = "system";
  let motionPreference = "system";
  let storedScale = null;

  try {
    themePreference = localStorage.getItem("study_theme_mode") || "system";
    contrastPreference =
      localStorage.getItem("study_contrast_mode") || "system";
    motionPreference = localStorage.getItem("study_motion_mode") || "system";
    storedScale = localStorage.getItem("study_font_scale");
  } catch {
    // As preferências do dispositivo podem estar indisponíveis neste navegador.
  }

  const matches = (query) =>
    typeof window.matchMedia === "function" && window.matchMedia(query).matches;
  const effectiveTheme =
    themePreference === "light" || themePreference === "dark"
      ? themePreference
      : matches("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";
  root.dataset.theme = effectiveTheme;

  const highContrast =
    contrastPreference === "high" ||
    (contrastPreference === "system" && matches("(prefers-contrast: more)"));
  root.dataset.contrast = highContrast ? "high" : "normal";

  const reduceMotion =
    motionPreference === "reduce" ||
    (motionPreference === "system" &&
      matches("(prefers-reduced-motion: reduce)"));
  root.dataset.motion = reduceMotion ? "reduce" : "full";

  let scale = Number(storedScale);
  if (storedScale === null || !Number.isFinite(scale)) {
    try {
      const legacyFontSize = document.cookie.match(
        /(?:^|;\s*)fontSize=([^;]+)/,
      );
      const legacyPixels = legacyFontSize
        ? Number.parseFloat(decodeURIComponent(legacyFontSize[1]))
        : Number.NaN;
      scale = Number.isFinite(legacyPixels) ? legacyPixels / 16 : 1;
    } catch {
      scale = 1;
    }
  }

  scale = Math.min(1.4, Math.max(0.9, Math.round(scale * 10) / 10));
  root.style.setProperty("--study-font-scale", String(scale));
}

restoreAccessibilityPreferencesEarly();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await carregarContextoServidor();
    await headInsert(DOCUMENT_URL_TOKEN);

    loadAdSense();
    invokeGlobal("initializeNavigation");
    invokeGlobal("initializeAccessibilityMenu");
    initializeSmoothScroll();
    initializeCookies();
    wrapCardLinks();
    stabilizeMediaLayout();
    optimizeImageLoading();
    updateDocumentTitleFromHome();

    invokeGlobal("footer");
    invokeGlobal("initializeFooter");
    invokeGlobal("paths");
    invokeGlobal("videos");

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

function shouldUseServerProcessing() {
  const normalizedToken = String(DOCUMENT_URL_TOKEN || "").toLowerCase();
  return normalizedToken.includes(VERCEL_DOMAIN_TOKEN);
}

function getServerBaseUrl() {
  if (!shouldUseServerProcessing()) {
    return "";
  }

  return normalizeBasePath(DOCUMENT_URL_TOKEN);
}

function getSiteContextEndpoint(params) {
  const query = params ? `?${params.toString()}` : "";

  if (shouldUseServerProcessing()) {
    return `${getServerBaseUrl()}api/site-context${query}`;
  }

  return `/api/site-context${query}`;
}

function invokeGlobal(functionName, ...args) {
  if (!functionName) return undefined;

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || s;

  const candidates = [
    functionName,
    functionName.toLowerCase(),
    capitalize(functionName),
    `initialize${capitalize(functionName)}`,
    `${functionName}Init`,
  ];

  for (const name of candidates) {
    const fn = window[name];
    if (typeof fn === "function") {
      try {
        return fn(...args);
      } catch (err) {
        console.error(`Erro ao executar global ${name}:`, err);
        return undefined;
      }
    }
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
}

function ensureLayoutShells() {
  if (!document.body) {
    return;
  }

  const existingHeader = document.querySelector("header");
  if (existingHeader) {
    return;
  }

  const homeHeading = getHomeHeadingElement();
  const fallbackTitle =
    homeHeading?.textContent?.trim() || document.title || "Início";

  const headerShell = document.createElement("header");
  headerShell.dataset.shell = "true";
  headerShell.className = "app-header-shell";

  const navTitle = document.createElement("nav");
  navTitle.className = "nav-title";

  const homeLink = document.createElement("a");
  homeLink.href = obterCaminhoRelativoLocal();

  const heading = document.createElement("h2");
  heading.textContent = fallbackTitle;

  homeLink.appendChild(heading);
  navTitle.appendChild(homeLink);
  headerShell.appendChild(navTitle);

  document.body.prepend(headerShell);
}

function getHomeHeadingElement() {
  // Suporta variações comuns: #Home, #home e sections com aria-label="Home"
  return (
    document.querySelector("section#Home>h1") ||
    document.querySelector("section#home>h1") ||
    document.querySelector('section[aria-label="Home"]>h1') ||
    document.querySelector('section[aria-label="home"]>h1') ||
    null
  );
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

    const isInHomeSection = isInsideHomeSection(image);
    const shouldPrioritize = index === 0 || isInHomeSection;

    if (!shouldPrioritize && !image.hasAttribute("loading")) {
      image.loading = "lazy";
    }
  });
}

function isInsideHomeSection(node) {
  if (!node || !node.closest) return false;
  return Boolean(
    node.closest("section#Home") ||
    node.closest("section#home") ||
    node.closest('section[aria-label="Home"]') ||
    node.closest('section[aria-label="home"]'),
  );
}

function primeHeadAssets() {
  if (!document.head) return;

  loadAdSenseEarly();
  insertResourceHints();
  ensureLayoutShells();

  criticalCssPromise = Promise.resolve()
    .then(() => insertCSS(CRITICAL_CSS_FILES))
    .catch((error) => {
      console.error("Falha ao carregar as folhas de estilo críticas.", error);
    })
    .then(waitForStylesheetPaint)
    .finally(releaseCssLoadingGate);

  insertFavicon().catch(() => {
    // Silencia erro inicial; favicon será revalidado durante inicialização.
  });
}

function loadAdSenseEarly() {
  const head = document.head;
  if (!head) return;

  if (!document.querySelector('meta[name="google-adsense-account"]')) {
    const meta = document.createElement("meta");
    meta.name = "google-adsense-account";
    meta.content = ADSENSE_PUBLISHER_ID;
    head.appendChild(meta);
  }

  window.adsbygoogle = window.adsbygoogle || [];

  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
  script.crossOrigin = "anonymous";
  head.appendChild(script);
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

  if (shouldUseServerProcessing()) {
    return `${getServerBaseUrl()}${normalizedRelativePath}`;
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

function renderFontAwesomeIcons(scope = document) {
  if (!window.FontAwesome?.dom?.i2svg) {
    return;
  }

  const targetNode =
    scope && scope.nodeType === Node.ELEMENT_NODE ? scope : document;

  window.FontAwesome.dom.i2svg({
    node: targetNode,
  });
}

window.renderFontAwesomeIcons = renderFontAwesomeIcons;

function cleanupFontAwesomeOriginalComments(scope = document) {
  const rootNode =
    scope && scope.nodeType === Node.ELEMENT_NODE ? scope : document;

  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_COMMENT);
  const commentsToRemove = [];

  while (walker.nextNode()) {
    const commentNode = walker.currentNode;
    const commentText = (commentNode.nodeValue || "").trim();

    const isLegacyFontAwesomeComment =
      /<i\b/i.test(commentText) && /\bfa-[\w-]+/i.test(commentText);

    if (isLegacyFontAwesomeComment) {
      commentsToRemove.push(commentNode);
    }
  }

  commentsToRemove.forEach((commentNode) => {
    commentNode.parentNode?.removeChild(commentNode);
  });
}

window.cleanupFontAwesomeOriginalComments = cleanupFontAwesomeOriginalComments;

function updateDocumentTitleFromHome() {
  const titleHome = getHomeHeadingElement();
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

  if (shouldUseServerProcessing()) {
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
    faviconHref: "",
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

  const rawBodyLabel = document.body?.getAttribute("aria-label");
  const bodyLabel = typeof rawBodyLabel === "string" ? rawBodyLabel.trim() : "";
  const params = new URLSearchParams({
    pathname: window.location.pathname,
    bodyLabel,
  });

  try {
    const response = await fetch(getSiteContextEndpoint(params));
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
  const nomeRepository = "study";
  const pathIgnore = ["index.html"];

  return window.location.pathname
    .split("/")
    .filter(Boolean)
    .filter((part) => !pathIgnore.includes(part) && part !== nomeRepository);
}

async function insertFavicon() {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    throw new Error("Head element not found");
  }

  const existingLinks = Array.from(
    head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]'),
  );

  const faviconHref = "/src/assets/favicon/default.ico";

  if (!faviconHref) {
    existingLinks.forEach((faviconLink) => faviconLink.remove());
    return;
  }

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
}

function insertJS(jsFiles = [], path) {
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
  if (!head || !Array.isArray(cssFiles) || cssFiles.length === 0) {
    return Promise.resolve([]);
  }

  function hasLoadedStylesheet(link) {
    try {
      return Boolean(link.sheet);
    } catch {
      return false;
    }
  }

  function waitForStylesheet(link, fileName) {
    if (
      link.dataset.cssLoadState === "loaded" ||
      hasLoadedStylesheet(link)
    ) {
      link.dataset.cssLoadState = "loaded";
      return Promise.resolve({ fileName, state: "loaded" });
    }

    const previousState = link.dataset.cssLoadState;
    if (previousState === "error" || previousState === "timeout") {
      return Promise.resolve({ fileName, state: previousState });
    }

    return new Promise((resolve) => {
      let settled = false;
      let timeoutId = 0;

      const finish = (state) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        link.removeEventListener("load", onLoad);
        link.removeEventListener("error", onError);
        link.dataset.cssLoadState = state;

        if (state !== "loaded") {
          console.warn(`[CSS] ${state} ao carregar ${fileName}: ${link.href}`);
        }

        resolve({ fileName, state });
      };

      const onLoad = () => finish("loaded");
      const onError = () => finish("error");

      link.addEventListener("load", onLoad, { once: true });
      link.addEventListener("error", onError, { once: true });
      timeoutId = window.setTimeout(
        () => finish("timeout"),
        CSS_LINK_TIMEOUT_MS,
      );

      if (hasLoadedStylesheet(link)) finish("loaded");
    });
  }

  const stylesheetPromises = cssFiles.map((entry) => {
    const { fileName, media = "screen" } =
      typeof entry === "string" ? { fileName: entry } : entry || {};
    if (!fileName) return Promise.resolve({ state: "skipped" });

    const href = resolveStaticAssetPath(`${CSS_BASE_PATH}/${fileName}`);
    const absoluteHref = new URL(href, document.baseURI).href;
    const existingLink = Array.from(
      head.querySelectorAll('link[rel="stylesheet"]'),
    ).find((candidate) => {
      try {
        return new URL(candidate.href, document.baseURI).href === absoluteHref;
      } catch {
        return false;
      }
    });

    const link = existingLink || document.createElement("link");
    link.rel = "stylesheet";
    if (!existingLink) {
      link.href = href;
    }
    link.media = media;
    link.dataset.css = fileName;

    if (!existingLink) {
      link.dataset.cssLoadState = "loading";
    }

    const loadPromise = waitForStylesheet(link, fileName);
    if (!existingLink) head.appendChild(link);
    return loadPromise;
  });

  return Promise.all(stylesheetPromises);
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

// Envolve links que sejam filhos diretos de `.card` dentro de um `section.buttonContainer`.
// Isso evita mover links inline dentro de parágrafos e corrige páginas que
// possuem âncoras diretas nos cards sem precisar editar todos os HTMLs.
function wrapCardLinks() {
  try {
    document.querySelectorAll(".card").forEach((card) => {
      // Seleciona apenas âncoras que sejam filhos diretos do .card
      const directAnchors = Array.from(card.querySelectorAll(":scope > a"));
      if (directAnchors.length === 0) return;

      // Cria o wrapper apenas se necessário
      const wrapper = document.createElement("section");
      wrapper.className = "buttonContainer";

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
    window.FontAwesome.config.autoReplaceSvg = true;
    window.FontAwesome.config.keepOriginalSource = false;
    cleanupFontAwesomeOriginalComments(document);
    renderFontAwesomeIcons(document);
    cleanupFontAwesomeOriginalComments(document);
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
  const nomeRepository = "study";

  // Caminho relativo do arquivo HTML atual em relação à raiz do site
  let caminhoHTML = window.location.pathname.replace(/^\//, "");

  if (caminhoHTML.startsWith(nomeRepository + "/")) {
    caminhoHTML = caminhoHTML.substring(nomeRepository.length + 1);
  }

  // Se quiser apenas o diretório do arquivo HTML:
  const directoryHTML = caminhoHTML.substring(
    0,
    caminhoHTML.lastIndexOf("/") + 1,
  );

  // Conta quantas pastas existem no caminho (ignorando o arquivo)
  const pastas =
    directoryHTML === "" ? [] : directoryHTML.split("/").filter(Boolean);

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

async function headInsert(path) {
  const titleHomeEarly = getHomeHeadingElement();
  const titleText = titleHomeEarly?.textContent?.trim();
  await criticalCssPromise;
  await insertFavicon();
  await insertJS(CRITICAL_JS_FILES, path);

  invokeGlobal("navBar", titleText);
}
