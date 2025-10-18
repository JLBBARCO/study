document.addEventListener("DOMContentLoaded", function () {
  const caminhoRelativo =
    typeof obterCaminhoRelativo === "function" ? obterCaminhoRelativo() : "";

  const faviconStorage = caminhoRelativo + "assets/favicon/";
  const icons = [
    { className: "AI", src: `${faviconStorage}ai-96.ico` },
    { className: "Arduino", src: `${faviconStorage}arduino-96.ico` },
    { className: "Book", src: `${faviconStorage}book-96.ico` },
    {
      className: "ColégioAdolpho",
      src: `${faviconStorage}colegio_adolpho-256.ico`,
    },
    { className: "CursoemVideo", src: `${faviconStorage}cursoemvideo-256.ico` },
    { className: "GitHub", src: `${faviconStorage}github-256.ico` },
    {
      className: "GraphicDesign",
      src: `${faviconStorage}graphic_design-96.ico`,
    },
    { className: "HTML5", src: `${faviconStorage}html5-96.ico` },
    { className: "Java", src: `${faviconStorage}java-96.ico` },
    { className: "JavaScript", src: `${faviconStorage}javascript-96.ico` },
    { className: "Markdown", src: `${faviconStorage}markdown-96.ico` },
    { className: "MySQL", src: `${faviconStorage}mysql-32.ico` },
    { className: "PHP", src: `${faviconStorage}php-256.ico` },
    { className: "Python", src: `${faviconStorage}python-256.ico` },
    { className: "Workflow", src: `${faviconStorage}workflow-256.ico` },
  ];

  icons.forEach((icon) => {
    // permite múltiplos elementos com a mesma classe
    const elements = document.querySelectorAll(`.${icon.className}`);
    if (!elements || elements.length === 0) return;
    elements.forEach((element) => {
      const tag = element.tagName.toLowerCase();
      if (tag === "link") {
        element.href = icon.src;
      } else if (tag === "img") {
        element.src = icon.src;
      } else {
        // fallback — definir atributo href (útil se for um <a> ou similar)
        try {
          element.setAttribute("href", icon.src);
        } catch (e) {
          // ignore
        }
      }
    });
  });
});
