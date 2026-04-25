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

function isVideoSection(sectionId) {
  return normalizeSectionId(sectionId) === "videos";
}

function getVideoPlaylistsBySection(sectionId) {
  const playlistsBySection = window.videosPlaylistsBySection || {};
  const directMatch = playlistsBySection[sectionId];
  if (Array.isArray(directMatch)) {
    return directMatch;
  }

  const normalizedRequestedId = normalizeSectionId(sectionId);
  const matchedKey = Object.keys(playlistsBySection).find(
    (key) => normalizeSectionId(key) === normalizedRequestedId,
  );

  return Array.isArray(playlistsBySection[matchedKey])
    ? playlistsBySection[matchedKey]
    : [];
}

function createVideoSubmenu(sectionId) {
  const submenu = document.createElement("div");
  submenu.className = "nav_submenu";
  submenu.dataset.sectionId = sectionId;
  submenu.setAttribute("role", "menu");

  populateVideoSubmenu(submenu, sectionId);
  return submenu;
}

function populateVideoSubmenu(submenu, sectionId) {
  if (!submenu) {
    return;
  }

  submenu.replaceChildren();

  const playlists = getVideoPlaylistsBySection(sectionId);
  if (!playlists.length) {
    const emptyItem = document.createElement("span");
    emptyItem.className = "nav_submenu-empty";
    emptyItem.textContent = "Playlists indisponíveis";
    submenu.appendChild(emptyItem);
    return;
  }

  playlists.forEach(({ id, title }) => {
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = title || "Playlist";
    link.dataset.playlistId = id;
    link.dataset.sectionId = sectionId;
    link.className = "nav_submenu-link";
    link.setAttribute("role", "menuitem");

    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSectionId = link.dataset.sectionId;
      const targetPlaylistId = link.dataset.playlistId;

      if (
        typeof window.videosLoadPlaylist === "function" &&
        targetSectionId &&
        targetPlaylistId
      ) {
        window.videosLoadPlaylist(targetSectionId, targetPlaylistId);
        return;
      }

      const fallbackTarget = document.getElementById(targetPlaylistId);
      if (fallbackTarget) {
        fallbackTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    submenu.appendChild(link);
  });
}

function closeAllVideoSubmenus(rootElement) {
  if (!rootElement) {
    return;
  }

  const expandedToggles = rootElement.querySelectorAll(
    ".nav_submenu-toggle[aria-expanded='true']",
  );
  expandedToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
  });

  const openedItems = rootElement.querySelectorAll(".nav_item.submenu-open");
  openedItems.forEach((item) => {
    item.classList.remove("submenu-open");
  });
}

function refreshVideoSubmenus(rootElement) {
  if (!rootElement) {
    return;
  }

  const videoSubmenus = rootElement.querySelectorAll(
    ".nav_submenu[data-section-id]",
  );
  videoSubmenus.forEach((submenu) => {
    populateVideoSubmenu(submenu, submenu.dataset.sectionId);
  });
}

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
  const item = document.createElement("div");
  item.className = "nav_item";

  const link = document.createElement("a");
  link.href = `#${sectionId}`;
  link.setAttribute("role", "menuitem");
  link.className = "nav_link";
  link.textContent = sectionId;

  if (!isVideoSection(sectionId)) {
    item.appendChild(link);
    return item;
  }

  item.classList.add("has-submenu");

  const itemHeader = document.createElement("div");
  itemHeader.className = "nav_item-header";
  itemHeader.appendChild(link);

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
    submenuToggle.setAttribute("aria-expanded", String(!isExpanded));
    item.classList.toggle("submenu-open", !isExpanded);
  });

  itemHeader.appendChild(submenuToggle);
  item.appendChild(itemHeader);
  item.appendChild(createVideoSubmenu(sectionId));

  return item;
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
  closeAllVideoSubmenus(navLinks);
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

  window.addEventListener(
    "videos:playlists-ready",
    () => {
      refreshVideoSubmenus(navLinks);
    },
    { signal },
  );

  refreshVideoSubmenus(navLinks);

  window.addEventListener("resize", handleResize, { signal });
}
