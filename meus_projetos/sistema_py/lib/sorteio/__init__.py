# Importações
import random
from time import sleep
from .. import interface

def sorteio():
    while True:
        opções = [
            'Voltar',
            'Sorteio de Números',
            'Sorteio de Nomes',
            'Gerador de Senhas Alphanuméricas',
            'Gerador de Senhas Alphanuméricas com Caracteres Especiais'
        ]
        interface.menu(opções, 'OPÇÕES DE SORTEIO')
        resposta = int(input('Escolha: '))
        if resposta == 0:
            interface.cabeçalho('VOLTANDO AO MENU PRINCIPAL...')
            break
        elif resposta == 1:
            sorteio_números()

        elif resposta == 2:
            continue
        elif resposta == 3:
            continue
        elif resposta == 4:
            continue
        else:
            print('\033[0;31mERRO! Digite uma opção válida.\033[m')
    return

def sorteio_números():
    numero = int(input('Quantos números você quer sortear? '))
    min = int(input('Qual o menor número? '))
    max = int(input('Qual o maior número? '))
    if numero < 1:
        print('\033[0;31mERRO! Digite um número maior que 0.\033[m')
    else:
        sorteio = []
        for c in range(1, numero):
            sorteio.append(random.randint(min, max))
        print('Os números sorteados foram: ', end='')
        for i in sorteio:
            print(f'{i} ', end='')
        print()
        sleep(2)

def sorteio_nomes():
    pass

def gerador_senha_alphanumérica():
    pass

def gerador_senha_alphanumérica_caracteres():
    pass
