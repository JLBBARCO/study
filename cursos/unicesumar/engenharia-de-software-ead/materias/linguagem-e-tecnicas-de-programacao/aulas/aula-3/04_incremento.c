/*
 * 04_incremento.c
 * Slide: Laboratorio: x++ contra ++x
 *
 * Objetivo: ver a diferenca entre pos-fixado e prefixado quando o
 * operador e usado DENTRO de uma expressao.
 *   x++ : usa o valor atual e DEPOIS soma 1
 *   ++y : soma 1 e DEPOIS usa o valor
 */
#include <stdio.h>

int main()
{
    int x = 5;
    int y = 5;

    printf("%d\n", x++);            /* imprime 5; depois x passa a 6 */
    printf("%d\n", ++y);            /* y passa a 6; imprime 6        */
    printf("%d %d\n", x, y);        /* 6 6: no fim, os dois valem 6  */

    /* Sozinhos, como comando, x++; e ++x; fazem exatamente a mesma
       coisa. A diferenca so aparece quando o valor e aproveitado. */
    int i = 0;
    i++;
    ++i;
    printf("i = %d\n", i);          /* 2 */

    /* Boa pratica: evite misturar ++ com outras operacoes na mesma
       linha. Prefira escrever o incremento em um comando separado. */
    return 0;
}
