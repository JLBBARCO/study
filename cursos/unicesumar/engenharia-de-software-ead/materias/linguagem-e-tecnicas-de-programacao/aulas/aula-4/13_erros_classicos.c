#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 21: os tres erros. Compile com -Wall -Wextra e leia os avisos.
   Saida: "x vale 3", "maior" (mesmo com x = 3) e fall-through no switch. */
int main(void)
{
    int x = 5;

    if (x = 3) /* erro 1: atribui em vez de comparar */
        printf("x vale %d\n", x);

    if (x > 10)
        ; /* erro 2: ; encerra o if */
    printf("maior\n");

    switch (x)
    { /* erro 3: falta o break */
    case 3:
        printf("tres\n");
    case 4:
        printf("quatro\n");
    }
    return 0;
}
