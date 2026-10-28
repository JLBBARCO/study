const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

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

const extensao = path.extname(arquivoAbsoluto).toLowerCase();
const executavelDelegua = path.join(
  __dirname,
  "node_modules",
  "@designliquido",
  "delegua-node",
  "bin",
  "delegua",
);

const argumentos =
  extensao === ".alg" ? ["-d", "visualg", arquivoAbsoluto] : [arquivoAbsoluto];

try {
  execFileSync(process.execPath, [executavelDelegua, ...argumentos], {
    stdio: "inherit",
  });
} catch (error) {
  process.exit(error.status || 1);
}
