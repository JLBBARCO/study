def leiaInt(msg):
    while True:
        try:
            n = int(input(msg))
        except (ValueError, TypeError):
            print('\033[0;31mERRO! Digite um número inteiro válido.\033[m')
            continue
        except KeyboardInterrupt:
            print('\n\033[0;31mUsuário preferiu não digitar esse número.\033[m')
            return 0
        else:
            return n

def linha(tamanho=42):
    """
    -> Cria uma linha de tamanho especificado.
    :param tamanho: Tamanho da linha.
    :return: Retorna uma linha de caracteres '-'.
    """
    return '-' * tamanho

def cabeçalho(txt):
    print(linha())
    print(txt.center(42))
    print(linha())

def menu(lista):
    """
    -> Cria um menu com as opções especificadas na lista.
    :param lista: Lista de opções do menu.
    :return: Retorna o índice da opção escolhida.
    """
    cabeçalho('MENU PRINCIPAL')
    c = 1
    for item in lista:
        print(f'\033[33m{c}\033[m - \033[34m{item}\033[m')
        c += 1
    print(linha())
    opção = leiaInt('\033[32mSua Opção: \033[m')
    return opção
