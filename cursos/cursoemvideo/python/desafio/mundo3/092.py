from datetime import datetime
dados = dict()
dados['Nome'] = str(input('Nome: '))
nasc = str(input('Ano de Nascimento: '))
dados['Idade'] = datetime.now().year - int(nasc)
dados['CTPS'] = int(input('Carteira de Trabalho (0 não tem): '))
if dados['CTPS'] != 0:
    dados['Contratação'] = str(input('Ano de Contratação: '))
    dados['Salário'] = float(input('Salário: R$ '))
    dados['Aposentadoria'] = (int(dados['Contratação']) + 35) - datetime.now().year + dados['Idade']
print('-' * 60)
for k, v in dados.items():
    print(f' - {k} tem o valor {v}')
print('-' * 60)
