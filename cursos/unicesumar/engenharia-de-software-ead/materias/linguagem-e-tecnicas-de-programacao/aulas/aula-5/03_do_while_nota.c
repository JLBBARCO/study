#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 8: do-while executa ao menos uma vez; uso classico: validar a entrada.
   Teste: 11, -2, 7 (as duas primeiras sao recusadas). */
int main(void)
{
    float nota;

    do
    {
        printf("Nota (0 a 10): ");
        scanf("%f", &nota);
    } while (nota < 0 || nota > 10);

    printf("Nota aceita: %.1f\n", nota);
    return 0;
}
