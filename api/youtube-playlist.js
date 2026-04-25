const fs = require("fs");
const path = require("path");

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractFirstTagValue(source, tagName) {
  const pattern = new RegExp(
    `<${escapeRegExp(tagName)}[^>]*>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`,
  );
  const match = String(source || "").match(pattern);
  return match ? decodeHtmlEntities(match[1].trim()) : "";
}

function parsePlaylistFeed(xmlText) {
  const entryMatches =
    String(xmlText || "").match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entryMatches
    .map((entry) => {
      const videoId = extractFirstTagValue(entry, "yt:videoId");
      if (!videoId) {
        return null;
      }

      const title = extractFirstTagValue(entry, "title") || "Sem titulo";
      const description =
        extractFirstTagValue(entry, "media:description") ||
        extractFirstTagValue(entry, "summary") ||
        "";

      return {
        titulo: title,
        descricao: description,
        link: `https://www.youtube.com/watch?v=${videoId}`,
        linkVideo: `https://www.youtube.com/embed/${videoId}`,
      };
    })
    .filter(Boolean);
}

async function fetchVideosFromPublicPlaylistFeed(playlistId) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
  const response = await fetch(feedUrl);

  if (!response.ok) {
    throw new Error(`Feed request failed with status ${response.status}.`);
  }

  const feedXml = await response.text();
  return parsePlaylistFeed(feedXml);
}

async function fetchVideosFromYoutubeApi(playlistId, apiKey) {
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
    const error = new Error("YouTube API request failed.");
    error.statusCode = response.status;
    error.details = details;
    throw error;
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

  return videos;
}

function resolveYoutubeApiKey() {
  return (
    process.env.YOUTUBE_API_KEY ||
    process.env.YOUTUBE_KEY ||
    process.env.GOOGLE_API_KEY ||
    ""
  );
}

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
  const apiKey = resolveYoutubeApiKey();

  if (!playlistId) {
    res.status(400).json({ error: "Missing playlistId query parameter." });
    return;
  }

  try {
    let videos = [];
    let source = "youtube-api";

    if (apiKey) {
      videos = await fetchVideosFromYoutubeApi(playlistId, apiKey);
    } else {
      videos = await fetchVideosFromPublicPlaylistFeed(playlistId);
      source = "youtube-feed";
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ videos, source });
  } catch (error) {
    if (!apiKey) {
      res.status(500).json({
        error:
          "Missing YOUTUBE_API_KEY environment variable and failed to fetch public playlist feed.",
        details: error?.message || "unknown error",
      });
      return;
    }

    if (error?.statusCode) {
      res.status(error.statusCode).json({
        error: error.message || "YouTube API request failed.",
        details: error?.details || "",
      });
      return;
    }

    res.status(500).json({
      error: "Unexpected error while fetching YouTube videos.",
      details: error?.message || "unknown error",
    });
  }
};
