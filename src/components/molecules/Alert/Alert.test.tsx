import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Alert from "./index";
import type { AlertVariant } from "./Alert.types";

describe("Alert", () => {
  describe("rendering", () => {
    it("renders title and description with default info / soft", () => {
      const { container } = render(<Alert title="Heads up">Body copy</Alert>);
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveClass("ds-alert");
      expect(root).toHaveAttribute("data-variant", "info");
      expect(root).toHaveAttribute("data-appearance", "soft");
      expect(screen.getByText("Heads up")).toBeInTheDocument();
      expect(screen.getByText("Body copy")).toBeInTheDocument();
    });

    it.each<AlertVariant>(["info", "success", "warning", "danger", "neutral"])(
      "renders %s with a decorative icon and tone variables",
      (variant) => {
        const { container } = render(<Alert variant={variant}>Msg</Alert>);
        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveAttribute("data-variant", variant);
        expect(root.style.getPropertyValue("--ds-feedback-strong")).toMatch(/^var\(--color-/);
        const icon = container.querySelector(".ds-alert__icon");
        expect(icon).toHaveAttribute("aria-hidden", "true");
        expect(icon?.querySelector("svg")).not.toBeNull();
      },
    );

    it("supports appearance, compact, hideIcon and custom icon", () => {
      const { container, rerender } = render(
        <Alert appearance="solid-accent" compact icon={<svg data-testid="custom" />}>Msg</Alert>,
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveAttribute("data-appearance", "solid-accent");
      expect(root).toHaveAttribute("data-compact", "true");
      expect(screen.getByTestId("custom")).toBeInTheDocument();
      rerender(<Alert hideIcon>Msg</Alert>);
      expect(container.querySelector(".ds-alert__icon")).toBeNull();
    });

    it("forwards ref, className and native attributes", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref} className="extra" data-testid="a" id="x">Msg</Alert>);
      expect(ref.current).toBe(screen.getByTestId("a"));
      expect(ref.current).toHaveClass("ds-alert", "extra");
      expect(ref.current).toHaveAttribute("id", "x");
    });
  });

  describe("a11y", () => {
    it("renders no live role by default (static alert)", () => {
      const { container } = render(<Alert variant="danger">Msg</Alert>);
      const root = container.firstElementChild as HTMLElement;
      expect(root).not.toHaveAttribute("role");
      expect(root).not.toHaveAttribute("aria-live");
    });

    it("uses role=alert for danger/warning when assertive", () => {
      render(<Alert variant="danger" live="assertive">Failed</Alert>);
      expect(screen.getByRole("alert")).toHaveTextContent("Failed");
    });

    it("uses role=status for polite, and for assertive non-urgent tones", () => {
      const { rerender } = render(<Alert variant="danger" live="polite">A</Alert>);
      expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
      rerender(<Alert variant="success" live="assertive">A</Alert>);
      expect(screen.getByRole("status")).toHaveAttribute("aria-live", "assertive");
      expect(screen.queryByRole("alert")).toBeNull();
    });

    it("prefixes a visually-hidden variant word (title or description)", () => {
      const { container, rerender } = render(<Alert variant="danger" title="Payment failed">x</Alert>);
      expect(container.querySelector(".ds-alert__title")).toHaveTextContent("Error: Payment failed");
      rerender(<Alert variant="warning">Low disk</Alert>);
      expect(container.querySelector(".ds-alert__description")).toHaveTextContent("Warning: Low disk");
      rerender(<Alert variant="warning" srPrefix={false}>Low disk</Alert>);
      expect(container.querySelector(".ds-alert__sr")).toBeNull();
    });

    it("dismiss button has an accessible name", () => {
      const { rerender } = render(<Alert onDismiss={() => {}}>Msg</Alert>);
      expect(screen.getByRole("button", { name: "Dismiss" })).toHaveAttribute("type", "button");
      rerender(<Alert onDismiss={() => {}} dismissLabel="Close banner">Msg</Alert>);
      expect(screen.getByRole("button", { name: "Close banner" })).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("calls onDismiss on click and is keyboard reachable", () => {
      const onDismiss = vi.fn();
      render(<Alert onDismiss={onDismiss}>Msg</Alert>);
      const btn = screen.getByRole("button", { name: "Dismiss" });
      btn.focus();
      expect(btn).toHaveFocus();
      fireEvent.click(btn);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it("renders the action slot", () => {
      const onClick = vi.fn();
      render(<Alert action={<button onClick={onClick}>Retry</button>}>Msg</Alert>);
      fireEvent.click(screen.getByRole("button", { name: "Retry" }));
      expect(onClick).toHaveBeenCalled();
    });

    it("omits the dismiss button without onDismiss", () => {
      render(<Alert>Msg</Alert>);
      expect(screen.queryByRole("button")).toBeNull();
    });
  });
});
