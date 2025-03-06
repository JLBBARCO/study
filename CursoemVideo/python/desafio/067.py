user = 0
while True:
    print('-'*30)
    user = int(input('Quer ver a tabuada de qual valor? '))
    print('-'*30)
    if user < 0:
        break
    for c in range(1, 11):
        print(f'{user} x {c} = {user*c}')
print('PROGRAMA TABUADA ENCERRADO. Volte sempre!')
