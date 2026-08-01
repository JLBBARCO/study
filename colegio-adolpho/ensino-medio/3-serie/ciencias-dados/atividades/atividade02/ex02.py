import pandas as pd
dados = pd.read_csv('exemplo.csv')
print(dados)
dados.to_csv('novoExemplo.csv')
