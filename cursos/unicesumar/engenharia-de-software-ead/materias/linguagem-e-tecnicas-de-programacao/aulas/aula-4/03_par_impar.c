#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 8: laboratorio par ou impar.
   Teste n % 2 == 0 (e nao == 1): para negativos, -3 % 2 vale -1. */
int main(void)
{
    int n;

    printf("Numero: ");
    scanf("%d", &n);

    if (n % 2 == 0)
        printf("%d e par\n", n);
    else
        printf("%d e impar\n", n);
    return 0;
}
