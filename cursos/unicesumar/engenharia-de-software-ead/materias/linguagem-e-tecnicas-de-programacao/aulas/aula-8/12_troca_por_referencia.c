/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: TROCA POR REFERENCIA (Aula 07, Slide 18)
 * ============================================================
 *
 * OBJETIVO
 *    Trocar os valores de duas variaveis do main com uma funcao,
 *    usando ponteiros. Teste: saida 2 1.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   void troca(int *a, int *b)
 *      a e b guardam enderecos de variaveis do main.
 *
 *   int aux = *a;
 *      Guarda o conteudo apontado por a.
 *
 *   *a = *b; *b = aux;
 *      Grava nos lugares originais: a troca vale para x e y.
 *
 *   troca(&x, &y);
 *      Entrega os enderecos de x e y.
 *
 *   int main(void)
 *      Funcao principal: onde o programa comeca a executar. "void"
 *      indica que nao recebe argumentos; "int" e o tipo do valor
 *      devolvido ao sistema operacional.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Passa os enderecos.
 *    2. A funcao le e grava pelos ponteiros.
 *    3. x e y trocados no main.
 *
 * CUIDADOS
 *    - Esquecer o & na chamada gera erro ou aviso: a funcao espera
 *      endereco.
 * ============================================================
 */
#include <stdio.h>

void troca(int *a, int *b)       /* a e b guardam enderecos */
{
    int aux = *a;

    *a = *b;
    *b = aux;
}

int main(void)
{
    int x = 1, y = 2;

    troca(&x, &y);
    printf("%d %d\n", x, y);     /* 2 1: a troca funcionou */
    return 0;
}
