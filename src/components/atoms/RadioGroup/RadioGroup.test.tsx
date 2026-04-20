import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioGroup from "./index";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
];

describe("RadioGroup", () => {
  it("renders options", () => {
    render(<RadioGroup name="test" options={options} value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B")).toBeInTheDocument();
  });

  it("calls onChange when option selected", async () => {
    const handleChange = vi.fn();
    render(<RadioGroup name="test" options={options} value="" onChange={handleChange} />);
    await userEvent.click(screen.getByLabelText("Option A"));
    expect(handleChange).toHaveBeenCalled();
  });
});
