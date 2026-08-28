let currentIndex = 0;

function esconder() {
  const cartoes = document.querySelectorAll(".cartao");

  // Ocultar todos os cartões
  cartoes.forEach((cartao) => cartao.classList.remove("ativado"));

  // Se o índice atual for menor que o número de cartões, mostrar o próximo
  if (currentIndex < cartoes.length) {
    cartoes[currentIndex].classList.add("ativado");
    currentIndex++;
  } else {
    // Quando chegar ao último, mostrar todos os cartões
    cartoes.forEach((cartao) => cartao.classList.add("ativado"));
    currentIndex = 0; // Reiniciar o índice
  }
}
