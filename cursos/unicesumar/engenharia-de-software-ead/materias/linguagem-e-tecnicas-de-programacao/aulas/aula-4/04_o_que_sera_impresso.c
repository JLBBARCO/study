#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 9: previsao. Saida esperada: B  e  C10
   O compilador avisa sobre a atribuicao no if e sobre a indentacao: leia os avisos. */
int main(void)
{
    int x = 8;
    if (x > 10) printf("A"); printf("B");
    printf("\n");

    int y = 8;
    if (y = 10) printf("C"); printf("%d", y);
    printf("\n");
    return 0;
}
