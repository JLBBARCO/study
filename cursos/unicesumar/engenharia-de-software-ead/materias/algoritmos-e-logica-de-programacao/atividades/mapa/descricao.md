# Descrição do programa Analista de Servidores

## Como o algoritmo funcionará

O sistema pedirá em um loop infinito qual o nome do servidor e o tempo de resposta. Esses dados serão armazenados em uma lista de arrays com a seguinte estrutura:

```json
[
  {
    "id": "0001",
    "nome": "Servidor Google",
    "ping": [16, 24, 24, 16, 20, 18, 50, 30],
    "ping_medio": 25
  },
  {
    "id": "1a9f",
    "nome": "Servidor Github",
    "ping": [16, 24, 30, 50, 100, 250, 100, 50, 24, 16],
    "ping_medio": 66
  }
]
```

- O id possui 4 dígitos e é exadecimal, possibilitando um total de 65536 servidores
- O nome é de escolha livre do usuário
- O ping é numérico e o usuário só pode inserir números, e quantos ele quiser

Após cada inserção, o sistema pergunta se deseja continuar. Se sim, libera para o usuário inserir os dados de mais um servidor. Se não, o programa dá sequência à pipeline principal.

Depois do usuário inserir as informações, o sistema faz uma ordenação decrescente com base no ping médio.

Após a ordenação, o programa mostrará duas tabelas, uma dos servidores com ping médio maior igual ou maior a 100, e outra de todos os servidores.
