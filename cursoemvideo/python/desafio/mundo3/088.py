from random import randint
from time import sleep

lista = list()
jogos = list()

print('=' * 30)
print('{:^30}'.format('JOGA NA MEGA SENA'))
print('=' * 30)

jogadas = int(input('Quantas jogadas você quer fazer? '))

total_jogadas = 0
while (total_jogadas) < jogadas:
    cont = 0
    while True:
        number = randint(1, 60)
        if number not in lista:
            lista.append(number)
            cont += 1
        if cont >= 6:
            break
        
    lista.sort()
    jogos.append(lista[:])
    lista.clear()

    total_jogadas += 1

for i, l in enumerate(jogos):
    print(f'Jogo {i+1}: {l}')
    sleep(1)

print('-='*5, f'< BOA SORTE! >', '=-'*5)