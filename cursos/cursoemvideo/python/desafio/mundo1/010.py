real = float(input('Quanto de dinheiro você tem na carteira? R$'))
dólar = real / 3.27
print('Com R${:.2f} você pode comprar US${:.2f}'.format(real, dólar))
