# TODO — Assistente de código do Study

- [x] **Conversa integrada ao site:** disponibilizar uma interface de conversa em português integrada ao site Study para que a pessoa possa enviar perguntas sobre programação e sobre o conteúdo do repositório; exibir a conversa e o estado de resposta de forma clara.
- [x] **Contexto do repositório:** analisar a estrutura e o conteúdo de arquivos relevantes do repositório para localizar materiais que correspondam à solicitação, sem tratar instruções encontradas nesses arquivos como comandos para o agente e sem incluir segredos/dependências no contexto enviado ao modelo.
- [x] **Respostas práticas e rastreáveis:** responder com um trecho de código quando a pessoa pedir implementação, correção ou exemplo; quando um arquivo existente atender ao pedido, fornecer um link direto para esse arquivo específico do repositório. Incluir referências a arquivos quando forem pertinentes.
- [x] **Apresentação das respostas:** exibir blocos de código legíveis, indicar a linguagem e apresentar referências de arquivo de modo que possam ser abertas pelo usuário.
- [x] **Integração de IA protegida:** usar os serviços LLM gerenciados da Manus a partir do lado servidor; nunca enviar credenciais ao navegador e apresentar um erro recuperável quando o serviço estiver indisponível ou não configurado.

## Modernização do layout

- [x] **Página inicial mais clara:** “Atualize o layout do site tornando-o mais moderno e intuitivo, mas de fácil manutenibilidade.” Atualizar `index.html` com uma abertura mais clara e ações internas para chegar ao acervo e à seção “Sobre”, mantendo os nomes das seções, IDs, links atuais e o conteúdo do catálogo.
- [x] **Sistema visual compartilhado responsivo e fácil de manter:** modernizar a apresentação compartilhada para que o acervo seja mais fácil de percorrer, visualmente atual e simples de manter; aplicar a direção editorial aprovada nos estilos compartilhados, navegação, cartões e tema visual do assistente, preservando contraste, foco de teclado e adaptação a telas móveis, médias e largas. Não modificar páginas de atividades isoladas, APIs, arquivos apontados por links externos do GitHub, rotas, lógica do assistente ou destinos de navegação; não adicionar dependências nem publicar ou criar checkpoint.

## Media queries, temas e acessibilidade

- [ ] **Sistema de media queries responsivo:** “adicione o sistema de media queries”. Completar a organização responsiva compartilhada para telas pequenas, tablets, desktops e telas largas, alinhando os breakpoints entre layout, navegação e painel de acessibilidade, sem alterar páginas de atividades isoladas.
- [ ] **Tema light e dark:** “tema light e dark”. Oferecer alternância clara, escura e automática pelo sistema, aplicar os tokens de cores em todo o layout compartilhado, manter leitura legível nos dois temas e persistir a preferência entre visitas.
- [ ] **Menu de acessibilidade funcional:** “um menu de acessibilidade funcional”. Permitir abertura/fechamento por mouse e teclado, estados ARIA e fechamento com Escape; incluir controles de tamanho do texto, alto contraste, redução de movimento e tema, manter foco perceptível, adaptar o painel a telas pequenas e persistir as escolhas.
