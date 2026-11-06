#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 18: teste de mesa. Mostra o vetor depois de cada volta de i.
   Saida: i=0: 2 9 7 4 5 / i=1: 2 4 9 7 5 / i=2: 2 4 5 9 7 / i=3: 2 4 5 7 9 */
int main(void)
{
    int v[TAM] = {9, 4, 7, 2, 5};
    int i, j, aux;

    for (i = 0; i < TAM - 1; i++)
    {
        for (j = i + 1; j < TAM; j++)
        {
            if (v[i] > v[j])
            {
                aux = v[i];
                v[i] = v[j];
                v[j] = aux;
            }
        }
        printf("i=%d:", i);
        for (j = 0; j < TAM; j++)
            printf(" %d", v[j]);
        printf("\n");
    }
    return 0;
}
