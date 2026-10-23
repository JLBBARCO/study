#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slides 11 e 12: else if encadeado. Testa so o limite superior de cada faixa,
   porque a primeira condicao verdadeira vence. Teste 18, 19, 29, 45, 65 e 66. */
int main(void)
{
    int idade, valor;

    printf("Idade: ");
    scanf("%d", &idade);

    if (idade <= 18)
        valor = 50;
    else if (idade <= 29)
        valor = 70;
    else if (idade <= 45)
        valor = 90;
    else if (idade <= 65)
        valor = 130;
    else
        valor = 170;

    printf("Mensalidade: R$ %d\n", valor);
    return 0;
}
