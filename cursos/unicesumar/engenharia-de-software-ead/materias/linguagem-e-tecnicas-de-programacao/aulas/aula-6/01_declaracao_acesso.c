#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 4

/* Slide 6: declaracao, acesso por indice e valores iniciais. */
int main(void)
{
    int nota[5];                  /* 5 posicoes: indices 0, 1, 2, 3 e 4 */
    int v[TAM] = {5, 3, 8, 1};    /* tamanho em constante, com valores iniciais */

    nota[0] = 7;
    nota[4] = 9;
    printf("nota[0] = %d, nota[4] = %d\n", nota[0], nota[4]);
    printf("v[0] = %d, v[3] = %d (ultimo indice = TAM - 1 = %d)\n", v[0], v[3], TAM - 1);
    return 0;
}
