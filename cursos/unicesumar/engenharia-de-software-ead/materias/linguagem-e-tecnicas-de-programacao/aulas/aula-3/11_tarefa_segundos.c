#define _CRT_SECURE_NO_WARNINGS   /* MSVC: permite usar scanf sem avisos */
/*
 * 11_tarefa_segundos.c
 * Slide: Tarefa para casa (parte 1) - solucao do professor
 *
 * Ler segundos com scanf e exibir horas:minutos:segundos com dois digitos.
 * O especificador %02d imprime o inteiro em 2 posicoes, completando
 * com zero a esquerda (5 vira 05).
 */
#include <stdio.h>

int main()
{
    int total, horas, minutos, segundos;

    printf("Quantidade de segundos: ");
    scanf("%d", &total);

    horas = total / 3600;
    minutos = (total % 3600) / 60;     /* parenteses: o resto vem primeiro */
    segundos = total % 60;

    printf("%02d:%02d:%02d\n", horas, minutos, segundos);

    /* Testes: 7384 -> 02:03:04     3661 -> 01:01:01     59 -> 00:00:59 */
    return 0;
}
