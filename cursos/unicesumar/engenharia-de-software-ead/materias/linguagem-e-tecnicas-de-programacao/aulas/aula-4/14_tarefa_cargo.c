#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 23: tarefa. Aumento por cargo com switch e default. */
int main(void)
{
    int cargo;
    float salario, aumento;

    printf("Salario: ");
    scanf("%f", &salario);
    printf("Codigo do cargo (1 a 4): ");
    scanf("%d", &cargo);

    switch (cargo)
    {
    case 1:
        aumento = salario * 0.40f;
        printf("Servente");
        break;
    case 2:
        aumento = salario * 0.35f;
        printf("Pedreiro");
        break;
    case 3:
        aumento = salario * 0.20f;
        printf("Mestre de obras");
        break;
    case 4:
        aumento = salario * 0.10f;
        printf("Tecnico de seguranca");
        break;
    default:
        printf("Codigo de cargo invalido\n");
        return 0;
    }
    printf(": aumento de R$ %.2f, novo salario R$ %.2f\n", aumento, salario + aumento);
    return 0;
}
