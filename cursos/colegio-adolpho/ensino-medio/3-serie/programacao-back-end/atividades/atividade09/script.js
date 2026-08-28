const praiaTabatinga = document.getElementById("praia-tabatinga");

praiaTabatinga.addEventListener("mouseover", mouseHover);
praiaTabatinga.addEventListener("mouseout", mouseOut);

function mouseHover() {
  const info = document.querySelector(".info");
  info.style.display = "block";
}
function mouseOut() {
  const info = document.querySelector(".info");
  info.style.display = "none";
}
