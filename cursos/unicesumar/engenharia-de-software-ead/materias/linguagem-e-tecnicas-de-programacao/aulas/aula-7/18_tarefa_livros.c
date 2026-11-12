#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define QTD 5

/* Slide 23: tarefa. 5 livros em um vetor de struct e busca por codigo.
   Teste: 1 Dom_Casmurro 30 / 2 Iracema 25.5 / 3 Senhora 28 / 4 Ubirajara 22 / 5 Lucola 27 e busca 3 */
struct livro
{
    int codigo;
    char titulo[40];
    float preco;
};

int main(void)
{
    struct livro v[QTD];
    int i, busca, achou = 0;

    for (i = 0; i < QTD; i++)
        scanf("%d %39s %f", &v[i].codigo, v[i].titulo, &v[i].preco);
    scanf("%d", &busca);
    for (i = 0; i < QTD && achou == 0; i++)
        if (v[i].codigo == busca)
        {
            printf("%s: R$ %.2f\n", v[i].titulo, v[i].preco);
            achou = 1;
        }
    if (!achou)
        printf("Codigo nao encontrado\n");
    return 0;
}
