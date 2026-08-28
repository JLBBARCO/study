// ** Manipulando o título com o DOM
const title = document.getElementsByTagName("h1");
title[0].innerHTML = "Manipulação do DOM";

// ** Manipulando os itens da lista com o DOM
const item = document.getElementsByClassName("item");
item[1].innerHTML = "Item alterado";
item[3].innerHTML = "Melancia";

// ** Adicionando borda na lista ordenada com o DOM
const lista = document.getElementById("lista");
lista.style.border = "1px solid black";

// ** Adicionando evento de hover na imagem com o DOM
const imagem = document.getElementById("imagem");
imagem.addEventListener("mouseover", mouseHover);
imagem.addEventListener("mouseout", mouseOut);
function mouseHover() {
  imagem.src = "mustang2016.webp";
}
function mouseOut() {
  imagem.src = "mustang1967.webp";
}

const elementoX = document.getElementById("elementoX");
elementoX.addEventListener("click", function () {
  elementoX.style.textAlign = "center";
  elementoX.innerHTML = "Ford Mustang 1967 <br> Ford Mustang 2016";
});
