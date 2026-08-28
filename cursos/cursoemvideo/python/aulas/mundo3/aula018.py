# teste = list()
# teste.append('Gustavo')
# teste.append(40)
# galera = list()
# galera.append(teste[:])
# teste[0] = 'Maria'
# teste[1] = 22
# galera.append(teste[:])
# print(galera)

# galera = [['João', 19], ['Ana', 33], ['Joaquim', 13], ['Maria', 45]]
# # print(galera[2][1])  # João
# for p in galera:
#     print(f'{p[0]} tem {p[1]} anos de idade.')

galera = list()
dado = list()
total_maior_idade = total_menor_idade = 0
for c in range(3):
    dado.append(input('Nome: '))
    dado.append(int(input('Idade: ')))
    galera.append(dado[:])
    dado.clear()
for p in galera:
    if p[1] >= 21:
        print(f'{p[0]} é maior de idade.')
        total_maior_idade += 1
    else:
        print(f'{p[0]} é menor de idade.')
        total_menor_idade += 1
print(f'Temos {total_maior_idade} maiores de idade e {total_menor_idade} menores de idade.')
