num = [list(), list()]
valor = 0
for c in range(7):
    valor = int(input(f'Digite o {c+1}º valor: '))
    if valor % 2 == 0:
        num[0].append(valor)
    else:
        num[1].append(valor)
print('-='*30)
print(f'Os valores pares foram: {sorted(num[0])}')
print(f'Os valores ímpares foram: {sorted(num[1])}')
