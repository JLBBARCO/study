document.addEventListener("DOMContentLoaded", () => {
  const caminhoRelativo =
    typeof obterCaminhoRelativo === "function" ? obterCaminhoRelativo() : "";

  const iconStorage = caminhoRelativo + "assets/svg/";
  const icons = [
    {
      className: "iconHome",
      src: `${iconStorage}home.svg`,
      alt: "Ícone de Início",
    },
    {
      className: "iconArrowBack",
      src: `${iconStorage}arrow_back.svg`,
      alt: "Ícone de Voltar",
    },
    {
      className: "iconArrowForward",
      src: `${iconStorage}arrow_forward.svg`,
      alt: "Ícone de Avançar",
    },
    {
      className: "iconClose",
      src: `${iconStorage}close.svg`,
      alt: "Ícone de Fechar",
    },
    {
      className: "iconMenu",
      src: `${iconStorage}menu.svg`,
      alt: "Ícone de Menu",
    },
  ];

  icons.forEach((icon) => {
    // Seleciona qualquer elemento que possua a classe (mais flexível que só span)
    const elements = document.querySelectorAll("." + icon.className);
    if (elements && elements.length) {
      elements.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag === "span") {
          // insere a imagem dentro do span correspondente
          el.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="icon">`;
        } else if (tag === "img") {
          el.src = icon.src;
          if (icon.alt) el.alt = icon.alt;
        } else if (tag === "i" || tag === "button" || tag === "a") {
          // permite ícones em botões, links, etc.
          el.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="icon">`;
        } else {
          // fallback: define atributo src/href se aplicável
          try {
            el.setAttribute("src", icon.src);
          } catch (e) {
            // ignore
          }
        }
      });
    }
  });
});
