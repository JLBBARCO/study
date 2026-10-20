/*
 * 01_aritmeticos.c
 * Slides: Operadores aritmeticos / Divisao inteira e resto /
 *         Pratica: preveja o resultado / Tipo do resultado
 *
 * Objetivo: ver na tela o que cada operador aritmetico devolve e
 * entender por que 7 / 2 vale 3 e 7 / 2.0 vale 3.5.
 */
#include <stdio.h>

int main()
{
    int a = 5;
    int b = 2;

    /* ---- Os cinco operadores ---- */
    printf("%d + %d = %d\n", a, b, a + b);     /* 7  */
    printf("%d - %d = %d\n", a, b, a - b);     /* 3  */
    printf("%d * %d = %d\n", a, b, a * b);     /* 10 */

    /* ---- Divisao entre inteiros: a parte decimal e DESCARTADA ---- */
    printf("7 / 2 = %d\n", 7 / 2);             /* 3 */
    printf("7 %% 2 = %d\n", 7 % 2);            /* 1: resto da divisao  */
    /* No printf, escreve-se %% para imprimir o simbolo de porcentagem. */

    /* ---- Pratica: preveja o resultado (responda antes de executar) ---- */
    printf("7.0 / 2 = %.2f\n", 7.0 / 2);       /* 3.50: um real basta   */
    printf("2 / 4   = %d\n", 2 / 4);           /* 0: divisao inteira    */
    printf("10 %% 5  = %d\n", 10 % 5);         /* 0: divisao exata      */
    printf("15 %% 4  = %d\n", 15 % 4);         /* 3                     */
    printf("1 / 3.0 = %.2f\n", 1 / 3.0);       /* 0.33                  */
    printf("8 / 3 * 3 = %d\n", 8 / 3 * 3);     /* 6: (8/3)=2, depois 2*3 */

    /* ---- Tipo do resultado ---- */
    /* inteiro op inteiro  -> inteiro
       inteiro op real     -> real
       Basta UM operando real para a divisao ser real.
       O operador % so aceita operandos inteiros. */
    printf("7 / 2   = %d\n", 7 / 2);           /* 3   */
    printf("7 / 2.0 = %.1f\n", 7 / 2.0);       /* 3.5 */
    printf("1 / 2   = %d\n", 1 / 2);           /* 0   */
    printf("1 / 2.0 = %.1f\n", 1 / 2.0);       /* 0.5 */

    /* ---- Usos tipicos do resto e da divisao inteira ---- */
    int n = 482;
    printf("Ultimo digito de %d: %d\n", n, n % 10);        /* 2  */
    printf("%d sem o ultimo digito: %d\n", n, n / 10);     /* 48 */
    printf("%d e par? (resto por 2 = %d)\n", n, n % 2);    /* 0: par */
    printf("%d e divisivel por 3? (resto = %d)\n", n, n % 3); /* 2: nao */

    /* Dividir um inteiro por zero e erro em tempo de execucao: o
       programa pode ser encerrado. Teste o divisor antes de dividir
       (a Aula 04 mostra como, com o if). */
    return 0;
}
