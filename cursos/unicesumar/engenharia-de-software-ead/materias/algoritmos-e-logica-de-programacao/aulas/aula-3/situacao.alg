algoritmo "situacao"
var
    n1: real
    n2: real
    media: real
inicio
    escreval("Nota 1: ")
        leia(n1)
    escreval("Nota 2: ")
        leia(n2)
    media <- (n1 + n2) / 2    se (media >= 6) entao
        escreval("Aprovado")
     senao
        escreval("Reprovado")
    fimse

fimalgoritmo