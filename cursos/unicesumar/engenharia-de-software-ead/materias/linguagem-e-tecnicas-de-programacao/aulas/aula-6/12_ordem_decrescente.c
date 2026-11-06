#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 6

/* Slide 19: solucao. Mesma ordenacao, com a comparacao invertida (<).
   Teste: 3 9 1 7 5 2 -> 9 7 5 3 2 1 */
int main(void)
{
    int v[TAM], i, j, aux;

    printf("Digite %d inteiros: ", TAM);
    for (i = 0; i < TAM; i++)
        scanf("%d", &v[i]);

    for (i = 0; i < TAM - 1; i++)
        for (j = i + 1; j < TAM; j++)
            if (v[i] < v[j]) {
                aux = v[i];
                v[i] = v[j];
                v[j] = aux;
            }

    for (i = 0; i < TAM; i++)
        printf("%d ", v[i]);
    printf("\n");
    return 0;
}
