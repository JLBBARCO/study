/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: SOMA RECURSIVA DE 1 A N (Aula 07, Slide 9 (pratica))
 * ============================================================
 *
 * OBJETIVO
 *    Calcular 1 + 2 + ... + n com uma funcao recursiva. Teste: n = 5
 *    -> 15; n = 0 -> 0; n = -3 -> Use n >= 0.
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
 *   if (n == 0) return 0;
 *      Caso base: a soma de nenhum numero e 0.
 *
 *   return n + soma(n - 1);
 *      Passo recursivo: soma(n) = n + soma(n - 1).
 *
 *   if (n < 0)
 *      Valida a entrada: sem isso, um n negativo nunca chegaria ao
 *      caso base.
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
 *    1. Le n e valida.
 *    2. soma(5) = 5 + soma(4) = ... = 5 + 4 + 3 + 2 + 1 + 0.
 *    3. Imprime 15.
 *
 * CUIDADOS
 *    - A mesma soma sai de um for. A recursao serve para treinar o
 *      raciocinio, nao e sempre a melhor escolha.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

int soma(int n)
{
    if (n == 0)
        return 0;                /* caso base */
    return n + soma(n - 1);      /* passo recursivo */
}

int main(void)
{
    int n;

    printf("n: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Use n >= 0\n");
    else
        printf("Soma de 1 a %d = %d\n", n, soma(n));
    return 0;
}
