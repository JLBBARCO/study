#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 14: peso ideal. Entrada: sexo e altura, ex.: M 1.70
   O espaco antes de %c descarta ENTER e espacos pendentes.
   Qualquer letra diferente de F/f cai no else (formula masculina). */
int main(void)
{
    char sexo;
    float altura, peso;

    printf("Sexo (M/F) e altura (ex.: M 1.70): ");
    scanf(" %c %f", &sexo, &altura);

    if (sexo == 'F' || sexo == 'f')
        peso = 62.1f * altura - 44.7f;
    else
        peso = 72.7f * altura - 58;

    printf("Peso ideal: %.2f\n", peso);
    return 0;
}
