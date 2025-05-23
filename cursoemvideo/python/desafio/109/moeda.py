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
    retorno = f'{moeda} {preço}'.replace('.', ',')
    return retorno
