time = list()
jogador = dict()
partidas = list()

while True:
    jogador.clear()
    jogador['Nome'] = str(input('Nome do Jogador: '))
    total_partidas = int(input(f'Quantas partidas {jogador["Nome"]} jogou? '))

    partidas.clear()

    for c in range(total_partidas):
        partidas.append(int(input(f'    Quantos gols na partida {c + 1}? ')))

    jogador['Gols'] = partidas[:]
    jogador['Total'] = sum(partidas)

    time.append(jogador.copy())

    while True:
        resposta = str(input('Deseja continuar? [S/N] ')).strip().upper()[0]

        if resposta in 'SN':
            break
        print('ERRO! Responda apenas S ou N.')

    if resposta == 'N':
        break

print(f'{"ID":>4} ', end='')
for i in jogador.keys():
    print(f'{i:<15}', end='')
print()

print('='*60)

for k, v in enumerate(time):
    print(f'{k:>4} ', end='')
    for d in v.values():
        print(f'{str(d):<15}', end='')
    print()

print('-'*60)

while True:
    busca = int(input('Mostrar dados de qual jogador? (999 para parar) '))

    if busca == 999:
        break

    if busca >= len(time):
        print(f'ERRO! Não existe jogador com o ID {busca}!')

    else:
        print(f'Levantamento do jogador {time[busca]["Nome"]}:')

        for i, g in enumerate(time[busca]['Gols']):
            print(f'    No jogo {i + 1} fez {g} gols.')

    print('-'*60)

print('<'*20, f' VOLTE SEMPRE!', '>'*20)
