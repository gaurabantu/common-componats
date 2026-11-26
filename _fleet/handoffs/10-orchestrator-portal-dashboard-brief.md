# Sprint 5b — Storybook portal: Dashboard + Components gallery, motion (Slice O)

Same conventions as `_fleet/handoffs/05-orchestrator-sprint1-brief.md` and the visual bar of
`_fleet/handoffs/09-orchestrator-theming-brief.md` (Forma-style qualities, tokens only, all 10 themes,
Infinia look unchanged). Started 2026-11-26.

## User request (verbatim intent)
"Make Storybook more proper: first create a dashboard with graphs and stats, then a next page that shows the
components, all made better. Also use Framer Motion and GSAP so the site looks much better and representative."

## Deliverables
1. **Overview/Dashboard** — the first page in the sidebar (update `storySort` in `.storybook/preview.tsx`; make it
   the Storybook landing page if feasible). Contents:
   - Hero: eyebrow, big title, one-line lead, metadata chips, primary CTA ("Browse components") + secondary.
   - KPI stat tiles with GSAP count-up: components, hooks, themes, design tokens, tests, releases, WCAG 2.2 AA status.
     **Every number must be derived from real repo data** (e.g. `src/portal/data.ts` inventory/releases, parsing
     `tokens.css?raw` for token count, the barrel exports, a build-time generated JSON for test count) — no invented
     figures. If a number cannot be derived, omit the tile rather than hardcode it.
   - Charts built with the **library's own charts** (`src/components/charts`): components by category (bar),
     library growth across releases (area/line), compliance by dimension (A11y / Security / Responsiveness, from
     `_fleet/VERDICT-*.md` outcomes summarised into data), theme coverage. Follow the `dataviz` guidance: token colours,
     legible in light and dark, accessible names / data-table fallback.
   - Recent releases timeline and "what's new" cards linking to stories.
2. **Overview/Components** — gallery page (replace or upgrade `Component Inventory`): category underline tabs +
   search, responsive card grid; each card shows a **live mini preview** of the real component, name, status badge,
   short description, link to its docs. Selected card opens a right-hand detail panel (props summary, variants,
   link), Forma-style.
3. **Motion** — add `framer-motion` and `gsap` as **devDependencies only** (portal/Storybook use; they must not end up
   in the published library bundle — verify `tsup` entries / `dist` don't import them). Framer Motion: staggered card
   entrance, layout animation when filtering, hover lift. GSAP: count-up, scroll-triggered chart/section reveal,
   hero intro. **`prefers-reduced-motion: reduce` disables all of it** (render final state). No layout shift, no
   animation longer than ~600ms, nothing blocks interaction.
4. Polish the existing Overview pages (`WelcomePage.tsx`, `OverviewPages.tsx`) to the same visual language so the
   portal reads as one product.

## File ownership
Owns: `src/portal/pages/WelcomePage.tsx`, `OverviewPages.tsx`, `Welcome.mdx`, `ComponentInventory.mdx`, new
`src/portal/pages/Dashboard*.{mdx,tsx}`, `src/portal/pages/Components*.{mdx,tsx}`, new files under
`src/portal/components/`, `src/portal/data.ts`, `src/portal/portal.css`, `.storybook/preview.tsx` (storySort only),
`package.json` / `package-lock.json` (devDependencies only).
Do NOT touch: `src/ThemeShowcase.stories.tsx`, `src/portal/pages/Themes.mdx` (Slice M is still editing them),
`src/design-system/tokens.css`, component source. Report needed changes instead.

## Gate
vitest green (record baseline), `tsc` clean for touched files, `npm run build` (library) still succeeds and `dist`
has no framer-motion/gsap import, `npm run build-storybook` succeeds, verified in headless Chrome at 375/768/1440 in
light, dark, infinia-light, infinia-dark (no white islands, charts readable) and with reduced motion emulated.
A local Storybook dev server is already running on http://localhost:6006 — use it, do not start another on 6006.
Handoff: `_fleet/handoffs/10o-component-author-to-compliance-reviewer.md`.

## Addendum (user, 2026-11-26)
Landing page (Overview/Dashboard) shows **no sidebar**; the sidebar returns on every other page (entered via "Get started" / "Browse components"). Orchestrator implemented in `.storybook/manager.ts` (`infinia/landing-layout` addon: `api.toggleNav(!landing)` on CURRENT_STORY_WAS_SET / STORY_CHANGED / popstate). Toolbar kept for the Theme picker. Verified in Chrome: `/` → full-width Dashboard; "Get started" → Getting Started with sidebar.
