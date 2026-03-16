function footer() {
  let footerElement = document.querySelector("footer");
  if (footerElement) {
    return footerElement;
  }

  footerElement = document.createElement("footer");
  const body = document.querySelector("body");
  if (body) {
    body.appendChild(footerElement);
  } else {
    console.error("Body element not found, cannot append footer");
  }

  return footerElement;
}

// --- Rodapé dinâmico ---
function initializeFooter() {
  const footer = document.querySelector("footer");
  if (footer) {
    const data = new Date();
    const ano = data.getFullYear();
    footer.innerHTML = `
      <div class="container_footer">
        <div class="card_footer">
          <h2>Projeto de Estudos</h2>
          <p>
            Projeto realizado para estudos de programação, com possibilidade de uso de qualquer pessoa.
          </p>
        </div>
        <div class="card_footer">
          <h2>Links Rápidos</h2>
          <ul>
            <li><a href="#Home">Início</a></li>
            <li><a href="https://github.com/jlbbarco/study">Repositório</a></li>
          </ul>
        </div>
        <div class="card_footer">
          <h2>Recursos</h2>
          <ul>
            <li><a href="https://jlbbarco.github.io/portfolio">Portfólio</a></li>
            <li><a href="https://github.com/JLBBARCO">GitHub</a></li>
          </ul>
        </div>
      </div>
      <p class="copyright">
        &copy; ${ano}. Todos os direitos de uso liberados.
      </p>
    `;
  }
}
