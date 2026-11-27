import React, { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimePicker from "./index";
import FormField from "../FormField";
import {
  adjustSegment,
  buildOptions,
  formatInputText,
  formatOptionLabel,
  fromHHmm,
  parseTimeText,
  segmentAt,
  toHHmm,
} from "./TimePicker.utils";
import type { TimePickerProps } from "./TimePicker.types";

function Controlled(props: Partial<TimePickerProps>) {
  const [value, setValue] = useState<string | null>(props.defaultValue ?? null);
  return (
    <TimePicker
      label="Start"
      {...props}
      defaultValue={undefined}
      value={value}
      onChange={(next) => {
        setValue(next);
        props.onChange?.(next);
      }}
    />
  );
}

const box = () => screen.getByRole("combobox", { name: "Start" });

describe("TimePicker — rendering", () => {
  it("renders a labelled combobox with the formatted value", () => {
    render(<TimePicker label="Start" format={24} defaultValue="09:05" />);
    expect(box()).toHaveValue("09:05");
    expect(box()).toHaveAttribute("aria-expanded", "false");
    expect(box()).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("formats in 12-hour mode", () => {
    render(<TimePicker label="Start" format={12} locale="en-US" defaultValue="21:30" />);
    expect(box()).toHaveValue("09:30 PM");
  });

  it("sets size and state data attributes and a hidden input", () => {
    const { container } = render(
      <TimePicker label="Start" size="sm" name="start" defaultValue="10:00" disabled format={24} />,
    );
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-disabled", "true");
    expect(box()).toBeDisabled();
    expect(container.querySelector('input[type="hidden"][name="start"]')).toHaveValue("10:00");
  });

  it("forwards the ref to the text box", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TimePicker label="Start" ref={ref} />);
    expect(ref.current).toBe(box());
  });
});

describe("TimePicker — listbox", () => {
  it("opens with the toggle button, lists step options and marks disabled ones", async () => {
    render(
      <TimePicker
        label="Start"
        format={24}
        step={30}
        min="09:00"
        max="11:00"
        disabledTimes={["10:00"]}
        locale="en-GB"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Show times" }));
    expect(box()).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox", { name: "Times" });
    expect(box()).toHaveAttribute("aria-controls", listbox.id);
    const opts = within(listbox).getAllByRole("option");
    expect(opts.map((o) => o.textContent)).toEqual(["09:00", "09:30", "10:00", "10:30", "11:00"]);
    expect(opts[2]).toHaveAttribute("aria-disabled", "true");
    expect(box()).toHaveAttribute("aria-activedescendant", opts[0].id);
  });

  it("uses Intl labels in 12-hour mode", async () => {
    render(<TimePicker label="Start" format={12} locale="en-US" step={60} min="13:00" max="14:00" />);
    await userEvent.click(screen.getByRole("button", { name: "Show times" }));
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["1:00 PM", "2:00 PM"]);
  });

  it("Alt+ArrowDown opens, arrows skip disabled options, Enter picks", async () => {
    const onChange = vi.fn();
    render(
      <Controlled format={24} step={30} min="09:00" max="11:00" disabledTimes={["09:30"]} onChange={onChange} />,
    );
    await userEvent.click(box());
    await userEvent.keyboard("{Escape}");
    await userEvent.keyboard("{Alt>}{ArrowDown}{/Alt}");
    expect(box()).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}");
    const active = document.getElementById(box().getAttribute("aria-activedescendant")!);
    expect(active).toHaveTextContent("10:00");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("10:00");
    expect(box()).toHaveAttribute("aria-expanded", "false");
    expect(box()).toHaveValue("10:00");
  });

  it("clicking an option picks it; disabled options do nothing", async () => {
    const onChange = vi.fn();
    render(<Controlled format={24} step={60} min="08:00" max="10:00" disabledTimes={(t) => t === "09:00"} onChange={onChange} />);
    await userEvent.click(box());
    await userEvent.click(screen.getByRole("option", { name: "09:00" }));
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("option", { name: "10:00" }));
    expect(onChange).toHaveBeenLastCalledWith("10:00");
    expect(box()).toHaveFocus();
  });

  it("Escape closes the list without reaching ancestors", async () => {
    const outer = vi.fn();
    render(
      <div onKeyDown={outer}>
        <TimePicker label="Start" format={24} />
      </div>,
    );
    await userEvent.click(box());
    expect(box()).toHaveAttribute("aria-expanded", "true");
    outer.mockClear();
    await userEvent.keyboard("{Escape}");
    expect(box()).toHaveAttribute("aria-expanded", "false");
    expect(outer).not.toHaveBeenCalled();
  });

  it("marks the current value as selected", async () => {
    render(<TimePicker label="Start" format={24} step={60} defaultValue="03:00" />);
    await userEvent.click(box());
    expect(screen.getByRole("option", { name: "03:00" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("TimePicker — typing and segments", () => {
  it("parses typed text on Enter / blur and re-formats it", async () => {
    const onChange = vi.fn();
    render(<Controlled format={24} onChange={onChange} />);
    await userEvent.type(box(), "930pm{Escape}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("21:30");
    expect(box()).toHaveValue("21:30");
  });

  it("Enter commits typed text even while the list is open", async () => {
    const onChange = vi.fn();
    render(<Controlled format={24} step={30} onChange={onChange} />);
    await userEvent.click(box());
    expect(box()).toHaveAttribute("aria-expanded", "true");
    await userEvent.type(box(), "7:10{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("07:10");
    expect(box()).toHaveAttribute("aria-expanded", "false");
  });

  it("typing an exact option time highlights it", async () => {
    render(<Controlled format={24} step={30} />);
    await userEvent.click(box());
    await userEvent.type(box(), "08:30");
    const active = document.getElementById(box().getAttribute("aria-activedescendant")!);
    expect(active).toHaveTextContent("08:30");
  });

  it("shows an assertive error for unparseable or unavailable text", async () => {
    render(<Controlled format={24} min="09:00" />);
    await userEvent.type(box(), "nonsense");
    await userEvent.tab();
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid time");
    expect(box()).toHaveAttribute("aria-invalid", "true");
    expect(box().getAttribute("aria-describedby")).toContain(screen.getByRole("alert").id);
    await userEvent.clear(box());
    await userEvent.type(box(), "08:00");
    await userEvent.tab();
    expect(screen.getByRole("alert")).toHaveTextContent("That time is not available");
  });

  it("ArrowUp / ArrowDown change the hour segment under the caret", async () => {
    const onChange = vi.fn();
    render(<Controlled format={24} defaultValue="09:15" onChange={onChange} />);
    const input = box();
    input.focus();
    input.setSelectionRange(1, 1);
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("10:15");
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(2);
  });

  it("ArrowUp on the minute segment uses step and snaps", () => {
    const onChange = vi.fn();
    render(<Controlled format={24} step={15} defaultValue="09:07" onChange={onChange} />);
    const input = box();
    input.focus();
    input.setSelectionRange(4, 4);
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("09:15");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith("09:00");
  });

  it("ArrowUp on the period segment toggles AM / PM", () => {
    const onChange = vi.fn();
    render(<Controlled format={12} locale="en-US" defaultValue="09:00" onChange={onChange} />);
    const input = box();
    input.focus();
    input.setSelectionRange(7, 7);
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("21:00");
    expect(input).toHaveValue("09:00 PM");
  });

  it("segment stepping skips unavailable times", () => {
    const onChange = vi.fn();
    render(<Controlled format={24} defaultValue="09:00" disabledTimes={["10:00"]} max="12:00" onChange={onChange} />);
    const input = box();
    input.focus();
    input.setSelectionRange(0, 0);
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith("11:00");
  });

  it("clearable shows a clear button that empties the value", async () => {
    const onChange = vi.fn();
    render(<Controlled format={24} defaultValue="09:00" clearable onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear time" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(box()).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear time" })).toBeNull();
  });
});

describe("TimePicker — FormField consumer", () => {
  it("takes id, description, invalid and required from the field", () => {
    render(
      <FormField label="Meeting time" hint="Office hours only" error="Required" required>
        <TimePicker format={24} />
      </FormField>,
    );
    const input = screen.getByRole("combobox", { name: /Meeting time/ });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input.getAttribute("aria-describedby")).toContain(screen.getByText("Office hours only").id);
  });
});

describe("TimePicker utils", () => {
  const periods: [string, string] = ["AM", "PM"];
  it("round-trips HH:mm", () => {
    expect(fromHHmm("07:45")).toBe(465);
    expect(toHHmm(465)).toBe("07:45");
    expect(fromHHmm("24:00")).toBeNull();
  });
  it.each([
    ["9", 540],
    ["930", 570],
    ["0930", 570],
    ["9:30", 570],
    ["21.30", 1290],
    ["9pm", 1260],
    ["12 am", 0],
    ["12:15 p.m.", 735],
    ["25:00", null],
    ["13pm", null],
    ["abc", null],
  ])("parses %s", (text, expected) => {
    expect(parseTimeText(text, periods)).toBe(expected);
  });
  it("formats input text with fixed segments", () => {
    expect(formatInputText(0, 12, periods)).toBe("12:00 AM");
    expect(formatInputText(13 * 60 + 5, 24, periods)).toBe("13:05");
  });
  it("formats option labels with Intl", () => {
    expect(formatOptionLabel(9 * 60 + 30, 12, "en-US")).toBe("9:30 AM");
  });
  it("segmentAt / adjustSegment", () => {
    expect(segmentAt(1, 24)).toBe("hour");
    expect(segmentAt(4, 24)).toBe("minute");
    expect(segmentAt(7, 12)).toBe("period");
    expect(adjustSegment(23 * 60, "hour", 1, 15)).toBe(0);
    expect(adjustSegment(9 * 60 + 50, "minute", 1, 15)).toBe(9 * 60);
    expect(adjustSegment(9 * 60, "minute", -1, 15)).toBe(9 * 60 + 45);
  });
  it("buildOptions respects step and range", () => {
    expect(buildOptions(120, 60, 400)).toEqual([120, 240, 360]);
  });
});
