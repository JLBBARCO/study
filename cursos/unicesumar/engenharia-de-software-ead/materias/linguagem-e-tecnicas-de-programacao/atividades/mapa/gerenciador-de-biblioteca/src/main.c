// * Importação de bibliotecas externas
#include <stdio.h>
#include <stdarg.h>
#include <string.h>
#include <time.h>

// * Declaração de variáveis globais
char *usuarios;
char *livros;
char *emprestimos;

char *getTimestamp(char hora)
{
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    static char timestamp[20];
    if (hora == 1)
        strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", tm);
    else
        strftime(timestamp, sizeof(timestamp), "%Y-%m-%d", tm);
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
    fprintf(log, "[%s] [INFO] Inicializando o sistema...\n", getTimestamp(1));

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
    fprintf(log, "[%s] [%s] ", getTimestamp(1), nivel);

    va_list args;
    va_start(args, formato);
    vfprintf(log, formato, args);
    va_end(args);

    fprintf(log, "\n"); // * Adicionar uma nova linha após a mensagem

    fflush(log); //* Garantir que os dados sejam gravados no arquivo imediatamente
    fclose(log); //* Fechar o arquivo .log
    return 0;
}

static int leituraBancoDeDados(const char *arquivo)
{
    FILE *arquivoTXT = fopen(arquivo, "r");

    if (arquivoTXT != NULL)
    {
        fclose(arquivoTXT);
        return 0;
    }

    logFile("WARNING", "Falha ao abrir o arquivo %s! Criando um novo...", arquivo);

    arquivoTXT = fopen(arquivo, "w");
    if (arquivoTXT == NULL)
    {
        logFile("ERROR", "Falha ao criar o arquivo %s!", arquivo);
        return -1;
    }

    logFile("INFO", "Arquivo %s criado com sucesso!", arquivo);

    const char *cabecalho = NULL;
    if (strcmp(arquivo, "usuarios.txt") == 0)
    {
        cabecalho = "id;nomeCompleto;curso;telefone;dataCadastro\n";
    }
    else if (strcmp(arquivo, "livros.txt") == 0)
    {
        cabecalho = "id;titulo;autor;editora;anoDePublicacao;status\n";
    }
    else if (strcmp(arquivo, "emprestimos.txt") == 0)
    {
        cabecalho = "id;idUsuario;idLivro;dataEmprestimo;dataDevolucao;status\n";
    }

    if (cabecalho != NULL && fprintf(arquivoTXT, "%s", cabecalho) < 0)
    {
        logFile("ERROR", "Falha ao escrever o cabecalho do arquivo %s!", arquivo);
        fclose(arquivoTXT);
        return -1;
    }

    fclose(arquivoTXT); // * Fechar o arquivo após a criação
    return 0;
}

int inicializacaoBancoDeDados(void)
{
    logFile("INFO", "Inicializando o banco de dados...");

    if (leituraBancoDeDados("usuarios.txt") != 0 ||
        leituraBancoDeDados("livros.txt") != 0 ||
        leituraBancoDeDados("emprestimos.txt") != 0)
    {
        return -1;
    }

    return 0;
}

int inserirNoBancoDeDados(const char *arquivo, const char *registro)
{
    FILE *arquivoTXT = fopen(arquivo, "a");
    if (arquivoTXT == NULL)
    {
        logFile("ERROR", "Falha ao abrir o arquivo %s para inserção!", arquivo);
        return -1;
    }

    if (fprintf(arquivoTXT, "%s\n", registro) < 0)
    {
        logFile("ERROR", "Falha ao escrever no arquivo %s!", arquivo);
        fclose(arquivoTXT);
        return -1;
    }

    fclose(arquivoTXT); // * Fechar o arquivo após a inserção
    logFile("INFO", "Registro inserido com sucesso no arquivo %s!", arquivo);
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

static int menu(int maximum, const char *options[], const char *title)
{
    barraDeSeparacao();
    if (title != NULL)
    {
        printf("%s\n", title);
        barraDeSeparacao();
    }
    for (int i = 0; i <= maximum; i++)
    {
        printf("%d - %s\n", i, options[i]);
    }
    barraDeSeparacao();

    return leituraDeOpcoes(maximum);
}

void cadastrarUsuario(void)
{
    logFile("INFO", "Cadastro de usuário acessado");
    barraDeSeparacao();
    printf("Cadastro de usuario\n");
    barraDeSeparacao();

    // * Estrutura para armazenar os dados do usuário
    struct Usuario
    {
        int matricula;
        char nomeCompleto[100], curso[50], telefone[15];
        char dataCadastro[11]; // * Data de cadastro no formato YYYY-MM-DD
    };

    struct Usuario novoUsuario;
    novoUsuario.dataCadastro[10] = '\0'; // * Inicializar a string com o caractere de fim de string
    strcpy(novoUsuario.dataCadastro, getTimestamp(0));
}

void gerenciarUsuarios(void)
{
    logFile("INFO", "Gerenciamento de usuários acessado");

    int opcao;
    const char *options[] = {
        "Voltar",
        "Cadastrar Usuario",
        "Listar Usuarios",
        "Editar Usuario",
        "Excluir Usuario"};
    do
    {
        opcao = menu(4, options, "Gerenciamento de Usuarios");

        switch (opcao)
        {
        case 0:
            logFile("INFO", "Voltando ao menu principal");
            break;
        case 1:
            cadastrarUsuario();
            break;
        }
    } while (opcao != 0);
}

int main(void) // * Função principal
{
    logFileInit();               // * Inicialização do arquivo .log
    inicializacaoBancoDeDados(); // * Inicialização do banco de dados
    cabecalho();                 // * Chamada do cabeçalho

    int opcaoPrincipal;
    const char *options[] = {
        "Sair",
        "Usuarios",
        "Livros",
        "Emprestimos"};
    do
    {
        opcaoPrincipal = menu(3, options, NULL); // * Chamada do menu principal

        logFile("INFO", "Menu Principal Acessado");               // * Chamada do log de acesso ao menu principal
        logFile("INFO", "Opção Selecionada: %d", opcaoPrincipal); // * Chamada do log de opção selecionada no menu principal

        switch (opcaoPrincipal)
        {
        case 0:
            logFile("INFO", "Saindo do programa");
            printf("Saindo do programa...\n");
            break;
        case 1:
            gerenciarUsuarios();
            break;
        case 2:
            break;
        case 3:
            break;
        }
    } while (opcaoPrincipal != 0);
}