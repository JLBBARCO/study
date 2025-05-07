def aumentar(preço=0, taxa=0, formato=False):
    res = preço + (preço * taxa / 100)
    return res if format is False else moeda(res)


def diminuir(preço=0, taxa=0, formato=False):
    res = preço - (preço * taxa / 100)
    return res if format is False else moeda(res)


def dobro(preço=0, formato=False):
    res = preço * 2
    return res if format is False else moeda(res)


def metade(preço=0, formato=False):
    res = preço / 2
    return res if format is False else moeda(res)


def moeda(preço=0.00, moeda='R$'):
    returno = f'{moeda} {preço:>.2f}'.replace('.', ',')
    return returno

def resumo(preço=0, taxaAumento=10, taxaRedução=5, formato=False):
    print('-' * 30)
    print('RESUMO DO VALOR'.center(30))
    print('-' * 30)
    print(f'Preço analisado: \t{moeda(preço)}')
    print(f'Dobro do preço: \t{dobro(preço, True)}')
    print(f'Metade do preço: \t{metade(preço, True)}')
    print(f'{taxaAumento}% de aumento: \t{aumentar(preço, taxaAumento, True)}')
    print(f'{taxaRedução}% de redução: \t{diminuir(preço, taxaRedução, True)}')
    print('-' * 30)
