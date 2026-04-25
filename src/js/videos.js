const videosSectionRegistry = new Map();

function normalizeVideosRegistryKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function resolveVideosSection(options = {}) {
  if (options instanceof HTMLElement) {
    return options;
  }

  if (typeof options === "string") {
    return document.querySelector(options) || document.getElementById(options);
  }

  if (options?.section instanceof HTMLElement) {
    return options.section;
  }

  if (typeof options?.selector === "string") {
    const selectedBySelector = document.querySelector(options.selector);
    if (selectedBySelector) {
      return selectedBySelector;
    }
  }

  if (typeof options?.sectionId === "string") {
    const selectedById = document.getElementById(options.sectionId);
    if (selectedById) {
      return selectedById;
    }
  }

  return (
    document.getElementById("Vídeos") ||
    document.getElementById("Videos") ||
    document.querySelector("section[data-videos-section='true']")
  );
}

function getVideosSectionKey(videosSection) {
  if (!videosSection) {
    return "videos";
  }

  return (
    videosSection.id ||
    videosSection.getAttribute("data-videos-key") ||
    videosSection.ariaLabel ||
    "videos"
  );
}

function publishVideosPlaylists(sectionId, playlists) {
  const safePlaylists = Array.isArray(playlists) ? playlists : [];
  window.videosPlaylistsBySection = window.videosPlaylistsBySection || {};
  window.videosPlaylistsBySection[sectionId] = safePlaylists;

  window.dispatchEvent(
    new CustomEvent("videos:playlists-ready", {
      detail: {
        sectionId,
        playlists: safePlaylists,
      },
    }),
  );
}

function videos(options = {}) {
  // Função principal para carregar e exibir os vídeos do curso, organizados por playlists

  const videosSection = resolveVideosSection(options);
  if (!videosSection) {
    return;
  }

  const sectionKey = getVideosSectionKey(videosSection);

  if (videosSection.querySelector('h2[data-videos-title="true"]')) {
    return;
  }

  const title = document.createElement("h2");
  title.dataset.videosTitle = "true";
  title.textContent = "Vídeo Aulas";
  videosSection.append(title);

  const containerBtn = document.createElement("div");
  containerBtn.classList.add("container-btn");
  containerBtn.hidden = true;
  videosSection.appendChild(containerBtn);

  const cardsContainer = document.createElement("article");
  cardsContainer.classList.add("container");
  const playlistLinkMap = [];

  loadPlaylistsCatalog(videosSection)
    .then((response) => {
      return response;
    })
    .then((data) => {
      const playlists = data?.playlists || {};
      const playlistEntries = Object.keys(playlists)
        .sort((a, b) => Number(a) - Number(b))
        .map((key, index) => {
          const playlist = playlists[key];

          if (!playlist || !playlist.url) {
            return null;
          }

          return {
            key,
            playlist,
            id: buildPlaylistSectionId(
              playlist.titulo || "playlist",
              key,
              index,
            ),
          };
        })
        .filter(Boolean);

      playlistEntries.forEach(({ id, playlist }) => {
        playlistLinkMap.push({ id, title: playlist.titulo || "Playlist" });
      });

      const shouldGroupByPlaylist = playlistEntries.length > 1;

      return { playlistEntries, shouldGroupByPlaylist };
    })
    .then((payload) => {
      if (!payload) {
        return;
      }

      const { playlistEntries, shouldGroupByPlaylist } = payload;
      const renderPlaylist = createPlaylistLazyRenderer(
        cardsContainer,
        playlistEntries,
        shouldGroupByPlaylist,
      );
      renderPlaylistLinks(containerBtn, playlistLinkMap, renderPlaylist);
      const state = {
        renderPlaylist,
      };
      videosSectionRegistry.set(sectionKey, state);
      videosSectionRegistry.set(normalizeVideosRegistryKey(sectionKey), state);
      publishVideosPlaylists(sectionKey, playlistLinkMap);

      upsertVideosPlaceholder(
        cardsContainer,
        playlistEntries.length > 0
          ? "Selecione uma playlist para carregar os videos correspondentes."
          : "Nenhuma playlist encontrada para esta pagina.",
      );
    })
    .catch((error) => {
      console.error("Erro ao carregar videos:", error);

      if (isApiConfigurationError(error?.message)) {
        showFixedApiWarning(
          "Configure YOUTUBE_API_KEY no backend e reinicie o servidor para carregar os videos.",
        );
      }

      upsertVideosPlaceholder(
        cardsContainer,
        "Nao foi possivel carregar os videos no momento.",
      );
    });

  videosSection.appendChild(cardsContainer);
}

function getVideosCatalogSlug(videosSection) {
  return (
    videosSection?.getAttribute("aria-label") ||
    videosSection?.dataset?.videosSlug ||
    videosSection?.ariaLabel ||
    ""
  );
}

function getVideosCatalogEndpoints(videosSection) {
  const slug = getVideosCatalogSlug(videosSection);
  if (!slug) {
    return [];
  }

  const context =
    typeof getCurrentSiteContext === "function"
      ? getCurrentSiteContext()
      : null;
  const assetBasePath = String(context?.assetBasePath || "");

  const candidates = [
    `${obterCaminhoRelativo()}src/data/youtube/${slug}.json`,
    `${assetBasePath}src/data/youtube/${slug}.json`,
    `/src/data/youtube/${slug}.json`,
  ];

  return Array.from(new Set(candidates));
}

function loadPlaylistsCatalog(videosSection) {
  const endpoints = getVideosCatalogEndpoints(videosSection);
  if (endpoints.length === 0) {
    throw new Error("Nenhum slug de playlist foi definido na secao de videos.");
  }

  return fetchPlaylistsCatalogFromEndpoints(endpoints, 0);
}

function fetchPlaylistsCatalogFromEndpoints(endpoints, index) {
  if (index >= endpoints.length) {
    throw new Error("Nao foi possivel carregar o catalogo de playlists.");
  }

  return fetch(endpoints[index])
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      if (index < endpoints.length - 1) {
        return fetchPlaylistsCatalogFromEndpoints(endpoints, index + 1);
      }

      throw error;
    });
}

function fetchPlaylistVideos(playlist) {
  const playlistId = extractPlaylistId(playlist.url);
  if (!playlistId) {
    return Promise.resolve([]);
  }

  const endpoints = getYoutubeApiEndpoints(playlistId);
  return fetchPlaylistVideosFromEndpoints(endpoints, 0);
}

function fetchPlaylistVideosFromEndpoints(endpoints, index) {
  if (index >= endpoints.length) {
    throw new Error(
      "Nao foi possivel acessar /api/youtube-playlist. Inicie o servidor Node com npm run dev.",
    );
  }

  return fetch(endpoints[index])
    .then((response) => {
      if (!response.ok) {
        return response.text().then((rawText) => {
          let detail = "";
          try {
            const parsed = JSON.parse(rawText);
            detail = parsed?.error || parsed?.details || "";
          } catch {
            detail = rawText || "";
          }

          const msg = detail
            ? `HTTP ${response.status}: ${detail}`
            : `HTTP error! status: ${response.status}`;
          throw new Error(msg);
        });
      }

      return response.json();
    })
    .then((data) => (Array.isArray(data.videos) ? data.videos : []))
    .catch((error) => {
      if (index < endpoints.length - 1) {
        return fetchPlaylistVideosFromEndpoints(endpoints, index + 1);
      }

      throw error;
    });
}

function getYoutubeApiEndpoints(playlistId) {
  const query = `playlistId=${encodeURIComponent(playlistId)}`;
  const endpoints = [`/api/youtube-playlist?${query}`];

  const host = window.location.hostname;
  const isLocalhost = host === "127.0.0.1" || host === "localhost";
  const isNodeServer = window.location.port === "3000";

  if (isLocalhost && !isNodeServer) {
    endpoints.push(`http://localhost:3000/api/youtube-playlist?${query}`);
  }

  return endpoints;
}

function extractPlaylistId(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("list");
  } catch {
    return null;
  }
}

function buildPlaylistSectionId(titleText, key, index) {
  const safeTitle = String(titleText || "playlist")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const safeKey = String(key || index || "0").replace(/[^a-z0-9]+/gi, "-");
  return `playlist-${safeTitle || "item"}-${safeKey || index}`;
}

function renderPlaylistLinks(containerBtn, playlistLinkMap, onPlaylistSelect) {
  if (!containerBtn) {
    return;
  }

  containerBtn.replaceChildren();

  if (!Array.isArray(playlistLinkMap) || playlistLinkMap.length === 0) {
    containerBtn.hidden = true;
    return;
  }

  containerBtn.hidden = false;

  playlistLinkMap.forEach(({ id, title }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = title;
    button.classList.add("container-btn-link");
    button.addEventListener("click", () => {
      onPlaylistSelect?.(id, button, { source: "section-buttons" });
    });
    containerBtn.appendChild(button);
  });
}

function createPlaylistLazyRenderer(
  cardsContainer,
  playlistEntries,
  shouldGroupByPlaylist,
) {
  const loadedPlaylistIds = new Set();
  const loadingPlaylistPromises = new Map();
  const playlistEntryMap = new Map(
    playlistEntries.map((playlistEntry) => [playlistEntry.id, playlistEntry]),
  );

  return (playlistId, triggerButton, options = {}) => {
    const playlistEntry = playlistEntryMap.get(playlistId);
    if (!playlistEntry) {
      return Promise.resolve(null);
    }

    const targetContainer = shouldGroupByPlaylist
      ? getOrCreateSubContainer(
          cardsContainer,
          playlistEntry.id,
          playlistEntry.playlist.titulo || "Playlist",
        )
      : cardsContainer;

    const cardsHost = shouldGroupByPlaylist
      ? targetContainer.querySelector('[data-cards-host="true"]')
      : targetContainer;

    if (!cardsHost) {
      return Promise.resolve(null);
    }

    if (shouldGroupByPlaylist && !targetContainer.isConnected) {
      cardsContainer.appendChild(targetContainer);
    }

    scrollToPlaylistContainer(targetContainer, options);

    if (loadedPlaylistIds.has(playlistId)) {
      return Promise.resolve({
        playlistId,
        status: "loaded",
        targetId: playlistEntry.id,
      });
    }

    if (loadingPlaylistPromises.has(playlistId)) {
      return loadingPlaylistPromises.get(playlistId);
    }

    upsertVideosPlaceholder(
      cardsContainer,
      "Carregando playlist selecionada...",
      true,
    );

    cardsHost.replaceChildren();
    cardsHost.setAttribute("aria-busy", "true");
    renderPlaylistSkeleton(cardsHost, getSkeletonCountByViewport());

    if (triggerButton) {
      triggerButton.disabled = true;
      triggerButton.dataset.loading = "true";
    }

    const loadPlaylistPromise = schedulePlaylistFetch(() =>
      fetchPlaylistVideos(playlistEntry.playlist),
    )
      .then((videos) => {
        cardsHost.replaceChildren();
        cardsHost.removeAttribute("aria-busy");

        if (videos.length === 0) {
          const emptyMessage = document.createElement("p");
          emptyMessage.textContent =
            "Nenhum video encontrado para esta playlist.";
          cardsHost.appendChild(emptyMessage);
        } else {
          videos.forEach((video) => {
            cardsHost.appendChild(
              cards(video.linkVideo, video.titulo, video.descricao),
            );
          });
        }

        loadedPlaylistIds.add(playlistId);

        clearVideosPlaceholder(cardsContainer);
        return { playlistId, status: "loaded", targetId: playlistEntry.id };
      })
      .catch((error) => {
        console.error("Erro ao carregar playlist:", error);

        if (isApiConfigurationError(error?.message)) {
          showFixedApiWarning(
            "Configure YOUTUBE_API_KEY no backend e reinicie o servidor para carregar os videos.",
          );
        }

        cardsHost.replaceChildren();
        cardsHost.removeAttribute("aria-busy");

        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Nao foi possivel carregar os videos: ${error.message || "erro desconhecido"}.`;
        cardsHost.appendChild(errorMessage);

        clearVideosPlaceholder(cardsContainer);
        return { playlistId, status: "error", targetId: playlistEntry.id };
      })
      .finally(() => {
        loadingPlaylistPromises.delete(playlistId);
        if (triggerButton) {
          triggerButton.disabled = false;
          delete triggerButton.dataset.loading;
        }
      });

    loadingPlaylistPromises.set(playlistId, loadPlaylistPromise);
    return loadPlaylistPromise;
  };
}

function renderPlaylistSkeleton(cardsHost, count = 3) {
  if (!cardsHost) {
    return;
  }

  const safeCount = Math.max(1, Number(count) || 3);

  for (let index = 0; index < safeCount; index += 1) {
    const skeletonCard = document.createElement("div");
    skeletonCard.className = "card card-skeleton";
    skeletonCard.setAttribute("aria-hidden", "true");

    const media = document.createElement("div");
    media.className = "skeleton-block skeleton-media";
    skeletonCard.appendChild(media);

    const titleLine = document.createElement("div");
    titleLine.className = "skeleton-block skeleton-title";
    skeletonCard.appendChild(titleLine);

    const textLineA = document.createElement("div");
    textLineA.className = "skeleton-block skeleton-text";
    skeletonCard.appendChild(textLineA);

    const textLineB = document.createElement("div");
    textLineB.className = "skeleton-block skeleton-text skeleton-text-short";
    skeletonCard.appendChild(textLineB);

    cardsHost.appendChild(skeletonCard);
  }
}

function getSkeletonCountByViewport() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return 3;
  }

  return window.matchMedia("(min-width: 990px)").matches ? 4 : 2;
}

function scrollToPlaylistContainer(targetContainer, options = {}) {
  if (!targetContainer) {
    return;
  }

  const executeScroll = () => {
    scrollElementWithHeaderOffset(targetContainer);
  };

  if (options?.source === "navbar") {
    executeScroll();
    return;
  }

  window.requestAnimationFrame(executeScroll);
}

function getStickyHeaderOffset() {
  const header = document.querySelector("header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;

  const rootStyle = getComputedStyle(document.documentElement);
  const cssHeaderSize = Number.parseFloat(
    rootStyle.getPropertyValue("--header-size") || "0",
  );

  // Keep a small breathing room below the sticky header.
  return Math.max(headerHeight, cssHeaderSize) + 12;
}

function scrollElementWithHeaderOffset(element) {
  if (!element) {
    return;
  }

  const offset = getStickyHeaderOffset();
  const absoluteTop = window.scrollY + element.getBoundingClientRect().top;
  const targetTop = Math.max(0, absoluteTop - offset);

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

function schedulePlaylistFetch(fetcher) {
  return new Promise((resolve, reject) => {
    const run = () => {
      Promise.resolve().then(fetcher).then(resolve).catch(reject);
    };

    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(run);
      return;
    }

    window.setTimeout(run, 0);
  });
}

function upsertVideosPlaceholder(cardsContainer, message, isLoading = false) {
  if (!cardsContainer) {
    return;
  }

  let emptyState = cardsContainer.querySelector(
    'p[data-videos-placeholder="true"]',
  );
  if (!emptyState) {
    emptyState = document.createElement("p");
    emptyState.dataset.videosPlaceholder = "true";
  }

  emptyState.classList.add("videos-placeholder");
  emptyState.classList.toggle("is-loading", isLoading);
  emptyState.textContent = message;
  emptyState.setAttribute("role", isLoading ? "status" : "note");
  emptyState.setAttribute("aria-live", isLoading ? "polite" : "off");
  cardsContainer.prepend(emptyState);
}

function clearVideosPlaceholder(cardsContainer) {
  if (!cardsContainer) {
    return;
  }

  const emptyState = cardsContainer.querySelector(
    'p[data-videos-placeholder="true"]',
  );
  if (emptyState) {
    emptyState.remove();
  }
}

function isApiConfigurationError(errorMessage) {
  const msg = String(errorMessage || "");
  return (
    msg.includes("YOUTUBE_API_KEY") || msg.includes("/api/youtube-playlist")
  );
}

function showFixedApiWarning(message) {
  const warningId = "youtube-api-warning";
  if (document.getElementById(warningId)) {
    return;
  }

  const warning = document.createElement("aside");
  warning.id = warningId;
  warning.setAttribute("role", "alert");
  warning.style.position = "fixed";
  warning.style.top = "12px";
  warning.style.left = "12px";
  warning.style.right = "12px";
  warning.style.zIndex = "9999";
  warning.style.background = "#8a1c1c";
  warning.style.color = "#fff";
  warning.style.padding = "12px 14px";
  warning.style.borderRadius = "10px";
  warning.style.boxShadow = "0 8px 24px rgba(0,0,0,0.24)";
  warning.style.fontSize = "0.95rem";
  warning.style.lineHeight = "1.4";
  warning.textContent = message;

  document.body.appendChild(warning);
}

function subContainer(id, titleText) {
  // Cria um sub-container para organizar os cards dentro de cada playlist

  const container = document.createElement("article");
  container.id = id;
  container.classList.add("is-growing");

  const subTitle = document.createElement("h3");
  subTitle.textContent = titleText;
  container.appendChild(subTitle);

  const separator = document.createElement("div");
  separator.dataset.cardsHost = "true";
  separator.classList.add("sub-container");
  container.appendChild(separator);

  return container;
}

function getOrCreateSubContainer(cardsContainer, id, titleText) {
  const existingContainer = cardsContainer.querySelector(`article[id="${id}"]`);
  if (existingContainer) {
    const subtitle = existingContainer.querySelector("h3");
    if (subtitle) {
      subtitle.textContent = titleText;
    }

    return existingContainer;
  }

  return subContainer(id, titleText);
}

function videosLoadPlaylist(sectionId, playlistId) {
  let state = videosSectionRegistry.get(sectionId);
  if (!state) {
    state = videosSectionRegistry.get(normalizeVideosRegistryKey(sectionId));
  }

  if (!state || typeof state.renderPlaylist !== "function") {
    return Promise.resolve(null);
  }

  return state.renderPlaylist(playlistId, null, { source: "navbar" });
}

function filterVideoDescription(rawDescription) {
  if (!rawDescription) {
    return "";
  }

  const promoIntentPattern =
    /\b(inscrev|acesse|acessa|apoie|apoiador|patrocin|siga|seguir|notific|certific|material de apoio|site oficial|canal no|entre no|grupo no|comunidade|redes sociais|social|telegram|instagram|facebook|tiktok|discord|whatsapp)\b/i;

  const normalizeForFilter = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const countMatches = (value, regex) => {
    const matches = String(value || "").match(regex);
    return Array.isArray(matches) ? matches.length : 0;
  };

  const normalizedDescription = String(rawDescription)
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ");

  const segments = normalizedDescription
    .replace(/\s*==\s*/g, "\n")
    .split(/\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const usefulSegments = segments.filter((segment) => {
    const lowered = normalizeForFilter(segment);
    const hasUrl = /https?:\/\/|www\.|t\.me\//i.test(segment);
    const hashtagCount = countMatches(segment, /(^|\s)#[a-z0-9_-]+/gi);
    const looksPromotional = promoIntentPattern.test(lowered);
    const looksLikeLinkList =
      /:\s*(https?:\/\/|www\.|t\.me\/)/i.test(segment) ||
      /(^|\s)==\s*/.test(segment);

    if (hashtagCount >= 2) {
      return false;
    }

    if (hasUrl && (looksPromotional || looksLikeLinkList)) {
      return false;
    }

    if (!hasUrl && hashtagCount === 1 && looksPromotional) {
      return false;
    }

    return true;
  });

  let cleanedDescription = usefulSegments
    .map((segment) =>
      segment
        .replace(/https?:\/\/\S+/gi, " ")
        .replace(/www\.\S+/gi, " ")
        .replace(/(^|\s)#[a-z0-9_-]+/gi, " ")
        .replace(/\s{2,}/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .join(" ");

  if (!cleanedDescription) {
    cleanedDescription = normalizedDescription
      .replace(/\s*==\s*/g, " ")
      .replace(/https?:\/\/\S+/gi, " ")
      .replace(/www\.\S+/gi, " ")
      .replace(/(^|\s)#[a-z0-9_-]+/gi, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return cleanedDescription.replace(/\s{2,}/g, " ").trim();
}

function cards(linkVideo, titleText, description) {
  // Cria um card para cada vídeo, contendo o iframe do vídeo, título, descrição e link para a aula do YouTube

  const div = document.createElement("div");
  div.classList.add("card");

  if (linkVideo) {
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.dataset.src = linkVideo;
    iframe.title = titleText || "Video aula";
    iframe.frameBorder = "0";
    iframe.loading = "lazy";
    iframe.decoding = "async";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.classList.add("video-iframe");

    div.appendChild(iframe);

    setupLazyIframe(iframe);

    const fallbackText = document.createElement("p");
    fallbackText.textContent =
      "Se o vídeo não carregar, use o link abaixo para assistir no YouTube.";
    div.appendChild(fallbackText);
  }

  const heading = document.createElement("h3");
  heading.textContent = titleText;
  div.appendChild(heading);

  const filteredDescription = filterVideoDescription(description);

  if (filteredDescription) {
    const descriptionGroup = document.createElement("div");
    descriptionGroup.classList.add("card-description");

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("card-description-text");
    descriptionElement.textContent = filteredDescription;
    descriptionGroup.appendChild(descriptionElement);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.classList.add("card-description-toggle");
    toggleButton.textContent = "Ver mais";
    toggleButton.setAttribute("aria-expanded", "false");

    toggleButton.addEventListener("click", () => {
      const isExpanded = descriptionGroup.classList.toggle("is-expanded");
      toggleButton.textContent = isExpanded ? "Ver menos" : "Ver mais";
      toggleButton.setAttribute("aria-expanded", String(isExpanded));
    });

    descriptionGroup.appendChild(toggleButton);
    div.appendChild(descriptionGroup);
  }

  if (linkVideo) {
    const sectionLinks = document.createElement("section");
    sectionLinks.classList.add("buttonCard");

    const linkElement = document.createElement("a");
    linkElement.href = linkVideo;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.textContent = "Abrir aula";

    sectionLinks.appendChild(linkElement);
    div.appendChild(sectionLinks);
  }

  return div;
}

function setupLazyIframe(iframe) {
  const loadIframe = () => {
    if (iframe.dataset.loaded === "true") {
      return;
    }

    const source = iframe.dataset.src;
    if (!source) {
      return;
    }

    iframe.src = source;
    iframe.dataset.loaded = "true";
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          loadIframe();
          observerInstance.unobserve(entry.target);
        });
      },
      { rootMargin: "250px 0px" },
    );

    observer.observe(iframe);
    return;
  }

  window.requestAnimationFrame(loadIframe);
}

window.videos = videos;
window.videosLoadPlaylist = videosLoadPlaylist;
