/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: VOID E PROTOTIPO (Aula 07, Slide 14)
 * ============================================================
 *
 * OBJETIVO
 *    Escrever uma funcao sem retorno e coloca-la depois do main usando
 *    prototipo. Teste: imprime 3, 6, 9, 12 e 15.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   void tabuada(int n);
 *      Prototipo: o cabecalho da funcao seguido de ;. Avisa o
 *      compilador que ela existe, para poder ser usada antes de
 *      definida.
 *
 *   void
 *      Tipo "nenhum": a funcao nao devolve valor e nao usa return com
 *      valor.
 *
 *   int i; (dentro da funcao)
 *      Variavel local: so existe durante a chamada.
 *
 *   n * i
 *      O parametro n e usado como uma variavel local normal.
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
 *    1. Declara o prototipo.
 *    2. O main chama tabuada(3).
 *    3. A funcao e definida depois do main.
 *
 * CUIDADOS
 *    - O prototipo precisa ser identico ao cabecalho da definicao.
 *    - Sem o prototipo, o compilador reclama da funcao desconhecida.
 * ============================================================
 */
#include <stdio.h>

void tabuada(int n);             /* prototipo: cabecalho com ; */

int main(void)
{
    tabuada(3);
    return 0;
}

void tabuada(int n)              /* definicao depois do main */
{
    int i;

    for (i = 1; i <= 5; i++)
        printf("%d\n", n * i);
}
