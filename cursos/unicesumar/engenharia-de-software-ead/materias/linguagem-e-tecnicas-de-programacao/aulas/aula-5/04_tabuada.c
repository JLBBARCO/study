#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 9: tabuada com for. Sem chaves, o for controla so o printf.
   Para n = 7, a ultima linha e 7 x 10 = 70. */
int main(void)
{
    int n, i;

    printf("Tabuada de: ");
    scanf("%d", &n);

    for (i = 1; i <= 10; i++)
        printf("%d x %d = %d\n", n, i, n * i);
    return 0;
}
