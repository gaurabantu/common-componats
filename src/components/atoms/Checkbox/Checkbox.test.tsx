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
