document.addEventListener('DOMContentLoaded', () => {
    // Menu de navegação
    const navLinksButton = document.getElementById('nav-links-button');
    const navLinks = document.querySelector('.nav_links');

    if (navLinksButton && navLinks) {
        navLinksButton.addEventListener('click', () => {
            if (!navLinks.style.display || navLinks.style.display === '') {
                navLinks.style.display = 'none';
            }
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && event.target !== navLinksButton) {
                navLinks.style.display = 'none';
            }
        });
    }
    
    // Acessibilidade
    const accessibilityTrigger = document.getElementById('accessibility-trigger');
    const accessibilityButton = document.getElementById('accessibility-button');
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    let font = parseFloat(localStorage.getItem('fontSize')) || 1;

    if (accessibilityTrigger && accessibilityButton) {
        accessibilityTrigger.addEventListener('click', () => {
            accessibilityButton.classList.toggle('active');
        });
    }

    document.addEventListener('click', (event) => {
        if (
            accessibilityTrigger &&
            accessibilityButton &&
            !accessibilityTrigger.contains(event.target) &&
            event.target !== accessibilityButton
        ) {
            const options = document.getElementById('accessibility-options');
            if (options) options.style.display = 'none';
        }
    });

    if (increaseFontButton && decreaseFontButton) {
        document.body.style.fontSize = font + 'em';

        increaseFontButton.addEventListener('click', () => {
            font += 0.1;
            document.body.style.fontSize = font + 'em';
            localStorage.setItem('fontSize', font);
        });

        decreaseFontButton.addEventListener('click', () => {
            font = Math.max(0.5, font - 0.1);
            document.body.style.fontSize = font + 'em';
            localStorage.setItem('fontSize', font);
        });
    }

    // Rodapé
    const copyright = document.getElementById('copyright');
    if (copyright) {
        const data = new Date();
        const ano = data.getFullYear();
        copyright.innerHTML = `&copy; ${ano} Site criado por <a href="http://github.com/JLBBARCO" target="_blank" rel="noopener noreferrer">José Luiz B Barco</a>`;
    }
});