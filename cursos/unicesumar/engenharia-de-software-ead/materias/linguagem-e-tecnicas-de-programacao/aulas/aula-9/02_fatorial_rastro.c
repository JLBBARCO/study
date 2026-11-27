/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: RASTRO DA PILHA DO FATORIAL (Aula 07, Slide 7 (apoio))
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar na tela a ordem em que as chamadas empilham e
 *    desempilham. Teste: entra 3, 2, 1, 0 e depois sai 0 = 1, 1 = 1, 2
 *    = 2, 3 = 6.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   printf("entra ...")
 *      Escrito no inicio da funcao: mostra a ordem em que as chamadas
 *      sao empilhadas.
 *
 *   printf("sai ...")
 *      Escrito antes do return: mostra a ordem em que sao
 *      desempilhadas e o valor devolvido por cada uma.
 *
 *   int r;
 *      Variavel local: cada chamada tem a sua propria r, no seu quadro
 *      da pilha.
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
 *    1. Chama fatorial(3).
 *    2. Entra em 3, 2, 1 e 0 (descida).
 *    3. Sai em 0, 1, 2 e 3 (subida), devolvendo 1, 1, 2 e 6.
 *
 * CUIDADOS
 *    - A ultima chamada a entrar e a primeira a sair: e a pilha
 *      (LIFO).
 * ============================================================
 */
#include <stdio.h>

int fatorial(int n)
{
    int r;

    printf("entra fatorial(%d)\n", n);
    if (n == 0)
        r = 1;
    else
        r = n * fatorial(n - 1);
    printf("sai   fatorial(%d) = %d\n", n, r);
    return r;
}

int main(void)
{
    fatorial(3);
    return 0;
}
