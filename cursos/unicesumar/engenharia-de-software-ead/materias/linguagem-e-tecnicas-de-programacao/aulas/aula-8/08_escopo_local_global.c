/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ESCOPO LOCAL E GLOBAL (Aula 07, Slide 15)
 * ============================================================
 *
 * OBJETIVO
 *    Comparar variavel local e variavel global. Teste: local = 1,
 *    contador = 1 / local = 1, contador = 2.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   int contador = 0; (fora das funcoes)
 *      Variavel global: visivel em todas as funcoes e existe ate o fim
 *      do programa.
 *
 *   int local = 0; (dentro de conta)
 *      Variavel local: criada a cada chamada e destruida ao sair da
 *      funcao. Por isso volta a 0 e vale 1 depois do ++.
 *
 *   local++ e contador++
 *      Incrementam as duas variaveis; so a global mantem o valor entre
 *      as chamadas.
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
 *    1. Chama conta duas vezes.
 *    2. A local reinicia sempre; a global acumula.
 *
 * CUIDADOS
 *    - Evite globais: qualquer funcao pode alterar o valor, o que
 *      dificulta entender e testar o programa.
 * ============================================================
 */
#include <stdio.h>

int contador = 0;                /* global: existe ate o fim do programa */

void conta(void)
{
    int local = 0;               /* local: nasce e morre a cada chamada */

    local++;
    contador++;
    printf("local = %d, contador = %d\n", local, contador);
}

int main(void)
{
    conta();                     /* local = 1, contador = 1 */
    conta();                     /* local = 1, contador = 2 */
    return 0;
}
