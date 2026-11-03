# Sprint 4 — Button & Select hardening (shared brief)

Same conventions, boundaries, quality bar and handoff rules as `_fleet/handoffs/05-orchestrator-sprint1-brief.md` (read it first). These are **upgrades of existing, widely used components** — backward compatibility is the top constraint:

- Every existing prop, default, class name and test keeps working. Run the component's existing tests **before** changing anything and keep them green.
- Search the repo for every usage (`grep -rn "<Button\|<Select" src`) and make sure nothing that composes these components regresses — the full `npx vitest run` must stay green (currently 703).
- Behaviour changes that consumers could notice go in a **"Behaviour changes"** section of your handoff (the orchestrator turns them into release notes).
- Do not edit other components; report defects instead.

Handoff files: `_fleet/handoffs/08{j|k}-component-author-to-compliance-reviewer.md`.

## Slice J — Button (`src/components/atoms/Button/`)
**Uncommitted user work is present in this folder** (`expandOnHover` prop in `Button.types.ts`, `index.tsx`, stories, tests, and `.btn-expand-*` rules in `src/design-system/tokens.css`). Read `git diff src/components/atoms/Button` first; preserve it exactly and build on top.

1. **`loading` must not drop keyboard focus.** Today it sets native `disabled` (`index.tsx` ~183, ~248), which blurs the focused button. While `loading`: keep the element focusable, set `aria-disabled="true"` + `aria-busy="true"`, swallow click / Enter / Space (no `onClick`), keep the spinner, announce a `loadingText?: string` (default "Loading") via visually hidden text so the accessible name stays stable (e.g. "Save, Loading"). Explicit `disabled` keeps native `disabled` as today.
2. **`forwardRef`.** Button is `React.memo` only; wrap as `React.memo(React.forwardRef(...))` so refs reach the `<button>` / `<a>`. Keep `displayName`.
3. **Sanitise `href`.** Reject non-safe schemes (`javascript:`, `data:`, `vbscript:` …) using the WHATWG URL parser approach from `src/components/molecules/List/index.tsx` (`isSafeHref`) — reuse it by moving it to a shared util (e.g. `src/utils/safeHref.ts`) and import it from both List and Button (you may edit List's import line only). Unsafe href → render as a `<button>` (or disabled link) and `console.warn` in dev. `target="_blank"` → add `rel="noopener noreferrer"` unless the consumer passes `rel`.
4. Icon-only buttons without `ariaLabel` → dev-only `console.warn`.
5. Tests for each item (focus retained through loading on/off, `aria-busy`, no click while loading, ref forwarding to both element types, unsafe href variants incl. `java\tscript:`, rel on `_blank`, warning). Update stories (Loading story showing focus retention; Link-safety story).

## Slice K — Select (`src/components/atoms/Select/`)
1. **Select blurs itself on change** (default behaviour; `Pagination` works around it with `animatedChevron={false}`). Find the cause, fix it so keyboard focus stays on the control after selection in **every** mode; keep the chevron animation. Then confirm `src/components/molecules/Pagination/` and `src/components/molecules/FilterBar/` still behave (do not edit them — tell me if their workaround can be removed).
2. **Heights:** `sm` / `md` / `lg` must match the control-height tiers used by `Input` (`src/components/atoms/TextInput/`) and Button (`--button-height-*`), so Select lines up in toolbars (Pagination "Rows per page" measured ~30px sm / ~38px md vs 36 / 40 target). Use tokens.
3. **Form completeness:** pass through `name`, `required` (native + visible marker when it renders its own label), `id`, `aria-describedby`, `aria-invalid`; integrate with `FormField` via `useFormField()` + the `FORM_FIELD_CONSUMER_KEY` opt-out exactly like `src/components/molecules/Combobox/index.tsx` (explicit props win).
4. Make `status` / `error` consistent: `error` string → `aria-invalid` + message linked by `aria-describedby`.
5. Tests for focus retention after change (keyboard and mouse), FormField labelling/description, `name`/`required` in a native `<form>` (FormData), heights via class/data attribute. Update stories.
