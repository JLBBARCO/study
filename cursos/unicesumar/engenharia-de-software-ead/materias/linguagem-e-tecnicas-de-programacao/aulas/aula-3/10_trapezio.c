#define _CRT_SECURE_NO_WARNINGS   /* MSVC: permite usar scanf sem avisos */
/*
 * 10_trapezio.c
 * Slide: Pratica: juros e trapezio (parte 2)
 *
 * Problema: ler as bases e a altura de um trapezio e exibir a area.
 *   area = (base maior + base menor) * altura / 2
 *
 * Atencao: os PARENTESES sao obrigatorios. Sem eles, a multiplicacao
 * seria feita antes da soma. E como as variaveis sao double, a
 * divisao por 2 nao descarta a parte decimal.
 */
#include <stdio.h>

int main()
{
    double baseMaior, baseMenor, altura, area;

    printf("Base maior: ");
    scanf("%lf", &baseMaior);
    printf("Base menor: ");
    scanf("%lf", &baseMenor);
    printf("Altura: ");
    scanf("%lf", &altura);

    area = (baseMaior + baseMenor) * altura / 2;

    printf("Area do trapezio: %.2f\n", area);

    /* Teste: bases 10 e 6, altura 4 -> area 32.00
              bases 5 e 3, altura 3 -> area 12.00 */
    return 0;
}
