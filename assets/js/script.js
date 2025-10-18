function obterCaminhoRelativo() {
  // Nome do repositório no GitHub Pages (ajuste para o seu repositório)
  const nomeRepositório = "study";

  // Caminho relativo do arquivo HTML atual em relação à raiz do site
  let caminhoHTML = window.location.pathname.replace(/^\//, "");

  // Se estiver rodando no GitHub Pages, remova o nome do repositório do início do caminho
  if (caminhoHTML.startsWith(nomeRepositório + "/")) {
    caminhoHTML = caminhoHTML.substring(nomeRepositório.length + 1);
  }

  // Se quiser apenas o diretório do arquivo HTML:
  const diretórioHTML = caminhoHTML.substring(
    0,
    caminhoHTML.lastIndexOf("/") + 1
  );

  // Conta quantas pastas existem no caminho (ignorando o arquivo)
  const pastas =
    diretórioHTML === "" ? [] : diretórioHTML.split("/").filter(Boolean);

  // Gera a string com "../" para cada pasta
  const caminhoRelativoAteRaiz = pastas.map(() => "../").join("");

  return caminhoRelativoAteRaiz;
}

document.addEventListener("DOMContentLoaded", () => {
  // Setar configs salvas em Cookies
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  if (cookies.fontSize) {
    document.querySelector("body").style.fontSize = cookies.fontSize + "px";
  }

  // Obter o caminho relativo até a raiz do site
  const caminhoRelativo = obterCaminhoRelativo();

  // Título
  const header = document.querySelector("header");
  if (header) {
    const title = document.querySelector("title").innerHTML;
    document.querySelector("nav").innerHTML = `
      <h2>${title}</h2>
    `;
  }

  // --- Menu hambúrguer (mobile) ---
  const navLinksButton = document.getElementById("nav-links-button");
  const navLinks =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links");
  const burgerIcon = document.querySelector(".burger-icon");

  if (navLinksButton && navLinks && burgerIcon) {
    navLinksButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
      } else {
        navLinks.style.display = "flex";
        burgerIcon.src = `${caminhoRelativo}assets/svg/close.svg`;
      }
    });

    // Fecha o menu ao clicar fora dele (mobile)
    document.addEventListener("click", (event) => {
      if (
        navLinks.style.display === "flex" &&
        !navLinks.contains(event.target) &&
        event.target !== navLinksButton &&
        !navLinksButton.contains(event.target)
      ) {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
      }
    });

    document.querySelectorAll(".nav_links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
      });
    });
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

  // * Testes
  console.log("Caminho relativo até a raiz:", caminhoRelativo); // Imprime no console o caminho relativo do site
  console.log("Tamanho da fonte:" + cookies.fontSize); // Imprime no console o tamanho da fonte salvo nos cookies
});

// Responsividade do menu ao redimensionar a janela
function mudouJanela() {
  const caminhoRelativo = obterCaminhoRelativo();
  const itens = document.querySelector(".nav_links");
  const burgerIcon = document.querySelector(".burger-icon");
  if (!itens || !burgerIcon) return;
  if (window.innerWidth >= "990px") {
    itens.style.display = "contents";
    burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
  } else {
    itens.style.display = "none";
    burgerIcon.src = `${caminhoRelativo}assets/svg/menu.svg`;
  }
}

// Funções de acessibilidade no escopo global
function accessibilityButton() {
  var options = document.getElementById("accessibility-options");
  if (!options) return;
  options.style.display = options.style.display === "flex" ? "none" : "flex";
}

function increaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 1.2;
  body.style.fontSize = newSize + "px";
  document.cookie = `fontSize=${newSize}; path=/;`;
}

function decreaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) / 1.2;
  body.style.fontSize = newSize + "px";
  document.cookie = `fontSize=${newSize}; path=/;`;
}

function resetFont() {
  var body = document.querySelector("body");
  body.style.fontSize = "1em"; // Tamanho padrão
  document.cookie = `fontSize=; path=/;`;
}
