#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 3

/* Slide 19: vetor de struct com busca por codigo.
   Teste: 10 5.5 / 20 8 / 30 2.25 e busca 20 -> R$ 8.00 */
struct produto { int codigo; float preco; };

int main(void)
{
    struct produto f[TAM];
    int i, busca, achou = 0;

    for (i = 0; i < TAM; i++)
        scanf("%d %f", &f[i].codigo, &f[i].preco);
    scanf("%d", &busca);
    for (i = 0; i < TAM; i++)
        if (f[i].codigo == busca)
        {
            printf("R$ %.2f\n", f[i].preco);
            achou = 1;
        }
    if (!achou)
        printf("Codigo nao encontrado\n");
    return 0;
}
