#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 17: struct declarada depois do include e fora do main. */
struct produto
{
    int codigo;
    float preco;
};

int main(void)
{
    struct produto p;

    p.codigo = 7;                   /* variavel, ponto e campo */
    p.preco = 2.5f;
    printf("Codigo %d, preco R$ %.2f\n", p.codigo, p.preco);
    return 0;
}
