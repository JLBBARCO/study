def cabecalho(tamanho=60, simbolo='-', texto=None):
    """
    Imprime uma barra de progresso ou separação.

    :param tamanho: Tamanho da barra (padrão é 60).
    :param simbolo: Símbolo usado para a barra (padrão é '-').
    :param texto: Texto que aparece no cabeçalho (padrão é None).
    """
    if texto is not None:
        print(simbolo*tamanho)
        print(texto)
        print(simbolo*tamanho)
    else:
        print(simbolo*tamanho)

def menu(opções, tamanho=60, simbolo='-', textoCabeçalho=None):
    """
    Imprime um menu personalizado

    :param opções: Lista das opções
    :param tamanho: Tamanho da barra superior
    :param simbolo: Símbolo usado para a barra (padrão é '-')
    :param textoCabeçalho: Texto que aparece no cabeçalho (padrão é None)
    """
    cabecalho(tamanho=tamanho, simbolo=simbolo, texto=textoCabeçalho)
    for c, i in enumerate(opções):
        print(f'{c} - {i}')
    cabecalho()
