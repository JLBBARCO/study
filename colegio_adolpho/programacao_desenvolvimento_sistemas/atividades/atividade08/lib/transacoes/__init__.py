from datetime import datetime
import json

def salvar_dados(arquivo, dados):
    with open(arquivo, 'w') as f:
        json.dump(dados, f, indent=4)

def adicionar_produto(estoque, histórico_movimentações, nome, categoria, quantidade, preço):
    # Adiciona um novo produto ao estoque com:
    # - ID (Deve ser criado pelo programa, não deve ser informado pelo usuário)
    # - Nome
    # - Categoria
    # - Quantidade (deve ser > 0)
    # - Preço (deve ser > 0)
    
    # Também deve registrar no histórico:
    # - Tipo: "ENTRADA"
    # - Data/hora atual (Uma dica seria usar a o timestamp)

    if quantidade <= 0:
        raise ValueError("A quantidade deve ser maior que zero.")
    if preço <= 0:
        raise ValueError("O preço deve ser maior que zero.")
    
    # Gerar ID único para o produto
    novo_id = 1
    if estoque:
        novo_id = max(produto["id"] for produto in estoque) + 1
    
    # Criar o produto
    produto = {
        "id": novo_id,
        "nome": nome,
        "categoria": categoria,
        "quantidade": quantidade,
        "preço": preço
    }
    
    # Adicionar ao estoque
    estoque.append(produto)
    
    # Registrar no histórico
    movimentação = {
        "tipo": "ENTRADA",
        "data_hora": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "produto_id": novo_id,
        "quantidade": quantidade
    }
    histórico_movimentações.append(movimentação)
    
    print(f"Produto {nome} adicionado com sucesso!")

def registrar_venda(estoque, histórico_movimentações, produto_id, quantidade):
    # Registra a saída de um produto:
    # 1. Pede ID do produto e quantidade
    # 2. Valida se existe no estoque
    # 3. Verifica se há quantidade suficiente
    # 4. Atualiza o estoque
    # 5. Registra no histórico como "SAÍDA"

    if quantidade <= 0:
        raise ValueError("A quantidade deve ser maior que zero.")
    
    # Procurar o produto no estoque
    produto = next((item for item in estoque if item["id"] == produto_id), None)
    if not produto:
        raise ValueError("Produto não encontrado no estoque.")
    
    # Verificar se há quantidade suficiente
    if produto["quantidade"] < quantidade:
        raise ValueError("Quantidade insuficiente no estoque.")
    
    # Atualizar o estoque
    produto["quantidade"] -= quantidade
    
    # Registrar no histórico
    movimentação = {
        "tipo": "SAÍDA",
        "data_hora": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "produto_id": produto_id,
        "quantidade": quantidade
    }
    histórico_movimentações.append(movimentação)
    
    print(f"Saída registrada com sucesso para o produto ID {produto_id}.")

def listar_produtos(estoque):
    # Mostra todos os produtos, cada um com todos os seus atributos.

    if not estoque:
        print("Nenhum produto no estoque.")
        return
    
    print("Produtos no estoque:")
    for produto in estoque:
        print(f"ID: {produto['id']}, Nome: {produto['nome']}, Categoria: {produto['categoria']}, "
              f"Quantidade: {produto['quantidade']}, Preço: R${produto['preço']:.2f}")

def buscar_produto(estoque, id=None, nome_parcial=None, categoria=None):
    # Permite buscar por:
    # 1. ID
    # 2. Nome (parcial)
    # 3. Categoria
    
    # Retorna lista de produtos encontrados ou lista vazia

    resultados = estoque
    if id is not None:
        resultados = [produto for produto in resultados if produto["id"] == id]
    if nome_parcial:
        resultados = [produto for produto in resultados if nome_parcial.lower() in produto["nome"].lower()]
    if categoria:
        resultados = [produto for produto in resultados if produto["categoria"].lower() == categoria.lower()]
    return resultados

def gerar_relatorio(estoque, histórico_movimentações):
    # Exibe um submenu com:
    # 1. Produtos com estoque baixo
    # 2. Total de itens em estoque
    # 3. Valor total do estoque (quantidade * preço)
    # 4. Histórico de movimentações

    while True:
        print("\nRELATÓRIO:")
        print("1. Produtos com estoque baixo")
        print("2. Total de itens em estoque")
        print("3. Valor total do estoque")
        print("4. Histórico de movimentações")
        print("5. Sair")
        
        escolha = input("Escolha uma opção: ")
        
        if escolha == "1":
            limite_baixo = 5
            produtos_baixo_estoque = [produto for produto in estoque if produto["quantidade"] < limite_baixo]
            if produtos_baixo_estoque:
                print("Produtos com estoque baixo:")
                for produto in produtos_baixo_estoque:
                    print(f"ID: {produto['id']}, Nome: {produto['nome']}, Quantidade: {produto['quantidade']}")
            else:
                print("Nenhum produto com estoque baixo.")
        
        elif escolha == "2":
            total_itens = sum(produto["quantidade"] for produto in estoque)
            print(f"Total de itens em estoque: {total_itens}")
        
        elif escolha == "3":
            valor_total = sum(produto["quantidade"] * produto["preço"] for produto in estoque)
            print(f"Valor total do estoque: R${valor_total:.2f}")
        
        elif escolha == "4":
            if histórico_movimentações:
                print("Histórico de movimentações:")
                for movimentação in histórico_movimentações:
                    print(f"Tipo: {movimentação['tipo']}, Data/Hora: {movimentação['data_hora']}, "
                          f"Produto ID: {movimentação['produto_id']}, Quantidade: {movimentação['quantidade']}")
            else:
                print("Nenhuma movimentação registrada.")
        
        elif escolha == "5":
            print("Saindo do relatório.")
            break
        
        else:
            print("Opção inválida. Tente novamente.")

def carregar_dados(arquivo):
    try:
        with open(arquivo, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []