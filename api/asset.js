const fs = require("fs");
const path = require("path");

const CONTENT_TYPES = {
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
};

function normalizeRelativePath(inputPath = "") {
  let decodedPath = "";
  try {
    decodedPath = decodeURIComponent(String(inputPath || ""));
  } catch {
    return null;
  }

  const normalizedPath = path.posix.normalize(decodedPath).replace(/^\/+/, "");
  return normalizedPath;
}

module.exports = function handler(req, res) {
  const requestedPath = req.query?.path || "";
  const normalizedPath = normalizeRelativePath(requestedPath);

  if (!normalizedPath) {
    res.status(400).json({
      error: "Invalid asset path encoding.",
    });
    return;
  }

  if (!normalizedPath.startsWith("src/") || normalizedPath.includes("..")) {
    res.status(400).json({
      error: "Invalid asset path. Only files under src/ are allowed.",
    });
    return;
  }

  const projectRoot = path.resolve(process.cwd());
  const absolutePath = path.resolve(projectRoot, normalizedPath);
  const rootWithSep = projectRoot.endsWith(path.sep)
    ? projectRoot
    : `${projectRoot}${path.sep}`;

  if (absolutePath !== projectRoot && !absolutePath.startsWith(rootWithSep)) {
    res.status(403).json({
      error: "Access denied.",
    });
    return;
  }

  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    res.status(404).json({
      error: "Asset not found.",
    });
    return;
  }

  const extension = path.extname(absolutePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension] || "application/octet-stream";

  try {
    const buffer = fs.readFileSync(absolutePath);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read asset file.",
    });
  }
};
