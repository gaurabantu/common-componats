import React, { useState } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "./index";
import type { FilterBarFilter, FilterBarProps, FilterBarValue } from "./FilterBar.types";
import { getActiveChips, hasActiveFilterValue, removeFilterValue, setFilterValue } from "./FilterBar.utils";

const status: FilterBarFilter = {
  id: "status",
  label: "Status",
  type: "select",
  options: [
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
  ],
};
const region: FilterBarFilter = {
  id: "region",
  label: "Region",
  type: "multi",
  options: [
    { label: "EMEA", value: "emea" },
    { label: "APAC", value: "apac" },
    { label: "Americas", value: "amer" },
  ],
};
const plan: FilterBarFilter = {
  id: "plan",
  label: "Plan",
  type: "select",
  options: [
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
  ],
};
const owner: FilterBarFilter = {
  id: "owner",
  label: "Owner",
  type: "multi",
  options: [
    { label: "Ana", value: "ana" },
    { label: "Ben", value: "ben" },
  ],
};

function Harness({
  initial = { search: "", filters: {} },
  spy,
  ...props
}: Partial<FilterBarProps> & { initial?: FilterBarValue; spy?: (v: FilterBarValue) => void }) {
  const [value, setValue] = useState<FilterBarValue>(initial);
  return (
    <FilterBar
      filters={[status, region]}
      {...props}
      value={value}
      onChange={(next) => {
        spy?.(next);
        setValue(next);
      }}
    />
  );
}

function setNarrow(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  setNarrow(false);
  vi.useRealTimers();
});

describe("FilterBar — rendering", () => {
  it("renders a labelled group with search and named filter controls", () => {
    render(<Harness />);
    expect(screen.getByRole("group", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Region" })).toBeInTheDocument();
  });

  it("hides search when searchable is false and renders the extra slot", () => {
    render(<Harness searchable={false} extra={<button type="button">Grid view</button>} />);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Grid view" })).toBeInTheDocument();
  });

  it("shows visible labels when showLabels is set", () => {
    render(<Harness showLabels />);
    expect(screen.getByText("Status", { selector: "label" })).toBeInTheDocument();
    expect(screen.getByText("Region", { selector: ".ds-combobox__label" })).toBeInTheDocument();
  });

  it("announces resultCount in a polite live region that is always mounted", () => {
    const { rerender } = render(<FilterBar value={{ filters: {} }} onChange={() => {}} filters={[status]} />);
    const live = document.querySelector(".ds-filter-bar__count")!;
    expect(live).toHaveAttribute("aria-live", "polite");
    expect(live).toHaveTextContent("");
    rerender(<FilterBar value={{ filters: {} }} onChange={() => {}} filters={[status]} resultCount={24} />);
    expect(live).toHaveTextContent("24 results");
    rerender(<FilterBar value={{ filters: {} }} onChange={() => {}} filters={[status]} resultCount={1} />);
    expect(live).toHaveTextContent("1 result");
  });
});

describe("FilterBar — search debounce", () => {
  it("debounces search updates (default 250ms)", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    render(<Harness spy={spy} />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "acme" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(spy).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual({ search: "acme", filters: {} });
  });

  it("honours a custom searchDebounceMs and commits clearing immediately", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    render(<Harness spy={spy} searchDebounceMs={500} initial={{ search: "old", filters: {} }} />);
    const box = screen.getByRole("searchbox");
    fireEvent.change(box, { target: { value: "olde" } });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(spy).not.toHaveBeenCalled();
    fireEvent.change(box, { target: { value: "" } });
    expect(spy).toHaveBeenCalledWith({ search: "", filters: {} });
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("syncs an external search change into the field", () => {
    const { rerender } = render(<FilterBar value={{ search: "a", filters: {} }} onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveValue("a");
    rerender(<FilterBar value={{ search: "beta", filters: {} }} onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveValue("beta");
  });
});

describe("FilterBar — filters and chips", () => {
  it("select filter change calls onChange with the new filters, keeping focus on the select", async () => {
    const spy = vi.fn();
    render(<Harness spy={spy} />);
    const select = screen.getByRole("combobox", { name: "Status" });
    await userEvent.selectOptions(select, "paused");
    expect(spy).toHaveBeenLastCalledWith({ search: "", filters: { status: "paused" } });
    expect(select).toHaveFocus();
  });

  it("multi filter toggles values through the Combobox", async () => {
    const spy = vi.fn();
    render(<Harness spy={spy} />);
    await userEvent.click(screen.getByRole("combobox", { name: "Region" }));
    await userEvent.click(screen.getByRole("option", { name: "APAC" }));
    expect(spy).toHaveBeenLastCalledWith({ search: "", filters: { region: ["apac"] } });
  });

  it("renders one chip per active value with a named dismiss button", () => {
    render(<Harness initial={{ search: "", filters: { status: "active", region: ["emea", "apac"] } }} />);
    const list = screen.getByRole("list", { name: "Active filters" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(within(list).getByText("Status: Active")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove filter Region: APAC" })).toBeInTheDocument();
  });

  it("dismissing a chip removes only that value and moves focus to the next chip", async () => {
    const spy = vi.fn();
    render(<Harness spy={spy} initial={{ search: "", filters: { region: ["emea", "apac", "amer"] } }} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove filter Region: APAC" }));
    expect(spy).toHaveBeenLastCalledWith({ search: "", filters: { region: ["emea", "amer"] } });
    expect(screen.getByRole("button", { name: "Remove filter Region: Americas" })).toHaveFocus();
  });

  it("dismissing the last chip moves focus to the search field", async () => {
    render(<Harness initial={{ search: "", filters: { status: "active" } }} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove filter Status: Active" }));
    expect(screen.queryByRole("list", { name: "Active filters" })).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });

  it("Clear all resets search and filters, then focuses search", async () => {
    const spy = vi.fn();
    render(<Harness spy={spy} initial={{ search: "x", filters: { status: "active", region: ["emea"] } }} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(spy).toHaveBeenLastCalledWith({ search: "", filters: {} });
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveFocus();
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("does not render Clear all when nothing is active", () => {
    render(<Harness />);
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();
  });
});

describe("FilterBar — overflow popover", () => {
  it("moves filters beyond maxInlineFilters into a More filters popover", async () => {
    const spy = vi.fn();
    render(<Harness spy={spy} filters={[status, region, plan, owner]} />);
    expect(screen.getByRole("combobox", { name: "Plan" })).toBeInTheDocument();
    expect(screen.queryByText("Owner")).not.toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: /More filters/ });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const dialog = screen.getByRole("dialog");
    const group = within(dialog).getByRole("group", { name: "Owner" });
    await userEvent.click(within(group).getByRole("checkbox", { name: "Ben" }));
    expect(spy).toHaveBeenLastCalledWith({ search: "", filters: { owner: ["ben"] } });
    expect(screen.getByRole("button", { name: /More filters, 1 active/ })).toBeInTheDocument();
  });

  it("respects maxInlineFilters and closes with Done, returning focus to the trigger", async () => {
    render(<Harness filters={[status, region, plan]} maxInlineFilters={1} />);
    expect(screen.queryByRole("combobox", { name: "Region" })).not.toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: /More filters/ });
    await userEvent.click(trigger);
    expect(within(screen.getByRole("dialog")).getByLabelText("Plan")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await act(async () => {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });
    expect(trigger).toHaveFocus();
  });

  it("Escape closes the popover", async () => {
    render(<Harness filters={[status, region, plan, owner]} />);
    await userEvent.click(screen.getByRole("button", { name: /More filters/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("collapses every filter into a Filters popover at ≤ 768px", async () => {
    setNarrow(true);
    render(<Harness />);
    expect(screen.queryByRole("combobox", { name: "Status" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /^Filters/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByLabelText("Status")).toBeInTheDocument();
    expect(within(dialog).getByRole("group", { name: "Region" })).toBeInTheDocument();
  });

  it("keeps everything inline when moreFilters is false", () => {
    setNarrow(true);
    render(<Harness filters={[status, region, plan, owner]} moreFilters={false} />);
    expect(screen.queryByRole("button", { name: /filters/i })).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Owner" })).toBeInTheDocument();
  });
});

describe("FilterBar utils", () => {
  it("setFilterValue drops empty values; removeFilterValue handles select and multi", () => {
    expect(setFilterValue({ a: "x" }, "a", "")).toEqual({});
    expect(setFilterValue({}, "b", ["1"])).toEqual({ b: ["1"] });
    expect(removeFilterValue({ region: ["emea", "apac"] }, region, "emea")).toEqual({ region: ["apac"] });
    expect(removeFilterValue({ status: "active" }, status, "active")).toEqual({});
  });

  it("hasActiveFilterValue and getActiveChips", () => {
    expect(hasActiveFilterValue({ search: "  ", filters: { a: [] } })).toBe(false);
    expect(hasActiveFilterValue({ search: "q", filters: {} })).toBe(true);
    expect(getActiveChips([status], { filters: { status: "zzz" } })[0].optionLabel).toBe("zzz");
  });
});

describe("FilterBar — iteration 2", () => {
  function controllableMedia(initial: boolean) {
    let matches = initial;
    const listeners = new Set<() => void>();
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
      dispatchEvent: vi.fn(),
    }));
    return (next: boolean) =>
      act(() => {
        matches = next;
        listeners.forEach((cb) => cb());
      });
  }

  it("multi filters read '{label}: All' while the accessible name stays the label", () => {
    render(<Harness />);
    const region = screen.getByRole("combobox", { name: "Region" });
    expect(region).toHaveTextContent("Region: All");
    expect(region).not.toHaveAttribute("aria-label");
    expect(screen.getByRole("combobox", { name: "Status" })).toHaveDisplayValue("Status: All");
    // Label is present for AT but visually hidden when showLabels is off.
    expect(document.querySelector(".ds-filter-bar")).toHaveAttribute("data-show-labels", "false");
  });

  it("moves focus to the Filters trigger when a focused inline filter collapses, and back on expand", async () => {
    const setNarrowLive = controllableMedia(false);
    render(<Harness />);
    const status = screen.getByRole("combobox", { name: "Status" });
    status.focus();
    expect(status).toHaveFocus();

    await setNarrowLive(true);
    const trigger = screen.getByRole("button", { name: /^Filters/ });
    expect(trigger).toHaveFocus();

    await setNarrowLive(false);
    expect(screen.queryByRole("button", { name: /^Filters/ })).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Status" })).toHaveFocus();
  });

  it("restores to the Combobox trigger that had focus", async () => {
    const setNarrowLive = controllableMedia(false);
    render(<Harness />);
    screen.getByRole("combobox", { name: "Region" }).focus();
    await setNarrowLive(true);
    expect(screen.getByRole("button", { name: /^Filters/ })).toHaveFocus();
    await setNarrowLive(false);
    expect(screen.getByRole("combobox", { name: "Region" })).toHaveFocus();
  });

  it("leaves focus alone when it was outside the filters", async () => {
    const setNarrowLive = controllableMedia(false);
    render(<Harness />);
    const search = screen.getByRole("searchbox");
    search.focus();
    await setNarrowLive(true);
    expect(search).toHaveFocus();
    await setNarrowLive(false);
    expect(search).toHaveFocus();
  });
});
