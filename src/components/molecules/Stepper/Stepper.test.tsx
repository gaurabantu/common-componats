import React from "react";
import { render, screen } from "@testing-library/react";
import { Stepper, StepperStep } from "./index";

describe("Stepper", () => {
  function Example() {
    return (
      <Stepper defaultValue={1} ariaLabel="Checkout">
        <StepperStep label="Cart" />
        <StepperStep label="Shipping" />
        <StepperStep label="Payment" />
      </Stepper>
    );
  }

  it("does not put aria-posinset / aria-setsize on step buttons (invalid on <button>)", () => {
    render(<Example />);
    for (const btn of screen.getAllByRole("button")) {
      expect(btn).not.toHaveAttribute("aria-posinset");
      expect(btn).not.toHaveAttribute("aria-setsize");
    }
  });

  it("names each marker with its position, state and label", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Step 1 of 3, completed: Cart" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Step 2 of 3: Shipping" })).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("button", { name: "Step 3 of 3: Payment" })).toBeInTheDocument();
  });
});
