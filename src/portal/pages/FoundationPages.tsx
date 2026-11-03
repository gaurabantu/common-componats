import React, { useMemo, useRef, useState } from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import IconBox from "../../components/atoms/IconBox";
import InputSearch from "../../components/atoms/TextInputSearch";
import TextView from "../../components/atoms/TextView";
import CodeBlock from "../../components/molecules/CodeBlock";
import Table from "../../components/molecules/Table";
import { THEMES } from "../data";
import { IconLayers, IconMotion, IconPalette, IconRuler, IconSquare, IconSwatch, IconTable, IconType } from "../icons";
import { portalLinkProps } from "../navigation";
import { aliasOf, categorize, colorGroup, type ColorGroup, type TokenCategory, type TokenDecl } from "../tokens/parseTokens";
import { BASE_TOKENS, THEME_NAMES, THEME_OVERRIDES, TOKEN_COUNT, tokensByPrefix, useResolvedTokens } from "../tokens/useTokens";
import { DownloadTokensButton, FilterGroup, PortalPage, Section, TokenName } from "../components/Portal";
import { ThemeLab } from "../components/Showcase";

const headerActions = <DownloadTokensButton />;

/* ======================================================================== */
/* Colors                                                                   */
/* ======================================================================== */

const COLOR_GROUPS: { id: ColorGroup; title: string; description: string }[] = [
  { id: "theme", title: "Interaction theme slots", description: "The six brand slots (§42). Override these to re-brand — every themed control follows." },
  { id: "brand", title: "Brand", description: "Brand primary, secondary (emphasis) and link colours." },
  { id: "text", title: "Text", description: "Text roles. Primary and secondary meet 4.5:1 on surface and page backgrounds." },
  { id: "surface", title: "Surfaces & fills", description: "Page, surface, sidebar, elevated and muted fills." },
  { id: "border", title: "Borders & focus", description: "Structural vs subtle borders, interactive / selected / error roles and the focus ring." },
  { id: "state", title: "State & feedback", description: "Semantic success, warning, error and info — strong foregrounds with matching fills." },
  { id: "accent", title: "Accents", description: "Tints (10), mids (40) and foregrounds (fg) for badges, charts and illustrations." },
  { id: "palette", title: "Core palette", description: "Noir, Ash and Ion Mist reference ramps that semantic tokens alias." },
];

function Swatch({ token, value, group }: { token: TokenDecl; value?: string; group: ColorGroup }) {
  const alias = aliasOf(token.value);
  const themes = THEME_OVERRIDES.get(token.name);
  const chip =
    group === "text" ? (
      <div className="pt-swatch__chip pt-swatch__chip--text" style={{ color: `var(${token.name})` }} aria-hidden>
        Aa
      </div>
    ) : group === "border" ? (
      <div className="pt-swatch__chip pt-swatch__chip--border" style={{ ["--pt-swatch-color" as string]: `var(${token.name})` }} aria-hidden />
    ) : (
      <div className="pt-swatch__chip" style={{ background: `var(${token.name})` }} aria-hidden />
    );
  return (
    <div className="pt-swatch">
      {chip}
      <div className="pt-swatch__body">
        <TokenName name={token.name} />
        <span className="pt-swatch__value pt-mono">{value || token.value}</span>
        {alias ? <span className="pt-swatch__alias pt-mono">→ {alias}</span> : null}
        {themes?.length ? (
          <span>
            <Badge size="sm" tone="outline" title={`Overridden by: ${themes.join(", ")}`}>
              Themable · {themes.length}
            </Badge>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function ColorsPage() {
  const colors = useMemo(() => BASE_TOKENS.filter((t) => categorize(t.name) === "color"), []);
  const resolved = useResolvedTokens(useMemo(() => colors.map((c) => c.name), [colors]));
  const grouped = useMemo(() => {
    const out: Record<string, TokenDecl[]> = {};
    for (const c of colors) (out[colorGroup(c.name)] ??= []).push(c);
    return out;
  }, [colors]);

  return (
    <PortalPage
      section="Foundations"
      icon={<IconPalette />}
      title="Colour"
      description={`${colors.length} colour tokens, read live from tokens.css. Switch the Theme toolbar — every swatch and value updates. Click a token name to copy var(--token).`}
      actions={headerActions}
    >
      {COLOR_GROUPS.filter((g) => grouped[g.id]?.length).map((g) => (
        <Section key={g.id} title={g.title} description={g.description} action={<Badge tone="outline">{grouped[g.id].length}</Badge>}>
          <div className="pt-grid pt-grid--swatch">
            {grouped[g.id].map((t) => (
              <Swatch key={t.name} token={t} value={resolved[t.name]} group={g.id} />
            ))}
          </div>
        </Section>
      ))}
    </PortalPage>
  );
}

/* ======================================================================== */
/* Typography                                                               */
/* ======================================================================== */

const TYPE_SCALE: { variant: "h1" | "h2" | "h3" | "h4" | "body" | "secondary" | "small" | "micro"; size: string; weight?: string; use: string; sample: string }[] = [
  { variant: "h1", size: "--text-h1-size", weight: "--text-h1-weight", use: "Page title (one per page)", sample: "Consolidation overview" },
  { variant: "h2", size: "--text-h2-size", weight: "--text-h2-weight", use: "Section heading", sample: "Local currency steps" },
  { variant: "h3", size: "--text-h3-size", weight: "--text-h3-weight", use: "Card / group title", sample: "Opening balance carry forward" },
  { variant: "h4", size: "--text-h4-size", weight: "--text-h4-weight", use: "Sub-title, field group", sample: "Configurable calculations" },
  { variant: "body", size: "--text-body-size", weight: "--text-body-weight", use: "Body copy, inputs, buttons", sample: "Calculations performed after the carry forward." },
  { variant: "secondary", size: "--text-secondary-size", use: "Descriptions, helper text", sample: "Select a step to view its properties." },
  { variant: "small", size: "--text-small-size", use: "Captions, meta, table cells", sample: "Updated 2 minutes ago" },
  { variant: "micro", size: "--text-micro-size", weight: "--text-micro-weight", use: "Badges, overlines", sample: "SYSTEM" },
];

export function TypographyPage() {
  const names = useMemo(() => TYPE_SCALE.flatMap((t) => [t.size, t.weight].filter(Boolean) as string[]).concat("--font-family"), []);
  const v = useResolvedTokens(names);
  const typeTokens = tokensByPrefix("--text-", "--font-", "--leading-");
  return (
    <PortalPage
      section="Foundations"
      icon={<IconType />}
      title="Typography"
      description="A compact, desktop-first type scale set in Inter. Size encodes hierarchy; weight is reserved for emphasis."
      actions={headerActions}
    >
      <Section title="Typeface" description="Override --font-family on :root to use a different UI font; every component follows.">
        <div className="pt-specimen">
          <div className="pt-specimen__glyph" aria-hidden>Aa</div>
          <div className="pt-stack">
            <div>
              <TextView variant="h3">Inter</TextView>
              <p className="pt-muted pt-small pt-mono">{v["--font-family"]}</p>
            </div>
            <div className="pt-specimen__weights">
              {[400, 500, 600, 700, 800].map((w) => (
                <span key={w} style={{ fontWeight: w }}>
                  {w} — The quick brown fox
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Type scale" description="Rendered with the TextView component — what you see is what ships.">
        <div className="pt-scale">
          {TYPE_SCALE.map((t) => (
            <div key={t.variant} className="pt-scale__row">
              <div className="pt-stack" style={{ gap: 2 }}>
                <strong>{t.variant}</strong>
                <span className="pt-muted pt-small">{t.use}</span>
              </div>
              <span className="pt-scale__value pt-mono">
                {v[t.size]}
                {t.weight ? ` · ${v[t.weight]}` : ""}
              </span>
              {/* Visual sample only — rendered as <p> so the page keeps a single h1 and a valid outline. */}
              <TextView variant={t.variant} as="p" className="pt-type-sample">
                {t.sample}
              </TextView>
            </div>
          ))}
        </div>
      </Section>

      <TokenTableSection title="Typography tokens" tokens={typeTokens} />
    </PortalPage>
  );
}

/* ======================================================================== */
/* Spacing & layout                                                         */
/* ======================================================================== */

function ScaleBars({ tokens, kind = "width" }: { tokens: TokenDecl[]; kind?: "width" | "height" }) {
  const v = useResolvedTokens(useMemo(() => tokens.map((t) => t.name), [tokens]));
  return (
    <div className="pt-scale">
      {tokens.map((t) => (
        <div key={t.name} className="pt-scale__row">
          <TokenName name={t.name} />
          <span className="pt-scale__value pt-mono">{v[t.name] || t.value}</span>
          <div className="pt-row">
            <div className="pt-bar" style={kind === "width" ? { width: `var(${t.name})` } : { width: 48, height: `var(${t.name})` }} aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpacingPage() {
  const space = tokensByPrefix("--space-");
  const layout = tokensByPrefix("--layout-", "--grid-");
  const buttons = tokensByPrefix("--button-height-");
  return (
    <PortalPage
      section="Foundations"
      icon={<IconRuler />}
      title="Spacing & layout"
      description="An 8-point grid. Use the --space-* scale for padding and gaps, and the --layout-* aliases for page structure."
      actions={headerActions}
    >
      <Section title="Spacing scale" description="--space-0 (4px) is the only sub-8 step and is reserved for micro gaps inside components.">
        <ScaleBars tokens={space} />
      </Section>
      <Section title="Control heights" description="Button and field height tiers. Height encodes hierarchy — lg for the primary screen action, md for secondaries.">
        <ScaleBars tokens={buttons} kind="height" />
      </Section>
      <TokenTableSection title="Layout & grid aliases" description="Use in app layout CSS: gap: var(--layout-gap-md)." tokens={layout} />
    </PortalPage>
  );
}

/* ======================================================================== */
/* Shape & elevation                                                        */
/* ======================================================================== */

export function ShapePage() {
  const radius = tokensByPrefix("--radius-");
  const shadows = tokensByPrefix("--shadow-");
  const borders = tokensByPrefix("--border-");
  const vr = useResolvedTokens(useMemo(() => radius.map((t) => t.name), [radius]));
  const vs = useResolvedTokens(useMemo(() => shadows.map((t) => t.name), [shadows]));
  return (
    <PortalPage
      section="Foundations"
      icon={<IconSquare />}
      title="Shape & elevation"
      description="Corner radii, shadows and stroke widths. Surfaces are bordered or elevated — never both."
      actions={headerActions}
    >
      <Section title="Corner radius" description="Small radii for controls, larger for cards and dialogs.">
        <div className="pt-grid" style={{ ["--pt-min" as string]: "8rem" }}>
          {radius.map((t) => (
            <div key={t.name} className="pt-stack" style={{ gap: "var(--space-1)" }}>
              <div className="pt-radius-box" style={{ borderRadius: `var(${t.name})` }} aria-hidden />
              <TokenName name={t.name} />
              <span className="pt-scale__value pt-mono">{vr[t.name] || t.value}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Elevation" description="Shadows for elevated, interactive surfaces (menus, popovers, dialogs, hover cards).">
        <div className="pt-shadow-stage">
          <div className="pt-grid" style={{ ["--pt-min" as string]: "10rem", gap: "var(--space-3)" }}>
            {shadows.map((t) => (
              <div key={t.name} className="pt-shadow-box" style={{ boxShadow: `var(${t.name})` }}>
                <div className="pt-stack" style={{ gap: 2, minWidth: 0 }}>
                  <TokenName name={t.name} />
                  <span className="pt-swatch__value pt-mono" title={vs[t.name]}>{vs[t.name] || t.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <TokenTableSection title="Stroke" description="Pair width tokens with solid and a border colour token." tokens={borders} />
    </PortalPage>
  );
}

/* ======================================================================== */
/* Motion & layers                                                          */
/* ======================================================================== */

function bezierPath(value: string): string | null {
  const m = value.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return null;
  const [x1, y1, x2, y2] = m[1].split(",").map((n) => parseFloat(n));
  const s = 56;
  const o = 8;
  const P = (x: number, y: number) => `${o + x * s} ${o + (1 - y) * s}`;
  return `M ${P(0, 0)} C ${P(x1, y1)} ${P(x2, y2)} ${P(1, 1)}`;
}

export function MotionPage() {
  const durations = tokensByPrefix("--duration-");
  const easings = tokensByPrefix("--easing-");
  const layers = tokensByPrefix("--z-");
  const vz = useResolvedTokens(useMemo(() => layers.map((t) => t.name), [layers]));
  const [on, setOn] = useState(false);
  return (
    <PortalPage
      section="Foundations"
      icon={<IconMotion />}
      title="Motion & layers"
      description="Short, purposeful motion and a fixed stacking scale. Motion collapses automatically for users who prefer reduced motion."
      actions={headerActions}
    >
      <Section
        title="Duration"
        description="Press Play to compare. Use fast for hover / press, normal for panels, slow only for large surfaces."
        action={<Button size="sm" variant="outlinePrimary" onClick={() => setOn((x) => !x)}>{on ? "Reset" : "Play"}</Button>}
      >
        <div className="pt-scale">
          {durations.map((t) => (
            <div key={t.name} className="pt-scale__row">
              <TokenName name={t.name} />
              <span className="pt-scale__value pt-mono">{t.value}</span>
              <div className="pt-track" data-on={on ? "true" : "false"} aria-hidden>
                <span className="pt-track__dot" style={{ transitionDuration: `var(${t.name})`, transitionTimingFunction: "var(--easing-default)" }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Easing" description="Default for most transitions; enter decelerates into place, exit accelerates away.">
        <div className="pt-grid" style={{ ["--pt-min" as string]: "16rem" }}>
          {easings.map((t) => {
            const d = bezierPath(t.value);
            return (
              <div key={t.name} className="pt-row" style={{ flexWrap: "nowrap", gap: "var(--space-2)" }}>
                <svg className="pt-curve" viewBox="0 0 72 72" aria-hidden>
                  <path d="M8 64 L64 8" stroke="var(--color-border-subtle)" strokeDasharray="3 3" fill="none" />
                  {d ? <path d={d} stroke="currentColor" strokeWidth="2" fill="none" /> : null}
                </svg>
                <div className="pt-stack" style={{ gap: 2, minWidth: 0 }}>
                  <TokenName name={t.name} />
                  <span className="pt-swatch__value pt-mono">{t.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Layers (z-index)" description="Use the named scale — never ad-hoc values like 9999. Higher layers sit above lower ones.">
        <div className="pt-layers" aria-hidden>
          {layers.map((t, i) => (
            <div
              key={t.name}
              className="pt-layer"
              style={{ top: `${i * 1.55}rem`, left: `${i * 4}%`, zIndex: i + 1 }}
            >
              <span className="pt-mono">{t.name}</span>
              <Badge size="sm" tone="outline">{vz[t.name] || t.value}</Badge>
            </div>
          ))}
        </div>
        <span className="pt-sr-only">
          {layers.map((t) => `${t.name}: ${t.value}`).join(", ")}
        </span>
      </Section>
    </PortalPage>
  );
}

/* ======================================================================== */
/* Themes                                                                   */
/* ======================================================================== */

const SLOTS = ["--color-theme-primary", "--color-theme-hover", "--color-theme-active", "--color-theme-disabled", "--color-theme-text", "--color-theme-surface-hover"];

export function ThemesPage() {
  return (
    <PortalPage
      section="Foundations"
      icon={<IconSwatch />}
      title="Themes"
      description={`${THEMES.length} themes ship in tokens.css as data-theme blocks. No JavaScript provider — set an attribute and every token-driven component re-skins.`}
      actions={headerActions}
    >
      <Section title="Theme lab" description="Select a theme to preview a real screen. The rest of this page stays on the toolbar theme.">
        <ThemeLab />
      </Section>
      <Section title="Brand slots by theme" description="The six §42 interaction slots are the only tokens a brand theme needs to change.">
        <div className="pt-table-scroll" tabIndex={0} role="region" aria-label="Brand slot colours per theme (scrollable)">
          <table className="pt-slot-table">
            <caption className="pt-sr-only">Brand slot colour per theme. Each cell names the token rendered as a swatch.</caption>
            <thead>
              <tr>
                <th scope="col">Theme</th>
                {SLOTS.map((s) => (
                  <th key={s} scope="col">{s.replace("--color-theme-", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {THEMES.map((t) => (
                <tr key={t.id}>
                  <th scope="row">{t.name}</th>
                  {SLOTS.map((s) => (
                    <td key={s}>
                      <span data-theme={t.dataTheme ?? "blue"} className="pt-slot" style={{ background: `var(${s})` }} title={`${t.name} ${s}`} aria-hidden />
                      <span className="pt-sr-only">{s}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <div className="pt-grid pt-grid--wide">
        <Section title="Apply a theme">
          <CodeBlock language="html" code={`<html data-theme="green-mist">`} />
        </Section>
        <Section title="Create a brand theme" description="Add a block after tokens.css and set data-theme=&quot;acme&quot;.">
          <CodeBlock
            language="css"
            code={`[data-theme="acme"] {
  --color-theme-primary: #6d28d9;
  --color-theme-hover: #5b21b6;
  --color-theme-active: #4c1d95;
  --color-theme-disabled: #c4b5fd;
  --color-theme-text: #ffffff;
  --color-theme-surface-hover: #f5f3ff;
}`}
          />
        </Section>
      </div>
      <p className="pt-muted pt-small">
        Declared in tokens.css: {THEME_NAMES.map((n) => `"${n}"`).join(", ")}. See also{" "}
        <a className="pt-link" {...portalLinkProps("Design System/Theme showcase", "component")}>Theme showcase</a>.
      </p>
    </PortalPage>
  );
}

/* ======================================================================== */
/* All tokens                                                               */
/* ======================================================================== */

const CATEGORY_LABEL: Record<TokenCategory, string> = {
  color: "Colour",
  typography: "Type",
  spacing: "Spacing",
  radius: "Radius",
  shadow: "Shadow",
  border: "Border",
  motion: "Motion",
  "z-index": "Z-index",
  opacity: "Opacity",
  size: "Size",
  component: "Component",
};

function TokenTableSection({ title, description, tokens }: { title: string; description?: string; tokens: TokenDecl[] }) {
  const v = useResolvedTokens(useMemo(() => tokens.map((t) => t.name), [tokens]));
  const rows = tokens.map((t) => ({ id: t.name, name: t.name, value: t.value, resolved: v[t.name] ?? "" }));
  return (
    <Section title={title} description={description} action={<Badge tone="outline">{tokens.length}</Badge>}>
      <Table
        columns={[
          { key: "name", header: "Token", render: (val) => <TokenName name={String(val)} /> },
          { key: "value", header: "Declared", render: (val) => <span className="pt-mono pt-small">{String(val)}</span> },
          { key: "resolved", header: "Resolved", render: (val) => <span className="pt-mono pt-small pt-muted">{String(val)}</span> },
        ]}
        data={rows}
        rowKey="id"
        size="sm"
        variant="minimal"
        searchable={false}
        pagination={false}
        hover
      />
    </Section>
  );
}

export function AllTokensPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"all" | TokenCategory>("all");
  const scope = useRef<HTMLDivElement>(null);
  const resolved = useResolvedTokens(useMemo(() => BASE_TOKENS.map((t) => t.name), []), scope);
  const cats = useMemo(() => {
    const c = new Map<TokenCategory, number>();
    BASE_TOKENS.forEach((t) => c.set(categorize(t.name), (c.get(categorize(t.name)) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, []);
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BASE_TOKENS.filter((t) => (cat === "all" || categorize(t.name) === cat) && (!q || `${t.name} ${t.value}`.toLowerCase().includes(q))).map((t) => ({
      id: t.name,
      name: t.name,
      category: CATEGORY_LABEL[categorize(t.name)],
      value: t.value,
      resolved: resolved[t.name] ?? "",
      themes: THEME_OVERRIDES.get(t.name)?.length ?? 0,
    }));
  }, [query, cat, resolved]);

  return (
    <PortalPage
      section="Foundations"
      icon={<IconTable />}
      title="All tokens"
      description={`Every custom property in tokens.css (${TOKEN_COUNT} unique across all themes, ${BASE_TOKENS.length} in the default theme). Search by name or value.`}
      actions={headerActions}
    >
      <div ref={scope}>
        <Section title="Token reference" description="Declared = as written in tokens.css · Resolved = computed for the current theme.">
          <div className="pt-stack">
            <div className="pt-toolbar">
              <div className="pt-toolbar__search">
                <InputSearch value={query} onChange={setQuery} placeholder="Search tokens, e.g. border or #0d0d0d" ariaLabel="Search tokens" showClearButton fullWidth />
              </div>
              <IconBox tone="outline" size="sm"><IconLayers /></IconBox>
            </div>
            <FilterGroup<"all" | TokenCategory>
              label="Filter by category"
              value={cat}
              onChange={setCat}
              options={[{ value: "all", label: `All · ${BASE_TOKENS.length}` }, ...cats.map(([c, n]) => ({ value: c, label: `${CATEGORY_LABEL[c]} · ${n}` }))]}
            />
            <p className="pt-muted pt-small" role="status" aria-live="polite">{rows.length} tokens</p>
            <Table
              columns={[
                { key: "name", header: "Token", render: (v) => <TokenName name={String(v)} /> },
                { key: "category", header: "Category", width: 110, render: (v) => <Badge tone="outline">{String(v)}</Badge> },
                { key: "value", header: "Declared", render: (v) => <span className="pt-mono pt-small">{String(v)}</span> },
                {
                  key: "resolved",
                  header: "Resolved",
                  render: (v, row) => (
                    <span className="pt-row" style={{ flexWrap: "nowrap" }}>
                      {(row as { category: string }).category === "Colour" ? (
                        <span aria-hidden style={{ width: 14, height: 14, flexShrink: 0, borderRadius: 4, border: "1px solid var(--color-border-subtle)", background: String(v) }} />
                      ) : null}
                      <span className="pt-mono pt-small pt-muted">{String(v)}</span>
                    </span>
                  ),
                },
                { key: "themes", header: "Themes", width: 90, align: "right", render: (v) => (Number(v) ? <Badge size="sm">{String(v)}</Badge> : <span className="pt-muted">—</span>) },
              ]}
              data={rows}
              rowKey="id"
              size="sm"
              variant="minimal"
              searchable={false}
              hover
              stickyHeader
              pagination={{ pageSize: 50 }}
            />
          </div>
        </Section>
      </div>
    </PortalPage>
  );
}
