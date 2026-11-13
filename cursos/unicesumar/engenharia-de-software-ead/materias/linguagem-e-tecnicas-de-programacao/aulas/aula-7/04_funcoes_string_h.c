#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <string.h>
#include <ctype.h>

/* Slide 9: strlen, strcpy, strcat, strcmp, strstr e tolower/toupper. */
int main(void)
{
    char a[40] = "Ana", b[40], t[] = "Aula de Programacao", x[] = "PROGRAMACAO";
    char *p;
    int i;

    printf("strlen: %d\n", (int)strlen(a)); /* 3 */
    strcpy(b, a);                           /* b = "Ana" */
    strcat(b, " Silva");                    /* b = "Ana Silva" */
    printf("b = %s\n", b);
    printf("strcmp(a, b) < 0? %d\n", strcmp(a, b) < 0); /* 1: "Ana" vem antes */
    printf("strcmp(a, a) = %d\n", strcmp(a, a));        /* 0: iguais */

    p = strstr(t, "Prog"); /* endereco da primeira ocorrencia */
    if (p != NULL)
        printf("\"Prog\" comeca na posicao %d\n", (int)(p - t)); /* 8 */
    else
        printf("nao encontrado\n");

    for (i = 0; x[i] != '\0'; i++) /* strlwr nao e padrao: use tolower */
        x[i] = (char)tolower((unsigned char)x[i]);
    printf("%s\n", x);
    return 0;
}
