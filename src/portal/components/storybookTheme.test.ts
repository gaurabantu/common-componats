/**
 * Storybook theming infrastructure (Sprint 5, Slice L) — lives under src/ so vitest picks it up.
 * Covers: per-theme manager accents (selected-row text ≥ 4.5:1, no Infinia colour leaking into the
 * other 8 themes, Infinia palettes unchanged), theme persistence helpers (whitelist, try/catch) and
 * URL globals parsing.
 */
import {
  INFINIA_DARK,
  INFINIA_LIGHT,
  THEME_ACCENTS,
  resolveManagerPalette,
} from "../../../.storybook/manager-palettes";
import {
  THEME_STORAGE_KEY,
  TOOLBAR_THEMES,
  isDarkToolbarTheme,
  readStoredTheme,
  readThemeFromSearch,
  storeTheme,
} from "../../../.storybook/theme-bridge";

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const NON_INFINIA = TOOLBAR_THEMES.filter((t) => !t.startsWith("infinia"));
const INFINIA_HEX = new Set(
  [...Object.values(INFINIA_LIGHT), ...Object.values(INFINIA_DARK)]
    .filter((v) => typeof v === "string" && v.startsWith("#"))
    .map((v) => String(v).toLowerCase())
    // shared neutrals are fine; the brand accents are what must not leak
    .filter((v) => ["#6b5900", "#ffd400", "#ebc400", "#ffe04d"].includes(v)),
);

describe("manager palettes — per-theme selection accent", () => {
  it.each(NON_INFINIA)("%s: selected row white text ≥ 4.5:1", (theme) => {
    const p = resolveManagerPalette(theme);
    expect(contrast(p.colorSecondary, "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });

  it.each(NON_INFINIA)("%s: active bar accent ≥ 4.5:1 on barBg", (theme) => {
    const p = resolveManagerPalette(theme);
    expect(contrast(p.barSelectedColor, p.barBg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(p.barHoverColor, p.barBg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(NON_INFINIA)("%s: uses its own accent, never an Infinia brand colour", (theme) => {
    const p = resolveManagerPalette(theme);
    const accent = THEME_ACCENTS[theme as keyof typeof THEME_ACCENTS];
    expect(p.colorSecondary).toBe(accent.selected);
    expect(p.barSelectedColor).toBe(accent.bar);
    expect(p.booleanSelectedBg).toBe(accent.selected);
    for (const v of Object.values(p)) expect(INFINIA_HEX.has(String(v).toLowerCase())).toBe(false);
  });

  it("is stable regardless of the previously resolved theme (no stale palette)", () => {
    resolveManagerPalette("infinia-light");
    const light = resolveManagerPalette("light");
    expect(light.colorSecondary).toBe(THEME_ACCENTS.light.selected);
  });

  it("dark and infinia-dark use Storybook's dark base, others light", () => {
    for (const t of TOOLBAR_THEMES) {
      expect(resolveManagerPalette(t).sbBase).toBe(isDarkToolbarTheme(t) ? "dark" : "light");
    }
  });

  it("Infinia palettes are returned untouched", () => {
    expect(resolveManagerPalette("infinia-light")).toBe(INFINIA_LIGHT);
    expect(resolveManagerPalette("infinia-dark")).toBe(INFINIA_DARK);
    expect(INFINIA_LIGHT.colorSecondary).toBe("#6b5900");
    expect(INFINIA_DARK.colorSecondary).toBe("#ffd400");
  });

  it("unknown theme falls back to classic", () => {
    expect(resolveManagerPalette("nope").colorSecondary).toBe(THEME_ACCENTS.light.selected);
  });
});

/** In-memory Storage — Node ≥ 22 ships a partial global `localStorage` that shadows jsdom's. */
function memoryStorage(): Storage {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    key: (i: number) => [...m.keys()][i] ?? null,
    removeItem: (k: string) => void m.delete(k),
    setItem: (k: string, v: string) => void m.set(k, String(v)),
  };
}

describe("theme persistence", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", { configurable: true, value: memoryStorage() });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("round-trips a valid theme", () => {
    storeTheme("infinia-dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("infinia-dark");
    expect(readStoredTheme()).toBe("infinia-dark");
  });

  it("ignores unknown / tampered values", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "<img onerror=alert(1)>");
    expect(readStoredTheme()).toBeNull();
    storeTheme("evil");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("<img onerror=alert(1)>");
  });

  it("survives storage that throws", () => {
    vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded");
    });
    expect(readStoredTheme()).toBeNull();
    expect(() => storeTheme("dark")).not.toThrow();
  });
});

describe("readThemeFromSearch", () => {
  it("reads theme from Storybook URL globals", () => {
    expect(readThemeFromSearch("?path=/docs/x&globals=theme:infinia-dark")).toBe("infinia-dark");
    expect(readThemeFromSearch("?globals=a11y.manual:!true;theme:mist")).toBe("mist");
  });
  it("returns null when absent or unknown", () => {
    expect(readThemeFromSearch("?path=/docs/x")).toBeNull();
    expect(readThemeFromSearch("?globals=theme:hacker")).toBeNull();
  });
});
