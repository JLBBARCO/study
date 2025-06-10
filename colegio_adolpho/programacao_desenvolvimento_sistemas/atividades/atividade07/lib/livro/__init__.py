import os

def adicionarLivro():
    """
    Adiciona livros ao estoque. Se o livro já existir, soma a quantidade adicionada à quantidade existente.
    """
    # Obtém o caminho relativo da pasta onde o arquivo está sendo executado
    pasta_atual = os.path.dirname(__file__)
    caminho_arquivo = os.path.join(pasta_atual, 'livros.txt')
    
    try:
        # Solicita o nome do livro e a quantidade ao usuário
        nome_livro = input("Digite o nome do livro que deseja adicionar: ").strip()
        quantidade = int(input("Quantos livros deseja adicionar ao estoque? "))
        
        # Verifica se o arquivo existe e lê seu conteúdo
        estoque = {}
        if os.path.exists(caminho_arquivo):
            with open(caminho_arquivo, 'r') as arquivo:
                for linha in arquivo:
                    if ':' in linha:
                        livro, qtd = linha.strip().split(':')
                        estoque[livro] = int(qtd)
        
        # Atualiza o estoque
        if nome_livro in estoque:
            estoque[nome_livro] += quantidade
            print(f"Livro já existente. Quantidade atualizada para {estoque[nome_livro]}.")
        else:
            estoque[nome_livro] = quantidade
            print(f"O livro '{nome_livro}' foi adicionado ao estoque com quantidade {quantidade}.")
        
        # Reescreve o arquivo com os dados atualizados
        with open(caminho_arquivo, 'w') as arquivo:
            for livro, qtd in estoque.items():
                arquivo.write(f"{livro}:{qtd}\n")
    except ValueError:
        print("Erro: A quantidade deve ser um número inteiro.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def emprestarLivro():
    """
    Empresta um livro para um usuário, verificando se ele está cadastrado e se já possui um livro emprestado.
    """

    # Caminhos dos arquivos
    pasta_atual = os.path.dirname(__file__)
    caminho_livros = os.path.join(pasta_atual, 'livros.txt')
    caminho_cadastros = os.path.join(pasta_atual, 'cadastros.txt')

    try:
        # Solicita o nome do usuário e do livro
        nome_usuario = input("Digite o nome do usuário: ").strip()
        nome_livro = input("Digite o nome do livro que deseja emprestar: ").strip()

        # Verifica se o arquivo de cadastros existe e lê seu conteúdo
        cadastros = {}
        if os.path.exists(caminho_cadastros):
            with open(caminho_cadastros, 'r') as arquivo:
                for linha in arquivo:
                    if ':' in linha:
                        usuario, livro = linha.strip().split(':')
                        cadastros[usuario] = livro
        else:
            # Cria o arquivo de cadastros se não existir
            with open(caminho_cadastros, 'w') as arquivo:
                pass

        # Verifica se o usuário está cadastrado
        if nome_usuario not in cadastros:
            print(f"O usuário '{nome_usuario}' não está cadastrado. Cadastrando agora...")
            cadastros[nome_usuario] = 'None'

        # Verifica se o usuário já possui um livro emprestado
        if cadastros[nome_usuario] != 'None':
            print(f"O usuário '{nome_usuario}' já possui um livro emprestado: {cadastros[nome_usuario]}. Devolva o livro antes de realizar um novo empréstimo.")
            return

        # Verifica se o arquivo de livros existe e lê seu conteúdo
        estoque = {}
        if os.path.exists(caminho_livros):
            with open(caminho_livros, 'r') as arquivo:
                for linha in arquivo:
                    if ':' in linha:
                        livro, qtd = linha.strip().split(':')
                        estoque[livro] = int(qtd)
        else:
            print("O arquivo de estoque não existe.")
            return

        # Verifica se o livro está no estoque
        if nome_livro in estoque:
            if estoque[nome_livro] > 0:
                # Reduz a quantidade do livro emprestado
                estoque[nome_livro] -= 1
                print(f"O livro '{nome_livro}' foi emprestado com sucesso para '{nome_usuario}'.")

                # Atualiza o registro do usuário no arquivo de cadastros
                cadastros[nome_usuario] = nome_livro
                with open(caminho_cadastros, 'w') as arquivo:
                    for usuario, livro in cadastros.items():
                        arquivo.write(f"{usuario}:{livro}\n")

                # Atualiza o estoque no arquivo de livros
                with open(caminho_livros, 'w') as arquivo:
                    for livro, qtd in estoque.items():
                        arquivo.write(f"{livro}:{qtd}\n")
            else:
                print(f"O livro '{nome_livro}' está esgotado no estoque.")
        else:
            print(f"O livro '{nome_livro}' não está disponível no estoque.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def devolverLivro():
    """
    Permite que um usuário devolva um livro emprestado, atualizando os arquivos cadastros.txt e livros.txt.
    """

    # Caminhos dos arquivos
    pasta_atual = os.path.dirname(__file__)
    caminho_livros = os.path.join(pasta_atual, 'livros.txt')
    caminho_cadastros = os.path.join(pasta_atual, 'cadastros.txt')

    try:
        # Solicita o nome do usuário e do livro
        nome_usuario = input("Digite o nome do usuário: ").strip()
        nome_livro = input("Digite o nome do livro que deseja devolver: ").strip()

        # Verifica se o arquivo de cadastros existe e lê seu conteúdo
        cadastros = {}
        if os.path.exists(caminho_cadastros):
            with open(caminho_cadastros, 'r') as arquivo:
                for linha in arquivo:
                    if ':' in linha:
                        usuario, livro = linha.strip().split(':')
                        cadastros[usuario] = livro
        else:
            print("O arquivo de cadastros não existe.")
            return

        # Verifica se o usuário e o livro estão registrados
        if nome_usuario in cadastros and cadastros[nome_usuario] == nome_livro:
            # Atualiza o arquivo de livros, incrementando a quantidade do livro devolvido
            estoque = {}
            if os.path.exists(caminho_livros):
                with open(caminho_livros, 'r') as arquivo:
                    for linha in arquivo:
                        if ':' in linha:
                            livro, qtd = linha.strip().split(':')
                            estoque[livro] = int(qtd)
            else:
                print("O arquivo de estoque não existe.")
                return

            if nome_livro in estoque:
                estoque[nome_livro] += 1
            else:
                estoque[nome_livro] = 1  # Caso o livro não esteja no estoque, adiciona com quantidade 1

            # Remove o livro do registro do usuário
            cadastros[nome_usuario] = 'None'

            # Atualiza o arquivo cadastros.txt
            with open(caminho_cadastros, 'w') as arquivo:
                for usuario, livro in cadastros.items():
                    arquivo.write(f"{usuario}:{livro}\n")

            # Atualiza o arquivo livros.txt
            with open(caminho_livros, 'w') as arquivo:
                for livro, qtd in estoque.items():
                    arquivo.write(f"{livro}:{qtd}\n")

            print(f"O livro '{nome_livro}' foi devolvido com sucesso por '{nome_usuario}'.")
        else:
            print(f"O usuário '{nome_usuario}' não possui o livro '{nome_livro}' emprestado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    

def listarLivros():
    pass
