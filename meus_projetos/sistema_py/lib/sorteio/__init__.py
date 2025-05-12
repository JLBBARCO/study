# Importações
import random
from time import sleep
from .. import interface

# Função Principal
def sorteio():
    """
    -> Mostra as opções de sorteio, pede ao usuário escolher alguma, e executa a função referente a escolha do usuário.
    """
    try:
        while True:
            opções = [
                'Voltar',
                'Sorteio de Números',
                'Gerador de Senhas Alphanuméricas',
                'Gerador de Senhas Alphanuméricas com Caracteres Especiais',
                'Gerador de Nomes'
            ]
            interface.menu(opções, 'Sorteio')
            resposta = int(input('Escolha: '))
            if resposta == 0:
                interface.cabeçalho('VOLTANDO AO MENU PRINCIPAL...')
                break

            elif resposta == 1:
                sorteio_números()

            elif resposta == 2:
                gerador_senha_alphanumérica()

            elif resposta == 3:
                gerador_senha_alphanumérica_caracteres()

            elif resposta == 4:
                gerador_nomes()
                
            else:
                print('\033[0;31mERRO! Digite uma opção válida.\033[m')
        return
    except resposta is float or str:
        print('\033[31mERRO! Digite um número inteiro válido.\033[m')

    except KeyboardInterrupt:
        return

def sorteio_números():
    """
    -> Pede ao usuário a quantidade de números a serem sorteados, o mínimo e o máximo. Enquanto o usuário digita, o programa valida, sendo os critérios: todos os parâmetros tem que ser números inteiros, a quantidade não pode ser menor que 1, o mínimo não pode ser menor que 0, e o máximo não pode ser menor ou igual ao número mínimo. Ao sortear, verifica se o número sorteado já saiu. Se sim, sorteia outro.
    """
    while True:
        numero = int(input('Quantos números você quer sortear? '))
        if numero < 1:
            print('\033[31mERRO! Digite um valor maior que zero.\033[m')
        else:
            break
    while True:
        min = int(input('Qual o menor número? '))
        if min < 0:
            print('\033[31mERRO! Digite um número inteiro maior que zero!\033[m')
        else:
            break
    while True:
        max = int(input('Qual o maior número? '))
        if max <= min:
            print('\033[31mERRO! Digite um número inteiro maior que o mínimo.')
        else:
            break
    sorteio = list()
    for c in range(numero):
        valor = random.randint(min, max)
        if valor not in sorteio:
            sorteio.append(valor)
        else:
            return valor
    print('Os números sorteados foram:', end=' ')
    interface.resultado(sorteio, fim=' ', linhas=False)
    sleep(2)

def gerador_senha_alphanumérica():
    """
    -> Pede ao usuário a quantidade de caracteres a serem sorteados. O programa sorteia números inteiros e adiciona a uma lista os caracteres referentes ao número sorteado em uma lista de caracteres alphanuméricos pré-definidos.
    """
    max_chars = int(input('Digite a quantidade de caracteres: '))
    password = []
    caracteres = (
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g',
        'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n',
        'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u',
        'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z'
    )
    for _ in range(max_chars):
        sorteado = random.randint(0, len(caracteres) - 1)
        password.append(caracteres[sorteado])
    for c in password:
        interface.resultado(valor=c)
    print()

def gerador_senha_alphanumérica_caracteres():
    """
    -> Pede ao usuário a quantidade de caracteres a serem sorteados. O programa sorteia números inteiros e coloca em uma lista os caracteres referentes pré-declarados em uma lista.
    """
    max_chars = int(input('Digite a quantidade de caracteres: '))
    password = []
    caracteres = (
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g',
        'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n',
        'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u',
        'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z',
        '?', '!', '@', '#', '$', '%', '/', '+', '-', '_', '=', '*', '&', '<',
        '>', '(', ')', '[', ']', '{', '}', 'Ç', 'ç'
    )
    for _ in range(max_chars):
        sorteado = random.randint(0, len(caracteres) - 1)
        password.append(caracteres[sorteado])
    for c in password:
        interface.resultado(valor=c, linhas=False)
    print()

def gerador_nomes():
    """
    -> Pede ao usuário a quantidade de nomes a serem gerados, e gera uma lista com esses nomes.
    """
    quantidade = int(input('Digite a quantidade de nomes: '))
    nomes = list()
    from faker import Faker
    fake = Faker()
    for _ in range(quantidade):
        nome = fake.name()
        nomes.append(nome)
    interface.resultado(nomes, fim='; ')
