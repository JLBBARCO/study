distancia = float(input('Digite a distância da viagem em km: '))
if distancia <= 200:
    valor1 = distancia * .5
    print('Sua passagem terá o valor de R${:.2f}'.format(valor1))
else:
    valor2 = distancia * .45
    print('Sua passagem terá o valor de R${:.2f}'.format(valor2))
