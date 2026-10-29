#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 19: solucao. Laco externo para alunos, interno para notas.
   O acumulador soma e zerado a cada aluno (erro comum: zerar so uma vez, fora do laco). */
int main(void)
{
    int aluno, prova;
    float nota, soma;

    for (aluno = 1; aluno <= 3; aluno++)
    {
        soma = 0;
        for (prova = 1; prova <= 4; prova++)
        {
            printf("Aluno %d, nota %d: ", aluno, prova);
            scanf("%f", &nota);
            soma = soma + nota;
        }
        printf("Aluno %d: media %.2f\n", aluno, soma / 4);
    }
    return 0;
}
