salario = float(input('Digite seu salário: R$'))
aumento = salario+(salario*10/100) if salario > 1250 else salario+(salario*15/100)
print('Seu novo salário será de R${:.2f}'.format(aumento))
