#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 10

/* Slide 7: um laco le, outro exibe. Ultimo indice usado: 9. */
int main(void)
{
    int v[TAM], i;

    for (i = 0; i < TAM; i++)
    {
        printf("Elemento %d: ", i);
        scanf("%d", &v[i]);
    }
    for (i = 0; i < TAM; i++)
        printf("%d ", v[i]);
    printf("\n");
    return 0;
}
