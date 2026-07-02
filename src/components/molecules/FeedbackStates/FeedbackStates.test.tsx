import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import EmptyState, { ErrorState, FeedbackState, OfflineBanner } from "./index";

describe("EmptyState", () => {
  it("renders title, description, and icon", () => {
    render(
      <EmptyState
        icon={<span aria-hidden="true">📭</span>}
        title="No data yet"
        description="When records appear they will display here."
        action={<button type="button">Create</button>}
      />
    );
    expect(screen.getByRole("status")).toHaveTextContent("No data yet");
    expect(screen.getByText("When records appear they will display here.")).toBeInTheDocument();
  });

  it("calls action button handler", () => {
    const go = vi.fn();
    render(
      <EmptyState title="Empty" action={<button type="button" onClick={go}>Create</button>} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(go).toHaveBeenCalled();
  });

  it("renders extra actions slot", () => {
    render(
      <EmptyState
        title="No projects"
        extra={<button type="button">Import CSV</button>}
      />
    );
    expect(screen.getByRole("button", { name: "Import CSV" })).toBeInTheDocument();
  });

  it("renders image slot", () => {
    render(
      <EmptyState
        title="No files"
        image={<img src="x.png" alt="illustration" />}
      />
    );
    expect(screen.getByAltText("illustration")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<EmptyState title="T" size="lg" />);
    expect(container.querySelector(".ds-feedback-shell--lg")).not.toBeNull();
  });

  it("sets aria-labelledby and aria-describedby", () => {
    render(<EmptyState title="Labelled" description="Described" />);
    const section = screen.getByRole("status");
    expect(section).toHaveAttribute("aria-labelledby");
    expect(section).toHaveAttribute("aria-describedby");
  });
});

describe("ErrorState", () => {
  it("renders with default title and retry button", () => {
    const retry = vi.fn();
    render(<ErrorState onRetry={retry} details="boom" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalled();
  });

  it("uses data-testid", () => {
    render(<ErrorState title="Oops" data-testid="my-error" />);
    expect(screen.getByTestId("my-error")).toBeInTheDocument();
  });

  it("respects explicit aria-live override", () => {
    render(<ErrorState title="Soft error" aria-live="polite" role="status" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("hides default icon when hideIcon=true", () => {
    const { container } = render(<ErrorState title="T" hideIcon />);
    expect(container.querySelector(".ds-feedback-icon")).toBeNull();
  });

  it("renders custom icon when supplied", () => {
    render(<ErrorState title="T" icon={<span data-testid="custom-icon">🔒</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders extra slot below retry", () => {
    render(<ErrorState title="T" onRetry={() => undefined} extra={<button type="button">Go home</button>} />);
    expect(screen.getByRole("button", { name: "Go home" })).toBeInTheDocument();
  });
});

describe("OfflineBanner", () => {
  it("shows headline and retry", () => {
    const retry = vi.fn();
    render(<OfflineBanner onRetry={retry} />);
    expect(screen.getByText(/No internet connection/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalled();
  });

  it("allows custom headline", () => {
    render(<OfflineBanner headline="Lost connection." />);
    expect(screen.getByText("Lost connection.")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button clicked", () => {
    const dismiss = vi.fn();
    render(<OfflineBanner onDismiss={dismiss} />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(dismiss).toHaveBeenCalled();
  });

  it("has aria-atomic", () => {
    render(<OfflineBanner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-atomic", "true");
  });
});

describe("Feedback animations", () => {
  it("NoDataAnimation renders with decorative aria-hidden and illustration class", async () => {
    const { NoDataAnimation } = await import("./FeedbackStates.animations");
    const { container } = render(<NoDataAnimation size={80} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("ds-feedback-illustration");
  });
});

describe("FeedbackState (variant router)", () => {
  it("variant=error routes to ErrorState", () => {
    const retry = vi.fn();
    render(<FeedbackState variant="error" onRetry={retry} title="Upstream failure" />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalled();
    expect(screen.getByText("Upstream failure")).toBeInTheDocument();
  });

  it("variant=empty routes to EmptyState", () => {
    render(<FeedbackState variant="empty" title="Nothing here" />);
    expect(screen.getByRole("status")).toHaveTextContent("Nothing here");
  });

  it("variant=success applies success tone", () => {
    const { container } = render(<FeedbackState variant="success" title="Done!" />);
    expect(container.querySelector(".ds-feedback-shell--tone-success")).not.toBeNull();
  });

  it("variant=info applies info tone", () => {
    const { container } = render(<FeedbackState variant="info" title="Note" />);
    expect(container.querySelector(".ds-feedback-shell--tone-info")).not.toBeNull();
  });

  it("variant=offline renders OfflineBanner", () => {
    render(<FeedbackState variant="offline" />);
    expect(screen.getByTestId("feedback-offline-banner")).toBeInTheDocument();
  });
});
