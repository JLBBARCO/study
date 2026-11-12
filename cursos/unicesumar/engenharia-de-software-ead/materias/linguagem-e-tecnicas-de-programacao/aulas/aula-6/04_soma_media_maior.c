#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 9: acumulador comeca em 0; o maior comeca no primeiro elemento.
   Teste: 7 8 5 10 6.5 -> Media 7.30 Maior 10.0 */
int main(void)
{
    float n[TAM], soma = 0, maior;
    int i;

    for (i = 0; i < TAM; i++)
        scanf("%f", &n[i]);
    maior = n[0];
    for (i = 0; i < TAM; i++)
    {
        soma = soma + n[i];
        if (n[i] > maior)
            maior = n[i];
    }
    printf("Media %.2f Maior %.1f\n",
           soma / TAM, maior);
    return 0;
}
