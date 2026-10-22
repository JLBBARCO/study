(() => {
  const API_URL = "/api/assistant";
  const MAX_PROMPT_LENGTH = 4000;

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function safeInternalHref(href) {
    if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return null;
    try {
      const resolved = new URL(href, window.location.origin);
      return resolved.origin === window.location.origin ? resolved.href : null;
    } catch {
      return null;
    }
  }

  function appendInlineContent(target, text) {
    const tokenPattern = /(\[[^\]]{1,180}\]\([^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
    let offset = 0;
    let match;

    while ((match = tokenPattern.exec(text)) !== null) {
      target.appendChild(document.createTextNode(text.slice(offset, match.index)));
      const token = match[0];
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const inlineCodeMatch = token.match(/^`([^`]+)`$/);
      const boldMatch = token.match(/^\*\*([^*]+)\*\*$/);

      if (linkMatch) {
        const href = safeInternalHref(linkMatch[2]);
        if (href) {
          const link = element("a", "study-assistant-inline-link", linkMatch[1]);
          link.href = href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          target.appendChild(link);
        } else {
          target.appendChild(document.createTextNode(token));
        }
      } else if (inlineCodeMatch) {
        target.appendChild(element("code", "study-assistant-inline-code", inlineCodeMatch[1]));
      } else if (boldMatch) {
        target.appendChild(element("strong", "", boldMatch[1]));
      } else {
        target.appendChild(document.createTextNode(token));
      }
      offset = tokenPattern.lastIndex;
    }

    target.appendChild(document.createTextNode(text.slice(offset)));
  }

  function appendPlainMarkdown(target, text) {
    const paragraphs = text.trim().split(/\n{2,}/).filter(Boolean);
    for (const paragraphText of paragraphs) {
      const paragraph = element("p", "study-assistant-paragraph");
      const lines = paragraphText.split("\n");
      lines.forEach((line, index) => {
        if (index > 0) paragraph.appendChild(document.createElement("br"));
        appendInlineContent(paragraph, line);
      });
      target.appendChild(paragraph);
    }
  }

  function renderMarkdown(target, markdown) {
    const content = String(markdown || "");
    const fencedCode = /```([^\r\n`]*)\r?\n([\s\S]*?)```/g;
    let offset = 0;
    let match;

    while ((match = fencedCode.exec(content)) !== null) {
      appendPlainMarkdown(target, content.slice(offset, match.index));

      const language = match[1].trim().slice(0, 32);
      const codePanel = element("div", "study-assistant-code-panel");
      const codeHeader = element("div", "study-assistant-code-header");
      codeHeader.appendChild(element("span", "study-assistant-code-language", language || "Código"));
      const copyButton = element("button", "study-assistant-copy", "Copiar");
      copyButton.type = "button";
      copyButton.setAttribute("aria-label", "Copiar trecho de código");
      const codeText = match[2].replace(/\n$/, "");
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText);
          copyButton.textContent = "Copiado";
          window.setTimeout(() => { copyButton.textContent = "Copiar"; }, 1400);
        } catch {
          copyButton.textContent = "Selecione o código";
          window.setTimeout(() => { copyButton.textContent = "Copiar"; }, 1800);
        }
      });
      codeHeader.appendChild(copyButton);
      const pre = element("pre", "study-assistant-code");
      pre.appendChild(element("code", language ? `language-${language}` : "", codeText));
      codePanel.append(codeHeader, pre);
      target.appendChild(codePanel);
      offset = fencedCode.lastIndex;
    }

    appendPlainMarkdown(target, content.slice(offset));
  }

  function appendSources(target, sources) {
    if (!Array.isArray(sources) || sources.length === 0) return;
    const validSources = sources.filter((source) => source && typeof source.path === "string" && safeInternalHref(source.href));
    if (!validSources.length) return;

    const section = element("div", "study-assistant-sources");
    section.appendChild(element("span", "study-assistant-sources-title", "Arquivos relacionados"));
    const list = element("ul", "study-assistant-sources-list");
    for (const source of validSources.slice(0, 6)) {
      const item = document.createElement("li");
      const link = element("a", "study-assistant-source-link", source.path);
      link.href = safeInternalHref(source.href);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.appendChild(link);
      list.appendChild(item);
    }
    section.appendChild(list);
    target.appendChild(section);
  }

  function createMessage(log, role, text, sources) {
    const article = element("article", `study-assistant-message study-assistant-message--${role}`);
    article.setAttribute("aria-label", role === "user" ? "Sua pergunta" : "Resposta do assistente");
    const label = role === "user" ? "Você" : "Study IA";
    article.appendChild(element("span", "study-assistant-message-label", label));
    const content = element("div", "study-assistant-message-content");
    renderMarkdown(content, text);
    appendSources(content, sources);
    article.appendChild(content);
    log.appendChild(article);
    log.scrollTop = log.scrollHeight;
    return article;
  }

  function mountAssistant() {
    if (!document.body || document.getElementById("study-assistant")) return;

    const root = element("div", "study-assistant");
    root.id = "study-assistant";

    const panel = element("section", "study-assistant-panel");
    panel.id = "study-assistant-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "study-assistant-title");

    const header = element("header", "study-assistant-header");
    const headingGroup = element("div", "study-assistant-heading-group");
    const heading = element("h2", "study-assistant-title", "Assistente de código");
    heading.id = "study-assistant-title";
    headingGroup.appendChild(heading);
    headingGroup.appendChild(element("p", "study-assistant-subtitle", "Pergunte sobre programação e este repositório."));
    header.appendChild(headingGroup);

    const headerActions = element("div", "study-assistant-header-actions");
    const clearButton = element("button", "study-assistant-clear", "Limpar");
    clearButton.type = "button";
    clearButton.setAttribute("aria-label", "Limpar conversa");
    const closeButton = element("button", "study-assistant-close", "Fechar");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Fechar assistente");
    headerActions.append(clearButton, closeButton);
    header.appendChild(headerActions);

    const log = element("div", "study-assistant-log");
    log.setAttribute("role", "log");
    log.setAttribute("aria-live", "polite");
    log.setAttribute("aria-relevant", "additions text");

    const composer = element("form", "study-assistant-composer");
    const input = element("textarea", "study-assistant-input");
    input.name = "question";
    input.rows = 2;
    input.maxLength = MAX_PROMPT_LENGTH;
    input.required = true;
    input.placeholder = "Ex.: onde está o código que calcula o IMC?";
    input.setAttribute("aria-label", "Sua pergunta para o assistente");
    const composerFooter = element("div", "study-assistant-composer-footer");
    const hint = element("span", "study-assistant-hint", "Enter envia · Shift+Enter quebra linha");
    const submit = element("button", "study-assistant-send", "Enviar");
    submit.type = "submit";
    composerFooter.append(hint, submit);
    composer.append(input, composerFooter);

    const status = element("p", "study-assistant-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    panel.append(header, log, status, composer);
    const trigger = element("button", "study-assistant-trigger", "Perguntar à IA");
    trigger.type = "button";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "study-assistant-panel");
    trigger.setAttribute("aria-label", "Abrir assistente de código");
    root.append(panel, trigger);
    document.body.appendChild(root);

    const history = [];
    createMessage(log, "assistant", "Olá! Posso procurar materiais neste repositório e ajudar com perguntas ou exemplos de código.");

    function setOpen(open) {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      if (open) input.focus();
      else trigger.focus();
    }

    async function sendQuestion(question, showUser = true) {
      const prompt = String(question || "").trim().slice(0, MAX_PROMPT_LENGTH);
      if (!prompt || submit.disabled) return;
      if (showUser) createMessage(log, "user", prompt);

      status.textContent = "Consultando o repositório e preparando a resposta…";
      submit.disabled = true;
      input.disabled = true;
      const pending = createMessage(log, "assistant", "Analisando o repositório…");
      pending.classList.add("is-pending");

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...history, { role: "user", content: prompt }] }),
        });
        let result;
        try {
          result = await response.json();
        } catch {
          throw new Error("O servidor retornou uma resposta inválida.");
        }
        if (!response.ok) throw new Error(result?.error || "Não foi possível obter uma resposta.");
        if (typeof result?.answer !== "string" || !result.answer.trim()) {
          throw new Error("O assistente não recebeu uma resposta utilizável.");
        }

        pending.remove();
        history.push({ role: "user", content: prompt }, { role: "assistant", content: result.answer });
        if (history.length > 10) history.splice(0, history.length - 10);
        createMessage(log, "assistant", result.answer, result.sources);
        input.value = "";
        status.textContent = "";
      } catch (error) {
        pending.remove();
        status.textContent = "A pergunta continua no campo; você pode tentar de novo.";
        const errorMessage = createMessage(log, "assistant", error.message || "Ocorreu um erro. Tente novamente.");
        const retry = element("button", "study-assistant-retry", "Tentar novamente");
        retry.type = "button";
        retry.addEventListener("click", () => sendQuestion(prompt, false), { once: true });
        errorMessage.appendChild(retry);
      } finally {
        submit.disabled = false;
        input.disabled = false;
        input.focus();
      }
    }

    trigger.addEventListener("click", () => setOpen(panel.hidden));
    closeButton.addEventListener("click", () => setOpen(false));
    clearButton.addEventListener("click", () => {
      history.length = 0;
      log.replaceChildren();
      status.textContent = "Conversa limpa.";
      createMessage(log, "assistant", "Conversa reiniciada. O que você gostaria de saber sobre programação ou sobre este repositório?");
      input.focus();
    });
    composer.addEventListener("submit", (event) => {
      event.preventDefault();
      sendQuestion(input.value);
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        composer.requestSubmit();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAssistant, { once: true });
  } else {
    mountAssistant();
  }
})();
