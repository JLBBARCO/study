#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 15: solucao da pratica. Sentinela 0, contador, acumulador e protecao
   contra divisao por zero. Teste: 1500 2500 0 -> 2 salarios, media 2000.00; 0 -> aviso. */
int main(void)
{
    float salario, soma = 0;
    int quantidade = 0;

    printf("Salario (0 encerra): ");
    scanf("%f", &salario);
    while (salario != 0)
    {
        soma = soma + salario;
        quantidade++;
        scanf("%f", &salario);
    }

    if (quantidade > 0)
        printf("%d salarios, media %.2f\n", quantidade, soma / quantidade);
    else
        printf("Nenhum salario informado\n");
    return 0;
}
