#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 8: previsao. Saidas esperadas: r, 1 e Ma. */
int main(void)
{
    char s[6] = "Maria";

    printf("%c\n", s[2]);               /* r */
    printf("%d\n", s[5] == '\0');        /* 1: a ultima posicao guarda o \0 */
    s[2] = '\0';                         /* corta o texto na posicao 2 */
    printf("%s\n", s);                  /* Ma */
    return 0;
}
