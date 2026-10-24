const { answerAssistantRequest } = require("./_lib/assistant");

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "O corpo da requisição precisa ser JSON válido." });
      return;
    }
  }

  try {
    const result = await answerAssistantRequest(req.method, body, process.cwd());
    if (result.status === 405) res.setHeader("Allow", "POST");
    res.status(result.status).json(result.payload);
  } catch (error) {
    console.error("Falha inesperada no endpoint do assistente.", error?.message || "erro desconhecido");
    res.status(500).json({ error: "O assistente encontrou um erro inesperado. Tente novamente." });
  }
};
