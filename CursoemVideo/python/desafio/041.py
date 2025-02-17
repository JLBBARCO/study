from datetime import date
ano = date.today().year
nasc = int(input('Ano de nascimento? '))
idade = ano - nasc
print('O atleta tem {} anos'.format(idade))
if idade < 9:
    print('Classificação: MIRIM')
elif idade < 15:
    print('Classificação: INFANTIL')
elif idade < 20:
    print('Classificação: JÚNIOR')
elif idade < 21:
    print('Classificação: SÊNIOR')
else:
    print('Classificação: MASTER')
