algoritmo "cadastro_produto"

tipo
    TProduto = registro
        codigo: inteiro
        descricao: caractere
        preco: real
    fimregistro

var

    p: TProduto

inicio

    escreval("Código: ")
    leia(p.codigo)

    escreval("Descrição: ")
    leia(p.descricao)

    escreval("Preço: ")
    leia(p.preco)

    escreval("")
    escreval("===== PRODUTO CADASTRADO =====")
    escreval("Código: ", p.codigo)
    escreval("Descrição: ", p.descricao)
    escreval("Preço: ", p.preco:0:2)

fimalgoritmo