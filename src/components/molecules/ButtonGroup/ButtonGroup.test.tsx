import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Button from "../../atoms/Button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  useButtonGroupContext,
} from "./index";

describe("ButtonGroup — structure & a11y", () => {
  it("renders role=group with the accessible name and default attributes", () => {
    render(
      <ButtonGroup aria-label="Document actions">
        <Button>Archive</Button>
        <Button>Report</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Document actions" });
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    expect(group).toHaveAttribute("data-attached", "true");
    expect(group).not.toHaveAttribute("aria-disabled");
    expect(group).not.toHaveAttribute("data-full-width");
    within(group)
      .getAllByRole("button")
      .forEach((b) => expect(b).toHaveClass("ds-button-group__segment"));
  });

  it("forwards ref to the group element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref} aria-label="x">
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(ref.current).toBe(screen.getByRole("group"));
  });

  it("supports vertical orientation and detached layout", () => {
    render(
      <ButtonGroup aria-label="v" orientation="vertical" attached={false}>
        <Button>A</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(group).toHaveAttribute("data-attached", "false");
  });

  it("marks fullWidth", () => {
    render(
      <ButtonGroup aria-label="w" fullWidth>
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("data-full-width", "true");
  });

  it("keeps buttons reachable in Tab order (native buttons)", () => {
    render(
      <ButtonGroup aria-label="t">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    const [one, two] = screen.getAllByRole("button");
    expect(one).not.toHaveAttribute("tabindex", "-1");
    expect(two).not.toHaveAttribute("tabindex", "-1");
    one.focus();
    expect(one).toHaveFocus();
  });
});

describe("ButtonGroup — cascade (child props win)", () => {
  it("cascades size and variant to Buttons that do not set them", () => {
    render(
      <ButtonGroup aria-label="c" size="sm" variant="outlinePrimary">
        <Button>Inherit</Button>
        <Button size="lg" variant="danger">
          Own
        </Button>
      </ButtonGroup>,
    );
    const inherit = screen.getByRole("button", { name: "Inherit" });
    expect(inherit).toHaveClass("btn-size-sm", "btn-outline-primary");
    const own = screen.getByRole("button", { name: "Own" });
    expect(own).toHaveClass("btn-size-lg", "btn-danger");
    expect(own).not.toHaveClass("btn-size-sm");
  });

  it("disabled cascades, blocks clicks and sets aria-disabled on the group", () => {
    const onClick = vi.fn();
    render(
      <ButtonGroup aria-label="d" disabled>
        <Button onClick={onClick}>A</Button>
        <Button disabled={false}>Opt-out</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
    const a = screen.getByRole("button", { name: "A" });
    expect(a).toBeDisabled();
    fireEvent.click(a);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Opt-out" })).not.toBeDisabled();
  });

  it("buttons stay clickable when the group is enabled", () => {
    const onClick = vi.fn();
    render(
      <ButtonGroup aria-label="e">
        <Button onClick={onClick}>Go</Button>
      </ButtonGroup>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("nested groups inherit size/variant/disabled from the parent", () => {
    render(
      <ButtonGroup aria-label="outer" size="xs" variant="secondary" disabled>
        <ButtonGroup aria-label="inner">
          <Button>Nested</Button>
        </ButtonGroup>
      </ButtonGroup>,
    );
    const nested = screen.getByRole("button", { name: "Nested" });
    expect(nested).toHaveClass("btn-size-xs", "btn-secondary");
    expect(nested).toBeDisabled();
  });

  it("exposes context to non-direct descendants via useButtonGroupContext", () => {
    function Probe() {
      const ctx = useButtonGroupContext();
      return <span data-testid="probe">{`${ctx?.size}|${ctx?.variant}|${String(ctx?.disabled)}`}</span>;
    }
    render(
      <ButtonGroup aria-label="p" size="md" variant="ghost">
        <div>
          <Probe />
        </div>
      </ButtonGroup>,
    );
    expect(screen.getByTestId("probe")).toHaveTextContent("md|ghost|false");
  });

  it("useButtonGroupContext returns null outside a group", () => {
    function Probe() {
      return <span data-testid="probe">{useButtonGroupContext() === null ? "none" : "some"}</span>;
    }
    render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveTextContent("none");
  });
});

describe("ButtonGroupSeparator / ButtonGroupText", () => {
  it("separator defaults to the perpendicular orientation", () => {
    render(
      <ButtonGroup aria-label="s">
        <Button>A</Button>
        <ButtonGroupSeparator />
        <Button>B</Button>
      </ButtonGroup>,
    );
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("separator throws outside a ButtonGroup", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ButtonGroupSeparator />)).toThrow(/within <ButtonGroup>/);
    err.mockRestore();
  });

  it("text renders a span or merges into its child with asChild", () => {
    render(
      <ButtonGroup aria-label="txt">
        <ButtonGroupText>Label</ButtonGroupText>
        <ButtonGroupText asChild>
          <label htmlFor="x">Field</label>
        </ButtonGroupText>
      </ButtonGroup>,
    );
    expect(screen.getByText("Label").tagName).toBe("SPAN");
    const label = screen.getByText("Field");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveClass("ds-button-group__text");
  });
});
