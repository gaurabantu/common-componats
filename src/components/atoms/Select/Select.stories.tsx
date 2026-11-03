import type { Meta, StoryObj } from "@storybook/react";
import Select from "./index";
import { useState } from "react";
import Input from "../TextInput";
import Button from "../Button";
import FormField from "../../molecules/FormField";

const meta: Meta<typeof Select> = {
  title: "Design System/Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    storyMedium: true,
    docs: {
      description: {
        component:
          "Native `<select>` with token-driven heights that match `Input` (sm `--button-height-sm`, md `--button-height-lg`, lg `3rem`), so it lines up with Input and Button in toolbars. Keyboard focus stays on the control after a selection in every mode; the animated chevron follows the picker state instead of focus. Pass `name` / `required` / `id` / `aria-describedby` / `aria-invalid` like a native select; an `error` string sets `aria-invalid` and is linked as the description. Inside a `FormField` it reads the field label, hint, error and required state via `useFormField()` (explicit props win).",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    status: { control: "select", options: ["error", "warning", "success", undefined] },
    error: { control: "text" },
    helperText: { control: "text" },
    animatedChevron: { control: "boolean" },
    fullWidth: { control: "boolean" },
    name: { control: "text" },
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

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Choose option",
    options,
    placeholder: "Select...",
    value: "",
    size: "md",
  },
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

/** Pick with mouse or keyboard (Tab, then Alt+ArrowDown / Space, choose, Enter): focus stays on the select and the chevron returns to rest. */
export const FocusRetention: Story = {
  name: "Focus retention after change",
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="sb-stack" style={{ maxWidth: 320 }}>
        <Select label="Animated chevron (default)" options={options} value={value} onValueChange={setValue} />
        <Select label="Static chevron" animatedChevron={false} options={options} value={value} onValueChange={setValue} />
        <Button size="lg">Next control</Button>
      </div>
    );
  },
};

/** Select md, Input md and Button lg share one height token, so a toolbar row lines up. */
export const ToolbarAlignment: Story = {
  name: "Heights — toolbar alignment",
  render: () => (
    <div className="sb-stack">
      <div className="sb-inline" style={{ alignItems: "flex-end" }}>
        <Select aria-label="Status (sm)" size="sm" fullWidth={false} options={options} defaultValue="1" />
        <Input size="sm" placeholder="Search (sm)" aria-label="Search (sm)" />
        <Button size="sm">Apply</Button>
      </div>
      <div className="sb-inline" style={{ alignItems: "flex-end" }}>
        <Select aria-label="Status (md)" size="md" fullWidth={false} options={options} defaultValue="1" />
        <Input size="md" placeholder="Search (md)" aria-label="Search (md)" />
        <Button size="lg">Apply</Button>
      </div>
      <div className="sb-inline" style={{ alignItems: "flex-end" }}>
        <Select aria-label="Status (lg)" size="lg" fullWidth={false} options={options} defaultValue="1" />
        <Input size="lg" placeholder="Search (lg)" aria-label="Search (lg)" />
      </div>
    </div>
  ),
};

/** Native form: `name` + `required` take part in FormData and constraint validation. */
export const InNativeForm: Story = {
  name: "Native form (name / required)",
  render: () => {
    const [submitted, setSubmitted] = useState<string | null>(null);
    return (
      <form
        className="sb-stack"
        style={{ maxWidth: 320 }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(String(new FormData(e.currentTarget).get("plan")));
        }}
      >
        <Select label="Plan" name="plan" required options={options} defaultValue="" placeholder="Choose a plan" />
        <Button type="submit" size="lg">Submit</Button>
        <p role="status">{submitted ? `Submitted plan=${submitted}` : ""}</p>
      </form>
    );
  },
};

/** Inside FormField: label, hint, error and required come from the field. */
export const InFormField: Story = {
  name: "In FormField",
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ maxWidth: 360 }}>
        <FormField
          label="Region"
          hint="Used for billing"
          required
          error={value ? undefined : "Choose a region"}
        >
          <Select options={options} value={value} onValueChange={setValue} placeholder="Choose…" />
        </FormField>
      </div>
    );
  },
};
