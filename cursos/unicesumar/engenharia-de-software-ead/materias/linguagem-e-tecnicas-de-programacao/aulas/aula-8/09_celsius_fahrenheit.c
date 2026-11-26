/*
 * ============================================================
 * EXPLICACAO DO PROGRAMA: CELSIUS PARA FAHRENHEIT (Aula 07, Slide 16 (Problema 1))
 * ============================================================
 *
 * OBJETIVO
 *    Funcao que converte temperatura de Celsius para Fahrenheit.
 *    Teste: 100 -> 212.00; 0 -> 32.00.
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
 *   float celsius_para_f(float c)
 *      Recebe um float e devolve um float, sem interagir com o
 *      usuario: a funcao so calcula.
 *
 *   c * 1.8f + 32
 *      Formula F = C * 1,8 + 32. O sufixo f indica constante float.
 *
 *   scanf("%f", &celsius)
 *      %f le um float; o & entrega o endereco da variavel.
 *
 *   %.2f
 *      Imprime com duas casas decimais.
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
 *    1. O main le a temperatura.
 *    2. Chama a funcao de conversao.
 *    3. Imprime as duas temperaturas.
 *
 * CUIDADOS
 *    - Separar calculo (funcao) de entrada e saida (main) facilita
 *      testar.
 *    - Teste valores conhecidos: 0 e 100.
 * ============================================================
 */
#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Problema 1 da Unidade 5. Teste: 100 -> 212.00; 0 -> 32.00 */
float celsius_para_f(float c)
{
    return c * 1.8f + 32;
}

int main(void)
{
    float celsius;

    printf("Temperatura em Celsius: ");
    scanf("%f", &celsius);
    printf("%.2f C = %.2f F\n", celsius, celsius_para_f(celsius));
    return 0;
}
