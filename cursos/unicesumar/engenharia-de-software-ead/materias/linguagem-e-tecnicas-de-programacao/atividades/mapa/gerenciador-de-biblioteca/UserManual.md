# Manual do Usuário — Gerenciador de Biblioteca

## 1. Visão geral

O Gerenciador de Biblioteca é um programa de terminal desenvolvido em C para controlar usuários, livros e empréstimos. Os dados são mantidos em arquivos de texto, carregados automaticamente na inicialização e atualizados a cada operação.

## 2. Inicialização e navegação

Ao iniciar, o programa:

1. cria os arquivos de dados que ainda não existirem;
2. carrega usuários, livros e empréstimos;
3. cria ou atualiza os backups dos dados;
4. exibe o menu principal.

Menu principal:

```text
0 - Sair
1 - Usuarios
2 - Livros
3 - Emprestimos
```

Digite o número da opção e pressione **Enter**. A opção `0` retorna ao menu anterior ou encerra o programa. Quando uma entrada numérica é inválida, o programa limpa a entrada e solicita uma nova opção.

## 3. Usuários

Escolha `1 - Usuarios` no menu principal.

### 3.1 Cadastrar usuário

Selecione `1 - Cadastrar Usuario` e informe:

1. matrícula;
2. nome completo;
3. curso;
4. telefone.

A data de cadastro é preenchida automaticamente com a data atual no formato
`AAAA-MM-DD`. A matrícula não pode duplicar um registro existente.

### 3.2 Pesquisar usuário

Selecione `2 - Pesquisar Usuario` e digite uma matrícula ou parte do nome.
A busca por nome não diferencia letras maiúsculas de minúsculas. Para cada
resultado são exibidos os dados cadastrais e os empréstimos ativos associados.

## 4. Livros

Escolha `2 - Livros` no menu principal.

### 4.1 Cadastrar livro

Selecione `1 - Cadastrar Livro` e informe:

1. código do livro, maior que zero;
2. título;
3. autor;
4. editora;
5. ano de publicação, maior que zero;
6. número de exemplares disponíveis, igual ou maior que zero.

Título, autor e editora são obrigatórios. O status é calculado automaticamente:

- `Disponivel`: existe pelo menos um exemplar disponível;
- `Emprestado`: não existe exemplar disponível.

O código do livro não pode duplicar um registro existente.

### 4.2 Pesquisar livro

Selecione `2 - Pesquisar Livro` e informe parte do código, título ou autor.
A busca por título e autor não diferencia maiúsculas de minúsculas. Os resultados
exibem código, título, autor, editora, ano, exemplares disponíveis e status.

## 5. Empréstimos

Escolha `3 - Emprestimos` no menu principal.

### 5.1 Cadastrar empréstimo

Selecione `1 - Cadastrar Emprestimo` e informe:

1. matrícula de um usuário já cadastrado;
2. código de um livro já cadastrado.

O empréstimo só é criado quando há exemplares disponíveis. O sistema gera
automaticamente:

- código sequencial do empréstimo;
- data do empréstimo;
- data prevista de devolução, sete dias depois;
- status `ativo`.

Ao concluir, o número de exemplares disponíveis do livro é reduzido em um.

### 5.2 Devolver livro

Selecione `2 - Devolver Livro` e informe o código do empréstimo ativo.
O status do empréstimo passa para `devolvido` e o número de exemplares disponíveis
do livro aumenta em um.

### 5.3 Listar empréstimos ativos

Selecione `3 - Listar Emprestimos Ativos`. A listagem apresenta o empréstimo,
usuário, livro, data de retirada e data prevista de devolução.

### 5.4 Renovar empréstimo

Selecione `4 - Renovar Emprestimo` e informe o código de um empréstimo ativo.
A data prevista de devolução é estendida por mais sete dias a partir da data
prevista atual.

## 6. Relatórios e busca avançada

As opções adicionais ficam no menu de empréstimos.

### 6.1 Relatório de livros mais emprestados

Selecione `5 - Relatorio de livros mais emprestados`. O sistema conta todos os
empréstimos registrados e exibe os livros que possuem a maior quantidade.

### 6.2 Relatório de usuários em atraso

Selecione `6 - Relatorio de usuarios em atraso`. São exibidos os usuários que
possuem empréstimo ativo cuja data prevista de devolução já passou.

### 6.3 Busca avançada de livros

Selecione `7 - Busca avancada de livros`. Informe os critérios abaixo; deixe um
campo vazio para ignorá-lo:

1. título;
2. autor;
3. ano;
4. status:
    - `D` para disponível;
    - `E` para emprestado.

Os critérios preenchidos são aplicados simultaneamente.

## 7. Arquivos e persistência

Os arquivos são criados na pasta de execução do programa:

| Arquivo           | Conteúdo                                                 |
| ----------------- | -------------------------------------------------------- |
| `usuarios.txt`    | matrícula, nome, curso, telefone e data de cadastro      |
| `livros.txt`      | código, título, autor, editora, ano, exemplares e status |
| `emprestimos.txt` | código, usuário, livro, datas e status                   |

Os registros são separados por ponto e vírgula (`;`) e possuem uma linha de
cabeçalho. As datas usam o formato `AAAA-MM-DD`.

Após operações que alteram os dados, são gerados backups automáticos:

- `usuarios.bak`;
- `livros.bak`;
- `emprestimos.bak`.

Os arquivos `.log` e `print.log` registram eventos e informações de execução.
Não edite manualmente os arquivos enquanto o programa estiver em execução.

## 8. Mensagens comuns

- **Usuario ja cadastrado.**: a matrícula informada já existe.
- **Livro ja cadastrado.**: o código informado já existe.
- **Usuario nao encontrado.** ou **Livro nao encontrado.**: o identificador
  informado não está cadastrado.
- **Nao ha exemplares disponiveis deste livro.**: todos os exemplares estão
  emprestados.
- **Emprestimo ativo nao encontrado.**: o empréstimo não existe ou já foi
  devolvido.
- **Nenhum resultado encontrado.**: nenhum registro atende aos critérios usados.

## 9. Encerramento

Selecione `0 - Sair` no menu principal. O programa libera a memória utilizada e encerra sem alterar os registros além das operações realizadas.
