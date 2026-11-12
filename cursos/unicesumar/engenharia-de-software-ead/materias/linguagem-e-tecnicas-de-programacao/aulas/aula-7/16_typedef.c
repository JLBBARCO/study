#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 20: typedef da a struct um nome curto. */
typedef struct
{
    int codigo;
    float preco;
} Produto;

int main(void)
{
    Produto ficha[2] = {{10, 5.5f}, {20, 8.0f}};    /* sem repetir a palavra struct */
    int i;

    for (i = 0; i < 2; i++)
        printf("Codigo %d: R$ %.2f\n", ficha[i].codigo, ficha[i].preco);
    return 0;
}
