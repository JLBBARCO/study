#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>

/* Slide 10: palavra de tras para frente. Teste: amor -> roma; Ana -> anA */
int main(void)
{
    char palavra[30];
    int i, n;

    scanf("%29s", palavra); /* ate 29 letras, sobra espaco para o \0 */
    n = strlen(palavra);
    for (i = n - 1; i >= 0; i--) /* do ultimo indice ate 0 */
        printf("%c", palavra[i]);
    printf("\n");
    return 0;
}
