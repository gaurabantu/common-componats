import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "./index";

/** Day buttons expose `data-date="YYYY-MM-DD"` (local date). */
const day = (key: string) => document.querySelector(`[data-date="${key}"]`) as HTMLButtonElement;
const label = (y: number, m: number, d: number) => new Date(y, m, d).toLocaleDateString();

describe("Calendar — rendering", () => {
  it("renders 42 day buttons and the month caption", () => {
    render(<Calendar defaultValue={new Date(2026, 2, 15)} captionLayout="label" />);
    expect(document.querySelectorAll("button.calendar-cell")).toHaveLength(42);
    expect(
      screen.getByText(new Date(2026, 2, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" })),
    ).toBeInTheDocument();
  });

  it("labels each day with its full date and marks outside days", () => {
    render(<Calendar month={new Date(2026, 2, 1)} />);
    expect(screen.getByRole("button", { name: label(2026, 2, 10) })).toBeInTheDocument();
    // March 2026 starts on Sunday → last row spills into April
    expect(day("2026-04-01")).toHaveAttribute("data-outside", "true");
  });

  it("starts the week on Monday when firstDayOfWeek=1", () => {
    render(<Calendar month={new Date(2026, 2, 1)} firstDayOfWeek={1} />);
    const cells = document.querySelectorAll("button.calendar-cell");
    // 1 March 2026 is a Sunday → Monday grid starts on 23 Feb
    expect(cells[0]).toHaveAttribute("data-date", "2026-02-23");
  });

  it("renders week numbers when requested", () => {
    const { container } = render(<Calendar month={new Date(2026, 0, 1)} showWeekNumbers />);
    expect(container.textContent).toContain("#");
  });

  it("uses dateCellRender for cell content", () => {
    render(<Calendar month={new Date(2026, 2, 1)} dateCellRender={(d) => <span>d{d.getDate()}</span>} />);
    expect(screen.getAllByText("d15").length).toBeGreaterThan(0);
  });

  it("hides navigation when hideNavigation is set", () => {
    render(<Calendar month={new Date(2026, 2, 1)} hideNavigation />);
    expect(screen.queryByRole("button", { name: "Previous month" })).not.toBeInTheDocument();
  });
});

describe("Calendar — a11y attributes", () => {
  it("exposes selection with aria-pressed (not aria-selected on a button)", () => {
    render(<Calendar value={new Date(2026, 2, 15)} />);
    const selected = day("2026-03-15");
    expect(selected).toHaveAttribute("aria-pressed", "true");
    expect(selected).not.toHaveAttribute("aria-selected");
    expect(day("2026-03-16")).toHaveAttribute("aria-pressed", "false");
  });

  it("marks today with aria-current=date", () => {
    render(<Calendar />);
    const t = new Date();
    const key = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    expect(day(key)).toHaveAttribute("aria-current", "date");
  });

  it("navigation buttons have accessible names and decorative icons", () => {
    render(<Calendar month={new Date(2026, 2, 1)} captionLayout="label" />);
    const prev = screen.getByRole("button", { name: "Previous month" });
    expect(prev.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Next month" })).toBeInTheDocument();
  });

  it("menus caption exposes aria-haspopup / aria-expanded and closes on Escape", () => {
    render(<Calendar month={new Date(2026, 2, 1)} />);
    const monthBtn = screen.getByRole("button", { name: "Choose month" });
    expect(monthBtn).toHaveAttribute("aria-haspopup", "dialog");
    expect(monthBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(monthBtn);
    expect(monthBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Month" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(monthBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("dropdown caption renders labelled native selects", () => {
    render(<Calendar month={new Date(2026, 2, 1)} captionLayout="dropdown" />);
    expect(screen.getByRole("combobox", { name: "Select month" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Select year" })).toBeInTheDocument();
  });

  it("disabled calendar marks days aria-disabled and ignores clicks", () => {
    const onChange = vi.fn();
    render(<Calendar month={new Date(2026, 2, 1)} disabled onChange={onChange} />);
    const d = day("2026-03-10");
    expect(d).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(d);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Calendar — selection", () => {
  it("single mode calls onChange and selects (uncontrolled)", () => {
    const onChange = vi.fn();
    render(<Calendar month={new Date(2026, 2, 1)} onChange={onChange} />);
    fireEvent.click(day("2026-03-10"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const picked = onChange.mock.calls[0][0] as Date;
    expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2026, 2, 10]);
    expect(day("2026-03-10")).toHaveAttribute("aria-pressed", "true");
  });

  it("readOnly ignores clicks", () => {
    const onChange = vi.fn();
    render(<Calendar month={new Date(2026, 2, 1)} readOnly onChange={onChange} />);
    fireEvent.click(day("2026-03-10"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("minDate / maxDate / disabledDate disable days", () => {
    const onChange = vi.fn();
    render(
      <Calendar
        month={new Date(2026, 2, 1)}
        minDate="2026-03-05"
        maxDate={new Date(2026, 2, 25)}
        disabledDate={(d) => d.getDate() === 12}
        onChange={onChange}
      />,
    );
    expect(day("2026-03-04")).toBeDisabled();
    expect(day("2026-03-26")).toBeDisabled();
    expect(day("2026-03-12")).toBeDisabled();
    expect(day("2026-03-13")).not.toBeDisabled();
    fireEvent.click(day("2026-03-04"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("range mode picks start then end (swapping when end < start)", () => {
    const onRangeChange = vi.fn();
    render(<Calendar mode="range" month={new Date(2026, 2, 1)} onRangeChange={onRangeChange} />);
    fireEvent.click(day("2026-03-20"));
    expect(onRangeChange).toHaveBeenLastCalledWith([expect.any(Date), null]);
    fireEvent.click(day("2026-03-10"));
    const [start, end] = onRangeChange.mock.calls[1][0] as [Date, Date];
    expect(start.getDate()).toBe(10);
    expect(end.getDate()).toBe(20);
    expect(day("2026-03-10")).toHaveAttribute("aria-pressed", "true");
    expect(day("2026-03-20")).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Calendar — month navigation", () => {
  it("prev/next buttons change month and call onMonthChange", () => {
    const onMonthChange = vi.fn();
    render(<Calendar defaultValue={new Date(2026, 2, 15)} captionLayout="label" onMonthChange={onMonthChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    const next = onMonthChange.mock.calls[0][0] as Date;
    expect([next.getFullYear(), next.getMonth(), next.getDate()]).toEqual([2026, 3, 1]);
    expect(day("2026-04-15")).not.toHaveAttribute("data-outside");
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(day("2026-02-15")).not.toHaveAttribute("data-outside");
  });
});

describe("Calendar — keyboard grid (roving tabindex)", () => {
  it("only one day is in the Tab order — the selected day", () => {
    render(<Calendar value={new Date(2026, 2, 15)} />);
    const tabbable = document.querySelectorAll('button.calendar-cell[tabindex="0"]');
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAttribute("data-date", "2026-03-15");
  });

  it("falls back to the first enabled day of the month when nothing is selected", () => {
    render(<Calendar month={new Date(2030, 4, 1)} minDate="2030-05-03" />);
    expect(day("2030-05-03")).toHaveAttribute("tabindex", "0");
  });

  it("arrow keys move focus by day and week", () => {
    render(<Calendar value={new Date(2026, 2, 15)} />);
    day("2026-03-15").focus();
    fireEvent.keyDown(day("2026-03-15"), { key: "ArrowRight" });
    expect(day("2026-03-16")).toHaveFocus();
    fireEvent.keyDown(day("2026-03-16"), { key: "ArrowDown" });
    expect(day("2026-03-23")).toHaveFocus();
    fireEvent.keyDown(day("2026-03-23"), { key: "ArrowLeft" });
    expect(day("2026-03-22")).toHaveFocus();
    fireEvent.keyDown(day("2026-03-22"), { key: "ArrowUp" });
    expect(day("2026-03-15")).toHaveFocus();
    expect(day("2026-03-15")).toHaveAttribute("tabindex", "0");
  });

  it("Home / End jump to the start / end of the week", () => {
    render(<Calendar value={new Date(2026, 2, 18)} />); // Wednesday
    day("2026-03-18").focus();
    fireEvent.keyDown(day("2026-03-18"), { key: "Home" });
    expect(day("2026-03-15")).toHaveFocus(); // Sunday
    fireEvent.keyDown(day("2026-03-15"), { key: "End" });
    expect(day("2026-03-21")).toHaveFocus(); // Saturday
  });

  it("PageDown / PageUp change month (uncontrolled) and keep focus on the same day", () => {
    const onMonthChange = vi.fn();
    render(<Calendar defaultValue={new Date(2026, 0, 31)} onMonthChange={onMonthChange} />);
    day("2026-01-31").focus();
    fireEvent.keyDown(day("2026-01-31"), { key: "PageDown" });
    expect(onMonthChange).toHaveBeenCalled();
    expect(day("2026-02-28")).toHaveFocus(); // clamped
    fireEvent.keyDown(day("2026-02-28"), { key: "PageUp" });
    expect(day("2026-01-28")).toHaveFocus();
  });

  it("ArrowRight past the month end moves to the next month", () => {
    render(<Calendar defaultValue={new Date(2026, 2, 31)} />);
    day("2026-03-31").focus();
    fireEvent.keyDown(day("2026-03-31"), { key: "ArrowRight" });
    const target = day("2026-04-01");
    expect(target).toHaveFocus();
    expect(target).not.toHaveAttribute("data-outside");
  });

  it("arrow keys skip disabled days", () => {
    render(<Calendar value={new Date(2026, 2, 10)} disabledDate={(d) => d.getDate() === 11} />);
    day("2026-03-10").focus();
    fireEvent.keyDown(day("2026-03-10"), { key: "ArrowRight" });
    expect(day("2026-03-12")).toHaveFocus();
  });

  it("Enter on a focused day selects it (native button activation)", () => {
    const onChange = vi.fn();
    render(<Calendar month={new Date(2026, 2, 1)} onChange={onChange} />);
    const d = day("2026-03-09");
    d.focus();
    fireEvent.click(d); // jsdom: Enter/Space on <button> dispatch click
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
