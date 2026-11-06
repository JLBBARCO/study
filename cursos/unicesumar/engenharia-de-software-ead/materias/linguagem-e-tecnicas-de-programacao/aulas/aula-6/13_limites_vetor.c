#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 20: experimento. O vetor tem 5 posicoes (indices 0 a 4) e o laco vai ate 7.
   Compila e executa sem erro; de v[5] em diante aparece lixo de memoria (comportamento
   indefinido: o valor muda de maquina para maquina). O livro (Quadro 2) faz o mesmo com
   gravacao, que e mais perigosa: sobrescreve outras variaveis. */
int main(void)
{
    int v[5] = {1, 2, 3, 4, 5};
    int i;

    for (i = 0; i < 8; i++)
        printf("%d: %d\n", i, v[i]);
    return 0;
}
