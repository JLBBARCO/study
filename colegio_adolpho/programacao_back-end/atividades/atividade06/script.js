function acessibilidade() {
  const acessibilidade = document.querySelector("div.acessibilidade-opcoes");

  if (acessibilidade.style.display === "none") {
    acessibilidade.style.display = "flex";
  } else {
    acessibilidade.style.display = "none";
  }
}

function aumentarFonte() {
  const corpo = document.querySelector("body");
  const fonteAtual = parseFloat(getComputedStyle(corpo).fontSize);
  corpo.style.fontSize = fonteAtual + 2 + "px";
}

function diminuirFonte() {
  const corpo = document.querySelector("body");
  const fonteAtual = parseFloat(getComputedStyle(corpo).fontSize);
  corpo.style.fontSize = fonteAtual - 2 + "px";
}
