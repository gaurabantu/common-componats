import React, { useState } from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Wizard from "./index";
import type { WizardStep } from "./Wizard.types";
import { runValidator, toValidationError } from "./Wizard.config";

const makeSteps = (overrides: Partial<Record<number, Partial<WizardStep>>> = {}): WizardStep[] =>
  [
    { id: "account", title: "Account", description: "Who you are", content: <p>Account body</p> },
    { id: "team", title: "Team", optional: true, content: <p>Team body</p> },
    { id: "billing", title: "Billing", content: <p>Billing body</p> },
  ].map((s, i) => ({ ...s, ...(overrides[i] ?? {}) }));

const heading = () => screen.getByRole("heading", { level: 2 });
const next = () => screen.getByRole("button", { name: "Next" });

describe("Wizard config utils", () => {
  it("normalises validator results", () => {
    expect(toValidationError(true)).toBeNull();
    expect(toValidationError(undefined)).toBeNull();
    expect(toValidationError(false)).toBe("");
    expect(toValidationError("Name is required")).toBe("Name is required");
  });

  it("runs sync, async and throwing validators", async () => {
    expect(await runValidator(undefined)).toBeNull();
    expect(await runValidator(() => true)).toBeNull();
    expect(await runValidator(async () => "Nope")).toBe("Nope");
    expect(
      await runValidator(() => {
        throw new Error("boom");
      }),
    ).toBe("");
  });
});

describe("Wizard", () => {
  describe("rendering", () => {
    it("renders the Stepper nav, step heading with counter, description and only the active content", () => {
      render(<Wizard steps={makeSteps()} />);
      expect(screen.getByRole("navigation", { name: "Progress" })).toBeInTheDocument();
      expect(heading()).toHaveTextContent("Step 1 of 3");
      expect(heading()).toHaveTextContent("Account");
      expect(screen.getByRole("group", { name: /Account/ })).toHaveAccessibleDescription("Who you are");
      expect(screen.getByText("Account body")).toBeVisible();
      expect(screen.getByText("Team body")).not.toBeVisible();
      expect(screen.queryByRole("button", { name: "Back" })).toBeNull();
    });

    it("has exactly one primary action (Next, then Finish on the last step)", () => {
      render(<Wizard steps={makeSteps()} defaultActiveStep={2} />);
      const footer = document.querySelector(".ds-wizard__footer") as HTMLElement;
      expect(footer.querySelectorAll('[data-variant="primary"]')).toHaveLength(1);
      expect(within(footer).getByRole("button", { name: "Finish" })).toHaveAttribute("data-variant", "primary");
      expect(within(footer).getByRole("button", { name: "Back" })).toHaveAttribute("data-variant", "outlineSecondary");
    });

    it("marks optional steps and uses custom labels", () => {
      render(
        <Wizard
          steps={makeSteps()}
          defaultActiveStep={1}
          backLabel="Previous"
          nextLabel="Continue"
          optionalLabel="Not required"
          formatStepCounter={(c, t) => `${c}/${t}`}
          headingLevel={3}
        />,
      );
      expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("2/3");
      expect(screen.getAllByText(/Not required/).length).toBeGreaterThan(0);
    });

    it("renders nothing but the root when there are no steps", () => {
      const { container } = render(<Wizard steps={[]} />);
      expect(container.querySelector(".ds-wizard")).toBeEmptyDOMElement();
    });
  });

  describe("navigation & focus", () => {
    it("Next advances and focuses the new heading; Back returns and focuses it", async () => {
      const onStepChange = vi.fn();
      render(<Wizard steps={makeSteps()} onStepChange={onStepChange} />);
      fireEvent.click(next());
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
      expect(heading()).toHaveFocus();
      expect(onStepChange).toHaveBeenLastCalledWith(1);
      expect(screen.getByText("Team body")).toBeVisible();
      fireEvent.click(screen.getByRole("button", { name: "Back" }));
      expect(heading()).toHaveTextContent("Account");
      expect(heading()).toHaveFocus();
      expect(onStepChange).toHaveBeenLastCalledWith(0);
    });

    it("does not steal focus on mount", () => {
      render(<Wizard steps={makeSteps()} />);
      expect(heading()).not.toHaveFocus();
    });

    it("linear: upcoming Stepper steps are disabled until reached", async () => {
      render(<Wizard steps={makeSteps()} />);
      const markers = () => screen.getAllByRole("button", { name: /Account|Team|Billing/ }).filter((b) => b.closest("nav"));
      expect(markers()[2]).toBeDisabled();
      fireEvent.click(next());
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
      fireEvent.click(next());
      await waitFor(() => expect(heading()).toHaveTextContent("Billing"));
      fireEvent.click(markers()[0]);
      expect(heading()).toHaveTextContent("Account");
      expect(heading()).toHaveFocus();
      // previously reached step is navigable forward again
      expect(markers()[2]).not.toBeDisabled();
      fireEvent.click(markers()[2]);
      await waitFor(() => expect(heading()).toHaveTextContent("Billing"));
    });

    it("non-linear: any Stepper step is reachable without validation", () => {
      const validate = vi.fn(() => false);
      render(<Wizard steps={makeSteps({ 0: { validate } })} linear={false} />);
      const marker = screen.getAllByRole("button", { name: /Billing/ }).find((b) => b.closest("nav"))!;
      expect(marker).not.toBeDisabled();
      fireEvent.click(marker);
      expect(heading()).toHaveTextContent("Billing");
      expect(validate).not.toHaveBeenCalled();
    });

    it("works controlled", async () => {
      function Controlled() {
        const [step, setStep] = useState(0);
        return <Wizard steps={makeSteps()} activeStep={step} onStepChange={setStep} />;
      }
      render(<Controlled />);
      fireEvent.click(next());
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
      expect(heading()).toHaveFocus();
    });
  });

  describe("validation", () => {
    it("blocks Next, shows an assertive danger Alert with the message and focuses the heading", async () => {
      render(<Wizard steps={makeSteps({ 0: { validate: () => "Email is required" } })} />);
      const btn = next();
      btn.focus();
      fireEvent.click(btn);
      const alert = await screen.findByRole("alert");
      expect(alert).toHaveTextContent("Check this step");
      expect(alert).toHaveTextContent("Email is required");
      expect(alert).toHaveAttribute("data-variant", "danger");
      expect(heading()).toHaveTextContent("Account");
      expect(heading()).toHaveFocus();
    });

    it("uses the default message for `false`, re-announces on repeat and clears on success", async () => {
      let ok = false;
      render(<Wizard steps={makeSteps({ 0: { validate: () => ok } })} validationMessage="Fix it" />);
      fireEvent.click(next());
      const first = await screen.findByRole("alert");
      expect(first).toHaveTextContent("Fix it");
      fireEvent.click(next());
      await waitFor(() => expect(screen.getByRole("alert")).not.toBe(first));
      ok = true;
      fireEvent.click(next());
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
      expect(screen.queryByRole("alert")).toBeNull();
    });

    it("awaits async validators, marks the panel busy and ignores double clicks", async () => {
      let resolve!: (v: boolean) => void;
      const validate = vi.fn(() => new Promise<boolean>((r) => (resolve = r)));
      render(<Wizard steps={makeSteps({ 0: { validate } })} />);
      fireEvent.click(next());
      fireEvent.click(next());
      await waitFor(() => expect(screen.getByRole("group", { name: /Account/ })).toHaveAttribute("aria-busy", "true"));
      expect(validate).toHaveBeenCalledTimes(1);
      expect(next()).not.toBeDisabled(); // focus is never dropped by disabling Next
      await act(async () => resolve(true));
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
    });

    it("Finish validates every step and jumps to the first failing one", async () => {
      const onComplete = vi.fn();
      render(
        <Wizard
          steps={makeSteps({ 1: { validate: () => "Pick a team" } })}
          linear={false}
          defaultActiveStep={2}
          onComplete={onComplete}
        />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      await waitFor(() => expect(heading()).toHaveTextContent("Team"));
      expect(screen.getByRole("alert")).toHaveTextContent("Pick a team");
      expect(heading()).toHaveFocus();
      expect(onComplete).not.toHaveBeenCalled();
    });

    it("calls onComplete when all steps pass", async () => {
      const onComplete = vi.fn();
      render(<Wizard steps={makeSteps()} defaultActiveStep={2} onComplete={onComplete} />);
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    });
  });

  describe("review step & loading", () => {
    it("lists step titles with Edit links that jump back and focus the heading", async () => {
      render(
        <Wizard
          steps={makeSteps({ 0: { summary: "jane@acme.test" } })}
          showReview
          defaultActiveStep={3}
          reviewDescription="Check everything"
        />,
      );
      expect(heading()).toHaveTextContent("Step 4 of 4");
      expect(heading()).toHaveTextContent("Review");
      expect(screen.getByText("jane@acme.test")).toBeInTheDocument();
      const items = within(screen.getByRole("list")).getAllByRole("listitem");
      expect(items).toHaveLength(3);
      fireEvent.click(screen.getByRole("button", { name: "Edit Team" }));
      expect(heading()).toHaveTextContent("Team");
      expect(heading()).toHaveFocus();
    });

    it("loading: Finish shows a spinner, focus moves to the heading and status is announced", () => {
      const { rerender } = render(<Wizard steps={makeSteps()} defaultActiveStep={2} />);
      const finish = screen.getByRole("button", { name: "Finish" });
      finish.focus();
      rerender(<Wizard steps={makeSteps()} defaultActiveStep={2} loading />);
      expect(screen.getByRole("button", { name: "Finish" })).toHaveAttribute("aria-disabled", "true");
      expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
      expect(heading()).toHaveFocus();
      expect(screen.getByRole("status")).toHaveTextContent("Submitting…");
    });
  });

  describe("Promise-driven loading (uncontrolled)", () => {
    it("manages loading while onComplete's Promise is pending, keeps focus, announces and clears", async () => {
      let resolve!: () => void;
      const onComplete = vi.fn(() => new Promise<void>((r) => (resolve = r)));
      render(<Wizard steps={makeSteps()} defaultActiveStep={2} onComplete={onComplete} />);
      const finish = screen.getByRole("button", { name: "Finish" });
      finish.focus();
      fireEvent.click(finish);
      await waitFor(() => expect(screen.getByRole("button", { name: "Finish" })).toHaveAttribute("aria-disabled", "true"));
      expect(heading()).toHaveFocus();
      expect(screen.getByRole("status")).toHaveTextContent("Submitting…");
      expect(screen.getByRole("group", { name: /Billing/ })).toHaveAttribute("aria-busy", "true");
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      expect(onComplete).toHaveBeenCalledTimes(1);
      await act(async () => resolve());
      expect(screen.getByRole("button", { name: "Finish" })).not.toHaveAttribute("aria-disabled");
      expect(screen.getByRole("status")).toHaveTextContent("");
      expect(heading()).toHaveFocus();
    });

    it("clears loading when the Promise rejects (dev console.error, no unhandled rejection)", async () => {
      const err = vi.spyOn(console, "error").mockImplementation(() => {});
      let reject!: (e: Error) => void;
      render(
        <Wizard steps={makeSteps()} defaultActiveStep={2} onComplete={() => new Promise<void>((_, r) => (reject = r))} />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      await waitFor(() => expect(screen.getByRole("button", { name: "Finish" })).toHaveAttribute("aria-disabled", "true"));
      await act(async () => reject(new Error("server down")));
      expect(screen.getByRole("button", { name: "Finish" })).not.toHaveAttribute("aria-disabled");
      expect(err).toHaveBeenCalledWith(expect.stringMatching(/onComplete rejected/), expect.any(Error));
      err.mockRestore();
    });

    it("controlled `loading` takes precedence over the Promise", async () => {
      let resolve!: () => void;
      const onComplete = () => new Promise<void>((r) => (resolve = r));
      render(<Wizard steps={makeSteps()} defaultActiveStep={2} onComplete={onComplete} loading={false} />);
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      await waitFor(() => expect(resolve).toBeTypeOf("function"));
      expect(screen.getByRole("button", { name: "Finish" })).not.toBeDisabled();
      expect(screen.getByRole("status")).toHaveTextContent("");
      await act(async () => resolve());
    });

    it("sync onComplete does not enter loading", async () => {
      const onComplete = vi.fn();
      render(<Wizard steps={makeSteps()} defaultActiveStep={2} onComplete={onComplete} />);
      fireEvent.click(screen.getByRole("button", { name: "Finish" }));
      await waitFor(() => expect(onComplete).toHaveBeenCalled());
      expect(screen.getByRole("button", { name: "Finish" })).not.toBeDisabled();
    });
  });
});
