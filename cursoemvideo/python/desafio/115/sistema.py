from lib.interface import *
from lib.arquivo import *
from time import sleep

arquivo = 'pessoas.txt'
if not arquivoExiste(arquivo):
    criarArquivo(arquivo)

while True:
    resposta = menu(['Ver Pessoas Cadastradas', 'Cadastrar Nova Pessoa', 'Sair'])
    if resposta == 1:
        # Opção de listar o conteúdo de um arquivo!
        lerArquivo(arquivo)
    elif resposta == 2:
        cabeçalho('Cadastrando nova pessoa...')
    elif resposta == 3:
        cabeçalho('Saindo do sistema... Até logo!')
        break
    else:
        print('\033[0;31mERRO! Digite uma opção válida.\033[m')
    sleep(2)
