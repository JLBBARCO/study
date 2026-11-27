/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: AS TRES REGIOES DE MEMORIA (Aula 07, Slide 12)
 * ============================================================
 *
 * OBJETIVO
 *    Imprimir enderecos de uma variavel global, uma local e um bloco
 *    do heap para ver as regioes separadas. Teste: tres enderecos
 *    diferentes (os valores mudam a cada execucao).
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
 *   int glob = 1;
 *      Variavel global: fica na regiao de dados, que existe ate o fim
 *      do programa.
 *
 *   int local = 2;
 *      Variavel local: fica na stack, no quadro da funcao main.
 *
 *   int *heap = malloc(sizeof(int));
 *      Pede ao sistema um bloco de memoria do tamanho de um int.
 *      malloc devolve o endereco do bloco, que fica no heap, ou NULL
 *      se falhar.
 *
 *   printf com %p
 *      Imprime os enderecos. Em geral, o da global e o do heap ficam
 *      em faixas diferentes do da local (stack).
 *
 *   free(heap);
 *      Devolve o bloco ao sistema.
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
 *    1. Declara uma global, uma local e pede um bloco.
 *    2. Imprime os tres enderecos.
 *    3. Libera o bloco.
 *
 * CUIDADOS
 *    - A distancia entre os enderecos varia por sistema; o que importa
 *      e que as regioes sao diferentes.
 *    - Todo malloc deve ser testado contra NULL e liberado com free.
 * ============================================================
 */
#include <stdio.h>
#include <stdlib.h>

int glob = 1;                    /* regiao de dados globais */

int main(void)
{
    int local = 2;               /* stack */
    int *heap = malloc(sizeof(int));    /* heap */

    if (heap == NULL)
        return 1;
    printf("glob:   %p\n", (void *) &glob);
    printf("local:  %p\n", (void *) &local);
    printf("heap:   %p\n", (void *) heap);
    free(heap);
    return 0;
}
