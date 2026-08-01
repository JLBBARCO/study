import matplotlib.pyplot as plt
import pandas as pd

meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
vendas = [120,150,130,170,200,240,260,250,230,210,190,220]

# Gráfico de Linha
plt.plot(meses, vendas, label='Vendas Mensais', color='blue', marker='o', linestyle='-')
plt.title('Vendas Mensais')
plt.xlabel('Meses')
plt.ylabel('Vendas')
plt.grid(True)
plt.show()

# Gráfico de Barra
plt.bar(meses, vendas, color='green')
plt.title('Vendas Mensais')
plt.xlabel('Meses')
plt.ylabel('Vendas')
plt.show()

# 1) O gráfico de barras seria o mais adequado, pois ele permite comparar as vendas de cada mês de forma clara e direta, facilitando a visualização das diferenças entre os meses.

# 2) O gráfico permite visualizar com mais clareza, o que ajudou a identificar que os clientes têm a preferência de comprar mais no início do ano, com um pico em junho, e uma queda nas vendas nos últimos meses do ano. Isso pode indicar sazonalidade nas compras.
