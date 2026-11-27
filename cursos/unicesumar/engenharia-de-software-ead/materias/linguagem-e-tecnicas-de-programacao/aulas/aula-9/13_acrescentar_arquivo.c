/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: ACRESCENTAR AO FIM DO ARQUIVO (Aula 07, Demonstracao do modo "a")
 * ============================================================
 *
 * OBJETIVO
 *    Mostrar que o modo "a" preserva o conteudo e grava no final, e
 *    reabrir o arquivo para conferir. Teste: apos executar o 11 e
 *    depois este: Aluno 1, Aluno 2, Aluno 3 e Aluno extra.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   fopen("notas.txt", "a")
 *      Modo "a" (append): abre para escrita no final, sem apagar o que
 *      existe; cria o arquivo se ele nao existir.
 *
 *   fprintf(arq, "Aluno extra\n");
 *      Acrescenta uma linha no final.
 *
 *   fclose + fopen "r"
 *      Fecha para descarregar a gravacao e reabre em modo leitura para
 *      exibir o conteudo.
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
 *    1. Acrescenta uma linha.
 *    2. Fecha e reabre para leitura.
 *    3. Exibe todas as linhas.
 *
 * CUIDADOS
 *    - Cada execucao acrescenta mais uma linha igual: apague o arquivo
 *      para recomecar.
 *    - Compare com o "w", que apagaria tudo.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    FILE *arq = fopen("notas.txt", "a");
    char linha[50];

    if (arq == NULL) {
        printf("Erro ao abrir\n");
        return 1;
    }
    fprintf(arq, "Aluno extra\n");
    fclose(arq);
    arq = fopen("notas.txt", "r");
    if (arq == NULL)
        return 1;
    while (fgets(linha, 50, arq) != NULL)
        printf("%s", linha);
    fclose(arq);
    return 0;
}
