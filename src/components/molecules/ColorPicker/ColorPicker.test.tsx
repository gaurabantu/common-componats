import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorPicker, { DEFAULT_COLOR_PICKER_PALETTE, normalizeHex } from "./index";
import { cssColorToHex } from "./colorUtils";

describe("normalizeHex / cssColorToHex", () => {
  it("normalises short / long / no-hash hex, rejects garbage", () => {
    expect(normalizeHex("#ABC")).toBe("#aabbcc");
    expect(normalizeHex("1A6BB5")).toBe("#1a6bb5");
    expect(normalizeHex(" #1a6bb5 ")).toBe("#1a6bb5");
    expect(normalizeHex("red")).toBeNull();
    expect(normalizeHex("#12345")).toBeNull();
  });
  it("converts rgb()", () => {
    expect(cssColorToHex("rgb(40, 167, 69)")).toBe("#28a745");
  });
});

describe("ColorPicker", () => {
  it("renders the default token palette as a radiogroup", () => {
    render(<ColorPicker ariaLabel="Series colour" />);
    expect(screen.getByRole("radiogroup", { name: "Series colour" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(DEFAULT_COLOR_PICKER_PALETTE.length);
  });

  it("clicking a swatch emits a hex string and checks it", async () => {
    const fn = vi.fn();
    render(<ColorPicker palette={["#FF0000", { value: "#00f", label: "Blue" }]} onChange={fn} />);
    await userEvent.click(screen.getByRole("radio", { name: "Blue" }));
    expect(fn).toHaveBeenCalledWith("#0000ff");
    expect(screen.getByRole("radio", { name: "Blue" })).toHaveAttribute("aria-checked", "true");
  });

  it("controlled value matches swatch case-insensitively", () => {
    render(<ColorPicker palette={["#ff0000", "#00ff00"]} value="#00FF00" />);
    expect(screen.getByRole("radio", { name: "#00ff00" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "#00ff00" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("radio", { name: "#ff0000" })).toHaveAttribute("tabindex", "-1");
  });

  it("arrow keys move focus and selection (grid aware)", async () => {
    const fn = vi.fn();
    render(<ColorPicker palette={["#000000", "#111111", "#222222", "#333333"]} columns={2} onValueChange={fn} />);
    const radios = screen.getAllByRole("radio");
    act(() => radios[0].focus());
    await userEvent.keyboard("{ArrowRight}");
    expect(radios[1]).toHaveFocus();
    expect(fn).toHaveBeenLastCalledWith("#111111");
    await userEvent.keyboard("{ArrowDown}");
    expect(radios[3]).toHaveFocus();
    expect(fn).toHaveBeenLastCalledWith("#333333");
    await userEvent.keyboard("{Home}");
    expect(radios[0]).toHaveFocus();
  });

  it("hex input commits valid hex on Enter, flags invalid", async () => {
    const fn = vi.fn();
    render(<ColorPicker palette={["#ffffff"]} onChange={fn} ariaLabel="Fill" />);
    const input = screen.getByRole("textbox", { name: "Fill hex value" });
    await userEvent.type(input, "abc{Enter}");
    expect(fn).toHaveBeenLastCalledWith("#aabbcc");
    await userEvent.clear(input);
    await userEvent.type(input, "zz{Enter}");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("emits live when a full 6-digit hex is typed", async () => {
    const fn = vi.fn();
    render(<ColorPicker palette={["#ffffff"]} onChange={fn} />);
    await userEvent.type(screen.getByRole("textbox"), "#1a6bb5");
    expect(fn).toHaveBeenLastCalledWith("#1a6bb5");
  });

  it("optional native picker emits hex", () => {
    const fn = vi.fn();
    render(<ColorPicker palette={["#ffffff"]} showNativePicker showHexInput={false} onChange={fn} ariaLabel="Border" />);
    const native = screen.getByLabelText("Border custom colour");
    fireEvent.change(native, { target: { value: "#123456" } });
    expect(fn).toHaveBeenCalledWith("#123456");
  });

  it("visible label names the radiogroup; name renders hidden input", () => {
    const { container } = render(<ColorPicker label="Background" name="bg" defaultValue="#FFF" palette={["#ffffff"]} />);
    expect(screen.getByRole("radiogroup", { name: "Background" })).toBeInTheDocument();
    expect(container.querySelector('input[type="hidden"][name="bg"]')).toHaveValue("#ffffff");
  });

  it("disabled disables swatches", () => {
    render(<ColorPicker palette={["#ffffff"]} disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });
});
