let display = document.getElementById('display');
let valorAtual = '';
let operacaoPendente = null;
let valorAnterior = '';

function adicionarNumero(numero) {
    valorAtual += numero;
    atualizarDisplay();
}

function adicionarDecimal() {
    if (!valorAtual.includes('.')) {
        valorAtual += '.';
        atualizarDisplay();
    }
} 

function escolherOperacao(operacao) {
    if (valorAtual === '') return;
    if (valorAnterior !== '') {
        calcularResultado();
    }
    operacaoPendente = operacao;
    valorAnterior = valorAtual;
    valorAtual = '';
}

function calcularResultado() {
    if (operacaoPendente === null || valorAtual === '') return;
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const atual = parseFloat(valorAtual);

    switch (operacaoPendente) {
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            resultado = anterior / atual;
            break;
        default:
            return;
    }

    valorAtual = resultado.toString();
    operacaoPendente = null;
    valorAnterior = '';
    atualizarDisplay();
}

function limparDisplay() {
    valorAtual = '';
    valorAnterior = '';
    operacaoPendente = null;
    atualizarDisplay();
}

function atualizarDisplay() {
    display.value = valorAtual;
}