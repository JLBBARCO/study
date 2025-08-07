arquivo = 'colegio_adolpho/programacao_desenvolvimento_sistemas/atividades/atividade06/arquivo.txt'
def escritaEmLeitor():
    """
    Função que escreve em um arquivo de texto especificado.
    O arquivo é aberto no modo de leitora. Ao tentar escrever, aparece o erro FileNotFoundError, pois há conflito entre o comando de abertura e o comando de escrita.
    """
    with open(arquivo, 'r') as arquivos:
        arquivos.write('Escrevendo no arquivo\n')

def lerEmEscrita():
    """
    Função que lê um arquivo de texto especificado.
    O arquivo é aberto no modo de escrita. Ao tentar ler, aparece o erro UnsupportedOperation, pois há conflito entre o comando de abertura e o comando de leitura.
    """
    with open(arquivo, 'r') as arquivos:
        arquivos.read()

def escreverArquivo():
    """
    "w" abre o arquivo para escrita, substituindo todo o conteúdo do arquivo pelo escrito depois da execução do programa.
    "a" abre o arquivo para escrita, adicionando algo ao fim do arquivo.
    """
    resposta = input('Deseja adicionar algo ao fim do arquivo ou substituir o todo o conteúdo do arquivo? ').strip().title()
    with arquivo:
        if resposta == 'Substituir':
            arquivos = open(arquivo, 'w')
        elif resposta == 'Adicionar':
            arquivos = open(arquivo, 'a')

def arquivoInexistente():
    """
    Função que força a abertura de um arquivo inexistente.
    Ao tentar abrir o arquivo, aparece o erro FileNotFoundError.
    """
    resposta = input('Deseja abrir em modo de leitura ou escrita? ').strip().title()
    if resposta == 'Leitura':
        open('ex06.txt', 'r').close()
    elif resposta == 'Escrita':
        open('ex06.txt', 'w').close()

def arquivoNãoFechado():
    """
    Função que abre um arquivo sem fechá-lo.
    Ao tentar abrir o arquivo novamente, aparece o erro ValueError, pois o arquivo já está aberto e não foi fechado.
    """
    open(arquivo, 'r')

def substituir_linha(arquivo, numero_linha, nova_linha):
    """
    Substitui uma linha específica em um arquivo .txt.

    :param arquivo: Nome do arquivo .txt.
    :param numero_linha: Índice da linha a ser substituída (começa em 0).
    :param nova_linha: Conteúdo da nova linha.
    """
    try:
        # Lê todas as linhas do arquivo
        with open(arquivo, 'r') as f:
            linhas = f.readlines()

        # Substitui a linha específica
        if 0 <= numero_linha < len(linhas):
            linhas[numero_linha] = nova_linha + '\n'
        else:
            print("Número de linha inválido.")
            return

        # Escreve as linhas de volta no arquivo
        with open(arquivo, 'w') as f:
            f.writelines(linhas)

        print("Linha substituída com sucesso.")
    except FileNotFoundError:
        print(f"Erro: O arquivo '{arquivo}' não foi encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

def contarPalavra(palavra):
    """
    Conta quantas vezes uma palavra aparece em um arquivo de texto.

    :param palavra: A palavra a ser contada.
    """
    try:
        with open(arquivo, 'r') as f:
            conteudo = f.read()
            contagem = conteudo.lower().count(palavra.lower())
            print(f"A palavra '{palavra}' aparece {contagem} vezes no arquivo.")
    except FileNotFoundError:
        print(f"Erro: O arquivo '{arquivo}' não foi encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")