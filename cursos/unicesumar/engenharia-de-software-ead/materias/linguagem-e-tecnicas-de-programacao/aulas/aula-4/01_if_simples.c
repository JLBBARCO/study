#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 6: if simples. Troque num e execute de novo. */
int main(void)
{
    int num = 9; // O sinal de = é uma atribuição

    // Um número é divisível pelo outro se o resto da divisão entre eles for 0

    if (num % 3 == 0) // % é o resto da divisão e == testa a igualdade entre dois valores
    {
        printf("Divisivel por 3\n");
    }
    printf("Fim do programa\n");
    return 0;
}
