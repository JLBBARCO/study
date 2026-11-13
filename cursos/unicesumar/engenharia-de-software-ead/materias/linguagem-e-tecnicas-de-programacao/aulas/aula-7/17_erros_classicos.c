#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>

/* Slide 21: == compara enderecos, nao letras; scanf("%s") para no espaco.
   Teste: Ana Maria */
int main(void)
{
    char a[10] = "Ana", b[10] = "Ana", lido[20];
    char *pa = a, *pb = b;

    if (pa == pb) /* mesmos enderecos? nao: sao dois vetores */
        printf("== diz: iguais\n");
    else
        printf("== diz: diferentes (compara enderecos)\n");
    if (strcmp(a, b) == 0) /* forma correta */
        printf("strcmp diz: iguais\n");

    scanf("%19s", lido);          /* para no primeiro espaco */
    printf("Lido: [%s]\n", lido); /* so Ana */
    return 0;
}
