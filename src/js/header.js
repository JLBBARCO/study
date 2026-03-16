function navBar(title) {
  let header = document.querySelector("header");
  if (header?.dataset.initialized === "true") return;

  if (!header) {
    header = document.createElement("header");
  }

  header.replaceChildren();
  header.dataset.initialized = "true";
  header.removeAttribute("aria-hidden");
  header.classList.remove("app-header-shell");
  delete header.dataset.shell;

  // Cria o título de navegação dinamicamente
  const navTitle = document.createElement("nav");
  navTitle.className = "nav-title";
  const linkingHome = document.createElement("a");
  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;
  linkingHome.href = context?.relativeRootPath || obterCaminhoRelativo();
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
  const menuIcon = document.createElement("span");
  menuIcon.id = "menuIcon";
  menuIcon.className = "menu-icon-glyph";
  menuIcon.setAttribute("aria-hidden", "true");
  menuIcon.textContent = "☰";
  navLinksButton.appendChild(menuIcon);
  header.appendChild(navLinksButton);

  // Cria o container para os links de navegação
  const navLinks = document.createElement("nav");
  navLinks.className = "nav_links";
  navLinks.id = "navLinks";

  const containers = document.querySelectorAll("main>section");

  containers.forEach((container) => {
    const containerId = container.id;
    // não adiciona âncora para a seção inicial, já temos título vinculando Home
    if (containerId && containerId !== "Home") {
      const link = document.createElement("a");
      link.href = `#${containerId}`;
      link.role = "menuitem";
      link.textContent = containerId; // Usar textContent em vez de innerHTML para evitar XSS
      navLinks.appendChild(link);
    }
  });

  header.appendChild(navLinks);

  // Insere o header no início do body de forma segura (sem substituir conteúdo existente)
  const body = document.querySelector("body");
  if (body) {
    if (!header.isConnected) {
      body.prepend(header);
    }
  } else {
    console.error("Body element not found, cannot insert header");
  }
}

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

  // Adicionar listener de resize com debounce
  window.addEventListener("resize", debounce(mudouJanela, 250));

  navLinksButton.addEventListener("click", function (event) {
    event.preventDefault();

    const isExpanded = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");

    // Alternar o ícone dinamicamente (verifica existência do ícone)
    if (menuIcon) {
      menuIcon.textContent = isExpanded ? "☰" : "✕";
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
        menuIcon.textContent = "☰";
      }
      navLinksButton.setAttribute("aria-expanded", "false");
    }
  });

  // Permitir fechar menu com Esc para maior acessibilidade
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("active");
      if (menuIcon) {
        menuIcon.textContent = "☰";
      }
      navLinksButton.setAttribute("aria-expanded", "false");
    }
  });
}
