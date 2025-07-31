'''
Distribuição de frequência
Realizado por José Luiz B Barco
'''

import pandas as pd

dados = pd.read_csv('Alturas.tsv', sep='\t')
print(dados)
dados['ALTURA'] = dados['ALTURA'].str.replace(',', '.').astype(float)
dados['ALTURA_CM'] = dados['ALTURA'] * 100

media_altura = dados['ALTURA'].mean()
print(f'Média de altura: {media_altura:.2f}m')

min_cm = int(dados['ALTURA_CM'].min() // 10 * 10)
max_cm = int(dados['ALTURA_CM'].max() // 10 * 10) + 11
bins = list(range(min_cm, max_cm, 10))

labels = [f'{bins[i]} --| {bins[i + 1] - 1}cm' for i in range(len(bins) - 1)]
categorias = pd.cut(dados['ALTURA_CM'], bins=bins, right=False, labels=labels)

tabela_frequência = (categorias.value_counts()
                     .sort_index()
                     .reset_index()
                     .rename(columns={'ALTURA_CM': 'Intervalos', 'count': 'Frequência'}))
print(tabela_frequência)
