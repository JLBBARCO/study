def linha(tam=60):
    """
    -> Cria uma linha de separação.
    :param tam: O tamanho da linha. Padrão é 60.
    :return: None
    """
    print('-' * tam)

def cabeçalho(txt):
    """
    -> Cria um cabeçalho para o programa.
    :param txt: O texto a ser exibido no cabeçalho.
    :return: None
    """
    linha()
    print(txt.center(60))
    linha()

def menu(opções=[], título='MENU DE OPÇÕES'):
    """
    -> Cria um menu de opções para o programa.
    :param opções: Informações sobre a opção.
    :param título: Título do menu, se não for passado, o padrão é 'MENU DE OPÇÕES'. False para não mostrar o título.
    """
    if título == False:
        pass
    else:
        cabeçalho(título)
    for i, c in enumerate(opções):
        print(f'\033[33m{i}\033[m - \033[34m{c}\033[m')

def resultado(valor, fim='', linhas=True):
    """
    -> Personaliza o return de algum resultado.
    :param valor: Valor do resultado.
    :param fim: Declara qual vai ser o end do print. Padrão vazio.
    :param linhas: Declara se vai mostrar linhas nas partes de cima e baixo do resultado. Padrão True.
    """
    if isinstance(valor, (list, dict, tuple)):
        if linhas is True:
            linha()
        for c in valor:
            print(c, end=fim)
        print()
    else:
        print(valor, end=fim)
