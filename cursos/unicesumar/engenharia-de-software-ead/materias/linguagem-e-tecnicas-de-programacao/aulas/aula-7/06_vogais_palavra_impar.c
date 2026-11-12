#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>
#include <ctype.h>

/* Slide 11 (Na prática 3): se a palavra tem quantidade impar de letras, exibe as vogais.
   Teste: livro -> i o; casa -> quantidade par */
int main(void)
{
    char palavra[30];
    int i, n;
    char c;

    scanf("%29s", palavra);
    n = strlen(palavra);
    if (n % 2 == 1)
    {
        for (i = 0; i < n; i++)
        {
            c = (char) tolower((unsigned char) palavra[i]);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                printf("%c ", c);
        }
        printf("\n");
    }
    else
        printf("quantidade par de letras\n");
    return 0;
}
