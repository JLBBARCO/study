from random import randint
from time import sleep
print('-=-'*20)
print('Vou pensar em um número entre 0 e 5. Tente adivinhar...')
print('-=-'*20)
pc = randint(0, 5)
user = int(input('Em que número eu pensei? '))
print('PROCESSANDO...')
sleep(3)
if user == pc:
    print('PARABÉNS! Você conseguiu me vencer!')
else:
    print('GANHEI! Eu pensei no número {} e não no {}!'.format(pc, user))
