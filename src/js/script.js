document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("DOM carregado, inicializando...");
    await carregarContextoServidor();
    // Recupera título da página (se existir) e cria o header antes de inicializar o menu
    const titleHomeEarly = document.querySelector("section#Home>h1");
    const titleText = titleHomeEarly ? titleHomeEarly.innerHTML : undefined;
    await insertFavicon();
    await insertJS();
    insertCSS();
    navBar(titleText);
    initializeNavigation();
    initializeSmoothScroll();
    initializeCookies();
    wrapCardLinks();
    adSense();
    // footer element will be created and inicializado após ajustes
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }

  const head = document.querySelector("head");
  const script = document.createElement("script");
  script.src = "https://kit.fontawesome.com/4a1e49a1ca.js";
  script.crossOrigin = "anonymous";
  script.onload = () => {
    console.log("Font Awesome carregado com sucesso");
    initializeFontAwesome();
  };
  head.appendChild(script);

  // Garantir criação do footer e em seguida popular seu conteúdo
  footer();
  initializeFooter();

  const titleHome = document.querySelector("section#Home>h1");
  if (titleHome) {
    const title = titleHome.innerHTML;

    let titlePg = document.querySelector("title");
    if (!titlePg) {
      titlePg = document.createElement("title");
      document.head.appendChild(titlePg);
    }
    titlePg.innerHTML = title;

    // navBar já foi criado no início; não recriar aqui
  }

  paths();
  pathNames();
});

let siteContextCache = null;

function getCurrentSiteContext() {
  return siteContextCache;
}

window.getCurrentSiteContext = getCurrentSiteContext;

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

function buildLocalSiteContext() {
  const relativeRootPath = obterCaminhoRelativoLocal();
  return {
    relativeRootPath,
    pathParts: extrairPathPartsLocal(),
    faviconHref: `${relativeRootPath}src/assets/favicon/default.ico`,
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

  if (isOfflineContextEnabled()) {
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
    if (!response.ok) {
      throw new Error(
        `Falha ao carregar contexto do servidor: ${response.status}`,
      );
    }

    const context = await response.json();
    siteContextCache = context;
    return context;
  } catch (error) {
    console.warn(
      "Não foi possível carregar contexto no servidor. Usando fallback local.",
      error,
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
  const body = document.querySelector("body");
  if (!body) {
    console.error("Body element not found");
    return Promise.reject(new Error("Body element not found"));
  }

  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return Promise.reject(new Error("Head element not found"));
  }

  const context = getCurrentSiteContext();
  const fallbackPath = `${obterCaminhoRelativoLocal()}src/assets/favicon/default.ico`;
  const faviconHref = context?.faviconHref || fallbackPath;

  const link = document.createElement("link");
  link.rel = "shortcut icon";
  link.type = "image/x-icon";
  link.href = faviconHref;

  head.appendChild(link);
  console.log(`[Favicon] ✓ Favicon definido com sucesso: ${link.href}`);
  return Promise.resolve();
}

function insertJS() {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return Promise.reject(new Error("Head element not found"));
  }

  const caminhoRelativo = obterCaminhoRelativo();
  const jsFiles = [
    "header.js",
    "accessibility.js",
    "footer.js",
    "paths.js",
    "adsense.js",
  ];

  function carregarScript(fileName) {
    const scriptSrc = caminhoRelativo + "src/js/" + fileName;
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.onload = () => {
        console.log(`[JavaScript] ${fileName} carregado com sucesso`);
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

function insertCSS() {
  const head = document.querySelector("head");
  if (!head) {
    console.error("Head element not found");
    return;
  }

  const caminhoRelativo = obterCaminhoRelativo();
  const cssFiles = [
    { fileName: "style.css", media: "screen" },
    { fileName: "cards.css", media: "screen" },
  ];

  cssFiles.forEach(({ fileName, media }) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = caminhoRelativo + "src/css/" + fileName;
    link.media = media;
    link.onload = () => {
      console.log(`[CSS] ${fileName} carregado com sucesso`);
    };
    link.onerror = () => {
      console.error(`[CSS] Erro ao carregar ${fileName} em: ${link.href}`);
    };
    head.appendChild(link);
  });
}

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
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
    console.log("wrapCardLinks: links diretos em .card foram agrupados.");
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
  console.log("Janela redimensionada");
  const navLinks = document.querySelector(".nav_links");

  if (window.innerWidth >= 990) {
    navLinks?.classList.remove("active");
  }
}
