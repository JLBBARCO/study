/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: GRAVAR E LER NUMEROS COM FPRINTF E FSCANF (Aula 07, Demonstracao do bloco de arquivos)
 * ============================================================
 *
 * OBJETIVO
 *    Gravar pares codigo e preco e le-los de volta com fscanf,
 *    testando o retorno. Teste: imprime tres linhas Codigo n: R$ x.xx
 *    e 3 registros lidos.
 *
 * COMPONENTES
 *
 *   #include <stdio.h>
 *      Traz as declaracoes das funcoes de entrada e saida: printf
 *      (escrever na tela) e scanf (ler do teclado).
 *
 *   fprintf(arq, "10 5.50\n...")
 *      Grava tres linhas, cada uma com um codigo e um preco separados
 *      por espaco.
 *
 *   fscanf(arq, "%d %f", &codigo, &preco)
 *      Funciona como o scanf, mas le do arquivo. O & e necessario,
 *      como no scanf. Devolve quantos campos conseguiu ler.
 *
 *   == 2
 *      Teste correto do laco: enquanto leu os 2 campos, ha registro.
 *      Ao fim do arquivo (ou dado invalido), devolve menos de 2 e o
 *      laco para.
 *
 *   n++
 *      Conta os registros lidos.
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
 *    1. Cria pontos.txt com tres registros.
 *    2. Reabre para leitura.
 *    3. Le com fscanf ate o retorno diferir de 2 e mostra cada
 *       registro.
 *
 * CUIDADOS
 *    - Sempre compare o retorno do fscanf com o numero de campos
 *      esperado.
 *    - Texto com espacos (titulos) precisa de outro formato; use
 *      palavras unidas com _ nos testes.
 * ============================================================
 */
#include <stdio.h>

int main(void)
{
    FILE *arq = fopen("pontos.txt", "w");
    int codigo, n = 0;
    float preco;

    if (arq == NULL)
        return 1;
    fprintf(arq, "10 5.50\n20 8.00\n30 2.25\n");
    fclose(arq);

    arq = fopen("pontos.txt", "r");
    if (arq == NULL)
        return 1;
    while (fscanf(arq, "%d %f", &codigo, &preco) == 2)
    {
        printf("Codigo %d: R$ %.2f\n", codigo, preco);
        n++;
    }
    fclose(arq);
    printf("%d registros lidos\n", n);
    return 0;
}
