const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const { buildSiteContext } = require("./api/_lib/site-context");
const youtubePlaylistHandler = require("./api/youtube-playlist");

const ROOT = process.cwd();

function loadEnvFiles() {
  const envFiles = [".env.local", ".env"];

  envFiles.forEach((fileName) => {
    const filePath = path.join(ROOT, fileName);
    if (!fs.existsSync(filePath)) {
      return;
    }

    const content = fs.readFileSync(filePath, "utf8");
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex < 1) {
        return;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      if (!key || process.env[key] !== undefined) {
        return;
      }

      let value = trimmed.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    });
  });
}

loadEnvFiles();

const PORT = Number(process.env.PORT || 3000);
const OFFLINE_MODE =
  process.argv.includes("--offline") || process.env.STUDY_OFFLINE === "1";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".php": "text/plain; charset=utf-8",
  ".ALG": "text/plain; charset=utf-8",
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function resolveStaticPath(requestPath) {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0]);

  if (cleanPath === "/") {
    return path.join(ROOT, "index.html");
  }

  const directPath = path.join(ROOT, cleanPath.replace(/^\/+/, ""));

  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  if (cleanPath.endsWith("/")) {
    const segments = cleanPath.split("/").filter(Boolean);
    const folderName = segments[segments.length - 1];
    if (folderName) {
      const candidate = path.join(
        ROOT,
        cleanPath.replace(/^\/+/, ""),
        `${folderName}.html`,
      );
      if (fs.existsSync(candidate)) return candidate;
    }

    const fallbackIndex = path.join(
      ROOT,
      cleanPath.replace(/^\/+/, ""),
      "index.html",
    );
    if (fs.existsSync(fallbackIndex)) return fallbackIndex;
  }

  if (!path.extname(cleanPath)) {
    const noExtCandidate = path.join(
      ROOT,
      `${cleanPath.replace(/^\/+/, "")}.html`,
    );
    if (fs.existsSync(noExtCandidate)) return noExtCandidate;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (
    url.pathname === "/api/site-context" ||
    url.pathname === "/api/site-context/"
  ) {
    if (OFFLINE_MODE) {
      sendJson(res, 503, {
        error: "Modo offline ativo",
        detail:
          "Contexto de site via API desabilitado para desenvolvimento offline.",
      });
      return;
    }

    const pathname = url.searchParams.get("pathname") || "/";
    const bodyLabel = url.searchParams.get("bodyLabel") || "book";

    const context = buildSiteContext({
      pathname,
      bodyLabel,
      projectRoot: ROOT,
      repositoryName: "study",
    });

    sendJson(res, 200, context);
    return;
  }

  if (
    url.pathname === "/api/youtube-playlist" ||
    url.pathname === "/api/youtube-playlist/"
  ) {
    const reqProxy = {
      query: Object.fromEntries(url.searchParams.entries()),
      headers: req.headers,
      url: req.url,
    };

    const resProxy = {
      statusCode: 200,
      headers: {},
      setHeader(name, value) {
        this.headers[name] = value;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        sendJson(res, this.statusCode, payload);
      },
    };

    Promise.resolve(youtubePlaylistHandler(reqProxy, resProxy)).catch(
      (error) => {
        sendJson(res, 500, {
          error: "Erro ao processar /api/youtube-playlist",
          detail: error.message,
        });
      },
    );

    return;
  }

  const filePath = resolveStaticPath(url.pathname);
  if (!filePath) {
    sendJson(res, 404, { error: "Arquivo não encontrado" });
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 500, {
        error: "Erro ao ler arquivo",
        detail: error.message,
      });
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor local iniciado em http://localhost:${PORT}`);
  if (OFFLINE_MODE) {
    console.log("Modo offline ativo: /api/site-context respondera 503.");
  }
});
