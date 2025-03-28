salario = float(input('Digite seu salário: R$'))
aumento = salario+(salario*10/100) if salario > 1250 else salario+(salario*15/100)
print('Seu novo salário será de R${:.2f}'.format(aumento))
salario = float(input('Qual é o seu salário? R$'))
if salario > 1250:
    novo = salario+(salario*10/100)
    print('Quem ganhava R${:.2f} passa a ganhar R${:.2f}'.format(salario, novo))
else:
    novo = salario+(salario*15/100)
    print('Quem ganhava R${:.2f} passa a ganhar R${:.2f}'.format(salario, novo))
