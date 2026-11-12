#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 6: declaracao de strings. Sempre uma posicao a mais para o '\0'. */
int main(void)
{
    char nome[10] = "Ana";     /* A n a \0 e o resto sem uso */
    char cidade[] = "Maringa"; /* o compilador conta: 7 letras + \0 = 8 posicoes */

    printf("nome = %s, nome[0] = %c, nome[3] == '\\0'? %d\n", nome, nome[0], nome[3] == '\0');
    printf("cidade = %s, ocupa %d posicoes\n", cidade, (int)sizeof(cidade));
    printf("'A' e um caractere (%d byte); \"A\" e uma string (%d bytes)\n",
           (int)sizeof(char), (int)sizeof("A"));
    return 0;
}
