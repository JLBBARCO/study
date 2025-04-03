let botao_acessibilidade = document.getElementById('opcoes_acessibilidade');
botao_acessibilidade.style.display = 'none';
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

function acessibilidade() {
    botao_acessibilidade.style.display = 'block';
}