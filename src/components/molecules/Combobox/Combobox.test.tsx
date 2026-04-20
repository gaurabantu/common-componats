import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "./index";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
];

describe("Combobox", () => {
  it("opens list and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox label="Pick" options={options} value="" onValueChange={onValueChange} placeholder="Choose…" />
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /Bravo/i }));
    expect(onValueChange).toHaveBeenCalledWith("b", expect.objectContaining({ value: "b", label: "Bravo" }));
  });

  it("filters options when searchable", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Pick" options={options} searchable defaultValue="a" />);
    await user.click(screen.getByRole("combobox"));
    const search = screen.getByPlaceholderText(/search/i);
    await user.type(search, "brav");
    expect(screen.getByRole("option", { name: /Bravo/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Alpha/i })).not.toBeInTheDocument();
  });
});
