const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const caminhoArquivo = process.argv[2];

if (!caminhoArquivo) {
  console.error("Nenhum arquivo foi fornecido.");
  process.exit(1);
}

const arquivoAbsoluto = path.resolve(caminhoArquivo);

if (!fs.existsSync(arquivoAbsoluto)) {
  console.error(`Arquivo não encontrado: ${arquivoAbsoluto}`);
  process.exit(1);
}

// Identifica a extensão do arquivo
const extensao = path.extname(arquivoAbsoluto).toLowerCase();

// Se for .alg, aplica o dialeto visualg; caso contrário, roda o Delégua padrão
const comando =
  extensao === ".alg"
    ? `npx delegua -d visualg "${arquivoAbsoluto}"`
    : `npx delegua "${arquivoAbsoluto}"`;

try {
  execSync(comando, { stdio: "inherit" });
} catch (error) {
  process.exit(error.status || 1);
}
