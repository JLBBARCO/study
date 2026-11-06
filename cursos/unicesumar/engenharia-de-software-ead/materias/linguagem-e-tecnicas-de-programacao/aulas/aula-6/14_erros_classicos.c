#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 21: erros classicos com vetores. Compile com -Wall -Wextra.
   Os erros 1 e 2 leem fora do vetor (comportamento indefinido): o valor de v[5] varia. */
int main(void)
{
    int v[TAM] = {1, 2, 3, 4, 5};
    int i, soma;

    soma = 0;
    for (i = 0; i <= TAM; i++)          /* erro 1: <= le v[5], que nao existe */
        soma = soma + v[i];
    printf("Soma com <= (errada): %d\n", soma);

    soma = 0;
    for (i = 1; i < TAM; i++)           /* erro 2: comecar em 1 deixa v[0] de fora */
        soma = soma + v[i];
    printf("Soma comecando em 1 (errada): %d\n", soma);       /* 14, e nao 15 */

    soma = 0;
    for (i = 0; i < TAM; i++)           /* correto: de 0 a TAM - 1 */
        soma = soma + v[i];
    printf("Soma correta: %d\n", soma);                         /* 15 */
    return 0;
}
