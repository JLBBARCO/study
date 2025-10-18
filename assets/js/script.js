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

  // Obter o caminho relativo até a raiz do site
  const caminhoRelativo = obterCaminhoRelativo();

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
            <li><a href="https://jlbbarco.github.io/study/">Página Inicial</a></li>
            <li><a href="https://github.com/jlbbarco/study">Repositório</a></li>
            </ul>
          </div>
          <div class="card_footer">
            <h2>Recursos</h2>
            <ul>
              <li><a href="https://jlbbarco.github.io/">Portfólio</a></li>
              <li><a href="https://jlbbarco.github.io/contact/">Contato</a></li>
            </ul>
          </div>
      </div>
      <p class="copyright">
        &copy; ${ano}. Todos os direitos de uso liberados.
      </p>
    `;
  }
});

// Responsividade do menu ao redimensionar a janela
function mudouJanela() {
  const caminhoRelativo = obterCaminhoRelativo();
  const itens =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links");
  const burgerIcon = document.querySelector(".burger-icon");
  if (!itens || !burgerIcon) return;
  if (window.innerWidth >= 990) {
    // Em telas grandes, mostrar links (removendo o display inline que pode ter sido definido)
    itens.style.display = "";
    if (burgerIcon.tagName.toLowerCase() === "img") {
      burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
    } else {
      burgerIcon.setAttribute("src", `${caminhoRelativo}assets/svg/menu.svg`);
    }
  } else {
    // Em telas pequenas, esconder por padrão
    itens.style.display = "none";
    if (burgerIcon.tagName.toLowerCase() === "img") {
      burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
    } else {
      burgerIcon.setAttribute("src", `${caminhoRelativo}assets/svg/menu.svg`);
    }
  }
}

// NavLinks
function navLinks() {
  // --- Menu hambúrguer (mobile) ---
  const navLinksButton = document.getElementById("nav-links-button");
  const navLinksElement =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links");
  const burgerIcon = document.querySelector(".burger-icon");

  if (!navLinksButton || !navLinksElement || !burgerIcon) return;

  const caminhoRelativo = obterCaminhoRelativo();

  const setToMenu = () => {
    burgerIcon.classList.remove("iconClose");
    burgerIcon.classList.add("iconMenu");
    if (burgerIcon.tagName.toLowerCase() === "img") {
      burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
    } else {
      burgerIcon.setAttribute("src", `${caminhoRelativo}assets/svg/menu.svg`);
    }
  };

  const setToClose = () => {
    burgerIcon.classList.remove("iconMenu");
    burgerIcon.classList.add("iconClose");
    if (burgerIcon.tagName.toLowerCase() === "img") {
      burgerIcon.src = `${caminhoRelativo}assets/svg/close.svg`;
    } else {
      burgerIcon.setAttribute("src", `${caminhoRelativo}assets/svg/close.svg`);
    }
  };

  navLinksButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentDisplay = getComputedStyle(navLinksElement).display;
    if (currentDisplay === "flex" || currentDisplay === "block") {
      navLinksElement.style.display = "none";
      setToMenu();
    } else {
      navLinksElement.style.display = "flex";
      setToClose();
    }
  });

  // Fecha o menu ao clicar fora dele (mobile)
  document.addEventListener("click", (event) => {
    const currentDisplay = getComputedStyle(navLinksElement).display;
    if (
      (currentDisplay === "flex" || currentDisplay === "block") &&
      !navLinksElement.contains(event.target) &&
      event.target !== navLinksButton &&
      !navLinksButton.contains(event.target)
    ) {
      navLinksElement.style.display = "none";
      setToMenu();
    }
  });

  navLinksElement.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksElement.style.display = "none";
      setToMenu();
    });
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
