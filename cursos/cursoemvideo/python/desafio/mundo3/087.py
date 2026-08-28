matriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
soma_par = maior_valor = soma_coluna = 0
for l in range(3):
    for c in range(3):
        matriz[l][c] = int(input(f'Digite um valor para [{l}, {c}]: '))
        if matriz[l][c] % 2 == 0:
            soma_par += matriz[l][c]
        if matriz[l][c] > maior_valor:
            maior_valor = matriz[l][c]
print('-=' * 30)
for l in range(3):
    for c in range(3):
        print(f'[{matriz[l][c]:^5}]', end=' ')
    print()
print('-=' * 30)
print(f'A soma dos valores pares é {soma_par}.')
for l in range(3):
    soma_coluna += matriz[l][2]
print(f'A soma dos valores da segunda coluna é {soma_coluna}.')
for c in range(3):
    if c == 0:
        maior_valor = matriz[1][c]
    elif matriz[1][c] == maior_valor:
        maior_valor = matriz[1][c]
print(f'O maior valor da segunda linha é {maior_valor}.')
