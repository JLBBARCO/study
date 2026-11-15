// * Importação de bibliotecas externas
#include <stdio.h>

static int leituraBancoDeDados(char nomeArquivo[])
{
    printf("%d", nomeArquivo);
}

static int insercaoNoBancoDeDados(char *nomeArquivo[]) {};

static int logFile(char nivel, char mensagem) {
    /*
        * Níveis de inserção no arquivo .log
        - INFO (Nível que indica que a mensagem é só avisando sobre algo)
        - WARNING (Nível que indica um erro não crítico, ou seja, um erro que não faz com que o sistema pare ou quebre partes)
        - ERROR (Nível que indica um erro crítico, ou seja, um erro que faz com que partes ou o programa inteiro quebre)
    */
};

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
        "Devolver Livro",
        "Emprestimos Expirados"};

    return menu(3, options);
}

static int consultarUsuarios() {}

static int cadastrarUsuario()
{
    char nome[50];
}

int main(void) // * Função principal
{
    // * Declarações de chamadas de arquivos externos
    int livros = leituraBancoDeDados("livros.txt");
    int usuarios = leituraBancoDeDados("usuarios.txt");
    int emprestimos = leituraBancoDeDados("emprestimos.txt");

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