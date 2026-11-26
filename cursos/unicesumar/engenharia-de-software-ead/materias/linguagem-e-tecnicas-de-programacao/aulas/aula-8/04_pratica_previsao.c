/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: PRATICA DE PREVISAO (Aula 07, Slide 8)
 * ============================================================
 *
 * OBJETIVO
 *    Prever a saida de trechos com ponteiros, executados em sequencia.
 *    Teste: saidas 3, 9 e 7.
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
 *   p = &a;
 *      p aponta para a.
 *
 *   *p = 9;
 *      Altera a por meio de p; depois disso a vale 9.
 *
 *   p = &b;
 *      Atribuir um novo endereco muda para onde p aponta; *p passa a
 *      ser b (7).
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Imprime *p (3).
 *    2. Altera por p e imprime a (9).
 *    3. Redireciona p para b e imprime *p (7).
 *
 * CUIDADOS
 *    - Preveja no papel antes de executar.
 *    - Troca de alvo (p = &b) e diferente de troca de conteudo (*p =
 *      ...).
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    int a = 3, b = 7;
    int *p = &a;

    printf("%d\n", *p);          /* 3 */
    *p = 9;
    printf("%d\n", a);           /* 9: *p e a sao o mesmo lugar */
    p = &b;                      /* agora p aponta para b */
    printf("%d\n", *p);          /* 7 */
    return 0;
}
