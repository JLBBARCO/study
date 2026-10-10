#include <stdio.h>

int main()
{
    int A, B, soma, subtr, mult, divs;

    printf("Digite o primeiro valor: ");
    scanf("%d", &A);
    printf("Digite o segundo valor: ");
    scanf("%d", &B);

    soma = A + B;
    subtr = A - B;
    mult = A * B;
    divs = A / B;

    printf("\nResultados:\n");
    printf("Soma: %d\n", soma);
    printf("Subtra.: %d\n", subtr);
    printf("Multiplica.: %d\n", mult);
    printf("Divis.: %d\n", divs);
}