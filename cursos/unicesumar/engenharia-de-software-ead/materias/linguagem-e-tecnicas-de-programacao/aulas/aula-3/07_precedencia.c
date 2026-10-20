/*
 * 07_precedencia.c
 * Slides: Precedencia dos operadores / Pratica: preveja a precedencia
 *
 * Ordem, da MAIOR para a MENOR prioridade:
 *   !  ++  --
 *   *  /  %
 *   +  -
 *   <  <=  >  >=
 *   ==  !=
 *   &&
 *   ||
 * Operadores de mesma prioridade sao avaliados da esquerda para a direita.
 * Na duvida, use parenteses: eles sempre vencem.
 *
 * Observacao: o GCC avisa (-Wparentheses) sobre "&&" dentro de "||" sem
 * parenteses. E justamente o ponto da aula: o aviso existe porque essa
 * expressao confunde quem le.
 */
#include <stdio.h>

int main()
{
    printf("2 + 3 * 4     = %d\n", 2 + 3 * 4);       /* 14: * antes de +   */
    printf("(2 + 3) * 4   = %d\n", (2 + 3) * 4);     /* 20: parenteses     */
    printf("10 - 4 - 3    = %d\n", 10 - 4 - 3);      /* 3: (10-4)-3, esq. para dir. */

    printf("5 > 3 && 2 > 4 = %d\n", 5 > 3 && 2 > 4);   /* (5>3) && (2>4) -> 1 && 0 -> 0 */
    printf("!0 || 0 && 0   = %d\n", !0 || 0 && 0);     /* (!0) || (0 && 0) -> 1 || 0 -> 1 */
    printf("20 %% 6 * 2     = %d\n", 20 % 6 * 2);      /* (20 % 6) * 2 -> 2 * 2 -> 4 */

    /* Versao com parenteses explicitos: mesmo resultado, leitura facil. */
    printf("(!0) || (0 && 0) = %d\n", (!0) || (0 && 0));
    return 0;
}
