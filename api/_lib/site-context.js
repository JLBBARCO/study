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

function buildSiteContext({
  pathname,
  host = "",
  repositoryName = "study",
}) {
  const directoryParts = getDirectoryParts(pathname, repositoryName);
  const relativeRootPath = buildRelativeRootPath(directoryParts);
  const runningOnVercel = isVercelHost(host);

  return {
    pathname: normalizePathname(pathname),
    host: normalizeHost(host),
    isVercelDeployment: runningOnVercel,
    contextSource: "api",
    assetBasePath: runningOnVercel ? "/" : relativeRootPath,
    relativeRootPath,
    pathParts: directoryParts,
  };
}

module.exports = {
  buildSiteContext,
};
