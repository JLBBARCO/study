#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 17: ordenacao por trocas simples (compara v[i] com todos os seguintes).
   Resultado: 2 4 5 7 9. Para ordem decrescente, troque > por <. */
int main(void)
{
    int v[TAM] = {9, 4, 7, 2, 5};
    int i, j, aux;

    for (i = 0; i < TAM - 1; i++)
        for (j = i + 1; j < TAM; j++)
            if (v[i] > v[j])
            {
                aux = v[i];
                v[i] = v[j];
                v[j] = aux;
            }
    for (i = 0; i < TAM; i++)
        printf("%d ", v[i]);
    printf("\n");
    return 0;
}
