#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 14: valor sentinela. O 0 encerra a leitura e nao entra na contagem.
   Leitura antecipada: le antes do while e de novo no fim do bloco.
   Teste: 4 7 10 0  ->  Pares: 2 Impares: 1 */
int main(void)
{
    int n, pares = 0, impares = 0;

    printf("Numero (0 encerra): ");
    scanf("%d", &n);
    while (n != 0) {
        if (n % 2 == 0) pares++;
        else            impares++;
        scanf("%d", &n);
    }
    printf("Pares: %d Impares: %d\n", pares, impares);
    return 0;
}
