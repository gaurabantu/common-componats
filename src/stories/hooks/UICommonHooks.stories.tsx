import type { Meta, StoryObj } from "@storybook/react";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  useAsyncContentPhase,
  useAsyncData,
  useClientTableState,
  useControllableState,
  useDebounce,
  useDebouncedCallback,
  useDebounceClick,
  useDismissableLayer,
  useEventListener,
  useFocusTrap,
  useLatest,
  useLocalStorage,
  useLongPress,
  useMergedRefs,
  useMediaQuery,
  useMount,
  useOnlineStatus,
  usePagination,
  usePrefersReducedMotion,
  usePrevious,
  useSelection,
  useSwipe,
  useToggle,
  useTouchHandler,
  useUnmount,
} from "ui-common-hooks";

import Button from "../../components/atoms/Button";
import TextInput from "../../components/atoms/TextInput";
import TextView from "../../components/atoms/TextView";

/**
 * Hooks are not components — each story is a tiny UI that **uses** `ui-common-hooks`
 * so you can exercise behavior in Storybook.
 *
 * Run: `npm run storybook` → sidebar **Design System → Hooks → ui-common-hooks**.
 * Each story is named after the hook (or hook combo) it demonstrates.
 */
const meta = {
  title: "Design System/Hooks/ui-common-hooks",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Demos for the `ui-common-hooks` workspace package. Import hooks from `ui-common-hooks` in apps; these stories only showcase behavior.",
      },
    },
  },
} satisfies Meta;

export default meta;

export const UseDebounceClick: StoryObj = {
  name: "useDebounceClick",
  render: function Render() {
    const [count, setCount] = useState(0);
    const [submitLog, setSubmitLog] = useState<string[]>([]);
    const runId = useRef(0);

    const [submit, isProcessing] = useDebounceClick(
      async () => {
        runId.current += 1;
        const id = runId.current;
        setCount((c) => c + 1);
        await new Promise((r) => setTimeout(r, 800));
        setSubmitLog((rows) => [
          ...rows,
          `Submit #${id} finished at ${new Date().toLocaleTimeString()}`,
        ]);
      },
      { syncCooldownMs: 0 }
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 480 }}>
        <TextView as="p">
          Rapid clicks while the async handler runs are ignored. Use with <code>disabled=&#123;isProcessing&#125;</code> on
          your design-system <code>Button</code>.
        </TextView>
        <Button onClick={() => submit()} loading={isProcessing} disabled={isProcessing}>
          {isProcessing ? "Saving…" : "Save (async)"}
        </Button>
        <TextView as="p">
          Calls accepted: <strong>{count}</strong>
        </TextView>
        <TextView as="p" variant="small" color="secondary">
          {submitLog.slice(-5).reverse().join(" · ") || "No completions yet."}
        </TextView>
      </div>
    );
  },
};

export const UseLatest: StoryObj = {
  name: "useLatest",
  render: function Render() {
    const [count, setCount] = useState(0);
    const latest = useLatest(count);

    const summary = useMemo(
      () => `Parent state is always mirrored in ref.current (see inspector / tick log). Tick: ${latest.current}`,
      [count, latest]
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 520 }}>
        <TextView as="p">
          Increments rerender this panel; <code>useLatest</code> keeps a ref pointing at the newest <code>count</code>
          — useful inside stable callbacks (<code>setInterval</code>, subscriptions).
        </TextView>
        <Button variant="outlinePrimary" onClick={() => setCount((c) => c + 1)}>
          Increment count ({count})
        </Button>
        <TextView as="small" variant="small" color="secondary">
          {summary}
        </TextView>
      </div>
    );
  },
};

export const UseAsyncData: StoryObj = {
  name: "useAsyncData",
  render: function Render() {
    const [query, setQuery] = useState("alpha");

    const { data, loading, error } = useAsyncData(
      query.trim() || null,
      (signal) =>
        new Promise<string>((resolve, reject) => {
          const timer = window.setTimeout(() => {
            resolve(`Mock results for "${query.trim()}"`);
          }, 450);
          signal.addEventListener("abort", () => {
            window.clearTimeout(timer);
            reject(new DOMException("Aborted", "AbortError"));
          });
        })
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 480 }}>
        <TextView as="p">
          Change the query quickly: previous in-flight mock requests abort; only the latest key&apos;s response should
          win (TanStack / SWR-style stale guard).
        </TextView>
        <TextInput label="Search key" value={query} onChange={setQuery} />
        <TextView as="p">{loading ? "Loading…" : error ? error.message : (data ?? "—")}</TextView>
      </div>
    );
  },
};

export const UseLongPress: StoryObj = {
  name: "useLongPress",
  render: function Render() {
    const [message, setMessage] = useState("Press & hold (~500ms)");

    const longPressHandlers = useLongPress({
      ms: 520,
      onLongPress: () => setMessage("Long press ✓"),
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", alignItems: "flex-start" }}>
        <div
          {...longPressHandlers}
          tabIndex={0}
          role="button"
          style={{
            touchAction: "manipulation",
            padding: "var(--space-4, 24px)",
            borderRadius: "var(--radius-card, 8px)",
            border: "1px solid var(--color-border-subtle)",
            cursor: "pointer",
            outlineOffset: "2px",
            minHeight: "44px",
            minWidth: "44px",
          }}
          onBlur={() => setMessage("Press & hold (~500ms)")}
        >
          <TextView as="span">{message}</TextView>
        </div>
        <TextView as="small" variant="small" color="secondary">
          Pointer-events long press — try touch or mouse on this surface.
        </TextView>
      </div>
    );
  },
};

export const UseSwipe: StoryObj = {
  name: "useSwipe",
  render: function Render() {
    const [last, setLast] = useState("Swipe horizontally inside the box.");

    const swipe = useSwipe({
      threshold: 48,
      timeoutMs: 600,
      onSwipeLeft: () => setLast("Swiped ← left"),
      onSwipeRight: () => setLast("Swiped → right"),
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 420 }}>
        <div
          {...swipe}
          style={{
            touchAction: "pan-y",
            padding: "var(--space-5, 40px)",
            borderRadius: "var(--radius-card, 8px)",
            border: "1px dashed var(--color-border-subtle)",
            userSelect: "none",
          }}
        >
          <TextView as="p">{last}</TextView>
        </div>
        <TextView as="small" variant="small" color="secondary">
          Threshold 48px, 600ms — combine with CSS <code>touch-action</code> for directional scroll coexistence.
        </TextView>
      </div>
    );
  },
};

export const UseTouchHandler: StoryObj = {
  name: "useTouchHandler",
  render: function Render() {
    const [taps, setTaps] = useState(0);

    const touch = useTouchHandler({
      pointerTypes: ["touch", "mouse"],
      onTap: () => setTaps((t) => t + 1),
      maxDurationMs: 400,
      maxMove: 12,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 400 }}>
        <button
          type="button"
          {...touch}
          style={{
            touchAction: "manipulation",
            padding: "var(--space-3, 12px)",
            borderRadius: "var(--radius-button, 6px)",
            border: "1px solid var(--color-border-strong)",
            minHeight: "44px",
            minWidth: "44px",
            font: "inherit",
            cursor: "pointer",
            background: "var(--color-fill-surface)",
          }}
        >
          Tap targets (tap: {taps})
        </button>
        <TextView as="small" variant="small" color="secondary">
          Small movement + short duration ⇒ tap (mouse enabled here for Storybook desktop).
        </TextView>
      </div>
    );
  },
};

export const UseSwipeAllDirections: StoryObj = {
  name: "useSwipe (four directions)",
  render: function Render() {
    const [last, setLast] = useState("Swipe ↑ ↓ ← → inside the box.");

    const swipe = useSwipe({
      threshold: 52,
      timeoutMs: 650,
      onSwipeLeft: () => setLast("Swiped ←"),
      onSwipeRight: () => setLast("Swiped →"),
      onSwipeUp: () => setLast("Swiped ↑"),
      onSwipeDown: () => setLast("Swiped ↓"),
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 440 }}>
        <TextView as="p">
          Dominant-axis detection: use <code>touch-action: none</code> for free-form swipes, or <code>pan-x</code> /{" "}
          <code>pan-y</code> to let the browser keep one scroll direction.
        </TextView>
        <div
          {...swipe}
          style={{
            touchAction: "none",
            padding: "var(--space-6, 48px)",
            borderRadius: "var(--radius-card, 8px)",
            border: "1px dashed var(--color-border-subtle)",
            userSelect: "none",
            textAlign: "center",
          }}
        >
          <TextView as="p">{last}</TextView>
        </div>
      </div>
    );
  },
};

export const UseControllableState: StoryObj = {
  name: "useControllableState",
  render: function Render() {
    const [controlled, setControlled] = useState(false);
    const [parentSnap, setParentSnap] = useState(10);

    const [value, setValue] = useControllableState<number>({
      value: controlled ? parentSnap : undefined,
      defaultValue: 0,
      onChange: (next) => {
        if (controlled) setParentSnap(next);
      },
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 480 }}>
        <TextView as="p">
          Toggle <strong>controlled</strong>: parent owns the value via <code>onChange</code>. Uncontrolled branch uses{" "}
          <code>defaultValue</code> only.
        </TextView>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={controlled} onChange={(e) => setControlled(e.target.checked)} />
          <TextView as="span">Controlled mode</TextView>
        </label>
        <TextView as="p">
          Current: <strong>{value}</strong>
          {controlled ? ` (parent snapshot: ${parentSnap})` : null}
        </TextView>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Button variant="outlinePrimary" size="sm" onClick={() => setValue((v) => v - 1)}>
            −1 (setValue)
          </Button>
          <Button variant="outlinePrimary" size="sm" onClick={() => setValue((v) => v + 1)}>
            +1 (setValue)
          </Button>
          <Button variant="ghost" size="sm" type="button" onClick={() => setValue(controlled ? parentSnap : 0)}>
            Reset baseline
          </Button>
        </div>
      </div>
    );
  },
};

export const UseFocusTrapAndDismissLayer: StoryObj = {
  name: "useFocusTrap + useDismissableLayer",
  render: function Render() {
    const shellRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useDismissableLayer({
      referenceRef: shellRef,
      enabled: open,
      onDismiss: () => setOpen(false),
    });

    useFocusTrap({
      active: open,
      containerRef: shellRef,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)" }}>
        <TextView as="p">
          Opens a minimal overlay wired with our hooks (<strong>Esc</strong> or click outside panel). Focus stays cycling
          inside the panel via <code>useFocusTrap</code>; backdrop sits outside <code>referenceRef</code> so dismissal
          still fires on backdrop pointerdown.
        </TextView>
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Open layered panel
        </Button>

        {open ? (
          <>
            <div
              aria-hidden
              style={{
                position: "fixed",
                inset: 0,
                background: "color-mix(in srgb, var(--color-overlay-scrim) 40%, transparent)",
                zIndex: 1200,
              }}
            />
            <div
              ref={shellRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="hooks-layer-title"
              tabIndex={-1}
              style={{
                position: "fixed",
                top: "15%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(480px, 92vw)",
                padding: "var(--space-4, 24px)",
                borderRadius: "var(--radius-card, 8px)",
                background: "var(--color-fill-surface)",
                border: "1px solid var(--color-border-subtle)",
                boxShadow: "var(--shadow-elev-md, 0 16px 40px rgb(15 23 42 / 0.15))",
                zIndex: 1210,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)" }}>
                <TextView as="h2" variant="h4" id="hooks-layer-title">
                  Hook-driven panel
                </TextView>
                <Button variant="outlinePrimary" autoFocus size="sm" type="button">
                  Focusable primary
                </Button>
                <TrapTextField />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <Button variant="ghost" size="sm" type="button" onClick={() => setOpen(false)}>
                    Close explicit
                  </Button>
                  <Button variant="primary" size="sm" type="button" onClick={() => setOpen(false)}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  },
};

function TrapTextField() {
  const [value, setValue] = useState("");
  return <TextInput label="Trap tab order" placeholder="Cycle with Tab…" value={value} onChange={setValue} />;
}

export const UseMergedRefs: StoryObj = {
  name: "useMergedRefs",
  render: function Render() {
    const firstRef = useRef<HTMLDivElement | null>(null);
    const secondRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergedRefs<HTMLDivElement | null>(firstRef, secondRef);

    const [identity, setIdentity] = useState<"pending" | "same" | "miss">("pending");

    useLayoutEffect(() => {
      if (firstRef.current && secondRef.current && firstRef.current === secondRef.current) {
        setIdentity("same");
      } else {
        setIdentity("miss");
      }
    }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 520 }}>
        <TextView as="p">
          Library components + parents often each need a ref on the same host node — <code>useMergedRefs</code> forwards
          the instance to every ref in the list.
        </TextView>
        <div
          ref={mergedRef}
          style={{
            padding: "var(--space-4, 16px)",
            borderRadius: "var(--radius-card, 8px)",
            border: "1px solid var(--color-border-subtle)",
            background: "var(--color-fill-muted, rgba(148,163,184,0.08))",
          }}
        >
          <TextView as="span">Inspect both refs after mount — they should reference this div.</TextView>
        </div>
        <TextView as="p" variant="small" color="secondary">
          Observed identity: <strong>{identity === "same" ? "single DOM node" : identity}</strong>
        </TextView>
      </div>
    );
  },
};

export const UseMediaQueryStory: StoryObj = {
  name: "useMediaQuery",
  render: function Render() {
    const isWide = useMediaQuery("(min-width: 768px)");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2, 8px)", maxWidth: 520 }}>
        <TextView as="p">
          Live <code>(min-width: 768px)</code> match:{" "}
          <strong>{isWide ? "yes (≥768px)" : "no (narrow / under 768px)"}</strong>
        </TextView>
        <TextView as="small" variant="small" color="secondary">
          Resize the Storybook preview pane to see the boolean flip.
        </TextView>
      </div>
    );
  },
};

export const UseOnlineStatusStory: StoryObj = {
  name: "useOnlineStatus",
  render: function Render() {
    const { online } = useOnlineStatus();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2, 8px)", maxWidth: 520 }}>
        <TextView as="p">
          Browser reports: <strong>{online ? "online" : "offline"}</strong> (reflects{" "}
          <code>navigator.onLine</code> and window <code>online</code>/<code>offline</code> events).
        </TextView>
        <TextView as="small" variant="small" color="secondary">
          Use DevTools → Network → “Offline” or disconnect Wi‑Fi to verify the value updates.
        </TextView>
      </div>
    );
  },
};

export const UseAsyncContentPhaseStory: StoryObj = {
  name: "useAsyncContentPhase",
  render: function Render() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<string[] | null>(["Notebook", "Pencil"]);
    const [error, setError] = useState<unknown>();
    const [requireNetwork, setRequireNetwork] = useState(false);

    const snapshot = useAsyncContentPhase<string>({
      items,
      loading,
      error,
      requireNetwork,
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 560 }}>
        <TextView as="p">
          Derived <code>phase</code>: <strong>{snapshot.phase}</strong>
          {requireNetwork ? (
            <>
              {" "}
              · network: <strong>{snapshot.online ? "online" : "offline"}</strong>
            </>
          ) : null}
        </TextView>
        <TextView as="small" variant="small" color="secondary">
          Priority: loading → offline (when <code>requireNetwork</code>) → error → empty → ready.
        </TextView>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Button variant="outlinePrimary" size="sm" type="button" onClick={() => setLoading((v) => !v)}>
            Toggle loading ({loading ? "on" : "off"})
          </Button>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            onClick={() => setError((e) => (e ? undefined : new Error("Demo failure")))}
          >
            Toggle error ({error ? "on" : "off"})
          </Button>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            onClick={() => setItems((cur) => (cur && cur.length ? [] : ["Notebook", "Pencil"]))}
          >
            Toggle empty list
          </Button>
          <Button
            variant="outlineSecondary"
            size="sm"
            type="button"
            onClick={() => setRequireNetwork((v) => !v)}
          >
            Toggle requireNetwork ({requireNetwork ? "on" : "off"})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              setLoading(false);
              setError(undefined);
              setItems(["Notebook", "Pencil"]);
              setRequireNetwork(false);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const UsePrefersReducedMotionStory: StoryObj = {
  name: "usePrefersReducedMotion",
  render: function Render() {
    const reduce = usePrefersReducedMotion();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2, 8px)", maxWidth: 520 }}>
        <TextView as="p">
          <code>prefers-reduced-motion: reduce</code> → <strong>{reduce ? "true" : "false"}</strong>
        </TextView>
        <TextView as="small" variant="small" color="secondary">
          Toggle OS “reduce motion” to verify; pairs with chart/animation gating in `ui-common-components`.
        </TextView>
      </div>
    );
  },
};

export const UsePaginationStory: StoryObj = {
  name: "usePagination",
  render: function Render() {
    const labels = useMemo(
      () => Array.from({ length: 37 }, (_, index) => `Item ${String(index + 1).padStart(2, "0")}`),
      []
    );

    const pagination = usePagination({
      totalItems: labels.length,
      initialPage: 1,
      initialPageSize: 8,
    });

    const windowItems = pagination.slicePage(labels);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 520 }}>
        <TextView as="p">
          Page {pagination.page} / {pagination.totalPages} — showing {windowItems.length} of {labels.length} rows.
        </TextView>
        <ul style={{ margin: 0, paddingLeft: "var(--space-4, 20px)" }}>
          {windowItems.map((label) => (
            <li key={label}>
              <TextView as="span">{label}</TextView>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            disabled={pagination.page <= 1}
            onClick={() => pagination.setPage((page) => page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => pagination.setPage((page) => page + 1)}
          >
            Next
          </Button>
          <TextView as="small" variant="small" color="secondary">
            offset {pagination.offset} · limit {pagination.limit}
          </TextView>
        </div>
      </div>
    );
  },
};

export const UseSelectionStory: StoryObj = {
  name: "useSelection",
  render: function Render() {
    const selection = useSelection({ mode: "multiple" });
    const ids = ["alpha", "beta", "gamma", "delta"];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 520 }}>
        <TextView as="p">Selected: {selection.selectedKeys.length ? selection.selectedKeys.join(", ") : "—"}</TextView>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ids.map((id) => {
            const active = selection.selectedSet.has(id);
            return (
              <Button
                key={id}
                variant={active ? "primary" : "outlineSecondary"}
                size="sm"
                type="button"
                onClick={() => selection.toggleKey(id)}
              >
                {id}
              </Button>
            );
          })}
        </div>
        <Button variant="ghost" size="sm" type="button" onClick={() => selection.reset()}>
          Clear selection
        </Button>
      </div>
    );
  },
};

const demoRows: Array<{ id: string; label: string; qty: number }> = [
  { id: "a1", label: "Keyboard", qty: 4 },
  { id: "a2", label: "Mouse", qty: 12 },
  { id: "a3", label: "Monitor", qty: 2 },
  { id: "a4", label: "USB Hub", qty: 7 },
  { id: "a5", label: "HDMI Cable", qty: 15 },
  { id: "a6", label: "Dock", qty: 3 },
  { id: "a7", label: "Webcam", qty: 5 },
  { id: "a8", label: "Headset", qty: 9 },
];

export const UseClientTableStateStory: StoryObj = {
  name: "useClientTableState",
  render: function Render() {
    const table = useClientTableState({
      data: demoRows,
      searchColumns: ["label", "id"],
      pageSize: 4,
    });

    const sortHint = (key: string) => {
      if (table.sortState.key !== key) return "↕";
      if (table.sortState.dir === "asc") return "▲";
      if (table.sortState.dir === "desc") return "▼";
      return "↕";
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3, 16px)", maxWidth: 640 }}>
        <TextInput label="Filter rows" value={table.search} onChange={table.setSearch} />
        <TextView as="small" variant="small" color="secondary">
          {table.filteredRows.length} match(es) · page {table.pagination.page} / {table.pagination.totalPages}
        </TextView>
        <div style={{ overflowX: "auto", border: "1px solid var(--color-border-subtle)", borderRadius: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 8 }}>
                  <button
                    type="button"
                    onClick={() => table.toggleSort("label")}
                    style={{ font: "inherit", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Label {sortHint("label")}
                  </button>
                </th>
                <th style={{ textAlign: "left", padding: 8 }}>
                  <button
                    type="button"
                    onClick={() => table.toggleSort("qty")}
                    style={{ font: "inherit", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Qty {sortHint("qty")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.pageRows.map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: 8 }}>
                    <TextView as="span">{row.label}</TextView>
                  </td>
                  <td style={{ padding: 8 }}>
                    <TextView as="span">{row.qty}</TextView>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            disabled={table.pagination.page <= 1}
            onClick={() => table.pagination.setPage((prev) => prev - 1)}
          >
            Previous page
          </Button>
          <Button
            variant="outlinePrimary"
            size="sm"
            type="button"
            disabled={table.pagination.page >= table.pagination.totalPages}
            onClick={() => table.pagination.setPage((prev) => prev + 1)}
          >
            Next page
          </Button>
        </div>
      </div>
    );
  },
};

// ─── Phase 1 new hooks ────────────────────────────────────────────────────────

export const UseDebounceStory: StoryObj = {
  name: "useDebounce",
  render: function Render() {
    const [input, setInput] = useState("");
    const debounced = useDebounce(input, 400);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>useDebounce</code> delays the committed value by 400 ms after the last keystroke.
        </TextView>
        <TextInput label="Type here" value={input} onChange={setInput} />
        <TextView as="p" variant="small" color="secondary">
          Immediate: <strong>{input || "—"}</strong>
        </TextView>
        <TextView as="p" variant="small" color="secondary">
          Debounced (400ms): <strong>{debounced || "—"}</strong>
        </TextView>
      </div>
    );
  },
};

export const UseDebouncedCallbackStory: StoryObj = {
  name: "useDebouncedCallback",
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);
    const save = useDebouncedCallback((value: string) => {
      setLog((prev) => [...prev, `Saved "${value}" at ${new Date().toLocaleTimeString()}`]);
    }, 600);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>useDebouncedCallback</code> — auto-save fires 600 ms after the last change.
        </TextView>
        <TextInput label="Document title" onChange={(v) => save(v)} />
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {log.map((entry, i) => (
            <li key={i}><TextView as="span" variant="small">{entry}</TextView></li>
          ))}
        </ul>
      </div>
    );
  },
};

export const UseToggleStory: StoryObj = {
  name: "useToggle",
  render: function Render() {
    const modal = useToggle(false);
    const sidebar = useToggle(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>useToggle</code> provides stable <code>toggle</code>, <code>setTrue</code>, and{" "}
          <code>setFalse</code> helpers.
        </TextView>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button type="button" variant="outlinePrimary" size="sm" onClick={modal.toggle}>
            Modal: {modal.value ? "open" : "closed"}
          </Button>
          <Button type="button" variant="outlinePrimary" size="sm" onClick={sidebar.toggle}>
            Sidebar: {sidebar.value ? "visible" : "hidden"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={modal.setFalse}>
            Force modal closed
          </Button>
        </div>
      </div>
    );
  },
};

export const UseEventListenerStory: StoryObj = {
  name: "useEventListener",
  render: function Render() {
    const [keys, setKeys] = useState<string[]>([]);
    useEventListener("keydown", (e) => {
      const key = (e as KeyboardEvent).key;
      if (key.length === 1 || ["Enter", "Backspace", " ", "Escape"].includes(key)) {
        setKeys((prev) => [...prev.slice(-6), key === " " ? "Space" : key]);
      }
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>useEventListener</code> on <code>window</code> — press any key while this panel is focused.
        </TextView>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {keys.length === 0 ? (
            <TextView as="span" variant="small" color="secondary">No keys yet</TextView>
          ) : (
            keys.map((k, i) => (
              <kbd key={i} style={{ padding: "2px 8px", borderRadius: 4, background: "var(--color-fill-muted)", border: "1px solid var(--color-border-subtle)", fontFamily: "monospace", fontSize: 13 }}>
                {k}
              </kbd>
            ))
          )}
        </div>
      </div>
    );
  },
};

export const UsePreviousStory: StoryObj = {
  name: "usePrevious",
  render: function Render() {
    const [count, setCount] = useState(0);
    const prev = usePrevious(count);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>usePrevious</code> returns the value from the last render.
        </TextView>
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="button" variant="outlinePrimary" size="sm" onClick={() => setCount((c) => c + 1)}>
            Increment
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
        <TextView as="p" variant="small" color="secondary">
          Current: <strong>{count}</strong> · Previous: <strong>{prev ?? "—"}</strong>
        </TextView>
      </div>
    );
  },
};

export const UseMountUnmountStory: StoryObj = {
  name: "useMount / useUnmount",
  render: function Render() {
    const [log, setLog] = useState<string[]>([]);
    const [show, setShow] = useState(true);

    function Child() {
      useMount(() => setLog((p) => [...p, `mounted at ${new Date().toLocaleTimeString()}`]));
      useUnmount(() => setLog((p) => [...p, `unmounted at ${new Date().toLocaleTimeString()}`]));
      return <TextView as="p">Child is mounted</TextView>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <Button type="button" variant="outlinePrimary" size="sm" onClick={() => setShow((v) => !v)}>
          {show ? "Unmount" : "Mount"} child
        </Button>
        {show ? <Child /> : null}
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {log.map((entry, i) => (
            <li key={i}><TextView as="span" variant="small">{entry}</TextView></li>
          ))}
        </ul>
      </div>
    );
  },
};

export const UseLocalStorageStory: StoryObj = {
  name: "useLocalStorage",
  render: function Render() {
    const [name, setName, removeName] = useLocalStorage("storybook-demo-name", "");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", maxWidth: 480 }}>
        <TextView as="p">
          <code>useLocalStorage</code> — value persists across Storybook page reloads. Syncs across tabs.
        </TextView>
        <TextInput label="Your name" value={name} onChange={setName} />
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="button" variant="ghost" size="sm" onClick={removeName}>
            Clear from storage
          </Button>
        </div>
        <TextView as="p" variant="small" color="secondary">
          Stored: <strong>{name || "—"}</strong>
        </TextView>
      </div>
    );
  },
};
