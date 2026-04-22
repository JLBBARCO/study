function footer() {
  let footerElement = document.querySelector("footer");
  if (footerElement) {
    return footerElement;
  }

  footerElement = document.createElement("footer");
  const body = document.querySelector("body");
  if (body) {
    body.appendChild(footerElement);
  } else {
    console.error("Body element not found, cannot append footer");
  }

  return footerElement;
}

const CONTACT_API_URL =
  "https://raw.githubusercontent.com/JLBBARCO/portfolio/refs/heads/main/src/json/areas/contact.json";

const CONTACT_ICON_EXCEPTIONS = {
  email: {
    iconName: "envelope",
    style: "fa-regular",
  },
};

const TOP_BUTTON_SCROLL_THRESHOLD = 8;
let topButtonScrollController = null;

function createTitleFooter(title, description) {
  const sectionTitle = document.createElement("section");
  sectionTitle.classList.add("title_section_footer");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("title_footer");
  titleElement.textContent = title;
  sectionTitle.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("description_footer");
  descriptionElement.textContent = description || "";
  sectionTitle.appendChild(descriptionElement);

  return sectionTitle;
}

function createFooterCard(title, contentElement) {
  const card = document.createElement("div");
  card.classList.add("card_footer");

  const heading = document.createElement("h2");
  heading.textContent = title;

  card.appendChild(heading);
  card.appendChild(contentElement);

  return card;
}

function createLinkListItem(label, href) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = href || "#";
  a.textContent = label || "Link";

  const isExternal = /^https?:\/\//i.test(a.href);
  if (isExternal) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }

  li.appendChild(a);
  return li;
}

function createLinkList(items) {
  const list = document.createElement("ul");
  items.forEach((item) => {
    list.appendChild(createLinkListItem(item.label, item.href));
  });
  return list;
}

function resolveContactIcon(contact) {
  const exception = CONTACT_ICON_EXCEPTIONS[contact?.iconName];

  return {
    iconName:
      exception?.iconName || contact?.iconName || contact?.icon || "circle",
    style: exception?.style || contact?.style || "fa-regular",
  };
}

function createContactIconElement(contact) {
  const { iconName, style } = resolveContactIcon(contact);
  const icon = document.createElement("span");
  icon.className = `${style} fa-${iconName} icon`;
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function createContactListItem(contact) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  const contactTitle = contact?.name || "Contato";

  link.href = contact?.url || "#";
  link.title = contactTitle;
  link.setAttribute("aria-label", contactTitle);

  const isExternal = /^https?:\/\//i.test(link.href);
  if (isExternal) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  link.appendChild(createContactIconElement(contact));
  li.appendChild(link);

  return li;
}

function renderContactMessage(listElement, message) {
  listElement.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = message;
  listElement.appendChild(li);
}

async function fetchContactCards() {
  const response = await fetch(CONTACT_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.cards) ? payload.cards : [];
}

async function populateContactList(listElement) {
  renderContactMessage(listElement, "Carregando contatos...");

  try {
    const contacts = await fetchContactCards();

    if (contacts.length === 0) {
      renderContactMessage(listElement, "Contato indisponível no momento.");
      return;
    }

    listElement.innerHTML = "";
    contacts.forEach((contact) => {
      listElement.appendChild(createContactListItem(contact));
    });
  } catch (error) {
    console.error("Error fetching contact data:", error);
    renderContactMessage(listElement, "Não foi possível carregar os contatos.");
  }
}

function removePreviousFooterContent(footerElement) {
  const existingAccessibilityFunctions = footerElement.querySelector(
    ".accessibility-functions",
  );
  const existingTitleSection = footerElement.querySelector(
    ".title_section_footer",
  );
  const existingContainer = footerElement.querySelector(".container_footer");
  const existingCopyright = footerElement.querySelector(".copyright");

  if (existingAccessibilityFunctions) {
    existingAccessibilityFunctions.remove();
  }

  if (existingTitleSection) {
    existingTitleSection.remove();
  }

  if (existingContainer) {
    existingContainer.remove();
  }

  if (existingCopyright) {
    existingCopyright.remove();
  }
}

function isAtPageTop() {
  return window.scrollY <= TOP_BUTTON_SCROLL_THRESHOLD;
}

function updateTopButtonVisibility(buttonElement) {
  buttonElement.hidden = isAtPageTop();
}

function setupTopButtonVisibility(buttonElement) {
  if (topButtonScrollController) {
    topButtonScrollController.abort();
  }

  topButtonScrollController = new AbortController();
  const { signal } = topButtonScrollController;

  updateTopButtonVisibility(buttonElement);
  window.addEventListener(
    "scroll",
    () => updateTopButtonVisibility(buttonElement),
    { passive: true, signal },
  );
}

// --- Rodapé dinâmico ---
function initializeFooter() {
  const footer = document.querySelector("footer");
  if (footer) {
    removePreviousFooterContent(footer);

    const data = new Date();
    const ano = data.getFullYear();

    const container = document.createElement("section");
    container.classList.add("container_footer");

    const accessibilityFunctions = document.createElement("section");
    accessibilityFunctions.classList.add("accessibility-functions");

    const buttonFromTop = document.createElement("button");
    buttonFromTop.setAttribute("aria-label", "Voltar ao topo da página");
    buttonFromTop.classList.add("button-to-top");
    buttonFromTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    setupTopButtonVisibility(buttonFromTop);
    const iconToTop = document.createElement("span");
    iconToTop.className = "fa-solid fa-arrow-up icon";
    iconToTop.setAttribute("aria-hidden", "true");
    buttonFromTop.appendChild(iconToTop);
    accessibilityFunctions.appendChild(buttonFromTop);

    const footerTitle = createTitleFooter(
      "Projeto de Estudos",
      "Projeto realizado para estudos de programação, com possibilidade de uso de qualquer pessoa.",
    );

    const card1Links = [
      { label: "Repositório", href: "https://github.com/jlbbarco/study" },
    ];
    const card1 = createFooterCard("Links Rápidos", createLinkList(card1Links));

    const card2Links = [
      { label: "Portfólio", href: "https://jlbbarco.github.io/portfolio" },
      { label: "GitHub", href: "https://github.com/jlbbarco" },
    ];
    const card2 = createFooterCard("Recursos", createLinkList(card2Links));

    const ulCard3 = document.createElement("ul");
    ulCard3.setAttribute("aria-live", "polite");
    const card3 = createFooterCard("Contato", ulCard3);
    populateContactList(ulCard3);

    container.appendChild(card1);
    container.appendChild(card2);
    container.appendChild(card3);

    footer.appendChild(accessibilityFunctions);
    footer.appendChild(footerTitle);
    footer.appendChild(container);

    const pCopyright = document.createElement("p");
    pCopyright.classList.add("copyright");
    pCopyright.textContent = `© ${ano} Projeto de Estudos. Todos os direitos reservados.`;
    footer.appendChild(pCopyright);
  }
}
