#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 20: solucao. Conta os divisores entre 2 e n - 1; sem divisores, e primo.
   Teste: 2 primo; 9 nao primo; 11 primo; 15 nao primo.
   Melhoria para discutir: parar em raiz de n ou no primeiro divisor encontrado. */
int main(void)
{
    int n, i;
    int divisores = 0;

    printf("Numero (maior que 1): ");
    scanf("%d", &n);

    for (i = 2; i <= n - 1; i++)
    {
        if (n % i == 0)
            divisores++;
    }

    if (divisores == 0)
        printf("%d e primo\n", n);
    else
        printf("%d nao e primo\n", n);
    return 0;
}
