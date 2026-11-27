import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TagInput from "./index";
import FormField from "../FormField";
import type { TagInputProps } from "./TagInput.types";

const meta: Meta<typeof TagInput> = {
  title: "Design System/Molecules/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "TagInput collects a list of short values (skills, emails, labels) as removable chips. Type and press Enter, " +
          "type a delimiter (default `,`), or paste a list (commas, newlines and tabs split it). Backspace in an empty box " +
          "removes the last tag and announces it; ArrowLeft / ArrowRight move between chips; Delete removes the focused chip. " +
          "`validate(tag)` returns `true` or an error string (shown assertively, text stays in the box); `maxTags` and " +
          "`allowDuplicates` guard the list. Pass `suggestions` to get an APG combobox with a listbox. Controlled (`value` + " +
          "`onChange`) or uncontrolled (`defaultValue`). Inside a `FormField` it reads the field label, hint, error and required " +
          "state. Client-side validation is UX only; validate on the server too.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    allowDuplicates: { control: "boolean" },
    addOnBlur: { control: "boolean" },
    maxTags: { control: "number" },
    placeholder: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    onChange: { action: "onChange" },
    value: { control: false },
    validate: { control: false },
    labels: { control: false },
  },
  args: {
    label: "Tags",
    placeholder: "Add a tag…",
    size: "md",
    defaultValue: ["design", "react"],
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-page" style={{ maxWidth: "32rem" }}>
      <TagInput {...args} />
    </div>
  ),
};

function ControlledDemo(props: Partial<TagInputProps>) {
  const [tags, setTags] = useState<string[]>(["ops@example.com"]);
  return (
    <div className="sb-stack" style={{ maxWidth: "32rem" }}>
      <TagInput {...props} value={tags} onChange={setTags} />
      <p>Value: {JSON.stringify(tags)}</p>
    </div>
  );
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WithValidation: Story = {
  render: () => (
    <ControlledDemo
      label="Notify"
      placeholder="name@example.com"
      validate={(tag) => (EMAIL.test(tag) ? true : `"${tag}" is not a valid email`)}
      maxTags={5}
    />
  ),
};

export const WithSuggestions: Story = {
  args: {
    label: "Skills",
    defaultValue: [],
    suggestions: ["React", "Redux", "TypeScript", "Vue", "Svelte", "Node.js", "GraphQL", "Rust"],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "32rem" }}>
      <TagInput label="Small" size="sm" defaultValue={["one", "two"]} />
      <TagInput label="Medium" size="md" defaultValue={["one", "two"]} />
      <TagInput label="Large" size="lg" defaultValue={["one", "two"]} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "32rem" }}>
      <TagInput label="Disabled" disabled defaultValue={["locked"]} />
      <TagInput label="Read only" readOnly defaultValue={["finance", "q3"]} />
      <TagInput label="Error" error="Add at least one tag" />
    </div>
  ),
};

export const InFormField: Story = {
  render: () => (
    <div style={{ maxWidth: "32rem" }}>
      <FormField label="Labels" hint="Press Enter or comma to add" required>
        <TagInput placeholder="bug, ui…" />
      </FormField>
    </div>
  ),
};

export const ManyTagsMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: {
    label: "Long list",
    defaultValue: [
      "accessibility",
      "a-very-long-tag-name-that-should-truncate-inside-its-chip",
      "dark-mode",
      "forms",
      "responsive",
      "tokens",
    ],
  },
};
