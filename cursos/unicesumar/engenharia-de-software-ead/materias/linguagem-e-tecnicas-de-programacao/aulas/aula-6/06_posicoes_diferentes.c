#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 11: solucao. Um unico for percorre os dois vetores; contador de diferencas.
   Teste: A = 1 2 3 4 5 e B = 1 9 3 8 5 -> 2 posicoes diferentes. */
int main(void)
{
    int a[TAM], b[TAM], i, diferentes = 0;

    printf("Vetor A (%d valores): ", TAM);
    for (i = 0; i < TAM; i++)
        scanf("%d", &a[i]);
    printf("Vetor B (%d valores): ", TAM);
    for (i = 0; i < TAM; i++)
        scanf("%d", &b[i]);

    for (i = 0; i < TAM; i++)
    {
        if (a[i] != b[i])
            diferentes++;
    }
    printf("Posicoes diferentes: %d\n", diferentes);
    return 0;
}
