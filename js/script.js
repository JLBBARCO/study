var janelaPadrao = 990;
var janelaPadraoPX = janelaPadrao + "px";

// Caminho relativo do arquivo HTML atual em relação à raiz do site
const caminhoHTML = window.location.pathname.replace(/^\//, "");
// Exemplo de saída: "index.html", "pasta1/arquivo.html", "pasta1/pasta2/arquivo.html"

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

// Para debug:
console.log("Caminho do HTML:", caminhoHTML);
console.log("Diretório do HTML:", diretorioHTML);
console.log("Quantidade de pastas:", pastas.length);
console.log("Caminho relativo até a raiz:", caminhoRelativoAteRaiz);

document.addEventListener("DOMContentLoaded", () => {
  // --- Menu Hamburguer (mobile) ---
  const navLinksButton = document.getElementById("nav-links-button");
  const navLinks =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links");
  const burgerIcon = document.querySelector(".burger-icon");

  if (navLinksButton && navLinks && burgerIcon) {
    navLinksButton.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
      } else {
        navLinks.style.display = "flex";
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/close.svg`;
      }
    });

    // Fecha o menu ao clicar fora dele (mobile)
    document.addEventListener("click", (event) => {
      if (
        navLinks.style.display === "contents" &&
        !navLinks.contains(event.target) &&
        event.target !== navLinksButton &&
        !navLinksButton.contains(event.target) &&
        burgerIcon.src.endsWith("close.svg")
      ) {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
      }
    });

    document.querySelectorAll(".nav_links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
      });
    });
  }

  // --- Rodapé dinâmico ---
  const footer = document.querySelector("footer");
  if (footer) {
    const data = new Date();
    const ano = data.getFullYear();
    footer.innerHTML = `
      <div id="accessibility">
        <button
          id="accessibility-button"
          aria-label="Acessibilidade"
          onclick="accessibilityButton()"
        >
          <img src="${caminhoRelativoAteRaiz}assets/svg/accessibility.svg" alt="SVG de acessibilidade" class="icon" />
        </button>
        <div id="accessibility-options" style="display:none;">
          <button id="increase-font" onclick="increaseFont()">
            <img src="${caminhoRelativoAteRaiz}assets/svg/increase_font.svg" alt="SVG de aumentar fonte" class="icon" />
          </button>
          <button id="decrease-font" onclick="decreaseFont()">
            <img src="${caminhoRelativoAteRaiz}assets/svg/decrease_font.svg" alt="SVG de diminuir fonte" class="icon" />
          </button>
          <button id="reset-font" onclick="resetFont()">
            <img src="${caminhoRelativoAteRaiz}assets/svg/format_clear.svg" alt="SVG de resetar fonte" class="icon" />
          </button>
        </div>
      </div>
      <div class="container_footer">
        <div class="card_footer">
          <h2>Projeto de Estudos</h2>
          <p>
            Projeto realizado para estudos de programação, com possibilidade de uso de qualquer pessoa.
          </p>
        </div>
        <div class="card_footer"></div>
      </div>
      <p class="copyright">
        &copy; ${ano}. Todos os direitos de uso liberados.
      </p>
    `;
  }

  // Aplica o tamanho da fonte salvo ao carregar a página
  aplicarFonteSalva();
});

// Responsividade do menu ao redimensionar a janela
function mudouJanela() {
  const itens = document.querySelector(".nav_links");
  const burgerIcon = document.querySelector(".burger-icon");
  if (!itens || !burgerIcon) return;
  if (window.innerWidth >= janelaPadrao) {
    itens.style.display = "contents";
    burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
  } else {
    itens.style.display = "none";
    burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
  }
}

// Funções de acessibilidade no escopo global
function accessibilityButton() {
  var options = document.getElementById("accessibility-options");
  if (!options) return;
  options.style.display = options.style.display === "flex" ? "none" : "flex";
}

function aplicarFonteSalva() {
  var tamanhoSalvo = localStorage.getItem("tamanhoFonte");
  if (tamanhoSalvo) {
    document.querySelector("body").style.fontSize = tamanhoSalvo + "px";
  } else {
    document.querySelector("body").style.fontSize = "1em";
  }
}

function increaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 1.2;
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize);
}

function decreaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) / 1.2;
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize);
}

function resetFont() {
  var body = document.querySelector("body");
  body.style.fontSize = "1em"; // Tamanho padrão
  localStorage.removeItem("tamanhoFonte");
  aplicarFonteSalva();
}
