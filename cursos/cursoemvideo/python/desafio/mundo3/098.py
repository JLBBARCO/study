from time import sleep

linha = '-'*40

def contador(i,f,p):
    if p < 0:
        p *= -1

    if p == 0:
        p = 1

    print(linha)
    print(f'Contagem de {i} até {f} de {p} em {p}')
    sleep(2.5)

    if i < f:
        contador = i

        while contador <= f:
            print(f'{contador}', end=' => ', flush=True)
            sleep(.5)
            contador += p

    else:
        contador = i

        while contador >= f:
            print(f'{contador}', end=' => ', flush=True)
            sleep(.5)
            contador -= p

    print('FIM')

# Programa Principal
contador(1,10,1)
contador(10,0,2)

print(linha)

print('Agora é sua vez de personalizar a contagem!')
inicio = int(input('Início: '))
fim = int(input('Fim: '))
passo = int(input('Passo: '))
contador(inicio, fim, passo)
