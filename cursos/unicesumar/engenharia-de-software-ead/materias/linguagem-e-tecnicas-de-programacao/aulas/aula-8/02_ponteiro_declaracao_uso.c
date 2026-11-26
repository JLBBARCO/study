/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: PONTEIRO: DECLARACAO E USO (Aula 07, Slide 6)
 * ============================================================
 *
 * OBJETIVO
 *    Declarar um ponteiro, guardar nele o endereco de uma variavel e
 *    acessar o conteudo apontado. Teste: x = 10, *p = 10; p e &x
 *    iguais; x = 15.
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
 *   int *p = &x;
 *      O * na declaracao diz que p e um ponteiro para int, ou seja,
 *      guarda o endereco de um int. Aqui recebe o endereco de x.
 *
 *   *p
 *      Fora da declaracao, o * significa "o conteudo do que p aponta".
 *      *p e o proprio x.
 *
 *   *p = 15;
 *      Grava 15 no lugar apontado: x passa a valer 15, sem citar x.
 *
 *   printf com %p
 *      Mostra que o valor de p e o mesmo endereco de &x.
 *
 *   return 0;
 *      Encerra o main informando ao sistema operacional que terminou
 *      sem erro.
 *
 * LOGICA, PASSO A PASSO
 *    1. Cria x e p apontando para ele.
 *    2. Le x por dois caminhos.
 *    3. Altera x pelo ponteiro.
 *
 * CUIDADOS
 *    - O mesmo simbolo * serve para declarar e para acessar o
 *      conteudo; o contexto diz qual.
 *    - Um ponteiro precisa apontar para algo antes de usar o *.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    int x = 10;
    int *p = &x;                 /* p guarda o endereco de x */

    printf("x = %d, *p = %d\n", x, *p);
    printf("p guarda %p, &x e %p\n", (void *) p, (void *) &x);
    *p = 15;                     /* altera x pelo ponteiro */
    printf("x = %d\n", x);
    return 0;
}
