#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#define TAM 10

/* Slide 23: tarefa. Um laco calcula a media; outro conta os valores acima dela.
   Teste: 20 22 25 30 18 21 24 27 29 19 -> media 23.50; acima da media: 5 */
int main(void)
{
    float temp[TAM], soma = 0, media;
    int i, acima = 0;

    for (i = 0; i < TAM; i++)
    {
        printf("Temperatura %d: ", i + 1);
        scanf("%f", &temp[i]);
        soma = soma + temp[i];
    }
    media = soma / TAM;

    for (i = 0; i < TAM; i++)
    {
        if (temp[i] > media)
            acima++;
    }
    printf("Media: %.2f\nAcima da media: %d\n", media, acima);
    return 0;
}
