#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 6: for. Inicializa uma vez; depois repete teste, bloco e atualizacao. */
int main(void)
{
    int i;

    for (i = 1; i <= 5; i++)
    {
        printf("%d\n", i);
    }
    return 0;
}
