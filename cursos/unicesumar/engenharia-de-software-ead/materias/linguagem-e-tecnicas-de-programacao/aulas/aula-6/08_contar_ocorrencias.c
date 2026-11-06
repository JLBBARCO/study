#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 10

/* Slide 14: solucao. Aqui nao ha saida antecipada: percorre tudo e conta.
   Teste: 3 1 3 5 3 7 3 9 3 0 e valor 3 -> 5 vezes. */
int main(void)
{
    int v[TAM], i, valor, vezes = 0;

    printf("Digite %d inteiros: ", TAM);
    for (i = 0; i < TAM; i++)
        scanf("%d", &v[i]);
    printf("Valor procurado: ");
    scanf("%d", &valor);

    for (i = 0; i < TAM; i++)
    {
        if (v[i] == valor)
            vezes++;
    }
    printf("%d aparece %d vez(es)\n", valor, vezes);
    return 0;
}
