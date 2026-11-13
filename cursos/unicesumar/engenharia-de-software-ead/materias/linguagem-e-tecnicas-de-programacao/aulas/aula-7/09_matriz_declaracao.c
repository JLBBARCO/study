#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 13: declaracao de matriz, dois indices e valores iniciais. */
int main(void)
{
    int m[2][3];                          /* 2 linhas (0 a 1) e 3 colunas (0 a 2) */
    int n[2][3] = {{1, 2, 3}, {4, 5, 6}}; /* uma chave por linha */

    m[0][1] = 5;
    printf("m[0][1] = %d\n", m[0][1]);
    printf("n[1][2] = %d\n", n[1][2]); /* 6: ultima linha, ultima coluna */
    return 0;
}
