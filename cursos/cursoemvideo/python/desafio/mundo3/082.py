num = list()
pares = list()
ímpares = list()
while True:
    num.append(int(input('Digite um número: ')))
    resp = str(input('Quer continuar? [S/N] ')).strip().upper()[0]
    if resp in 'N':
        break
    elif resp in 'S':
        for i, v in enumerate(num):
            if v % 2 == 0:
                pares.append(v)
            else:
                ímpares.append(v)
    else:
        print('Opção inválida! Tente novamente.')
print('-='*30)
print(f'A lista completa é {num}')
print(f'A lista de pares é {pares}')
print(f'A lista de ímpares é {ímpares}')