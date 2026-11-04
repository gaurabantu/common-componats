import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleButton from "./index";

describe("ToggleButton", () => {
  it("toggles aria-pressed (uncontrolled) and reports the next state", async () => {
    const fn = vi.fn();
    render(<ToggleButton onPressedChange={fn}>Bold</ToggleButton>);
    const btn = screen.getByRole("button", { name: "Bold" });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(fn).toHaveBeenCalledWith(true);
  });

  it("respects controlled pressed", async () => {
    const fn = vi.fn();
    render(
      <ToggleButton pressed onPressedChange={fn}>
        Italic
      </ToggleButton>,
    );
    const btn = screen.getByRole("button", { name: "Italic" });
    await userEvent.click(btn);
    expect(fn).toHaveBeenCalledWith(false);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("icon-only uses ariaLabel and icon-only size class", () => {
    render(<ToggleButton icon={<svg data-testid="ico" />} ariaLabel="Underline" size="md" />);
    const btn = screen.getByRole("button", { name: "Underline" });
    expect(btn.className).toContain("btn-icon-only-md");
    expect(screen.getByTestId("ico").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("with text uses the Button size class and variant", () => {
    render(
      <ToggleButton size="xs" variant="outline">
        Filter
      </ToggleButton>,
    );
    const btn = screen.getByRole("button", { name: "Filter" });
    expect(btn.className).toContain("btn-size-xs");
    expect(btn.className).toContain("ucs-toggle--outline");
  });

  it("keyboard Space / Enter toggles", async () => {
    render(<ToggleButton ariaLabel="Bold" icon="B" />);
    const btn = screen.getByRole("button", { name: "Bold" });
    btn.focus();
    await userEvent.keyboard(" ");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await userEvent.keyboard("{Enter}");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("disabled does not toggle", async () => {
    const fn = vi.fn();
    render(
      <ToggleButton disabled onPressedChange={fn}>
        X
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "X" }));
    expect(fn).not.toHaveBeenCalled();
  });
});
