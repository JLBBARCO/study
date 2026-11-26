/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ORDENAR VETOR EM FUNCAO (Aula 07, Slide 20 (Problema 3))
 * ============================================================
 *
 * OBJETIVO
 *    Funcao que recebe um vetor de 10 inteiros e o ordena em ordem
 *    crescente. Teste: saida 1 2 3 4 5 6 7 8 9 10.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   void ordena(int v[], int n)
 *      Recebe o vetor (por endereco) e o tamanho. Nao devolve nada:
 *      ordena o vetor do proprio chamador.
 *
 *   for i / for j
 *      Compara cada posicao i com todas as seguintes (j). Se estiverem
 *      fora de ordem, troca: ordenacao por trocas simples da Aula 06.
 *
 *   aux
 *      Variavel local para a troca de dois elementos.
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
 *    1. Declara o vetor desordenado.
 *    2. Chama ordena.
 *    3. Exibe o vetor, agora ordenado.
 *
 * CUIDADOS
 *    - Como o vetor chega por endereco, o main ve a ordenacao sem
 *      return.
 *    - Teste com vetor ja ordenado e com valores repetidos.
 * ============================================================
 */
#include <stdio.h>
#define TAM 10

/* Problema 3 da Unidade 5: ordenacao crescente por trocas simples (Aula 06). */
void ordena(int v[], int n)
{
    int i, j, aux;

    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (v[i] > v[j])
            {
                aux = v[i];
                v[i] = v[j];
                v[j] = aux;
            }
}

int main(void)
{
    int v[TAM] = {9, 4, 7, 1, 8, 2, 6, 3, 10, 5}, i;

    ordena(v, TAM);
    for (i = 0; i < TAM; i++)
        printf("%d ", v[i]);     /* 1 2 3 4 5 6 7 8 9 10 */
    printf("\n");
    return 0;
}
