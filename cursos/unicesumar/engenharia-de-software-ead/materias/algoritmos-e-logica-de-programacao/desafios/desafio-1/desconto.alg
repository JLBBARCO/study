algoritmo "desconto_produto"

var

    preco, desconto, valor_final: real

inicio

    escreval("Digite o preço do produto: ")
    leia(preco)

    desconto <- preco * 0.10
    valor_final <- preco - desconto

    escreval("")
    escreval("Valor com 10% de desconto: ", valor_final:0:2)

fimalgoritmo