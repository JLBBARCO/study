algoritmo "maioridade"
var
    idade: inteiro
inicio
    escreva("Digite sua idade: ")
        leia(idade)
    se (idade >= 18) entao
        escreval("Maior de idade.")
     senao
        escreval("Menor de idade - faltam ", 18 - idade, " anos")
    fimse

fimalgoritmo