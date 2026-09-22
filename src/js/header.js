const NAV_SELECTORS = {
  buttonId: "nav-links-button",
  linksClass: ".nav_links",
  iconId: "menuIcon",
};

let navigationListenersController = null;

function normalizeSectionId(sectionId) {
  return String(sectionId || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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

function createSectionLink(sectionId, sectionAriaLabel, subSections = false) {
  const item = document.createElement("div");
  item.className = "nav_item";

  const link = document.createElement("a");
  link.href = `#${sectionId}`;
  link.setAttribute("role", "menuitem");
  link.setAttribute("aria-popups", "true");
  link.className = "nav_link";
  link.textContent = sectionAriaLabel || sectionId;
  if (subSections) {
    item.classList.add("has-submenu");
    item.setAttribute("aria-haspopup", "true");
    link.setAttribute("aria-haspopup", "true");
    item.dataset.dropMenuId = `${sectionId}-drop-menu`;

    item.addEventListener("mouseenter", () => {
      showDropMenu(item.dataset.dropMenuId, true);
    });

    item.addEventListener("mouseleave", () => {
      showDropMenu(item.dataset.dropMenuId, false);
    });
  }

  const itemHeader = document.createElement("div");
  itemHeader.className = "nav_item-header";
  itemHeader.appendChild(link);

  if (subSections) {
    const submenuToggle = document.createElement("button");
    submenuToggle.type = "button";
    submenuToggle.className = "nav_submenu-toggle";
    submenuToggle.setAttribute("aria-label", "Mostrar playlists de videos");
    submenuToggle.setAttribute("aria-expanded", "false");
    submenuToggle.textContent = "▾";

    submenuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = submenuToggle.getAttribute("aria-expanded") === "true";
      const shouldExpand = !isExpanded;
      submenuToggle.setAttribute("aria-expanded", String(shouldExpand));
      item.classList.toggle("submenu-open", shouldExpand);
      showDropMenu(item.dataset.dropMenuId, shouldExpand);
    });

    itemHeader.appendChild(submenuToggle);
  }

  item.appendChild(itemHeader);

  return item;
}

function createNavigationLinks() {
  const navLinks = document.createElement("nav");
  navLinks.className = NAV_SELECTORS.linksClass.replace(".", "");
  navLinks.id = "navLinks";

  const containers = document.querySelectorAll("main>section");
  containers.forEach((container) => {
    const containerId = container.id;
    const sectionAriaLabel = container.getAttribute("aria-label");
    if (containerId && containerId !== "Home") {
      navLinks.appendChild(
        createSectionLink(
          containerId,
          sectionAriaLabel,
          container.dataset.ariaControls == "drop-menu" ? true : false,
        ),
      );
    }

    if (container.dataset.ariaControls == "drop-menu") {
      const containerSubSections = document.querySelectorAll(
        `main>section#${containerId}>section`,
      );

      dropMenu(navLinks, container.id, container.dataset, containerSubSections);
    }
  });

  const aside = document.querySelector("body>aside");
  if (aside && aside.id) {
    navLinks.appendChild(createSectionLink(aside.id, "Mais"));
  }

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

function navBar() {
  const header = ensureHeaderElement();

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

  window.addEventListener(
    "videos:playlists-ready",
    () => {
      refreshVideoSubmenus(navLinks);
    },
    { signal },
  );

  window.addEventListener("resize", handleResize, { signal });
}

function dropMenu(navLinks, containerId, containerData, containerSubSections) {
  const containerMenu = document.createElement("div");
  containerMenu.id = `${containerId}-drop-menu`;
  containerMenu.className = "drop-menu";
  containerMenu.setAttribute("aria-label", containerData["aria-label"] || "");

  containerSubSections.forEach((subSection) => {
    const subSectionId = subSection.id;
    const subSectionAriaLabel = subSection.getAttribute("aria-label");
    containerMenu.appendChild(
      createSectionLink(subSectionId, subSectionAriaLabel),
    );
  });

  const containerItem = navLinks.querySelector(
    `[data-drop-menu-id="${containerMenu.id}"]`,
  );
  (containerItem || navLinks).appendChild(containerMenu);

  console.log(containerId, containerData, containerSubSections);
}

function showDropMenu(containerMenuId, show = true) {
  const containerMenu = document.getElementById(containerMenuId);
  if (containerMenu) {
    containerMenu.classList.toggle("active", show);
  }
}
