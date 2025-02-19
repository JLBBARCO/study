n1 = int(input('Digite um número para ser a base da tabuada: '))
n2 = int(input('Digite um número para iniciar a tabuada: '))
n3 = int(input('Digite um número para terminar a tabuada: '))
print('-=' * 7)
print('TABUADA do {}'.format(n1))
print('-=' * 7)
for c in range(n2, n3 + 1):
    tabuada = n1 * c
    print('{} x {} = {}'.format(n1, c, tabuada))
