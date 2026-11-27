import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DatePicker from "./index";
import { formatDateForDisplay, isValidDate, parseDate } from "./DatePicker.utils";

const day = (key: string) => document.querySelector(`[data-date="${key}"]`) as HTMLButtonElement;

describe("DatePicker — single: labelling & a11y", () => {
  it("is named by its visible label (aria-label must not override it)", () => {
    render(<DatePicker label="Due date" />);
    const input = screen.getByRole("textbox", { name: "Due date" });
    expect(input).not.toHaveAttribute("aria-label");
  });

  it("falls back to the placeholder as name when there is no label", () => {
    render(<DatePicker placeholder="Pick a day" />);
    expect(screen.getByRole("textbox", { name: "Pick a day" })).toBeInTheDocument();
  });

  it("links helper text with aria-describedby and marks required", () => {
    render(<DatePicker label="Start" helperText="Format DD-MM-YYYY" required />);
    const input = screen.getByRole("textbox", { name: "Start" });
    const helper = screen.getByText("Format DD-MM-YYYY");
    expect(input).toHaveAttribute("aria-describedby", helper.id);
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(helper).not.toHaveAttribute("role");
  });

  it("announces an error prop as an alert and sets aria-invalid", () => {
    render(<DatePicker label="Start" error="Date is in the past" />);
    const input = screen.getByRole("textbox", { name: "Start" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Date is in the past");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
  });

  it("calendar toggle exposes aria-haspopup / aria-expanded", () => {
    render(<DatePicker label="When" />);
    const toggle = screen.getByRole("button", { name: "Open calendar" });
    expect(toggle).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
  });

  it("disabled blocks opening", () => {
    render(<DatePicker label="When" disabled />);
    expect(screen.getByRole("textbox", { name: "When" })).toBeDisabled();
    const toggle = screen.getByRole("button", { name: "Open calendar" });
    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("DatePicker — single: interaction", () => {
  it("opens on focus and closes on Escape, returning focus to the toggle when it was inside", () => {
    render(<DatePicker label="When" value="15-03-2026" />);
    fireEvent.focus(screen.getByRole("textbox", { name: "When" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    day("2026-03-15").focus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open calendar" })).toHaveFocus();
  });

  it("closes on outside mousedown", () => {
    render(
      <div>
        <button type="button">elsewhere</button>
        <DatePicker label="When" />
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button", { name: "elsewhere" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("picking a day emits the formatted value, closes, and restores focus", () => {
    const onChange = vi.fn();
    render(<DatePicker label="When" value="15-03-2026" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    const target = day("2026-03-20");
    target.focus();
    fireEvent.click(target);
    expect(onChange).toHaveBeenCalledWith("20-03-2026");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open calendar" })).toHaveFocus();
  });

  it("typing a complete date emits onChange and onValidate(true)", () => {
    const onChange = vi.fn();
    const onValidate = vi.fn();
    render(<DatePicker label="When" onChange={onChange} onValidate={onValidate} />);
    fireEvent.change(screen.getByRole("textbox", { name: "When" }), { target: { value: "01-02-2026" } });
    expect(onChange).toHaveBeenCalledWith("01-02-2026");
    expect(onValidate).toHaveBeenLastCalledWith(true);
  });

  it("respects dateFormat for output", () => {
    const onChange = vi.fn();
    render(<DatePicker label="When" dateFormat="YYYY-MM-DD" value="2026-03-15" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    fireEvent.click(day("2026-03-16"));
    expect(onChange).toHaveBeenCalledWith("2026-03-16");
  });

  it("required + cleared input shows an alert", () => {
    const onValidate = vi.fn();
    render(<DatePicker label="When" required value="15-03-2026" onValidate={onValidate} />);
    const input = screen.getByRole("textbox", { name: "When" });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
    expect(onValidate).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole("alert")).toHaveTextContent("Date is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("validate() rejection reports invalid and does not emit", () => {
    const onChange = vi.fn();
    render(<DatePicker label="When" validate={() => false} onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox", { name: "When" }), { target: { value: "01-02-2026" } });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid date");
  });

  it("disables days outside minDate / maxDate", () => {
    render(<DatePicker label="When" value="15-03-2026" minDate="10-03-2026" maxDate="20-03-2026" />);
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(day("2026-03-09")).toBeDisabled();
    expect(day("2026-03-21")).toBeDisabled();
    expect(day("2026-03-12")).not.toBeDisabled();
  });
});

describe("DatePicker — range", () => {
  it("names both inputs from the label + placeholders", () => {
    render(<DatePicker range label="Stay" />);
    expect(screen.getByRole("textbox", { name: "Stay, Start date" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Stay, End date" })).toBeInTheDocument();
  });

  it("selecting start then end emits a joined range and closes", () => {
    const onChange = vi.fn();
    render(<DatePicker range label="Stay" value="10-03-2026 to 12-03-2026" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("dialog", { name: "Choose date range" })).toBeInTheDocument();
    // Two months are rendered; pick dates from the first.
    fireEvent.click(document.querySelectorAll('[data-date="2026-03-05"]')[0]);
    fireEvent.click(document.querySelectorAll('[data-date="2026-03-08"]')[0]);
    expect(onChange).toHaveBeenLastCalledWith("05-03-2026 to 08-03-2026");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses a custom rangeSeparator in output", () => {
    const onChange = vi.fn();
    render(<DatePicker range label="Stay" rangeSeparator="-" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Stay, Start date" }), {
      target: { value: "01-03-2026" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Stay, End date" }), {
      target: { value: "05-03-2026" },
    });
    expect(onChange).toHaveBeenLastCalledWith("01-03-2026 - 05-03-2026");
  });
});

describe("DatePicker.utils", () => {
  it("parseDate handles DD-MM-YYYY, MM/DD/YYYY and YYYY-MM-DD", () => {
    expect(parseDate("15-03-2026", "DD-MM-YYYY")?.getDate()).toBe(15);
    expect(parseDate("03/15/2026", "MM/DD/YYYY")?.getMonth()).toBe(2);
    const iso = parseDate("2026-03-15", "YYYY-MM-DD");
    expect(iso && [iso.getFullYear(), iso.getMonth(), iso.getDate()]).toEqual([2026, 2, 15]);
  });

  it("isValidDate rejects impossible dates", () => {
    expect(isValidDate("31-02-2026", "DD-MM-YYYY")).toBe(false);
    expect(isValidDate("29-02-2028", "DD-MM-YYYY")).toBe(true);
    expect(isValidDate("2026-13-01", "YYYY-MM-DD")).toBe(false);
  });

  it("formatDateForDisplay formats per pattern", () => {
    expect(formatDateForDisplay(new Date(2026, 2, 5), "DD-MM-YYYY")).toBe("05-03-2026");
  });
});

describe("DatePicker inside FormField", () => {
  it("is labelled by the FormField label and wired to its hint / error", async () => {
    const { FormField } = await import("../../molecules/FormField");
    render(
      <FormField label="Reporting period end" hint="A month-end" error="Required">
        <DatePicker dateFormat="YYYY-MM-DD" value="" onChange={() => {}} />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Reporting period end" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ").map((id) => document.getElementById(id)?.textContent).join(" ")).toContain("A month-end");
  });

  it("accepts id, name and ariaLabel when standalone", () => {
    render(<DatePicker id="d1" name="txn_date" ariaLabel="Transaction date" dateFormat="YYYY-MM-DD" value="2026-03-15" onChange={() => {}} />);
    const input = screen.getByRole("textbox", { name: "Transaction date" });
    expect(input).toHaveAttribute("id", "d1");
    expect(input).toHaveAttribute("name", "txn_date");
    expect(input).toHaveValue("2026-03-15");
  });
});

describe("DatePicker popover keyboard", () => {
  it("Escape closes only the calendar, not an enclosing Drawer", async () => {
    const { default: Drawer } = await import("../../molecules/Drawer");
    const onClose = vi.fn();
    render(
      <Drawer open onOpenChange={onClose} title="New transaction">
        <DatePicker label="Transaction date" dateFormat="YYYY-MM-DD" value="" onChange={() => {}} />
      </Drawer>,
    );
    const input = screen.getByRole("textbox", { name: "Transaction date" });
    fireEvent.focus(input);
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Choose date" })).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
    // A second Escape (calendar already closed) reaches the Drawer.
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it("Enter applies the typed date and closes the calendar", () => {
    const onChange = vi.fn();
    render(<DatePicker label="When" dateFormat="YYYY-MM-DD" value="" onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "When" });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "2026-03-15" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("2026-03-15");
    expect(screen.queryByRole("dialog", { name: "Choose date" })).not.toBeInTheDocument();
  });

  it("keeps focus in the input after Enter", () => {
    render(<DatePicker label="When" dateFormat="YYYY-MM-DD" value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox", { name: "When" });
    input.focus();
    fireEvent.change(input, { target: { value: "2026-03-15" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(document.activeElement).toBe(input);
  });
});
