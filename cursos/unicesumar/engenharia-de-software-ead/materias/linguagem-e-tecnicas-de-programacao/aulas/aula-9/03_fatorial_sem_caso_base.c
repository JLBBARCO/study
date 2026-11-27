/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: RECURSAO QUE NAO CHEGA AO CASO BASE (Aula 07, Slide 8)
 * ============================================================
 *
 * OBJETIVO
 *    Provocar o estouro da pilha (stack overflow) com uma entrada que
 *    nunca alcanca o caso base. Teste: entrada 5 -> 120; entrada -1 ->
 *    o programa cai.
 *
 * COMPONENTES
 *
 *   #define _CRT_SECURE_NO_WARNINGS
 *      Exigido pelo compilador MSVC (Visual Studio) para aceitar o
 *      scanf sem aviso de "funcao insegura". Nos outros compiladores
 *      nao tem efeito. Fica na primeira linha, antes dos #include.
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   scanf("%d", &n)
 *      Le n do teclado; qualquer valor inteiro e aceito, inclusive
 *      negativos.
 *
 *   n == 0 (caso base)
 *      Com n negativo, n - 1 se afasta de 0, e a condicao nunca e
 *      verdadeira.
 *
 *   fatorial(n - 1)
 *      Cada chamada ocupa um quadro novo da pilha. Sem fim, a pilha
 *      (de 1 a 8 MB) se esgota.
 *
 *   stack overflow
 *      O sistema encerra o programa: segmentation fault no Linux e
 *      codigo 0xC00000FD no Windows.
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
 *    1. Le n.
 *    2. Com 5, desce ate 0 e volta com 120.
 *    3. Com -1, desce para sempre ate acabar a pilha.
 *
 * CUIDADOS
 *    - O compilador nao avisa: e um erro de logica, descoberto so ao
 *      executar.
 *    - Valide a entrada (n >= 0) antes de chamar a recursao.
 *    - Execute com -1 so em sala; no CLion o programa encerra com
 *      erro.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

int fatorial(int n)
{
    if (n == 0)
        return 1;
    return n * fatorial(n - 1);
}

int main(void)
{
    int n;

    printf("n: ");
    scanf("%d", &n);
    printf("%d\n", fatorial(n));
    return 0;
}
