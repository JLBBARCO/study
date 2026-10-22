# Notas de pesquisa — n8n e Vercel

Data da consulta: 2026-10-22.

## Achados

- O nó AI Agent do n8n conecta um modelo de chat e uma ou mais ferramentas; o agente decide quais ferramentas chamar. Ele requer ao menos uma ferramenta conectada.
- O Chat Trigger permite chat hospedado pelo n8n ou incorporado em uma interface própria. Pode exigir autenticação, configurar origem CORS e ser conectado a um Agent. Cada mensagem executa novamente o workflow. Memória de sessões anteriores requer um subnó de memória.
- O nó Webhook recebe chamadas HTTP e pode responder com o resultado do workflow; oferece autenticação Basic, Header ou JWT. URLs de produção são registradas quando o workflow é publicado.
- A documentação do n8n recomenda Docker Compose ou outro host/cloud para self-hosting; o Compose persiste dados em volume e a documentação recomenda PostgreSQL para produção. O n8n também oferece n8n Cloud.
- A Vercel aceita imagens Docker/OCI como Vercel Functions, não como servidor permanente: as funções escalam a zero sem tráfego e obedecem limites das Functions. Containers sem tráfego escalam após cinco minutos em produção ou 30 segundos em preview.
- Limite documentado de duração de Functions com Fluid Compute: Hobby 300 s; Pro/Enterprise 800 s e até 1.800 s em beta. Workloads sem duração máxima podem usar Vercel Workflows.
- Para este caso, arquitetura razoável: manter frontend/API na Vercel e, se forem necessárias automações n8n, hospedar n8n separadamente e chamar um Webhook de produção autenticado pelo backend Vercel. O n8n não ganha acesso ao repositório automaticamente: contexto do código precisa ser enviado/consultado via ferramenta ou indexação.

## Fontes

- AI Agent: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent
- Chat Trigger: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger
- Webhook: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook
- Hospedagem n8n: https://docs.n8n.io/deploy/host-n8n
- Docker Compose do n8n: https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose
- Vercel Docker: https://vercel.com/kb/guide/docker
- Vercel Functions: https://vercel.com/docs/functions
- Limites de Functions: https://vercel.com/docs/functions/limitations
- Vercel Workflows: https://vercel.com/docs/workflows
