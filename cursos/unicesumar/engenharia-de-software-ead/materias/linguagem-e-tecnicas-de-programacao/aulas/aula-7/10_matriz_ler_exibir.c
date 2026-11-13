#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define LIN 2
#define COL 3

/* Slide 14: ler e exibir matriz. Teste: 1 2 3 4 5 6 -> 1 2 3 / 4 5 6 */
int main(void)
{
    int m[LIN][COL], i, j;

    for (i = 0; i < LIN; i++)     /* laco de fora: linhas */
        for (j = 0; j < COL; j++) /* laco de dentro: colunas */
            scanf("%d", &m[i][j]);
    for (i = 0; i < LIN; i++)
    {
        for (j = 0; j < COL; j++)
            printf("%d ", m[i][j]);
        printf("\n"); /* muda de linha ao fim de cada linha da matriz */
    }
    return 0;
}
