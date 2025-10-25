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
    initializeFooter();
  } catch (error) {
    console.error("Erro na inicialização:", error);
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

window.addEventListener("resize", debounce(mudouJanela, 250));

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

// Título no nav (se existir)
const header = document.querySelector("header");
const nav = document.querySelector("nav");
if (header && nav) {
  const titleEl = document.querySelector("title");
  const title = titleEl ? titleEl.textContent : document.title;
  nav.innerHTML = `<h2>${title}</h2>`;
}

// --- Rodapé dinâmico ---
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
            <li><a href="https://portfolio-jlbbarco.vercel.app">Portfólio</a></li>
            <li><a href="https://github.com/JLBBARCO">GitHub</a></li>
          </ul>
        </div>
    </div>
    <p class="copyright">
      &copy; ${ano}. Todos os direitos de uso liberados.
    </p>
  `;
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
  const burgerIcon = document.querySelector(".burger-icon");
  const burgerImg = burgerIcon.querySelector("img"); // Seleciona a imagem dentro do span

  if (!navLinksButton || !navLinks || !burgerIcon || !burgerImg) {
    console.error("Elementos do menu não encontrados");
    return;
  }

  // Inicializar estado do botão
  navLinksButton.setAttribute("aria-expanded", "false");

  navLinksButton.addEventListener("click", function (event) {
    event.preventDefault();

    const isExpanded = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");

    // Alternar o ícone dinamicamente
    if (isExpanded) {
      burgerImg.src = `${obterCaminhoRelativo()}/assets/icon/menu.svg`; // Ícone de menu
      burgerImg.alt = "Ícone de Menu";
    } else {
      burgerImg.src = `${obterCaminhoRelativo()}/assets/icon/close.svg`; // Ícone de fechar
      burgerImg.alt = "Ícone de Fechar";
    }

    // Atualiza aria-expanded
    navLinksButton.setAttribute("aria-expanded", !isExpanded);

    // Log para debug
    console.log("Menu clicked:", {
      isExpanded: !isExpanded,
      iconSrc: burgerImg.src,
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (event) => {
    if (
      !navLinksButton.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      burgerImg.src = `${obterCaminhoRelativo()}/assets/icon/menu.svg`; // Volta para o ícone de menu
      burgerImg.alt = "Ícone de Menu";
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
