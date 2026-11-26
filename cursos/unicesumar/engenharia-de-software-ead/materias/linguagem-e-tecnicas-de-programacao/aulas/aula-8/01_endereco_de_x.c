/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: O ENDERECO DE X (Aula 07, Slide 5)
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar que toda variavel tem um endereco de memoria e como
 *    imprimi-lo. Teste: imprime valor 10 e um endereco (muda a cada
 *    execucao).
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
 *   int x = 10;
 *      Variavel inteira. Ocupa alguns bytes da memoria, e o primeiro
 *      deles tem um endereco.
 *
 *   &x
 *      Operador de endereco: devolve onde x esta guardada.
 *
 *   printf("%p", (void *) &x)
 *      %p imprime um endereco, em hexadecimal. O cast (void *) e a
 *      forma padrao, pois %p espera um ponteiro generico.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Declara x.
 *    2. Imprime o valor.
 *    3. Imprime o endereco com %p.
 *
 * CUIDADOS
 *    - O endereco muda de uma execucao para outra; o importante e que
 *      existe.
 *    - O mesmo endereco e o que o scanf recebe quando usamos &x.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    int x = 10;

    printf("valor: %d\n", x);
    printf("endereco: %p\n", (void *) &x);
    return 0;
}
