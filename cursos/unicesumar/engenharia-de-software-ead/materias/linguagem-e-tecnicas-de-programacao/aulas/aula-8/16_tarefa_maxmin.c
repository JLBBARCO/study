/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: TAREFA: MAIOR E MENOR POR PONTEIROS (Aula 07, Slide 23)
 * ============================================================
 *
 * OBJETIVO
 *    Funcao que recebe um vetor de 10 inteiros e devolve, por
 *    ponteiros, o maior e o menor valor. Teste: entrada 4 9 1 7 3 8 2
 *    6 5 0 -> Maior: 9, menor: 0.
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
 *   void maxmin(int v[], int n, int *maior, int *menor)
 *      Uma funcao so devolve um valor com return; para devolver dois,
 *      recebe os enderecos de duas variaveis do chamador e grava
 *      nelas.
 *
 *   *maior = v[0];
 *      Inicializa o maior e o menor com o primeiro elemento.
 *
 *   v[i] > *maior
 *      Compara cada elemento com o maior atual (conteudo apontado); se
 *      maior, atualiza.
 *
 *   maxmin(v, TAM, &maior, &menor)
 *      No main, entrega o vetor e os enderecos das duas variaveis.
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
 *    1. Le os 10 valores.
 *    2. maxmin percorre o vetor atualizando *maior e *menor.
 *    3. O main imprime os dois.
 *
 * CUIDADOS
 *    - Inicializar com 0 em vez de v[0] daria resultado errado para
 *      valores todos negativos ou todos positivos.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 10

/* Tarefa: devolve o maior e o menor valor por ponteiros.
   Teste: 4 9 1 7 3 8 2 6 5 0 -> maior 9, menor 0 */
void maxmin(int v[], int n, int *maior, int *menor)
{
    int i;

    *maior = v[0];
    *menor = v[0];
    for (i = 1; i < n; i++)
    {
        if (v[i] > *maior)
            *maior = v[i];
        if (v[i] < *menor)
            *menor = v[i];
    }
}

int main(void)
{
    int v[TAM], i, maior, menor;

    printf("Digite %d inteiros: ", TAM);
    for (i = 0; i < TAM; i++)
        scanf("%d", &v[i]);
    maxmin(v, TAM, &maior, &menor);
    printf("Maior: %d, menor: %d\n", maior, menor);
    return 0;
}
