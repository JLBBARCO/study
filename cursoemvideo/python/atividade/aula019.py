# Exemplo 1
# pessoas = {'nome': 'Gustavo', 'sexo': 'M', 'idade': 22}

# # # print(pessoas['nome']) # Mostra o valor da chave 'nome'
# # print(f'O {pessoas["nome"]} tem {pessoas["idade"]} anos.')
# # print(pessoas.keys()) # Mostra as chaves do dicionário
# # print(pessoas.values()) # Mostra os valores do dicionário
# # print(pessoas.items()) # Mostra os itens do dicionário

# # del pessoas['sexo'] # Deleta a chave 'sexo' do dicionário
# # pessoas['nome'] = 'Leandro' # Altera o valor da chave 'nome'

# pessoas['peso'] = 98.5 # Adiciona a chave 'peso' ao dicionário
# for k, v in pessoas.items():
#     print(f'{k} = {v}') # Mostra as chaves e valores do dicionário

# Exemplo 2

# brasil = list()
# estado1 = {'Uf': 'Rio de Janeiro', 'Sigla': 'RJ'}
# estado2 = {'Uf': 'São Paulo', 'Sigla': 'SP'}
# brasil.append(estado1) # Adiciona o dicionário estado1 à lista brasil
# brasil.append(estado2) # Adiciona o dicionário estado2 à lista brasil

# print(brasil) # Mostra a lista brasil
# print(brasil[0]) # Mostra o primeiro dicionário da lista brasil

# Exemplo 3


estado = dict()
brasil = list()

for c in range(3):
    estado['uf'] = str(input('Unidade Federativa: '))
    estado['sigla'] = str(input('Sigla do Estado: '))
    brasil.append(estado.copy()) # Adiciona uma cópia do dicionário estado à lista brasil

for e in brasil:
    for k, v in e.items():
        print(f'O campo {k} tem valor {v}') # Mostra os campos e valores de cada dicionário da lista brasil
