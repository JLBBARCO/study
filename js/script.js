document.addEventListener("DOMContentLoaded", () => {
  // --- Menu Hamburguer (mobile) ---
  const navLinksButton = document.getElementById("nav-links-button");
  const navLinks =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links");
  // Tenta pegar .nav_links ou .nav-links
  const icon = document.querySelector("i.burger-icon");

  if (navLinksButton && navLinks) {
    navLinksButton.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
        icon.innerHTML = "menu"; // Muda o ícone para "menu"
      } else {
        navLinks.style.display = "flex";
        icon.innerHTML = "close"; // Muda o ícone para "close"
      }
    });

    // Fecha o menu ao clicar fora dele (mobile)
    document.addEventListener("click", (event) => {
      if (
        navLinks.style.display === "flex" &&
        !navLinks.contains(event.target) &&
        event.target !== navLinksButton &&
        !navLinksButton.contains(event.target) &&
        icon.innerHTML === "close" // Verifica se o ícone é "close"
      ) {
        navLinks.style.display = "none";
        icon.innerHTML = "menu"; // Muda o ícone de volta para "menu"
      }
    });

    document.querySelectorAll(".nav_links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
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
          <i class="material-symbols-outlined">accessibility_new</i>
          </button>
          <div id="accessibility-options" style="display:none;">
          <button id="increase-font" onclick="increaseFont()">
            <i class="material-symbols-outlined">text_increase</i>
          </button>
          <button id="decrease-font" onclick="decreaseFont()">
            <i class="material-symbols-outlined">text_decrease</i>
          </button>
          <button id="reset-font" onclick="resetFont()">
            <i class="material-symbols-outlined">format_clear</i>
          </button>
        </div>
      </div>
      &copy; ${ano}<br>
      Site criado por José Luiz B Barco
    `;
  }

  // Aplica o tamanho da fonte salvo ao carregar a página
  aplicarFonteSalva();
});

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
  }
}

function increaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 1.5;
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize);
}

function decreaseFont() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) / 1.5;
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize);
}

function resetFont() {
  var body = document.querySelector("body");
  body.style.fontSize = "1em"; // Tamanho padrão
  localStorage.removeItem("tamanhoFonte"); // Remove o tamanho salvo
  aplicarFonteSalva(); // Aplica o tamanho padrão
}
