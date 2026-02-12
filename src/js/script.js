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
    caminhoHTML.lastIndexOf("/") + 1
  );

  // Conta quantas pastas existem no caminho (ignorando o arquivo)
  const pastas =
    diretorioHTML === "" ? [] : diretorioHTML.split("/").filter(Boolean);

  // Gera a string com "../" para cada pasta
  const caminhoRelativoAteRaiz = pastas.map(() => "../").join("");

  return caminhoRelativoAteRaiz;
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("DOM carregado, inicializando...");
    initializeNavigation();
    initializeSmoothScroll();
    initializeCookies();
    wrapCardLinks();
    initializeFooter();
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

  // Título no nav (se existir)
  const header = document.querySelector("header");
  if (header) {
    const titleEl = document.querySelector("title");
    const title = titleEl ? titleEl.textContent : document.title;

    // Insere o título de forma segura (sem substituir conteúdo existente)
    const nav = document.createElement("nav");
    header.insertBefore(nav, header.firstChild);
    const linkHome = document.createElement("a");
    linkHome.href = "#home";
    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.className = "nav-title";
    linkHome.appendChild(heading);
    nav.appendChild(linkHome);
  }
});

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
            <li><a href="#home">Início</a></li>
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
