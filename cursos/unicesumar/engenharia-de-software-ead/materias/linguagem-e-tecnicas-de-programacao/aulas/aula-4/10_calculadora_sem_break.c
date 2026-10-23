#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Demonstracao do fall-through: sem break, 6 3 1 imprime 9.0, 3.0, 18.0 e Opcao invalida.
   O gcc avisa com -Wimplicit-fallthrough (use -Wextra). */
int main(void)
{
    float a, b;
    int op;

    printf("Digite a, b e a opcao: ");
    scanf("%f %f %d", &a, &b, &op);

    switch (op) {
    case 1: printf("%.1f\n", a + b);
    case 2: printf("%.1f\n", a - b);
    case 3: printf("%.1f\n", a * b);
    default: printf("Opcao invalida\n");
    }

    /* Uso legitimo: dois valores com a mesma acao */
    char r = 's';
    switch (r) {
    case 's':
    case 'S': printf("Sim\n"); break;
    default: printf("Nao\n");
    }
    return 0;
}
