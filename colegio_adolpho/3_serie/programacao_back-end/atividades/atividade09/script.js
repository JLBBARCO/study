const praiaTabatinga = document.getElementById("praia-tabatinga");
const peninsulaValdes = document.getElementById("peninsula-valdes");

praiaTabatinga.addEventListener("mouseover", mouseHover);
praiaTabatinga.addEventListener("mouseout", mouseOut);
peninsulaValdes.addEventListener("mouseover", mouseHover);
peninsulaValdes.addEventListener("mouseout", mouseOut);

function mouseHover() {
  const info = document.querySelector(".info"); // corrigido para classe
  info.style.display = "block";
}
function mouseOut() {
  const info = document.querySelector(".info"); // corrigido para classe
  info.style.display = "none";
}
