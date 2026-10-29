#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 13: fatorial com acumulador de produto (comeca em 1, e nao em 0).
   Teste 5, 12 e 13. 13! nao cabe em int: o resultado e imprevisivel
   (no gcc, sem otimizacao, aparece 1932053504). */
int main(void)
{
    int n, i;
    int fat = 1;

    printf("n: ");
    scanf("%d", &n);

    for (i = 2; i <= n; i++)
        fat = fat * i;

    printf("%d! = %d\n", n, fat);
    return 0;
}
