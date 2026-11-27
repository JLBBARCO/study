/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ERROS CLASSICOS DE MEMORIA (Aula 07, Slide 18)
 * ============================================================
 *
 * OBJETIVO
 *    Versao correta de um programa com malloc e free, com os erros
 *    classicos indicados em comentario. Teste: imprime 7 e 42.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   #include <stdlib.h>
 *      Traz malloc, calloc, realloc e free (alocacao dinamica de
 *      memoria).
 *
 *   free(p); free(p); (erro)
 *      Free duplo: liberar o mesmo bloco duas vezes corrompe o
 *      gerenciador de memoria e costuma derrubar o programa.
 *
 *   free(p); *p = 1; (erro)
 *      Uso depois do free: o bloco ja nao e do programa. Pode
 *      "funcionar" por sorte ou corromper dados.
 *
 *   p = NULL;
 *      Depois do free, anular o ponteiro evita os dois erros acima:
 *      free(NULL) nao faz nada, e usar *p com NULL derruba o programa
 *      de forma clara em vez de corromper memoria silenciosamente.
 *
 *   int *f(void) { int x; return &x; } (erro)
 *      Devolve o endereco de uma variavel local, que deixa de existir
 *      ao final da funcao.
 *
 *   int *cria(void)
 *      Forma correta: aloca no heap e devolve o ponteiro. Quem chama
 *      fica responsavel por dar free.
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
 *    1. Aloca, usa e libera um bloco.
 *    2. Anula o ponteiro e mostra que um segundo free(NULL) e
 *       inofensivo.
 *    3. Mostra a forma correta de devolver um bloco por funcao.
 *
 * CUIDADOS
 *    - Os erros estao como comentario para o programa compilar; teste-
 *      os um de cada vez em copia e com -fsanitize=address.
 *    - Quem aloca deve documentar quem libera.
 * ============================================================
 */
#include <stdio.h>
#include <stdlib.h>

/* ERRO: int *f(void) { int x = 5; return &x; }   x morre quando f termina */

int *cria(void)
{
    int *q = malloc(sizeof(int));

    if (q != NULL)
        *q = 42;
    return q;                    /* correto: o bloco do heap sobrevive a funcao */
}

int main(void)
{
    int *p = malloc(sizeof(int));
    int *c;

    if (p == NULL)
        return 1;
    *p = 7;
    printf("%d\n", *p);
    free(p);
    p = NULL;                    /* depois do free, anule o ponteiro */
    free(p);                     /* free(NULL) nao faz nada: e seguro */
    /* ERRO: free(p); duas vezes sem anular (free duplo) */
    /* ERRO: *p = 1; depois do free (uso depois do free) */
    c = cria();
    if (c != NULL)
    {
        printf("%d\n", *c);
        free(c);
    }
    return 0;
}
