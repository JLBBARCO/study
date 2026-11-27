/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: VETOR COM TAMANHO DECIDIDO NA EXECUCAO (Aula 07, Slide 14)
 * ============================================================
 *
 * OBJETIVO
 *    Criar um vetor cujo tamanho so e conhecido quando o programa
 *    roda. Teste: entrada 3 e depois 4 5 6 -> Soma 15.
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
 *   #include <stdlib.h>
 *      Traz malloc, calloc, realloc e free (alocacao dinamica de
 *      memoria).
 *
 *   int n, i, soma = 0, *v;
 *      Varias declaracoes em uma linha: v e um ponteiro, os outros sao
 *      inteiros comuns. O * vale so para v.
 *
 *   v = malloc(n * sizeof(int));
 *      Pede n inteiros ao heap. Um vetor comum (int v[n]) teria o
 *      tamanho fixo ou ficaria na stack; aqui o tamanho vem do
 *      usuario.
 *
 *   if (v == NULL) return 1;
 *      Se nao houver memoria, o malloc devolve NULL; sair evita usar
 *      um ponteiro invalido.
 *
 *   scanf("%d", &v[i])
 *      v[i] funciona como em um vetor comum; o & entrega o endereco da
 *      posicao.
 *
 *   free(v);
 *      Devolve o bloco ao final.
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
 *    2. Pede o bloco e testa o NULL.
 *    3. Le e soma os n valores.
 *    4. Imprime e libera.
 *
 * CUIDADOS
 *    - Valide n > 0 antes do malloc em um programa real.
 *    - n * sizeof(int) com n muito grande pode falhar: o teste de NULL
 *      cobre esse caso.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n, i, soma = 0, *v;

    printf("Quantos numeros? ");
    scanf("%d", &n);
    v = malloc(n * sizeof(int));
    if (v == NULL) return 1;
    for (i = 0; i < n; i++) {
        scanf("%d", &v[i]);
        soma = soma + v[i];
    }
    printf("Soma %d\n", soma);
    free(v);
    return 0;
}
