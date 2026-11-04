import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField, useFormField } from "./index";
import { Combobox } from "../Combobox";

function CustomControl() {
  const field = useFormField();
  return (
    <div
      role="slider"
      tabIndex={0}
      aria-valuenow={3}
      aria-valuemin={0}
      aria-valuemax={10}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-invalid={field?.invalid || undefined}
      data-testid="custom"
      data-field-id={field?.id}
    />
  );
}


describe("FormField — rendering", () => {
  it("labels the child control via an auto-generated id", () => {
    render(
      <FormField label="Email">
        <input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input.id).toMatch(/^form-field-/);
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("uses htmlFor as the control id when the child has none", () => {
    render(
      <FormField label="Name" htmlFor="name-x">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("id", "name-x");
  });

  it("keeps the child's own id and points the label at it", () => {
    render(
      <FormField label="City">
        <input id="city-own" />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "City" })).toHaveAttribute("id", "city-own");
  });

  it("renders the optional marker, and drops it when required", () => {
    const { rerender } = render(
      <FormField label="Nickname" optional>
        <input />
      </FormField>,
    );
    expect(screen.getByText("(optional)")).toBeInTheDocument();
    rerender(
      <FormField label="Nickname" optional="Not needed">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Not needed")).toBeInTheDocument();
    rerender(
      <FormField label="Nickname" optional required>
        <input />
      </FormField>,
    );
    expect(screen.queryByText("Not needed")).not.toBeInTheDocument();
  });

  it("sets data-layout for horizontal layout", () => {
    const { container } = render(
      <FormField label="Name" layout="horizontal">
        <input />
      </FormField>,
    );
    expect(container.firstElementChild).toHaveAttribute("data-layout", "horizontal");
  });

  it("forwards ref, className and native attributes", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FormField ref={ref} label="Name" className="extra" data-testid="ff">
        <input />
      </FormField>,
    );
    expect(ref.current).toBe(screen.getByTestId("ff"));
    expect(ref.current).toHaveClass("ds-form-field", "extra");
  });
});

describe("FormField — a11y wiring", () => {
  it("links hint and error via aria-describedby and sets aria-invalid", () => {
    render(
      <FormField label="Email" hint="We never share it." error="Enter a valid email">
        <input />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/We never share it\..*Enter a valid email/);
    const ids = input.getAttribute("aria-describedby")!.split(" ");
    expect(ids).toHaveLength(2);
    expect(ids[0]).toMatch(/-hint$/);
    expect(ids[1]).toMatch(/-error$/);
  });

  it("marks required visibly and for screen readers, and sets aria-required", () => {
    const { container } = render(
      <FormField label="Password" required>
        <input type="text" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /^Password\s*required$/ });
    expect(input).toHaveAttribute("aria-required", "true");
    expect(container.querySelector(".ds-form-field__required")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".ds-form-field__required")).toHaveTextContent("*");
  });

  it("does not override ARIA the child already sets", () => {
    render(
      <FormField label="Code" hint="Six digits" error="Wrong code" required>
        <input aria-describedby="custom-desc" aria-invalid={false} aria-required={false} />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /Code/ });
    expect(input).toHaveAttribute("aria-describedby", "custom-desc");
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).toHaveAttribute("aria-required", "false");
  });

  it("does not announce an error present on first render", () => {
    render(
      <FormField label="Email" error="Already taken">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Already taken")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("announces the error with role=alert when it appears after mount", () => {
    const { rerender } = render(
      <FormField label="Email">
        <input />
      </FormField>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    rerender(
      <FormField label="Email" error="Enter a valid email">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");
  });

  it("announces when an initial error changes", () => {
    const { rerender } = render(
      <FormField label="Email" error="Required">
        <input />
      </FormField>,
    );
    rerender(
      <FormField label="Email" error="Enter a valid email">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");
  });

  it("renders a counter linked to the control and flags over-limit", () => {
    const { rerender, container } = render(
      <FormField label="Bio" counter={{ value: 12, max: 20 }}>
        <textarea />
      </FormField>,
    );
    const ta = screen.getByRole("textbox", { name: "Bio" });
    expect(ta).toHaveAccessibleDescription("12 of 20");
    expect(container.querySelector(".ds-form-field__counter")).not.toHaveAttribute("data-over");
    rerender(
      <FormField label="Bio" counter={{ value: 25, max: 20 }}>
        <textarea />
      </FormField>,
    );
    expect(container.querySelector(".ds-form-field__counter")).toHaveAttribute("data-over", "true");
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent("Limit of 20 exceeded");
  });
});

describe("FormField — useFormField + interaction", () => {
  it("exposes ids to custom controls through context", () => {
    render(
      <FormField label="Volume" hint="0–10" error="Too loud">
        <CustomControl />
      </FormField>,
    );
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAccessibleDescription(/0–10.*Too loud/);
    expect(slider).toHaveAttribute("aria-invalid", "true");
  });

  it("returns null outside a FormField", () => {
    let value: unknown = "unset";
    function Probe() {
      value = useFormField();
      return null;
    }
    render(<Probe />);
    expect(value).toBeNull();
  });

  it("clicking the label focuses the control and typing reaches it", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FormField label="Search term">
        <input onChange={onChange} />
      </FormField>,
    );
    await user.click(screen.getByText("Search term"));
    const input = screen.getByRole("textbox", { name: "Search term" });
    expect(input).toHaveFocus();
    await user.keyboard("abc");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("renders non-element children untouched (and warns in dev that nothing is labelled)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<FormField label="Plain">just text</FormField>);
    expect(screen.getByText("just text")).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("[FormField] No labelable focusable element"));
    warn.mockRestore();
  });

  it("warns when the id lands on a non-labelable element", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <FormField label="Wrapped">
        <div />
      </FormField>,
    );
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it("does not warn for native controls or useFormField consumers", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <FormField label="A">
          <input />
        </FormField>
        <FormField label="B" hint="h">
          <CustomControl />
        </FormField>
      </>,
    );
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe("FormField + Combobox", () => {
  const options = [
    { value: "eu", label: "Europe" },
    { value: "us", label: "United States" },
  ];

  it("labels and describes the role=combobox element (not the wrapper)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <FormField label="Region" hint="Where your data is stored." error="Pick a region" required>
        <Combobox options={options} />
      </FormField>,
    );
    const combo = screen.getByRole("combobox", { name: /^Region\s*required$/ });
    expect(combo).toHaveAccessibleDescription(/Where your data is stored\..*Pick a region/);
    expect(combo).toHaveAttribute("aria-invalid", "true");
    expect(combo).toHaveAttribute("aria-required", "true");
    const label = container.querySelector("label")!;
    expect(document.getElementById(label.htmlFor)).toBe(combo);
    const wrapper = container.querySelector(".ds-combobox")!;
    expect(wrapper).not.toHaveAttribute("id");
    expect(wrapper).not.toHaveAttribute("aria-describedby");
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("keeps Combobox's explicit aria props winning", () => {
    render(
      <FormField label="Region" hint="Hint" error="Err" required>
        <Combobox options={options} aria-describedby="own-desc" aria-invalid={false} aria-required={false} />
      </FormField>,
    );
    const combo = screen.getByRole("combobox", { name: /Region/ });
    expect(combo).toHaveAttribute("aria-describedby", "own-desc");
    expect(combo).toHaveAttribute("aria-invalid", "false");
    expect(combo).toHaveAttribute("aria-required", "false");
  });

  it("still opens and selects inside a FormField", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Region">
        <Combobox options={options} onValueChange={onValueChange} />
      </FormField>,
    );
    await user.click(screen.getByRole("combobox", { name: "Region" }));
    await user.click(screen.getByRole("option", { name: "Europe" }));
    expect(onValueChange).toHaveBeenCalledWith("eu", options[0]);
  });
});

describe("FormField — 0.0.4 (group, hideLabel, composite htmlFor)", () => {
  it("group mode renders role=group labelled by the label and described by hint/error", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <FormField label="Amount range" group hint="Inclusive" error="Min must be below max">
        <div>
          <input aria-label="Minimum" />
          <input aria-label="Maximum" />
        </div>
      </FormField>,
    );
    const group = screen.getByRole("group", { name: "Amount range" });
    expect(group).toHaveAccessibleDescription("Inclusive Min must be below max");
    expect(screen.getByText("Amount range").tagName).toBe("SPAN");
    expect(screen.getByRole("textbox", { name: "Minimum" })).not.toHaveAttribute("id");
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("group mode does not inject id / aria into the child", () => {
    render(
      <FormField label="Status" group required>
        <div data-testid="chips" />
      </FormField>,
    );
    const chips = screen.getByTestId("chips");
    expect(chips).not.toHaveAttribute("id");
    expect(chips).not.toHaveAttribute("aria-required");
  });

  it("htmlFor points the label at an inner control of a composite wrapper (not the wrapper)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <FormField label="Application" htmlFor="app-input">
        <div data-testid="row">
          <input id="app-input" />
          <button type="button">Browse</button>
        </div>
      </FormField>,
    );
    expect(screen.getByTestId("row")).not.toHaveAttribute("id");
    expect(screen.getByRole("textbox", { name: "Application" })).toHaveAttribute("id", "app-input");
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("htmlFor on a labelable child still injects the id (unchanged)", () => {
    render(
      <FormField label="Name" htmlFor="nm">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("id", "nm");
  });

  it("hideLabel keeps the accessible name and flags the root", () => {
    const { container } = render(
      <FormField label="Search members" hideLabel layout="horizontal">
        <input />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "Search members" })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("data-hide-label", "true");
  });

  it("exposes group in useFormField()", () => {
    function Probe() {
      const f = useFormField();
      return <span data-testid="probe">{String(f?.group)}</span>;
    }
    render(
      <FormField label="G" group>
        <Probe />
      </FormField>,
    );
    expect(screen.getByTestId("probe")).toHaveTextContent("true");
  });
});
