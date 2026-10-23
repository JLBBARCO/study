# Respostas

## Questão 1: Estruturas de Dados Homogêneas vs Heterogêneas em Linguagem C

1. Estruturas de dados Homogêneas
   - **Definição:** São coleções de elementos indexados que possuem estritamente o **mesmo tipo de dado**. Os elementos são alocados de forma sequencial e contínua no bloco de memória principal.
   - **Exemplos em C:** Vetores unidimensionais (`int notas[4];`) e matrizes multidimensionais (`float matriz[3][3];`).
   - **Quando utilizar:** Quando se precisa manipular múltiplos dados com a mesma natureza matemática ou lógica (por exemplo, um histórico com notas das 4 disciplinas de um estudante ou uma lista de idades).
   - **Eficiência e Organização:**
     - **Eficiência de Memória:** Como os elementos são homogêneos, o compilador aloca um bloco uniforme e contínuo (ex.: `4 * sizeof(float)`). O acesso a qualquer posição possui complexidade $O(1)$, calculando via aritmética de ponteiros com base no índice ($Endereço = Base + Index \times sizeof(Tipo)$).
     - **Organização do Código:** Simplifica iterações em lote utilizando estruturas de repetições como o laço `for` ou `while`.
2. **Estruturas de Dados Heterogêneas**
   - **Definição:** Chamadas de registros ou estruturas (`struct`), permitem agrupar em um único identificador/variável dados de **diferentes tipos de dados** (inteiros, caracteres, pontos flutuantes, vetores).
   - **Exemplos em C:** Declarações utilizando a palavra reservada `struct`.
   - **Quando utilizar:** Quando o problema exige a modelagem de entidades do mundo real que possuem múltiplos atributos de naturezas distintas (por exemplo, um produto com código inteiro, descrição textual e preço real, ou um aluno com dados pessoais, notas e situação).
   - **Eficiência e Organização:**
     - **Eficiência de Memória:** O tamanho total ocupado pela `struct` equivale à soma dos tamanhos de seus campos (com possíveis alinhamentos de memória/padding aplicados pelo computador). Permite agrupar os dados de uma entidade em um bloco contíguo na memória.
     - **Organização do Código:** Aumenta significativamente a legibilidade, o encapsulamento e a manutenibilidade do código-fonte. Em vez de manter múltiplos vetores paralelos desconectados, os atributos ficam unificados em uma única entidade acessível pelo operador ponto (`.`).

## Questão 2: Projeto da Estrutura (`struct`) para o Sistema Escolar

```c
#include <stdio.h>

/* Definição da estrutura heterogênea para o aluno */
struct Aluno
{
    /* Dados Pessoais */
    int matricula; // Código identificador único do aluno
    char nome[60]; // Nome completo do estudante (cadeia de caracteres)

    /* Notas e Desempenho Acadêmico */
    float notas[4];   // Vetor homogêneo armazenando as notas das 4 disciplinas
    float mediaGeral; // Média aritmética calculada

    /* Situação Acadêmica */
    char situacao[15]; // String indicando "Aprovado" ou "Reprovado"
};
```

### Justificativa Detalhada dos Campos e Tipos de Dados Escolhidos

1. `int matricula;`
   - **Campo:** Matrícula/Código do aluno.
   - **Justificativa do tipo:** O tipo primitivo `int` armazena valores numéricos inteiros sem casas decimais. É ideal para chaves de identificação e buscas sequenciais eficientes no sistema.

2. `char nome[60];`
   - **Campo:** Nome completo do aluno.
   - **Justificativa do tipo:** Em C, textos são representados como vetores de caracteres do tipo `char` (strings) finalizados pelo caractere nulo `\0`. O tamanho reservado de 60 posições acomoda nomes compostos com margem segura para o caractere terminador.

3. `float notas[4]`
   - **Campo:** Notas das 4 disciplinas do aluno.
   - **Justificativa do tipo:** Utiliza-se uma estrutura **homogênea (vetor)** do tipo `float` (ponto flutuante com precisão simples). As notas escolares contêm partes decimais (ex.: 7.5, 8.0), requerendo tipos de ponto flutuante. O uso do vetor `[4]` organiza os quatro bimestres/disciplinas de forma contígua em memória, permitindo o cálculo da média com laços de repetição `for`.

4. `float mediaGeral;`
   - **Campo:** Média geral do estudante.
   - **Justificativa do tipo:** O tipo `float` é adequado para guardar o resultado do cálculo fracionário/divisão da soma das notas por 4.

5. `char situacao[15];`
   - **Campo:** Status/Situação acadêmica final do aluno.
   - **Justificativa do tipo:** Vetor de caractere (`char`) de tamanho 15 para armazenar descrições textuais como `"Aprovado"`, `"Reprovado"` ou `"Em Exame"`, facilitando a exibição direta dos relatórios e saídas formatadas.
