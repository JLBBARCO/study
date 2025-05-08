import matplotlib.pyplot as plt
import pandas as pd

# Gráfico de Linha
x = [1 ,2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y, label='Linear', color='#00f', marker='o', linestyle='-')
plt.title('Gráfico de Linha')
plt.xlabel('Eixo X')
plt.ylabel('Eixo Y')
plt.legend()
plt.grid(True)
plt.show()

# Gráfico de Barra
categorias = ['A', 'B', 'C', 'D']
valores = [15, 30, 45, 10]

plt.bar(categorias, valores, color='#0f0')
plt.title('Gráfico de Barras')
plt.xlabel('Categorias')
plt.ylabel('Valores')
plt.show()

# Gráfico de Dispersão
a = [5, 7, 8, 7, 2, 9]
b = [99, 86, 87, 88, 100, 85]

plt.scatter(a, b, color='#f00', marker='o')
plt.title('Gráfico de Dispersão')
plt.xlabel('Eixo A')
plt.ylabel('Eixo B')
plt.show()
