// * Importação de bibliotecas externas
#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
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

#define MAX_USUARIOS 1000
#define MAX_LIVROS 1000
#define MAX_EMPRESTIMOS 5000

// * Conteúdo textual carregado dos arquivos do banco de dados
static char *dadosUsuarios = NULL;
static char *dadosLivros = NULL;
static char *dadosEmprestimos = NULL;
static usuario usuarios[MAX_USUARIOS];
static livros livrosCadastrados[MAX_LIVROS];
static emprestimos emprestimosCadastrados[MAX_EMPRESTIMOS];
static size_t totalUsuarios = 0;
static size_t totalLivros = 0;
static size_t totalEmprestimos = 0;

static int logFile(char *logFileName, char *nomeVariavel, const char *nivel, const char *formato, ...);
static int carregarArquivoNaVariavel(const char *arquivo, char **destino);
static void carregarVetores(void);
static int fazerBackupDosDados(void);

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
    int camposLidos = sscanf(linha, "%d;%99[^;];%79[^;];%59[^;];%d;%d;%d",
                             &novoLivro->idLivro, novoLivro->titulo,
                             novoLivro->autor, novoLivro->editora,
                             &novoLivro->anoDePublicacao,
                             &novoLivro->numeroExDisp, &novoLivro->status);

    if (camposLidos == 7)
        return 1;

    // Compatibilidade com registros antigos, que nao armazenavam exemplares.
    camposLidos = sscanf(linha, "%d;%99[^;];%79[^;];%59[^;];%d;%d",
                         &novoLivro->idLivro, novoLivro->titulo,
                         novoLivro->autor, novoLivro->editora,
                         &novoLivro->anoDePublicacao, &novoLivro->status);

    novoLivro->numeroExDisp = novoLivro->status == 1 ? 1 : 0;
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

// * Funções para inicializar as estruturas de dados
static void inicializarUsuario(usuario *novoUsuario)
{
    memset(novoUsuario, 0, sizeof(*novoUsuario));
}
static void inicializarLivro(livros *novoLivro)
{
    memset(novoLivro, 0, sizeof(*novoLivro));
}
static void inicializarEmprestimo(emprestimos *novoEmprestimo)
{
    memset(novoEmprestimo, 0, sizeof(*novoEmprestimo));
}

// * Função para limpar a entrada do buffer de entrada padrão
static void limparEntrada(void)
{
    int caractere;
    while ((caractere = getchar()) != '\n' && caractere != EOF)
    {
    }
}

// * Função para ler uma linha de texto do usuário, com mensagem de prompt e tamanho máximo
static int lerTexto(const char *mensagem, char *destino, size_t tamanho)
{
    printf("%s", mensagem);
    if (fgets(destino, (int)tamanho, stdin) == NULL)
        return 0;

    if (strchr(destino, '\n') == NULL)
        limparEntrada();
    destino[strcspn(destino, "\r\n")] = '\0';
    return 1;
}

// * Função para copiar o conteúdo de um arquivo para outro
static int copiarArquivo(const char *origem, const char *destino)
{
    FILE *arquivoOrigem = fopen(origem, "rb");
    FILE *arquivoDestino;
    char buffer[4096];
    size_t lidos;

    if (arquivoOrigem == NULL)
        return -1;

    arquivoDestino = fopen(destino, "wb");
    if (arquivoDestino == NULL)
    {
        fclose(arquivoOrigem);
        return -1;
    }

    while ((lidos = fread(buffer, 1, sizeof(buffer), arquivoOrigem)) > 0)
    {
        if (fwrite(buffer, 1, lidos, arquivoDestino) != lidos)
        {
            fclose(arquivoOrigem);
            fclose(arquivoDestino);
            return -1;
        }
    }

    {
        int erroLeitura = ferror(arquivoOrigem);
        int erroOrigem = fclose(arquivoOrigem);
        int erroDestino = fclose(arquivoDestino);
        return erroLeitura || erroOrigem != 0 || erroDestino != 0 ? -1 : 0;
    }
}

// * Função para fazer backup dos dados
static int fazerBackupDosDados(void)
{
    const char *arquivos[] = {"usuarios.txt", "livros.txt", "emprestimos.txt"};
    const char *backups[] = {"usuarios.bak", "livros.bak", "emprestimos.bak"};

    for (size_t i = 0; i < 3; i++)
    {
        if (copiarArquivo(arquivos[i], backups[i]) != 0)
        {
            logFile(".log", NULL, "ERROR", "Falha ao criar o backup de %s", arquivos[i]);
            return -1;
        }
    }
    return 0;
}

static void carregarVetores(void)
{
    char linha[512];
    FILE *arquivo;

    totalUsuarios = totalLivros = totalEmprestimos = 0;

    arquivo = fopen("usuarios.txt", "r");
    if (arquivo != NULL)
    {
        while (fgets(linha, sizeof(linha), arquivo) != NULL &&
               totalUsuarios < MAX_USUARIOS)
            if (strncmp(linha, "matricula;", 10) != 0 &&
                parse_linha(linha, &usuarios[totalUsuarios]))
                totalUsuarios++;
        fclose(arquivo);
    }

    arquivo = fopen("livros.txt", "r");
    if (arquivo != NULL)
    {
        while (fgets(linha, sizeof(linha), arquivo) != NULL &&
               totalLivros < MAX_LIVROS)
            if (strncmp(linha, "id;", 3) != 0 &&
                parse_linha_livro(linha, &livrosCadastrados[totalLivros]))
                totalLivros++;
        fclose(arquivo);
    }

    arquivo = fopen("emprestimos.txt", "r");
    if (arquivo != NULL)
    {
        while (fgets(linha, sizeof(linha), arquivo) != NULL &&
               totalEmprestimos < MAX_EMPRESTIMOS)
            if (strncmp(linha, "id;", 3) != 0 &&
                parse_linha_emprestimo(linha, &emprestimosCadastrados[totalEmprestimos]))
                totalEmprestimos++;
        fclose(arquivo);
    }
}

// * Funções para salvar os dados dos usuários, livros e empréstimos em arquivos
static int salvarUsuarios(void)
{
    FILE *arquivo = fopen("usuarios.txt", "w");
    if (arquivo == NULL)
        return -1;

    fprintf(arquivo, "matricula;nomeCompleto;curso;telefone;dataCadastro\n");
    for (size_t i = 0; i < totalUsuarios; i++)
        fprintf(arquivo, "%d;%s;%s;%s;%s\n",
                usuarios[i].matricula, usuarios[i].nomeCompleto,
                usuarios[i].curso, usuarios[i].telefone, usuarios[i].dataCadastro);

    if (fflush(arquivo) != 0 || fclose(arquivo) != 0)
        return -1;

    carregarArquivoNaVariavel("usuarios.txt", &dadosUsuarios);
    fazerBackupDosDados();
    return 0;
}
static int salvarLivros(void)
{
    FILE *arquivo = fopen("livros.txt", "w");
    if (arquivo == NULL)
        return -1;

    fprintf(arquivo, "id;titulo;autor;editora;anoDePublicacao;numeroExemplares;status\n");
    for (size_t i = 0; i < totalLivros; i++)
        fprintf(arquivo, "%d;%s;%s;%s;%d;%d;%d\n",
                livrosCadastrados[i].idLivro, livrosCadastrados[i].titulo,
                livrosCadastrados[i].autor, livrosCadastrados[i].editora,
                livrosCadastrados[i].anoDePublicacao,
                livrosCadastrados[i].numeroExDisp, livrosCadastrados[i].status);

    if (fflush(arquivo) != 0 || fclose(arquivo) != 0)
        return -1;

    carregarArquivoNaVariavel("livros.txt", &dadosLivros);
    fazerBackupDosDados();
    return 0;
}
static int salvarEmprestimos(void)
{
    FILE *arquivo = fopen("emprestimos.txt", "w");
    if (arquivo == NULL)
        return -1;

    fprintf(arquivo, "id;idUsuario;idLivro;dataEmprestimo;dataDevolucao;status\n");
    for (size_t i = 0; i < totalEmprestimos; i++)
        fprintf(arquivo, "%d;%d;%d;%s;%s;%d\n",
                emprestimosCadastrados[i].idEmprestimo,
                emprestimosCadastrados[i].matriculaUsuario,
                emprestimosCadastrados[i].idLivro,
                emprestimosCadastrados[i].dataEmprestimo,
                emprestimosCadastrados[i].dataDevolucaoPrevista,
                emprestimosCadastrados[i].status);

    if (fflush(arquivo) != 0 || fclose(arquivo) != 0)
        return -1;

    carregarArquivoNaVariavel("emprestimos.txt", &dadosEmprestimos);
    fazerBackupDosDados();
    return 0;
}

// * Procura uma substring sem diferenciar maiúsculas de minúsculas
static int contemTextoSemDistincaoDeCaixa(const char *texto, const char *busca)
{
    if (*busca == '\0')
        return 1;

    for (; *texto != '\0'; texto++)
    {
        const char *textoAtual = texto;
        const char *buscaAtual = busca;

        while (*textoAtual != '\0' && *buscaAtual != '\0' &&
               tolower((unsigned char)*textoAtual) == tolower((unsigned char)*buscaAtual))
        {
            textoAtual++;
            buscaAtual++;
        }

        if (*buscaAtual == '\0')
            return 1;
    }

    return 0;
}

// * Procura um livro pelo seu identificador
static int buscarLivroPorId(int idLivro, livros *livroEncontrado)
{
    for (size_t i = 0; i < totalLivros; i++)
        if (livrosCadastrados[i].idLivro == idLivro)
        {
            if (livroEncontrado != NULL)
                *livroEncontrado = livrosCadastrados[i];
            return 1;
        }

    return 0;
}

// * Procura um usuario pela matricula
static int buscarUsuarioPorMatricula(int matricula, usuario *usuarioEncontrado)
{
    for (size_t i = 0; i < totalUsuarios; i++)
        if (usuarios[i].matricula == matricula)
        {
            if (usuarioEncontrado != NULL)
                *usuarioEncontrado = usuarios[i];
            return 1;
        }

    return 0;
}

// * Calcula uma data adicionando a quantidade informada de dias
static void adicionarDias(const char *dataInicial, int dias, char *dataFinal, size_t tamanho)
{
    struct tm data = {0};

    if (sscanf(dataInicial, "%d-%d-%d", &data.tm_year, &data.tm_mon, &data.tm_mday) != 3)
        return;

    data.tm_year -= 1900;
    data.tm_mon -= 1;
    data.tm_mday += dias;
    mktime(&data);
    strftime(dataFinal, tamanho, "%Y-%m-%d", &data);
}

// * Atualiza um livro na struct e salva o vetor no arquivo
static int atualizarLivroNoArquivo(const livros *livroAtualizado)
{
    for (size_t i = 0; i < totalLivros; i++)
        if (livrosCadastrados[i].idLivro == livroAtualizado->idLivro)
        {
            livros anterior = livrosCadastrados[i];
            livrosCadastrados[i] = *livroAtualizado;
            if (salvarLivros() == 0)
                return 0;
            livrosCadastrados[i] = anterior;
            salvarLivros();
            return -1;
        }

    return -1;
}

// * Atualiza o status de um emprestimo na struct e salva o vetor
static int atualizarEmprestimoNoArquivo(int idEmprestimo)
{
    for (size_t i = 0; i < totalEmprestimos; i++)
        if (emprestimosCadastrados[i].idEmprestimo == idEmprestimo &&
            emprestimosCadastrados[i].status == 1)
        {
            emprestimos anterior = emprestimosCadastrados[i];
            emprestimosCadastrados[i].status = 0;
            if (salvarEmprestimos() == 0)
                return 0;
            emprestimosCadastrados[i] = anterior;
            salvarEmprestimos();
            return -1;
        }

    return -1;
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
            cabecalho = "id;titulo;autor;editora;anoDePublicacao;numeroExemplares;status\n";
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
    if (strcmp(arquivo, "usuarios.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosUsuarios) != 0)
            return -1;
    }
    else if (strcmp(arquivo, "livros.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosLivros) != 0)
            return -1;
    }
    else if (strcmp(arquivo, "emprestimos.txt") == 0)
    {
        if (carregarArquivoNaVariavel(arquivo, &dadosEmprestimos) != 0)
            return -1;
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

    carregarVetores();
    return fazerBackupDosDados();
}

// * Insere diretamente no vetor correspondente e atualiza o arquivo de backup
int inserirNoBancoDeDados(const char *arquivo, const char *registro)
{
    if (strcmp(arquivo, "usuarios.txt") == 0)
    {
        usuario novoUsuario;
        inicializarUsuario(&novoUsuario);
        if (!parse_linha(registro, &novoUsuario))
            return -1;

        for (size_t i = 0; i < totalUsuarios; i++)
            if (usuarios[i].matricula == novoUsuario.matricula)
                return 1;

        if (totalUsuarios >= MAX_USUARIOS)
            return -1;

        usuarios[totalUsuarios++] = novoUsuario;
        if (salvarUsuarios() == 0)
        {
            logFile(".log", NULL, "INFO", "Registro inserido no vetor e no arquivo %s!", arquivo);
            return 0;
        }
        totalUsuarios--;
        salvarUsuarios();
        return -1;
    }

    if (strcmp(arquivo, "livros.txt") == 0)
    {
        livros novoLivro;
        inicializarLivro(&novoLivro);
        if (!parse_linha_livro(registro, &novoLivro))
            return -1;

        for (size_t i = 0; i < totalLivros; i++)
            if (livrosCadastrados[i].idLivro == novoLivro.idLivro)
                return 1;

        if (totalLivros >= MAX_LIVROS)
            return -1;

        livrosCadastrados[totalLivros++] = novoLivro;
        if (salvarLivros() == 0)
        {
            logFile(".log", NULL, "INFO", "Registro inserido no vetor e no arquivo %s!", arquivo);
            return 0;
        }
        totalLivros--;
        salvarLivros();
        return -1;
    }

    if (strcmp(arquivo, "emprestimos.txt") == 0)
    {
        emprestimos novoEmprestimo;
        inicializarEmprestimo(&novoEmprestimo);
        if (!parse_linha_emprestimo(registro, &novoEmprestimo))
            return -1;

        for (size_t i = 0; i < totalEmprestimos; i++)
            if (emprestimosCadastrados[i].idEmprestimo == novoEmprestimo.idEmprestimo)
                return 1;

        if (totalEmprestimos >= MAX_EMPRESTIMOS)
            return -1;

        emprestimosCadastrados[totalEmprestimos++] = novoEmprestimo;
        if (salvarEmprestimos() == 0)
        {
            logFile(".log", NULL, "INFO", "Registro inserido no vetor e no arquivo %s!", arquivo);
            return 0;
        }
        totalEmprestimos--;
        salvarEmprestimos();
        return -1;
    }

    return -1;
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

    usuario novoUsuario;
    inicializarUsuario(&novoUsuario);

    printf("Digite a matricula do usuario: ");
    if (scanf("%d", &novoUsuario.matricula) != 1)
    {
        logFile(".log", NULL, "WARNING", "Matricula invalida informada no cadastro");
        limparEntrada();
        return;
    }

    limparEntrada();
    if (!lerTexto("Digite o nome completo do usuario: ",
                  novoUsuario.nomeCompleto, sizeof(novoUsuario.nomeCompleto)))
        return;
    if (!lerTexto("Digite o curso do usuario: ",
                  novoUsuario.curso, sizeof(novoUsuario.curso)))
        return;
    if (!lerTexto("Digite o telefone do usuario: ",
                  novoUsuario.telefone, sizeof(novoUsuario.telefone)))
        return;

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
    int encontrado = 0;

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    printf("Digite a matricula ou o nome do usuario: ");
    if (fgets(busca, sizeof(busca), stdin) == NULL)
        return;
    busca[strcspn(busca, "\r\n")] = '\0';

    if (busca[0] == '\0')
    {
        printf("Informe pelo menos parte da matricula ou do nome.\n");
        return;
    }

    for (size_t i = 0; i < totalUsuarios; i++)
    {
        usuario *usuarioEncontrado = &usuarios[i];
        char matriculaTexto[20];
        snprintf(matriculaTexto, sizeof(matriculaTexto), "%d", usuarioEncontrado->matricula);

        if (strstr(matriculaTexto, busca) != NULL ||
            contemTextoSemDistincaoDeCaixa(usuarioEncontrado->nomeCompleto, busca))
        {
            printf("\nMatricula: %d\n", usuarioEncontrado->matricula);
            printf("Nome: %s\n", usuarioEncontrado->nomeCompleto);
            printf("Curso: %s\n", usuarioEncontrado->curso);
            printf("Telefone: %s\n", usuarioEncontrado->telefone);
            printf("Data de cadastro: %s\n", usuarioEncontrado->dataCadastro);
            encontrado = 1;

            int encontrouEmprestimo = 0;
            for (size_t j = 0; j < totalEmprestimos; j++)
            {
                emprestimos *emprestimo = &emprestimosCadastrados[j];
                if (emprestimo->matriculaUsuario != usuarioEncontrado->matricula ||
                    emprestimo->status != 1)
                    continue;

                livros livro;
                if (buscarLivroPorId(emprestimo->idLivro, &livro))
                {
                    printf("\nEmprestimo em aberto:\n");
                    printf("ID do livro: %d\n", livro.idLivro);
                    printf("Titulo: %s\n", livro.titulo);
                    printf("Autor: %s\n", livro.autor);
                    printf("Data do emprestimo: %s\n", emprestimo->dataEmprestimo);
                    encontrouEmprestimo = 1;
                }
            }

            if (!encontrouEmprestimo)
                printf("Nenhum emprestimo em aberto para este usuario.\n");
        }
    }

    if (!encontrado)
        printf("Usuario nao encontrado.\n");
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
void cadastrarLivro(void)
{
    logFile(".log", NULL, "INFO", "Cadastro de livro acessado");
    barraDeSeparacao();
    printf("Cadastro de livro\n");
    barraDeSeparacao();

    livros novoLivro;
    inicializarLivro(&novoLivro);

    printf("Digite o codigo do livro: ");
    if (scanf("%d", &novoLivro.idLivro) != 1)
    {
        logFile(".log", NULL, "WARNING", "Codigo de livro invalido informado no cadastro");
        limparEntrada();
        return;
    }

    if (novoLivro.idLivro <= 0)
    {
        printf("O codigo do livro deve ser maior que zero.\n");
        limparEntrada();
        return;
    }

    limparEntrada();
    if (!lerTexto("Digite o titulo do livro: ",
                  novoLivro.titulo, sizeof(novoLivro.titulo)))
        return;
    if (!lerTexto("Digite o autor do livro: ",
                  novoLivro.autor, sizeof(novoLivro.autor)))
        return;
    if (!lerTexto("Digite a editora do livro: ",
                  novoLivro.editora, sizeof(novoLivro.editora)))
        return;

    printf("Digite o ano de publicacao: ");
    if (scanf("%d", &novoLivro.anoDePublicacao) != 1)
    {
        logFile(".log", NULL, "WARNING", "Ano de publicacao invalido informado no cadastro");
        limparEntrada();
        return;
    }

    if (novoLivro.anoDePublicacao <= 0)
    {
        printf("O ano de publicacao deve ser maior que zero.\n");
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        return;
    }

    printf("Digite o numero de exemplares disponiveis: ");
    if (scanf("%d", &novoLivro.numeroExDisp) != 1)
    {
        logFile(".log", NULL, "WARNING", "Numero de exemplares invalido informado no cadastro");
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        return;
    }

    if (novoLivro.numeroExDisp < 0)
    {
        printf("O numero de exemplares nao pode ser negativo.\n");
        limparEntrada();
        return;
    }

    limparEntrada();

    if (novoLivro.titulo[0] == '\0' || novoLivro.autor[0] == '\0' || novoLivro.editora[0] == '\0')
    {
        printf("Titulo, autor e editora sao obrigatorios.\n");
        logFile(".log", NULL, "WARNING", "Cadastro de livro com campo textual vazio");
        return;
    }

    novoLivro.status = novoLivro.numeroExDisp > 0 ? 1 : 0;

    char registro[400];
    int tamanho = snprintf(registro, sizeof(registro), "%d;%s;%s;%s;%d;%d;%d",
                           novoLivro.idLivro, novoLivro.titulo, novoLivro.autor,
                           novoLivro.editora, novoLivro.anoDePublicacao,
                           novoLivro.numeroExDisp, novoLivro.status);

    if (tamanho < 0 || (size_t)tamanho >= sizeof(registro))
    {
        logFile(".log", NULL, "ERROR", "Registro do livro excede o tamanho permitido");
        return;
    }

    int resultadoInsercao = inserirNoBancoDeDados("livros.txt", registro);
    if (resultadoInsercao == 0)
    {
        if (carregarArquivoNaVariavel("livros.txt", &dadosLivros) == 0)
            logFile("print.log", "livros", "INFO", "%s", dadosLivros);
        printf("Livro cadastrado com sucesso.\n");
        logFile(".log", NULL, "INFO", "Livro cadastrado com sucesso: %s", registro);
    }
    else if (resultadoInsercao == 1)
    {
        printf("Livro ja cadastrado.\n");
    }
}

// * Função para pesquisar livros por código, título ou autor
void pesquisarLivro(void)
{
    char busca[100];
    int encontrado = 0;

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    printf("Digite o codigo, titulo ou autor do livro: ");
    if (fgets(busca, sizeof(busca), stdin) == NULL)
        return;
    busca[strcspn(busca, "\r\n")] = '\0';

    if (busca[0] == '\0')
    {
        printf("Informe pelo menos parte do codigo, titulo ou autor.\n");
        return;
    }

    for (size_t i = 0; i < totalLivros; i++)
    {
        livros *livroEncontrado = &livrosCadastrados[i];
        char codigoTexto[20];
        snprintf(codigoTexto, sizeof(codigoTexto), "%d", livroEncontrado->idLivro);

        if (strstr(codigoTexto, busca) != NULL ||
            contemTextoSemDistincaoDeCaixa(livroEncontrado->titulo, busca) ||
            contemTextoSemDistincaoDeCaixa(livroEncontrado->autor, busca))
        {
            printf("\nCodigo: %d\n", livroEncontrado->idLivro);
            printf("Titulo: %s\n", livroEncontrado->titulo);
            printf("Autor: %s\n", livroEncontrado->autor);
            printf("Editora: %s\n", livroEncontrado->editora);
            printf("Ano de publicacao: %d\n", livroEncontrado->anoDePublicacao);
            printf("Exemplares disponiveis: %d\n", livroEncontrado->numeroExDisp);
            printf("Status: %s\n", livroEncontrado->status == 1 ? "Disponivel" : "Emprestado");
            encontrado = 1;
        }
    }

    if (!encontrado)
        printf("Livro nao encontrado.\n");
}

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
void cadastrarEmprestimo(void)
{
    int matriculaUsuario;
    int idLivro;

    logFile(".log", NULL, "INFO", "Cadastro de emprestimo acessado");
    barraDeSeparacao();
    printf("Cadastrar emprestimo\n");
    barraDeSeparacao();

    printf("Digite a matricula do usuario: ");
    if (scanf("%d", &matriculaUsuario) != 1)
    {
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        printf("Matricula invalida.\n");
        return;
    }

    printf("Digite o codigo do livro: ");
    if (scanf("%d", &idLivro) != 1)
    {
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        printf("Codigo de livro invalido.\n");
        return;
    }

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    usuario usuarioEmprestimo;
    livros livroEmprestimo;

    if (!buscarUsuarioPorMatricula(matriculaUsuario, &usuarioEmprestimo))
    {
        printf("Usuario nao encontrado.\n");
        return;
    }

    if (!buscarLivroPorId(idLivro, &livroEmprestimo))
    {
        printf("Livro nao encontrado.\n");
        return;
    }

    if (livroEmprestimo.numeroExDisp <= 0)
    {
        printf("Nao ha exemplares disponiveis deste livro.\n");
        return;
    }

    int novoId = 1;

    for (size_t i = 0; i < totalEmprestimos; i++)
        if (emprestimosCadastrados[i].idEmprestimo >= novoId)
            novoId = emprestimosCadastrados[i].idEmprestimo + 1;

    const char *dataEmprestimo = getTimestamp(0);
    char dataDevolucao[11];
    adicionarDias(dataEmprestimo, 7, dataDevolucao, sizeof(dataDevolucao));

    char registro[200];
    snprintf(registro, sizeof(registro), "%d;%d;%d;%s;%s;1",
             novoId, matriculaUsuario, idLivro,
             dataEmprestimo, dataDevolucao);

    int resultado = inserirNoBancoDeDados("emprestimos.txt", registro);
    if (resultado != 0)
    {
        if (resultado == 1)
            printf("Emprestimo ja cadastrado.\n");
        return;
    }

    livroEmprestimo.numeroExDisp--;
    livroEmprestimo.status = livroEmprestimo.numeroExDisp > 0 ? 1 : 0;

    if (atualizarLivroNoArquivo(&livroEmprestimo) != 0)
    {
        logFile(".log", NULL, "ERROR", "Falha ao atualizar exemplares disponiveis do livro %d", idLivro);
        printf("Emprestimo cadastrado, mas nao foi possivel atualizar o livro.\n");
        return;
    }

    printf("Emprestimo cadastrado com sucesso.\n");
    printf("Usuario: %s\n", usuarioEmprestimo.nomeCompleto);
    printf("Livro: %s\n", livroEmprestimo.titulo);
    printf("Data de devolucao: %s\n", dataDevolucao);
    logFile(".log", NULL, "INFO", "Emprestimo %d cadastrado", novoId);
}

// * Função para devolver um livro emprestado
void devolverLivro(void)
{
    int idEmprestimo;

    logFile(".log", NULL, "INFO", "Devolucao de emprestimo acessada");
    barraDeSeparacao();
    printf("Devolver livro\n");
    barraDeSeparacao();

    printf("Digite o ID do emprestimo: ");
    if (scanf("%d", &idEmprestimo) != 1)
    {
        while (getchar() != '\n' && !feof(stdin))
        {
        }
        printf("ID invalido.\n");
        return;
    }

    while (getchar() != '\n' && !feof(stdin))
    {
    }

    emprestimos emprestimoEncontrado = {0};
    int encontrado = 0;

    for (size_t i = 0; i < totalEmprestimos; i++)
        if (emprestimosCadastrados[i].idEmprestimo == idEmprestimo &&
            emprestimosCadastrados[i].status == 1)
        {
            emprestimoEncontrado = emprestimosCadastrados[i];
            encontrado = 1;
            break;
        }

    if (!encontrado)
    {
        printf("Emprestimo ativo nao encontrado.\n");
        return;
    }

    livros livroDevolvido;
    if (!buscarLivroPorId(emprestimoEncontrado.idLivro, &livroDevolvido))
    {
        printf("Livro associado ao emprestimo nao encontrado.\n");
        return;
    }

    if (atualizarEmprestimoNoArquivo(idEmprestimo) != 0)
    {
        printf("Nao foi possivel atualizar o emprestimo.\n");
        return;
    }

    livroDevolvido.numeroExDisp++;
    livroDevolvido.status = 1;

    if (atualizarLivroNoArquivo(&livroDevolvido) != 0)
    {
        printf("Livro devolvido, mas nao foi possivel atualizar os exemplares.\n");
        return;
    }

    printf("Devolucao registrada com sucesso.\n");
    printf("Exemplares disponiveis: %d\n", livroDevolvido.numeroExDisp);
    logFile(".log", NULL, "INFO", "Emprestimo %d devolvido", idEmprestimo);
}

// * Listar empréstimos ativos
void listarEmprestimosAtivos(void)
{
    int encontrados = 0;

    logFile(".log", NULL, "INFO", "Listagem de emprestimos ativos acessada");
    barraDeSeparacao();
    printf("Emprestimos ativos\n");
    barraDeSeparacao();

    for (size_t i = 0; i < totalEmprestimos; i++)
    {
        emprestimos *emprestimo = &emprestimosCadastrados[i];
        if (emprestimo->status != 1)
            continue;

        usuario usuarioEmprestimo;
        livros livroEmprestimo;

        if (!buscarUsuarioPorMatricula(emprestimo->matriculaUsuario, &usuarioEmprestimo) ||
            !buscarLivroPorId(emprestimo->idLivro, &livroEmprestimo))
            continue;

        printf("\nID do emprestimo: %d\n", emprestimo->idEmprestimo);
        printf("Matricula: %d\n", usuarioEmprestimo.matricula);
        printf("Usuario: %s\n", usuarioEmprestimo.nomeCompleto);
        printf("Codigo do livro: %d\n", livroEmprestimo.idLivro);
        printf("Livro: %s\n", livroEmprestimo.titulo);
        printf("Autor: %s\n", livroEmprestimo.autor);
        printf("Data do emprestimo: %s\n", emprestimo->dataEmprestimo);
        printf("Data prevista de devolucao: %s\n", emprestimo->dataDevolucaoPrevista);
        encontrados++;
    }

    if (!encontrados)
        printf("Nenhum emprestimo ativo encontrado.\n");
}

static int atualizarDataEmprestimoNoArquivo(int idEmprestimo, const char *novaData)
{
    for (size_t i = 0; i < totalEmprestimos; i++)
        if (emprestimosCadastrados[i].idEmprestimo == idEmprestimo &&
            emprestimosCadastrados[i].status == 1)
        {
            emprestimos anterior = emprestimosCadastrados[i];
            strncpy(emprestimosCadastrados[i].dataDevolucaoPrevista, novaData,
                    sizeof(emprestimosCadastrados[i].dataDevolucaoPrevista) - 1);
            emprestimosCadastrados[i].dataDevolucaoPrevista[sizeof(emprestimosCadastrados[i].dataDevolucaoPrevista) - 1] = '\0';

            if (salvarEmprestimos() == 0)
                return 0;

            emprestimosCadastrados[i] = anterior;
            salvarEmprestimos();
            return -1;
        }

    return -1;
}

static void relatorioLivrosMaisEmprestados(void)
{
    int contagens[MAX_LIVROS] = {0};
    int maior = 0;

    barraDeSeparacao();
    printf("Relatorio de livros mais emprestados\n");
    barraDeSeparacao();
    for (size_t i = 0; i < totalEmprestimos; i++)
    {
        for (size_t j = 0; j < totalLivros; j++)
            if (emprestimosCadastrados[i].idLivro == livrosCadastrados[j].idLivro)
            {
                contagens[j]++;
                if (contagens[j] > maior)
                    maior = contagens[j];
                break;
            }
    }

    if (maior == 0)
    {
        printf("Nenhum emprestimo registrado.\n");
        return;
    }
    for (size_t i = 0; i < totalLivros; i++)
        if (contagens[i] == maior)
            printf("Codigo: %d | Titulo: %s | Emprestimos: %d\n",
                   livrosCadastrados[i].idLivro, livrosCadastrados[i].titulo,
                   contagens[i]);
}

static void relatorioUsuariosEmAtraso(void)
{
    const char *hoje = getTimestamp(0);
    int encontrados = 0;

    barraDeSeparacao();
    printf("Relatorio de usuarios com emprestimos em atraso\n");
    barraDeSeparacao();
    for (size_t i = 0; i < totalEmprestimos; i++)
    {
        if (emprestimosCadastrados[i].status != 1 ||
            strcmp(emprestimosCadastrados[i].dataDevolucaoPrevista, hoje) >= 0)
            continue;
        for (size_t j = 0; j < totalUsuarios; j++)
            if (usuarios[j].matricula == emprestimosCadastrados[i].matriculaUsuario)
            {
                printf("Matricula: %d | Usuario: %s | Emprestimo: %d | Vencimento: %s\n",
                       usuarios[j].matricula, usuarios[j].nomeCompleto,
                       emprestimosCadastrados[i].idEmprestimo,
                       emprestimosCadastrados[i].dataDevolucaoPrevista);
                encontrados = 1;
                break;
            }
    }
    if (!encontrados)
        printf("Nenhum usuario com emprestimo em atraso.\n");
}

static void buscaAvancadaLivros(void)
{
    char titulo[100], autor[80], statusTexto[10], anoTexto[12];
    int ano = 0;
    int encontrados = 0;

    limparEntrada();
    printf("Busca avancada (deixe vazio para ignorar o criterio)\n");
    if (!lerTexto("Titulo: ", titulo, sizeof(titulo)) ||
        !lerTexto("Autor: ", autor, sizeof(autor)) ||
        !lerTexto("Ano: ", anoTexto, sizeof(anoTexto)) ||
        !lerTexto("Status (D=disponivel, E=emprestado): ",
                  statusTexto, sizeof(statusTexto)))
        return;
    if (anoTexto[0] != '\0' && (sscanf(anoTexto, "%d", &ano) != 1 || ano <= 0))
    {
        printf("Ano invalido.\n");
        return;
    }

    for (size_t i = 0; i < totalLivros; i++)
    {
        livros *livro = &livrosCadastrados[i];
        int statusValido = statusTexto[0] == '\0' ||
                           (tolower((unsigned char)statusTexto[0]) == 'd' && livro->status == 1) ||
                           (tolower((unsigned char)statusTexto[0]) == 'e' && livro->status == 0);
        if ((titulo[0] == '\0' || contemTextoSemDistincaoDeCaixa(livro->titulo, titulo)) &&
            (autor[0] == '\0' || contemTextoSemDistincaoDeCaixa(livro->autor, autor)) &&
            (ano == 0 || livro->anoDePublicacao == ano) && statusValido)
        {
            printf("Codigo: %d | %s | %s | %d | %s\n", livro->idLivro,
                   livro->titulo, livro->autor, livro->anoDePublicacao,
                   livro->status == 1 ? "Disponivel" : "Emprestado");
            encontrados = 1;
        }
    }
    if (!encontrados)
        printf("Nenhum livro atende aos criterios.\n");
}

static void renovarEmprestimo(void)
{
    int idEmprestimo;
    emprestimos encontrado;
    int localizado = 0;
    char dataRenovada[11];

    limparEntrada();
    inicializarEmprestimo(&encontrado);
    printf("Digite o ID do emprestimo: ");
    if (scanf("%d", &idEmprestimo) != 1)
    {
        limparEntrada();
        printf("ID invalido.\n");
        return;
    }
    limparEntrada();
    for (size_t i = 0; i < totalEmprestimos; i++)
        if (emprestimosCadastrados[i].idEmprestimo == idEmprestimo &&
            emprestimosCadastrados[i].status == 1)
        {
            encontrado = emprestimosCadastrados[i];
            localizado = 1;
            break;
        }
    if (!localizado)
    {
        printf("Emprestimo ativo nao encontrado.\n");
        return;
    }
    adicionarDias(encontrado.dataDevolucaoPrevista, 7, dataRenovada,
                  sizeof(dataRenovada));
    if (atualizarDataEmprestimoNoArquivo(idEmprestimo, dataRenovada) != 0)
    {
        printf("Nao foi possivel renovar o emprestimo.\n");
        return;
    }
    printf("Emprestimo renovado ate %s.\n", dataRenovada);
}

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
        "Renovar Emprestimo",
        "Relatorio de livros mais emprestados",
        "Relatorio de usuarios em atraso",
        "Busca avancada de livros",
    };
    do
    {
        opcao = menu(7, options, "Gerenciamento de Emprestimos");

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
        case 4:
            renovarEmprestimo();
            break;
        case 5:
            relatorioLivrosMaisEmprestados();
            break;
        case 6:
            relatorioUsuariosEmAtraso();
            break;
        case 7:
            buscaAvancadaLivros();
            break;
        }
    } while (opcao != 0);
}

int main(void) // * Função principal
{
    // * Inicialização do sistema
    logFileInit(".log");      // * Inicialização do arquivo .log
    logFileInit("print.log"); // * Inicialização do arquivo print.log
    if (inicializacaoBancoDeDados() != 0)
    {
        fprintf(stderr, "Nao foi possivel inicializar o banco de dados.\n");
        free(dadosUsuarios);
        free(dadosLivros);
        free(dadosEmprestimos);
        return EXIT_FAILURE;
    }
    cabecalho(); // * Chamada do cabeçalho

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

    free(dadosUsuarios);
    free(dadosLivros);
    free(dadosEmprestimos);
    return EXIT_SUCCESS;
}