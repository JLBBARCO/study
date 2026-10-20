/*
 * 02_segundos.c
 * Slide: Laboratorio: segundos em h, min, s
 *
 * Objetivo: usar / e % juntos para decompor um valor em unidades.
 * Raciocinio: a divisao inteira por 3600 da as horas; o RESTO ainda
 * precisa ser decomposto, agora em minutos e segundos.
 */
#include <stdio.h>

int main()
{
    int total = 7384;               /* segundos a converter */
    int horas = total / 3600;       /* 7384 / 3600 = 2 horas   */
    int resto = total % 3600;       /* 7384 % 3600 = 184 segundos sobram */

    printf("%d h ", horas);                 /* 2         */
    printf("%d min ", resto / 60);          /* 184 / 60 = 3 */
    printf("%d s\n", resto % 60);           /* 184 % 60 = 4 */

    /* Teste tambem com total = 3661 (1 h 1 min 1 s) e total = 59
       (0 h 0 min 59 s). Valores de fronteira revelam erros de logica. */
    return 0;
}
