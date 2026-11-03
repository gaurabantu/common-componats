import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NumberInput from "./index";
import { FormField } from "../../molecules/FormField";
import { NUMBER_INPUT_REPEAT_DELAY_MS, NUMBER_INPUT_REPEAT_INTERVAL_MS } from "./NumberInput.config";

const sb = () => screen.getByRole("spinbutton") as HTMLInputElement;

afterEach(() => {
  vi.useRealTimers();
});

describe("NumberInput — rendering & semantics", () => {
  it("is a labelled text input with spinbutton semantics", () => {
    render(<NumberInput label="Quantity" defaultValue={3} min={0} max={10} />);
    const input = screen.getByRole("spinbutton", { name: "Quantity" });
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveAttribute("aria-valuenow", "3");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
    expect(input).toHaveAttribute("aria-valuetext", "3");
  });

  it("omits aria-valuenow when empty", () => {
    render(<NumberInput label="Qty" />);
    expect(sb()).not.toHaveAttribute("aria-valuenow");
    expect(sb()).toHaveValue("");
  });

  it("shows the formatted value when blurred and a plain number when focused", () => {
    render(<NumberInput label="Price" locale="en-US" defaultValue={1234.5} formatOptions={{ style: "currency", currency: "USD" }} />);
    expect(sb()).toHaveValue("$1,234.50");
    expect(sb()).toHaveAttribute("aria-valuetext", "$1,234.50");
    fireEvent.focus(sb());
    expect(sb()).toHaveValue("1234.5");
    fireEvent.blur(sb());
    expect(sb()).toHaveValue("$1,234.50");
  });

  it("includes string prefix / suffix in aria-valuetext and hides the slots from AT", () => {
    const { container } = render(<NumberInput label="Weight" defaultValue={12.5} suffix="kg" prefix="≈" />);
    expect(sb()).toHaveAttribute("aria-valuetext", "≈ 12.5 kg");
    container.querySelectorAll(".ds-number-input__affix").forEach((el) => expect(el).toHaveAttribute("aria-hidden", "true"));
  });

  it("percent: value is a fraction, shown ×100", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Rate" locale="en-US" defaultValue={0.25} step={0.01} formatOptions={{ style: "percent" }} onChange={onChange} />);
    expect(sb()).toHaveValue("25%");
    fireEvent.focus(sb());
    expect(sb()).toHaveValue("25");
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith(0.26);
    expect(sb()).toHaveValue("26");
  });

  it("compact notation displays and parses back", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Budget" locale="en-US" defaultValue={1200} formatOptions={{ notation: "compact" }} onChange={onChange} />);
    expect(sb()).toHaveValue("1.2K");
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "3.5M" } });
    expect(onChange).toHaveBeenLastCalledWith(3_500_000);
  });

  it("renders a hidden input carrying the raw number for form posts", () => {
    const { container } = render(<NumberInput label="Qty" name="qty" defaultValue={1234.5} />);
    expect(container.querySelector<HTMLInputElement>('input[type="hidden"][name="qty"]')!.value).toBe("1234.5");
    expect(sb()).not.toHaveAttribute("name");
  });
});

describe("NumberInput — typing, parsing, blur", () => {
  it("fires onChange with the parsed value while typing; empty → null; invalid → no call", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "1,234.5" } });
    expect(onChange).toHaveBeenLastCalledWith(1234.5);
    fireEvent.change(sb(), { target: { value: "" } });
    expect(onChange).toHaveBeenLastCalledWith(null);
    onChange.mockClear();
    fireEvent.change(sb(), { target: { value: "abc" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("reverts invalid text on blur", () => {
    render(<NumberInput label="Qty" defaultValue={5} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "5x" } });
    fireEvent.blur(sb());
    expect(sb()).toHaveValue("5");
  });

  it("parses locale input (de-DE)", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Betrag" locale="de-DE" onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "1.234,5" } });
    expect(onChange).toHaveBeenLastCalledWith(1234.5);
    fireEvent.blur(sb());
    expect(sb()).toHaveValue("1.234,5");
  });

  it("clamps and rounds on blur (clampOnBlur default)", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" min={0} max={100} precision={2} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "500" } });
    expect(onChange).toHaveBeenLastCalledWith(500);
    fireEvent.blur(sb());
    expect(onChange).toHaveBeenLastCalledWith(100);
    expect(sb()).toHaveValue("100.00");
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "1.236" } });
    fireEvent.keyDown(sb(), { key: "Enter" });
    expect(onChange).toHaveBeenLastCalledWith(1.24);
    expect(sb()).toHaveValue("1.24");
  });

  it("clampOnBlur={false} keeps out-of-range values", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" max={10} clampOnBlur={false} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "50" } });
    fireEvent.blur(sb());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(sb()).toHaveValue("50");
  });

  it("allowNegative={false}: a typed minus is rejected (no sign flip) and clamps to the lower bound on blur", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" allowNegative={false} defaultValue={1} onChange={onChange} />);
    expect(sb()).toHaveAttribute("aria-valuemin", "0");
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "-5" } });
    expect(sb()).toHaveValue("-5");
    expect(sb()).toHaveAttribute("aria-invalid", "true");
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.blur(sb());
    expect(onChange).toHaveBeenLastCalledWith(0);
    expect(sb()).toHaveValue("0");
    expect(sb()).not.toHaveAttribute("aria-invalid");
  });

  it("allowNegative={false} + clampOnBlur={false}: a typed minus reverts on blur", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" allowNegative={false} clampOnBlur={false} min={2} defaultValue={7} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "-5" } });
    fireEvent.blur(sb());
    expect(onChange).not.toHaveBeenCalled();
    expect(sb()).toHaveValue("7");
  });

  it.each(["1,2345", "1,234,5", "1-2"])(
    "malformed %s keeps the typed text, sets aria-invalid, never calls onChange, reverts on blur",
    (typed) => {
      const onChange = vi.fn();
      render(<NumberInput label="Qty" locale="en-US" defaultValue={9} onChange={onChange} />);
      fireEvent.focus(sb());
      fireEvent.change(sb(), { target: { value: typed } });
      expect(sb()).toHaveValue(typed);
      expect(sb()).toHaveAttribute("aria-invalid", "true");
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.blur(sb());
      expect(onChange).not.toHaveBeenCalled();
      expect(sb()).toHaveValue("9");
      expect(sb()).not.toHaveAttribute("aria-invalid");
    },
  );

  it("incomplete prefixes while typing are not flagged invalid", () => {
    render(<NumberInput label="Qty" locale="en-US" />);
    fireEvent.focus(sb());
    for (const t of ["-", "1,", "(5", "12."]) {
      fireEvent.change(sb(), { target: { value: t } });
      expect(sb()).not.toHaveAttribute("aria-invalid");
    }
  });

  it("works controlled", () => {
    function Controlled() {
      const [v, setV] = useState<number | null>(2);
      return (
        <>
          <NumberInput label="Qty" value={v} onChange={setV} />
          <button type="button" onClick={() => setV(40)}>
            Reset
          </button>
        </>
      );
    }
    render(<Controlled />);
    fireEvent.focus(sb());
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(sb()).toHaveValue("3");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(sb()).toHaveValue("40");
  });
});

describe("NumberInput — keyboard", () => {
  it("ArrowUp/Down ±step, Shift ×10, PageUp/Down ×10, Home/End → min/max", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" defaultValue={50} min={0} max={200} step={2} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith(52);
    fireEvent.keyDown(sb(), { key: "ArrowDown" });
    expect(onChange).toHaveBeenLastCalledWith(50);
    fireEvent.keyDown(sb(), { key: "ArrowUp", shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith(70);
    fireEvent.keyDown(sb(), { key: "PageDown" });
    expect(onChange).toHaveBeenLastCalledWith(50);
    fireEvent.keyDown(sb(), { key: "PageUp" });
    expect(onChange).toHaveBeenLastCalledWith(70);
    fireEvent.keyDown(sb(), { key: "End" });
    expect(onChange).toHaveBeenLastCalledWith(200);
    expect(sb()).toHaveAttribute("aria-valuenow", "200");
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledTimes(6);
    fireEvent.keyDown(sb(), { key: "Home" });
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("steps from the text being typed, float-safe", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" step={0.1} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.change(sb(), { target: { value: "0.2" } });
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith(0.3);
    expect(sb()).toHaveValue("0.3");
  });

  it("Home / End without bounds are left to the caret", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" defaultValue={5} onChange={onChange} />);
    fireEvent.focus(sb());
    fireEvent.keyDown(sb(), { key: "Home" });
    fireEvent.keyDown(sb(), { key: "End" });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("readOnly and disabled block changes", () => {
    const onChange = vi.fn();
    const { rerender } = render(<NumberInput label="Qty" defaultValue={5} readOnly onChange={onChange} />);
    expect(sb()).toHaveAttribute("aria-readonly", "true");
    fireEvent.keyDown(sb(), { key: "ArrowUp" });
    expect(screen.getByRole("button", { name: "Increase", hidden: true })).toBeDisabled();
    rerender(<NumberInput label="Qty" defaultValue={5} disabled onChange={onChange} />);
    expect(sb()).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("NumberInput — steppers", () => {
  it("renders labelled − / + buttons outside the tab order", () => {
    render(<NumberInput label="Qty" />);
    const inc = screen.getByRole("button", { name: "Increase" });
    const dec = screen.getByRole("button", { name: "Decrease" });
    expect(inc).toHaveAttribute("tabindex", "-1");
    expect(dec).toHaveAttribute("aria-controls", sb().id);
  });

  it("pointer press steps once, keeps focus in the input; hold repeats; release stops", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<NumberInput label="Qty" defaultValue={0} onChange={onChange} />);
    const inc = screen.getByRole("button", { name: "Increase" });
    fireEvent.pointerDown(inc, { button: 0 });
    expect(onChange).toHaveBeenLastCalledWith(1);
    expect(document.activeElement).toBe(sb());
    act(() => {
      vi.advanceTimersByTime(NUMBER_INPUT_REPEAT_DELAY_MS + NUMBER_INPUT_REPEAT_INTERVAL_MS * 3);
    });
    expect(onChange).toHaveBeenLastCalledWith(4);
    fireEvent.pointerUp(inc);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange).toHaveBeenLastCalledWith(4);
    expect(sb()).toHaveValue("4");
  });

  it("repeat stops at the bound and the button disables without moving focus", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<NumberInput label="Qty" defaultValue={8} max={10} onChange={onChange} />);
    const inc = screen.getByRole("button", { name: "Increase" });
    fireEvent.pointerDown(inc, { button: 0 });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(inc).toBeDisabled();
    expect(document.activeElement).toBe(sb());
    fireEvent.pointerUp(window);
  });

  it("assistive-tech click (detail 0) steps once", () => {
    const onChange = vi.fn();
    render(<NumberInput label="Qty" defaultValue={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Decrease" }), { detail: 0 });
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("showSteppers={false} hides them", () => {
    render(<NumberInput label="Qty" showSteppers={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("NumberInput — errors and FormField", () => {
  it("error is linked; focus stays in the input when it appears and clears", () => {
    const { rerender } = render(<NumberInput label="Qty" />);
    act(() => sb().focus());
    rerender(<NumberInput label="Qty" error="Must be at least 1" />);
    expect(document.activeElement).toBe(sb());
    expect(sb()).toHaveAttribute("aria-invalid", "true");
    const msg = screen.getByText("Must be at least 1");
    expect(sb()).toHaveAttribute("aria-describedby", msg.id);
    expect(msg).toHaveAttribute("role", "alert");
    rerender(<NumberInput label="Qty" />);
    expect(document.activeElement).toBe(sb());
    expect(sb()).not.toHaveAttribute("aria-invalid");
  });

  it("an error present on first render is not announced", () => {
    render(<NumberInput label="Qty" error="Required" />);
    expect(screen.getByText("Required")).not.toHaveAttribute("role");
  });

  it("wires id, label, description, invalid and required from FormField", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <FormField label="Seats" hint="1 to 50" error="Too many" required>
        <NumberInput min={1} max={50} />
      </FormField>,
    );
    const input = screen.getByRole("spinbutton", { name: /^Seats/ });
    const label = screen.getByText("Seats").closest("label")!;
    expect(label).toHaveAttribute("for", input.id);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    const ids = input.getAttribute("aria-describedby")!.split(" ");
    expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(["1 to 50", "Too many"]);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("explicit props win inside FormField", () => {
    render(
      <FormField label="Seats" hint="Hint">
        <NumberInput id="seats" aria-describedby="mine" aria-invalid={false} />
      </FormField>,
    );
    expect(sb()).toHaveAttribute("id", "seats");
    expect(sb()).toHaveAttribute("aria-describedby", "mine");
    expect(sb()).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByText("Seats").closest("label")).toHaveAttribute("for", "seats");
  });
});
