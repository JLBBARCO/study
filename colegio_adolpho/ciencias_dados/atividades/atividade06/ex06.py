'''
Distribuição de Frequência
Realizado por José Luiz B Barco
'''

import pandas as pd
import matplotlib.pyplot as plt

dados = pd.read_csv('Alturas.tsv', sep='\t')
print(dados)
dados['ALTURA'] = dados['ALTURA'].str.replace(',', '.').astype(float)
dados['ALTURA_CM'] = dados['ALTURA'] * 100

media_altura = dados['ALTURA'].mean()
print(f'{' Média ':-^40}')
print(f'Média de altura: {media_altura:.2f}m')

min_cm = int(dados['ALTURA_CM'].min() // 10 * 10)
max_cm = int(dados['ALTURA_CM'].max() // 10 * 10) + 11
bins = list(range(min_cm, max_cm, 10))

labels = [f'{bins[i]} | {bins[i + 1] - 1}cm' for i in range(len(bins) - 1)]
categorias = pd.cut(dados['ALTURA_CM'], bins=bins, right=False, labels=labels)

tabela_frequência = (categorias.value_counts().sort_index().reset_index().rename(columns={'ALTURA_CM': 'Intervalos', 'count': 'Frequência'}))
tabela_frequência['Porcentagem'] = (tabela_frequência['Frequência'] / len(dados)) * 100
tabela_frequência['Porcentagem'] = tabela_frequência['Porcentagem'].round(1).astype(str) + '%'
tabela_frequência = tabela_frequência[tabela_frequência['Frequência'] > 0]
print(f'{' ALTURA TOTAL ':-^40}')
print(tabela_frequência)

categorias = pd.cut(dados['ALTURA_CM'], bins=bins, right=False, labels=labels)

# Exibir a tabela de frequência
print(f"{' ALTURA TOTAL ':^40}")
print(tabela_frequência)

# Criar o gráfico de barras
plt.bar(tabela_frequência['Intervalos'], tabela_frequência['Frequência'])
plt.title('Distribuição de Frequência')
plt.xlabel('Intervalos')
plt.ylabel('Frequência')
plt.show()
