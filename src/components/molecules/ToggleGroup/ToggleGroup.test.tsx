import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleGroup from "./index";
import ToggleButton from "../../atoms/ToggleButton";

describe("ToggleGroup", () => {
  it("multiple: presses several items via children", async () => {
    const fn = vi.fn();
    render(
      <ToggleGroup type="multiple" ariaLabel="Formatting" onValueChange={fn}>
        <ToggleButton value="bold" ariaLabel="Bold" icon="B" />
        <ToggleButton value="italic" ariaLabel="Italic" icon="I" />
      </ToggleGroup>,
    );
    expect(screen.getByRole("group", { name: "Formatting" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    await userEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(fn).toHaveBeenLastCalledWith(["bold", "italic"]);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(fn).toHaveBeenLastCalledWith(["italic"]);
  });

  it("single: one item at a time, deselect allowed by default", async () => {
    const fn = vi.fn();
    render(
      <ToggleGroup
        type="single"
        ariaLabel="Alignment"
        defaultValue="left"
        onValueChange={fn}
        items={[
          { value: "left", ariaLabel: "Align left", icon: "L" },
          { value: "center", ariaLabel: "Align centre", icon: "C" },
          { value: "right", ariaLabel: "Align right", icon: "R" },
        ]}
      />,
    );
    expect(screen.getByRole("button", { name: "Align left" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Align right" }));
    expect(fn).toHaveBeenLastCalledWith("right");
    expect(screen.getByRole("button", { name: "Align left" })).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(screen.getByRole("button", { name: "Align right" }));
    expect(fn).toHaveBeenLastCalledWith(null);
  });

  it("single with allowDeselect=false keeps the value", async () => {
    const fn = vi.fn();
    render(
      <ToggleGroup type="single" value="a" allowDeselect={false} onValueChange={fn} items={[{ value: "a", label: "A" }]} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "A" }));
    expect(fn).not.toHaveBeenCalled();
  });

  it("roving tabindex: one Tab stop, arrows/Home/End move focus", async () => {
    render(
      <ToggleGroup
        type="multiple"
        ariaLabel="Fmt"
        items={[
          { value: "b", label: "B" },
          { value: "i", label: "I" },
          { value: "u", label: "U" },
        ]}
      />,
    );
    const [b, i, u] = ["B", "I", "U"].map((n) => screen.getByRole("button", { name: n }));
    expect(b).toHaveAttribute("tabindex", "0");
    expect(i).toHaveAttribute("tabindex", "-1");
    await userEvent.tab();
    expect(b).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(i).toHaveFocus();
    expect(i).toHaveAttribute("tabindex", "0");
    await userEvent.keyboard("{End}");
    expect(u).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(b).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(u).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(b).toHaveFocus();
  });

  it("propagates size and disabled to items", () => {
    render(<ToggleGroup type="multiple" size="lg" disabled items={[{ value: "x", label: "X" }]} />);
    const btn = screen.getByRole("button", { name: "X" });
    expect(btn).toBeDisabled();
    expect(btn.className).toContain("btn-size-lg");
  });
});
