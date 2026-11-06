#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 4

/* Slide 10: soma posicao a posicao, exibida de tras para frente.
   Teste: 1 10 / 2 20 / 3 30 / 4 40 -> 44 33 22 11 */
int main(void)
{
    int a[TAM], b[TAM], i;

    for (i = 0; i < TAM; i++)
        scanf("%d %d", &a[i], &b[i]);
    for (i = TAM - 1; i >= 0; i--)
        printf("%d ", a[i] + b[i]);
    printf("\n");
    return 0;
}
