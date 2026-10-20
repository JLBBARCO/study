/*
 * 03_atribuicao_composta.c
 * Slides: Atribuicao composta e ++/-- / Pratica: rastreie as variaveis
 *
 * Objetivo: mostrar que cada operador composto e um atalho para o
 * padrao "variavel = variavel operacao valor".
 */
#include <stdio.h>

int main()
{
    int x = 10;

    x += 5;  printf("x += 5  -> %d\n", x);   /* x = x + 5  : 15 */
    x -= 2;  printf("x -= 2  -> %d\n", x);   /* x = x - 2  : 13 */
    x *= 3;  printf("x *= 3  -> %d\n", x);   /* x = x * 3  : 39 */
    x /= 2;  printf("x /= 2  -> %d\n", x);   /* x = x / 2  : 19 (divisao inteira) */
    x %= 4;  printf("x %%= 4  -> %d\n", x);  /* x = x % 4  : 3  */
    x++;     printf("x++     -> %d\n", x);   /* x = x + 1  : 4  */
    x--;     printf("x--     -> %d\n", x);   /* x = x - 1  : 3  */

    /* ---- Pratica: rastreie as variaveis ----
       Com a = 10 e b = 4, quais os valores finais depois de
       a += b;  b *= a;  a %= 6; ?

       Tabela de rastreamento (uma coluna por variavel):
         comando      a    b
         inicio      10    4
         a += b      14    4
         b *= a      14   56
         a %= 6       2   56                                          */
    int a = 10;
    int b = 4;
    a += b;
    b *= a;
    a %= 6;
    printf("a = %d, b = %d\n", a, b);        /* a = 2, b = 56 */
    return 0;
}
