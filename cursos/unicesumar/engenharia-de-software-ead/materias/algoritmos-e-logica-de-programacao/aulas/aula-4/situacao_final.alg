algoritmo "situacao_final"
var
    media: real
inicio
    escreva("Digite a media: ")
        leia(media)
    se (media >= 7) entao
        escreva("APROVADO")
     senao
        se (media >= 5) entao
            escreva("EM EXAME")
         senao
            escreva("REPROVADO")
        fimse
    fimse

fimalgoritmo