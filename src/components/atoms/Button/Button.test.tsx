import React from "react";
import { render, screen } from "@testing-library/react";
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
});
