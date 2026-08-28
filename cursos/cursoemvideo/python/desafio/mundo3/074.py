from random import randint
n = tuple(randint(1, 10) for c in range(5))
print(f'Os valores sorteados foram: ', end='')
for number in n:
    print(f'{number}', end=' ')
organizado = sorted(n)
print(f'\nO maior valor sorteado foi {organizado[-1]}')
print(f'O menor valor sorteado foi {organizado[0]}')
