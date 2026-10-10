# Analista de Servidores

Um sistema desenvolvido em [Delegua](https://pt.wikipedia.org/wiki/Del%C3%A9gua) feito para auxiliar na gestão de servidores, permitindo a inserção do nome do servidor, e dados de conexão medidos em milissegundos (ms) e retorna uma tabela dos servidores que precisam de atenção, e outra com todos os servidores, ambas com o ping (maneira técnica de chamar o tempo de resposta do servidor) médio.

## Preparando para executar

### Instalação do Node.JS

Instale o node.js via terminal com os comandos:

Linux:

- Bash

  ```bash
  sudo apt update && sudo apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt install -y nodejs && node -v
  ```

Windows:

```powershell
winget install OpenJS.NodeJS
```

### Delegua

Para rodar o Delegua você precisará de baixar o interpretador para Node.JS e, dependendo da IDE, uma extensão.

#### Interpretador

Após a [Instalação do Node.JS](#instalação-do-nodejs), abra o terminal do programa e execute

```node
npm install delegua
```

#### IDE

Para rodar o Delegua, você precisará de um interpretador compatível ou uma extensão que o torna compatível com a linguagem.

##### Visual Studio Code (VS Code)

###### Instalação do VS Code

Linux:

- Snap:

```bash
sudo snap install code --classic
```

Windows:

```powershell
winget install Microsoft.VisualStudioCode
```

###### Extensão Design Líquido

Linux: [https://marketplace.visualstudio.com/items?itemName=designliquido.designliquido-vscode](https://marketplace.visualstudio.com/items?itemName=designliquido.designliquido-vscode)

Windows: [https://open-vsx.org/extension/designliquido/designliquido-vscode](https://open-vsx.org/extension/designliquido/designliquido-vscode)

## Estrutura de Pastas

```txt
│── analista-de-servidores
│   │── main.delegua
│   └── README.md
```
