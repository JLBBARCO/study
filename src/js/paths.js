function paths() {
  const main = document.querySelector("main");
  if (!main) {
    console.error("Main element not found");
    return;
  }

  const existingRootPaths = main.querySelector(".root-paths");
  if (existingRootPaths) {
    existingRootPaths.remove();
  }

  const caminhoRelativo = obterCaminhoRelativo();
  const rootPaths = document.createElement("div");
  rootPaths.className = "root-paths";
  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;
  const pathParts = context?.pathParts || [];

  const homeLink = document.createElement("a");
  homeLink.href = caminhoRelativo;
  homeLink.textContent = "home";
  homeLink.dataset.pathKey = "home";
  rootPaths.appendChild(homeLink);

  let accumulatedPath = caminhoRelativo;
  pathParts.forEach((part) => {
    rootPaths.appendChild(document.createTextNode(" > "));
    accumulatedPath += `${part}/`;
    const link = document.createElement("a");
    link.href = accumulatedPath;
    link.id = part;
    link.dataset.pathKey = decodeURIComponent(part);
    link.textContent = decodeURIComponent(part);
    rootPaths.appendChild(link);
  });

  main.prepend(rootPaths);
}

function pathNames() {
  const pathsBar = document.querySelector(".root-paths");
  if (!pathsBar) {
    console.error("Paths bar element not found");
    return;
  }

  const links = Array.from(pathsBar.querySelectorAll("a"));
  const currentPageHeading = document.querySelector("section#Home > h1");

  function extractTitleFromHtml(htmlText) {
    const parser = new DOMParser();
    const documentHtml = parser.parseFromString(htmlText, "text/html");
    const heading = documentHtml.querySelector("section#Home > h1");
    return heading ? heading.innerHTML.trim() : null;
  }

  function normalizeHref(link) {
    const href = link.getAttribute("href") || "";
    if (!href) {
      return window.location.href;
    }
    return new URL(href, window.location.href).href;
  }

  Promise.all(
    links.map((link, index) => {
      const isLastLink = index === links.length - 1;

      if (isLastLink && currentPageHeading) {
        return Promise.resolve({
          link,
          title: currentPageHeading.innerHTML.trim(),
        });
      }

      return fetch(normalizeHref(link))
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text();
        })
        .then((htmlText) => ({
          link,
          title: extractTitleFromHtml(htmlText),
        }))
        .catch((error) => {
          console.error("Error loading breadcrumb source page:", error);
          return {
            link,
            title: null,
          };
        });
    }),
  ).then((items) => {
    items.forEach(({ link, title }) => {
      if (title) {
        link.innerHTML = title;
      }
    });
  });
}
