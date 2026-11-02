// * Importações internas
#include <stdio.h>

int mainMenu()
{
    printf("----------------------\n");
    printf("0 - Sair\n");
    printf("1 - Consultar Livros\n");
    printf("2 - Consultar Clientes\n");
    printf("3 - Cadastrar Livro\n");
    printf("4 - Cadastrar Cliente\n");
    printf("----------------------\n");

    int option;

    do // * Loop de validação do dado do usuário
    {
        printf("Escolha: ");
        scanf("%d \n", option);
    } while (option < 0 || option > 4);

    return option;
}

int main()
{
    mainMenu();
}