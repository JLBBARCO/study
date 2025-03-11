print('-'*50)
print('{:^50}'.format('LOJA SUPER BARATÃO'))
print('-'*50)
total = c_produto = 0
produto_barato = produto = preço = continuar = ' '
preço_barato = preço
while True:
    produto = input('Nome do produto: ').strip()
    preço = float(input('Preço: R$'))
    continuar = input('Quer continuar? [S/N] ').strip().upper()[0]
    total += preço
    if preço >= 1000:
        c_produto += 1
    if preço < preço_barato:
        produto_barato = produto
        preço_barato = preço
    if continuar == 'N':
        break
print('{:-^50}'.format(' FIM DO PROGRAMA '))
print(f'O total da compra foi R${total:.2f}')
print(f'Temos {c_produto} produtos custando mais de R$1000.00')
print(f'O produto mais barato foi {produto_barato} que custa R${preço_barato:.2f}')
