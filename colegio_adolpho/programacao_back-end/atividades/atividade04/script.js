document.querySelector('button#botao_acessibilidade').addEventListener('click', function () {

    let opcoes_acessibilidade = document.querySelector('div#opcoes-acessibilidade');

    opcoes_acessibilidade.style.display = 'block';

});

document.addEventListener('DOMContentLoaded', function () {

    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');

    let tamanhoAtualFonte = 1;

    aumentaFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte += 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`

    })

    diminuiFonteBotao.addEventListener('click', function () {
        tamanhoAtualFonte -= 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`

    })

})
