document.addEventListener("DOMContentLoaded", function () {
  icons = [
    { className: "AI", src: "assets/favicon/ai.ico" },
    { className: "Arduino", src: "assets/favicon/arduino.ico" },
    { className: "Book", src: "assets/favicon/book.ico" },
    { className: "Colégio Adolpho", src: "assets/favicon/colegio_adolpho.ico" },
    { className: "CursoemVideo", src: "assets/favicon/cursoemvideo.ico" },
    { className: "GitHub", src: "assets/favicon/github.ico" },
    { className: "Graphic Design", src: "assets/favicon/graphic_design.ico" },
    { className: "HTML5", src: "assets/favicon/html5.ico" },
    { className: "Java", src: "assets/favicon/java.ico" },
    { className: "JavaScript", src: "assets/favicon/javascript.ico" },
    { className: "Markdown", src: "assets/favicon/markdown.ico" },
    { className: "PHP", src: "assets/favicon/php.ico" },
    { className: "Python", src: "assets/favicon/python.ico" },
    { className: "Workflow", src: "assets/favicon/workflow.ico" },
  ];
  document.querySelector(icons.className).src = icons.src;
});
