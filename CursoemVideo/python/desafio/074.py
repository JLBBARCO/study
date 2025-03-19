from random import randint
n = tuple(randint(1, 10) for c in range(5))
print(f'Os valores sorteados foram: {n}')
organizado = sorted(n)
print(f'O maior valor sorteado foi {organizado[-1]}')
print(f'O menor valor sorteado foi {organizado[0]}')
