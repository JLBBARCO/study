/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: CONTAR LINHAS DE UM ARQUIVO (Aula 07, Pratica do bloco de arquivos)
 * ============================================================
 *
 * OBJETIVO
 *    Contar quantas linhas tem um arquivo de texto. Teste: com
 *    notas.txt do programa 11: 3 linhas; sem o arquivo: Arquivo nao
 *    encontrado.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   int total = 0;
 *      Contador, iniciado em 0.
 *
 *   while (fgets(...) != NULL) total++;
 *      Cada leitura bem-sucedida e uma linha; o laco para no fim do
 *      arquivo.
 *
 *   printf("%d linhas\n", total);
 *      Exibe o resultado depois de fechar o arquivo.
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
 *    1. Abre o arquivo e testa o NULL.
 *    2. Conta as linhas lidas.
 *    3. Fecha e imprime o total.
 *
 * CUIDADOS
 *    - Linhas com mais de 49 caracteres seriam contadas em pedacos;
 *      para o exercicio, e suficiente.
 *    - Com um arquivo vazio, o total e 0.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    FILE *arq = fopen("notas.txt", "r");
    char linha[50];
    int total = 0;

    if (arq == NULL)
    {
        printf("Arquivo nao encontrado\n");
        return 1;
    }
    while (fgets(linha, 50, arq) != NULL)
        total++;
    fclose(arq);
    printf("%d linhas\n", total);
    return 0;
}
