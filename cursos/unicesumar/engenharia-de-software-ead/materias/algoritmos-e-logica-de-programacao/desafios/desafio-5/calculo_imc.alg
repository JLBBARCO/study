algoritmo "calculo_imc"
var
    peso: real
    altura: real
inicio
    escreval("Digite o peso: ")
        leia(peso)
    escreval("Digite a altura: ")
        leia(altura)
    // Cálculo do IMC
    escreval("O IMC é: ", peso / (altura * altura))
fimalgoritmo