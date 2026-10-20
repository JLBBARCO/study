algoritmo "desconto"
var
    valor: real
    total: real
inicio
    escreva("Valor da compra: ")
        leia(valor)
    se (valor >= 200) entao
        total <- valor - (valor * 0.1)
        escreval("Desconto de 10% aplicado.")
     senao
        total <- valor        escreval("Sem desconto")
    fimse
    escreval("Total a pagar: ", total)

fimalgoritmo