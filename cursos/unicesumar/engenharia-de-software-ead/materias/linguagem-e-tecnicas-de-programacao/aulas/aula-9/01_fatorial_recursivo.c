/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: FATORIAL RECURSIVO (Aula 07, Slide 6)
 * ============================================================
 *
 * OBJETIVO
 *    Calcular o fatorial com uma funcao que chama a si mesma. Teste:
 *    fatorial(4) imprime 24.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   if (n == 0) return 1;
 *      Caso base: a situacao mais simples (0! = 1), resolvida sem nova
 *      chamada. Sem ele a recursao nunca para.
 *
 *   return n * fatorial(n - 1);
 *      Passo recursivo: reduz o problema (n vira n - 1) e usa a
 *      resposta da chamada menor. n! = n * (n - 1)!.
 *
 *   fatorial(4)
 *      Faz 4 chamadas ate chegar ao caso base: 4, 3, 2, 1 e 0. Cada
 *      uma espera a resposta da seguinte; depois as respostas voltam
 *      multiplicando: 1, 1, 2, 6, 24.
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
 *    1. O main chama fatorial(4).
 *    2. As chamadas se empilham ate o caso base.
 *    3. Os resultados voltam desempilhando: 24.
 *
 * CUIDADOS
 *    - O tipo int estoura a partir de 13!: use long long para valores
 *      maiores.
 *    - Toda funcao recursiva precisa de um caso base alcancavel.
 * ============================================================
 */
#include <stdio.h>

int fatorial(int n)
{
    if (n == 0)
        return 1;                /* caso base */
    return n * fatorial(n - 1);  /* passo recursivo */
}

int main(void)
{
    printf("%d\n", fatorial(4));
    return 0;
}
