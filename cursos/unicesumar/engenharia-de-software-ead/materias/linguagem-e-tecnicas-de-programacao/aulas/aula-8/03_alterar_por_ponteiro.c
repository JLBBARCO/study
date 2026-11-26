/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ALTERAR POR PONTEIRO (Aula 07, Slide 7)
 * ============================================================
 *
 * OBJETIVO
 *    Alterar uma variavel apenas usando o ponteiro que aponta para
 *    ela. Teste: x = 15 e *p = 15.
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
 *   *p = *p + 5;
 *      Lado direito: le o conteudo apontado (10) e soma 5. Lado
 *      esquerdo: grava o resultado no mesmo lugar.
 *
 *   x e *p
 *      Sao o mesmo local de memoria, entao mostram o mesmo valor.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Cria x e p.
 *    2. Soma 5 pelo ponteiro.
 *    3. Imprime x e *p.
 *
 * CUIDADOS
 *    - Nao confunda p (o endereco) com *p (o conteudo).
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    int x = 10;
    int *p = &x;

    *p = *p + 5;                 /* le x pelo ponteiro, soma 5 e grava em x */
    printf("x = %d\n", x);
    printf("*p = %d\n", *p);
    return 0;
}
