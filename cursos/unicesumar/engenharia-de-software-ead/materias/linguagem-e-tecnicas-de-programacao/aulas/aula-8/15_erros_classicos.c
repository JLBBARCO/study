/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ERROS CLASSICOS (Aula 07, Slide 21)
 * ============================================================
 *
 * OBJETIVO
 *    Versao correta de um programa com ponteiros e funcoes, com os
 *    erros classicos indicados em comentario. Teste: entrada 3 -> x =
 *    7, r = 9 e y = 3.
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
 *   int *p = &x; (erro: int *p; *p = 5;)
 *      Ponteiro sem endereco aponta para um lugar desconhecido; gravar
 *      nele e comportamento indefinido. Sempre aponte para uma
 *      variavel antes de usar o *.
 *
 *   scanf("%d", x) (erro)
 *      Falta o &: o scanf precisa do endereco da variavel. Vetor de
 *      char e a excecao.
 *
 *   return em int soma(...)
 *      Funcao com tipo sem return devolve lixo.
 *
 *   troca(x, y) (erro)
 *      Passar valor onde a funcao espera endereco: a troca nao
 *      acontece, ou o compilador reclama.
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
 *    1. Usa um ponteiro valido.
 *    2. Chama uma funcao com return.
 *    3. Le com scanf usando &.
 *
 * CUIDADOS
 *    - Os erros estao como comentario para o programa compilar; teste-
 *      os um de cada vez em copia do codigo.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

int soma(int a, int b)
{
    return a + b;                /* ERRO se faltasse o return: o resultado seria lixo */
}

int main(void)
{
    int x = 4, y = 5, r;
    int *p = &x;                 /* ERRO seria: int *p;  *p = 5;  sem apontar para nada */

    r = soma(x, y);
    *p = 7;
    printf("x = %d, r = %d\n", x, r);
    /* ERRO: scanf("%d", x);  faltou o &, o scanf precisa do endereco */
    printf("Digite um numero: ");
    scanf("%d", &y);
    printf("y = %d\n", y);
    return 0;
}
