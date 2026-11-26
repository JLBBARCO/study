/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: FUNCAO COM RETORNO (Aula 07, Slide 13)
 * ============================================================
 *
 * OBJETIVO
 *    Escrever uma funcao que recebe dois inteiros e devolve o maior.
 *    Teste: entrada 4 9 -> Maior: 9.
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
 *   int maior(int a, int b)
 *      Cabecalho: tipo de retorno (int), nome e parametros formais (a
 *      e b).
 *
 *   return
 *      Encerra a funcao e devolve o valor ao chamador. Se a > b,
 *      devolve a; senao, chega ao segundo return e devolve b.
 *
 *   maior(x, y)
 *      Chamada: x e y sao os argumentos (parametros reais), copiados
 *      para a e b.
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
 *    1. Le dois numeros.
 *    2. Chama maior com eles.
 *    3. Imprime o valor devolvido.
 *
 * CUIDADOS
 *    - Funcao com tipo e sem return devolve lixo.
 *    - A funcao fica antes do main, ou deve ter prototipo.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

int maior(int a, int b)
{
    if (a > b)
        return a;
    return b;
}

int main(void)
{
    int x, y;

    printf("Dois numeros: ");
    scanf("%d %d", &x, &y);
    printf("Maior: %d\n", maior(x, y));
    return 0;
}
