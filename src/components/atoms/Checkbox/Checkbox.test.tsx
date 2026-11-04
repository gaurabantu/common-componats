import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./index";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox name="test" value="1" label="Accept terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(<Checkbox name="test" value="1" label="Check" onChange={handleChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("respects checked state", () => {
    render(<Checkbox name="test" value="1" label="Check" checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Checkbox name="test" value="1" label="Check" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});

describe("Checkbox — upgrade (indeterminate, description, size, error, required, id, ref)", () => {
  it("keeps the label association and accessible name from the visible label", () => {
    render(<Checkbox name="n" value="v" label="Email me" />);
    expect(screen.getByRole("checkbox", { name: "Email me" })).toBeInTheDocument();
  });

  it("uses ariaLabel when the visible label is empty", () => {
    render(<Checkbox name="row" value="1" label="" ariaLabel="Select row 1" />);
    expect(screen.getByRole("checkbox", { name: "Select row 1" })).toBeInTheDocument();
  });

  it("generates a unique id when none is passed", () => {
    render(
      <>
        <Checkbox name="same" value="x" label="One" />
        <Checkbox name="same" value="x" label="Two" />
      </>,
    );
    const [a, b] = screen.getAllByRole("checkbox");
    expect(a.id).toBeTruthy();
    expect(b.id).toBeTruthy();
    expect(a.id).not.toBe(b.id);
  });

  it("uses the provided id", () => {
    render(<Checkbox id="terms" name="n" value="v" label="Terms" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "terms");
    expect(screen.getByText("Terms").closest("label")).toHaveAttribute("for", "terms");
  });

  it("forwards the ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} name="n" value="v" label="Ref" />);
    expect(ref.current).toBe(screen.getByRole("checkbox"));
    expect(ref.current?.type).toBe("checkbox");
  });

  it("sets the native DOM indeterminate property (no explicit aria-checked)", () => {
    const { rerender } = render(<Checkbox name="all" value="all" label="Select all" indeterminate />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input).not.toHaveAttribute("aria-checked");
    expect(input).toBePartiallyChecked();
    rerender(<Checkbox name="all" value="all" label="Select all" indeterminate={false} checked />);
    expect(input.indeterminate).toBe(false);
    expect(input).not.toHaveAttribute("aria-checked");
    expect(input).toBeChecked();
  });

  it("re-applies indeterminate after a user click while the prop stays true", async () => {
    const Harness = () => {
      const [, force] = React.useState(0);
      return <Checkbox name="a" value="a" label="Mixed" indeterminate onChange={() => force((n) => n + 1)} />;
    };
    render(<Harness />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    await userEvent.click(input);
    expect(input.indeterminate).toBe(true);
  });

  it("renders the dash glyph for indeterminate", () => {
    const { container } = render(<Checkbox name="a" value="a" label="Mixed" indeterminate />);
    expect(container.querySelector(".ucs-cc-checkbox-dash")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-indeterminate", "true");
  });

  it("links the description with aria-describedby", () => {
    render(<Checkbox name="n" value="v" label="Newsletter" description="One email per week." />);
    const input = screen.getByRole("checkbox", { name: "Newsletter" });
    expect(input).toHaveAccessibleDescription("One email per week.");
  });

  it("renders an error with aria-invalid, aria-describedby and alert role", () => {
    render(
      <Checkbox
        name="n"
        value="v"
        label="Accept terms"
        description="Read them first."
        error="You must accept the terms."
      />,
    );
    const input = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Read them first. You must accept the terms.");
    expect(screen.getByRole("alert")).toHaveTextContent("You must accept the terms.");
  });

  it("does not set aria-invalid without an error", () => {
    render(<Checkbox name="n" value="v" label="Fine" />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("required sets native required and a visible, aria-hidden asterisk", () => {
    render(<Checkbox name="n" value="v" label="Consent" required />);
    const input = screen.getByRole("checkbox", { name: "Consent" });
    expect(input).toBeRequired();
    const star = screen.getByText("*");
    expect(star).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["sm", "md", "lg"] as const)("reflects size %s on the root", (size) => {
    render(<Checkbox name="n" value="v" label="Sized" size={size} />);
    expect(screen.getByText("Sized").closest("label")).toHaveAttribute("data-size", size);
  });

  it("defaults size to md", () => {
    render(<Checkbox name="n" value="v" label="Default" />);
    expect(screen.getByText("Default").closest("label")).toHaveAttribute("data-size", "md");
  });

  it("keeps deprecated class props working", () => {
    const { container } = render(
      <Checkbox
        name="n"
        value="v"
        label="Legacy"
        checkboxColorClass="legacy-face"
        labelColorClass="legacy-label"
        inputLabelSpacingClass="legacy-gap"
        className="legacy-root"
      />,
    );
    expect(container.querySelector(".ucs-cc-checkbox-face")).toHaveClass("legacy-face", "legacy-gap");
    expect(screen.getByText("Legacy")).toHaveClass("legacy-label");
    expect(container.querySelector("label")).toHaveClass("legacy-root");
  });

  it("keeps the same focused input when an error appears and clears", async () => {
    const props = { name: "n", value: "v", label: "Accept", onChange: () => {} };
    const { rerender } = render(<Checkbox {...props} />);
    const input = screen.getByRole("checkbox");
    await userEvent.tab();
    expect(document.activeElement).toBe(input);
    rerender(<Checkbox {...props} error="Required" />);
    expect(screen.getByRole("checkbox")).toBe(input);
    expect(document.activeElement).toBe(input);
    rerender(<Checkbox {...props} />);
    expect(screen.getByRole("checkbox")).toBe(input);
    expect(document.activeElement).toBe(input);
  });

  it("toggles with the keyboard (Space)", async () => {
    const handleChange = vi.fn();
    render(<Checkbox name="n" value="v" label="Keyboard" onChange={handleChange} />);
    await userEvent.tab();
    expect(screen.getByRole("checkbox")).toHaveFocus();
    await userEvent.keyboard(" ");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe("Checkbox — 0.0.4 (node label, hideLabel, native passthrough)", () => {
  it("accepts a ReactNode label as the accessible name", () => {
    render(
      <Checkbox
        name="n"
        value="v"
        label={
          <>
            Accept <strong>terms</strong>
          </>
        }
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("hideLabel keeps the accessible name but marks the label visually hidden", () => {
    const { container } = render(<Checkbox label="Select row 1" hideLabel />);
    expect(screen.getByRole("checkbox", { name: "Select row 1" })).toBeInTheDocument();
    expect(container.querySelector("label")).toHaveAttribute("data-hide-label", "true");
    expect(screen.getByText("Select row 1")).toHaveClass("sr-only");
  });

  it("works without label, name or value when ariaLabel is given", () => {
    render(<Checkbox ariaLabel="Select all" />);
    expect(screen.getByRole("checkbox", { name: "Select all" })).not.toHaveAttribute("name");
  });

  it("forwards data-*, aria-* and native props to the input", async () => {
    const onBlur = vi.fn();
    const onChange = vi.fn();
    render(
      <Checkbox
        label="Row"
        data-testid="row-cb"
        aria-controls="panel-1"
        form="f1"
        tabIndex={-1}
        onBlur={onBlur}
        onChange={onChange}
        checked
      />,
    );
    const input = screen.getByTestId("row-cb");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("aria-controls", "panel-1");
    expect(input).toHaveAttribute("form", "f1");
    expect(input).toHaveAttribute("tabindex", "-1");
    await userEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("native aria-label works like ariaLabel and aria-describedby is merged", () => {
    render(<Checkbox aria-label="Pick me" aria-describedby="ext" description="More" />);
    const input = screen.getByRole("checkbox", { name: "Pick me" });
    expect(input.getAttribute("aria-describedby")?.split(" ")[0]).toBe("ext");
  });
});
