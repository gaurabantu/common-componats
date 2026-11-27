import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";
import type { AccordionProps } from "./Accordion.types";

function Faq(props: Partial<AccordionProps> & { disabledB?: boolean }) {
  const { disabledB, ...rest } = props;
  return (
    <Accordion {...rest}>
      <AccordionItem value="a">
        <AccordionTrigger>Question A</AccordionTrigger>
        <AccordionContent>Answer A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" disabled={disabledB}>
        <AccordionTrigger>Question B</AccordionTrigger>
        <AccordionContent>Answer B</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Question C</AccordionTrigger>
        <AccordionContent>Answer C</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const trigger = (name: string) => screen.getByRole("button", { name });

describe("Accordion — semantics", () => {
  it("renders triggers as buttons wired to their regions", () => {
    render(<Faq defaultValue="a" />);
    const t = trigger("Question A");
    expect(t).toHaveAttribute("type", "button");
    expect(t).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: "Question A" });
    expect(t).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", t.id);
    expect(region).toHaveTextContent("Answer A");
  });

  it("closed panels are hidden from assistive tech (aria-hidden + inert when animated)", () => {
    render(<Faq />);
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    const panel = document.getElementById(trigger("Question A").getAttribute("aria-controls")!);
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(panel).toHaveAttribute("inert");
  });

  it("the chevron is decorative", () => {
    render(<Faq />);
    expect(trigger("Question A").querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes variant / motion / density data attributes", () => {
    const { container } = render(<Faq variant="bordered" motion="none" density="compact" />);
    const root = container.querySelector(".ds-accordion")!;
    expect(root).toHaveAttribute("data-variant", "bordered");
    expect(root).toHaveAttribute("data-motion", "none");
    expect(root).toHaveAttribute("data-density", "compact");
  });

  it("generates unique ids per item", () => {
    render(<Faq />);
    const ids = ["Question A", "Question B", "Question C"].map((n) => trigger(n).id);
    expect(new Set(ids).size).toBe(3);
  });
});

describe("Accordion — single", () => {
  it("opens one item at a time", () => {
    render(<Faq />);
    fireEvent.click(trigger("Question A"));
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(trigger("Question C"));
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "false");
    expect(trigger("Question C")).toHaveAttribute("aria-expanded", "true");
  });

  it("collapsible (default) closes the open item", () => {
    const onValueChange = vi.fn();
    render(<Faq defaultValue="a" onValueChange={onValueChange} />);
    fireEvent.click(trigger("Question A"));
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
  });

  it("collapsible={false} keeps the open item open", () => {
    render(<Faq defaultValue="a" collapsible={false} />);
    fireEvent.click(trigger("Question A"));
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "true");
  });

  it("controlled value drives state and reports changes", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<Faq value="a" onValueChange={onValueChange} />);
    fireEvent.click(trigger("Question C"));
    expect(onValueChange).toHaveBeenCalledWith("c");
    // Still controlled → unchanged until parent updates
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "true");
    rerender(<Faq value="c" onValueChange={onValueChange} />);
    expect(trigger("Question C")).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Accordion — multiple", () => {
  it("opens several items and reports arrays", () => {
    const onValueChange = vi.fn();
    render(<Faq type="multiple" onValueChange={onValueChange} />);
    fireEvent.click(trigger("Question A"));
    fireEvent.click(trigger("Question C"));
    expect(trigger("Question A")).toHaveAttribute("aria-expanded", "true");
    expect(trigger("Question C")).toHaveAttribute("aria-expanded", "true");
    expect(onValueChange).toHaveBeenLastCalledWith(["a", "c"]);
    fireEvent.click(trigger("Question A"));
    expect(onValueChange).toHaveBeenLastCalledWith(["c"]);
  });

  it("does not mutate a controlled array prop", () => {
    const value = ["a"];
    render(<Faq type="multiple" value={value} onValueChange={() => {}} />);
    fireEvent.click(trigger("Question C"));
    expect(value).toEqual(["a"]);
  });
});

describe("Accordion — disabled & interaction", () => {
  it("disabled items cannot be toggled", () => {
    const onValueChange = vi.fn();
    render(<Faq disabledB onValueChange={onValueChange} />);
    const b = trigger("Question B");
    expect(b).toBeDisabled();
    fireEvent.click(b);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(b).toHaveAttribute("aria-expanded", "false");
  });

  it("trigger onClick runs first and preventDefault cancels the toggle", () => {
    render(
      <Accordion>
        <AccordionItem value="x">
          <AccordionTrigger onClick={(e) => e.preventDefault()}>Locked</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    fireEvent.click(trigger("Locked"));
    expect(trigger("Locked")).toHaveAttribute("aria-expanded", "false");
  });

  it("triggers are native buttons (Tab-reachable; Enter/Space activate via click)", () => {
    render(<Faq />);
    const a = trigger("Question A");
    a.focus();
    expect(a).toHaveFocus();
    fireEvent.click(a);
    expect(a).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Accordion — motion none / forceMount", () => {
  it("motion=none unmounts closed panels", () => {
    render(<Faq motion="none" defaultValue="a" />);
    expect(screen.getByText("Answer A")).toBeInTheDocument();
    expect(screen.queryByText("Answer B")).not.toBeInTheDocument();
  });

  it("forceMount keeps closed content mounted but hidden from AT", () => {
    render(
      <Accordion motion="none">
        <AccordionItem value="x">
          <AccordionTrigger>Stateful</AccordionTrigger>
          <AccordionContent forceMount>Kept</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const body = screen.getByText("Kept");
    expect(body).toHaveAttribute("data-force-hidden", "true");
    expect(body.closest(".ds-accordion__content-outer")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Accordion — context guards", () => {
  it("throws when parts are used outside their parents", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AccordionItem value="x">x</AccordionItem>)).toThrow(/within <Accordion>/);
    expect(() =>
      render(
        <Accordion>
          <AccordionTrigger>t</AccordionTrigger>
        </Accordion>,
      ),
    ).toThrow(/within <AccordionItem>/);
    err.mockRestore();
  });
});
