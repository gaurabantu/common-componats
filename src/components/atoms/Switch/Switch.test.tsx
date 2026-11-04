import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "./index";

describe("Switch", () => {
  it("toggles with click", async () => {
    const fn = vi.fn();
    render(<Switch defaultChecked={false} onCheckedChange={fn} aria-label="Wi-Fi" />);
    await userEvent.click(screen.getByRole("switch", { name: /wi-fi/i }));
    expect(fn).toHaveBeenCalledWith(true);
  });

  it("respects controlled checked", () => {
    render(<Switch checked aria-label="On" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("is disabled", () => {
    render(<Switch disabled aria-label="Off" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("associates visible label", () => {
    render(<Switch label="Notifications" defaultChecked />);
    expect(screen.getByRole("switch", { name: /notifications/i })).toHaveAttribute("aria-checked", "true");
  });

  it("forwards ref and data-*/aria-* props to the switch button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch ref={ref} aria-label="Auto" data-testid="auto-switch" aria-describedby="hint" title="Auto" />);
    const el = screen.getByTestId("auto-switch");
    expect(ref.current).toBe(el);
    expect(el).toHaveAttribute("role", "switch");
    expect(el).toHaveAttribute("aria-describedby", "hint");
    expect(el).toHaveAttribute("title", "Auto");
  });

  it("hideLabel keeps the label as accessible name, visually hidden", () => {
    render(<Switch label="Dark mode" hideLabel />);
    expect(screen.getByRole("switch", { name: "Dark mode" })).toBeInTheDocument();
    expect(screen.getByText("Dark mode")).toHaveClass("ucs-switch__label--hidden");
  });

  it("accepts a ReactNode label", () => {
    render(<Switch label={<span>Enable <strong>sync</strong></span>} />);
    expect(screen.getByRole("switch", { name: "Enable sync" })).toBeInTheDocument();
  });

  it("calls a passed onClick and still toggles; preventDefault cancels the toggle", async () => {
    const onClick = vi.fn();
    const onChecked = vi.fn();
    const { rerender } = render(<Switch aria-label="X" onClick={onClick} onCheckedChange={onChecked} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onChecked).toHaveBeenLastCalledWith(true);
    onChecked.mockClear();
    rerender(<Switch aria-label="X" onClick={(e) => e.preventDefault()} onCheckedChange={onChecked} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChecked).not.toHaveBeenCalled();
  });
});
