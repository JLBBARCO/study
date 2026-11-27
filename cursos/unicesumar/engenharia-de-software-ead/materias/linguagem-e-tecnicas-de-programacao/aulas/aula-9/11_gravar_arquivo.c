/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: GRAVAR UM ARQUIVO DE TEXTO (Aula 07, Slide 20)
 * ============================================================
 *
 * OBJETIVO
 *    Criar um arquivo de texto e gravar tres linhas nele. Teste: cria
 *    notas.txt com Aluno 1, Aluno 2 e Aluno 3, uma por linha.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   FILE *arq
 *      Ponteiro que representa o arquivo aberto. O tipo FILE vem de
 *      stdio.h.
 *
 *   fopen("notas.txt", "w")
 *      Abre o arquivo para escrita. Modo "w" cria o arquivo, ou apaga
 *      o conteudo se ele ja existir. Devolve o ponteiro, ou NULL se a
 *      abertura falhar.
 *
 *   if (arq == NULL)
 *      Testa a falha (caminho invalido, sem permissao, disco cheio).
 *      Nunca use o ponteiro sem testar.
 *
 *   fprintf(arq, ...)
 *      Igual ao printf, mas escreve no arquivo, que vai como primeiro
 *      argumento.
 *
 *   fclose(arq);
 *      Fecha o arquivo e garante que os dados foram gravados. Sempre
 *      feche o que abriu.
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
 *    1. Abre notas.txt para escrita e testa o NULL.
 *    2. Grava tres linhas com fprintf.
 *    3. Fecha o arquivo.
 *
 * CUIDADOS
 *    - O arquivo e criado na pasta de trabalho do programa; no CLion,
 *      normalmente a pasta cmake-build-debug.
 *    - O modo "w" apaga o conteudo anterior: cuidado ao reexecutar.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    FILE *arq = fopen("notas.txt", "w");
    int i;

    if (arq == NULL) {
        printf("Erro ao abrir\n");
        return 1;
    }
    for (i = 1; i <= 3; i++)
        fprintf(arq, "Aluno %d\n", i);
    fclose(arq);
    return 0;
}
