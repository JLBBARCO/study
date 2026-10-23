#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 7: if-else. Sempre um dos dois caminhos e executado. */
int main(void)
{
    int idade;

    printf("Idade: ");
    scanf("%d", &idade);

    if (idade >= 18)
    {
        printf("Maior de idade\n");
    }
    else
    {
        printf("Menor de idade\n");
    }
    return 0;
}
