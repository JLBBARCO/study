const path = require("path");
const fs = require("fs");

function normalizePathname(pathname = "/") {
  const decoded = decodeURIComponent(pathname || "/");
  return decoded.startsWith("/") ? decoded : `/${decoded}`;
}

function normalizeHost(host = "") {
  return String(host || "")
    .trim()
    .toLowerCase();
}

function isVercelHost(host = "") {
  return normalizeHost(host).includes("vercel.app");
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

function isValidRemoteFaviconUrl(value) {
  if (typeof value !== "string" || value.length === 0) {
    return false;
  }

  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.toLowerCase();

    if (
      (hostname === "icons8.com" || hostname === "www.icons8.com") &&
      parsed.pathname.startsWith("/icon/")
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function buildSiteContext({
  pathname,
  bodyLabel = "book",
  host = "",
  repositoryName = "study",
  projectRoot,
}) {
  const directoryParts = getDirectoryParts(pathname, repositoryName);
  const relativeRootPath = buildRelativeRootPath(directoryParts);
  const runningOnVercel = isVercelHost(host);
  const defaultFaviconPath = "src/assets/favicon/default.ico";

  let faviconHref = runningOnVercel
    ? `/api/asset?path=${encodeURIComponent(defaultFaviconPath)}`
    : `${relativeRootPath}${defaultFaviconPath}`;
  try {
    const favicons = loadFaviconsMap(projectRoot);
    const key = String(bodyLabel || "book")
      .trim()
      .toLowerCase();
    const faviconValue = favicons[key] || favicons.book;

    if (typeof faviconValue === "string" && faviconValue.length > 0) {
      if (faviconValue.startsWith("http")) {
        if (isValidRemoteFaviconUrl(faviconValue)) {
          faviconHref = faviconValue;
        }
      } else {
        const normalizedFaviconPath = faviconValue.replace(/^\/+/, "");
        faviconHref = runningOnVercel
          ? `/api/asset?path=${encodeURIComponent(normalizedFaviconPath)}`
          : `${relativeRootPath}${faviconValue}`;
      }
    }
  } catch (error) {
    // Mantém fallback padrão quando não for possível carregar o JSON.
  }

  return {
    pathname: normalizePathname(pathname),
    host: normalizeHost(host),
    isVercelDeployment: runningOnVercel,
    contextSource: "api",
    assetBasePath: runningOnVercel ? "/" : relativeRootPath,
    relativeRootPath,
    pathParts: directoryParts,
    faviconHref,
  };
}

module.exports = {
  buildSiteContext,
};
