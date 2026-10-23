algoritmo "menu"
var

    op: inteiro
    a, b: real

inicio

    escreval("1 - Somar")
    escreval("2 - Subtrair")
    escreval("3 - Multiplicar")
    escreval("Escolha uma opção: ")
    leia(op)

    se (op >= 1) e (op <= 3) entao
        escreval("Digite o primeiro número: ")
        leia(a)
        escreval("Digite o segundo número: ")
        leia(b)

        escolha(op)
            caso 1
                escreval("Resultado da soma: ", a + b)
            caso 2
                escreval("Resultado da subtração: ", a - b)
            caso 3
                escreval("Resultado da multiplicação: ", a * b)
        fimescolha
    senao
        escreval("Opcao invalida")
    fimse

fimalgoritmo