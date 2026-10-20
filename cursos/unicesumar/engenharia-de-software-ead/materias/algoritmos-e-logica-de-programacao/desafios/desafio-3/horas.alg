algoritmo "converter_horas"
var
    horas: inteiro
    minutos: inteiro
    segundos: inteiro
inicio
    escreva("Digite o número de horas: ")
        leia(horas)
    minutos <- horas * 60
    segundos <- horas * 3600
    escreval("")
    escreval("Equivalente em minutos: ", minutos)
    escreval("Equivalente em segundos: ", segundos)

fimalgoritmo