import React, { useState } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagInput from "./index";
import FormField from "../FormField";
import { splitPending, splitTags, filterSuggestions } from "./TagInput.utils";
import type { TagInputProps } from "./TagInput.types";

function Controlled(props: Partial<TagInputProps>) {
  const [tags, setTags] = useState<string[]>(props.defaultValue ?? []);
  return (
    <TagInput
      label="Tags"
      {...props}
      defaultValue={undefined}
      value={tags}
      onChange={(next) => {
        setTags(next);
        props.onChange?.(next);
      }}
    />
  );
}

const box = () => screen.getByRole("textbox", { name: "Tags" });

describe("TagInput — rendering", () => {
  it("renders a labelled text box and default chips", () => {
    render(<TagInput label="Tags" defaultValue={["react", "vue"]} />);
    expect(box()).toBeInTheDocument();
    const list = screen.getByRole("list", { name: "Selected tags" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Remove react" })).toBeInTheDocument();
  });

  it("sets size and state data attributes", () => {
    const { container } = render(<TagInput label="Tags" size="lg" disabled />);
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-disabled", "true");
    expect(box()).toBeDisabled();
  });

  it("renders no remove buttons when readOnly or disabled", () => {
    const { rerender } = render(<TagInput label="Tags" defaultValue={["a"]} readOnly />);
    expect(screen.queryByRole("button")).toBeNull();
    rerender(<TagInput label="Tags" defaultValue={["a"]} disabled />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("serialises tags into a hidden input when name is set", () => {
    const { container } = render(<TagInput label="Tags" name="skills" defaultValue={["a", "b"]} />);
    expect(container.querySelector('input[type="hidden"][name="skills"]')).toHaveValue("a,b");
  });

  it("hides the placeholder once maxTags is reached", () => {
    render(<TagInput label="Tags" placeholder="Add" maxTags={1} defaultValue={["a"]} />);
    expect(box()).not.toHaveAttribute("placeholder");
  });
});

describe("TagInput — adding", () => {
  it("adds a tag on Enter and announces it", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.type(box(), "react{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["react"]);
    expect(box()).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("Added react");
  });

  it("adds a tag when a delimiter is typed", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.type(box(), "one,two");
    expect(onChange).toHaveBeenLastCalledWith(["one"]);
    expect(box()).toHaveValue("two");
  });

  it("supports custom delimiters", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} delimiters={[";"]} />);
    await userEvent.type(box(), "a;b,c;");
    expect(onChange).toHaveBeenLastCalledWith(["a", "b,c"]);
  });

  it("splits pasted lists on delimiters and newlines", () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.paste(box(), { clipboardData: { getData: () => "red, green\nblue" } });
    expect(onChange).toHaveBeenLastCalledWith(["red", "green", "blue"]);
    expect(box()).toHaveValue("");
  });

  it("rejects duplicates with an assertive message", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} defaultValue={["react"]} />);
    await userEvent.type(box(), "react{Enter}");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent('"react" is already added');
    expect(box()).toHaveAttribute("aria-invalid", "true");
    expect(box()).toHaveValue("react");
    expect(box().getAttribute("aria-describedby")).toContain(screen.getByRole("alert").id);
  });

  it("allows duplicates when allowDuplicates", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} defaultValue={["x"]} allowDuplicates />);
    await userEvent.type(box(), "x{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["x", "x"]);
  });

  it("runs validate and shows its message", async () => {
    const validate = (tag: string) => (tag.includes("@") ? true : "Enter an email");
    render(<Controlled validate={validate} />);
    await userEvent.type(box(), "nope{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter an email");
    await userEvent.clear(box());
    expect(screen.queryByRole("alert")).toBeNull();
    await userEvent.type(box(), "a@b.co{Enter}");
    expect(screen.getByRole("listitem")).toHaveTextContent("a@b.co");
  });

  it("enforces maxTags", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} maxTags={1} />);
    await userEvent.type(box(), "a{Enter}b{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toHaveTextContent("You can add up to 1 tags");
  });

  it("commits on blur when addOnBlur", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} addOnBlur />);
    await userEvent.type(box(), "later");
    await userEvent.tab();
    expect(onChange).toHaveBeenLastCalledWith(["later"]);
  });

  it("works uncontrolled", async () => {
    render(<TagInput label="Tags" defaultValue={["a"]} />);
    await userEvent.type(box(), "b{Enter}");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

describe("TagInput — removing and keyboard", () => {
  it("Backspace in an empty box removes the last tag and announces it", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} defaultValue={["a", "b"]} />);
    await userEvent.click(box());
    await userEvent.keyboard("{Backspace}");
    expect(onChange).toHaveBeenLastCalledWith(["a"]);
    expect(screen.getByRole("status")).toHaveTextContent("Removed b");
  });

  it("clicking a remove button removes that tag and returns focus to the box", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} defaultValue={["a", "b"]} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove a" }));
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
    await waitFor(() => expect(box()).toHaveFocus());
  });

  it("ArrowLeft / ArrowRight move between chips and back to the box", async () => {
    render(<Controlled defaultValue={["a", "b"]} />);
    await userEvent.click(box());
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("button", { name: "Remove b" })).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("button", { name: "Remove a" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(box()).toHaveFocus();
  });

  it("Delete on a focused chip removes it and keeps focus in the widget", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} defaultValue={["a", "b", "c"]} />);
    screen.getByRole("button", { name: "Remove b" }).focus();
    await userEvent.keyboard("{Delete}");
    expect(onChange).toHaveBeenLastCalledWith(["a", "c"]);
    await waitFor(() => expect(screen.getByRole("button", { name: "Remove c" })).toHaveFocus());
  });
});

describe("TagInput — suggestions (combobox)", () => {
  const suggestions = ["React", "Redux", "Vue", "Svelte"];

  it("exposes combobox semantics and filters suggestions", async () => {
    render(<Controlled suggestions={suggestions} />);
    const input = screen.getByRole("combobox", { name: "Tags" });
    expect(input).toHaveAttribute("aria-expanded", "false");
    await userEvent.type(input, "re");
    expect(input).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox", { name: "Suggestions" });
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(within(listbox).getAllByRole("option").map((o) => o.textContent)).toEqual(["React", "Redux"]);
  });

  it("ArrowDown sets aria-activedescendant and Enter picks the option", async () => {
    const onChange = vi.fn();
    render(<Controlled suggestions={suggestions} onChange={onChange} />);
    const input = screen.getByRole("combobox", { name: "Tags" });
    await userEvent.type(input, "re{ArrowDown}{ArrowDown}");
    const options = screen.getAllByRole("option");
    expect(input).toHaveAttribute("aria-activedescendant", options[1].id);
    expect(options[1]).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(["Redux"]);
    expect(input).toHaveValue("");
  });

  it("clicking an option adds it; added tags are hidden from the list", async () => {
    render(<Controlled suggestions={suggestions} defaultValue={["React"]} />);
    const input = screen.getByRole("combobox", { name: "Tags" });
    await userEvent.type(input, "re");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Redux"]);
    await userEvent.click(screen.getByRole("option", { name: "Redux" }));
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["React", "Redux"]);
  });

  it("Escape closes the list without propagating", async () => {
    const outer = vi.fn();
    render(
      <div onKeyDown={outer}>
        <Controlled suggestions={suggestions} />
      </div>,
    );
    const input = screen.getByRole("combobox", { name: "Tags" });
    await userEvent.type(input, "v");
    await userEvent.keyboard("{Escape}");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(outer).not.toHaveBeenCalledWith(expect.objectContaining({ key: "Escape" }));
  });
});

describe("TagInput — FormField consumer", () => {
  it("takes id, description, invalid and required from the field", () => {
    render(
      <FormField label="Skills" hint="Press Enter to add" error="Add at least one" required>
        <TagInput />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /Skills/ });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Press Enter to add").id).not.toBe("");
    expect(describedBy).toContain(screen.getByText("Press Enter to add").id);
  });
});

describe("TagInput utils", () => {
  it("splitTags trims and drops empties", () => {
    expect(splitTags(" a, ,b\nc ", [",", "\n"])).toEqual(["a", "b", "c"]);
  });
  it("splitPending keeps the tail", () => {
    expect(splitPending("a,b, c", [","])).toEqual({ complete: ["a", "b"], tail: "c" });
  });
  it("filterSuggestions is case-insensitive and skips added tags", () => {
    expect(filterSuggestions(["Apple", "Grape"], "ap", ["Grape"], false)).toEqual(["Apple"]);
    expect(filterSuggestions(["Apple"], "", [], false)).toEqual([]);
  });
});
