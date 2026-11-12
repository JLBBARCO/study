#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>

/* Laboratorio do cronograma: letras nas posicoes pares (indices 0, 2, 4, ...).
   Teste: programa -> p o r m */
int main(void)
{
    char palavra[30];
    int i;

    scanf("%29s", palavra);
    for (i = 0; i < (int) strlen(palavra); i += 2)   /* passo de 2 */
        printf("%c ", palavra[i]);
    printf("\n");
    return 0;
}
