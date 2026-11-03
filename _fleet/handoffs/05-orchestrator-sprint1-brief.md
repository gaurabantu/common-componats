# Sprint 1 — shared brief for component-author agents

Repo root: `/Users/gaurabkumar/Documents/my code/common-componant-main`. Three agents work in parallel on disjoint files (A, B, C below). Read this whole file, then do only your slice.

## Conventions (non-negotiable)
- **Canonical dir per component:** `{Name}.types.ts` · `{Name}.config.ts` · `index.tsx` · `{Name}.css` · `{Name}.stories.tsx` · `{Name}.test.tsx` (+ optional `{Name}.utils.ts`). Atoms in `src/components/atoms/`, molecules in `src/components/molecules/`.
- **Copy the style of the four newest components** — they are the reference implementation: `src/components/atoms/IconBox/`, `src/components/molecules/{List,StatCard,CodeBlock}/` (data-attributes for variants, BEM-ish `ds-*` class names, `forwardRef`, `displayName`, types re-exported from `index.tsx`, config holds defaults).
- **Tokens only** in CSS: `var(--space-*)`, `var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--duration-*)`, `var(--easing-*)`, `var(--z-*)`. No hex, no px colours. Read `src/design-system/tokens.css` for names (semantic fills: `--color-{success,warning,danger,info}-{strong,fill}`, surfaces `--color-bg-{surface,page,elevated,overlay}`, `--color-fill-muted`, borders `--color-border-{default,subtle,strong}`, focus `--color-focus-ring`).
- **No dependency on `ui-common-hooks`** inside `src/components/**` (it is an optional peer). Implement focus trap / escape / scroll lock locally; `src/components/molecules/Modal/` already has `bodyScrollLock.ts` (`acquireBodyScrollLock` / `releaseBodyScrollLock`) — reuse it.
- **Reuse library atoms** where natural (`Button`, `IconBox`, `Badge`) — import by relative path.
- **Stories:** `title: "Design System/Atoms/{Name}"` or `"Design System/Molecules/{Name}"`, `tags: ["autodocs"]`, a `Playground` + focused stories, `parameters.docs.description.component` one-paragraph usage note.
- **Do NOT edit:** `src/index.tsx`, `src/entries/*`, anything under `src/portal/`, `.storybook/*`, `package.json`, `dist/`. Do not run `npm run build` (overwrites tracked dist). The orchestrator wires exports.
- **Quality bar — self-check against `_fleet/QUALITY_CHECKLIST.md` (A, B, C):** WCAG 2.2 AA contrast (text ≥ 4.5:1, UI ≥ 3:1 in classic, dark, mist themes — compute from tokens.css values), visible `:focus-visible` ring, keyboard operability, correct ARIA roles/names/live regions, `prefers-reduced-motion`, `forced-colors` where state relies on colour/shadow, 44px targets for primary controls (WCAG min 24px), no `dangerouslySetInnerHTML`, responsive to 375px.
- **Tests:** Vitest + Testing Library (`vi` global available). Cover roles/names, keyboard, callbacks, a11y attributes. Run `npx vitest run <your dirs>` and make sure the full `npx vitest run` stays green.
- **Typecheck:** `npx tsc --noEmit -p tsconfig.json 2>&1 | grep <your paths>` must print nothing.

## Handoff (required — a SubagentStop hook enforces it)
Write `_fleet/handoffs/05{a|b|c}-component-author-to-compliance-reviewer.md` from `_fleet/handoffs/HANDOFF.template.md` (sections: Objective, Output format, Sources and tools, Boundaries, Context digest, Failed approaches, Artifacts, Acceptance criteria, Open questions). In **Artifacts**, list every file; add a section **"Barrel exports needed"** with the exact `export …` lines for `src/index.tsx` (values and types).

## Final reply to orchestrator
≤ 15 lines: files created/changed, the export lines, test count for your dirs, any contrast numbers you computed, and anything you could not do.
