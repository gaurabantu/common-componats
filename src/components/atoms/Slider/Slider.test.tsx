import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "./index";

describe("Slider", () => {
  it("renders a native range slider with min/max/step and ariaLabel", () => {
    render(<Slider ariaLabel="Priority" min={1} max={10} step={1} defaultValue={4} />);
    const s = screen.getByRole("slider", { name: "Priority" });
    expect(s).toHaveAttribute("min", "1");
    expect(s).toHaveAttribute("max", "10");
    expect(s).toHaveValue("4");
  });

  it("calls onValueChange and onChange alias with numbers", () => {
    const a = vi.fn();
    const b = vi.fn();
    render(<Slider ariaLabel="P" onValueChange={a} onChange={b} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "42" } });
    expect(a).toHaveBeenCalledWith(42);
    expect(b).toHaveBeenCalledWith(42);
  });

  it("controlled value is respected", () => {
    const { rerender } = render(<Slider ariaLabel="P" value={10} />);
    expect(screen.getByRole("slider")).toHaveValue("10");
    rerender(<Slider ariaLabel="P" value={70} />);
    expect(screen.getByRole("slider")).toHaveValue("70");
  });

  it("visible label + showValue with valueFormatter (and aria-valuetext)", () => {
    render(<Slider label="Opacity" showValue valueFormatter={(v) => `${v}%`} defaultValue={30} />);
    const s = screen.getByRole("slider", { name: "Opacity" });
    expect(s).toHaveAttribute("aria-valuetext", "30%");
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("keyboard commit fires onValueCommit", () => {
    const commit = vi.fn();
    render(<Slider ariaLabel="P" defaultValue={5} onValueCommit={commit} />);
    const s = screen.getByRole("slider");
    fireEvent.change(s, { target: { value: "6" } });
    fireEvent.keyUp(s, { key: "ArrowRight" });
    expect(commit).toHaveBeenCalledWith(6);
  });

  it("range: two thumbs that cannot cross", () => {
    const fn = vi.fn();
    render(<Slider range ariaLabel="Amount" defaultValue={[20, 60]} onValueChange={fn} showMinMax />);
    const lo = screen.getByRole("slider", { name: "Amount minimum" });
    const hi = screen.getByRole("slider", { name: "Amount maximum" });
    expect(lo).toHaveValue("20");
    expect(hi).toHaveValue("60");
    fireEvent.change(lo, { target: { value: "80" } });
    expect(fn).toHaveBeenLastCalledWith([60, 60]);
    fireEvent.change(hi, { target: { value: "90" } });
    expect(fn).toHaveBeenLastCalledWith([60, 90]);
    expect(screen.getByRole("group", { name: "Amount" })).toBeInTheDocument();
  });

  it("range with visible label names each thumb", () => {
    render(<Slider range label="Price" defaultValue={[1, 5]} max={10} />);
    expect(screen.getByRole("slider", { name: "Price Minimum" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Price Maximum" })).toBeInTheDocument();
  });

  it("disabled", () => {
    render(<Slider ariaLabel="P" disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });
});
