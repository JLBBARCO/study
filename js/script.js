document.addEventListener("DOMContentLoaded", () => {
  // --- Menu Hamburguer (mobile) ---
  const navLinksButton = document.getElementById("nav-links-button");
  const navLinks =
    document.querySelector(".nav_links") ||
    document.querySelector(".nav_links") ||
    document.querySelector(".nav-links") ||
    document.querySelector(".nav_links");
  // Tenta pegar .nav_links ou .nav-links, pois há variações nos arquivos

  if (navLinksButton && navLinks) {
    navLinksButton.addEventListener("click", () => {
      if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      } else {
        navLinks.style.display = "flex";
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
      }
    });

    document.querySelectorAll(".nav_links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
      });
    });
  }

  // --- Acessibilidade ---
  const accessibilityButton = document.getElementById("accessibility-button");
  const accessibilityTrigger = document.getElementById("accessibility-trigger");
  const accessibilityOptions = document.getElementById("accessibility-options");
  const increaseFontButton = document.getElementById("increase-font");
  const decreaseFontButton = document.getElementById("decrease-font");
  let font = parseFloat(localStorage.getItem("fontSize")) || 1;

  // Alterna visibilidade das opções de acessibilidade
  if (accessibilityTrigger && accessibilityOptions) {
    accessibilityTrigger.addEventListener("click", () => {
      if (accessibilityOptions.style.display === "flex") {
        accessibilityOptions.style.display = "none";
      } else {
        accessibilityOptions.style.display = "flex";
      }
    });
  }

  // Controle de tamanho da fonte
  if (increaseFontButton && decreaseFontButton) {
    document.body.style.fontSize = font + "em";

    increaseFontButton.addEventListener("click", () => {
      font += 0.1;
      document.body.style.fontSize = font + "em";
      localStorage.setItem("fontSize", font);
    });

    decreaseFontButton.addEventListener("click", () => {
      font = Math.max(0.5, font - 0.1);
      document.body.style.fontSize = font + "em";
      localStorage.setItem("fontSize", font);
    });
  }

  // --- Rodapé dinâmico ---
  const copyright = document.getElementById("copyright");
  if (copyright) {
    const data = new Date();
    const ano = data.getFullYear();
    copyright.innerHTML = `&copy; ${ano} Site criado por <a href="http://github.com/JLBBARCO" target="_blank" rel="noopener noreferrer">José Luiz B Barco</a>`;
  }
});
