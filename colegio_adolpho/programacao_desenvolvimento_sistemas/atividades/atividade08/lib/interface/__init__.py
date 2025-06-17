def linha(tamanho=60):
    print('-' * tamanho)

def cabeçalho(título):
    linha()
    print('{:^60}'.format(título))
    linha()

def menu(opções, título=None):
    if título:
        cabeçalho(título)
    else:
        linha()
    for c, i in opções:
        print(f'{c} - {i}')