const fs = require("fs");
const path = require("path");

function loadEnvFiles() {
  const root = process.cwd();
  const envFiles = [".env.local", ".env"];

  envFiles.forEach((fileName) => {
    const filePath = path.join(root, fileName);
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

module.exports = async function handler(req, res) {
  if (!process.env.YOUTUBE_API_KEY) {
    loadEnvFiles();
  }

  const playlistId = String(req.query?.playlistId || "").trim();
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!playlistId) {
    res.status(400).json({ error: "Missing playlistId query parameter." });
    return;
  }

  if (!apiKey) {
    res.status(500).json({
      error: "Missing YOUTUBE_API_KEY environment variable.",
    });
    return;
  }

  try {
    const params = new URLSearchParams({
      part: "snippet",
      maxResults: "20",
      playlistId,
      key: apiKey,
    });

    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const details = await response.text();
      res.status(response.status).json({
        error: "YouTube API request failed.",
        details,
      });
      return;
    }

    const data = await response.json();
    const videos = Array.isArray(data.items)
      ? data.items
          .map((item) => {
            const snippet = item?.snippet || {};
            const videoId = snippet?.resourceId?.videoId;
            if (!videoId) {
              return null;
            }

            return {
              titulo: snippet.title || "Sem titulo",
              descricao: snippet.description || "",
              link: `https://www.youtube.com/watch?v=${videoId}`,
              linkVideo: `https://www.youtube.com/embed/${videoId}`,
            };
          })
          .filter(Boolean)
      : [];

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({
      error: "Unexpected error while fetching YouTube videos.",
      details: error?.message || "unknown error",
    });
  }
};
