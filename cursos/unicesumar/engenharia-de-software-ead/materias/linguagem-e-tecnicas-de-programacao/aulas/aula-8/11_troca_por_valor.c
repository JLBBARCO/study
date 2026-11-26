/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: TROCA POR VALOR (Aula 07, Slide 17)
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar que trocar valores dentro de uma funcao nao afeta as
 *    variaveis do main quando a passagem e por valor. Teste: saida 1
 *    2.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   void troca(int a, int b)
 *      a e b sao copias de x e y.
 *
 *   aux
 *      Variavel local de apoio para a troca.
 *
 *   troca(x, y);
 *      Passa os valores 1 e 2, e nao as variaveis.
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
 *    1. A funcao troca as copias.
 *    2. Ao voltar, as copias sao descartadas.
 *    3. x e y continuam com 1 e 2.
 *
 * CUIDADOS
 *    - Esse e o erro tipico de quem esquece que a funcao trabalha com
 *      copias.
 * ============================================================
 */
#include <stdio.h>

void troca(int a, int b)         /* a e b sao copias */
{
    int aux = a;

    a = b;
    b = aux;
}

int main(void)
{
    int x = 1, y = 2;

    troca(x, y);
    printf("%d %d\n", x, y);     /* 1 2: nada mudou */
    return 0;
}
