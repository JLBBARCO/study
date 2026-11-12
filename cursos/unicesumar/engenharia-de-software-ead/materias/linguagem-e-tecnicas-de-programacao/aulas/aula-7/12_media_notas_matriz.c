#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define ALU 20
#define PROVAS 4

/* Slide 16 (Na prática 6): 4 notas de 20 alunos em uma matriz e media de cada aluno. */
int main(void)
{
    float nota[ALU][PROVAS], soma;
    int a, p;

    for (a = 0; a < ALU; a++)
    {
        soma = 0;                               /* zera o acumulador a cada aluno */
        for (p = 0; p < PROVAS; p++)
        {
            scanf("%f", &nota[a][p]);
            soma = soma + nota[a][p];
        }
        printf("Aluno %d: media %.2f\n", a + 1, soma / PROVAS);
    }
    return 0;
}
