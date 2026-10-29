#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 10: previsao. Saidas esperadas: "1 4 9", "A" (uma vez so) e "10".
   O segundo trecho tem ; depois do for: o laco repete um comando vazio.
   O gcc avisa com -Wmisleading-indentation. */
int main(void)
{
    int i;

    for (i = 1; i <= 3; i++) printf("%d ", i * i);
    printf("\n");

    for (i = 0; i < 3; i++); printf("A");
    printf("\n");

    int k = 10; while (k < 5) k++; printf("%d", k);
    printf("\n");
    return 0;
}
