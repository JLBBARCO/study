#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 16: o laco interno roda completo a cada volta do externo.
   Saida: 1 2 3 / 2 4 6 / 3 6 9 (9 execucoes do printf interno). */
int main(void)
{
    int i, j;

    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++)
            printf("%d ", i * j);
        printf("\n");
    }
    return 0;
}
