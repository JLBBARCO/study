arquivo = 'colegio_adolpho/programacao_desenvolvimento_sistemas/atividades/atividade06/ex06.txt'
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
    resposta = input('Deseja abrir em modo de leitura ou escrita? ').strip().title()
