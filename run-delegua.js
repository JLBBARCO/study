const path = require("path");
const fs = require("fs");

const caminhoArquivo = process.argv[2];

if (!caminhoArquivo) {
  console.error("Nenhum arquivo .delegua foi fornecido.");
  process.exit(1);
}

const arquivoAbsoluto = path.resolve(caminhoArquivo);

if (!fs.existsSync(arquivoAbsoluto)) {
  console.error(`Arquivo não encontrado: ${arquivoAbsoluto}`);
  process.exit(1);
}

const codigo = fs.readFileSync(arquivoAbsoluto, "utf8");

// Tenta resolver a classe de execução do Node no pacote do Design Líquido
let DeleguaNode;

try {
  // Tenta pelo ponto de entrada secundário
  DeleguaNode =
    require("@designliquido/delegua-node/execucao/delegua-node.js").DeleguaNode;
} catch (e1) {
  try {
    const mod = require("@designliquido/delegua-node");
    DeleguaNode = mod.DeleguaNode || mod.Delegua || mod;
  } catch (e2) {
    try {
      const modDelegua = require("@designliquido/delegua");
      DeleguaNode = modDelegua.Delegua || modDelegua;
    } catch (e3) {
      console.error(
        "Erro ao carregar os módulos locais do Delegua:",
        e3.message,
      );
      process.exit(1);
    }
  }
}

// Instancia a engine conectando o console.log como saída padrão do 'escreva'
try {
  const delegua = new DeleguaNode(process.cwd(), false, console.log);

  if (typeof delegua.carregarEExecutarArquivo === "function") {
    delegua.carregarEExecutarArquivo(arquivoAbsoluto);
  } else if (typeof delegua.executarTexto === "function") {
    delegua.executarTexto(codigo);
  } else if (typeof delegua.executar === "function") {
    const linhas = codigo.split("\n");
    delegua.executar(linhas);
  }
} catch (err) {
  // Se a instanciação falhar, executa via eval do módulo do arquivo
  try {
    const moduloExecucao = require("@designliquido/delegua-node/execucao.js");
    if (typeof moduloExecucao.executar === "function") {
      moduloExecucao.executar(codigo, console.log);
    }
  } catch (e) {
    console.error("Falha na execução do código Delegua:", err.message);
  }
}
