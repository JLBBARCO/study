// Acessibilidade
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button#botao_acessibilidade').addEventListener('click', function() {
        document.querySelector('div#opcoes_acessibilidade').style.display = 'block';
    });

    let fonte = 1;
    document.querySelector('button#aumentar_fonte').addEventListener('click', function() {
        fonte += 0.1;
        document.body.style.fontSize = `${fonte}rem`;
    });

    document.querySelector('button#diminuir_fonte').addEventListener('click', function() {
        fonte -= 0.1;
        document.body.style.fontSize = `${fonte}rem`;
    });

    document.querySelector('button#fechar_acessibilidade').addEventListener('click', function() {
        document.querySelector('div#opcoes_acessibilidade').style.display = 'none';
    });

});

// Data
var data = new Date()
var atual = data.getFullYear()
var ano = document.querySelector('div#ano')
ano.innerHTML = `${atual}`