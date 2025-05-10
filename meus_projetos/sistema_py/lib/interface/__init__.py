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

def menu(opções=[], título='MENU DE OPÇÕES', mostrarTítulo=True):
    if mostrarTítulo is True:
        cabeçalho(título)
    for i, c in enumerate(opções):
        print(f'\033[33m{i}\033[m - \033[34m{c}\033[m')
