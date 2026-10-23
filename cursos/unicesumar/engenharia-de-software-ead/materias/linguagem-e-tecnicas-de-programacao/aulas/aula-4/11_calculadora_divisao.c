#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 17: solucao. if-else dentro de um case protege contra divisao por zero.
   Com float, a divisao por zero daria inf; com int, o programa seria encerrado. */
int main(void)
{
    float a, b;
    int op;

    printf("Numero 1: ");
    scanf("%f", &a);
    printf("Numero 2: ");
    scanf("%f", &b);
    printf("1 soma, 2 subtracao, 3 multiplicacao, 4 divisao: ");
    scanf("%d", &op);

    switch (op)
    {
    case 1:
        printf("Soma: %.1f\n", a + b);
        break;
    case 2:
        printf("Subtracao: %.1f\n", a - b);
        break;
    case 3:
        printf("Multiplicacao: %.1f\n", a * b);
        break;
    case 4:
        if (b != 0)
            printf("Divisao: %.1f\n", a / b);
        else
            printf("Erro: divisao por zero\n");
        break;
    default:
        printf("Opcao invalida\n");
    }
    return 0;
}
