#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 5

/* Slide 13: pesquisa com saida antecipada. A bandeira "achou" encerra o laco;
   o indice i, no fim, e a posicao do valor. Teste: 4 -> 0; 5 -> 4; 6 -> nao encontrado. */
int main(void)
{
    int v[TAM] = {4, 9, 2, 7, 5};
    int i = 0, busca, achou = 0;

    printf("Valor procurado: ");
    scanf("%d", &busca);
    while (i < TAM && achou == 0)
    {
        if (v[i] == busca)
            achou = 1;
        else
            i++;
    }
    if (achou)
        printf("Posicao %d\n", i);
    else
        printf("Nao encontrado\n");
    return 0;
}
