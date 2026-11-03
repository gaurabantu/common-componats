---
name: screen-composition
description: |
  Use when composing a Next.js screen or page from ui-common-components library pieces — dashboard, list, form, or detail pages. Triggers on requests to "build screen", "compose page", "create dashboard", "layout a page", or "wire FeedbackStates".
---

Serves the screen-composer agent. Scope: 5-zone layout (ZONE 1 AppTopbar + primary CTA,
ZONE 2 OfflineBanner/notification strip, ZONE 3 filters/tabs/breadcrumb, ZONE 4 main
content with Table|EmptyState|ErrorState|Charts|Form, ZONE 5 pagination/footer), CTA
hierarchy (one variant="primary" per zone max, ghost for row/footer actions),
DashboardShell + AppSidebar + AppTopbar composition (no raw flex+sidebar), FeedbackStates
+ useAsyncContentPhase pairing, compound Card/Table/Tabs APIs, and self-check against
_fleet/QUALITY_CHECKLIST.md (C1, C7, A5, A7 explicitly, full A/B/C sweep) before
handoff. The agent reads AGENTS.md and docs/internal/ (APP_TOPBAR_SYSTEM.md,
SIDEBAR_NAVIGATION_SYSTEM.md, PACKAGES.md) — this skill extends, never restates, them.
## 1. Zone-by-zone composition — the 5-zone layout
Before writing any JSX, sketch the 5 zones (AGENTS.md → "The 5 visual zones";
`docs/COMPOSITION_RULES_1.md` for density rules). Every screen composes all 5
(omit a zone only if the FRD says so — and say so in a comment). Each zone maps
to a fixed slot inside `DashboardShell`'s content region:

- **ZONE 1 — AppTopbar (page title + primary CTA).** Render `<AppTopbar />` as
  the `topbar` prop of `DashboardShell` (NOT inside `children` — the shell pins
  it above the scroll region via flex). Pass the page title and at most one
  `variant="primary"` button (the page's main action — "Create", "Save").
  Read `docs/internal/APP_TOPBAR_SYSTEM.md` for the AppTopbar API (search
  expansion, hamburger on mobile).
- **ZONE 2 — Notification strip (OfflineBanner).** Slim sticky strip at the top
  of the content region. Use `<OfflineBanner />` (no `image` prop for the slim
  variant) driven by `useOnlineStatus()`:
  ```tsx
  const { online } = useOnlineStatus();
  {!online && <OfflineBanner />}  // slim strip, role="status", aria-live="polite"
  ```
  For a full-panel replacement (content area is unreachable), render
  `<OfflineBanner image={<OfflineAnimation size={110} />} />` inside Zone 4.
- **ZONE 3 — Filters / tabs / breadcrumb.** `Tabs` (with `TabsList`/`TabsTrigger`/
  `TabsContent`), `Breadcrumb`, or filter `Input`/`Select` row. This zone
  controls what Zone 4 displays — wire its state to the data fetch
  (`useAsyncData` / `useAsyncContentPhase`).
- **ZONE 4 — Main content.** `Table`, `EmptyState`, `ErrorState`, `Charts`,
  `Form`, or a `Card` grid. **Always** pair this zone with
  `useAsyncContentPhase` (see §4) so loading/offline/error/empty/ready are
  handled — never render a bare `Table` without a phase guard.
- **ZONE 5 — Pagination / footer / secondary actions.** `usePagination` for
  page state + `ghost` buttons for secondary actions (Export, Bulk actions).

## 2. CTA hierarchy — one primary per zone max
Decision tree (follow AGENTS.md → "CTA hierarchy rule"; do not restate the
table — apply it):
1. Is this the **single main action** for the zone? → `variant="primary"`,
   `size="md"` or `"lg"`. One per zone. If you already placed one, the next
   action is NOT primary.
2. Is this a **secondary action in Zone 1** (alongside the primary)? →
   `variant="outlineSecondary"`, `size="sm"`.
3. Is this a **row action** (Edit/Delete in a Table row) or a **footer action**
   (Export in Zone 5)? → `variant="ghost"`, `size="sm"`.
4. Is this a **retry** in an `ErrorState`? → `variant="outlinePrimary"`,
   `size="md"` (recovery, not destructive).
5. Is this an **escape hatch** in an `EmptyState` (secondary to the primary
   "create" CTA)? → `variant="ghost"`, `size="sm"`.
6. Is this **destructive** (delete confirmation)? → `variant="danger"`.
**Never** place two `variant="primary"` buttons at the same size and position.
Before handoff, count `variant="primary"` per zone — if any zone has >1, fix it.

## 3. DashboardShell API — use the shell, not raw flex
Use `<DashboardShell>` (NOT `AppShell` — legacy alias; NOT raw `flex` + a
sidebar div). Read `src/components/molecules/DashboardShell/DashboardShell.tsx`
for the source of truth. The shell contract:
```tsx
<DashboardShell
  sidebar={{ header, sections, activeItemId, fixed: true }}
  topbar={<AppTopbar title="..." primaryAction={...} />}
  contentClassName="p-6"
>
  {/* ZONES 2-5 live here, inside the scroll region */}
</DashboardShell>
```
- `sidebar` — `AppSidebar` props: `header` (logo/brand), `sections` (nav groups
  with items), `activeItemId`. Read `docs/internal/SIDEBAR_NAVIGATION_SYSTEM.md`
  for collapse/rail/drawer behavior on mobile.
- `topbar` — pass `<AppTopbar />` as a ReactNode. The shell sets
  `sticky={false}` on it (`pinTopbar` default `true`) to avoid sticky-vs-scroll
  bugs; the bar stays pinned by **flex layout**, not CSS `sticky`.
- `contentClassName` / `contentStyle` — style the scroll region (padding, bg).
- **The shell manages the right column's `margin-inline-start`** via
  `var(--app-sidebar-offset)` so it tracks the sidebar width. Do NOT set
  `marginLeft: 320` yourself — it leaves a gap when the sidebar collapses to a
  rail on narrow screens (README warning; QUALITY_CHECKLIST C1).

## 4. FeedbackStates + useAsyncContentPhase — the state machine
Zone 4 must pair with the phase machine. Read
`packages/ui-common-hooks/src/useAsyncContentPhase.ts` for the priority order
(loading → offline → error → empty → ready). Pattern:
```tsx
const { data, loading, error } = useAsyncData(fetchFn, [deps]);
const { phase } = useAsyncContentPhase({
  items: data ?? [],
  loading,
  error,
  requireNetwork: true,
});
// phase drives what renders:
if (phase === "loading") return <Spinner />;
if (phase === "offline") return <OfflineBanner image={<OfflineAnimation size={110} />} />;
if (phase === "error") return <ErrorState image={<ErrorAnimation />} action={<Button variant="outlinePrimary" onClick={retry}>Retry</Button>} />;
if (phase === "empty") return <EmptyState image={<NoDataAnimation size={120} />} action={<Button variant="primary">Create</Button>} />;
return <Table data={data} columns={columns} />;
```
Or use the `<FeedbackState variant={phase} />` router (delegates to the right
component per variant — see `FeedbackStates/FeedbackState.tsx`). Import the
CSS animations (`NoDataAnimation`, `ErrorAnimation`, `OfflineAnimation`,
`SuccessAnimation`, `InfoAnimation`, `NoSearchResultsAnimation`) from
`ui-common-components` and pass as the `image` prop. `aria-live` is built in —
verify it is present (QUALITY_CHECKLIST A8).

## 5. Compound-component patterns — semantic HTML
Prefer compound APIs over prop soup (AGENTS.md → "Prop discovery" step 4):
- **Card:** `<Card variant="bordered">` with `<CardHeader>`, `<CardTitle>`,
  `<CardDescription>`, `<CardAction>`, `<CardContent>`, `<CardFooter>`. Use
  `CardAction` for the zone's CTA (kept in the header, not floating).
  `CardFooter` with `borderTop={false}` for a softer footer line.
- **Table:** for semantic HTML, use the primitives `<TableHeader>`,
  `<TableBody>`, `<TableRow>`, `<TableHead>` (with `scope="col"`),
  `<TableCell>` inside `<Table>` — not the data-driven `columns`/`data` API
  when you need full control. Data-driven API is fine for simple cases; always
  include `<TableHead>` with column headers (QUALITY_CHECKLIST A6).
- **Tabs:** `<Tabs>` with `<TabsList>`, `<TabsTrigger>`, `<TabsContent>`.
  Wire `value`/`onValueChange` to control which Zone 4 view shows.

## 6. Pre-handoff self-check — QUALITY_CHECKLIST.md
Before handoff, walk the composed page through `_fleet/QUALITY_CHECKLIST.md`.
These items are composition-specific and must be checked explicitly:
- **C1 (breakpoints):** render at 375, 768, 1440. No horizontal scrollbar at 375
  (except intentional Table scroll). DashboardShell sidebar collapses to
  rail/drawer on narrow — no `marginLeft: 320` gap.
- **C7 (density + zones):** all 5 zones hold at every breakpoint (stack on
  mobile, don't disappear). CTA hierarchy preserved across reflow — no new
  `variant="primary"` introduced by responsive reflow.
- **A5 (forms/labels):** every `Input`/`Select`/`Combobox`/`DatePicker` has a
  `<label>` or `aria-label` via `id`. Error messages linked via
  `aria-describedby`. `aria-live="polite"` on status, `"assertive"` on errors.
- **A7 (overlays/dialogs):** `Modal`/`AlertDialog` have `aria-label`/`aria-labelledby`.
  `Popover`/`DropdownMenu` triggers have `aria-haspopup` + `aria-expanded`.
  Focus returns to trigger on close.
Then run the full A/B/C sweep (A1-A10, B1-B7, C1-C7) and record file:line
evidence per dimension in the handoff notes. Run `npm run build` for the demo
app (or compile the touched page in isolation) — must succeed before handoff.
