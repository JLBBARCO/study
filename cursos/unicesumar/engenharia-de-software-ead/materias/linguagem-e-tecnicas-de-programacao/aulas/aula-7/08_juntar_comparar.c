#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>

/* Slide 12: strcat e strcmp. Saida: Ana Silva: 9 letras / Iguais */
int main(void)
{
    char nome[40] = "Ana";           /* o vetor precisa ter espaco para o texto final */
    char sobrenome[] = "Silva";

    strcat(nome, " ");
    strcat(nome, sobrenome);
    printf("%s: %d letras\n", nome, (int) strlen(nome));
    if (strcmp(nome, "Ana Silva") == 0)   /* 0 = textos iguais; nunca use == */
        printf("Iguais\n");
    return 0;
}
