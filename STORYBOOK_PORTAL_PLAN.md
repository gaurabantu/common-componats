# Storybook Portal Redesign — Plan

> **Status:** Built (2026-11-03) — see "Implementation status" at the end · **Owner:** UI Platform team
> **Goal:** Turn the current Storybook into a clean, professional **Design System Portal**. Management should be able to understand it at a glance, and developers should be able to **download / install the library and `tokens.css`** from it without reading the repo.

---

## 1. Reference: what we are copying from `localhost:3000/consolidation-rules`

What makes the Consolidation Rules screen look clean:

| Pattern on reference page | Why it works | How we reuse it in Storybook |
|---|---|---|
| **Page header**: icon + title, nothing else | One clear focus | Every portal page starts with an icon + H1 + one-line subtitle |
| **Tab strip with icons** (Process · System Rules · Logic …) | Splits a big topic into small views | Getting Started page tabs: *Install · Tokens · Theming · Tailwind · Subpaths* |
| **Bordered section card**: bold title + muted description + right-aligned action (`Options >`) | Every block explains itself in one line | `<SectionCard title description action>` used on every doc page |
| **Selectable option tiles** (Local Currency / Translated / Consolidated): dark icon box, title, description | Choices are visual, not textual | Package tiles (*Components · Hooks · Tokens · Tailwind preset*) and theme tiles |
| **List rows**: icon, title, `System` / `Configurable` badge, description, right-hand `Settings` / `Configure` button | Scannable inventory with status | Component inventory rows with `Stable` / `Beta` / `Legacy` badge + `View` button; download rows with a `Download` button |
| **Monochrome palette**, Noir accent, thin `--color-border-subtle` dividers, lots of whitespace | Calm, enterprise feel | Use our existing tokens only (Noir primary, mist surfaces), with no new colours |

We already have every building block (`Tabs`, `Card`, `Badge`, `Button`, `Divider`, `TextView`, `Grid`, `Icon`), so the portal is **built with our own library**. That doubles as a live proof of quality for management.

---

## 2. Current state (audit of the repo)

| Area | Today | Gap |
|---|---|---|
| Storybook | v8.6, webpack5, `addon-essentials`, `a11y`, theme toolbar (8 themes), viewport presets, branded manager ("Infinia StoryBook") | Good foundation. Keep it. |
| Landing page | `src/Introduction.mdx`: a plain text list of components and links to repo `.md` files | Developer-only and text-heavy. No visuals, no download, no metrics. Management cannot read it. |
| Theme showcase | `src/ThemeShowcase.stories.tsx` (284 lines) | Useful, but it lives in a story, not a doc page. |
| Dashboard demo | `Design System/Dashboard/Overview` | Good "real screen" demo. Promote it in the portal. |
| Stories | 46 story files: 19 atoms, 21 molecules, charts, feedback states, hooks | Good coverage. No status (stable/beta) metadata. |
| Tokens | `src/design-system/tokens.css` v2.0.0: **~270 custom properties** (180 colour, 119 button, 62 shell, spacing, radius, type, shadow, z-index, motion), 8 themes | **No visual token page** (swatches, scale) and **no download button**. |
| Distribution | `ui-common-components-0.0.2.tgz`, `ui-common-hooks-0.3.0.tgz` (local tarballs; no npm registry), exports `./design-system/tokens.css`, `./index.css`, `./tailwind.preset.js`, subpaths `/charts /shell /table` | Install steps exist only in `README.md`. Tarballs are not reachable from the hosted Storybook. |
| Static serving | `staticDirs` already serves `src/design-system` at `/design-system/` | `tokens.css` is **already downloadable** at `/design-system/tokens.css`. It only needs a button. |
| Hosting | GitHub Pages workflow builds `storybook-static` on push to `main` | Downloads must use **relative URLs** (no leading `/`) so they work under `/<repo>/` on Pages. |
| Docs | `docs/**` (governance, tokens, themes, guides) | These stay the contract. The portal summarises them and links to them. |

---

## 3. Target information architecture (sidebar)

```
Overview                        ← NEW (management landing page)
  ├─ Welcome                    ← hero, KPIs, value, what's inside
  ├─ Getting Started            ← tabs: Install · Tokens · Theming · Tailwind · Subpaths
  ├─ Downloads                  ← tarballs, tokens.css, preset, with version + size
  └─ Release Notes              ← version table (0.0.2 / hooks 0.3.0 / tokens 2.0.0)
Foundations                     ← NEW (visual token docs)
  ├─ Colors                     ← swatches grouped by role, live per theme
  ├─ Typography                 ← type scale (h1…caption) rendered
  ├─ Spacing & Radius           ← 8pt grid bars, radius samples
  ├─ Elevation & Borders        ← shadows, border roles, focus ring
  ├─ Motion & Z-index           ← durations, easing, layer scale
  └─ Themes                     ← existing Theme showcase, moved here, with 8 theme tiles
Governance                      ← NEW
  ├─ Accessibility (WCAG 2.2 AA)← commitments + how we test (a11y addon)
  └─ Composition Rules          ← 5-zone layout, one-primary-CTA rule (from docs)
Components                      ← rename of "Design System/Atoms|Molecules"
  ├─ Inventory                  ← NEW: list rows with status badge + "View" (reference-page style)
  ├─ Atoms/…                    (existing stories, unchanged)
  ├─ Molecules/…                (existing stories, unchanged)
  └─ Charts/…
Patterns
  ├─ Dashboard (existing Overview story)
  └─ Feedback States (existing)
Hooks
  └─ ui-common-hooks (existing)
```

> **Decision needed:** renaming `Design System/Atoms/*` to `Components/Atoms/*` changes story URLs, and any existing bookmarks or links break. **Option A (recommended):** rename now; we're pre-1.0. **Option B:** keep the `Design System/` prefix and only add the new top-level sections.

---

## 4. Page designs

### 4.1 Overview / Welcome (the management page)
Layout follows the reference page: header, then cards.

1. **Hero card**: logo, "Infinia UX Governance Design System", one-line value statement, two buttons: `Get started` (primary, the only primary on the page) and `Download tokens.css` (outline).
2. **KPI tiles** (4 across, 2 on tablet, 1 on mobile): `36 Components` · `25 Hooks` · `270+ Design tokens` · `8 Themes` · `WCAG 2.2 AA`. Numbers come from a single `portal.data.ts` file, so they are easy to update and never hard-coded in several places.
3. **"What's inside" option tiles** (styled like Local Currency / Translated / Consolidated): *Components* · *Hooks* · *Design Tokens* · *Tailwind Preset*. Each tile shows an icon box, title, description and links to its section.
4. **Why it matters** (for management): consistency, faster delivery, built-in accessibility, one theming switch for branding. Three short cards.
5. **Live preview strip**: small real components (Button, Badge, Input, Tabs) rendered from the library.
6. **Footer row**: version, last updated, links to `docs/` governance.

### 4.2 Getting Started (tabbed, like the reference tab strip)
- **Install**: step rows (numbered icon, title, description, copy button):
  1. Download or install the package (`npm install ./ui-common-components-0.0.2.tgz`, or the registry command when published)
  2. Optional hooks package
  3. Import `tokens.css` once at the app root
  4. Import `index.css`
  5. Use a component (5-line code sample)
- **Tokens**: how to import, how to override `--font-family` and the six `--color-theme-*` brand slots
- **Theming**: `data-theme` values table as **selectable tiles** with a live preview
- **Tailwind**: preset snippet + `content` glob
- **Subpaths**: table of `/charts /shell /table` and when to use each

Code blocks use the Storybook `<Source>` block with a copy button.

### 4.3 Downloads
List rows in the reference-page style: icon · name · version badge · description · size · **Download** button.

| Asset | Source | Served at |
|---|---|---|
| `tokens.css` | `src/design-system/tokens.css` | `design-system/tokens.css` (already served by `staticDirs`) |
| `ui-common-components-0.0.2.tgz` | repo root | `downloads/…` (new `staticDirs` entry) |
| `ui-common-hooks-0.3.0.tgz` | repo root | `downloads/…` |
| `tailwind.preset.js` | repo root | `downloads/…` |
| `index.css` (compiled component CSS) | `dist/index.css` | `downloads/…` |

Implementation: a `scripts/prepare-storybook-downloads.mjs` script copies these into `.storybook/downloads/` before `storybook dev/build`. It also writes `manifest.json` (name, version, size, sha256), which the page reads, so the sizes and versions are never stale. Links use relative `href` + `download` attribute (safe on GitHub Pages).

### 4.4 Foundations / Colors (and other token pages)
- Load `tokens.css` as raw text (webpack `?raw` rule), parse the `--*` declarations, and render them **automatically**. The page then always matches the shipped file with zero manual upkeep.
- Swatch card: colour chip (rendered with `var(--token)`, so it changes live with the Theme toolbar), token name with a copy button, resolved value, and usage note.
- Group by prefix: `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-state-*`, `--color-accent-*`, `--color-theme-*` (marked **"Brand slot"** with a badge, like `Configurable` on the reference page).
- Each page has a **Download tokens.css** action in its card header.
- Typography / Spacing / Radius / Shadow / Motion pages render real samples (bars, boxes, animated dots).

### 4.5 Components / Inventory
Reference-style list: icon · component name (link) · `Stable` / `Beta` / `Legacy` badge · one-line description · import path · `View` button that opens the story. Data lives in `portal.data.ts`. `AppShell` and `Avtar` show a `Legacy` badge pointing to `DashboardShell` / `Avatar`.

### 4.6 Governance / Accessibility
Short commitments (focus ring, contrast, keyboard, touch target ≥ 24px, reduced motion), plus how to run the a11y panel. Rows with a ✓ badge per checklist area (A1–A10 from `_fleet/QUALITY_CHECKLIST.md`, summarised).

---

## 5. Technical approach

### 5.1 New files
```
src/portal/                         ← Storybook-only, NOT exported from src/index.tsx
  portal.css                        ← layout classes using tokens only (no hex)
  portal.data.ts                    ← KPIs, component inventory, downloads, versions
  components/
    PortalHeader.tsx                ← icon + H1 + subtitle
    SectionCard.tsx                 ← title / description / action (reference card)
    OptionTile.tsx                  ← icon box + title + description, selectable
    ListRow.tsx                     ← icon · title · badge · description · action
    KpiTile.tsx
    CodeSnippet.tsx                 ← wraps <Source> + copy
    TokenSwatch.tsx / TokenTable.tsx
    DownloadRow.tsx
  utils/parseTokens.ts              ← parses tokens.css text → groups (unit-tested)
src/portal/pages/
  Welcome.mdx
  GettingStarted.mdx
  Downloads.mdx
  ReleaseNotes.mdx
  foundations/Colors.mdx, Typography.mdx, Spacing.mdx, Elevation.mdx, Motion.mdx, Themes.mdx
  governance/Accessibility.mdx, Composition.mdx
  components/Inventory.mdx
scripts/prepare-storybook-downloads.mjs
```

### 5.2 Changes to existing files
| File | Change |
|---|---|
| `.storybook/main.ts` | add `src/portal/**/*.mdx` to `stories`; add `staticDirs` entry for `.storybook/downloads → /downloads`; add webpack rule `resourceQuery: /raw/ → type: "asset/source"` |
| `.storybook/preview.tsx` | new `storySort.order`: Overview → Foundations → Governance → Components → Patterns → Hooks; Docs container theme follows tokens |
| `.storybook/preview.css` | MDX docs typography: max width ~1200px, Inter, token colours, hide default Storybook docs chrome on portal pages |
| `.storybook/manager.ts` | brand title → "Infinia Design System"; keep logo |
| `package.json` | `prestorybook` / `prebuild-storybook` → run `prepare-storybook-downloads.mjs` |
| `src/Introduction.mdx` | replaced by `Welcome.mdx` (removed or redirected) |
| `src/ThemeShowcase.stories.tsx` | moved under `Foundations/Themes` |
| Story `title`s | optional rename (see decision in §3) |
| `.gitignore` | add `.storybook/downloads/` |

### 5.3 Rules we keep (from `AGENTS.md`)
- Tokens only (`var(--space-*)`, `var(--color-*)`): no hex in portal CSS.
- One `variant="primary"` CTA per zone.
- Every page works on all 8 themes and at 375 / 768 / 1440 widths.
- WCAG 2.2 AA: heading order (one H1 per page), focus visible, contrast, `aria-label` on icon-only copy and download buttons.
- Portal code is **not** in the published bundle (`src/index.tsx` untouched, so `tsup` output is unchanged).

---

## 6. Delivery phases

| Phase | Scope | Output | Effort |
|---|---|---|---|
| **1. Foundation** | `src/portal/` primitives (`SectionCard`, `OptionTile`, `ListRow`, `KpiTile`, `PortalHeader`), `portal.css`, `portal.data.ts`, Storybook config + sort order | Shared building blocks | ~1 day |
| **2. Management pages** | Welcome, Getting Started (tabs), Downloads + script + manifest | Demo-ready for management | ~1.5 days |
| **3. Foundations** | Token parser + tests, Colors, Typography, Spacing/Radius, Elevation, Motion, Themes | Visual token reference + download | ~1.5 days |
| **4. Inventory & governance** | Components Inventory, Accessibility, Composition, Release Notes; optional title rename | Full portal | ~1 day |
| **5. QA & polish** | Compliance review (a11y / security / responsive), all 8 themes, 3 viewports, `build-storybook` + GitHub Pages check that downloads work under `/<repo>/` | Signed-off release | ~0.5 day |

---

## 7. Acceptance criteria
- [ ] A non-technical viewer can explain from the Welcome page alone what the library is, what it contains, and why it matters.
- [ ] `tokens.css` and both `.tgz` packages can be downloaded in ≤ 2 clicks from any portal page, locally **and** on GitHub Pages.
- [ ] Token pages are generated from `tokens.css` (no hand-copied values) and update live with the Theme toolbar.
- [ ] Visual style matches the reference page: bordered cards, icon tiles, list rows with badges and right-aligned actions, monochrome tokens.
- [ ] No hex colours in `src/portal/**`. Passes the a11y panel with 0 violations on every portal page.
- [ ] Responsive at 375 / 768 / 1440 with no horizontal scroll.
- [ ] `npm test`, `npm run build` (library output unchanged), and `npm run build-storybook` all pass.

---

## 8. Open questions for you
1. **Story rename** (§3): Option A (`Components/…`) or Option B (keep `Design System/…`)?
2. **Brand name** shown in the portal: "Infinia Design System", "UX Governance Design System", or something else?
3. **Registry**: will the package be published to npm / a private registry soon? If so, Getting Started shows `npm install ui-common-components` first and the tarball as a fallback.
4. **Component status**: which components should be marked `Beta` or `Legacy`? Default: all `Stable` except `AppShell` and `Avtar` (`Legacy`).
5. Should **Release Notes** come from a new `CHANGELOG.md` (recommended) or be maintained in `portal.data.ts`?

---

## 9. Implementation status (2026-11-03)

**Decisions taken on the open questions (defaults — change any of them):**
1. Story rename → **Option B**: existing `Design System/…` titles kept (no broken links); new top-level sections `Overview`, `Foundations`, `Governance` added above them.
2. Brand name → **Infinia Design System** (manager title + footer; `src/portal/data.ts` → `PRODUCT.name`).
3. Registry → install docs show `npm install ui-common-components` first, tarball as the no-registry path.
4. Status → all `Stable`, new components `New`, `AppShell` `Legacy`; `Avatar` noted as exported `Avtar`.
5. Release notes → kept in `src/portal/data.ts` (`RELEASES`) for now; move to `CHANGELOG.md` when releases are cut.

**Pages (15):** Overview — Welcome, Getting Started, Downloads, Component Inventory, Release Notes · Foundations — Colors, Typography, Spacing & Layout, Shape & Elevation, Motion & Layers, Themes, All Tokens · Governance — Accessibility (live contrast evidence), Composition Rules, Quality Checklist.

**Library additions (used by the portal, exported from `src/index.tsx`):** `IconBox` (atom), `List`/`ListItem`, `StatCard`, `CodeBlock` (molecules), each with types/config/index/css/stories/tests.

**Library fixes found while building:** Card `interactive` + bordered `selected`; Tabs active label was `--color-border-default` (2.9:1) → `--color-text-primary` + 2px indicator; light `--color-danger-strong` → `--color-accent-rose-fg` (3.9:1 → 6.2:1, fixes `Badge variant="danger"`); `<Button href>` no longer underlined.

**Contrast tokens fixed:** `--color-text-secondary` #757575 → #5e5e5e (light, 4.91:1 worst case) and #9CA3AF → #a8b0bb (dark); `--color-border-default` #999999 → #8a8a8a (light, ≥ 3.17:1 on surfaces) and #4B5563 → #717a86 (dark, 3.38:1); `--switch-border-off` → #8a8a8a.

**Run:** `npm run storybook` (runs `prepare:downloads` first). CI uses `npm run build-storybook`.
