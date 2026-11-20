/**
 * Theme controller — the runtime half of the theming concept.
 *
 * `tokens.css` defines every theme as a `data-theme` block; this module is the one place that
 * *chooses* a theme: it writes `data-theme` on the document root, keeps `color-scheme` and
 * `<meta name="theme-color">` in step, remembers the choice, and can follow the OS light/dark
 * setting. Apps never hard-code `data-theme`; they call `initTheme()` / `setTheme()`.
 *
 * Framework-agnostic (no React). React bindings live in `ThemeProvider.tsx`.
 */

export type ThemeMode = "light" | "dark";

export interface ThemeDefinition {
  /** Stable id used by the API, storage and pickers. */
  id: string;
  /** Human label for pickers. */
  label: string;
  /** Light or dark surfaces — drives `color-scheme` and the `system` pairing. */
  mode: ThemeMode;
  /** Value written to `data-theme`; `null` = remove the attribute (classic `:root` default). */
  dataTheme: string | null;
  /** Optional grouping for pickers (e.g. "Infinia", "Governance"). */
  family?: string;
  /** Counterpart in the other mode, used by `toggleThemeMode()` (e.g. infinia-light ↔ infinia-dark). */
  pair?: string;
  description?: string;
}

/** Every theme shipped in `src/design-system/tokens.css`. */
export const BUILT_IN_THEMES: readonly ThemeDefinition[] = [
  { id: "classic", label: "Classic", mode: "light", dataTheme: null, pair: "dark", family: "Governance", description: "Noir CTA, blue interaction (tokens.css :root)" },
  { id: "blue", label: "Blue", mode: "light", dataTheme: "blue", pair: "dark", family: "Governance" },
  { id: "dark", label: "Dark", mode: "dark", dataTheme: "dark", pair: "classic", family: "Governance" },
  { id: "green", label: "Green", mode: "light", dataTheme: "green", pair: "dark", family: "Governance" },
  { id: "mist", label: "Ion mist", mode: "light", dataTheme: "mist", pair: "dark", family: "Governance" },
  { id: "custom", label: "Custom (rose)", mode: "light", dataTheme: "custom", pair: "dark", family: "Governance" },
  { id: "blue-mist", label: "Blue + mist", mode: "light", dataTheme: "blue-mist", pair: "dark", family: "Governance" },
  { id: "green-mist", label: "Green + mist", mode: "light", dataTheme: "green-mist", pair: "dark", family: "Governance" },
  { id: "infinia-light", label: "Infinia light", mode: "light", dataTheme: "infinia-light", pair: "infinia-dark", family: "Infinia", description: "Xalion Forma UI v1.1.0 — white, black, #FFD400" },
  { id: "infinia-dark", label: "Infinia dark", mode: "dark", dataTheme: "infinia-dark", pair: "infinia-light", family: "Infinia", description: "Xalion Forma UI v1.1.0 — dark" },
];

/** Preference value that follows the OS light/dark setting. */
export const SYSTEM_THEME = "system";

export interface ThemeConfig {
  /** Theme used when nothing is stored (or the stored value is not allowed). @default "classic" */
  defaultTheme?: string;
  /** localStorage key for the user's choice; `null` disables persistence. @default "ucs-theme" */
  storageKey?: string | null;
  /** Element that receives `data-theme`. @default document.documentElement */
  root?: HTMLElement;
  /** Pair used when the preference is `"system"`. @default { light: "classic", dark: "dark" } */
  system?: { light: string; dark: string };
  /** Restrict selectable ids (pickers + stored values). `"system"` may be included. @default all registered + system */
  allowed?: string[];
  /** Keep `<meta name="theme-color">` equal to the theme's `--color-bg-surface`. @default true */
  syncMetaThemeColor?: boolean;
}

export interface ThemeState {
  /** What the user chose: a theme id or `"system"`. */
  preference: string;
  /** The theme actually applied. */
  theme: ThemeDefinition;
  /** Shortcut for `theme.mode`. */
  mode: ThemeMode;
  /** Themes selectable under the current config (excludes `"system"`). */
  themes: ThemeDefinition[];
  /** Whether `"system"` is selectable. */
  systemAllowed: boolean;
}

type Listener = (state: ThemeState) => void;

const registry = new Map<string, ThemeDefinition>(BUILT_IN_THEMES.map((t) => [t.id, t]));
const listeners = new Set<Listener>();

let config: Required<Omit<ThemeConfig, "root" | "allowed">> & { root?: HTMLElement; allowed?: string[] } = {
  defaultTheme: "classic",
  storageKey: "ucs-theme",
  system: { light: "classic", dark: "dark" },
  syncMetaThemeColor: true,
};
let preference = "classic";
let state: ThemeState | null = null;
let mediaQuery: MediaQueryList | null = null;
let detachMedia: (() => void) | null = null;

const hasDom = () => typeof document !== "undefined";

function rootEl(): HTMLElement | null {
  if (config.root) return config.root;
  return hasDom() ? document.documentElement : null;
}

function isAllowed(id: string): boolean {
  if (id === SYSTEM_THEME) return !config.allowed || config.allowed.includes(SYSTEM_THEME);
  if (!registry.has(id)) return false;
  return !config.allowed || config.allowed.includes(id);
}

function prefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(pref: string): ThemeDefinition {
  const id = pref === SYSTEM_THEME ? (prefersDark() ? config.system.dark : config.system.light) : pref;
  return registry.get(id) ?? registry.get(config.defaultTheme) ?? registry.get("classic")!;
}

function readStored(): string | null {
  if (!config.storageKey || typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(config.storageKey);
  } catch {
    return null;
  }
}

function writeStored(value: string): void {
  if (!config.storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(config.storageKey, value);
  } catch {
    /* private mode / blocked storage — the theme still applies for this session */
  }
}

function syncMeta(root: HTMLElement): void {
  if (!config.syncMetaThemeColor || !hasDom()) return;
  const value = getComputedStyle(root).getPropertyValue("--color-bg-surface").trim();
  if (!value) return;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = value;
}

function buildState(): ThemeState {
  const theme = resolve(preference);
  const themes = [...registry.values()].filter((t) => !config.allowed || config.allowed.includes(t.id));
  return { preference, theme, mode: theme.mode, themes, systemAllowed: isAllowed(SYSTEM_THEME) };
}

function apply(): void {
  state = buildState();
  const root = rootEl();
  if (root) {
    if (state.theme.dataTheme) root.setAttribute("data-theme", state.theme.dataTheme);
    else root.removeAttribute("data-theme");
    root.style.colorScheme = state.theme.mode;
    syncMeta(root);
  }
  listeners.forEach((l) => l(state!));
}

function watchSystem(): void {
  detachMedia?.();
  detachMedia = null;
  if (preference !== SYSTEM_THEME || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => apply();
  mediaQuery.addEventListener("change", onChange);
  detachMedia = () => mediaQuery?.removeEventListener("change", onChange);
}

/**
 * Configure and apply the theme. Call once, before the first render (e.g. top of `main.tsx`).
 * Order: stored choice (if allowed) → `defaultTheme`.
 */
export function initTheme(options: ThemeConfig = {}): ThemeState {
  config = {
    defaultTheme: options.defaultTheme ?? "classic",
    storageKey: options.storageKey === undefined ? "ucs-theme" : options.storageKey,
    system: options.system ?? { light: "classic", dark: "dark" },
    syncMetaThemeColor: options.syncMetaThemeColor ?? true,
    root: options.root,
    allowed: options.allowed,
  };
  const stored = readStored();
  preference = stored && isAllowed(stored) ? stored : config.defaultTheme;
  watchSystem();
  apply();
  return state!;
}

/** Switch theme (id or `"system"`). Unknown / disallowed ids are ignored. */
export function setTheme(next: string, opts: { persist?: boolean } = {}): ThemeState {
  if (!isAllowed(next)) return getThemeState();
  preference = next;
  if (opts.persist !== false) writeStored(next);
  watchSystem();
  apply();
  return state!;
}

/**
 * The theme `toggleThemeMode()` would switch to: the current theme's `pair`, else the `system`
 * pair for the other mode. `null` when that theme is not registered / allowed.
 */
export function getToggleTarget(): ThemeDefinition | null {
  const current = getThemeState().theme;
  const id = current.pair ?? (current.mode === "dark" ? config.system.light : config.system.dark);
  if (!isAllowed(id)) return null;
  return registry.get(id) ?? null;
}

/** Flip between light and dark (e.g. infinia-light ↔ infinia-dark). No-op when there is no allowed counterpart. */
export function toggleThemeMode(opts: { persist?: boolean } = {}): ThemeState {
  const target = getToggleTarget();
  return target ? setTheme(target.id, opts) : getThemeState();
}

/** Current state (stable object until the theme changes — safe for `useSyncExternalStore`). */
export function getThemeState(): ThemeState {
  if (!state) state = buildState();
  return state;
}

/** Listen for theme changes; returns an unsubscribe function. */
export function subscribeTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Add an app-specific theme. Its colours must exist as a `[data-theme="<dataTheme>"]` block in the
 * app's CSS (token values only — same contract as tokens.css). Re-registering an id replaces it.
 */
export function registerTheme(def: ThemeDefinition): void {
  registry.set(def.id, def);
  state = null;
  if (preference === def.id) apply();
}

/** All registered themes (built-in + registered). */
export function getThemes(): ThemeDefinition[] {
  return [...registry.values()];
}

/** Test helper — restore module defaults. @internal */
export function __resetThemeForTests(): void {
  detachMedia?.();
  detachMedia = null;
  registry.clear();
  BUILT_IN_THEMES.forEach((t) => registry.set(t.id, t));
  listeners.clear();
  config = { defaultTheme: "classic", storageKey: "ucs-theme", system: { light: "classic", dark: "dark" }, syncMetaThemeColor: true };
  preference = "classic";
  state = null;
}
