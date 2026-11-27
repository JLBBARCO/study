/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: MALLOC, CALLOC E REALLOC (Aula 07, Slide 13)
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar as tres funcoes de alocacao e a liberacao com free.
 *    Teste: imprime 10 20 30 40 50 e depois 0 0 0 0.
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
 *   malloc(3 * sizeof(int))
 *      Pede espaco para 3 inteiros. sizeof(int) garante o tamanho
 *      certo em qualquer maquina. O conteudo inicial e lixo.
 *
 *   calloc(4, sizeof(int))
 *      Pede 4 inteiros e os zera. Recebe quantidade e tamanho de cada
 *      um.
 *
 *   realloc(v, 5 * sizeof(int))
 *      Muda o tamanho do bloco para 5 inteiros, preservando o que ja
 *      estava. Pode mover o bloco para outro endereco.
 *
 *   int *t
 *      Variavel auxiliar: se o realloc falhar, devolve NULL e o bloco
 *      antigo continua valido. Atribuir direto a v perderia o endereco
 *      e vazaria memoria.
 *
 *   v == NULL || z == NULL
 *      O operador || significa "ou": testa se alguma alocacao falhou.
 *
 *   free(v); free(z);
 *      Cada bloco pedido precisa ser devolvido uma unica vez.
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
 *    1. Pede dois blocos e testa os dois.
 *    2. Preenche v e amplia com realloc, usando t.
 *    3. Imprime os dois vetores e libera tudo.
 *
 * CUIDADOS
 *    - Nao use o bloco antigo depois de um realloc bem-sucedido: use o
 *      novo endereco.
 *    - Nunca chame free duas vezes no mesmo bloco.
 * ============================================================
 */
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int i;
    int *v = malloc(3 * sizeof(int));     /* 3 inteiros, sem valor inicial */
    int *z = calloc(4, sizeof(int));      /* 4 inteiros, todos zerados */
    int *t;

    if (v == NULL || z == NULL)
        return 1;
    v[0] = 10; v[1] = 20; v[2] = 30;
    t = realloc(v, 5 * sizeof(int));      /* amplia para 5 inteiros */
    if (t == NULL)
    {
        free(v);
        free(z);
        return 1;
    }
    v = t;
    v[3] = 40; v[4] = 50;
    for (i = 0; i < 5; i++)
        printf("%d ", v[i]);
    printf("\n");
    for (i = 0; i < 4; i++)
        printf("%d ", z[i]);
    printf("\n");
    free(v);
    free(z);
    return 0;
}
