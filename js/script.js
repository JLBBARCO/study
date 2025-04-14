// Acessibilidade
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityTrigger = document.getElementById('accessibility-trigger');
    const accessibilityButton = document.getElementById('accessibility-button');
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    let font = parseFloat(localStorage.getItem('fontSize')) || 1;

    // Alterna a visibilidade das opções de acessibilidade
    if (accessibilityTrigger && accessibilityButton) {
        accessibilityTrigger.addEventListener('click', () => {
            accessibilityButton.classList.toggle('active');
        });
    }

    // Ajusta o tamanho da fonte
    if (increaseFontButton && decreaseFontButton) {
        document.body.style.fontSize = font + 'em';

        increaseFontButton.addEventListener('click', () => {
            font += 0.1;
            document.body.style.fontSize = font + 'em';
            localStorage.setItem('fontSize', font);
        });

        decreaseFontButton.addEventListener('click', () => {
            font = Math.max(0.5, font - 0.1); // Limita o tamanho mínimo da fonte
            document.body.style.fontSize = font + 'em';
            localStorage.setItem('fontSize', font);
        });
    }
});

// Menu de navegação
document.addEventListener('DOMContentLoaded', () => {
    const navLinksButton = document.getElementById('nav-links-button');
    const navLinks = document.querySelector('.nav_links');

    if (navLinksButton && navLinks) {
        // Alterna entre mostrar e ocultar a div.nav_links ao clicar no botão
        navLinksButton.addEventListener('click', () => {
            if (!navLinks.style.display || navLinks.style.display === '') {
                navLinks.style.display = 'none'; // Initialize display property if not set
            }
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && event.target !== navLinksButton) {
                navLinks.style.display = 'none';
            }
        });
    }
});

// Tema
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-button');
    const themeCss = document.getElementById('theme-css');

    if (themeButton && themeCss) {
        // Define os caminhos relativos para os temas
        const lightTheme = themeCss.getAttribute('href').replace('dark.css', 'light.css');
        const darkTheme = themeCss.getAttribute('href').replace('light.css', 'dark.css');

        // Carrega o tema salvo no localStorage ou define o padrão como 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeCss.setAttribute('href', savedTheme === 'light' ? lightTheme : darkTheme);

        // Alterna entre os temas ao clicar no botão
        themeButton.addEventListener('click', () => {
            const currentTheme = themeCss.getAttribute('href').includes('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Atualiza o tema no link e salva no localStorage
            themeCss.setAttribute('href', newTheme === 'light' ? lightTheme : darkTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// Atualiza o ano no rodapé
document.addEventListener('DOMContentLoaded', () => {
    const ano = document.querySelector('div#ano');
    if (ano) {
        const data = new Date();
        ano.innerHTML = `${data.getFullYear()}`;
    }
});