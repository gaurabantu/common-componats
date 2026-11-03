import React, { useState } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DateRangePicker, { DEFAULT_RANGE_PRESETS } from "./index";
import type { DateRange } from "./DateRangePicker.types";
import { FormField } from "../FormField";
import Drawer from "../Drawer";
import { getLayerIds } from "../Modal/overlayStack";
import axe from "axe-core";

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);
const NOW = new Date(2026, 10, 3, 10, 0); // Tue 3 Nov 2026

type Listener = (e: { matches: boolean }) => void;
function mockMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<Listener>();
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, l: Listener) => listeners.add(l),
    removeEventListener: (_: string, l: Listener) => listeners.delete(l),
    addListener: (l: Listener) => listeners.add(l),
    removeListener: (l: Listener) => listeners.delete(l),
    dispatchEvent: () => true,
  })) as unknown as typeof window.matchMedia;
  return {
    set(next: boolean) {
      matches = next;
      listeners.forEach((l) => l({ matches: next }));
    },
    restore() {
      window.matchMedia = original;
    },
  };
}

function trigger() {
  return document.querySelector<HTMLButtonElement>(".ds-date-range-picker__trigger")!;
}

function day(name: RegExp | string) {
  return screen.getByRole("button", { name });
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"], now: NOW });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("DateRangePicker — rendering", () => {
  it("renders a labelled trigger with the placeholder and dialog semantics", () => {
    render(<DateRangePicker label="Report period" />);
    const btn = screen.getByRole("button", { name: "Report period Select date range" });
    expect(btn).toHaveAttribute("aria-haspopup", "dialog");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Report period").tagName).toBe("LABEL");
    expect(screen.getByText("Report period")).toHaveAttribute("for", btn.id);
  });

  it("formats the range with Intl and the locale prop", () => {
    const { rerender } = render(
      <DateRangePicker label="Period" locale="en-US" defaultValue={{ from: d(2026, 11, 1), to: d(2026, 11, 7) }} />,
    );
    expect(trigger()).toHaveTextContent("Nov 1, 2026 – Nov 7, 2026");
    rerender(<DateRangePicker label="Period" locale="de-DE" defaultValue={{ from: d(2026, 11, 1), to: d(2026, 11, 7) }} />);
    expect(trigger()).toHaveTextContent("01.11.2026 – 07.11.2026");
  });

  it("uses a custom format function", () => {
    render(
      <DateRangePicker
        ariaLabel="Period"
        format={(x) => `${x.getMonth() + 1}/${x.getDate()}`}
        value={{ from: d(2026, 11, 1), to: d(2026, 11, 7) }}
      />,
    );
    expect(screen.getByRole("button", { name: "Period 11/1 – 11/7" })).toBeInTheDocument();
  });

  it("shows two months by default and one at ≤ 640px", () => {
    render(<DateRangePicker label="Period" />);
    fireEvent.click(trigger());
    expect(screen.getAllByRole("grid")).toHaveLength(2);
    fireEvent.click(trigger());
    const mm = mockMatchMedia(true);
    try {
      render(<DateRangePicker label="Narrow" />);
      fireEvent.click(screen.getByRole("button", { name: /Narrow/ }));
      expect(screen.getAllByRole("grid")).toHaveLength(1);
    } finally {
      mm.restore();
    }
  });
});

describe("DateRangePicker — dialog and keyboard", () => {
  it("opens a named modal dialog and focuses a day in the grid (today)", () => {
    render(<DateRangePicker label="Period" locale="en-US" />);
    fireEvent.click(trigger());
    const dialog = screen.getByRole("dialog", { name: "Choose date range" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveAttribute("aria-controls", dialog.id);
    expect(document.activeElement).toBe(day(/Tuesday, November 3, 2026, today/));
  });

  it("ArrowDown on the trigger opens; arrows move focus per the APG grid", () => {
    render(<DateRangePicker label="Period" locale="en-US" />);
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    const start = document.activeElement as HTMLElement;
    fireEvent.keyDown(start, { key: "ArrowRight" });
    expect(document.activeElement).toBe(day(/Wednesday, November 4, 2026/));
    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
    expect(document.activeElement).toBe(day(/Wednesday, November 11, 2026/));
  });

  it("two clicks pick a range, fire onChange once, close, announce and return focus", () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Period" locale="en-US" onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.click(day(/Tuesday, November 10, 2026/));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText("Start date Nov 10, 2026. Select an end date.")).toBeInTheDocument();
    expect(day(/November 10, 2026, start of range/)).toBeInTheDocument();
    fireEvent.click(day(/Friday, November 13, 2026/));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ from: d(2026, 11, 10), to: d(2026, 11, 13) });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger());
    expect(trigger()).toHaveTextContent("Nov 10, 2026 – Nov 13, 2026");
    expect(screen.getByText("Selected Nov 10, 2026 to Nov 13, 2026.")).toHaveAttribute("aria-live", "polite");
  });

  it("orders a backwards selection", () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Period" locale="en-US" onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.click(day(/November 20, 2026/));
    fireEvent.click(day(/November 12, 2026/));
    expect(onChange).toHaveBeenCalledWith({ from: d(2026, 11, 12), to: d(2026, 11, 20) });
  });

  it("Escape closes without changing the value and returns focus to the trigger", () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Period" locale="en-US" onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.click(day(/November 10, 2026/));
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(trigger());
    expect(getLayerIds()).toEqual([]);
  });

  it("inside a Drawer, Escape closes only the picker (shared overlay stack)", () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} title="Filters">
        <DateRangePicker label="Period" locale="en-US" />
      </Drawer>,
    );
    fireEvent.click(trigger());
    expect(screen.getByRole("dialog", { name: "Choose date range" })).toBeInTheDocument();
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Choose date range" })).not.toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(trigger());
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("pointer down outside closes; focus falls back to the trigger, never body", () => {
    vi.useRealTimers();
    vi.useFakeTimers({ now: NOW });
    render(
      <div>
        <p data-testid="outside">Elsewhere</p>
        <DateRangePicker label="Period" locale="en-US" />
      </div>,
    );
    fireEvent.click(trigger());
    fireEvent.pointerDown(screen.getByTestId("outside"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    (document.activeElement as HTMLElement | null)?.blur();
    act(() => {
      vi.runAllTimers();
    });
    expect(document.activeElement).toBe(trigger());
  });

  it("Tab and Shift+Tab are trapped inside the dialog", () => {
    render(<DateRangePicker label="Period" locale="en-US" presets={DEFAULT_RANGE_PRESETS} />);
    fireEvent.click(trigger());
    const dialog = screen.getByRole("dialog");
    const first = within(dialog).getByRole("button", { name: "Today" });
    const tabStops = Array.from(dialog.querySelectorAll<HTMLElement>("button")).filter(
      (b) => b.tabIndex >= 0 && !b.disabled,
    );
    const last = tabStops[tabStops.length - 1];
    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("keeps focus on the same day when the layout switches to one month", () => {
    const mm = mockMatchMedia(false);
    try {
      render(<DateRangePicker label="Period" locale="en-US" />);
      fireEvent.click(trigger());
      expect(screen.getAllByRole("grid")).toHaveLength(2);
      const dec = day(/Thursday, December 10, 2026/);
      act(() => dec.focus());
      act(() => mm.set(true));
      expect(screen.getAllByRole("grid")).toHaveLength(1);
      expect(screen.getByRole("grid", { name: "December 2026" })).toBeInTheDocument();
      expect(document.activeElement).toBe(day(/Thursday, December 10, 2026/));
      act(() => mm.set(false));
      expect(screen.getAllByRole("grid")).toHaveLength(2);
      expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
    } finally {
      mm.restore();
    }
  });
});

describe("DateRangePicker — presets, bounds, clear, disabled", () => {
  it("a preset commits a clamped range, closes and is marked pressed on reopen", () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Period" locale="en-US" presets={DEFAULT_RANGE_PRESETS} onChange={onChange} />);
    fireEvent.click(trigger());
    const group = screen.getByRole("group", { name: "Presets" });
    fireEvent.click(within(group).getByRole("button", { name: "Last 7 days" }));
    expect(onChange).toHaveBeenCalledWith({ from: d(2026, 10, 28), to: d(2026, 11, 3) });
    expect(document.activeElement).toBe(trigger());
    expect(screen.getByText("Last 7 days: Oct 28, 2026 to Nov 3, 2026.")).toBeInTheDocument();
    fireEvent.click(trigger());
    expect(screen.getByRole("button", { name: "Last 7 days" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Today" })).toHaveAttribute("aria-pressed", "false");
  });

  it("clamps presets to min and disables presets fully outside the bounds", () => {
    const onChange = vi.fn();
    render(
      <DateRangePicker
        label="Period"
        locale="en-US"
        presets={DEFAULT_RANGE_PRESETS}
        min={d(2026, 11, 1)}
        max={d(2026, 11, 2)}
        onChange={onChange}
      />,
    );
    fireEvent.click(trigger());
    expect(screen.getByRole("button", { name: "Today" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Year to date" }));
    expect(onChange).toHaveBeenCalledWith({ from: d(2026, 11, 1), to: d(2026, 11, 2) });
  });

  it("days outside min / max are disabled and cannot be picked", () => {
    const onChange = vi.fn();
    render(<DateRangePicker label="Period" locale="en-US" min={d(2026, 11, 5)} max={d(2026, 11, 25)} onChange={onChange} />);
    fireEvent.click(trigger());
    expect(day(/Wednesday, November 4, 2026/)).toBeDisabled();
    expect(day(/Thursday, November 26, 2026/)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to previous month" })).toHaveAttribute("aria-disabled", "true");
  });

  it("clear button empties the range, announces and moves focus to the trigger", () => {
    const onChange = vi.fn();
    render(
      <DateRangePicker
        label="Period"
        locale="en-US"
        clearable
        defaultValue={{ from: d(2026, 11, 1), to: d(2026, 11, 7) }}
        onChange={onChange}
      />,
    );
    const clear = screen.getByRole("button", { name: "Clear dates" });
    clear.focus();
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith({});
    expect(screen.queryByRole("button", { name: "Clear dates" })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger());
    expect(trigger()).toHaveTextContent("Select date range");
    expect(screen.getByText("Dates cleared.")).toBeInTheDocument();
  });

  it("disabled blocks opening and hides the clear button", () => {
    render(<DateRangePicker label="Period" disabled clearable defaultValue={{ from: d(2026, 11, 1), to: d(2026, 11, 2) }} />);
    expect(trigger()).toBeDisabled();
    fireEvent.click(trigger());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear dates" })).not.toBeInTheDocument();
  });

  it("works controlled", () => {
    function Controlled() {
      const [v, setV] = useState<DateRange>({});
      return <DateRangePicker label="Period" locale="en-US" value={v} onChange={setV} />;
    }
    render(<Controlled />);
    fireEvent.click(trigger());
    fireEvent.click(day(/November 2, 2026/));
    fireEvent.click(day(/November 4, 2026/));
    expect(trigger()).toHaveTextContent("Nov 2, 2026 – Nov 4, 2026");
  });
});

describe("DateRangePicker — errors and FormField", () => {
  it("error is linked and focus stays on the trigger when it appears and clears", () => {
    const { rerender } = render(<DateRangePicker label="Period" />);
    trigger().focus();
    rerender(<DateRangePicker label="Period" error="Pick an end date" />);
    expect(document.activeElement).toBe(trigger());
    expect(trigger()).toHaveAttribute("aria-invalid", "true");
    const msg = screen.getByText("Pick an end date");
    expect(trigger().getAttribute("aria-describedby")).toBe(msg.id);
    expect(msg).toHaveAttribute("role", "alert");
    rerender(<DateRangePicker label="Period" />);
    expect(document.activeElement).toBe(trigger());
    expect(trigger()).not.toHaveAttribute("aria-invalid");
    expect(trigger()).not.toHaveAttribute("aria-describedby");
  });

  it("an error present on first render is not announced", () => {
    render(<DateRangePicker label="Period" error="Required" />);
    expect(screen.getByText("Required")).not.toHaveAttribute("role");
  });

  it("wires id, label, description, invalid and required from FormField onto the trigger", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <FormField label="Billing period" hint="Up to 90 days" error="Too long" required>
        <DateRangePicker />
      </FormField>,
    );
    const btn = screen.getByRole("button", { name: /^Billing period\s?required Select date range$/ });
    const label = screen.getByText("Billing period").closest("label")!;
    expect(label).toHaveAttribute("for", btn.id);
    expect(btn.getAttribute("aria-labelledby")).toContain(label.id);
    expect(btn).toHaveAttribute("aria-invalid", "true");
    // aria-required is not allowed on a button (axe aria-allowed-attr) — required comes from the label text.
    expect(btn).not.toHaveAttribute("aria-required");
    expect(btn).toHaveAccessibleName(/required/);
    const describedBy = btn.getAttribute("aria-describedby")!.split(" ");
    expect(describedBy.map((id) => document.getElementById(id)?.textContent)).toEqual(["Up to 90 days", "Too long"]);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("explicit id / aria props win inside FormField", () => {
    render(
      <FormField label="Period" hint="Hint">
        <DateRangePicker id="own" aria-describedby="custom" />
      </FormField>,
    );
    expect(trigger()).toHaveAttribute("id", "own");
    expect(trigger()).toHaveAttribute("aria-describedby", "custom");
  });
});

describe("DateRangePicker — iteration 2", () => {
  it("never puts aria-required on the trigger, even when passed explicitly", () => {
    render(<DateRangePicker label="Period" required aria-required />);
    expect(trigger()).not.toHaveAttribute("aria-required");
    expect(trigger()).toHaveAccessibleName(/^Period\s?required Select date range$/);
  });

  it("axe: no aria-allowed-attr / ARIA violations inside FormField (closed and open)", async () => {
    vi.useRealTimers();
    const { container } = render(
      <FormField label="Billing period" hint="Up to 90 days" error="Too long" required>
        <DateRangePicker locale="en-US" presets={DEFAULT_RANGE_PRESETS} clearable defaultValue={{ from: d(2026, 11, 1), to: d(2026, 11, 7) }} />
      </FormField>,
    );
    const rules = {
      runOnly: { type: "rule" as const, values: ["aria-allowed-attr", "aria-required-attr", "aria-valid-attr-value", "aria-valid-attr", "button-name", "label", "aria-prohibited-attr", "nested-interactive", "aria-dialog-name", "duplicate-id-aria"] },
    };
    let res = await axe.run(container, rules);
    expect(res.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join(" | ")}`)).toEqual([]);
    fireEvent.click(trigger());
    res = await axe.run(container, rules);
    expect(res.violations.map((v) => v.id)).toEqual([]);
  });

  it("≤ 640px: the docked popover is portalled to <body> (escapes transformed ancestors) and keeps theme + focus", () => {
    const mm = mockMatchMedia(true);
    try {
      render(
        <Drawer open onOpenChange={() => {}} title="Filters" side="bottom">
          <DateRangePicker label="Period" locale="en-US" />
        </Drawer>,
      );
      fireEvent.click(trigger());
      const dialog = screen.getByRole("dialog", { name: "Choose date range" });
      expect(dialog.parentElement).toBe(document.body);
      expect(document.querySelector(".ds-drawer")!.contains(dialog)).toBe(false);
      expect(dialog.contains(document.activeElement)).toBe(true);
      // Tab inside the portalled dialog is not hijacked by the Drawer's panel trap.
      const nav = within(dialog).getByRole("button", { name: "Go to previous month" });
      act(() => nav.focus());
      fireEvent.keyDown(nav, { key: "Tab" });
      expect(dialog.contains(document.activeElement)).toBe(true);
      // Clicking inside the portalled dialog does not count as an outside click.
      fireEvent.pointerDown(nav);
      expect(screen.getByRole("dialog", { name: "Choose date range" })).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
      expect(screen.queryByRole("dialog", { name: "Choose date range" })).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger());
    } finally {
      mm.restore();
    }
  });

  it("≤ 640px: the portalled popover inherits the trigger subtree's data-theme", () => {
    const mm = mockMatchMedia(true);
    try {
      render(
        <div data-theme="dark">
          <DateRangePicker label="Period" locale="en-US" />
        </div>,
      );
      fireEvent.click(trigger());
      const dialog = screen.getByRole("dialog");
      expect(dialog.parentElement).toBe(document.body);
      expect(dialog).toHaveAttribute("data-theme", "dark");
    } finally {
      mm.restore();
    }
  });

  it("switching wide → narrow moves the popover to the portal and keeps focus on the same day", () => {
    const mm = mockMatchMedia(false);
    try {
      render(<DateRangePicker label="Period" locale="en-US" />);
      fireEvent.click(trigger());
      act(() => day(/Thursday, November 12, 2026/).focus());
      act(() => mm.set(true));
      const dialog = screen.getByRole("dialog");
      expect(dialog.parentElement).toBe(document.body);
      expect(document.activeElement).toBe(day(/Thursday, November 12, 2026/));
      act(() => mm.set(false));
      expect(screen.getByRole("dialog").parentElement).not.toBe(document.body);
      expect(document.activeElement).toBe(day(/Thursday, November 12, 2026/));
    } finally {
      mm.restore();
    }
  });
});
