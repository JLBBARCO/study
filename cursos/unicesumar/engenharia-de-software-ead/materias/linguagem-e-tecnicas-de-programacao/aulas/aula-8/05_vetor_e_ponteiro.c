/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: VETOR E PONTEIRO (Aula 07, Slide 10)
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar que o nome de um vetor e o endereco da sua primeira
 *    posicao. Teste: saidas 1, 8 e 9.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   int main(void)
 *      Funcao principal: onde o programa comeca a executar. "void"
 *      indica que nao recebe argumentos; "int" e o tipo do valor
 *      devolvido ao sistema operacional.
 *
 *   int *p = v;
 *      Sem &, pois o nome do vetor ja e um endereco. p passa a apontar
 *      para o inicio do vetor.
 *
 *   v == &v[0]
 *      Compara os dois enderecos: sao iguais (resultado 1).
 *
 *   p[1]
 *      Com o ponteiro, escreve-se p[i] como se fosse v[i].
 *
 *   p[2] = 9;
 *      Altera o proprio vetor: nao ha copia.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Cria o vetor e o ponteiro.
 *    2. Compara enderecos.
 *    3. Le e altera elementos por p.
 *
 * CUIDADOS
 *    - E por isso que um vetor passado a uma funcao nunca e copiado.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    int v[3] = {5, 8, 2};
    int *p = v;                  /* sem &: o nome do vetor ja e um endereco */

    printf("%d\n", v == &v[0]);  /* 1 */
    printf("%d\n", p[1]);        /* 8 */
    p[2] = 9;                    /* altera o proprio vetor */
    printf("%d\n", v[2]);        /* 9 */
    return 0;
}
