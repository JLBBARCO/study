from random import randint
from time import sleep
itens = ('Pedra', 'Papel', 'Tesoura')
pc = randint(0, 2)
print('''Suas opções:
    [ 0 ] PEDRA
    [ 1 ] PAPEL
    [ 2 ] TESOURA''')
user = int(input('Qual é a sua jogada? '))
print("JO")
sleep(1)
print('KEN')
sleep(1)
print('PO!!!')
sleep(.5)
print('-=' * 11)
print('Computador jogou {}'.format(itens[pc]))
print('Jogador jogou {}'.format(itens[user]))
print('-=' * 11)
if pc == 0: #computador jogou PEDRA
    if user == 0:
        print('EMPATE')
    elif user == 1:
        print('JOGADOR VENCE')
    elif user == 2:
        print('COMPUTADOR VENCE')
    else:
        print('JOGADA INVÁLIDA!')
elif pc == 1: #computador jogou PAPEL
    if user == 0:
        print('COMPUTADOR VENCE')
    elif user == 1:
        print('EMPATE')
    elif user == 2:
        print('JOGADOR VENCE')
    else:
        print('JOGADA INVÁLIDA!')
elif pc == 2: #computador jogou TESOURA
    if user == 0:
        print('JOGADOR VENCE')
    elif user == 1:
        print('COMPUTADOR VENCE')
    elif user == 2:
        print('EMPATE')
    else:
        print('JOGADA INVÁLIDA!')
