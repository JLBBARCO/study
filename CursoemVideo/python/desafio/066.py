n = cont = user = 0
while True:
    user = int(input('Digite um valor (999 para parar): '))
    if user == 999:
        break
    cont += 1
    n += user
print(f'A soma dos {cont} valores foi {n}')
