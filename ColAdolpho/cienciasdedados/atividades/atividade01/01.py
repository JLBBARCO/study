import pandas as pd
dados = [10, 20, 30, 40, 50]
serie = pd.Series(dados)
matriz = [
    ['Arthur', 25,'Brasília'],
    ['Bruno', 30, 'São Paulo'],
    ['Danilo', 22, 'Belo Horizonte']
]
df = pd.DataFrame(matriz, columns=['Nome', 'Idade', 'Cidade'])
df['Profissão'] = ['Cantor', 'Médico', 'Pintor']
print(df)
filtro = df['Idade'] > 25
print(df[filtro])
