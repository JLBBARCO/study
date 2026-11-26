/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: VETOR COMO PARAMETRO (Aula 07, Slide 19)
 * ============================================================
 *
 * OBJETIVO
 *    Passar um vetor a uma funcao que altera seus elementos. Teste:
 *    saida 2 4 6 8 10.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   #define TAM 5
 *      Tamanho do vetor em um unico lugar.
 *
 *   void dobra(int v[], int n)
 *      v[] na lista de parametros equivale a int *v: a funcao recebe o
 *      endereco do vetor, nao uma copia. O tamanho vai em outro
 *      parametro (n), pois a funcao nao o conhece.
 *
 *   dobra(v, TAM)
 *      No main, o nome do vetor ja e o endereco: sem &.
 *
 *   v[i] = v[i] * 2;
 *      Altera o vetor original do main.
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
 *    1. Declara e inicializa o vetor.
 *    2. Chama dobra.
 *    3. Exibe os elementos ja alterados.
 *
 * CUIDADOS
 *    - Sempre passe o tamanho junto com o vetor.
 *    - Alterar o vetor dentro da funcao muda o do chamador.
 * ============================================================
 */
#include <stdio.h>
#define TAM 5

void dobra(int v[], int n)       /* v recebe o endereco do vetor do main */
{
    int i;

    for (i = 0; i < n; i++)
        v[i] = v[i] * 2;
}

int main(void)
{
    int v[TAM] = {1, 2, 3, 4, 5}, i;

    dobra(v, TAM);
    for (i = 0; i < TAM; i++)
        printf("%d ", v[i]);     /* 2 4 6 8 10 */
    printf("\n");
    return 0;
}
