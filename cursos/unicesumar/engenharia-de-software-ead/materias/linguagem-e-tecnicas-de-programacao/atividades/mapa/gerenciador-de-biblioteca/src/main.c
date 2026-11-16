// * Importação de bibliotecas externas
#include <stdio.h>
#include <stdarg.h>
#include <time.h>

static int leituraBancoDeDados(const char nomeArquivo[])
{
    printf("Arquivo carregado: %s\n", nomeArquivo);
    return 0;
}

char *getTimestamp(void)
{
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    static char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", tm);
    return timestamp;
}

const char logFileName[] = ".log"; // * Nome do arquivo de log

static int logFileInit(void)
{
    // * Abrir o arquivo .log no modo de escrita (write)
    FILE *log = fopen(logFileName, "w");
    if (log == NULL)
        return -1;

    // * Escrever a mensagem de inicialização no arquivo .log com o timestamp
    fprintf(log, "[%s] [INFO] Inicializando o sistema...\n", getTimestamp());

    fflush(log); //* Garantir que os dados sejam gravados no arquivo imediatamente
    fclose(log); //* Fechar o arquivo .log
    return 0;
}

static int logFile(const char *nivel, const char *formato, ...)
{
    /*
        * Níveis de inserção no arquivo .log
        - INFO (Nível que indica que a mensagem é só avisando sobre algo)
        - WARNING (Nível que indica um erro não crítico, ou seja, um erro que não faz com que o sistema pare ou quebre partes)
        - ERROR (Nível que indica um erro crítico, ou seja, um erro que faz com que partes ou o programa inteiro quebre)
    */

    // * Abrir o arquivo .log no modo de anexar (append)
    FILE *log = fopen(logFileName, "a");
    if (log == NULL)
        return -1;

    // * Escrever a mensagem no arquivo .log com o timestamp e o nível
    fprintf(log, "[%s] [%s] ", getTimestamp(), nivel);

    va_list args;
    va_start(args, formato);
    vfprintf(log, formato, args);
    va_end(args);

    fprintf(log, "\n"); // * Adicionar uma nova linha após a mensagem

    fflush(log); //* Garantir que os dados sejam gravados no arquivo imediatamente
    fclose(log); //* Fechar o arquivo .log
    return 0;
}

static int barraDeSeparacao(void) // * barra de separação
{
    printf("--------------------------------------\n");
    return 0;
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

static int consultarUsuarios(void)
{
    return 0;
}

static int cadastrarUsuario(void)
{
    return 0;
}

int main(void) // * Função principal
{
    logFileInit(); // * Inicialização do arquivo .log

    // * Declarações de chamadas de arquivos externos
    leituraBancoDeDados("livros.txt");      // * Chamada da função de leitura do banco de dados para livros
    leituraBancoDeDados("usuarios.txt");    // * Chamada da função de leitura do banco de dados para usuarios
    leituraBancoDeDados("emprestimos.txt"); // * Chamada da função de leitura do banco de dados para emprestimos

    cabecalho();                                              // * Chamada do cabeçalho
    int opcaoPrincipal = menuPrincipal();                     // * Chamada do menu principal
    logFile("INFO", "Menu Principal Acessado");               // * Chamada do log de acesso ao menu principal
    logFile("INFO", "Opção Selecionada: %d", opcaoPrincipal); // * Chamada do log de opção selecionada no menu principal

    switch (opcaoPrincipal)
    {
    case 0:
        break;
    case 1:
    {
        int opcaoUsuarios = menuDeUsuarios(); // * Chamada do menu de usuarios
        switch (opcaoUsuarios)
        {
        case 0:
            break;
        case 1:
            consultarUsuarios();
            break;
        case 2:
            cadastrarUsuario();
            break;
        }
        break;
    }
    case 2:
        // * Tratamento da opção 2
        break;
    case 3:
        // * Tratamento da opção 3
        break;
    }

    return 0;
}