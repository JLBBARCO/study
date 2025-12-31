jogador = dict()
partidas = list()

jogador['Nome'] = str(input('Nome do Jogador: '))
total_partidas = int(input(f'Quantas partidas {jogador["Nome"]} jogou? '))

for c in range(total_partidas):
    partidas.append(int(input(f'    Quantos gols na partida {c + 1}? ')))

jogador['Gols'] = partidas[:]
jogador['Total'] = sum(partidas)

print('-'*60)
print(jogador)
print('-'*60)

for k, v in jogador.items():
    print(f'O campo {k} tem o valor {v}.')


print('-'*60)
print(f'O jogador {jogador["Nome"]} jogou {len(jogador["Gols"])} partidas.')

for i, v in enumerate(jogador['Gols']):
    print(f'    => Na partida {i + 1}, fez {v} gols.')
print(f'Foi um total de {jogador["Total"]} gols.')
print('-'*60)
print(f'{' ENCERRADO ':=^60}')
print('-'*60)
