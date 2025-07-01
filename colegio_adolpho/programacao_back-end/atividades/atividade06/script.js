var janelaPadrao = 990;

function resize() {
  const itens = document.querySelector(".links");
  const burgerIcon = document.querySelector(".burger-icon");
  if (!itens || !burgerIcon) return;
  if (window.innerWidth >= janelaPadrao) {
    itens.style.display = "flex";
    burgerIcon.src = "../../../../assets/svg/close.svg";
  } else {
    itens.style.display = "none";
    burgerIcon.src = `../../../../assets/svg/menu.svg`;
  }
}

function menuToggle() {
  const menu = document.querySelector(".links");
  const icon = document.querySelector(".burger-icon");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
    icon.src = "../../../../assets/svg/close.svg";
  } else {
    menu.style.display = "none";
    icon.src = "../../../../assets/svg/menu.svg";
  }
}

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
