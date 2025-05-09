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


    // Tema com ícone dinâmico
    const themeButton = document.getElementById('theme-button');
    const themeCss = document.getElementById('theme-css');
    const themeIcon = themeButton ? themeButton.querySelector('i') : null;

    if (themeButton && themeCss) {
        // Caminho relativo dinâmico para subpastas
        function getThemePath(theme) {
            const path = window.location.pathname;
            const depth = path.split('/').length - 2; // -2 para ignorar '' e o arquivo
            let rel = '';
            for (let i = 0; i < depth; i++) rel += '../';
            return rel + 'style/' + theme + '.css';
        }

        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun', 'fa-moon');
                themeIcon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
            }
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
        themeCss.setAttribute('href', getThemePath(savedTheme));
        updateThemeIcon(savedTheme);

        themeButton.addEventListener('click', () => {
            const currentTheme = themeCss.getAttribute('href').includes('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            themeCss.setAttribute('href', getThemePath(newTheme));
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
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