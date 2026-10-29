#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 23: tarefa. do-while valida os meses; for simula; saldo = saldo * 1.01 + deposito.
   Teste: saldo 1000, deposito 200, 3 meses -> 1210.00, 1422.10, 1636.32. */
int main(void)
{
    float saldo, deposito;
    int meses, m;

    printf("Saldo inicial: ");
    scanf("%f", &saldo);
    printf("Deposito mensal: ");
    scanf("%f", &deposito);

    do
    {
        printf("Numero de meses (maior que 0): ");
        scanf("%d", &meses);
    } while (meses <= 0);

    for (m = 1; m <= meses; m++)
    {
        saldo = saldo * 1.01f + deposito;
        printf("Mes %d: R$ %.2f\n", m, saldo);
    }
    return 0;
}
