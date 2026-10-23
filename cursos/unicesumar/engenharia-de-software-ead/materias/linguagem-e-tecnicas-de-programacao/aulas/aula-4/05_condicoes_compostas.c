#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 10: condicao composta (&&) e if aninhado (else if). */
int main(void)
{
    int idade;

    printf("Idade: ");
    scanf("%d", &idade);

    if ((idade >= 18) && (idade <= 65))
        printf("Obrigatorio\n");

    if (idade < 16)
        printf("Nao eleitor\n");
    else if (idade < 18)
        printf("Facultativo\n");
    return 0;
}
