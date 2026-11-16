#include <stdio.h>

int main()
{
    char s[10];

    printf("Digite algo (scanf convencional): ");
    scanf("%s", s);
    fflush(stdin); // * Limpa o buffer de entrada, evitando que o próximo scanf seja ignorado devido a caracteres de nova linha remanescentes no buffer.

    printf("Resultado: %s\n\n", s);

    printf("Digite algo (scanf aprimorado): ");
    // * Lê no máximo 10 caracteres, excluindo o caractere de nova linha
    scanf("%9[^\n]s", s); //* %s continua sendo o marcador de inserção de string, mas o 9 indica o tamanho máximo da string a ser lida (precisa ser um caractere a menos que o buffer), e o [^\n] indica que tudo o que estiver antes de uma quebra de linha será lido.
    fflush(stdin);

    printf("Resultado: %s\n\n", s);
}