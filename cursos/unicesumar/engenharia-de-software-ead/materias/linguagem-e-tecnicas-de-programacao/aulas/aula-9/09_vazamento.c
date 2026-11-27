/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: VAZAMENTO DE MEMORIA (Aula 07, Slide 17)
 * ============================================================
 *
 * OBJETIVO
 *    Provocar um vazamento de memoria (pedir blocos e nunca devolver)
 *    e detecta-lo com ferramentas. Teste: imprime 0 1 2; com o
 *    sanitizer, reporta 3 blocos vazados.
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
 *   int *p = malloc(100 * sizeof(int));
 *      Em cada volta do laco, pede um novo bloco de 400 bytes (100
 *      inteiros de 4 bytes).
 *
 *   free(p); comentado
 *      Sem o free, o endereco do bloco se perde quando p sai de
 *      escopo: a memoria continua reservada, mas ninguem a alcanca.
 *      Isso e o vazamento.
 *
 *   deteccao
 *      gcc -g -fsanitize=address vazamento.c -o vaz && ./vaz: no fim,
 *      o LeakSanitizer lista os blocos vazados. No MSVC, use
 *      _CrtDumpMemoryLeaks() com crtdbg.h em modo Debug. No CLion,
 *      ative o perfil Sanitizers (ASan) quando disponivel.
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
 *    1. O laco pede 3 blocos.
 *    2. Nenhum e liberado.
 *    3. O programa funciona normalmente e vaza 1200 bytes.
 *
 * CUIDADOS
 *    - O vazamento nao causa erro visivel; em programas longos
 *      (servidores) acumula ate esgotar a memoria.
 *    - Todo malloc precisa de um free correspondente, em todos os
 *      caminhos de execucao.
 * ============================================================
 */
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int i;

    for (i = 0; i < 3; i++)
    {
        int *p = malloc(100 * sizeof(int));

        if (p == NULL)
            return 1;
        p[0] = i;
        printf("%d\n", p[0]);
        /* free(p); */           /* retire o comentario para corrigir o vazamento */
    }
    return 0;
}
