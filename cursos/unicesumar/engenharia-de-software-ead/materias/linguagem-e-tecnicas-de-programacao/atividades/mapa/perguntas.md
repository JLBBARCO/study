# Questão 1

## **Sistema de Gerenciamento de Biblioteca em Linguagem C**

Conforme apresentado na disciplina, a linguagem C oferece recursos fundamentais para o desenvolvimento de sistemas robustos através de estruturas de dados, funções, manipulação de arquivos e controle de fluxo. A modularização através de funções e o uso adequado de estruturas de dados são essenciais para criar programas organizados e eficientes.

Como parte do seu aprendizado prático, você deverá desenvolver um **Sistema de Gerenciamento de Biblioteca** completo em linguagem C, aplicando todos os conceitos estudados nas unidades da disciplina.

**Descrição do Sistema:**

O sistema deverá gerenciar o acervo de uma biblioteca, incluindo cadastro de livros, usuários, empréstimos e devoluções. O programa deve ser totalmente funcional e demonstrar domínio dos conceitos estudados.

**Requisitos Funcionais:**

1. **Cadastro de Livros:**

   - Código do livro (inteiro)
   - Título (string até 100 caracteres)
   - Autor (string até 80 caracteres)
   - Editora (string até 60 caracteres)
   - Ano de publicação (inteiro)
   - Número de exemplares disponíveis (inteiro)
   - Status (disponível/emprestado)

2. **Cadastro de Usuários**

   - Matrícula (inteiro)
   - Nome completo (string até 100 caracteres)
   - Curso (string até 50 caracteres)
   - Telefone (string até 15 caracteres)
   - Data de cadastro (dia, mês, ano)

3. **Sistema de Empréstimos:**

   - Código do empréstimo (inteiro)
   - Matrícula do usuário
   - Código do livro
   - Data do empréstimo (dia, mês, ano)
   - Data prevista de devolução (7 dias após empréstimo)
   - Status (ativo/devolvido)

**Requisitos Técnicos:**

**Parte 1 - Estruturas de Dados (25 pontos):**

- Definir structs apropriadas para Livro, Usuario e Emprestimo
- Utilizar vetores de structs para armazenar os dados
- Implementar funções de inicialização das estruturas

**Parte 2 - Sistema de Menus e Controle de Fluxo (20 pontos):**

- Menu principal com todas as opções do sistema
- Submenus organizados por funcionalidade
- Controle de fluxo utilizando estruturas condicionais e de repetição apropriadas
- Validação de entrada de dados

**Parte 3 - Funções Modulares (25 pontos):**

- Função para cadastrar livros
- Função para cadastrar usuários
- Função para realizar empréstimo
- Função para realizar devolução
- Função para pesquisar livros (por código, título ou autor)
- Função para pesquisar usuários (por matrícula ou nome)
- Função para listar empréstimos ativos
- Todas as funções devem utilizar passagem de parâmetros adequada

**Parte 4 - Manipulação de Arquivos (20 pontos):**

- Salvar dados de livros em arquivo "livros.txt"
- Salvar dados de usuários em arquivo "usuarios.txt"
- Salvar dados de empréstimos em arquivo "emprestimos.txt"
- Carregar dados dos arquivos na inicialização do programa
- Implementar backup automático dos dados

**Parte 5 - Funcionalidades Avançadas (10 pontos):**

- Relatório de livros mais emprestados
- Relatório de usuários com empréstimos em atraso
- Função de busca avançada com múltiplos critérios
- Sistema de renovação de empréstimos

**Entregáveis:**

- **Código-fonte completo comentado** e organizado
- **Manual do usuário** explicando como utilizar cada funcionalidade

**IMPORTANTE:**

1. O sistema deve ser desenvolvido exclusivamente em linguagem C
2. Utilize apenas as bibliotecas padrão do C (stdio.h, string.h, stdlib.h, etc.)
3. Todos os arquivos devem estar organizados em uma pasta compactada
4. O código deve compilar sem erros no ambiente Dev-C++ ou similar
5. Teste todas as funcionalidades antes da entrega
6. Não são permitidas cópias de códigos prontos da internet
7. A entrega deve ser feita exclusivamente pelo Template MAPA disponível
8. Prazo de entrega rigorosamente observado

**Como entregar a atividade:**

A atividade deverá ser produzida em um arquivo do tipo TEXTO, conforme Template anexado no MATERIAL DA DISCIPLINA, disponibilizado no Studeo, e DEVE ser entregue com a extensão (.PDF). Depois, deve ser anexado no ambiente da Atividade no STUDEO.

**ORIENTAÇÕES IMPORTANTES:**

- Lembre-se de que a interpretação da atividade também faz parte da avaliação.
- Acesse o link com o vídeo gravado pelo professor para ajudá-lo na realização desta atividade MAPA. O acesso deverá ser realizado em: Materiais >> Material da Disciplina.
- Realize pesquisas complementares nas referências apresentadas pelo professor.
- Ao realizar pesquisas, não faça cópia fiel do texto e sempre insira as devidas referências dos autores.
- A entrega deve ser feita exclusivamente por meio do Template de entrega da atividade MAPA disponível no Material da Disciplina.
- Antes de enviar sua atividade, certifique-se de que respondeu a todas as perguntas e realize uma cuidadosa correção ortográfica.
- Após o envio não são permitas alterações, ou modificações. Logo, você tem apenas uma chance de enviar o arquivo corretamente. Revise bem antes de enviar!​
- Procure sanar suas dúvidas junto à mediação em tempo hábil sobre o conteúdo exigido na atividade, de modo que consiga realizar sua participação.
- Atenção ao prazo de entrega, evite envio de atividade em cima do prazo. Você pode ter algum problema com internet, computador, software etc., e os prazos não serão flexibilizados, mesmo em caso de comprovação.

Em caso de dúvidas, encaminhar mensagem ao seu Professor Mediador.

Bons estudos!
