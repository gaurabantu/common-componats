import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SegmentedControl from "./index";
import type { SegmentedControlOption } from "./SegmentedControl.types";

const OPTIONS: SegmentedControlOption[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const radios = () => screen.getAllByRole("radio");

describe("SegmentedControl", () => {
  describe("rendering & semantics", () => {
    it("renders a named radiogroup with one radio per option", () => {
      render(<SegmentedControl ariaLabel="Date range" options={OPTIONS} defaultValue="week" />);
      const group = screen.getByRole("radiogroup", { name: "Date range" });
      expect(group).toHaveAttribute("data-size", "md");
      expect(radios()).toHaveLength(4);
      expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute("aria-checked", "true");
      expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "false");
    });

    it("uses a roving tabindex on the selected option", () => {
      render(<SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="month" />);
      expect(radios().map((r) => r.tabIndex)).toEqual([-1, -1, 0, -1]);
    });

    it("falls back to the first enabled option as tab stop when nothing / a disabled option is selected", () => {
      const opts = [{ ...OPTIONS[0], disabled: true }, ...OPTIONS.slice(1)];
      const { rerender } = render(<SegmentedControl ariaLabel="Range" options={opts} />);
      expect(radios().map((r) => r.tabIndex)).toEqual([-1, 0, -1, -1]);
      rerender(<SegmentedControl ariaLabel="Range" options={opts} value="day" />);
      expect(radios().map((r) => r.tabIndex)).toEqual([-1, 0, -1, -1]);
      expect(radios()[0]).toBeDisabled();
    });

    it("applies size, fullWidth and className, and decorative icons", () => {
      render(
        <SegmentedControl
          ariaLabel="View"
          size="sm"
          fullWidth
          className="extra"
          options={[{ value: "a", label: "List", icon: <svg data-testid="ic" /> }]}
        />,
      );
      const group = screen.getByRole("radiogroup");
      expect(group).toHaveAttribute("data-size", "sm");
      expect(group).toHaveAttribute("data-full-width", "true");
      expect(group).toHaveClass("ds-segmented", "extra");
      expect(screen.getByTestId("ic").parentElement).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("radio", { name: "List" })).toBeInTheDocument();
    });

    it("renders a decorative indicator", () => {
      const { container } = render(<SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="day" />);
      expect(container.querySelector(".ds-segmented__indicator")).toHaveAttribute("aria-hidden", "true");
    });

    it("disables everything with `disabled`", () => {
      render(<SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="day" disabled />);
      expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-disabled", "true");
      radios().forEach((r) => expect(r).toBeDisabled());
    });

    it("forwards the ref to the radiogroup", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SegmentedControl ref={ref} ariaLabel="Range" options={OPTIONS} />);
      expect(ref.current).toBe(screen.getByRole("radiogroup"));
    });
  });

  describe("interaction", () => {
    it("selects on click and reports the value once", () => {
      const onValueChange = vi.fn();
      render(<SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="day" onValueChange={onValueChange} />);
      fireEvent.click(screen.getByRole("radio", { name: "Year" }));
      expect(onValueChange).toHaveBeenCalledWith("year");
      expect(screen.getByRole("radio", { name: "Year" })).toHaveAttribute("aria-checked", "true");
      fireEvent.click(screen.getByRole("radio", { name: "Year" }));
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it("arrow keys move focus AND select, wrapping and skipping disabled", () => {
      const onValueChange = vi.fn();
      const opts = [OPTIONS[0], { ...OPTIONS[1], disabled: true }, OPTIONS[2], OPTIONS[3]];
      render(<SegmentedControl ariaLabel="Range" options={opts} defaultValue="day" onValueChange={onValueChange} />);
      const [day, , month, year] = radios();
      day.focus();
      fireEvent.keyDown(day, { key: "ArrowRight" });
      expect(month).toHaveFocus();
      expect(month).toHaveAttribute("aria-checked", "true");
      expect(onValueChange).toHaveBeenLastCalledWith("month");
      fireEvent.keyDown(month, { key: "ArrowDown" });
      expect(year).toHaveFocus();
      fireEvent.keyDown(year, { key: "ArrowRight" });
      expect(day).toHaveFocus();
      expect(day).toHaveAttribute("aria-checked", "true");
      fireEvent.keyDown(day, { key: "ArrowLeft" });
      expect(year).toHaveFocus();
      fireEvent.keyDown(year, { key: "ArrowUp" });
      expect(month).toHaveFocus();
    });

    it("Home / End jump to first / last enabled option", () => {
      const opts = [{ ...OPTIONS[0], disabled: true }, OPTIONS[1], OPTIONS[2], { ...OPTIONS[3], disabled: true }];
      render(<SegmentedControl ariaLabel="Range" options={opts} defaultValue="week" />);
      const [, week, month] = radios();
      week.focus();
      fireEvent.keyDown(week, { key: "End" });
      expect(month).toHaveFocus();
      expect(month).toHaveAttribute("aria-checked", "true");
      fireEvent.keyDown(month, { key: "Home" });
      expect(week).toHaveFocus();
      expect(week).toHaveAttribute("aria-checked", "true");
    });

    it("flips horizontal arrows in RTL", () => {
      render(
        <div dir="rtl" style={{ direction: "rtl" }}>
          <SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="week" style={{ direction: "rtl" }} />
        </div>,
      );
      const [day, week, month] = radios();
      week.focus();
      fireEvent.keyDown(week, { key: "ArrowLeft" });
      expect(month).toHaveFocus();
      fireEvent.keyDown(month, { key: "ArrowRight" });
      expect(week).toHaveFocus();
      fireEvent.keyDown(week, { key: "ArrowRight" });
      expect(day).toHaveFocus();
    });

    it("works controlled", () => {
      function Controlled() {
        const [v, setV] = useState("day");
        return (
          <>
            <SegmentedControl ariaLabel="Range" options={OPTIONS} value={v} onValueChange={setV} />
            <output>{v}</output>
          </>
        );
      }
      render(<Controlled />);
      fireEvent.click(screen.getByRole("radio", { name: "Month" }));
      expect(screen.getByText("month", { selector: "output" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute("aria-checked", "true");
    });

    it("controlled without updates keeps the prop value", () => {
      const onValueChange = vi.fn();
      render(<SegmentedControl ariaLabel="Range" options={OPTIONS} value="day" onValueChange={onValueChange} />);
      fireEvent.click(screen.getByRole("radio", { name: "Week" }));
      expect(onValueChange).toHaveBeenCalledWith("week");
      expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "true");
    });

    it("ignores clicks on disabled options and unrelated keys", () => {
      const onValueChange = vi.fn();
      const opts = [OPTIONS[0], { ...OPTIONS[1], disabled: true }];
      render(<SegmentedControl ariaLabel="Range" options={opts} defaultValue="day" onValueChange={onValueChange} />);
      fireEvent.click(screen.getByRole("radio", { name: "Week" }));
      fireEvent.keyDown(radios()[0], { key: "a" });
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("rescues focus when the focused option becomes disabled", () => {
      const { rerender } = render(<SegmentedControl ariaLabel="Range" options={OPTIONS} defaultValue="week" />);
      const week = screen.getByRole("radio", { name: "Week" });
      act(() => week.focus());
      expect(week).toHaveFocus();
      const opts = OPTIONS.map((o) => (o.value === "week" ? { ...o, disabled: true } : o));
      act(() => {
        rerender(<SegmentedControl ariaLabel="Range" options={opts} defaultValue="week" />);
      });
      // jsdom keeps focus on disabled buttons; simulate the browser dropping it, then re-render.
      act(() => week.blur());
      act(() => {
        rerender(<SegmentedControl ariaLabel="Range" options={[...opts]} defaultValue="week" />);
      });
      expect(screen.getByRole("radio", { name: "Day" })).toHaveFocus();
    });
  });

  describe("icon-only options", () => {
    const icon = <svg data-testid="grid-icon" />;

    it("uses ariaLabel as the accessible name and marks the segment icon-only", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <SegmentedControl
          ariaLabel="View"
          options={[
            { value: "list", label: <svg />, ariaLabel: "List view" },
            { value: "grid", label: null, icon, ariaLabel: "Grid view" },
          ]}
          defaultValue="grid"
        />,
      );
      const grid = screen.getByRole("radio", { name: "Grid view" });
      expect(grid).toHaveAttribute("aria-checked", "true");
      expect(grid).toHaveAttribute("data-icon-only", "true");
      expect(screen.getByRole("radio", { name: "List view" })).toHaveAttribute("data-icon-only", "true");
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });

    it("warns once in development when a non-text label has no ariaLabel", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const opts = [
        { value: "list", label: "List" },
        { value: "grid", label: <svg /> },
      ];
      const { rerender } = render(<SegmentedControl ariaLabel="View" options={opts} />);
      rerender(<SegmentedControl ariaLabel="View" options={[...opts]} />);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toMatch(/option "grid".*ariaLabel/);
      warn.mockRestore();
    });

    it("does not warn for string or number labels, and ariaLabel overrides a text label", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <SegmentedControl
          ariaLabel="Zoom"
          options={[
            { value: "1", label: 1 },
            { value: "2", label: "2x", ariaLabel: "Double zoom" },
          ]}
        />,
      );
      expect(warn).not.toHaveBeenCalled();
      expect(screen.getByRole("radio", { name: "1" })).not.toHaveAttribute("data-icon-only");
      expect(screen.getByRole("radio", { name: "Double zoom" })).toBeInTheDocument();
      warn.mockRestore();
    });
  });
});
