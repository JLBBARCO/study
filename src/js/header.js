const NAV_SELECTORS = {
  buttonId: "nav-links-button",
  linksClass: ".nav_links",
  iconId: "menuIcon",
};

let navigationListenersController = null;

function resolveHomeHref() {
  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;

  return context?.relativeRootPath || obterCaminhoRelativo();
}

function ensureHeaderElement() {
  let header = document.querySelector("header");
  if (!header) {
    header = document.createElement("header");
  }

  header.replaceChildren();
  header.dataset.initialized = "true";
  header.removeAttribute("aria-hidden");
  header.classList.remove("app-header-shell");
  delete header.dataset.shell;

  return header;
}

function createTitleNavigation(title) {
  const navTitle = document.createElement("nav");
  navTitle.className = "nav-title";

  const linkingHome = document.createElement("a");
  linkingHome.href = resolveHomeHref();

  const heading = document.createElement("h2");
  heading.textContent = title || "Título do Site";

  linkingHome.appendChild(heading);
  navTitle.appendChild(linkingHome);

  return navTitle;
}

function createMenuButton() {
  const navLinksButton = document.createElement("button");
  navLinksButton.id = NAV_SELECTORS.buttonId;
  navLinksButton.setAttribute("aria-label", "Alternar menu de navegação");
  navLinksButton.setAttribute("aria-expanded", "false");
  navLinksButton.setAttribute("aria-controls", "navLinks");

  const menuIcon = document.createElement("span");
  menuIcon.id = NAV_SELECTORS.iconId;
  menuIcon.className = "menu-icon-glyph icon";
  menuIcon.setAttribute("aria-hidden", "true");
  menuIcon.textContent = "☰";

  navLinksButton.appendChild(menuIcon);
  return navLinksButton;
}

function createSectionLink(sectionId) {
  const link = document.createElement("a");
  link.href = `#${sectionId}`;
  link.role = "menuitem";
  link.textContent = sectionId;
  return link;
}

function createNavigationLinks() {
  const navLinks = document.createElement("nav");
  navLinks.className = NAV_SELECTORS.linksClass.replace(".", "");
  navLinks.id = "navLinks";

  const containers = document.querySelectorAll("main>section");
  containers.forEach((container) => {
    const containerId = container.id;
    if (containerId && containerId !== "Home") {
      navLinks.appendChild(createSectionLink(containerId));
    }
  });

  return navLinks;
}

function setMenuState(navLinksButton, navLinks, menuIcon, expanded) {
  navLinks.classList.toggle("active", expanded);
  if (menuIcon) {
    menuIcon.textContent = expanded ? "✕" : "☰";
  }
  navLinksButton.setAttribute("aria-expanded", expanded.toString());
}

function closeMenu(navLinksButton, navLinks, menuIcon) {
  setMenuState(navLinksButton, navLinks, menuIcon, false);
}

function mountHeader(header) {
  const body = document.querySelector("body");
  if (!body) {
    console.error("Body element not found, cannot insert header");
    return;
  }

  if (!header.isConnected) {
    body.prepend(header);
  }
}

function navBar(title) {
  const header = ensureHeaderElement();

  header.appendChild(createTitleNavigation(title));
  header.appendChild(createMenuButton());
  header.appendChild(createNavigationLinks());

  mountHeader(header);
}

function initializeNavigation() {
  const navLinksButton = document.getElementById(NAV_SELECTORS.buttonId);
  const navLinks = document.querySelector(NAV_SELECTORS.linksClass);
  const menuIcon = document.getElementById(NAV_SELECTORS.iconId);

  if (!navLinksButton || !navLinks) {
    console.error("Elementos do menu não encontrados");
    return;
  }

  if (navigationListenersController) {
    navigationListenersController.abort();
  }

  navigationListenersController = new AbortController();
  const { signal } = navigationListenersController;

  closeMenu(navLinksButton, navLinks, menuIcon);

  const handleResize = debounce(mudouJanela, 250);

  navLinksButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      const isExpanded = navLinks.classList.contains("active");
      setMenuState(navLinksButton, navLinks, menuIcon, !isExpanded);
    },
    { signal },
  );

  document.addEventListener(
    "click",
    (event) => {
      if (
        !navLinksButton.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        closeMenu(navLinksButton, navLinks, menuIcon);
      }
    },
    { signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu(navLinksButton, navLinks, menuIcon);
      }
    },
    { signal },
  );

  window.addEventListener("resize", handleResize, { signal });
}
