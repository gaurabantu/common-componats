import type { Meta, StoryObj } from "@storybook/react";
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { addons } from "@storybook/preview-api";
import { UPDATE_GLOBALS } from "@storybook/core/core-events";
import { Description, Primary, Title } from "@storybook/blocks";
import Button from "./components/atoms/Button";
import Badge from "./components/atoms/Badge";
import Checkbox from "./components/atoms/Checkbox";
import Input from "./components/atoms/TextInput";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "./components/molecules/Card";
import { List, ListItem } from "./components/molecules/List";
import SegmentedControl from "./components/molecules/SegmentedControl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/molecules/Tabs";
import { copyText } from "./components/molecules/CodeBlock/CodeBlock.utils";
import { IconCheck, IconCopy, IconEye } from "./portal/icons";
import "./ThemeShowcase.css";

/* ======================================================================== */
/* Theme catalogue                                                          */
/* ======================================================================== */

/** Storybook toolbar values (`.storybook/preview.tsx` → globalTypes.theme). `light` = no data-theme. */
export type ShowcaseThemeId =
  | "light"
  | "blue"
  | "dark"
  | "green"
  | "mist"
  | "custom"
  | "blue-mist"
  | "green-mist"
  | "infinia-light"
  | "infinia-dark";

export interface ShowcaseTheme {
  id: ShowcaseThemeId;
  name: string;
  mode: "Light" | "Dark";
  summary: string;
}

export const SHOWCASE_THEMES: readonly ShowcaseTheme[] = [
  { id: "light", name: "Classic", mode: "Light", summary: "Noir actions on a cool grey page. The default — no attribute." },
  { id: "blue", name: "Blue", mode: "Light", summary: "The classic palette, declared explicitly." },
  { id: "dark", name: "Dark", mode: "Dark", summary: "Slate surfaces, blue interaction layer." },
  { id: "green", name: "Green", mode: "Light", summary: "Green interaction layer on classic surfaces." },
  { id: "mist", name: "Ion mist", mode: "Light", summary: "Soft mist page and surfaces, noir actions." },
  { id: "custom", name: "Custom rose", mode: "Light", summary: "Example brand: rose interaction slots only." },
  { id: "blue-mist", name: "Blue + mist", mode: "Light", summary: "Blue actions on mist shells." },
  { id: "green-mist", name: "Green + mist", mode: "Light", summary: "Green actions on mist shells." },
  { id: "infinia-light", name: "Infinia light", mode: "Light", summary: "White-led, ink-defined, yellow-highlighted." },
  { id: "infinia-dark", name: "Infinia dark", mode: "Dark", summary: "Ink surfaces with the yellow highlight." },
];

const THEME_BY_ID = new Map(SHOWCASE_THEMES.map((t) => [t.id, t]));

/** `data-theme` value as written on `<html>` (classic omits the attribute). */
export function dataThemeAttr(id: ShowcaseThemeId): string {
  return id === "light" ? "(none)" : `data-theme="${id}"`;
}

/** Document theme → showcase id (`classic` and a missing attribute both mean `light`). */
export function readDocumentTheme(root: HTMLElement = document.documentElement): ShowcaseThemeId {
  const v = root.getAttribute("data-theme");
  if (!v || v === "classic") return "light";
  return THEME_BY_ID.has(v as ShowcaseThemeId) ? (v as ShowcaseThemeId) : "light";
}

/** Follows the toolbar: `.storybook/theme-bridge.ts` writes `data-theme` on `<html>` for every page type. */
function useDocumentTheme(): ShowcaseThemeId {
  const [theme, setTheme] = useState<ShowcaseThemeId>(() =>
    typeof document === "undefined" ? "light" : readDocumentTheme(),
  );
  useEffect(() => {
    const root = document.documentElement;
    setTheme(readDocumentTheme(root));
    const mo = new MutationObserver(() => setTheme(readDocumentTheme(root)));
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return theme;
}

/**
 * Apply a theme everywhere: ask Storybook to update the `theme` global (toolbar, URL, every story
 * and docs page follow). Outside Storybook (tests, embeds) fall back to the `<html>` attribute.
 */
export function applyGlobalTheme(id: ShowcaseThemeId): void {
  try {
    addons.getChannel().emit(UPDATE_GLOBALS, { globals: { theme: id } });
    return;
  } catch {
    /* no Storybook channel */
  }
  const root = document.documentElement;
  if (id === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
}

/* ======================================================================== */
/* Nested theme scope                                                       */
/* ======================================================================== */

export interface ThemeScopeProps {
  theme: ShowcaseThemeId;
  /** `span` keeps the markup valid inside a `<button>` tile. */
  as?: "div" | "span";
  className?: string;
  children: React.ReactNode;
}

/**
 * Renders `children` in `theme` regardless of the document theme, via a nested `data-theme`.
 * tokens.css re-declares the full base palette on every `[data-theme]` element (Sprint 5), so derived
 * tokens resolve against the nested theme and theme-only role tokens do not leak in from the document.
 * Classic is `data-theme="classic"` (the root itself simply omits the attribute).
 */
export function ThemeScope({ theme, as = "div", className, children }: ThemeScopeProps) {
  const Tag = as;
  return (
    <Tag
      data-theme={theme === "light" ? "classic" : theme}
      data-ts-scope={theme}
      className={["ts-scope", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}

/* ======================================================================== */
/* Colour maths (resolved from computed styles — never from hardcoded hex)  */
/* ======================================================================== */

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Parses Chrome/Firefox computed colours: `rgb()`, `rgba()`, `color(srgb r g b / a)`. */
export function parseCssColor(input: string): Rgba | null {
  const s = input.trim();
  let m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i.exec(s);
  if (m) {
    const a = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    return { r: +m[1], g: +m[2], b: +m[3], a };
  }
  m = /^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/i.exec(s);
  if (m) {
    const a = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    const ch = (v: string) => Math.round(Math.min(1, Math.max(0, parseFloat(v))) * 255);
    return { r: ch(m[1]), g: ch(m[2]), b: ch(m[3]), a };
  }
  return null;
}

/** Alpha-composite `top` over an opaque `base`. */
export function composite(top: Rgba, base: Rgba): Rgba {
  const a = top.a;
  return {
    r: Math.round(top.r * a + base.r * (1 - a)),
    g: Math.round(top.g * a + base.g * (1 - a)),
    b: Math.round(top.b * a + base.b * (1 - a)),
    a: 1,
  };
}

export function toHex(c: Rgba): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  const alpha = c.a < 1 ? h(c.a * 255) : "";
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${alpha}`.toUpperCase();
}

function channel(v: number): number {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(c: Rgba): number {
  return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
}

export function contrastRatio(a: Rgba, b: Rgba): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* ======================================================================== */
/* Swatch catalogue                                                         */
/* ======================================================================== */

type Check = "text" | "ui" | "none";

export interface SwatchDef {
  /** Token shown and copied. */
  token: string;
  /** Short caption under the swatch (the "step"). */
  label: string;
  /** Fallback CSS used when the token is not declared yet (Sprint 5 state tokens). */
  fallback?: string;
  /** Foreground painted on the swatch and used for the contrast ratio (text checks). */
  on?: string;
  /** `text` = 4.5:1 (on `on`, else against --color-bg-surface) · `ui` = 3:1 against surface · `none` = exempt. */
  check: Check;
  usage: string;
}

export interface SwatchGroup {
  id: "brand" | "surfaces" | "text" | "status" | "states";
  title: string;
  description: string;
  swatches: SwatchDef[];
}

export const SWATCH_GROUPS: readonly SwatchGroup[] = [
  {
    id: "brand",
    title: "Brand & interaction",
    description: "The §42 interaction slots and primary button fill. Pairs are checked with the text that sits on them.",
    swatches: [
      { token: "--color-theme-primary", label: "primary", on: "--color-theme-text", check: "text", usage: "Interaction accent: selected indicators, primary links, toggles." },
      { token: "--color-theme-hover", label: "hover", on: "--color-theme-text", check: "text", usage: "Accent under the pointer." },
      { token: "--color-theme-active", label: "active", on: "--color-theme-text", check: "text", usage: "Accent while pressed." },
      { token: "--color-theme-disabled", label: "disabled", on: "--color-theme-text", check: "none", usage: "Disabled accent fill (exempt from contrast, WCAG 1.4.3)." },
      { token: "--button-primary-default-bg", label: "button fill", on: "--button-primary-default-text", check: "text", usage: "Primary Button background." },
      { token: "--color-brand-secondary", label: "accent", check: "ui", usage: "Secondary brand accent for emphasis and graphics." },
      { token: "--color-text-link", label: "link", check: "text", usage: "Inline links on surfaces." },
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    description: "Page, cards and fills. Each is checked with the text colour that normally sits on it.",
    swatches: [
      { token: "--color-bg-page", label: "page", on: "--color-text-primary", check: "text", usage: "App canvas behind cards." },
      { token: "--color-bg-surface", label: "surface", on: "--color-text-primary", check: "text", usage: "Cards, panels, tables." },
      { token: "--color-bg-elevated", label: "elevated", on: "--color-text-primary", check: "text", usage: "Modals, popovers, menus." },
      { token: "--color-bg-sidebar", label: "sidebar", on: "--color-text-primary", check: "text", usage: "Navigation rail background." },
      { token: "--color-fill-muted", label: "muted", on: "--color-text-secondary", check: "text", usage: "Quiet fills: chips, code, skeletons." },
      { token: "--color-surface-inverse", label: "inverse", on: "--color-text-on-inverse", check: "text", usage: "Strong header bars and inverse chips." },
    ],
  },
  {
    id: "text",
    title: "Text & borders",
    description: "Text is checked at 4.5:1 and control borders / focus at 3:1 against the surface.",
    swatches: [
      { token: "--color-text-primary", label: "text", check: "text", usage: "Body copy and headings." },
      { token: "--color-text-secondary", label: "secondary", check: "text", usage: "Descriptions, captions, meta." },
      { token: "--color-text-disabled", label: "disabled", check: "none", usage: "Disabled labels (exempt, WCAG 1.4.3)." },
      { token: "--color-border-default", label: "border", check: "ui", usage: "Control boundaries (inputs, checkboxes)." },
      { token: "--color-border-strong", label: "strong", check: "ui", usage: "Emphasised outlines and dividers." },
      { token: "--color-border-subtle", label: "hairline", check: "none", usage: "Decorative 1px hairlines between regions." },
      { token: "--color-focus-ring", label: "focus", check: "ui", usage: "Keyboard focus ring (WCAG 2.4.7 / 2.4.11)." },
    ],
  },
  {
    id: "status",
    title: "Status",
    description: "Feedback colours. Fills are checked with their strong foreground; strong tones against the surface.",
    swatches: [
      { token: "--color-success-fill", label: "success fill", on: "--color-success-strong", check: "text", usage: "Success alert / badge background." },
      { token: "--color-warning-fill", label: "warning fill", on: "--color-warning-strong", check: "text", usage: "Warning alert / badge background." },
      { token: "--color-danger-fill", label: "danger fill", on: "--color-danger-strong", check: "text", usage: "Error alert / badge background." },
      { token: "--color-info-fill", label: "info fill", on: "--color-info-strong", check: "text", usage: "Info alert / badge background." },
      { token: "--color-success-strong", label: "success", check: "text", usage: "Success text and icons." },
      { token: "--color-warning-strong", label: "warning", check: "text", usage: "Warning text and icons." },
      { token: "--color-danger-strong", label: "danger", check: "text", usage: "Error text and icons." },
      { token: "--color-info-strong", label: "info", check: "text", usage: "Info text and icons." },
    ],
  },
  {
    id: "states",
    title: "Interaction states",
    description: "Hover, selected, pressed and text-selection colours derived from this theme's palette.",
    swatches: [
      { token: "--color-state-hover-bg", label: "hover", fallback: "var(--ts-hover-bg)", on: "--color-state-hover-fg", check: "text", usage: "Row, menu item, tab, option and day under the pointer." },
      { token: "--color-state-active-bg", label: "pressed", fallback: "var(--ts-active-bg)", on: "--color-text-primary", check: "text", usage: "Row, option or ghost control while pressed." },
      { token: "--color-state-selected-bg", label: "selected fill", fallback: "var(--ts-selected-bg)", on: "--color-state-selected-fg", check: "text", usage: "Filled selection: current page, checked box, selected day or segment." },
      { token: "--color-state-selected-subtle-bg", label: "selected row", fallback: "var(--ts-selected-subtle-bg)", on: "--color-text-primary", check: "text", usage: "Row selection tint: list, table, listbox option." },
      { token: "--color-state-selected-border", label: "selected edge", fallback: "var(--ts-selected-border)", check: "ui", usage: "Selection edge, tab indicator, selected tile ring (3:1)." },
      { token: "--color-state-selected-text", label: "selected text", fallback: "var(--ts-selected-text)", check: "text", usage: "Selected label on a plain surface (tabs)." },
      { token: "--color-state-disabled-bg", label: "disabled", fallback: "var(--ts-disabled-bg)", on: "--color-state-disabled-fg", check: "none", usage: "Disabled control fill (exempt, WCAG 1.4.3)." },
      { token: "--color-selection-bg", label: "text selection", fallback: "var(--ts-selection-bg)", on: "--color-selection-fg", check: "text", usage: "::selection highlight." },
    ],
  },
];

const ALL_SWATCHES = SWATCH_GROUPS.flatMap((g) => g.swatches.map((s) => ({ ...s, group: g.title })));

/** Fallbacks for pair foregrounds that are new Sprint 5 tokens. */
const ON_FALLBACK: Record<string, string> = {
  "--color-state-hover-fg": "var(--ts-hover-fg)",
  "--color-state-selected-fg": "var(--ts-selected-fg)",
  "--color-state-disabled-fg": "var(--ts-disabled-fg)",
  "--color-selection-fg": "var(--ts-selection-fg)",
};

const paintOf = (s: Pick<SwatchDef, "token" | "fallback">) =>
  s.fallback ? `var(${s.token}, ${s.fallback})` : `var(${s.token})`;
const onPaintOf = (token: string) =>
  ON_FALLBACK[token] ? `var(${token}, ${ON_FALLBACK[token]})` : `var(${token})`;

/* ======================================================================== */
/* Live token resolution                                                    */
/* ======================================================================== */

export interface ResolvedSwatch {
  defined: boolean;
  hex: string | null;
  ratio: number | null;
  target: number | null;
  pass: boolean | null;
}

function resolveSwatches(host: HTMLElement): Record<string, ResolvedSwatch> {
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.display = "none";
  host.appendChild(probe);
  const hostStyle = getComputedStyle(host);
  const read = (paint: string): Rgba | null => {
    probe.style.backgroundColor = "";
    probe.style.backgroundColor = paint;
    return parseCssColor(getComputedStyle(probe).backgroundColor);
  };
  const surface = read("var(--color-bg-surface)");
  const out: Record<string, ResolvedSwatch> = {};
  for (const s of ALL_SWATCHES) {
    const defined = hostStyle.getPropertyValue(s.token).trim() !== "";
    const raw = read(paintOf(s));
    const flat = raw && surface ? (raw.a < 1 ? composite(raw, surface) : raw) : null;
    let ratio: number | null = null;
    let target: number | null = null;
    if (flat && surface && s.check !== "none") {
      target = s.check === "text" ? 4.5 : 3;
      if (s.on) {
        const fg = read(onPaintOf(s.on));
        if (fg) ratio = contrastRatio(fg.a < 1 ? composite(fg, flat) : fg, flat);
      } else {
        ratio = contrastRatio(flat, surface);
      }
    }
    out[s.token] = {
      defined,
      hex: raw ? toHex(raw) : null,
      ratio,
      target,
      pass: ratio === null || target === null ? null : ratio >= target - 0.005,
    };
  }
  probe.remove();
  return out;
}

function useResolvedSwatches(hostRef: React.RefObject<HTMLElement | null>, theme: string) {
  const [resolved, setResolved] = useState<Record<string, ResolvedSwatch>>({});
  useEffect(() => {
    if (hostRef.current) setResolved(resolveSwatches(hostRef.current));
  }, [hostRef, theme]);
  return resolved;
}

/* ======================================================================== */
/* Announcer (copy / apply feedback)                                        */
/* ======================================================================== */

function useAnnouncer() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announce = useCallback((text: string) => {
    if (timer.current) clearTimeout(timer.current);
    // Clear first so an identical message is announced again.
    setMessage("");
    timer.current = setTimeout(() => setMessage(text), 60);
  }, []);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return { message, announce };
}

/* ======================================================================== */
/* Pieces                                                                   */
/* ======================================================================== */

const SIGNATURE: { token: string; label: string; share: number }[] = [
  { token: "--color-bg-page", label: "Page", share: 46 },
  { token: "--color-bg-surface", label: "Surface", share: 26 },
  { token: "--color-text-primary", label: "Ink", share: 14 },
  { token: "--color-theme-primary", label: "Primary", share: 9 },
  { token: "--color-brand-secondary", label: "Accent", share: 5 },
];

function SignatureBar({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "ts-bar ts-bar--sm" : "ts-bar"} aria-hidden="true">
      {SIGNATURE.map((s) => (
        <span key={s.token} className="ts-bar__seg" style={{ width: `${s.share}%`, background: `var(${s.token})` }} />
      ))}
    </span>
  );
}

const STATE_COLUMNS = [
  { id: "default", label: "Default", short: "Aa" },
  { id: "hover", label: "Hover", short: "Aa" },
  { id: "selected", label: "Selected", short: "Aa" },
  { id: "active", label: "Pressed", short: "Aa" },
  { id: "focus", label: "Focus-visible", short: "Aa" },
  { id: "disabled", label: "Disabled", short: "Aa" },
] as const;

type StateId = (typeof STATE_COLUMNS)[number]["id"];

function StateSpecimen({ state, children }: { state: StateId; children: React.ReactNode }) {
  const cls = state === "default" ? "ts-spec" : `ts-spec ts-spec--${state}`;
  // Disabled text is exempt from contrast (WCAG 1.4.3 inactive components) — say so to tooling too.
  return (
    <span className={cls} aria-disabled={state === "disabled" ? true : undefined}>
      {children}
    </span>
  );
}

function ThemeTile({ theme, current, onApply }: { theme: ShowcaseTheme; current: boolean; onApply: (t: ShowcaseTheme) => void }) {
  return (
    <button
      type="button"
      className="ts-tile"
      data-ts-tile={theme.id}
      aria-pressed={current}
      aria-label={`${theme.name} theme, ${theme.mode.toLowerCase()}${current ? ", active" : ""}. Apply to every page.`}
      onClick={() => onApply(theme)}
    >
      <ThemeScope theme={theme.id} as="span">
        <span className="ts-tile__preview">
          <SignatureBar small />
          <span className="ts-tile__card">
            <span className="ts-tile__row">
              <span className="ts-tile__sample-btn">Primary</span>
              <span className="ts-tile__sample-link">Link</span>
            </span>
            <span className="ts-states-mini">
              {STATE_COLUMNS.map((c) => (
                <StateSpecimen key={c.id} state={c.id}>
                  {c.short}
                </StateSpecimen>
              ))}
            </span>
            <span className="ts-tile__dots">
              {["--color-theme-primary", "--color-text-primary", "--color-border-default", "--color-success-strong", "--color-warning-strong", "--color-danger-strong"].map((t) => (
                <span key={t} className="ts-dot" style={{ background: `var(${t})` }} />
              ))}
            </span>
          </span>
        </span>
      </ThemeScope>
      <span className="ts-tile__meta">
        <span>
          <span className="ts-tile__name">{theme.name}</span>
          <span className="ts-tile__attr">{dataThemeAttr(theme.id)}</span>
        </span>
        <span className="ts-tile__flag">
          {current ? (
            <span className="ts-flag-active">
              <IconCheck width={12} height={12} />
              Active
            </span>
          ) : (
            <Badge variant="neutral" tone="outline" size="sm">
              {theme.mode}
            </Badge>
          )}
        </span>
      </span>
    </button>
  );
}

function RatioLabel({ r }: { r: ResolvedSwatch | undefined }) {
  if (!r || r.ratio === null || r.target === null) {
    return <span className="ts-ratio">{r && r.target === null && r.hex ? "exempt" : " "}</span>;
  }
  return (
    <span className="ts-ratio" data-pass={r.pass ? "true" : "false"}>
      {r.ratio.toFixed(2)}:1 · {r.pass ? (r.target === 3 ? "UI 3:1" : "AA") : `below ${r.target}:1`}
    </span>
  );
}

function Swatch({
  def,
  resolved,
  selected,
  copied,
  onPick,
}: {
  def: SwatchDef;
  resolved: ResolvedSwatch | undefined;
  selected: boolean;
  copied: boolean;
  onPick: (d: SwatchDef) => void;
}) {
  const missing = resolved && !resolved.defined;
  return (
    <li>
      <button
        type="button"
        className="ts-swatch"
        aria-pressed={selected}
        aria-label={`${def.token}${resolved?.hex ? `, ${resolved.hex}` : ""}${missing ? ", not defined, using fallback" : ""}. Copy token.`}
        onClick={() => onPick(def)}
      >
        <span className="ts-swatch__chip" style={{ background: paintOf(def) }}>
          {def.on && def.check !== "none" ? (
            <span className="ts-swatch__sample" style={{ color: onPaintOf(def.on) }} aria-hidden="true">
              Aa
            </span>
          ) : null}
          {copied ? (
            <span className="ts-swatch__copied" aria-hidden="true">
              <IconCheck width={12} height={12} /> Copied
            </span>
          ) : null}
        </span>
        <span className="ts-swatch__label">{def.label}</span>
        <span className={missing ? "ts-swatch__value ts-swatch__value--missing" : "ts-swatch__value"}>
          {missing ? "fallback" : resolved?.hex ?? "—"}
        </span>
        <RatioLabel r={resolved} />
      </button>
    </li>
  );
}

/* ======================================================================== */
/* Sections                                                                 */
/* ======================================================================== */

export type ShowcaseSection = "signature" | "compare" | "palette" | "states";

export interface ThemeShowcaseProps {
  /** Sections to render, in order. Defaults to all four. */
  sections?: ShowcaseSection[];
}

const PALETTE_TABS = [
  { value: "all", label: "All palettes" },
  ...SWATCH_GROUPS.map((g) => ({ value: g.id, label: g.title })),
];

function PaletteExplorer({ theme, announce }: { theme: ShowcaseThemeId; announce: (m: string) => void }) {
  const uid = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const resolved = useResolvedSwatches(hostRef, theme);
  const [tab, setTab] = useState("all");
  const [picked, setPicked] = useState<string>(SWATCH_GROUPS[0].swatches[0].token);
  const [copied, setCopied] = useState<string | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
  }, []);

  const copy = useCallback(
    async (text: string, flagToken?: string) => {
      const ok = await copyText(text);
      announce(ok ? `Copied ${text}` : `Copy failed. Select and copy ${text} manually.`);
      if (ok && flagToken) {
        setCopied(flagToken);
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopied(null), 1600);
      }
    },
    [announce],
  );

  const onPick = useCallback(
    (d: SwatchDef) => {
      setPicked(d.token);
      void copy(`var(${d.token})`, d.token);
    },
    [copy],
  );

  const pickedDef = ALL_SWATCHES.find((s) => s.token === picked) ?? ALL_SWATCHES[0];
  const pickedRes = resolved[pickedDef.token];
  const groups = tab === "all" ? SWATCH_GROUPS : SWATCH_GROUPS.filter((g) => g.id === tab);

  const renderGroups = () =>
    groups.map((g) => (
      <section key={g.id} className="ts-group" aria-labelledby={`${uid}-group-${g.id}`}>
        <div>
          <h3 id={`${uid}-group-${g.id}`} className="ts-group__title">
            {g.title}
          </h3>
          <p className="ts-group__desc">{g.description}</p>
        </div>
        <ul className="ts-swatches">
          {g.swatches.map((s) => (
            <Swatch
              key={s.token}
              def={s}
              resolved={resolved[s.token]}
              selected={picked === s.token}
              copied={copied === s.token}
              onPick={onPick}
            />
          ))}
        </ul>
      </section>
    ));

  return (
    <div ref={hostRef} className="ts-section">
      <div className="ts-section__head">
        <div>
          <p className="ts-eyebrow ts-eyebrow--muted">Palette · {THEME_BY_ID.get(theme)?.name}</p>
          <h2 className="ts-section__title">Colour tokens</h2>
          <p className="ts-section__desc">Values resolve live from tokens.css for the active theme.</p>
        </div>
      </div>
      <Tabs value={tab} onValueChange={setTab} variant="line" listLayout="nowrap">
        <TabsList ariaLabel="Palette groups">
          {PALETTE_TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {PALETTE_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <div className="ts-explorer" style={{ marginTop: "var(--space-3)" }}>
              <div>
                <p className="ts-hint" style={{ marginBottom: "var(--space-3)" }}>
                  <IconCopy />
                  <span>
                    <strong>Click any swatch to copy its token</strong> — e.g. <code>var(--color-bg-surface)</code>. Ratios are
                    computed in the browser with the WCAG formula; “fallback” marks a token this theme
                    does not declare.
                  </span>
                </p>
                {renderGroups()}
              </div>
              <aside className="ts-panel ts-detail" aria-label="Selected token">
                <p className="ts-eyebrow ts-eyebrow--muted">Selected token</p>
                <div className="ts-detail__chip" style={{ background: paintOf(pickedDef) }} aria-hidden="true">
                  {pickedDef.on && pickedDef.check !== "none" ? <span style={{ color: onPaintOf(pickedDef.on) }}>Aa</span> : null}
                </div>
                <p className="ts-detail__name">{pickedDef.token}</p>
                <p className="ts-muted ts-small" style={{ margin: 0 }}>
                  {pickedDef.usage}
                </p>
                <dl className="ts-detail__dl">
                  <dt>Value</dt>
                  <dd>{pickedRes?.hex ?? "—"}</dd>
                  <dt>Group</dt>
                  <dd>{pickedDef.group}</dd>
                  {pickedDef.on ? (
                    <>
                      <dt>Pair</dt>
                      <dd>{pickedDef.on}</dd>
                    </>
                  ) : null}
                  <dt>Contrast</dt>
                  <dd>
                    {pickedRes?.ratio != null && pickedRes.target != null
                      ? `${pickedRes.ratio.toFixed(2)}:1 (needs ${pickedRes.target}:1${pickedDef.on ? "" : " on surface"})`
                      : "exempt"}
                  </dd>
                  {pickedRes && !pickedRes.defined ? (
                    <>
                      <dt>Status</dt>
                      <dd>not declared — fallback {pickedDef.fallback}</dd>
                    </>
                  ) : null}
                </dl>
                <div className="ts-detail__actions">
                  <Button size="sm" variant="primary" icon={<IconCopy width={16} height={16} />} onClick={() => void copy(`var(${pickedDef.token})`, pickedDef.token)}>
                    Copy token
                  </Button>
                  <Button
                    size="sm"
                    variant="outlineSecondary"
                    disabled={!pickedRes?.hex}
                    onClick={() => pickedRes?.hex && void copy(pickedRes.hex)}
                  >
                    Copy value
                  </Button>
                </div>
              </aside>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function StateMatrix() {
  const btn = (extra: string | null, label: string, disabled = false) => (
    <span className={extra ?? undefined} style={{ display: "inline-flex" }}>
      <span inert>
        <Button size="sm" variant="primary" disabled={disabled} tabIndex={-1}>
          Save
        </Button>
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
  return (
    <div className="ts-panel">
      <div className="ts-matrix-scroll" role="region" aria-label="Interaction state matrix (scrolls horizontally)" tabIndex={0}>
        <table className="ts-matrix">
          <caption>
            Static specimens of each state, painted from this theme&apos;s tokens. Hover, press and Tab the live
            components below to see the same states in motion.
          </caption>
          <thead>
            <tr>
              <th scope="col">Element</th>
              {STATE_COLUMNS.map((c) => (
                <th key={c.id} scope="col">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Menu row</th>
              {STATE_COLUMNS.map((c) => (
                <td key={c.id}>
                  <StateSpecimen state={c.id}>Inbox</StateSpecimen>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">Button · primary</th>
              <td>{btn(null, "Primary button, default")}</td>
              <td>{btn("ts-force-hover", "Primary button, hover")}</td>
              <td className="ts-matrix__na">
                <span aria-hidden="true">—</span>
                <span className="sr-only">Not applicable</span>
              </td>
              <td>{btn("ts-force-active", "Primary button, pressed")}</td>
              <td>{btn("ts-force-focus", "Primary button, focus-visible")}</td>
              <td>{btn(null, "Primary button, disabled", true)}</td>
            </tr>
            <tr>
              <th scope="row">Text selection</th>
              <td colSpan={STATE_COLUMNS.length}>
                <span className="ts-spec ts-spec--selection" style={{ width: "auto" }}>
                  Highlighted <span>selected words</span> use the selection pair.
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LiveComponents() {
  const [tab, setTab] = useState("overview");
  const [range, setRange] = useState("week");
  const [checks, setChecks] = useState({ a: false, b: true });
  const [plan, setPlan] = useState("pro");
  const selectId = useId();
  return (
    <div className="ts-live">
      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Buttons</CardTitle>
          <CardDescription>Hover, press and Tab to see each state.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ts-live__row">
            <Button size="md" variant="primary">Primary</Button>
            <Button size="md" variant="outlinePrimary">Outline</Button>
            <Button size="md" variant="ghost">Ghost</Button>
            <Button size="md" variant="link">Link</Button>
            <Button size="md" variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Tabs & segmented</CardTitle>
          <CardDescription>Selected, hover and disabled triggers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ts-live__body">
            <Tabs value={tab} onValueChange={setTab} variant="line" size="sm">
              <TabsList ariaLabel="Example sections">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="archived" disabled>
                  Archived
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="ts-muted ts-small" style={{ margin: "var(--space-1) 0 0" }}>Overview panel</p>
              </TabsContent>
              <TabsContent value="activity">
                <p className="ts-muted ts-small" style={{ margin: "var(--space-1) 0 0" }}>Activity panel</p>
              </TabsContent>
              <TabsContent value="archived">
                <p className="ts-muted ts-small">Archived panel</p>
              </TabsContent>
            </Tabs>
            <SegmentedControl
              ariaLabel="Date range"
              value={range}
              onValueChange={setRange}
              options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "year", label: "Year", disabled: true },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Menu list</CardTitle>
          <CardDescription>Selected and disabled rows; hover any row.</CardDescription>
        </CardHeader>
        <CardContent>
          <List bordered size="sm" aria-label="Mailboxes">
            <ListItem title="Inbox" meta="12" selected />
            <ListItem title="Drafts" meta="3" />
            <ListItem title="Archived" disabled />
          </List>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Checkbox & input</CardTitle>
          <CardDescription>Checked, indeterminate, error and disabled.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ts-live__body">
            <div className="ts-live__row">
              <Checkbox label="Email" checked={checks.a} onChange={(e) => setChecks((c) => ({ ...c, a: e.target.checked }))} />
              <Checkbox label="SMS" checked={checks.b} onChange={(e) => setChecks((c) => ({ ...c, b: e.target.checked }))} />
              <Checkbox label="Some" indeterminate />
              <Checkbox label="Locked" disabled checked />
            </div>
            <Input id={`${selectId}-ws`} label="Workspace" placeholder="acme-prod" />
            <Input id={`${selectId}-err`} label="Region" defaultValue="mars-1" status="error" />
            <Input id={`${selectId}-dis`} label="Owner" defaultValue="Platform team" disabled />
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Badges</CardTitle>
          <CardDescription>Status tones on this theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ts-live__row">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="primary" tone="solid">Solid</Badge>
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle as="h3">Selectable cards</CardTitle>
          <CardDescription>Selected card ring and text selection.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ts-live__body">
            <div className="ts-live__row" role="group" aria-label="Plan">
              {(["starter", "pro"] as const).map((p) => (
                <Card
                  key={p}
                  variant="bordered"
                  size="sm"
                  interactive
                  selected={plan === p}
                  onClick={() => setPlan(p)}
                  style={{ flex: "1 1 8rem" }}
                >
                  <CardContent>
                    <span className="ts-live__label">{p === "pro" ? "Pro" : "Starter"}</span>
                    <span className="ts-small ts-muted">{p === "pro" ? "Teams" : "Solo"}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="ts-selectable">Select this sentence to preview the text-selection colours of this theme.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ======================================================================== */
/* Page                                                                     */
/* ======================================================================== */

const ALL_SECTIONS: ShowcaseSection[] = ["signature", "compare", "palette", "states"];

/**
 * A theme change can remount the story (the preview decorator re-creates its wrapper per globals
 * update), which would drop the live-region message and keyboard focus. Park both here and replay
 * them on the next mount if it happens within a moment of the click.
 */
let pendingApply: { id: ShowcaseThemeId; message: string; at: number } | null = null;

/** Test helper — forget a parked theme change. */
export function resetPendingThemeApply(): void {
  pendingApply = null;
}

export function ThemeShowcase({ sections = ALL_SECTIONS }: ThemeShowcaseProps) {
  const theme = useDocumentTheme();
  const current = THEME_BY_ID.get(theme) ?? SHOWCASE_THEMES[0];
  const { message, announce } = useAnnouncer();
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const show = (s: ShowcaseSection) => sections.includes(s);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    const p = pendingApply;
    pendingApply = null;
    if (!p || Date.now() - p.at > 1500) return;
    announce(p.message);
    const tile = rootRef.current?.querySelector<HTMLElement>(`[data-ts-tile="${p.id}"]`);
    if (tile && !rootRef.current?.contains(document.activeElement)) tile.focus();
    return () => {
      mounted.current = false;
    };
  }, [announce]);

  const onApply = useCallback(
    (t: ShowcaseTheme) => {
      const msg = `${t.name} theme applied to every page.`;
      const parked = { id: t.id, message: msg, at: Date.now() };
      pendingApply = parked;
      applyGlobalTheme(t.id);
      announce(msg);
      // Still mounted shortly after → no remount happened; drop the parked replay.
      setTimeout(() => {
        if (mounted.current && pendingApply === parked) pendingApply = null;
      }, 400);
    },
    [announce],
  );

  const copySnippet = useCallback(async () => {
    const snippet = current.id === "light" ? "<html>" : `<html data-theme="${current.id}">`;
    const ok = await copyText(snippet);
    announce(ok ? `Copied ${snippet}` : "Copy failed.");
  }, [current.id, announce]);

  return (
    <div ref={rootRef} className="ts-root">
      <div className="ts-container">
        <header className="ts-hero">
          <div className="ts-hero__text">
            <p className="ts-eyebrow">Foundations / Themes</p>
            <h1 className="ts-title">Theme showcase</h1>
            <p className="ts-lead">One attribute re-skins every component. Compare the themes, then inspect the active one.</p>
            <ul className="ts-chips" aria-label="Theme facts">
              <li className="ts-chip ts-chip--strong">{SHOWCASE_THEMES.length} themes</li>
              <li className="ts-chip">WCAG 2.2 AA</li>
              <li className="ts-chip">Light · Dark</li>
              <li className="ts-chip">Tokens only</li>
              <li className="ts-chip">
                <IconEye width={14} height={14} /> Active: {current.name}
              </li>
            </ul>
          </div>
          <Button size="md" variant="primary" icon={<IconCopy width={16} height={16} />} onClick={() => void copySnippet()}>
            Copy &lt;html&gt; snippet
          </Button>
        </header>

        {show("signature") ? (
          <section className="ts-panel ts-signature" aria-labelledby={`${uid}-signature-title`}>
            <div>
              <p className="ts-eyebrow ts-eyebrow--muted">Theme signature</p>
              <h2 id={`${uid}-signature-title`} className="ts-signature__name">
                {current.name}
              </h2>
              <p className="ts-muted" style={{ margin: 0 }}>
                {current.summary} <code>{dataThemeAttr(current.id)}</code>
              </p>
            </div>
            <div>
              <SignatureBar />
              <ul className="ts-bar__legend" aria-label="Signature proportions">
                {SIGNATURE.map((s) => (
                  <li key={s.token}>
                    <strong>{s.share}%</strong>
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {show("compare") ? (
          <section className="ts-section" aria-labelledby={`${uid}-compare-title`}>
            <div className="ts-section__head">
              <div>
                <p className="ts-eyebrow ts-eyebrow--muted">Side by side</p>
                <h2 id={`${uid}-compare-title`} className="ts-section__title">
                  Every theme
                </h2>
                <p className="ts-section__desc">
                  Each tile renders in its own theme. Select one to apply it to the toolbar, every story and every docs page.
                </p>
              </div>
            </div>
            <ul className="ts-tiles">
              {SHOWCASE_THEMES.map((t) => (
                <li key={t.id}>
                  <ThemeTile theme={t} current={t.id === current.id} onApply={onApply} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {show("palette") ? <PaletteExplorer theme={current.id} announce={announce} /> : null}

        {show("states") ? (
          <section className="ts-section" aria-labelledby={`${uid}-states-title`}>
            <div className="ts-section__head">
              <div>
                <p className="ts-eyebrow ts-eyebrow--muted">Interaction · {current.name}</p>
                <h2 id={`${uid}-states-title`} className="ts-section__title">
                  States
                </h2>
                <p className="ts-section__desc">Default, hover, selected, pressed, focus-visible and disabled, from this theme&apos;s palette.</p>
              </div>
            </div>
            <StateMatrix />
            <LiveComponents />
          </section>
        ) : null}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {message}
      </div>
    </div>
  );
}

/* ======================================================================== */
/* Stories                                                                  */
/* ======================================================================== */

const meta: Meta<typeof ThemeShowcase> = {
  title: "Design System/Theme showcase",
  component: ThemeShowcase,
  // Helpers exported for tests / docs — not stories.
  excludeStories: /^(?!Playground$|Gallery$|CompareThemes$|Palette$|InteractionStates$).*/,
  parameters: {
    layout: "fullscreen",
    docs: {
      // One full render on the docs page (the default Stories block would render the page twice).
      // No ArgsTable here: it overflows a 375px viewport; the `sections` control lives in the canvas Controls panel.
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
        </>
      ),
      description: {
        component:
          "Every `data-theme` block in `src/design-system/tokens.css`, presented side by side. Tiles render in their own theme (nested scope) and apply the theme globally when selected; the signature, palette and state sections follow the toolbar Theme. Swatches copy their token and report live WCAG contrast.",
      },
    },
  },
  argTypes: {
    sections: {
      control: "check",
      options: ALL_SECTIONS,
      description: "Sections to render, in order.",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

/** Full page with Controls — the docs page renders this one. */
export const Playground: Story = {
  args: { sections: ALL_SECTIONS },
};

/** Same full page under the original story id (`--gallery`) so existing links keep working. */
export const Gallery: Story = {
  name: "All theme tokens",
  tags: ["!autodocs"],
  args: { sections: ALL_SECTIONS },
};

export const CompareThemes: Story = {
  name: "Compare themes",
  tags: ["!autodocs"],
  args: { sections: ["compare"] },
};

export const Palette: Story = {
  tags: ["!autodocs"],
  args: { sections: ["palette"] },
};

export const InteractionStates: Story = {
  name: "Interaction states",
  tags: ["!autodocs"],
  args: { sections: ["states"] },
};
