document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("DOM carregado, inicializando...");
    // Recupera título da página (se existir) e cria o header antes de inicializar o menu
    const titleHomeEarly = document.querySelector("section#Home>h1");
    const titleText = titleHomeEarly ? titleHomeEarly.innerHTML : undefined;
    navBar(titleText);
    initializeNavigation();
    initializeSmoothScroll();
    initializeCookies();
    wrapCardLinks();
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

  const favicon = document.querySelector('link[rel="shortcut icon"]');
  if (!favicon) {
    const faviconCreated = document.createElement("link");
    faviconCreated.rel = "shortcut icon";
    faviconCreated.type = "image/x-icon";
    faviconCreated.href = `${obterCaminhoRelativo()}https://icons8.com/icon/42763/book`;
    head.appendChild(faviconCreated);
  }

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
});

function navBar(title) {
  // Se já houver um header, não criar outro
  if (document.querySelector("header")) return;
  const header = document.createElement("header");

  // Cria o título de navegação dinamicamente
  const navTitle = document.createElement("nav");
  navTitle.className = "nav-title";
  const linkingHome = document.createElement("a");
  linkingHome.href = "#Home";
  const heading = document.createElement("h2");
  heading.textContent = title || "Título do Site";
  linkingHome.appendChild(heading);
  navTitle.appendChild(linkingHome);
  header.appendChild(navTitle);

  // Cria o botão de menu para telas menores
  const navLinksButton = document.createElement("button");
  navLinksButton.id = "nav-links-button";
  navLinksButton.setAttribute("aria-label", "Toggle navigation menu");
  navLinksButton.setAttribute("aria-expanded", "false");
  navLinksButton.setAttribute("aria-controls", "navLinks");
  const menuIcon = document.createElement("i");
  menuIcon.id = "menuIcon";
  menuIcon.className = "fa-solid fa-bars icon";
  navLinksButton.appendChild(menuIcon);
  header.appendChild(navLinksButton);

  // Cria o container para os links de navegação
  const navLinks = document.createElement("nav");
  navLinks.className = "nav_links";
  navLinks.id = "navLinks";
  const caminhoHome = obterCaminhoRelativo();
  const caminhoPastaAnterior = pastaAnterior();

  if (caminhoHome) {
    const link = document.createElement("a");
    link.href = caminhoHome;
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-home icon";
    link.append(icon);
    navLinks.appendChild(link);
  }

  if (caminhoPastaAnterior) {
    const link = document.createElement("a");
    link.href = `../${caminhoPastaAnterior}.html`;
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-arrow-left icon";
    link.append(icon);
    navLinks.appendChild(link);
  }

  const containers = document.querySelectorAll("main>section");

  containers.forEach((container) => {
    const containerId = container.id;
    if (containerId && containerId !== "Home") {
      const link = document.createElement("a");
      link.href = `#${containerId}`;
      link.role = "menuitem";
      link.innerHTML = containerId;
      navLinks.appendChild(link);
    }
  });

  header.appendChild(navLinks);

  // Insere o header no início do body de forma segura (sem substituir conteúdo existente)
  document.querySelector("body").prepend(header);
}

function footer() {
  const footer = document.createElement("footer");
  document.querySelector("body").appendChild(footer);
}

function obterCaminhoRelativo() {
  // Nome do repositório no GitHub Pages (ajuste para o seu repositório)
  const nomeRepositorio = "study";

  // Caminho relativo do arquivo HTML atual em relação à raiz do site
  let caminhoHTML = window.location.pathname.replace(/^\//, "");

  // Se estiver rodando no GitHub Pages, remova o nome do repositório do início do caminho
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

function pastaAnterior() {
  const path = window.location.pathname;
  const pats = path.split("/");
  const parentFolder = pats[pats.length - 3];

  return parentFolder;
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

// --- Rodapé dinâmico ---
function initializeFooter() {
  const footer = document.querySelector("footer");
  if (footer) {
    const data = new Date();
    const ano = data.getFullYear();
    footer.innerHTML = `
      <div class="container_footer">
        <div class="card_footer">
          <h2>Projeto de Estudos</h2>
          <p>
            Projeto realizado para estudos de programação, com possibilidade de uso de qualquer pessoa.
          </p>
        </div>
        <div class="card_footer">
          <h2>Links Rápidos</h2>
          <ul>
            <li><a href="#Home">Início</a></li>
            <li><a href="https://github.com/jlbbarco/study">Repositório</a></li>
            </ul>
          </div>
          <div class="card_footer">
            <h2>Recursos</h2>
            <ul>
              <li><a href="https://jlbbarco.github.io/portfolio">Portfólio</a></li>
              <li><a href="https://github.com/JLBBARCO">GitHub</a></li>
            </ul>
          </div>
      </div>
      <p class="copyright">
        &copy; ${ano}. Todos os direitos de uso liberados.
      </p>
    `;
  }
}

// Responsividade do menu ao redimensionar a janela
function mudouJanela() {
  console.log("Janela redimensionada");
  const navLinks = document.querySelector(".nav_links");

  if (window.innerWidth >= 990) {
    navLinks?.classList.remove("active");
  }
}

// Adicione o listener de resize com debounce
window.addEventListener("resize", debounce(mudouJanela, 250));

function initializeNavigation() {
  console.log("Inicializando navegação...");

  const navLinksButton = document.getElementById("nav-links-button");
  const navLinks = document.querySelector(".nav_links");
  const menuIcon = document.getElementById("menuIcon");

  if (!navLinksButton || !navLinks) {
    console.error("Elementos do menu não encontrados");
    return;
  }

  // Inicializar estado do botão
  navLinksButton.setAttribute("aria-expanded", "false");

  navLinksButton.addEventListener("click", function (event) {
    event.preventDefault();

    const isExpanded = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");

    // Alternar o ícone dinamicamente (verifica existência do ícone)
    if (menuIcon) {
      if (isExpanded) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      } else {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      }
    }

    // Atualiza aria-expanded (usar string)
    navLinksButton.setAttribute("aria-expanded", (!isExpanded).toString());

    // Log para debug
    console.log("Menu clicked:", {
      isExpanded: !isExpanded,
      menuVisível: navLinks.classList.contains("active"),
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (event) => {
    if (
      !navLinksButton.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
      navLinksButton.setAttribute("aria-expanded", "false");
    }
  });

  // Permitir fechar menu com Esc para maior acessibilidade
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
      navLinksButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Funções de acessibilidade no escopo global
function accessibilityButton() {
  var options = document.getElementById("accessibility-options");
  if (!options) return;
  options.style.display = options.style.display === "flex" ? "none" : "flex";
}

function increaseFont() {
  var body = document.querySelector("body");
  if (!body) return;
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 1.2;
  body.style.fontSize = newSize + "px";
  // salva por 1 ano
  document.cookie = `fontSize=${newSize}px; path=/; max-age=${
    60 * 60 * 24 * 365
  }`;
}

function decreaseFont() {
  var body = document.querySelector("body");
  if (!body) return;
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) / 1.2;
  body.style.fontSize = newSize + "px";
  document.cookie = `fontSize=${newSize}px; path=/; max-age=${
    60 * 60 * 24 * 365
  }`;
}

function resetFont() {
  var body = document.querySelector("body");
  if (!body) return;
  body.style.fontSize = ""; // remove estilo inline e volta ao padrão do CSS
  // remove cookie
  document.cookie = "fontSize=; path=/; max-age=0";
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
