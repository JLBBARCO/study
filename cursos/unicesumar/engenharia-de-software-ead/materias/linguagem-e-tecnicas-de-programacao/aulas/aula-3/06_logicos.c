/*
 * 06_logicos.c
 * Slides: Operadores logicos / Tabelas-verdade / Laboratorio: tabela-verdade /
 *         Pratica: escreva as condicoes
 *
 * Objetivo: construir a tabela-verdade na tela e escrever condicoes
 * do cotidiano com && (e), || (ou) e ! (nao).
 */
#include <stdio.h>

int main()
{
    int a = 1;                       /* verdadeiro */
    int b = 0;                       /* falso      */

    printf("a && b = %d\n", a && b);     /* 0: precisa dos dois verdadeiros */
    printf("a || b = %d\n", a || b);     /* 1: basta um verdadeiro          */
    printf("!a     = %d\n", !a);         /* 0: inverte                      */
    printf("a > b  = %d\n", a > b);      /* 1                               */

    /* ---- Tabela-verdade completa, usando todos os valores ---- */
    printf("\n a b | a&&b a||b\n");
    for (a = 0; a <= 1; a++) {           /* o for sera estudado na Aula 05 */
        for (b = 0; b <= 1; b++) {
            printf(" %d %d |  %d    %d\n", a, b, a && b, a || b);
        }
    }

    /* Em C, zero e falso e QUALQUER valor diferente de zero e verdadeiro. */
    printf("\n!0 = %d, !5 = %d\n", !0, !5);     /* 1 e 0 */

    /* ---- Pratica: escreva as condicoes ---- */
    int idade = 30;
    float nota = 6.5f;
    int frequencia = 80;
    int n = 15;

    printf("idade entre 18 e 65: %d\n", (idade >= 18) && (idade <= 65));
    printf("aprovado (nota >= 6 e frequencia >= 75): %d\n",
           (nota >= 6) && (frequencia >= 75));
    printf("%d divisivel por 3 ou por 5: %d\n", n, (n % 3 == 0) || (n % 5 == 0));

    /* Dica: cada comparacao fica entre parenteses, e as comparacoes
       sao ligadas por && ou ||. Um numero e par quando n % 2 == 0. */
    return 0;
}
