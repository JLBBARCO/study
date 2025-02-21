n = int(input('Digite um número para ser a base da tabuada: '))
for c in range(1, 11):
    print('{:2} x {:2} = {:3}'.format(n, c, n*c))
