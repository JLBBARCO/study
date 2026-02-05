# * Importações
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# * Carregar dados
dados_grupo1 = pd.read_csv('student_performance.csv')['total_score'].dropna().values

# * Função para análise detalhada com separatrizes
def analise_detalhada_separatrizes(dados, nome_grupo="Dados"):
    df = pd.DataFrame(dados, columns=['valores'])

    # * Estatísticas descritivas
    print(f"=== ANÁLISE DO {nome_grupo.upper()} ===")
    print("\nEstatísticas Descritivas:")
    print(df['valores'].describe())

    # * Quartis
    quartis = df['valores'].quantile([0.25, 0.5, 0.75])
    print(f"\nQuartis:")
    for q, valor in quartis.items():
        print(f"Q{int(q*100)}: {valor:.2f}")

    # * Decis
    decis = df['valores'].quantile([i/10 for i in range(1, 10)])
    print(f"\nDecis:")
    for d, valor in decis.items():
        print(f"D{int(d*10)}: {valor:.2f}")

    plt.figure(figsize=(12, 6))
    n, bins, patches = plt.hist(df['valores'], bins=20, alpha=0.7, edgecolor='black')

    # * Adicionar linhas dos quartis
    for q, cor, label in zip([0.25, 0.5, 0.75], ['red', 'green', 'blue'], ['Q1', 'Q2', 'Q3']):
        valor = df['valores'].quantile(q)
        plt.axvline(valor, color=cor, linestyle='--', linewidth=2, label=f'{label}: {valor:.2f}')

    plt.xlabel('Notas')
    plt.ylabel('Frequência')
    plt.title(f'Distribuição de {nome_grupo} com Quartis')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

    return df

# * Executar análise
df_analise = analise_detalhada_separatrizes(dados_grupo1, "Grupo 1")
