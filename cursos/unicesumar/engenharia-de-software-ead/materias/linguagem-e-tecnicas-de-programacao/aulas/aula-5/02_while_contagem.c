#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 7: while testa antes. Sem n-- o laco nunca terminaria.
   Experimento: troque n = 3 por n = 0 e veja que o bloco nao executa nenhuma vez. */
int main(void)
{
    int n = 3;

    while (n > 0)
    {
        printf("%d\n", n);
        n--;
    }
    return 0;
}
