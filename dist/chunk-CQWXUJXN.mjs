/* ucs:component-css */
import "./styles/theme/themedTitles.css";
import {
  Select_default
} from "./chunk-EZBNIZ3O.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/theme/themeController.ts
var BUILT_IN_THEMES = [
  { id: "classic", label: "Classic", mode: "light", dataTheme: null, pair: "dark", family: "Governance", description: "Noir CTA, blue interaction (tokens.css :root)" },
  { id: "blue", label: "Blue", mode: "light", dataTheme: "blue", pair: "dark", family: "Governance" },
  { id: "dark", label: "Dark", mode: "dark", dataTheme: "dark", pair: "classic", family: "Governance" },
  { id: "green", label: "Green", mode: "light", dataTheme: "green", pair: "dark", family: "Governance" },
  { id: "mist", label: "Ion mist", mode: "light", dataTheme: "mist", pair: "dark", family: "Governance" },
  { id: "custom", label: "Custom (rose)", mode: "light", dataTheme: "custom", pair: "dark", family: "Governance" },
  { id: "blue-mist", label: "Blue + mist", mode: "light", dataTheme: "blue-mist", pair: "dark", family: "Governance" },
  { id: "green-mist", label: "Green + mist", mode: "light", dataTheme: "green-mist", pair: "dark", family: "Governance" },
  { id: "infinia-light", label: "Infinia light", mode: "light", dataTheme: "infinia-light", pair: "infinia-dark", family: "Infinia", description: "Xalion Forma UI v1.1.0 \u2014 white, black, #FFD400" },
  { id: "infinia-dark", label: "Infinia dark", mode: "dark", dataTheme: "infinia-dark", pair: "infinia-light", family: "Infinia", description: "Xalion Forma UI v1.1.0 \u2014 dark" }
];
var SYSTEM_THEME = "system";
var registry = new Map(BUILT_IN_THEMES.map((t) => [t.id, t]));
var listeners = /* @__PURE__ */ new Set();
var config = {
  defaultTheme: "classic",
  storageKey: "ucs-theme",
  system: { light: "classic", dark: "dark" },
  syncMetaThemeColor: true
};
var preference = "classic";
var state = null;
var mediaQuery = null;
var detachMedia = null;
var hasDom = () => typeof document !== "undefined";
function rootEl() {
  if (config.root)
    return config.root;
  return hasDom() ? document.documentElement : null;
}
function isAllowed(id) {
  if (id === SYSTEM_THEME)
    return !config.allowed || config.allowed.includes(SYSTEM_THEME);
  if (!registry.has(id))
    return false;
  return !config.allowed || config.allowed.includes(id);
}
function prefersDark() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function resolve(pref) {
  var _a, _b;
  const id = pref === SYSTEM_THEME ? prefersDark() ? config.system.dark : config.system.light : pref;
  return (_b = (_a = registry.get(id)) != null ? _a : registry.get(config.defaultTheme)) != null ? _b : registry.get("classic");
}
function readStored() {
  if (!config.storageKey || typeof window === "undefined")
    return null;
  try {
    return window.localStorage.getItem(config.storageKey);
  } catch (e) {
    return null;
  }
}
function writeStored(value) {
  if (!config.storageKey || typeof window === "undefined")
    return;
  try {
    window.localStorage.setItem(config.storageKey, value);
  } catch (e) {
  }
}
function syncMeta(root) {
  if (!config.syncMetaThemeColor || !hasDom())
    return;
  const value = getComputedStyle(root).getPropertyValue("--color-bg-surface").trim();
  if (!value)
    return;
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = value;
}
function buildState() {
  const theme = resolve(preference);
  const themes = [...registry.values()].filter((t) => !config.allowed || config.allowed.includes(t.id));
  return { preference, theme, mode: theme.mode, themes, systemAllowed: isAllowed(SYSTEM_THEME) };
}
function apply() {
  state = buildState();
  const root = rootEl();
  if (root) {
    if (state.theme.dataTheme)
      root.setAttribute("data-theme", state.theme.dataTheme);
    else
      root.removeAttribute("data-theme");
    root.style.colorScheme = state.theme.mode;
    syncMeta(root);
  }
  listeners.forEach((l) => l(state));
}
function watchSystem() {
  detachMedia == null ? void 0 : detachMedia();
  detachMedia = null;
  if (preference !== SYSTEM_THEME || typeof window === "undefined" || typeof window.matchMedia !== "function")
    return;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => apply();
  mediaQuery.addEventListener("change", onChange);
  detachMedia = () => mediaQuery == null ? void 0 : mediaQuery.removeEventListener("change", onChange);
}
function initTheme(options = {}) {
  var _a, _b, _c;
  config = {
    defaultTheme: (_a = options.defaultTheme) != null ? _a : "classic",
    storageKey: options.storageKey === void 0 ? "ucs-theme" : options.storageKey,
    system: (_b = options.system) != null ? _b : { light: "classic", dark: "dark" },
    syncMetaThemeColor: (_c = options.syncMetaThemeColor) != null ? _c : true,
    root: options.root,
    allowed: options.allowed
  };
  const stored = readStored();
  preference = stored && isAllowed(stored) ? stored : config.defaultTheme;
  watchSystem();
  apply();
  return state;
}
function setTheme(next, opts = {}) {
  if (!isAllowed(next))
    return getThemeState();
  preference = next;
  if (opts.persist !== false)
    writeStored(next);
  watchSystem();
  apply();
  return state;
}
function getToggleTarget() {
  var _a, _b;
  const current = getThemeState().theme;
  const id = (_a = current.pair) != null ? _a : current.mode === "dark" ? config.system.light : config.system.dark;
  if (!isAllowed(id))
    return null;
  return (_b = registry.get(id)) != null ? _b : null;
}
function toggleThemeMode(opts = {}) {
  const target = getToggleTarget();
  return target ? setTheme(target.id, opts) : getThemeState();
}
function getThemeState() {
  if (!state)
    state = buildState();
  return state;
}
function subscribeTheme(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function registerTheme(def) {
  registry.set(def.id, def);
  state = null;
  if (preference === def.id)
    apply();
}
function getThemes() {
  return [...registry.values()];
}

// src/theme/themedTitles.ts
var PARKED = "data-ucs-title";
var TIP_ID = "ucs-title-tip";
var active = null;
function enableThemedTitles(options = {}) {
  var _a;
  if (typeof document === "undefined")
    return () => {
    };
  active == null ? void 0 : active();
  const delay = (_a = options.delay) != null ? _a : 400;
  const exclude = options.exclude;
  const tip = document.createElement("div");
  tip.id = TIP_ID;
  tip.className = "ucs-title-tip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);
  let owner = null;
  let timer = null;
  let prevDescribedBy = null;
  const restore = () => {
    if (timer)
      clearTimeout(timer);
    timer = null;
    tip.hidden = true;
    if (!owner)
      return;
    const text = owner.getAttribute(PARKED);
    if (text !== null && !owner.hasAttribute("title"))
      owner.setAttribute("title", text);
    owner.removeAttribute(PARKED);
    if (prevDescribedBy)
      owner.setAttribute("aria-describedby", prevDescribedBy);
    else
      owner.removeAttribute("aria-describedby");
    owner = null;
    prevDescribedBy = null;
  };
  const place = (x, y, below) => {
    const pad = 8;
    const { innerWidth: vw, innerHeight: vh } = window;
    const r = tip.getBoundingClientRect();
    let left = Math.min(Math.max(pad, x), vw - r.width - pad);
    let top = below;
    if (top + r.height + pad > vh)
      top = y - r.height - 8;
    left = Math.max(pad, left);
    tip.style.left = `${left}px`;
    tip.style.top = `${Math.max(pad, top)}px`;
  };
  const claim = (el, show) => {
    if (owner === el)
      return;
    restore();
    const text = el.getAttribute("title");
    if (!text || !text.trim())
      return;
    owner = el;
    el.setAttribute(PARKED, text);
    el.removeAttribute("title");
    prevDescribedBy = el.getAttribute("aria-describedby");
    el.setAttribute("aria-describedby", prevDescribedBy ? `${prevDescribedBy} ${TIP_ID}` : TIP_ID);
    tip.textContent = text;
    timer = setTimeout(() => {
      tip.hidden = false;
      show();
    }, delay);
  };
  const target = (node) => {
    if (!(node instanceof Element))
      return null;
    const el = node.closest("[title]");
    if (!el || el === tip)
      return null;
    if (exclude && el.closest(exclude))
      return null;
    return el;
  };
  const onOver = (e) => {
    if (e.pointerType === "touch")
      return;
    const el = target(e.target);
    if (!el)
      return;
    const { clientX, clientY } = e;
    claim(el, () => place(clientX, clientY, clientY + 18));
  };
  const onOut = (e) => {
    if (!owner)
      return;
    const to = e.relatedTarget;
    if (to instanceof Node && owner.contains(to))
      return;
    restore();
  };
  const onFocus = (e) => {
    const el = target(e.target);
    if (!el)
      return;
    claim(el, () => {
      const r = el.getBoundingClientRect();
      place(r.left, r.top, r.bottom + 6);
    });
  };
  const onBlur = () => restore();
  const onKey = (e) => {
    if (e.key === "Escape")
      restore();
  };
  const onDismiss = () => restore();
  document.addEventListener("pointerover", onOver, true);
  document.addEventListener("pointerout", onOut, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("focusout", onBlur, true);
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("pointerdown", onDismiss, true);
  window.addEventListener("scroll", onDismiss, true);
  const dispose = () => {
    restore();
    document.removeEventListener("pointerover", onOver, true);
    document.removeEventListener("pointerout", onOut, true);
    document.removeEventListener("focusin", onFocus, true);
    document.removeEventListener("focusout", onBlur, true);
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("pointerdown", onDismiss, true);
    window.removeEventListener("scroll", onDismiss, true);
    tip.remove();
    if (active === dispose)
      active = null;
  };
  active = dispose;
  return dispose;
}

// src/theme/ThemeProvider.tsx
import { useMemo, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function useTheme() {
  const state2 = useSyncExternalStore(subscribeTheme, getThemeState, getThemeState);
  return useMemo(
    () => ({
      ...state2,
      setTheme: (next) => void setTheme(next),
      toggleMode: () => void toggleThemeMode(),
      toggleTarget: getToggleTarget()
    }),
    [state2]
  );
}
function ThemeProvider({ children, ...config2 }) {
  useState(() => initTheme(config2));
  return /* @__PURE__ */ jsx(Fragment, { children });
}
function ThemePicker({
  themes,
  includeSystem = false,
  systemLabel = "System",
  onThemeChange,
  label = "Theme",
  placeholder = "",
  ...selectProps
}) {
  const state2 = useTheme();
  const options = useMemo(() => {
    const list = themes ? themes.map((id) => state2.themes.find((t) => t.id === id)).filter((t) => !!t) : state2.themes;
    const opts = list.map((t) => ({ label: t.label, value: t.id }));
    if (includeSystem && state2.systemAllowed)
      opts.unshift({ label: systemLabel, value: SYSTEM_THEME });
    return opts;
  }, [themes, includeSystem, systemLabel, state2.themes, state2.systemAllowed]);
  return /* @__PURE__ */ jsx(
    Select_default,
    {
      ...selectProps,
      label,
      placeholder,
      options,
      value: state2.preference,
      onValueChange: (value) => {
        const next = setTheme(value);
        onThemeChange == null ? void 0 : onThemeChange(next);
      }
    }
  );
}
var SunGlyph = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ jsx("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
] });
var MoonGlyph = /* @__PURE__ */ jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" });
function ThemeModeIcon({ size = 20, show = "action", ...svgProps }) {
  const { mode } = useTheme();
  const sun = show === "action" ? mode === "dark" : mode === "light";
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
      "data-theme-icon": sun ? "sun" : "moon",
      ...svgProps,
      children: sun ? SunGlyph : MoonGlyph
    }
  );
}
function ThemeToggle({
  size = "md",
  getLabel = (m) => m === "dark" ? "Switch to dark theme" : "Switch to light theme",
  className,
  onToggle
}) {
  const { toggleTarget } = useTheme();
  if (!toggleTarget)
    return null;
  const label = getLabel(toggleTarget.mode);
  return /* @__PURE__ */ jsx(
    Button_default,
    {
      variant: "ghost",
      size,
      className,
      ariaLabel: label,
      title: label,
      icon: /* @__PURE__ */ jsx(ThemeModeIcon, {}),
      onClick: () => {
        const next = toggleThemeMode();
        onToggle == null ? void 0 : onToggle(next);
      }
    }
  );
}

export {
  BUILT_IN_THEMES,
  SYSTEM_THEME,
  initTheme,
  setTheme,
  getToggleTarget,
  toggleThemeMode,
  getThemeState,
  subscribeTheme,
  registerTheme,
  getThemes,
  enableThemedTitles,
  useTheme,
  ThemeProvider,
  ThemePicker,
  ThemeModeIcon,
  ThemeToggle
};
//# sourceMappingURL=chunk-CQWXUJXN.mjs.map