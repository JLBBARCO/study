'''
Programa simples feito em PDS, para controle de estoque
Desenvolvido por José Luiz B Barco
'''

import os
from lib.interface import menu

# Determinar o diretório do arquivo atual
DIRETORIO_ATUAL = os.path.dirname(os.path.abspath(__file__))

# Caminhos dos arquivos no mesmo diretório do arquivo ex08.py
ESTOQUE_ARQUIVO = os.path.join(DIRETORIO_ATUAL, 'estoque.txt')
HISTORICO_ARQUIVO = os.path.join(DIRETORIO_ATUAL, 'historico_movimentacoes.txt')

ESTOQUE_MÍNIMO = 5

while True:
    opções = [
        (0, 'Sair'),
        (1, 'Adicionar Produto'),
        (2, 'Registrar Venda'),
        (3, 'Listar Produtos'),
        (4, 'Buscar Produto'),
        (5, 'Gerar Relatório')
    ]
    menu(título='MENU PRINCIPAL', opções=opções)
    opção = input("Escolha uma opção: ")
    
    if opção == '0':
        print("Saindo do sistema...")
        break
    elif opção == "1":
        from lib.transacoes import adicionar_produto, carregar_dados, salvar_dados
        estoque = carregar_dados(ESTOQUE_ARQUIVO)
        histórico_movimentações = carregar_dados(HISTORICO_ARQUIVO)
        nome = input('Digite o nome do produto: ')
        categoria = input('Categoria: ')
        preço = float(input('R$ '))
        quantidade = int(input('Quantidade: '))
        adicionar_produto(
            estoque=estoque,
            nome=nome,
            preço=preço,
            histórico_movimentações=histórico_movimentações,
            quantidade=quantidade,
            categoria=categoria
        )
        salvar_dados(ESTOQUE_ARQUIVO, estoque)
        salvar_dados(HISTORICO_ARQUIVO, histórico_movimentações)
    elif opção == "2":
        from lib.transacoes import registrar_venda, carregar_dados, salvar_dados
        estoque = carregar_dados(ESTOQUE_ARQUIVO)
        histórico_movimentações = carregar_dados(HISTORICO_ARQUIVO)
        produto_id = int(input('ID do produto: '))
        quantidade = int(input('Quantidade: '))
        registrar_venda(
            estoque=estoque,
            histórico_movimentações=histórico_movimentações,
            produto_id=produto_id,
            quantidade=quantidade
        )
        salvar_dados(ESTOQUE_ARQUIVO, estoque)
        salvar_dados(HISTORICO_ARQUIVO, histórico_movimentações)
    elif opção == "3":
        from lib.transacoes import listar_produtos, carregar_dados
        estoque = carregar_dados(ESTOQUE_ARQUIVO)
        listar_produtos(estoque)
    elif opção == "4":
        from lib.transacoes import buscar_produto, carregar_dados
        estoque = carregar_dados(ESTOQUE_ARQUIVO)
        id = input('ID do produto (ou pressione Enter para ignorar): ')
        nome_parcial = input('Nome parcial (ou pressione Enter para ignorar): ')
        categoria = input('Categoria (ou pressione Enter para ignorar): ')
        id = int(id) if id else None
        resultados = buscar_produto(estoque, id=id, nome_parcial=nome_parcial, categoria=categoria)
        if resultados:
            print("Produtos encontrados:")
            for produto in resultados:
                print(f"ID: {produto['id']}, Nome: {produto['nome']}, Categoria: {produto['categoria']}, "
                      f"Quantidade: {produto['quantidade']}, Preço: R${produto['preço']:.2f}")
        else:
            print("Nenhum produto encontrado.")
    elif opção == "5":
        from lib.transacoes import gerar_relatorio, carregar_dados
        estoque = carregar_dados(ESTOQUE_ARQUIVO)
        histórico_movimentações = carregar_dados(HISTORICO_ARQUIVO)
        gerar_relatorio(estoque, histórico_movimentações)
    else:
        print("Opção inválida!")
