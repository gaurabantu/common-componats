import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./index";
import FormField from "../../molecules/FormField";
import { selectHeightTokens, selectStatusTokens } from "./Select.config";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

describe("Select", () => {
  it("renders with options", () => {
    render(<Select options={options} value="1" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("calls onChange when selection changes", async () => {
    const handleChange = vi.fn();
    render(<Select options={options} value="1" onChange={handleChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(handleChange).toHaveBeenCalled();
  });

  it("keeps focus after change and returns the animated chevron to rest (no blur)", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    const el = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(el, "1");
    expect(el).toHaveFocus();
    expect(el.parentElement).not.toHaveAttribute("data-open");
  });

  it("renders optgroups when groups are provided", () => {
    render(
      <Select
        groups={[
          { label: "Group A", options: [{ label: "One", value: "1" }] },
          { label: "Group B", options: [{ label: "Two", value: "2" }] },
        ]}
        value="2"
        onChange={() => {}}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Two" })).toBeInTheDocument();
  });

  describe("focus retention after change", () => {
    const modes: Array<[string, Partial<React.ComponentProps<typeof Select>>]> = [
      ["animated chevron (default)", {}],
      ["animatedChevron={false}", { animatedChevron: false }],
      ["grouped options", { groups: [{ label: "G", options }] }],
      ["size sm", { size: "sm" }],
      ["size lg", { size: "lg" }],
    ];

    it.each(modes)("mouse: %s keeps focus on the control (controlled)", async (_name, extra) => {
      const Controlled = () => {
        const [v, setV] = React.useState("");
        return <Select label="Pick" options={options} {...extra} value={v} onValueChange={setV} />;
      };
      render(<Controlled />);
      const el = screen.getByRole("combobox", { name: "Pick" });
      await userEvent.selectOptions(el, "2");
      expect(el).toHaveValue("2");
      expect(el).toHaveFocus();
    });

    it.each(modes)("keyboard: %s keeps focus (uncontrolled, ArrowDown)", async (_name, extra) => {
      const onValueChange = vi.fn();
      render(<Select label="Pick" options={options} {...extra} defaultValue="1" onValueChange={onValueChange} />);
      await userEvent.tab();
      const el = screen.getByRole("combobox", { name: "Pick" });
      expect(el).toHaveFocus();
      fireEvent.keyDown(el, { key: "ArrowDown" });
      fireEvent.change(el, { target: { value: "2" } });
      expect(onValueChange).toHaveBeenCalledWith("2", options[1]);
      expect(el).toHaveFocus();
    });

    it("keeps focus inside a FormField", async () => {
      render(
        <FormField label="Plan">
          <Select options={options} defaultValue="" />
        </FormField>,
      );
      const el = screen.getByRole("combobox", { name: "Plan" });
      await userEvent.selectOptions(el, "1");
      expect(el).toHaveFocus();
    });
  });

  describe("animated chevron picker state", () => {
    it("opens on mouse down and closes on change", () => {
      render(<Select options={options} defaultValue="" />);
      const el = screen.getByRole("combobox");
      fireEvent.mouseDown(el, { button: 0 });
      expect(el.parentElement).toHaveAttribute("data-open", "true");
      fireEvent.change(el, { target: { value: "1" } });
      expect(el.parentElement).not.toHaveAttribute("data-open");
    });

    it("opens on Space / F4 / Alt+ArrowDown, closes on Escape, Tab and blur", () => {
      render(<Select options={options} defaultValue="" />);
      const el = screen.getByRole("combobox");
      const shell = el.parentElement!;
      fireEvent.keyDown(el, { key: " " });
      expect(shell).toHaveAttribute("data-open", "true");
      fireEvent.keyDown(el, { key: "Escape" });
      expect(shell).not.toHaveAttribute("data-open");
      fireEvent.keyDown(el, { key: "F4" });
      expect(shell).toHaveAttribute("data-open", "true");
      fireEvent.keyDown(el, { key: "Tab" });
      expect(shell).not.toHaveAttribute("data-open");
      fireEvent.keyDown(el, { key: "ArrowDown", altKey: true });
      expect(shell).toHaveAttribute("data-open", "true");
      fireEvent.blur(el);
      expect(shell).not.toHaveAttribute("data-open");
    });

    it("never sets data-open without the animated chevron, and composes consumer handlers", () => {
      const onMouseDown = vi.fn();
      const onKeyDown = vi.fn();
      const onBlur = vi.fn();
      render(
        <Select
          options={options}
          animatedChevron={false}
          onMouseDown={onMouseDown}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />,
      );
      const el = screen.getByRole("combobox");
      fireEvent.mouseDown(el, { button: 0 });
      fireEvent.keyDown(el, { key: " " });
      fireEvent.blur(el);
      expect(el.parentElement).not.toHaveAttribute("data-open");
      expect(el.parentElement).not.toHaveClass("ucs-select-shell--chevron-animated");
      expect(onMouseDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("heights", () => {
    it.each(["sm", "md", "lg"] as const)("size %s exposes data-size and the Input height token", (size) => {
      render(<Select options={options} size={size} />);
      const el = screen.getByRole("combobox");
      expect(el).toHaveAttribute("data-size", size);
      expect(el).toHaveClass("ds-select");
      expect(el.style.minHeight).toBe(selectHeightTokens[size]);
    });

    it("uses the same tiers as Input (sm/md button-height tokens, lg 3rem)", () => {
      expect(selectHeightTokens).toEqual({
        sm: "var(--button-height-sm)",
        md: "var(--button-height-lg)",
        lg: "3rem",
      });
    });

    it("defaults to md and keeps consumer className and merges style", () => {
      render(<Select options={options} className="extra" style={{ maxWidth: 200 }} />);
      // consumer style used to replace every built-in style; it now merges over them
      const el = screen.getByRole("combobox");
      expect(el).toHaveAttribute("data-size", "md");
      expect(el).toHaveClass("ds-select", "extra");
      expect(el.style.maxWidth).toBe("200px");
      expect(el.style.minHeight).toBe("var(--button-height-lg)");
    });
  });

  describe("form completeness", () => {
    it("submits name/value through a native form and honours required", () => {
      render(
        <form data-testid="f">
          <Select name="plan" label="Plan" required options={options} defaultValue="2" />
        </form>,
      );
      const el = screen.getByRole("combobox", { name: "Plan" }) as HTMLSelectElement;
      expect(el).toBeRequired();
      expect(el).toHaveAttribute("name", "plan");
      const data = new FormData(screen.getByTestId("f") as HTMLFormElement);
      expect(data.get("plan")).toBe("2");
    });

    it("required with an empty placeholder value is invalid for constraint validation", () => {
      render(<Select name="plan" required options={options} defaultValue="" />);
      const el = screen.getByRole("combobox") as HTMLSelectElement;
      expect(el.checkValidity()).toBe(false);
      fireEvent.change(el, { target: { value: "1" } });
      expect(el.checkValidity()).toBe(true);
    });

    it("shows a visible, aria-hidden required marker on its own label", () => {
      const { container } = render(<Select label="Plan" required options={options} />);
      const marker = container.querySelector(".ds-select__required");
      expect(marker).toHaveTextContent("*");
      expect(marker).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("combobox", { name: "Plan" })).toBeInTheDocument();
    });

    it("passes id, aria-describedby and aria-invalid through", () => {
      render(
        <>
          <p id="ext">External help</p>
          <Select id="my-select" aria-describedby="ext" aria-invalid options={options} />
        </>,
      );
      const el = screen.getByRole("combobox");
      expect(el).toHaveAttribute("id", "my-select");
      expect(el).toHaveAttribute("aria-describedby", "ext");
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAccessibleDescription("External help");
    });
  });

  describe("status / error", () => {
    it("error string sets aria-invalid and links the message via aria-describedby", () => {
      render(<Select label="Plan" options={options} error="Pick a plan" helperText="ignored while error" />);
      const el = screen.getByRole("combobox", { name: "Plan" });
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAccessibleDescription("Pick a plan");
      expect(screen.queryByText("ignored while error")).not.toBeInTheDocument();
    });

    it("error wins over a non-error status", () => {
      render(<Select options={options} status="warning" error="Bad" />);
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("Bad")).toHaveAttribute("data-status", "error");
    });

    it("helperText is linked as the description and is not invalid", () => {
      render(<Select label="Plan" options={options} helperText="Billed monthly" />);
      const el = screen.getByRole("combobox", { name: "Plan" });
      expect(el).toHaveAttribute("aria-invalid", "false");
      expect(el).toHaveAccessibleDescription("Billed monthly");
    });

    it("status=error without a message is still aria-invalid", () => {
      render(<Select options={options} status="error" />);
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    });

    it("announces an error only when it appears after the first render", () => {
      const { rerender } = render(<Select options={options} error="Initial" />);
      expect(screen.getByText("Initial")).not.toHaveAttribute("role");
      rerender(<Select options={options} error="Now wrong" />);
      expect(screen.getByText("Now wrong")).toHaveAttribute("role", "alert");
    });
  });

  describe("status tokens (contrast)", () => {
    it.each([
      ["error", "var(--color-danger-strong)"],
      ["warning", "var(--color-warning-strong)"],
      ["success", "var(--color-success-strong)"],
    ] as const)("status=%s uses %s for border and message (data-status hook)", (status, token) => {
      render(<Select options={options} status={status} helperText="Message" />);
      const el = screen.getByRole("combobox");
      const msg = screen.getByText("Message");
      expect(selectStatusTokens[status]).toBe(token);
      expect(el).toHaveAttribute("data-status", status);
      expect(el.style.border).toContain(token);
      expect(msg).toHaveAttribute("data-status", status);
      expect(msg.style.color).toBe(token);
      expect(el.getAttribute("style")).not.toMatch(/--color-state-/);
      expect(msg.getAttribute("style")).not.toMatch(/--color-state-/);
    });

    it("no status: default border, secondary message, no data-status", () => {
      render(<Select options={options} helperText="Hint" />);
      const el = screen.getByRole("combobox");
      expect(el).not.toHaveAttribute("data-status");
      expect(el.style.border).toContain("var(--color-border-default)");
      expect(screen.getByText("Hint").style.color).toBe("var(--color-text-secondary)");
    });

    it("explicit aria-invalid uses the danger border even with status=warning", () => {
      render(<Select options={options} status="warning" aria-invalid="true" />);
      const el = screen.getByRole("combobox");
      expect(el).toHaveAttribute("data-status", "error");
      expect(el.style.border).toContain("var(--color-danger-strong)");
    });

    it("static chevron is a themed CSS glyph, not a hard-coded inline background image", () => {
      render(<Select options={options} animatedChevron={false} />);
      const el = screen.getByRole("combobox");
      expect(el.style.backgroundImage).toBe("");
      expect(el.parentElement).toHaveClass("ucs-select-shell", "ds-select-shell--chevron-static");
    });
  });

  describe("FormField integration", () => {
    it("shows the invalid styling (data-invalid + danger border) for a FormField error", () => {
      render(
        <FormField label="Region" error="Region is required">
          <Select options={options} />
        </FormField>,
      );
      const el = screen.getByRole("combobox", { name: "Region" });
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAttribute("data-invalid", "true");
      expect(el.style.border).toContain("var(--color-danger-strong)");
    });

    it("own error uses --color-danger-strong for border and message; valid Select has no data-invalid", () => {
      const { rerender } = render(<Select options={options} error="Bad" />);
      const el = screen.getByRole("combobox");
      expect(el).toHaveAttribute("data-invalid", "true");
      expect(el.style.border).toContain("var(--color-danger-strong)");
      expect(screen.getByText("Bad").style.color).toBe("var(--color-danger-strong)");
      rerender(<Select options={options} />);
      expect(el).not.toHaveAttribute("data-invalid");
      expect(el.style.border).toContain("var(--color-border-default)");
    });

    it("takes id, label, hint, error and required from the field", () => {
      render(
        <FormField label="Region" hint="Where you are" error="Region is required" required>
          <Select options={options} defaultValue="" />
        </FormField>,
      );
      const el = screen.getByRole("combobox", { name: /Region/ });
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAttribute("aria-required", "true");
      expect(el).toHaveAccessibleDescription("Where you are Region is required");
      // Field `required` maps to aria-required only (as FormField's cloneElement injection did), not native validation.
      expect(el).not.toHaveAttribute("required");
      expect(document.querySelector("label.ds-form-field__label")).toHaveAttribute("for", el.id);
    });

    it("explicit props win over the field", () => {
      render(
        <>
          <p id="mine">Mine</p>
          <FormField label="Region" hint="Field hint" error="Field error">
            <Select id="explicit" aria-describedby="mine" aria-invalid={false} options={options} />
          </FormField>
        </>,
      );
      const el = screen.getByRole("combobox", { name: "Region" });
      expect(el).toHaveAttribute("id", "explicit");
      expect(el).toHaveAttribute("aria-describedby", "mine");
      expect(el).toHaveAttribute("aria-invalid", "false");
    });

    it("appends its own error message after the field description", () => {
      render(
        <FormField label="Region" hint="Field hint">
          <Select options={options} error="Own error" />
        </FormField>,
      );
      expect(screen.getByRole("combobox", { name: "Region" })).toHaveAccessibleDescription("Field hint Own error");
    });

    it("does not warn about an unlabelled control", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <FormField label="Region">
          <Select options={options} />
        </FormField>,
      );
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });
});
