#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>

/* Slide 7: leitura de texto com fgets (no lugar do gets do livro).
   Teste: Ana Maria -> Ola, Ana Maria! */
int main(void)
{
    char nome[50];

    printf("Nome completo: ");
    fgets(nome, 50, stdin);           /* le a linha inteira, com espacos */
    nome[strcspn(nome, "\n")] = '\0'; /* troca o \n guardado pelo fgets por \0 */
    printf("Ola, %s!\n", nome);
    return 0;
}
