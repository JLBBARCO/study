/* Data */
var data = new Date()
var atual = data.getFullYear()
var ano = document.querySelector('div#ano')
ano.innerHTML = `${atual}`

// Thead fixo no topo da tela
const table = document.querySelector('table');
    const thead = table.querySelector('thead');
    const offsetTop = table.offsetTop;
    const theadHeight = thead.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > offsetTop + table.offsetHeight - theadHeight) {
        thead.classList.add('detached');
    } else {
        thead.classList.remove('detached');
    }
    });