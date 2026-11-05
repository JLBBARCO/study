// * Importação de bibliotecas externas
#include <stdio.h>

static int barraDeSeparacao(void) // * barra de separação
{
    printf("--------------------------------------\n");
}

void cabecalho(void) // * cabeçalho do programa
{
    barraDeSeparacao();
    printf("----- Gerenciador de Bibliotecas -----\n");
    barraDeSeparacao();
}

static int leituraDeOpcoes(int maximum)
{
    int option;

    do
    {
        int result;

        printf("Escolha: ");

        result = scanf("%d", &option);

        if (result == EOF)
        {
            return 0;
        }

        if (result != 1)
        {
            int character;

            option = -1;
            while ((character = getchar()) != '\n' && character != EOF)
            {
            }
        }
    } while (option < 0 || option > maximum);

    return option;
}

static int menu(int maximum, const char *options[])
{
    barraDeSeparacao();
    for (int i = 0; i <= maximum; i++)
    {
        printf("%d - %s\n", i, options[i]);
    }
    barraDeSeparacao();

    return leituraDeOpcoes(maximum);
}

int menuPrincipal(void)
{
    const char *options[] = {
        "Sair",
        "Usuarios",
        "Livros",
        "Emprestimos"};

    return menu(3, options);
}

int menuDeUsuarios(void) // * Menu de Usuarios
{
    const char *options[] = {
        "Voltar",
        "Consultar Usuarios",
        "Cadastrar Usuario"};

    return menu(2, options);
}

int menuDeLivros(void) // * Menu de Livros
{
    const char *options[] = {
        "Voltar",
        "Consultar Livros",
        "Cadastrar Livro"};

    return menu(2, options);
}

int menuDeEmprestimos(void) // * Menu de Emprestimos
{
    const char *options[] = {
        "Voltar",
        "Novo Emprestimo",
        "Renovar Emprestimo",
        "Emprestimos Expirados"};

    return menu(3, options);
}

int main(void) // * Função principal
{
    cabecalho();                          // * Chamada do cabeçalho
    int opcaoPrincipal = menuPrincipal(); // * Chamada do menu principal

    switch (opcaoPrincipal)
    {
    case 0:
        break;
    case 1:
        int opcaoUsuarios = menuDeUsuarios(); // * Chamada do menu de usuarios
        switch (opcaoUsuarios)
        {
        case 0:
            break;
        }
        break;
    case 2:
        // * Tratamento da opção 2
        break;
    case 3:
        // * Tratamento da opção 3
        break;
    }

    return 0;
}