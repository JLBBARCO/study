salario = float(input('Digite seu salário: R$'))
if salario > 1250:
    aumento1 = salario*10/100
    print('O aumento foi de R${:.2f}, e o total vai ser de R${:.2f}'.format(aumento1, salario+aumento1))
else:
    aumento2 = salario*15/100
    print('O aumento foi de R${:.2f}, e o total vai ser de R${:.2f}'.format(aumento2, salario+aumento2))