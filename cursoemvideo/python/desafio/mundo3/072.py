n = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
extenso = ('zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte')
while True:
    user = int(input('Digite um número entre 0 e 20: '))
    continuar = str(input('Quer continuar? [S/N] ')).strip().upper()[0]
    if 0 <= user <= 20:
        if continuar == 'S':
            print(f'Você digitou o número {extenso[user]}')
        elif continuar == 'N':
            print(f'Você digitou o número {extenso[user]}')
            break
    else:
        print('Tente novamente.', end=' ')
        if continuar == 'N':
            break
