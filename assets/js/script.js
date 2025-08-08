var janelaPadrao = 990;
var janelaPadraoPX = janelaPadrao + "px";

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

// Para debug:
console.log("Caminho do HTML:", caminhoHTML);
console.log("Diretório do HTML:", diretórioHTML);
console.log("Quantidade de pastas:", pastas.length);
console.log("Caminho relativo até a raiz:", caminhoRelativoAteRaiz);

document.addEventListener("DOMContentLoaded", () => {
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
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/menu.svg`;
      } else {
        navLinks.style.display = "flex";
        burgerIcon.src = `${caminhoRelativoAteRaiz}assets/svg/close.svg`;
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

  // Menu Lateral
  document.getElementById("menuLateral").innerHTML = `
    <ul>
        <li><a href="${caminhoRelativoAteRaiz}index.html">Início</a></li>
          <ul>
            <li><a href="https://jlbbarco.github.io">Portfólio</a></li>
            <li><a href="${caminhoRelativoAteRaiz}meus_projetos/meus_projetos.html">Meus Projetos</a></li>
            <li><a href="${caminhoRelativoAteRaiz}cursoemvideo/cursoemvideo.html">Curso em Vídeo</a></li>
              <ul>
                <li><a href="${caminhoRelativoAteRaiz}cursoemvideo/html-css/html-css.html">HTML & CSS</a></li>
                <li><a href="${caminhoRelativoAteRaiz}cursoemvideo/git-github/git-github.html">Git & GitHub</a></li>
                <li><a href="${caminhoRelativoAteRaiz}cursoemvideo/javascript/javascript.html">JavaScript</a></li>
                <li><a href="${caminhoRelativoAteRaiz}cursoemvideo/python/python.html">Python</a></li>
              </ul>
            <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/colegio_adolpho.html">Colégio Adolpho</a></li>
              <ul>
                <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/aulas_extracurriculares/aulas_extracurriculares.html">Aulas Extracurriculares</a></li>
                <ul>
                  <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/aulas_extracurriculares/robotica/robotica.html">Robótica</a></li>
                </ul>
                <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/projetos/projetos.html">Projetos</a></li>
                <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/2_serie/2_serie.html">2ª Série</a></li>
                <ul>
                  <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/2_serie/programacao_front-end/programacao_front-end.html">Programação Front-End</a></li>
                </ul>
                <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/3_serie/3_serie.html">3ª Série</a></li>
                <ul>
                  <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/3_serie/programacao_desenvolvimento_sistemas/programacao_desenvolvimento_sistemas.html">Programação no Desenvolvimento de Sistemas</a></li>
                  <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/3_serie/ciencias_dados/ciencias_dados.html">Ciências de Dados</a></li>
                  <li><a href="${caminhoRelativoAteRaiz}colegio_adolpho/3_serie/programacao_back-end/programacao_back-end.html">Programação Back-End</a></li>
                </ul>
              </ul>
          </ul>
    </ul>
  `;

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
