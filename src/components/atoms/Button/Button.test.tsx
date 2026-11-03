import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./index";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with aria-label", () => {
    render(<Button ariaLabel="Submit form">Submit</Button>);
    expect(screen.getByRole("button", { name: /submit form/i })).toBeInTheDocument();
  });

  it("applies gradient button class and css variables", () => {
    render(
      <Button
        ariaLabel="Upgrade"
        gradient="linear-gradient(90deg, red, blue)"
        gradientHover="linear-gradient(90deg, blue, purple)"
      >
        Upgrade
      </Button>
    );
    const button = screen.getByRole("button", { name: /upgrade/i });
    expect(button).toHaveClass("btn-gradient");
    expect(button).toHaveStyle({
      "--button-gradient-bg": "linear-gradient(90deg, red, blue)",
      "--button-gradient-hover-bg": "linear-gradient(90deg, blue, purple)",
    });
  });

  it("applies rounded and text size classes from props", () => {
    render(
      <Button rounded="pill" textSize="sm">
        Rounded
      </Button>
    );

    const button = screen.getByRole("button", { name: /rounded/i });
    expect(button).toHaveClass("btn-rounded-pill");
    expect(button).toHaveClass("btn-text-size-sm");
  });

  it("expandOnHover: icon-only at rest, label kept in the DOM for its name", () => {
    render(
      <Button expandOnHover size="xs" variant="outlineSecondary" icon={<svg data-testid="ic" />}>
        Refresh
      </Button>
    );
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button).toHaveClass("btn-expand-on-hover");
    expect(button).toHaveClass("btn-size-xs");
    expect(button.querySelector(".btn-expand-label")).toHaveTextContent("Refresh");
    expect(button.style.getPropertyValue("--btn-expand-pad")).toContain("var(--button-height-xs)");
    expect(button.style.getPropertyValue("--btn-expand-pad-open")).toBe("var(--button-padding-x-xs)");
  });

  it("expandOnHover is ignored without an icon or a label", () => {
    render(<Button expandOnHover>Plain</Button>);
    expect(screen.getByRole("button", { name: "Plain" })).not.toHaveClass("btn-expand-on-hover");
  });

  describe("loading (focus-safe)", () => {
    it("keeps focus through loading on → off, sets aria-disabled + aria-busy, not native disabled", () => {
      const { rerender } = render(<Button>Save</Button>);
      const button = screen.getByRole("button", { name: "Save" });
      button.focus();
      rerender(<Button loading>Save</Button>);
      expect(button).toHaveFocus();
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button.querySelector(".btn-spinner")).not.toBeNull();
      rerender(<Button>Save</Button>);
      expect(button).toHaveFocus();
      expect(button).not.toHaveAttribute("aria-disabled");
      expect(button).not.toHaveAttribute("aria-busy");
      expect(button.querySelector(".btn-spinner")).toBeNull();
    });

    it("name stays the label; loadingText is the description (default and custom)", () => {
      const { rerender } = render(<Button loading aria-describedby="hint">Save</Button>);
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAccessibleDescription("Loading");
      expect(button.getAttribute("aria-describedby")).toMatch(/^hint /);
      rerender(<Button loading loadingText="Saving…">Save</Button>);
      expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription("Saving…");
    });

    it("swallows click, Enter and Space while loading (and blocks form submit)", async () => {
      const onClick = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <Button type="submit" loading onClick={onClick}>
            Save
          </Button>
        </form>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      await userEvent.click(button);
      button.focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.keyboard(" ");
      expect(onClick).not.toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
      expect(button).toHaveFocus();
    });

    it("explicit disabled still sets native disabled (even with loading)", () => {
      render(
        <Button disabled loading>
          Save
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("spinner replaces the icon in its slot (left, right, icon-only, expandOnHover)", () => {
      const icon = <svg data-testid="ic" />;
      const { rerender } = render(<Button icon={icon} loading>Save</Button>);
      let button = screen.getByRole("button", { name: "Save" });
      expect(screen.queryByTestId("ic")).toBeNull();
      expect(button.querySelectorAll(".btn-spinner")).toHaveLength(1);
      const slot = button.querySelector(".btn-spinner-slot") as HTMLElement;
      expect(slot).toHaveClass("btn-icon-left");
      expect(slot.style.width).toBe("1rem"); // lg icon-with-label width → width stays stable

      rerender(<Button icon={icon} iconPosition="right" loading>Save</Button>);
      button = screen.getByRole("button", { name: "Save" });
      expect(screen.queryByTestId("ic")).toBeNull();
      const right = button.querySelector(".btn-spinner-slot") as HTMLElement;
      expect(right).toHaveClass("btn-icon-right");
      expect(right.previousSibling?.textContent).toBe("Save"); // after the label → the right slot

      rerender(<Button icon={icon} ariaLabel="Close" size="md" loading />);
      button = screen.getByRole("button", { name: "Close" });
      expect(screen.queryByTestId("ic")).toBeNull();
      expect((button.querySelector(".btn-spinner-slot") as HTMLElement).style.width).toBe("1.125rem");
      expect(button.querySelectorAll(".btn-spinner")).toHaveLength(1);

      rerender(<Button icon={icon} expandOnHover size="xs" loading>Refresh</Button>);
      button = screen.getByRole("button", { name: "Refresh" });
      expect(screen.queryByTestId("ic")).toBeNull();
      expect(button).toHaveClass("btn-expand-on-hover");
      expect((button.querySelector(".btn-spinner-slot") as HTMLElement).style.width).toBe("0.75rem");
      expect(button.style.getPropertyValue("--btn-expand-pad")).toContain("0.75rem"); // collapsed square unchanged

      rerender(<Button icon={icon}>Save</Button>);
      expect(screen.getByTestId("ic")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards the ref to <button>", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Go</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole("button", { name: "Go" }));
    });

    it("forwards the ref to <a> when href is safe", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(<Button ref={ref} href="/docs">Docs</Button>);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current).toBe(screen.getByRole("link", { name: "Docs" }));
    });

    it("keeps displayName", () => {
      expect(Button.displayName).toBe("Button");
    });
  });

  describe("href safety", () => {
    let warn: ReturnType<typeof vi.spyOn>;
    beforeEach(() => {
      warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    });
    afterEach(() => warn.mockRestore());

    it.each(["javascript:alert(1)", "java\tscript:alert(1)", "JAVASCRIPT:alert(1)", " javascript:alert(1)", "data:text/html,<b>x</b>", "vbscript:msgbox(1)"])(
      "unsafe %j renders a <button> without href and warns",
      (href) => {
        const onClick = vi.fn();
        render(
          <Button href={href} target="_blank" onClick={onClick}>
            Open
          </Button>,
        );
        expect(screen.queryByRole("link")).toBeNull();
        const button = screen.getByRole("button", { name: "Open" });
        expect(button).not.toHaveAttribute("href");
        expect(button).not.toHaveAttribute("target");
        expect(button).toHaveAttribute("type", "button");
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(expect.stringMatching(/unsafe href/i));
      },
    );

    it.each(["https://example.com", "/docs", "#top", "mailto:a@b.c", "tel:+1"])("safe %j renders a link", (href) => {
      render(<Button href={href}>Open</Button>);
      expect(screen.getByRole("link", { name: "Open" })).toHaveAttribute("href", href);
      expect(warn).not.toHaveBeenCalled();
    });

    it('target="_blank" adds rel="noopener noreferrer" unless rel is passed', () => {
      const { rerender } = render(<Button href="https://x.dev" target="_blank">Ext</Button>);
      expect(screen.getByRole("link", { name: "Ext" })).toHaveAttribute("rel", "noopener noreferrer");
      rerender(<Button href="https://x.dev" target="_blank" rel="noopener">Ext</Button>);
      expect(screen.getByRole("link", { name: "Ext" })).toHaveAttribute("rel", "noopener");
      rerender(<Button href="https://x.dev">Ext</Button>);
      expect(screen.getByRole("link", { name: "Ext" })).not.toHaveAttribute("rel");
    });

    it("loading link stays focusable and swallows clicks", () => {
      const onClick = vi.fn();
      render(<Button href="/docs" loading onClick={onClick}>Docs</Button>);
      const link = screen.getByRole("link", { name: "Docs" });
      link.focus();
      expect(link).toHaveFocus();
      expect(link).toHaveAttribute("aria-busy", "true");
      fireEvent.click(link);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("icon-only naming", () => {
    let warn: ReturnType<typeof vi.spyOn>;
    beforeEach(() => {
      warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    });
    afterEach(() => warn.mockRestore());

    it("warns in dev when icon-only has no ariaLabel (falls back to \"Button\")", () => {
      render(<Button icon={<svg />} />);
      expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
      expect(warn).toHaveBeenCalledWith(expect.stringMatching(/no accessible name/));
    });

    it("does not warn with ariaLabel, aria-label or aria-labelledby; native aria-label is honoured", () => {
      render(
        <>
          <span id="lbl">Labelled</span>
          <Button icon={<svg />} ariaLabel="Close" />
          <Button icon={<svg />} aria-label="Delete" />
          <Button icon={<svg />} aria-labelledby="lbl" />
        </>,
      );
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Labelled" })).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
