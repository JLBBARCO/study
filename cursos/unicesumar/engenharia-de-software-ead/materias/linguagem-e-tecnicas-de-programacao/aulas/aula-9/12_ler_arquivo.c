/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: LER UM ARQUIVO DE TEXTO (Aula 07, Slide 21)
 * ============================================================
 *
 * OBJETIVO
 *    Ler um arquivo linha por linha ate o fim e exibir na tela.
 *    Execute antes o programa 11. Teste: imprime Aluno 1, Aluno 2 e
 *    Aluno 3; sem notas.txt, imprime Erro ao abrir.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   fopen("notas.txt", "r")
 *      Modo "r": abre para leitura. Se o arquivo nao existir, devolve
 *      NULL.
 *
 *   char linha[50];
 *      Buffer que recebe cada linha lida (ate 49 caracteres mais o
 *      \0).
 *
 *   fgets(linha, 50, arq)
 *      Le uma linha do arquivo, incluindo o \n, e a guarda em linha.
 *      Devolve NULL quando nao ha mais nada para ler (fim do arquivo
 *      ou erro).
 *
 *   while (fgets(...) != NULL)
 *      Forma correta de ler ate o fim: o teste esta no proprio retorno
 *      do fgets.
 *
 *   printf("%s", linha)
 *      Nao precisa de \n no formato, porque a linha ja guarda o dela.
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
 *    1. Abre para leitura e testa o NULL.
 *    2. Le linha por linha ate fgets devolver NULL.
 *    3. Fecha o arquivo.
 *
 * CUIDADOS
 *    - Evite while (!feof(arq)): o feof so fica verdadeiro depois de
 *      uma leitura falhar, e o laco repete a ultima linha.
 *    - Linhas maiores que 49 caracteres sao lidas em pedacos.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    FILE *arq = fopen("notas.txt", "r");
    char linha[50];

    if (arq == NULL) {
        printf("Erro ao abrir\n");
        return 1;
    }
    while (fgets(linha, 50, arq) != NULL)
        printf("%s", linha);
    fclose(arq);
    return 0;
}
