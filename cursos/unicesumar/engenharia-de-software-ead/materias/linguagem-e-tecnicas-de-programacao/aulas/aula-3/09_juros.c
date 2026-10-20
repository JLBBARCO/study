#define _CRT_SECURE_NO_WARNINGS   /* MSVC: permite usar scanf sem avisos */
/*
 * 09_juros.c
 * Slide: Pratica: juros e trapezio (parte 1)
 *
 * Problema: ler o valor de um deposito e a taxa de juros mensal (em %)
 * e exibir o valor apos um mes.
 *
 * Planejamento:
 *   entrada:       deposito, taxa
 *   processamento: juros = deposito * taxa / 100;  total = deposito + juros
 *   saida:         juros e total, com duas casas decimais
 */
#include <stdio.h>

int main()
{
    double deposito, taxa, juros, total;

    printf("Valor do deposito: ");
    scanf("%lf", &deposito);
    printf("Taxa de juros mensal (%%): ");
    scanf("%lf", &taxa);

    juros = deposito * taxa / 100;
    total = deposito + juros;

    printf("Juros do mes: %.2f\n", juros);
    printf("Valor apos um mes: %.2f\n", total);

    /* Teste com dois conjuntos de dados, por exemplo:
       1000 e 0.5  -> juros 5.00   e total 1005.00
       2500 e 1.2  -> juros 30.00  e total 2530.00 */
    return 0;
}
