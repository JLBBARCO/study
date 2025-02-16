speed = float(input('Qual é a velocidade atual do carro? '))
if speed > 80:
    print('MULTADO! Você excedeu o limite permitido que é de 80km/h \nVocê deve pagar uma multa de R${:.2f}'.format((speed - 80) * 7))
print('Tenha um bom dia! Dirija com segurança!')
