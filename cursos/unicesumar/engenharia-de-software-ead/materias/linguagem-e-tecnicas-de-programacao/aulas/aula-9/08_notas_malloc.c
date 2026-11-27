/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: MEDIA DE NOTAS COM MALLOC (Aula 07, Slide 15 (pratica))
 * ============================================================
 *
 * OBJETIVO
 *    Ler n notas, guarda-las em memoria alocada dinamicamente e exibir
 *    a media. Teste: entrada 3 e depois 7.5 8 9 -> Media: 8.17.
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
 *   float soma = 0, *nota;
 *      soma e um acumulador float comum; nota e um ponteiro para
 *      float.
 *
 *   if (n <= 0)
 *      Valida n antes de pedir memoria: tamanho zero ou negativo nao
 *      faz sentido.
 *
 *   malloc(n * sizeof(float))
 *      Espaco para n notas reais.
 *
 *   scanf("%f", &nota[i])
 *      %f le float; nota[i] e acessado como em um vetor.
 *
 *   soma / n
 *      Divisao real, pois soma e float.
 *
 *   free(nota);
 *      Libera o bloco apos o uso.
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
 *    1. Le e valida n.
 *    2. Aloca, le as notas e acumula a soma.
 *    3. Imprime a media e libera.
 *
 * CUIDADOS
 *    - Os caminhos de saida antecipada (return 1) vem antes da
 *      alocacao ou testam o NULL, entao nao ha vazamento.
 *    - Se houvesse return depois do malloc, seria preciso dar free
 *      antes.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int n, i;
    float soma = 0, *nota;

    printf("Quantas notas? ");
    scanf("%d", &n);
    if (n <= 0)
    {
        printf("n deve ser maior que 0\n");
        return 1;
    }
    nota = malloc(n * sizeof(float));
    if (nota == NULL)
        return 1;
    for (i = 0; i < n; i++)
    {
        scanf("%f", &nota[i]);
        soma = soma + nota[i];
    }
    printf("Media: %.2f\n", soma / n);
    free(nota);
    return 0;
}
