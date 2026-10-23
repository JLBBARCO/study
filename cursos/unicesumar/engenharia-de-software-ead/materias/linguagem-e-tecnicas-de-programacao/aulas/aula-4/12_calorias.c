#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 20: dois switch em sequencia acumulando em total (inicializado com zero). */
int main(void)
{
    int op;
    int total = 0;

    printf("Prato: 1 italiano, 2 japones, 3 salvadorenho: ");
    scanf("%d", &op);
    switch (op) {
    case 1: total = total + 750; break;
    case 2: total = total + 324; break;
    case 3: total = total + 545; break;
    default: printf("Prato invalido\n");
    }

    printf("Bebida: 1 cha, 2 suco, 3 refrigerante: ");
    scanf("%d", &op);
    switch (op) {
    case 1: total = total + 30; break;
    case 2: total = total + 80; break;
    case 3: total = total + 90; break;
    default: printf("Bebida invalida\n");
    }

    printf("Total de calorias: %d\n", total);
    return 0;
}
