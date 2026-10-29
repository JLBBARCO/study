#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 12: teste de mesa do fatorial de 5. Mostra fat depois de cada volta. */
int main(void)
{
    int i;
    int fat = 1;

    for (i = 1; i <= 5; i++)
    {
        fat = fat * i;
        printf("i = %d  fat = %d\n", i, fat);
    }
    return 0;
}
