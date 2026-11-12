#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define N 2

/* Slide 15 (Na prática 5): soma e diferenca de matrizes. Soma: 6 8 / 10 12. Diferenca: -4 -4 / -4 -4 */
int main(void)
{
    int a[N][N] = {{1, 2}, {3, 4}};
    int b[N][N] = {{5, 6}, {7, 8}};
    int s[N][N], d[N][N], i, j;

    for (i = 0; i < N; i++)
        for (j = 0; j < N; j++)
        {
            s[i][j] = a[i][j] + b[i][j];
            d[i][j] = a[i][j] - b[i][j];
        }
    printf("Soma:\n");
    for (i = 0; i < N; i++)
        printf("%d %d\n", s[i][0], s[i][1]);
    printf("Diferenca:\n");
    for (i = 0; i < N; i++)
        printf("%d %d\n", d[i][0], d[i][1]);
    return 0;
}
