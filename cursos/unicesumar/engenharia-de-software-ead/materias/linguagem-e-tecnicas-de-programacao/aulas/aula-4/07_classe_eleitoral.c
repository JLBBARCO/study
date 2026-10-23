#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 13: solucao da pratica. Teste 15, 16, 17, 18, 65 e 66. */
int main(void)
{
    int idade;

    printf("Idade: ");
    scanf("%d", &idade);

    if (idade < 16)
    {
        printf("Nao eleitor\n");
    }
    else if ((idade < 18) || (idade > 65))
    {
        printf("Eleitor facultativo\n");
    }
    else
    {
        printf("Eleitor obrigatorio\n");
    }
    return 0;
}
