from lib.interface import menu
from time import sleep

itensMenu = ['Sair', 'Adicionar Livro', 'Emprestar Livro', 'Devolver Livro', 'Listar Livros']
menu(opções=itensMenu, textoCabeçalho='Library System')

while True:
    resposta = int(input('Escolha uma opção: '))
    if resposta == 0:
        from lib.interface import cabecalho
        sleep(.5)
        cabecalho()
        print('{:^60}'.format('Volte sempre!'))
        cabecalho()
        sleep(.5)
        break

    elif resposta == 1:
        from lib.livro import adicionarLivro
        adicionarLivro()

    elif resposta == 2:
        from lib.livro import emprestarLivro
        emprestarLivro()

    elif resposta == 3:
        from lib.livro import devolverLivro
        devolverLivro()

    elif resposta == 4:
        from lib.livro import listarLivros
        listarLivros()

    else:
        print(f'ERRO! Digite uma opção válida.')
