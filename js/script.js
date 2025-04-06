// Acessibilidade

document.addEventListener('DOMContentLoaded', () => {
    const accessibilityTrigger = document.getElementById('accessibility-trigger');
    accessibilityTrigger.addEventListener('click', () => {
        const accessibilityButton = document.getElementById('accessibility-button');
        accessibilityButton.classList.toggle('active');
    });

    let font = 1;
    
    const increaseFontButton = document.getElementById('increase-font');
    increaseFontButton.addEventListener('click', () => {
        font += .1;
        document.body.style.fontSize = font + 'em';
    });
    
    const decreaseFontButton = document.getElementById('decrease-font');
    decreaseFontButton.addEventListener('click', () => {
        font -= .1;
        document.body.style.fontSize = font + 'em';
    });
    
    function adjustFontSize(amount) {
        const currentFontSize = parseFloat(window.getComputedStyle(body).fontSize);
        body.style.fontSize = (currentFontSize + amount) + 'px';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinksButton = document.getElementById('nav-links-button');
    const navLinks = document.querySelector('.nav_links');

    // Alterna entre mostrar e ocultar a div.nav_links ao clicar no botão
    navLinksButton.addEventListener('click', () => {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex'; // Exibe o menu
        } else {
            navLinks.style.display = 'none'; // Oculta o menu
        }
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && event.target !== navLinksButton) {
            navLinks.style.display = 'none';
        }
    });
});

// Data
var data = new Date();
var atual = data.getFullYear();
var ano = document.querySelector('div#ano');
ano.innerHTML = `${atual}`;