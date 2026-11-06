#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 16: trocar dois valores exige uma variavel auxiliar.
   Sem ela, v[i] = v[j]; v[j] = v[i]; deixa os dois iguais. */
int main(void)
{
    int v[2] = {3, 8};
    int aux;

    aux = v[0];
    v[0] = v[1];
    v[1] = aux;
    printf("Com auxiliar: %d %d\n", v[0], v[1]);     /* 8 3 */

    v[0] = 3; v[1] = 8;
    v[0] = v[1];
    v[1] = v[0];
    printf("Sem auxiliar: %d %d\n", v[0], v[1]);     /* 8 8 */
    return 0;
}
