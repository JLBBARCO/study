#define _CRT_SECURE_NO_WARNINGS /* exigido pelo MSVC para usar scanf */
#include <stdio.h>

/* Slide 21: erros classicos. Compile com -Wall -Wextra e leia os avisos.
   O laco infinito foi limitado por um contador de seguranca para nao travar a aula. */
int main(void)
{
    int i, n = 3, voltas = 0, soma_ok = 0;
    int soma;               /* erro 4: sem valor inicial (lixo de memoria) */

    for (i = 0; i < 3; i++);          /* erro 1: ; encerra o laco */
    printf("Executou %d\n", i);       /* i vale 3, e o printf rodou uma vez so */

    while (n > 0)                     /* erro 2: n nunca e atualizado */
    {
        if (++voltas == 5) break;     /* trava de seguranca da demonstracao */
    }
    printf("Voltas ate a trava: %d\n", voltas);

    for (i = 0; i <= 3; i++) soma_ok++;   /* erro 3: <= faz 4 voltas, nao 3 */
    printf("Voltas com <=: %d\n", soma_ok);

    soma = 0;                          /* correcao do erro 4 */
    soma += 5;
    printf("Soma: %d\n", soma);
    return 0;
}
