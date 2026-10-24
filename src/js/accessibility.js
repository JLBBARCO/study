const ACCESSIBILITY_STORAGE = {
  theme: "study_theme_mode",
  fontScale: "study_font_scale",
  contrast: "study_contrast_mode",
  motion: "study_motion_mode",
};

const ACCESSIBILITY_THEMES = ["light", "dark", "system"];
const ACCESSIBILITY_CONTRAST_MODES = ["system", "high", "normal"];
const ACCESSIBILITY_MOTION_MODES = ["system", "reduce", "full"];
const ACCESSIBILITY_MIN_FONT_SCALE = 0.9;
const ACCESSIBILITY_MAX_FONT_SCALE = 1.4;

let accessibilityPreferences = {
  theme: "system",
  contrast: "system",
  motion: "system",
};
let accessibilityFontScale = 1;
let accessibilityMenuElements = null;
let accessibilityListenersController = null;

function readAccessibilityPreference(key, allowedValues, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowedValues.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveAccessibilityPreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Não foi possível salvar a preferência de acessibilidade.", error);
  }
}

function getSystemMatch(query) {
  return typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;
}

function normalizeFontScale(value) {
  const parsed = Number.parseFloat(value);
  const scale = Number.isFinite(parsed) ? parsed : 1;
  return Math.min(
    ACCESSIBILITY_MAX_FONT_SCALE,
    Math.max(
      ACCESSIBILITY_MIN_FONT_SCALE,
      Math.round(scale * 10) / 10,
    ),
  );
}

function getEffectiveTheme(preference) {
  if (preference === "light" || preference === "dark") return preference;
  return getSystemMatch("(prefers-color-scheme: dark)") ? "dark" : "light";
}

function applyThemePreference(preference, persist = false) {
  const next = ACCESSIBILITY_THEMES.includes(preference) ? preference : "system";
  accessibilityPreferences.theme = next;
  document.documentElement.dataset.theme = getEffectiveTheme(next);

  if (persist) {
    saveAccessibilityPreference(ACCESSIBILITY_STORAGE.theme, next);
  }
  updateAccessibilityMenuState();
}

function isHighContrastEnabled(preference) {
  if (preference === "high") return true;
  if (preference === "normal") return false;
  return getSystemMatch("(prefers-contrast: more)");
}

function applyContrastPreference(preference, persist = false) {
  const next = ACCESSIBILITY_CONTRAST_MODES.includes(preference)
    ? preference
    : "system";
  accessibilityPreferences.contrast = next;
  document.documentElement.dataset.contrast = isHighContrastEnabled(next)
    ? "high"
    : "normal";

  if (persist) {
    saveAccessibilityPreference(ACCESSIBILITY_STORAGE.contrast, next);
  }
  updateAccessibilityMenuState();
}

function isMotionReductionEnabled(preference) {
  if (preference === "reduce") return true;
  if (preference === "full") return false;
  return getSystemMatch("(prefers-reduced-motion: reduce)");
}

function applyMotionPreference(preference, persist = false) {
  const next = ACCESSIBILITY_MOTION_MODES.includes(preference)
    ? preference
    : "system";
  accessibilityPreferences.motion = next;
  document.documentElement.dataset.motion = isMotionReductionEnabled(next)
    ? "reduce"
    : "full";

  if (persist) {
    saveAccessibilityPreference(ACCESSIBILITY_STORAGE.motion, next);
  }
  updateAccessibilityMenuState();
}

function setAccessibilityFontScale(value, persist = true) {
  accessibilityFontScale = normalizeFontScale(value);
  document.documentElement.style.setProperty(
    "--study-font-scale",
    String(accessibilityFontScale),
  );

  if (persist) {
    saveAccessibilityPreference(
      ACCESSIBILITY_STORAGE.fontScale,
      String(accessibilityFontScale),
    );
  }
  updateAccessibilityMenuState();
}

function createAccessibilityButton(label, text, className = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.textContent = text;
  if (className) button.className = className;
  return button;
}

function createAccessibilityFieldset(legendText) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "accessibility-fieldset";
  const legend = document.createElement("legend");
  legend.textContent = legendText;
  fieldset.appendChild(legend);
  return fieldset;
}

function createAccessibilityCheckbox(id, labelText) {
  const label = document.createElement("label");
  label.className = "accessibility-switch";
  label.htmlFor = id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;

  const text = document.createElement("span");
  text.textContent = labelText;

  label.append(checkbox, text);
  return { label, checkbox };
}

function buildAccessibilityMenu() {
  const tools = document.createElement("div");
  tools.className = "accessibility-tools";
  tools.id = "accessibility-tools";

  const toggle = createAccessibilityButton(
    "Abrir opções de acessibilidade",
    "Acessibilidade",
    "accessibility-toggle",
  );
  toggle.id = "accessibility-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "accessibility-panel");

  const panel = document.createElement("section");
  panel.className = "accessibility-panel";
  panel.id = "accessibility-panel";
  panel.hidden = true;
  panel.tabIndex = -1;
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", "accessibility-panel-title");

  const heading = document.createElement("h2");
  heading.id = "accessibility-panel-title";
  heading.textContent = "Acessibilidade";
  panel.appendChild(heading);

  const themeFieldset = createAccessibilityFieldset("Tema");
  const themeOptions = document.createElement("div");
  themeOptions.className = "accessibility-theme-options";

  [
    ["light", "Claro"],
    ["dark", "Escuro"],
    ["system", "Sistema"],
  ].forEach(([value, label]) => {
    const button = createAccessibilityButton(
      `Usar tema ${label.toLowerCase()}`,
      label,
      "accessibility-theme-choice",
    );
    button.dataset.themeChoice = value;
    button.setAttribute("aria-pressed", "false");
    themeOptions.appendChild(button);
  });
  themeFieldset.appendChild(themeOptions);
  panel.appendChild(themeFieldset);

  const fontFieldset = createAccessibilityFieldset("Tamanho do texto");
  const fontControls = document.createElement("div");
  fontControls.className = "accessibility-font-controls";

  const decreaseButton = createAccessibilityButton(
    "Diminuir tamanho do texto",
    "A−",
    "accessibility-font-button",
  );
  decreaseButton.id = "accessibility-font-decrease";

  const fontValue = document.createElement("output");
  fontValue.className = "accessibility-font-value";
  fontValue.id = "accessibility-font-value";
  fontValue.setAttribute("aria-live", "polite");
  fontValue.setAttribute("aria-atomic", "true");

  const increaseButton = createAccessibilityButton(
    "Aumentar tamanho do texto",
    "A+",
    "accessibility-font-button",
  );
  increaseButton.id = "accessibility-font-increase";

  const resetFontButton = createAccessibilityButton(
    "Restaurar tamanho padrão do texto",
    "Padrão",
    "accessibility-font-reset",
  );
  resetFontButton.id = "accessibility-font-reset";

  fontControls.append(decreaseButton, fontValue, increaseButton);
  fontFieldset.append(fontControls, resetFontButton);
  panel.appendChild(fontFieldset);

  const preferencesFieldset = createAccessibilityFieldset("Preferências");
  const contrastControl = createAccessibilityCheckbox(
    "accessibility-high-contrast",
    "Alto contraste",
  );
  const motionControl = createAccessibilityCheckbox(
    "accessibility-reduce-motion",
    "Reduzir movimento",
  );
  preferencesFieldset.append(contrastControl.label, motionControl.label);
  panel.appendChild(preferencesFieldset);

  const resetButton = createAccessibilityButton(
    "Restaurar todas as preferências de acessibilidade",
    "Restaurar padrões",
    "accessibility-reset-all",
  );
  panel.appendChild(resetButton);

  const status = document.createElement("p");
  status.className = "accessibility-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.textContent = "As preferências são salvas neste navegador.";
  panel.appendChild(status);

  tools.append(toggle, panel);
  return {
    tools,
    toggle,
    panel,
    themeButtons: Array.from(themeOptions.querySelectorAll("button")),
    decreaseButton,
    increaseButton,
    resetFontButton,
    fontValue,
    contrastCheckbox: contrastControl.checkbox,
    motionCheckbox: motionControl.checkbox,
    resetButton,
    status,
  };
}

function updateAccessibilityMenuState() {
  if (!accessibilityMenuElements) return;

  accessibilityMenuElements.themeButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.themeChoice === accessibilityPreferences.theme),
    );
  });

  accessibilityMenuElements.fontValue.value = `${Math.round(
    accessibilityFontScale * 100,
  )}%`;
  accessibilityMenuElements.decreaseButton.disabled =
    accessibilityFontScale <= ACCESSIBILITY_MIN_FONT_SCALE;
  accessibilityMenuElements.increaseButton.disabled =
    accessibilityFontScale >= ACCESSIBILITY_MAX_FONT_SCALE;
  accessibilityMenuElements.resetFontButton.disabled =
    accessibilityFontScale === 1;
  accessibilityMenuElements.contrastCheckbox.checked = isHighContrastEnabled(
    accessibilityPreferences.contrast,
  );
  accessibilityMenuElements.motionCheckbox.checked = isMotionReductionEnabled(
    accessibilityPreferences.motion,
  );
}

function setAccessibilityPanelOpen(open, restoreFocus = false) {
  if (!accessibilityMenuElements) return;

  const { toggle, panel } = accessibilityMenuElements;
  panel.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade",
  );

  if (open) {
    panel.querySelector("[data-theme-choice]")?.focus();
  } else if (restoreFocus) {
    toggle.focus();
  }
}

function setAccessibilityStatus(message) {
  if (accessibilityMenuElements) {
    accessibilityMenuElements.status.textContent = message;
  }
}

function resetAccessibilityPreferences() {
  applyThemePreference("system", true);
  setAccessibilityFontScale(1, true);
  applyContrastPreference("system", true);
  applyMotionPreference("system", true);
  setAccessibilityStatus("Preferências restauradas para o padrão do sistema.");
}

function watchSystemPreference(query, callback) {
  if (typeof window.matchMedia !== "function") return;
  const mediaQuery = window.matchMedia(query);
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", callback);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(callback);
  }
}

function initializeAccessibilityMenu() {
  const header = document.querySelector("header");
  if (!header) return;

  const existingTools = document.getElementById("accessibility-tools");
  if (existingTools) {
    existingTools.remove();
  }

  accessibilityPreferences = {
    theme: readAccessibilityPreference(
      ACCESSIBILITY_STORAGE.theme,
      ACCESSIBILITY_THEMES,
      "system",
    ),
    contrast: readAccessibilityPreference(
      ACCESSIBILITY_STORAGE.contrast,
      ACCESSIBILITY_CONTRAST_MODES,
      "system",
    ),
    motion: readAccessibilityPreference(
      ACCESSIBILITY_STORAGE.motion,
      ACCESSIBILITY_MOTION_MODES,
      "system",
    ),
  };

  const savedScale = readAccessibilityPreference(
    ACCESSIBILITY_STORAGE.fontScale,
    ["0.9", "1", "1.1", "1.2", "1.3", "1.4"],
    "",
  );
  const inlineScale = document.documentElement.style.getPropertyValue(
    "--study-font-scale",
  );
  accessibilityFontScale = normalizeFontScale(savedScale || inlineScale || 1);

  applyThemePreference(accessibilityPreferences.theme);
  applyContrastPreference(accessibilityPreferences.contrast);
  applyMotionPreference(accessibilityPreferences.motion);
  setAccessibilityFontScale(accessibilityFontScale, false);

  accessibilityMenuElements = buildAccessibilityMenu();
  header.appendChild(accessibilityMenuElements.tools);
  updateAccessibilityMenuState();

  if (accessibilityListenersController) {
    accessibilityListenersController.abort();
  }
  accessibilityListenersController = new AbortController();
  const { signal } = accessibilityListenersController;
  const {
    toggle,
    panel,
    themeButtons,
    decreaseButton,
    increaseButton,
    resetFontButton,
    contrastCheckbox,
    motionCheckbox,
    resetButton,
  } = accessibilityMenuElements;

  toggle.addEventListener(
    "click",
    () => setAccessibilityPanelOpen(panel.hidden),
    { signal },
  );

  themeButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        applyThemePreference(button.dataset.themeChoice, true);
        setAccessibilityStatus(
          `Tema ${button.textContent.toLowerCase()} ativado.`,
        );
      },
      { signal },
    );
  });

  decreaseButton.addEventListener(
    "click",
    () => setAccessibilityFontScale(accessibilityFontScale - 0.1),
    { signal },
  );
  increaseButton.addEventListener(
    "click",
    () => setAccessibilityFontScale(accessibilityFontScale + 0.1),
    { signal },
  );
  resetFontButton.addEventListener(
    "click",
    () => setAccessibilityFontScale(1),
    { signal },
  );

  contrastCheckbox.addEventListener(
    "change",
    () => {
      applyContrastPreference(contrastCheckbox.checked ? "high" : "normal", true);
      setAccessibilityStatus(
        contrastCheckbox.checked
          ? "Alto contraste ativado."
          : "Alto contraste desativado.",
      );
    },
    { signal },
  );
  motionCheckbox.addEventListener(
    "change",
    () => {
      applyMotionPreference(motionCheckbox.checked ? "reduce" : "full", true);
      setAccessibilityStatus(
        motionCheckbox.checked
          ? "Movimento reduzido ativado."
          : "Movimento padrão ativado.",
      );
    },
    { signal },
  );
  resetButton.addEventListener("click", resetAccessibilityPreferences, {
    signal,
  });

  document.addEventListener(
    "click",
    (event) => {
      if (!panel.hidden && !accessibilityMenuElements.tools.contains(event.target)) {
        setAccessibilityPanelOpen(false);
      }
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        event.preventDefault();
        setAccessibilityPanelOpen(false, true);
      }
    },
    { signal },
  );

  watchSystemPreference("(prefers-color-scheme: dark)", () => {
    if (accessibilityPreferences.theme === "system") {
      applyThemePreference("system");
    }
  });
  watchSystemPreference("(prefers-contrast: more)", () => {
    if (accessibilityPreferences.contrast === "system") {
      applyContrastPreference("system");
    }
  });
  watchSystemPreference("(prefers-reduced-motion: reduce)", () => {
    if (accessibilityPreferences.motion === "system") {
      applyMotionPreference("system");
    }
  });
}

function toggleAccessibilityPanel() {
  if (accessibilityMenuElements) {
    setAccessibilityPanelOpen(accessibilityMenuElements.panel.hidden);
  }
}

// Mantém os nomes públicos usados por páginas antigas do repositório.
function accessibilityButton() {
  const legacyOptions = document.getElementById("accessibility-options");
  if (legacyOptions) {
    legacyOptions.style.display =
      legacyOptions.style.display === "flex" ? "none" : "flex";
    return;
  }
  toggleAccessibilityPanel();
}

function increaseFont() {
  setAccessibilityFontScale(accessibilityFontScale + 0.1);
}

function decreaseFont() {
  setAccessibilityFontScale(accessibilityFontScale - 0.1);
}

function resetFont() {
  setAccessibilityFontScale(1);
}

window.initializeAccessibilityMenu = initializeAccessibilityMenu;
window.accessibilityButton = accessibilityButton;
window.increaseFont = increaseFont;
window.decreaseFont = decreaseFont;
window.resetFont = resetFont;
