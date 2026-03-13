const path = require("path");
const fs = require("fs");

function normalizePathname(pathname = "/") {
  const decoded = decodeURIComponent(pathname || "/");
  return decoded.startsWith("/") ? decoded : `/${decoded}`;
}

function getDirectoryParts(pathname, repositoryName = "study") {
  const normalized = normalizePathname(pathname).replace(/^\/+/, "");
  let parts = normalized.split("/").filter(Boolean);

  if (parts[0] === repositoryName) {
    parts = parts.slice(1);
  }

  const lastPart = parts[parts.length - 1] || "";
  const isFilePath = /\.[a-zA-Z0-9]+$/.test(lastPart);

  if (isFilePath) {
    parts = parts.slice(0, -1);
  }

  return parts;
}

function buildRelativeRootPath(directoryParts) {
  return directoryParts.map(() => "../").join("");
}

function loadFaviconsMap(projectRoot) {
  const jsonPath = path.join(
    projectRoot,
    "src",
    "assets",
    "json",
    "favicons.json",
  );
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);
  return data.favicons || {};
}

function buildSiteContext({
  pathname,
  bodyLabel = "book",
  repositoryName = "study",
  projectRoot,
}) {
  const directoryParts = getDirectoryParts(pathname, repositoryName);
  const relativeRootPath = buildRelativeRootPath(directoryParts);

  let faviconHref = `${relativeRootPath}src/assets/favicon/default.ico`;
  try {
    const favicons = loadFaviconsMap(projectRoot);
    const key = String(bodyLabel || "book")
      .trim()
      .toLowerCase();
    const faviconValue = favicons[key] || favicons.book;

    if (typeof faviconValue === "string" && faviconValue.length > 0) {
      faviconHref = faviconValue.startsWith("http")
        ? faviconValue
        : `${relativeRootPath}${faviconValue}`;
    }
  } catch (error) {
    // Mantém fallback padrão quando não for possível carregar o JSON.
  }

  return {
    pathname: normalizePathname(pathname),
    relativeRootPath,
    pathParts: directoryParts,
    faviconHref,
  };
}

module.exports = {
  buildSiteContext,
};
