temp = list()
principal = list()
maior = menor = 0
while True:
    temp.append(str(input('Nome: ')))
    temp.append(float(input('Peso: ')))
    if len(principal) == 0:
        maior = menor = temp[1]
    else:
        if temp[1] > maior:
            maior = temp[1]
        if temp[1] < menor:
            menor = temp[1]
    principal.append(temp[:])
    temp.clear()
    resp = str(input('Quer continuar? [S/N] ')).strip().upper()[0]
    if resp == 'N':
        break
print('-=' * 30)
print(f'Ao todo, você cadastrou {len(principal)} pessoas.')
print(f'O maior peso foi de {maior}kg. Peso de ', end='')
for p in principal:
    if p[1] == maior:
        print(f'[{p[0]}] ', end='')
print()
print(f'O menor peso foi de {menor}kg. Peso de ', end='')
for p in principal:
    if p[1] == menor:
        print(f'[{p[0]}] ', end='')
print()
