#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Versao que vai mais longe: long long e %lld. Cabe ate 20! (21! estoura de novo).
   No MSVC, long long e %lld funcionam normalmente. */
int main(void)
{
    int n, i;
    long long fat = 1;

    printf("n: ");
    scanf("%d", &n);

    for (i = 2; i <= n; i++)
        fat = fat * i;

    printf("%d! = %lld\n", n, fat);
    return 0;
}
