from random import randint
pc = randint(0,10)
print('Sou seu computador... Acabei de pensar em um número entre 0 e 10.')
print('Será que você consegue adivinhar qual foi? ')
acertou = False
palpites = 0
while not acertou: 
    user = int(input('Qual é seu palpite? '))
    palpites += 1
    if user == pc:
        acertou = True
    else:
        if user < pc:
            print('Mais... Tente mais uma vez.')
        elif user > pc:
            print('Menos... Tente mais uma vez.')
print('Acertou com {} tentativas. Parabéns!'.format(palpites))
