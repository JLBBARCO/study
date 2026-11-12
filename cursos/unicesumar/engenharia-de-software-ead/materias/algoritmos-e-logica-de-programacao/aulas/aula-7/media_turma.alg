algoritmo "media_turma"
var
    nota: vetor [1..10] de real
    i: inteiro
    soma: real
    media: real
inicio
    soma <- 0
    para i <- 1 ate 10 faca
        escreva("Nota do aluno ", i, ": ")
                leia(nota[i])
        soma <- soma + nota[i]    fimpara
    media <- soma / 10    escreval("Média da turma: ", media)

fimalgoritmo