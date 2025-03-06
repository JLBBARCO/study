print('-'*30)
print('{:^30}'.format('CADASTRE UMA PESSOA'))
print('-'*30)
continuar = 'S'
h_cont = maior_cont = m_cont = 0
while continuar == 'S':
    idade = int(input('Idade: '))
    sexo = input('Sexo: [M/F]').strip().upper()[0]
    while sexo != 'Mm' or sexo != "Ff":
        sexo = input('Sexo: [M/F]').strip().upper()[0]
        if sexo == "M" or sexo == 'F':
            break
    if idade >= 18:
        maior_cont += 1
    if sexo == 'M':
        h_cont += 1
    if sexo == 'F' and idade < 20:
        m_cont += 1
    print('-'*30)
    continuar = input('Quer continuar? [S/N] ').strip().upper()
    print('-'*30)
print('{:=^30}'.format(' FIM DO PROGRAMA '))
print(f'Total de pessoas com mais de 18 anos: {maior_cont}')
print(f'Ao todo temos {h_cont} homens cadastrados')
print(f'E temos {m_cont} mulheres com menos de 20 anos')
