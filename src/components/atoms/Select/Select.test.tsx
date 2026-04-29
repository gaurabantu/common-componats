import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./index";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

describe("Select", () => {
  it("renders with options", () => {
    render(<Select options={options} value="1" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("calls onChange when selection changes", async () => {
    const handleChange = vi.fn();
    render(<Select options={options} value="1" onChange={handleChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(handleChange).toHaveBeenCalled();
  });

  it("blurs after change when animated chevron is on so the arrow returns to down", async () => {
    render(<Select options={options} value="" onChange={() => {}} />);
    const el = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(el, "1");
    expect(document.activeElement).not.toBe(el);
  });

  it("renders optgroups when groups are provided", () => {
    render(
      <Select
        groups={[
          { label: "Group A", options: [{ label: "One", value: "1" }] },
          { label: "Group B", options: [{ label: "Two", value: "2" }] },
        ]}
        value="2"
        onChange={() => {}}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Two" })).toBeInTheDocument();
  });
});
