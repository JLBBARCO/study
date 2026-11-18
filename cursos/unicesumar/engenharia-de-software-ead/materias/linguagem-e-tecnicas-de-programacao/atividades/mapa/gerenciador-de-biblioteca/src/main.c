// * Importação de bibliotecas externas
#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// * Declaração de variáveis globais
typedef struct // * Estrutura para armazenar os dados dos usuários
{
    int matricula;
    char nomeCompleto[100], curso[50], telefone[15], dataCadastro[11];
} usuario;
typedef struct // * Estrutura para armazenar os dados dos livros
{
    int idLivro, anoDePublicacao, numeroExDisp, status; // * status: 0 = indisponível, 1 = disponível
    char titulo[100], autor[80], editora[60];
} livros;
typedef struct // * Estrutura para armazenar os dados dos empréstimos
{
    int idEmprestimo, matriculaUsuario, idLivro, status; // * status: 0 = devolvido, 1 = ativo
    char dataEmprestimo[11], dataDevolucaoPrevista[11];
} emprestimos;

// * Conteúdo textual carregado dos arquivos do banco de dados
static char *dadosUsuarios = NULL;
static char *dadosLivros = NULL;
static char *dadosEmprestimos = NULL;

static int logFile(char *logFileName, char *nomeVariavel, const char *nivel, const char *formato, ...);

// * Converte uma linha de usuarios.txt para a estrutura usuario
static int parse_linha(const char *linha, usuario *novoUsuario)
{
    char matricula[20];
    int camposLidos = sscanf(linha, "%19[^;];%99[^;];%49[^;];%14[^;];%10[^\r\n]",
                             matricula, novoUsuario->nomeCompleto,
                             novoUsuario->curso, novoUsuario->telefone,
                             novoUsuario->dataCadastro);

    if (camposLidos != 5 || sscanf(matricula, "%d", &novoUsuario->matricula) != 1)
        return 0;

    return 1;
}

// * Converte uma linha de livros.txt para a estrutura livros
static int parse_linha_livro(const char *linha, livros *novoLivro)
{
    int camposLidos = sscanf(linha, "%d;%99[^;];%79[^;];%59[^;];%d;%d",
                             &novoLivro->idLivro, novoLivro->titulo,
                             novoLivro->autor, novoLivro->editora,
                             &novoLivro->anoDePublicacao, &novoLivro->status);

    novoLivro->numeroExDisp = 0;
    return camposLidos == 6;
}

// * Converte uma linha de emprestimos.txt para a estrutura emprestimos
static int parse_linha_emprestimo(const char *linha, emprestimos *novoEmprestimo)
{
    int camposLidos = sscanf(linha, "%d;%d;%d;%10[^;];%10[^;];%d",
                             &novoEmprestimo->idEmprestimo,
                             &novoEmprestimo->matriculaUsuario,
                             &novoEmprestimo->idLivro,
                             novoEmprestimo->dataEmprestimo,
                             novoEmprestimo->dataDevolucaoPrevista,
                             &novoEmprestimo->status);

    return camposLidos == 6;
}

// * Procura um livro pelo seu identificador
static int buscarLivroPorId(int idLivro, livros *livroEncontrado)
{
    char linha[512];
    FILE *arquivoLivros = fopen("livros.txt", "r");

    if (arquivoLivros == NULL)
        return 0;

    while (fgets(linha, sizeof(linha), arquivoLivros) != NULL)
    {
        if (strncmp(linha, "id;", 3) == 0 || !parse_linha_livro(linha, livroEncontrado))
            continue;

        if (livroEncontrado->idLivro == idLivro)
        {
            fclose(arquivoLivros);
            return 1;
        }
    }

    fclose(arquivoLivros);
    return 0;
}

static int carregarArquivoNaVariavel(const char *arquivo, char **destino)
{
    FILE *arquivoTXT = fopen(arquivo, "r");
    if (arquivoTXT == NULL)
    {
        logFile(".log", NULL, "ERROR", "Falha ao abrir o arquivo %s para leitura!", arquivo);
        return -1;
    }

    if (fseek(arquivoTXT, 0, SEEK_END) != 0)
    {
        fclose(arquivoTXT);
        logFile(".log", NULL, "ERROR", "Falha ao determinar o tamanho do arquivo %s!", arquivo);
        return -1;
    }

    long tamanho = ftell(arquivoTXT);
    if (tamanho < 0)
    {
        fclose(arquivoTXT);
        logFile(".log", NULL, "ERROR", "Falha ao ler o tamanho do arquivo %s!", arquivo);
        return -1;
    }

    if (fseek(arquivoTXT, 0, SEEK_SET) != 0)
    {
        fclose(arquivoTXT);
        logFile(".log", NULL, "ERROR", "Falha ao retornar ao inicio do arquivo %s!", arquivo);
        return -1;
    }

    char *conteudo = (char *)malloc((size_t)tamanho + 1);
    if (conteudo == NULL)
    {
        fclose(arquivoTXT);
        logFile(".log", NULL, "ERROR", "Falha ao alocar memoria para o arquivo %s!", arquivo);
        return -1;
    }

    size_t leitura = fread(conteudo, 1, (size_t)tamanho, arquivoTXT);
    conteudo[leitura] = '\0';
    fclose(arquivoTXT);

    free(*destino);
    *destino = conteudo;
    return 0;
}

// * Função para obter o timestamp atual, com ou sem hora, dependendo do parâmetro 'hora'
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

// * Função para criar o arquivo de log caso não exista, e caso exista, limpar o conteúdo do arquivo
static int logFileInit(char *logFileName)
{
    FILE *log = fopen(logFileName, "w");
    if (log == NULL)
        return -1;
    fclose(log);
    return 0;
}

// * Função para registrar mensagens em um arquivo de log
static int logFile(char *logFileName, char *nomeVariavel, const char *nivel, const char *formato, ...)
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
    if (nomeVariavel != NULL)
        fprintf(log, "[%s] [%s] [%s] ", getTimestamp(1), nivel, nomeVariavel);
    else
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

// * Função para ler o banco de dados a partir de um arquivo
static int leituraBancoDeDados(const char *arquivo)
{
    FILE *arquivoTXT = fopen(arquivo, "r");

    if (arquivoTXT != NULL)
    {
        fclose(arquivoTXT);
    }
    else
    {
        logFile(".log", NULL, "WARNING", "Falha ao abrir o arquivo %s! Criando um novo...", arquivo);

        arquivoTXT = fopen(arquivo, "w");
        if (arquivoTXT == NULL)
        {
            logFile(".log", NULL, "ERROR", "Falha ao criar o arquivo %s!", arquivo);
            return -1;
        }

        logFile(".log", NULL, "INFO", "Arquivo %s criado com sucesso!", arquivo);

        const char *cabecalho = NULL;
        if (strcmp(arquivo, "usuarios.txt") == 0)
        {
            cabecalho = "matricula;nomeCompleto;curso;telefone;dataCadastro\n";
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
            logFile(".log", NULL, "ERROR", "Falha ao escrever o cabecalho do arquivo %s!", arquivo);
            fclose(arquivoTXT);
            return -1;
        }
        fclose(arquivoTXT);
    }

    // * Carrega o conteúdo completo em variáveis globais para uso posterior
    if (strcasecmp(arquivo, "usuarios.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosUsuarios) != 0)
            return -1;
        logFile("print.log", "usuarios", "INFO", "%s", dadosUsuarios);
    }
    else if (strcasecmp(arquivo, "livros.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosLivros) != 0)
            return -1;
        logFile("print.log", "livros", "INFO", "%s", dadosLivros);
    }
    else if (strcasecmp(arquivo, "emprestimos.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosEmprestimos) != 0)
            return -1;
        logFile("print.log", "emprestimos", "INFO", "%s", dadosEmprestimos);
    }
    return 0;
}

// * Função para inicializar o banco de dados, lendo os arquivos necessários
int inicializacaoBancoDeDados(void)
{
    logFile(".log", NULL, "INFO", "Inicializando o banco de dados...");

    if (leituraBancoDeDados("usuarios.txt") != 0 ||
        leituraBancoDeDados("livros.txt") != 0 ||
        leituraBancoDeDados("emprestimos.txt") != 0)
    {
        return -1;
    }

    return 0;
}

// * Função para inserir dados no banco de dados
int inserirNoBancoDeDados(const char *arquivo, const char *registro)
{
    FILE *arquivoLeitura = fopen(arquivo, "r");
    if (arquivoLeitura != NULL)
    {
        char linha[512];
        while (fgets(linha, sizeof(linha), arquivoLeitura) != NULL)
        {
            linha[strcspn(linha, "\r\n")] = '\0';
            if (strcmp(linha, registro) == 0)
            {
                fclose(arquivoLeitura);
                logFile(".log", NULL, "WARNING", "Registro duplicado ignorado no arquivo %s!", arquivo);
                return 1;
            }
        }
        fclose(arquivoLeitura);
    }

    FILE *arquivoTXT = fopen(arquivo, "a");
    if (arquivoTXT == NULL)
    {
        logFile(".log", NULL, "ERROR", "Falha ao abrir o arquivo %s para inserção!", arquivo);
        return -1;
    }

    if (fprintf(arquivoTXT, "%s\n", registro) < 0)
    {
        logFile(".log", NULL, "ERROR", "Falha ao escrever no arquivo %s!", arquivo);
        fclose(arquivoTXT);
        return -1;
    }

    fclose(arquivoTXT); // * Fechar o arquivo após a inserção
    logFile(".log", NULL, "INFO", "Registro inserido com sucesso no arquivo %s!", arquivo);
    return 0;
}

// * Função para exibir uma barra de separação
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

// * Função para ler as opções do usuário
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

// * Função para exibir o menu principal
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

// * Função para cadastrar um novo usuário
void cadastrarUsuario(void)
{
    logFile(".log", NULL, "INFO", "Cadastro de usuário acessado");
    barraDeSeparacao();
    printf("Cadastro de usuario\n");
    barraDeSeparacao();

    usuario novoUsuario = {0};
    novoUsuario.matricula = 0;          // * Inicializar a matrícula com 0
    novoUsuario.nomeCompleto[0] = '\0'; // * Inicializar a string com o caractere de fim de string
    novoUsuario.curso[0] = '\0';        // * Inicializar a string com o caractere de fim de string
    novoUsuario.telefone[0] = '\0';     // * Inicializar a string com o caractere de fim de string
    novoUsuario.dataCadastro[0] = '\0'; // * Inicializar a string com o caractere de fim de string

    printf("Digite a matricula do usuario: ");
    if (scanf("%d", &novoUsuario.matricula) != 1)
    {
        logFile(".log", NULL, "WARNING", "Matricula invalida informada no cadastro");
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        return;
    }

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    printf("Digite o nome completo do usuario: ");
    if (fgets(novoUsuario.nomeCompleto, sizeof(novoUsuario.nomeCompleto), stdin) == NULL)
        return;
    novoUsuario.nomeCompleto[strcspn(novoUsuario.nomeCompleto, "\n")] = '\0';

    printf("Digite o curso do usuario: ");
    if (fgets(novoUsuario.curso, sizeof(novoUsuario.curso), stdin) == NULL)
        return;
    novoUsuario.curso[strcspn(novoUsuario.curso, "\n")] = '\0';

    printf("Digite o telefone do usuario: ");
    if (fgets(novoUsuario.telefone, sizeof(novoUsuario.telefone), stdin) == NULL)
        return;
    novoUsuario.telefone[strcspn(novoUsuario.telefone, "\n")] = '\0';

    strcpy(novoUsuario.dataCadastro, getTimestamp(0));

    char registro[230];
    int tamanho = snprintf(registro, sizeof(registro), "%d;%s;%s;%s;%s",
                           novoUsuario.matricula, novoUsuario.nomeCompleto,
                           novoUsuario.curso, novoUsuario.telefone,
                           novoUsuario.dataCadastro);
    if (tamanho < 0 || (size_t)tamanho >= sizeof(registro))
    {
        logFile(".log", NULL, "ERROR", "Registro do usuario excede o tamanho permitido");
        return;
    }

    int resultadoInsercao = inserirNoBancoDeDados("usuarios.txt", registro);
    if (resultadoInsercao == 0)
    {
        if (carregarArquivoNaVariavel("usuarios.txt", &dadosUsuarios) == 0)
            logFile("print.log", "usuarios", "INFO", "%s", dadosUsuarios);
        printf("Usuario cadastrado com sucesso.\n");
        logFile(".log", NULL, "INFO", "Usuario cadastrado com sucesso: %s", registro);
    }
    else if (resultadoInsercao == 1)
    {
        printf("Usuario ja cadastrado.\n");
    }
}

// * Função para pesquisar um usuário específico pela matrícula ou nome
void pesquisarUsuario(void)
{
    char busca[100];
    char linha[512];
    int encontrado = 0;
    usuario usuarioEncontrado = {0};
    FILE *arquivoTXT = fopen("usuarios.txt", "r");

    if (arquivoTXT == NULL)
    {
        logFile(".log", NULL, "ERROR", "Falha ao abrir usuarios.txt para pesquisa!");
        return;
    }

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    printf("Digite a matricula ou o nome do usuario: ");
    if (fgets(busca, sizeof(busca), stdin) == NULL)
    {
        fclose(arquivoTXT);
        return;
    }
    busca[strcspn(busca, "\r\n")] = '\0';

    while (fgets(linha, sizeof(linha), arquivoTXT) != NULL)
    {
        if (strncmp(linha, "matricula;", 10) == 0 || !parse_linha(linha, &usuarioEncontrado))
            continue;

        char matriculaTexto[20];
        snprintf(matriculaTexto, sizeof(matriculaTexto), "%d", usuarioEncontrado.matricula);
        if (strcmp(busca, matriculaTexto) == 0 ||
            strstr(usuarioEncontrado.nomeCompleto, busca) != NULL)
        {
            printf("Matricula: %d\n", usuarioEncontrado.matricula);
            printf("Nome: %s\n", usuarioEncontrado.nomeCompleto);
            printf("Curso: %s\n", usuarioEncontrado.curso);
            printf("Telefone: %s\n", usuarioEncontrado.telefone);
            printf("Data de cadastro: %s\n", usuarioEncontrado.dataCadastro);
            encontrado = 1;
        }
    }

    fclose(arquivoTXT);
    if (!encontrado)
        printf("Usuario nao encontrado.\n");

    if (encontrado)
    {
        FILE *arquivoEmprestimos = fopen("emprestimos.txt", "r");
        int encontrouEmprestimo = 0;

        if (arquivoEmprestimos != NULL)
        {
            while (fgets(linha, sizeof(linha), arquivoEmprestimos) != NULL)
            {
                emprestimos emprestimo;
                livros livro;

                if (strncmp(linha, "id;", 3) == 0 ||
                    !parse_linha_emprestimo(linha, &emprestimo) ||
                    emprestimo.matriculaUsuario != usuarioEncontrado.matricula ||
                    emprestimo.status != 1)
                    continue;

                if (buscarLivroPorId(emprestimo.idLivro, &livro))
                {
                    printf("\nEmprestimo em aberto:\n");
                    printf("ID do livro: %d\n", livro.idLivro);
                    printf("Titulo: %s\n", livro.titulo);
                    printf("Autor: %s\n", livro.autor);
                    printf("Data do emprestimo: %s\n", emprestimo.dataEmprestimo);
                    encontrouEmprestimo = 1;
                }
            }
            fclose(arquivoEmprestimos);
        }

        if (!encontrouEmprestimo)
            printf("Nenhum emprestimo em aberto para este usuario.\n");
    }
}

// * Função para gerenciar as opções relacionadas aos usuários
void gerenciarUsuarios(void)
{
    logFile(".log", NULL, "INFO", "Gerenciamento de usuários acessado");

    int opcao;
    const char *options[] = {
        "Voltar",
        "Cadastrar Usuario",
        "Pesquisar Usuario",
    };
    do
    {
        opcao = menu(2, options, "Gerenciamento de Usuarios");

        switch (opcao)
        {
        case 0:
            logFile(".log", NULL, "INFO", "Voltando ao menu principal");
            break;
        case 1:
            cadastrarUsuario();
            break;
        case 2:
            pesquisarUsuario();
            break;
        }
    } while (opcao != 0);
}

// * Função para cadastrar um novo livro
void cadastrarLivro(void) {}

// * Função para pesquisar livros por código, título ou autor
void pesquisarLivro(void) {}

// * Função para gerenciar as opções relacionadas aos livros
void gerenciarLivros(void)
{
    logFile(".log", NULL, "INFO", "Gerenciamento de livros acessado");

    int opcao;
    const char *options[] = {
        "Voltar",
        "Cadastrar Livro",
        "Pesquisar Livro",
    };
    do
    {
        opcao = menu(2, options, "Gerenciamento de Livros");

        switch (opcao)
        {
        case 0:
            logFile(".log", NULL, "INFO", "Voltando ao menu principal");
            break;
        case 1:
            cadastrarLivro();
            break;
        case 2:
            pesquisarLivro();
            break;
        }
    } while (opcao != 0);
}

// * Função para cadastrar um novo empréstimo
void cadastrarEmprestimo(void) {}

// * Função para devolver um livro emprestado, atualizando o status do empréstimo e do livro. (O empréstimo pode ser identificado pelo ID do empréstimo ou pelo código do livro e a matrícula do usuário)
void devolverLivro(void) {}

// * Listar empréstimos ativos, mostrando informações do usuário, do livro e a data de empréstimo. (O status do empréstimo deve ser "ativo" para ser listado)
void listarEmprestimosAtivos(void) {}

// * Função para gerenciar as opções relacionadas aos empréstimos
void gerenciarEmprestimos(void)
{
    logFile(".log", NULL, "INFO", "Gerenciamento de empréstimos acessado");

    int opcao;
    const char *options[] = {
        "Voltar",
        "Cadastrar Emprestimo",
        "Devolver Livro",
        "Listar Emprestimos Ativos",
    };
    do
    {
        opcao = menu(3, options, "Gerenciamento de Emprestimos");

        switch (opcao)
        {
        case 0:
            logFile(".log", NULL, "INFO", "Voltando ao menu principal");
            break;
        case 1:
            cadastrarEmprestimo();
            break;
        case 2:
            devolverLivro();
            break;
        case 3:
            listarEmprestimosAtivos();
            break;
        }
    } while (opcao != 0);
}

int main(void) // * Função principal
{
    // * Inicialização do sistema
    logFileInit(".log");         // * Inicialização do arquivo .log
    logFileInit("print.log");    // * Inicialização do arquivo print.log
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

        logFile(".log", NULL, "INFO", "Menu Principal Acessado");               // * Chamada do log de acesso ao menu principal
        logFile(".log", NULL, "INFO", "Opção Selecionada: %d", opcaoPrincipal); // * Chamada do log de opção selecionada no menu principal

        switch (opcaoPrincipal)
        {
        case 0:
            logFile(".log", NULL, "INFO", "Saindo do programa");
            printf("Saindo do programa...\n");
            break;
        case 1:
            gerenciarUsuarios();
            break;
        case 2:
            gerenciarLivros();
            break;
        case 3:
            gerenciarEmprestimos();
            break;
        }
    } while (opcaoPrincipal != 0);
}