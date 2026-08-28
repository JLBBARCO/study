s_idade = 0
m_idade = 0
maioridadeh = 0
nomevelho = ''
totmulher20 = 0
for p in range(1, 5):
    print('----- {}ª PESSOA -----'.format(p))
    nome = str(input('Nome: ')).strip()
    idade = int(input('Idade: '))
    sexo = str(input('Sexo [M/F]: ')).strip()
    s_idade += idade
    if p == 1 and sexo in 'Mm':
        maioridadeh = idade
        nomevelho = nome
    if sexo in 'Mm' and idade > maioridadeh:
        maioridadeh = idade
        nomevelho = nome
    if sexo in 'Ff' and idade < 20:
        totmulher20 += 1
m_idade = s_idade / 4
print('A média de idade do grupo é de {} anos'.format(m_idade))
print('O homem mais velho tem {} anos e se chama {}.'.format(maioridadeh, nomevelho))
print('Ao todo são {} mulheres com menos de 20 anos'.format(totmulher20))
