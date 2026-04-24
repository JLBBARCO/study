function videos() {
  // Função principal para carregar e exibir os vídeos do curso, organizados por playlists

  const videosSection = document.getElementById("Vídeos");
  if (!videosSection) {
    return;
  }

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

  fetch(
    `${obterCaminhoRelativo()}src/data/youtube/${videosSection.ariaLabel}.json`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
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

      const shouldGroupByPlaylist = playlistEntries.length > 1;

      return Promise.all(
        playlistEntries.map(({ playlist, id }) => {
          playlistLinkMap.push({ id, title: playlist.titulo || "Playlist" });

          return fetchPlaylistVideos(playlist)
            .then((videos) => ({ playlist, videos, id }))
            .catch((error) => {
              console.error("Erro ao carregar playlist:", error);
              return { playlist, videos: [], error: error.message, id };
            });
        }),
      ).then((results) => ({ results, shouldGroupByPlaylist }));
    })
    .then((payload) => {
      if (!payload) {
        return;
      }

      const { results, shouldGroupByPlaylist } = payload;
      renderPlaylistLinks(containerBtn, playlistLinkMap, shouldGroupByPlaylist);

      const hasAnyVideo = results.some((item) => item.videos.length > 0);

      if (!hasAnyVideo) {
        const firstError = results.find((item) => item.error)?.error;
        if (isApiConfigurationError(firstError)) {
          showFixedApiWarning(
            "Configure YOUTUBE_API_KEY no backend e reinicie o servidor para carregar os videos.",
          );
        }

        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = firstError
          ? `Nao foi possivel carregar os videos: ${firstError}`
          : "Nenhum video encontrado para esta pagina.";
        cardsContainer.appendChild(emptyMessage);
        return;
      }

      results.forEach(({ playlist, videos, id }) => {
        if (!videos.length) {
          return;
        }

        const targetContainer = shouldGroupByPlaylist
          ? subContainer(id, playlist.titulo || "Playlist")
          : cardsContainer;

        const cardsHost = shouldGroupByPlaylist
          ? targetContainer.querySelector('[data-cards-host="true"]')
          : targetContainer;

        videos.forEach((video) => {
          cardsHost.appendChild(
            cards(video.linkVideo, video.titulo, video.descricao, video.link),
          );
        });

        if (shouldGroupByPlaylist) {
          cardsContainer.appendChild(targetContainer);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar videos:", error);

      if (isApiConfigurationError(error?.message)) {
        showFixedApiWarning(
          "Configure YOUTUBE_API_KEY no backend e reinicie o servidor para carregar os videos.",
        );
      }

      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Nao foi possivel carregar os videos no momento.";
      cardsContainer.appendChild(errorMessage);
    });

  videosSection.appendChild(cardsContainer);
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

function renderPlaylistLinks(
  containerBtn,
  playlistLinkMap,
  shouldGroupByPlaylist,
) {
  if (!containerBtn) {
    return;
  }

  containerBtn.replaceChildren();

  if (
    !shouldGroupByPlaylist ||
    !Array.isArray(playlistLinkMap) ||
    playlistLinkMap.length === 0
  ) {
    containerBtn.hidden = true;
    return;
  }

  containerBtn.hidden = false;

  playlistLinkMap.forEach(({ id, title }) => {
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = title;
    link.classList.add("container-btn-link");
    containerBtn.appendChild(link);
  });
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

  const subTitle = document.createElement("h3");
  subTitle.textContent = titleText;
  container.appendChild(subTitle);

  const separator = document.createElement("div");
  separator.dataset.cardsHost = "true";
  separator.classList.add("sub-container");
  container.appendChild(separator);

  return container;
}

function cards(linkVideo, titleText, description, link) {
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

  if (description) {
    const descriptionGroup = document.createElement("div");
    descriptionGroup.classList.add("card-description");

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("card-description-text");
    descriptionElement.textContent = description;
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

  if (link) {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.textContent = "Abrir aula";
    div.appendChild(linkElement);
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
