#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 8: previsao. Saidas esperadas: 6, 7 e "1 8 3 5 " (cada trecho parte do vetor original). */
int main(void)
{
    int v[4] = {5, 3, 8, 1};
    int i;

    printf("%d\n", v[0] + v[3]);                 /* 5 + 1 = 6 */

    v[2] = v[1] + 4;
    printf("%d\n", v[2]);                        /* 3 + 4 = 7 */

    int w[4] = {5, 3, 8, 1};                     /* vetor original de novo */
    for (i = 3; i >= 0; i--)
        printf("%d ", w[i]);                     /* 1 8 3 5 */
    printf("\n");
    return 0;
}
