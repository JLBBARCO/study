#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 18: ficha de produto com reajuste de 10%. Teste: 7 Parafuso 2.50 -> Parafuso: R$ 2.75 */
struct produto
{
    int codigo;
    char nome[20];
    float preco;
};

int main(void)
{
    struct produto p;

    scanf("%d %19s %f", &p.codigo, p.nome, &p.preco); /* p.nome e vetor: sem & */
    printf("%s: R$ %.2f\n", p.nome, p.preco * 1.1);
    return 0;
}
