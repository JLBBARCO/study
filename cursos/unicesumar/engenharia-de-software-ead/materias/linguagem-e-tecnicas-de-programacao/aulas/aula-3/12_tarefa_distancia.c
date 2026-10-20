#define _CRT_SECURE_NO_WARNINGS   /* MSVC: permite usar scanf sem avisos */
/*
 * 12_tarefa_distancia.c
 * Slide: Tarefa para casa (parte 2) - solucao do professor
 *
 * Ler as coordenadas de dois pontos e exibir a distancia entre eles:
 *   distancia = raiz( (x2 - x1)^2 + (y2 - y1)^2 )
 *
 * GCC: compile com -lm.
 */
#include <stdio.h>
#include <math.h>

int main()
{
    double x1, y1, x2, y2, distancia;

    printf("Ponto 1 (x y): ");
    scanf("%lf %lf", &x1, &y1);
    printf("Ponto 2 (x y): ");
    scanf("%lf %lf", &x2, &y2);

    distancia = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

    printf("Distancia: %.2f\n", distancia);

    /* Teste: (0,0) e (3,4) -> 5.00     (1,1) e (4,5) -> 5.00 */
    return 0;
}
