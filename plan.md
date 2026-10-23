# Plano — modernização do layout do Study

## Objetivo e abordagem

Modernizar a página inicial e a apresentação compartilhada do site para que o acervo de estudos seja mais fácil de percorrer, visualmente atual e simples de manter. A implementação aproveitará o HTML estático, os estilos responsivos já existentes e os componentes gerados pelo JavaScript compartilhado. Não adicionará dependências, imagens externas ou nova lógica de aplicação.

## Exploração de direção visual

- **Console neo-brutalista** — alto contraste, bordas marcadas e tipografia monoespaçada; probabilidade 0,04.
- **Caderno editorial de tecnologia** — página clara, hierarquia tipográfica objetiva e acentos de cor precisos; probabilidade 0,07.
- **Glassmorphism futurista** — painéis translúcidos e brilho em camadas; probabilidade 0,03.

### Direção escolhida: caderno editorial de tecnologia

- **Movimento de design:** editorial digital suíço, aplicado a um arquivo de estudos de programação.
- **Princípios centrais:** leitura rápida, navegação previsível, conteúdo em primeiro plano e componentes consistentes.
- **Filosofia de cor:** fundo claro e neutro para leitura prolongada, texto em azul-grafite para contraste e azul-violeta como cor de ação identificável; acentos secundários serão usados com moderação.
- **Paradigma de layout:** abertura editorial alinhada à esquerda, conteúdo agrupado por origem/curso e largura de leitura controlada; listas de cartões se adaptam ao espaço disponível em vez de centralizar toda a experiência num único painel.
- **Elementos de assinatura:** pequenos marcadores tipográficos de seção, filete de cor junto aos títulos e cartões de superfície limpa com ações claramente visíveis.
- **Filosofia de interação:** links e botões com áreas de clique confortáveis, foco de teclado perceptível, estados hover discretos e navegação que mantém os destinos atuais.
- **Animação:** transições curtas para hover/foco; sem animações decorativas contínuas e com respeito a `prefers-reduced-motion`.
- **Tipografia:** pilha de sistema sem dependência de fonte remota; títulos em sans-serif de peso forte, corpo em sans-serif legível e trechos técnicos em monoespaçada.
- **Essência da marca:** um arquivo pessoal para localizar cursos, projetos e referências de programação; personalidade curiosa, prática e acolhedora.
- **Voz da marca:** direta e convidativa, sem texto promocional genérico. Exemplos: “Um lugar para guardar o que você está aprendendo.” e “Escolha uma trilha e continue de onde parou.”
- **Wordmark/marca:** assinatura textual “STUDY” acompanhada por um pequeno símbolo geométrico inspirado em colchetes de código, feito em CSS/HTML, sem imagem ou dependência adicional.
- **Cor de marca:** azul-violeta, reservado para ações primárias, foco e marcadores de navegação.

## Estrutura existente e responsabilidades

- `index.html`: página de entrada e catálogo por instituição, curso e trilha; seus IDs e links são destinos usados pela navegação.
- `src/css/style.css`, `src/css/tablet.css`, `src/css/pc.css`, `src/css/tv.css` e os estilos de cartões: base legada compartilhada, breakpoints e componentes existentes; conservar seus contratos e conteúdos específicos.
- `src/css/site-theme.css` (novo): camada visual compartilhada, organizada por tokens, componentes, página inicial e breakpoints; será carregada por último para manter os ajustes concentrados e fáceis de revisar.
- `src/css/assistant.css`: apresentação do assistente flutuante; reutilizar os tokens da nova camada sem alterar o comportamento da conversa.
- `src/js/script.js` e `src/js/header.js`: carregamento de estilos e navegação compartilhada; incluir a camada de tema no carregador e remover somente preconexões de fontes que deixarem de ser usadas.
- `api/` e páginas HTML dos cursos/atividades: APIs e conteúdos existentes, fora do escopo visual desta alteração.

## Implementação proposta

1. Atualizar `index.html` com uma identificação de página inicial e uma abertura mais clara, mantendo os nomes das seções, IDs, links atuais e o conteúdo do catálogo. Incluir ações internas para chegar ao acervo e à seção “Sobre”.
2. Criar `src/css/site-theme.css` como a camada final do tema compartilhado, reunindo navegação, superfícies, cartões, página inicial e regras responsivas; manter os tokens globais de cor e tipografia em `src/css/style.css`.
3. Registrar essa folha por último em `src/js/script.js`, remover a importação de fontes remotas e suas preconexões não utilizadas, e manter intactas a navegação e a lógica da aplicação.
4. Alinhar `src/css/assistant.css` aos tokens da nova paleta, preservando os controles e o fluxo da conversa.
5. Não modificar conteúdo de atividades isoladas, APIs, README externo, rotas, lógica do assistente ou destinos de navegação; não publicar nem criar checkpoint como parte desta tarefa.

## Extensão aprovada: responsividade, temas e acessibilidade

- **Sistema de media queries:** organizar as regras compartilhadas em uma progressão responsiva mobile-first, com tratamentos específicos para telas pequenas, tablets, desktops e telas largas, preservando os breakpoints de carregamento existentes. Adaptar navegação, catálogo e painel de acessibilidade; incluir preferências do sistema para tema, contraste, movimento e ponteiro.
- **Temas claro e escuro:** oferecer opções Claro, Escuro e Sistema; persistir a escolha, seguir `prefers-color-scheme` quando Sistema estiver selecionado e mapear os tokens existentes para cores legíveis em ambos os temas, sem dependências externas.
- **Menu funcional de acessibilidade:** montar o painel pelo módulo JavaScript compartilhado e incluir controle de tema, ajuste/redefinição do tamanho do texto, alto contraste e redução de movimento; indicar estado com atributos ARIA, permitir uso por teclado, fechar com Escape/clique externo, devolver foco ao botão quando apropriado e persistir preferências.
- **Compatibilidade e escopo:** reaproveitar `src/js/accessibility.js` e `src/css/site-theme.css`, manter funções globais antigas de acessibilidade como wrappers quando úteis, preservar as páginas de atividades isoladas, API, rotas e lógica da conversa, e não adicionar dependências nem publicar/criar checkpoint.

## Extensão: carregamento de estilos sem falha visual

- **Entrada única:** manter `src/js/script.js` como importação comum que resolve e importa as folhas compartilhadas e seus media queries. Remover os links duplicados de CSS da home e tornar o script parser-blocking no `<head>` para ele iniciar o carregamento antes de o conteúdo poder piscar sem estilos.
- **Aplicação coordenada:** adicionar um gate visual síncrono no início do carregador, inserir as folhas em paralelo mantendo sua ordem de cascata, deduplicar links já presentes, aguardar `load`/`error` com timeout e só então revelar o `body` e inicializar componentes. Erros ou falhas tardias devem revelar a página em vez de mantê-la em branco.
- **Escopo:** ajustar apenas a home e as páginas de entrada compartilhadas que usam `/src/js/script.js`; conservar URLs de assets, atributos `media` e fallback de contexto, sem adicionar dependências nem alterar atividades independentes.

## Limites da mudança

A experiência compartilhada alcança as páginas que já carregam `src/js/script.js`; atividades HTML independentes permanecem intocadas. Nenhum arquivo apontado por links externos do repositório será tratado como material de implementação. A manutenção ficará concentrada nos estilos existentes e em uma marcação clara na página inicial, sem nova biblioteca nem duplicação de CSS por página.
