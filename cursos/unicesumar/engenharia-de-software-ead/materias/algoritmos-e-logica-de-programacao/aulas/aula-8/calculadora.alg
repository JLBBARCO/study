algoritmo "calculadora"

procedimento soma (a, b: real)
var
    resultado: real
inicio
    resultado <- a + b
    escreval("O resultado da soma é: ", resultado)
fimprocedimento

var
    x, y: real
inicio
    leia(x,y)
    soma(x,y) // chamada do procedimento
fimalgoritmo