// * Importações internas
#include <stdio.h>

int mainMenu()
{
    printf("----------------------\n");
    printf("0 - Sair\n");
    printf("1 - Consultar\n");
    printf("2 - Cadastrar\n");
    printf("3 - Empréstimos\n");
    printf("----------------------\n");

    int option;

    do // * Loop de validação do dado do usuário
    {
        printf("Escolha: ");
        scanf("%d \n", option);
    } while (option < 0 || option > 3);

    return option;
}

int consultMenu() // * Menu de consulta
{
    printf("-------------------------\n");
    printf("0 - Voltar\n");
    printf("1 - Consultar Usuários\n");
    printf("2 - Consultar Livros\n");
    printf("3 - Consultar Empréstimos\n");
    printf("-------------------------\n");

    int option;

    do // * Loop de validação do dado do usuário
    {
        printf("Escolha: ");
        scanf("%d", option);
    } while (option < 0 || option > 3);

    return option;
}

int insertMenu() // * Menu de Cadastro
{
    printf("---------------------\n");
    printf("0 - Voltar\n");
    printf("1 - Cadastrar Usuário\n");
    printf("2 - Cadastrar Livro\n");
    printf("---------------------\n");
}