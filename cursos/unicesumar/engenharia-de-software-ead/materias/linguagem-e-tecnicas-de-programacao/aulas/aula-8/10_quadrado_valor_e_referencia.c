/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: QUADRADO POR VALOR E POR REFERENCIA (Aula 07, Quadros 4 e 5 do livro)
 * ============================================================
 *
 * OBJETIVO
 *    Comparar, com a mesma conta, a passagem por valor e por
 *    referencia. Teste: entrada 5 -> valor: num = 5, resp = 25;
 *    referencia: num = 25, resp = 25.
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
 *   int quadrado_valor(int x)
 *      x e copia de num. Alterar x nao muda num.
 *
 *   int quadrado_ref(int *x)
 *      x e um ponteiro: recebe o endereco de num. *x e o proprio num.
 *
 *   quadrado_ref(&num)
 *      Na chamada, entrega-se o endereco com &.
 *
 *   *x = *x * (*x);
 *      Le o conteudo, multiplica por si mesmo e grava no mesmo lugar.
 *      O primeiro e o ultimo * sao de conteudo; o do meio e
 *      multiplicacao.
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
 *    1. Le num.
 *    2. Chama a versao por valor: num fica igual.
 *    3. Chama a versao por referencia: num passa a valer o quadrado.
 *
 * CUIDADOS
 *    - Por referencia a funcao pode alterar a variavel do chamador;
 *      use quando isso for desejado.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Quadros 4 e 5 do livro lado a lado. Teste: 5 -> valor: num = 5, resp = 25;
   referencia: num = 25, resp = 25 */
int quadrado_valor(int x)
{
    x = x * x;                   /* altera so a copia */
    return x;
}

int quadrado_ref(int *x)
{
    *x = *x * (*x);              /* altera a variavel original */
    return *x;
}

int main(void)
{
    int num, resp;

    printf("Numero: ");
    scanf("%d", &num);
    resp = quadrado_valor(num);
    printf("Por valor: num = %d, resp = %d\n", num, resp);
    resp = quadrado_ref(&num);
    printf("Por referencia: num = %d, resp = %d\n", num, resp);
    return 0;
}
