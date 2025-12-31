distancia = float(input('Qual é a distância da sua viagem? '))
print('Você está prestes a começar uma viagem de {:.1f}km.'.format(distancia))
preço = distancia * .5 if distancia <= 200 else distancia * .45
print('E o preço da sua passagem será de R${:.2f}'.format(preço))
