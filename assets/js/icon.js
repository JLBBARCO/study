document.addEventListener("DOMContentLoaded", () => {
  // Adicionar log para debug
  console.log("Carregando ícones...");

  const caminhoRelativo =
    typeof obterCaminhoRelativo === "function" ? obterCaminhoRelativo() : "";
  console.log("Caminho relativo:", caminhoRelativo);

  const iconStorage = caminhoRelativo + "assets/icon/";
  console.log("Pasta de ícones:", iconStorage);

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
    {
      className: "work",
      src: `${iconStorage}work_bag.svg`,
      alt: "Ícone de Trabalho",
    },
    {
      className: "code_icon",
      src: `${iconStorage}code_icon.svg`,
      alt: "Ícone de Código",
    },
    {
      className: "camera",
      src: `${iconStorage}video-camera_icon.svg`,
      alt: "Ícone de Câmera",
    },
    {
      className: "school",
      src: `${iconStorage}university_graduate_hat.svg`,
      alt: "Ícone de Escola",
    },
    { className: "html5", src: `${iconStorage}html5.svg`, alt: "Ícone HTML5" },
    {
      className: "github",
      src: `${iconStorage}github.svg`,
      alt: "Ícone GitHub",
    },
    {
      className: "javascript",
      src: `${iconStorage}javascript.svg`,
      alt: "Ícone JavaScript",
    },
    {
      className: "python",
      src: `${iconStorage}python.svg`,
      alt: "Ícone Python",
    },
    {
      className: "php",
      src: `${iconStorage}php.svg`,
      alt: "Ícone PHP",
    },
    {
      className: "java",
      src: `${iconStorage}java.svg`,
      alt: "Ícone Java",
    },
    {
      className: "mysql",
      src: `${iconStorage}mysql.svg`,
      alt: "Ícone MySQL",
    },
    {
      className: "arduino",
      src: `${iconStorage}arduino.svg`,
      alt: "Ícone Arduino",
    },
    {
      className: "graphic_design",
      src: `${iconStorage}graphic_design.svg`,
      alt: "Ícone Design Gráfico",
    },
    {
      className: "document_folder",
      src: `${iconStorage}document_folder.svg`,
      alt: "Ícone Documento/Pasta",
    },
  ];

  icons.forEach((icon) => {
    console.log(`Verificando ícone: ${icon.className}, caminho: ${icon.src}`);
    // Seleciona qualquer elemento que possua a classe (mais flexível que só span)
    const elements = document.querySelectorAll("." + icon.className);
    if (elements && elements.length) {
      elements.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag === "span") {
          // insere a imagem dentro do span correspondente
          el.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="icon ${icon.className}">`;
        } else if (tag === "img") {
          el.src = icon.src;
          if (icon.alt) el.alt = icon.alt;
        } else if (tag === "i" || tag === "button" || tag === "a") {
          // permite ícones em botões, links, etc.
          el.innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="icon ${icon.className}">`;
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
