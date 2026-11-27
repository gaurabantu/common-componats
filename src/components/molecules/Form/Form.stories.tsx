import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "../../atoms/Button";
import TextArea from "../../atoms/TextArea";
import Input from "../../atoms/TextInput";
import Form from "./index";
import type { FormErrorSummaryItem } from "./Form.types";

const shellBackground = {
  background: "linear-gradient(135deg, var(--color-accent-sky-10) 0%, var(--color-accent-lavender-10) 100%)",
};

const footerNote = (text: string) => (
  <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-small-size)" }}>{text}</p>
);

const meta: Meta<typeof Form> = {
  title: "Design System/Molecules/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    storyPadding: false,
    docs: {
      description: {
        component:
          "Card-shell form that always renders a real `<form>`. Use `onSubmit` (native) or `onSubmitValues` (collected `FormData`), `noValidate` to skip browser validation, `loading` / `disabled` to disable every field through `<fieldset disabled>` (+ `aria-busy` and a polite status), and `errorSummary` for a WCAG 3.3.1 `role=\"alert\"` list whose links focus each field. `columns` accepts a number or `{ base, sm, md, lg }`. Style slots via `classNames` / `styles` (`shell`, `card`, `content`, `fields`); the old `*ClassName` / `*Style` props still work but are deprecated.",
      },
    },
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["stacked", "grid"] },
    columns: { control: "object" },
    titleAs: { control: "inline-radio", options: ["h1", "h2", "h3"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    noValidate: { control: "boolean" },
    loadingLabel: { control: "text" },
    errorSummaryTitle: { control: "text" },
    errorSummary: { control: "object" },
    gap: { control: "text" },
    children: { control: false },
    actions: { control: false },
    footer: { control: false },
  },
  args: {
    badge: "UI Common Components",
    title: "Reusable form",
    description: "A form shell for composing your own fields and actions.",
    layout: "stacked",
    columns: 2,
    maxWidth: 560,
    loading: false,
    disabled: false,
    styles: { shell: shellBackground },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

function ProfileFields() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  return (
    <>
      <Input id="profile-name" name="name" label="Full name" placeholder="Enter your name" value={name} onChange={setName} allowClear rounded="5" />
      <Input
        id="profile-email"
        name="email"
        label="Email address"
        type="email"
        validation="email"
        placeholder="name@example.com"
        value={email}
        onChange={setEmail}
        allowClear
        rounded="5"
      />
      <TextArea label="About" placeholder="Tell us about yourself" value={about} onChange={setAbout} rows={4} showCount maxLength={200} rounded="5" />
    </>
  );
}

export const Playground: Story = {
  render: (args) => (
    <Form
      {...args}
      onSubmit={(event) => event.preventDefault()}
      actions={
        <Button type="submit" variant="primary" size="lg" fullWidth loading={args.loading}>
          Save
        </Button>
      }
      footer={footerNote("Build your pages by composing fields inside the reusable form shell.")}
    >
      <ProfileFields />
    </Form>
  ),
};

export const Default: Story = {
  ...Playground,
};

export const GridLayout: Story = {
  render: (args) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [about, setAbout] = useState("");

    return (
      <Form
        {...args}
        onSubmit={(event) => event.preventDefault()}
        footer={footerNote('Use layout="grid" with columns={2} for side-by-side field design.')}
        actions={
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Create profile
          </Button>
        }
      >
        <Input label="First name" placeholder="First name" value={firstName} onChange={setFirstName} allowClear rounded="5" />
        <Input label="Last name" placeholder="Last name" value={lastName} onChange={setLastName} allowClear rounded="5" />
        <Input
          label="Email address"
          type="email"
          validation="email"
          placeholder="name@example.com"
          value={email}
          onChange={setEmail}
          allowClear
          rounded="5"
        />
        <Input
          label="Mobile number"
          type="tel"
          validation="mobile"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={setMobile}
          allowClear
          rounded="5"
        />
        <div style={{ gridColumn: "1 / -1" }}>
          <TextArea label="About" placeholder="Tell us about yourself" value={about} onChange={setAbout} rows={4} showCount maxLength={250} rounded="5" />
        </div>
      </Form>
    );
  },
  args: {
    title: "Grid form",
    description: "Arrange fields in two columns while allowing larger fields to span full width.",
    layout: "grid",
    columns: 2,
    maxWidth: 760,
  },
};

/** `columns={{ base: 1, sm: 2, lg: 3 }}` — resize the viewport (375 / 768 / 1440) to see 1 → 2 → 3 columns. */
export const ResponsiveColumns: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      {["City", "State", "Postal code", "Country", "Region", "Timezone"].map((label) => (
        <Input key={label} label={label} placeholder={label} rounded="5" />
      ))}
    </Form>
  ),
  args: {
    title: "Address",
    titleAs: "h2",
    description: "1 column on phones, 2 on tablets, 3 on desktop.",
    layout: "grid",
    columns: { base: 1, sm: 2, lg: 3 },
    maxWidth: 960,
  },
};

/** Submit empty to see the error summary; each link focuses its field. */
export const WithErrorSummary: Story = {
  render: (args) => {
    const [errors, setErrors] = useState<FormErrorSummaryItem[]>([]);
    return (
      <Form
        {...args}
        noValidate
        errorSummary={errors}
        onSubmitValues={(values) => {
          const next: FormErrorSummaryItem[] = [];
          if (!values.name) next.push({ fieldId: "err-name", message: "Enter your full name" });
          if (!values.email) next.push({ fieldId: "err-email", message: "Enter your email address" });
          setErrors(next);
        }}
        actions={
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Submit
          </Button>
        }
      >
        <Input
          id="err-name"
          name="name"
          label="Full name"
          required
          rounded="5"
          errorMessage={errors.some((e) => e.fieldId === "err-name") ? "Enter your full name" : undefined}
        />
        <Input
          id="err-email"
          name="email"
          type="email"
          label="Email address"
          required
          rounded="5"
          errorMessage={errors.some((e) => e.fieldId === "err-email") ? "Enter your email address" : undefined}
        />
      </Form>
    );
  },
  args: { title: "Create account", description: "All fields are required." },
};

/** `loading` disables every field via `<fieldset disabled>` and sets `aria-busy`; submit is blocked. */
export const Loading: Story = {
  ...Playground,
  args: { loading: true, loadingLabel: "Saving profile…" },
};

export const Disabled: Story = {
  ...Playground,
  args: { disabled: true },
};
