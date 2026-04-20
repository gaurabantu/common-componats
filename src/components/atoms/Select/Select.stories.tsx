import type { Meta, StoryObj } from "@storybook/react";
import Select from "./index";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Design System/Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
  argTypes: {
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    status: { control: "select", options: ["error", "warning", "success", undefined] },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", disabled: true },
];

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <Select
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onValueChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Choose option",
    options,
    placeholder: "Select...",
    value: "",
    size: "md",
  },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Selected",
    options,
    value: "2",
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Required field",
    options,
    placeholder: "Select...",
    error: "This field is required",
    status: "error",
  },
};

export const WithHelperText: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Country",
    options: [
      { label: "India", value: "in" },
      { label: "USA", value: "us" },
      { label: "UK", value: "uk" },
    ],
    helperText: "Select your country of residence",
  },
};

export const WithGroups: Story = {
  name: "Grouped (optgroup)",
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Region",
    groups: [
      { label: "North America", options: [{ label: "USA", value: "us" }, { label: "Canada", value: "ca" }] },
      { label: "Europe", options: [{ label: "UK", value: "uk" }, { label: "France", value: "fr" }] },
    ],
    placeholder: "Choose…",
    value: "",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    options,
    value: "1",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState("");
    const [medium, setMedium] = useState("");
    const [large, setLarge] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        <Select
          label="Small"
          options={options}
          value={small}
          onValueChange={(value) => setSmall(value)}
          size="sm"
        />
        <Select
          label="Medium"
          options={options}
          value={medium}
          onValueChange={(value) => setMedium(value)}
          size="md"
        />
        <Select
          label="Large"
          options={options}
          value={large}
          onValueChange={(value) => setLarge(value)}
          size="lg"
        />
      </div>
    );
  },
};
