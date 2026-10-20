/*
 * 05_relacionais.c
 * Slide: Operadores relacionais
 *
 * Objetivo: mostrar que uma comparacao em C resulta em 1 (verdadeiro)
 * ou 0 (falso), e que '=' atribui enquanto '==' compara.
 */
#include <stdio.h>

int main()
{
    int a = 5;
    int b = 3;

    printf("%d == %d : %d\n", a, b, a == b);   /* 0 */
    printf("%d != %d : %d\n", a, b, a != b);   /* 1 */
    printf("%d >  %d : %d\n", a, b, a > b);    /* 1 */
    printf("%d <  %d : %d\n", a, b, a < b);    /* 0 */
    printf("%d >= %d : %d\n", a, b, a >= b);   /* 1 */
    printf("%d <= %d : %d\n", a, b, a <= b);   /* 0 */

    /* C nao tem o tipo "logico": o resultado e um int (1 ou 0). */
    int resultado = (5 > 3);
    printf("resultado = %d\n", resultado);     /* 1 */

    /* ---- O erro classico: = no lugar de == ---- */
    int x = 7;
    printf("x == 3 compara e resulta em %d\n", x == 3);   /* 0; x continua 7 */
    printf("antes: x = %d\n", x);                          /* 7 */
    printf("x = 3  atribui e resulta em %d\n", x = 3);    /* 3: x passou a valer 3 */
    printf("depois: x = %d\n", x);                         /* 3 */

    /* Como qualquer valor diferente de zero e verdadeiro, escrever
       x = 3 onde se queria x == 3 e sempre "verdadeiro" e ainda
       destroi o valor de x. O compilador costuma avisar disso. */
    return 0;
}
