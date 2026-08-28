import os
from lib.interface import *

# Caminho base para a pasta 115
PASTA_115 = os.path.join(os.path.dirname(__file__), '..', '..')

def arquivoExiste(nome):
    # Define o caminho completo para o arquivo na pasta 115
    caminho_completo = os.path.join(PASTA_115, nome)
    try:
        with open(caminho_completo, 'rt') as a:
            pass
    except FileNotFoundError:
        return False
    else:
        return True

def criarArquivo(nome):
    # Define o caminho completo para o arquivo na pasta 115
    caminho_completo = os.path.join(PASTA_115, nome)

    try:
        # Cria o arquivo no caminho especificado
        with open(caminho_completo, 'wt+') as a:
            pass
    except Exception as e:
        print(f'Houve um ERRO ao criar o arquivo! {e}')
    else:
        print(f'Arquivo {caminho_completo} criado com sucesso!')

def lerArquivo(nome):
    # Define o caminho completo para o arquivo na pasta 115
    caminho_completo = os.path.join(PASTA_115, nome)

    try:
        a = open(caminho_completo, 'rt')
        cabeçalho('PESSOAS CADASTRADAS')
    except Exception as e:
        print(f'Houve um ERRO ao ler o arquivo! {e}')
    else:
        cabeçalho('Pessoas cadastradas com sucesso!')
        for linha in a:
            dados = linha.split(';')
            dados[1] = dados[1].replace('\n', '')
            print(f'  {dados[0]:<30}{dados[1]:>3} anos')
    finally:
        a.close()

def cadastrar(arquivo, nome='<desconhecido>', idade=0):
    # Define o caminho completo para o arquivo na pasta 115
    caminho_completo = os.path.join(PASTA_115, arquivo)

    try:
        a = open(caminho_completo, 'at')
    except Exception as e:
        print(f'Houve um ERRO ao cadastrar os dados! {e}')
    else:
        try:
            a.write(f'{nome};{idade}\n')
        except:
            print(f'Houve um ERRO ao escrever os dados! {e}')
        else:
            print(f'Novo registro de {nome} adicionado.')
    finally:
        a.close()
