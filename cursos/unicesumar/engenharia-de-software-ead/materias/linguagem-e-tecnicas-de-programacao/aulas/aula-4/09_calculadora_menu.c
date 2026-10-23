#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 16: calculadora com switch. Entrada: a b op (ex.: 6 3 1) */
int main(void)
{
    float a, b;
    int op;

    printf("Digite a, b e a opcao (1 soma, 2 subtracao, 3 multiplicacao): ");
    scanf("%f %f %d", &a, &b, &op);

    switch (op) {
    case 1: printf("%.1f\n", a + b); break;
    case 2: printf("%.1f\n", a - b); break;
    case 3: printf("%.1f\n", a * b); break;
    default: printf("Opcao invalida\n");
    }
    return 0;
}
