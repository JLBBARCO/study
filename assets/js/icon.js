document.addEventListener("DOMContentLoaded", () => {
  const caminhoRelativo = obterCaminhoRelativo();
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
    document.querySelectorAll(
      "span." + icon.className
    ).innerHTML = `<img src="${icon.src}" alt="${icon.alt}" class="icon>`;
  });
});
