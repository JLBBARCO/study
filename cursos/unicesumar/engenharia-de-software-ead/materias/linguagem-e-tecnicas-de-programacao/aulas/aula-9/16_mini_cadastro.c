/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: TAREFA: MINI CADASTRO COM STRUCT E ARQUIVO (Aula 07, Slide 23)
 * ============================================================
 *
 * OBJETIVO
 *    Cadastrar 3 livros em um vetor de struct, grava-los em livros.txt
 *    e le-los de volta para um segundo vetor. Teste: entrada 1
 *    Dom_Casmurro 30 / 2 Iracema 25.5 / 3 Senhora 28 -> 3 livros lidos
 *    do arquivo, iguais aos digitados.
 *
 * COMPONENTES
 *
 *   #define _CRT_SECURE_NO_WARNINGS
 *      Exigido pelo compilador MSVC (Visual Studio) para aceitar o
 *      scanf sem aviso de "funcao insegura". Nos outros compiladores
 *      nao tem efeito. Fica na primeira linha, antes dos #include.
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   struct livro
 *      Tipo com tres campos, declarado fora do main para valer em
 *      todas as funcoes (retoma a Aula 07).
 *
 *   int grava(const struct livro v[], ...)
 *      Funcao (retoma a Aula 08) que recebe o vetor, a quantidade e o
 *      nome do arquivo. const diz que a funcao nao altera o vetor.
 *      Devolve 1 em sucesso e 0 em falha.
 *
 *   fprintf(arq, "%d %s %.2f\n", ...)
 *      Grava uma ficha por linha: codigo, titulo e preco separados por
 *      espaco.
 *
 *   int le(struct livro v[], ...)
 *      Le as fichas de volta; devolve quantas conseguiu ler.
 *
 *   fscanf(...) == 3
 *      Teste do laco: enquanto os 3 campos foram lidos ha ficha. i < n
 *      protege contra estourar o vetor.
 *
 *   titulo sem espacos
 *      O %s do fscanf para no espaco, entao o titulo e uma palavra
 *      (use _ para unir palavras).
 *
 *   dois vetores v e w
 *      v e preenchido pelo teclado; w e preenchido pelo arquivo. Se w
 *      for igual a v, a gravacao e a leitura funcionaram.
 *
 *   int main(void)
 *      Funcao principal: onde o programa comeca a executar. "void"
 *      indica que nao recebe argumentos; "int" e o tipo do valor
 *      devolvido ao sistema operacional.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Le as 3 fichas do teclado para v.
 *    2. grava escreve v em livros.txt.
 *    3. le preenche w a partir do arquivo.
 *    4. Exibe w para conferir.
 *
 * CUIDADOS
 *    - Sempre teste o retorno de fopen, de grava e de le.
 *    - Se o titulo tivesse espaco, a leitura sairia errada: o formato
 *      precisaria mudar (por exemplo, um campo por linha com fgets).
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define QTD 3

struct livro
{
    int codigo;
    char titulo[40];
    float preco;
};

int grava(const struct livro v[], int n, const char *nome)
{
    FILE *arq = fopen(nome, "w");
    int i;

    if (arq == NULL)
        return 0;
    for (i = 0; i < n; i++)
        fprintf(arq, "%d %s %.2f\n", v[i].codigo, v[i].titulo, v[i].preco);
    fclose(arq);
    return 1;
}

int le(struct livro v[], int n, const char *nome)
{
    FILE *arq = fopen(nome, "r");
    int i = 0;

    if (arq == NULL)
        return 0;
    while (i < n && fscanf(arq, "%d %39s %f", &v[i].codigo, v[i].titulo, &v[i].preco) == 3)
        i++;
    fclose(arq);
    return i;
}

int main(void)
{
    struct livro v[QTD], w[QTD];
    int i, lidos;

    for (i = 0; i < QTD; i++)
    {
        printf("Livro %d (codigo titulo preco): ", i + 1);
        scanf("%d %39s %f", &v[i].codigo, v[i].titulo, &v[i].preco);
    }
    if (!grava(v, QTD, "livros.txt"))
    {
        printf("Erro ao gravar\n");
        return 1;
    }
    lidos = le(w, QTD, "livros.txt");
    printf("%d livros lidos do arquivo:\n", lidos);
    for (i = 0; i < lidos; i++)
        printf("%d %s R$ %.2f\n", w[i].codigo, w[i].titulo, w[i].preco);
    return 0;
}
