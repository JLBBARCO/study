algoritmo "matriz"
var

    notas: vetor[1..8,1..4] de real
    i, j: inteiro

inicio
    para i de 1 ate 8 faca
        para j de 1 ate 4 faca
        escreva("Nota do aluno ", i, " na prova ", j, ": ")
        leia(notas[i,j])
    fimpara

fimalgoritmo