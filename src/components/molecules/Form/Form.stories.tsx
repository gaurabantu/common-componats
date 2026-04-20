import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "../../atoms/Button";
import TextArea from "../../atoms/TextArea";
import Input from "../../atoms/TextInput";
import Form from "./index";

const meta: Meta<typeof Form> = {
  title: "Design System/Molecules/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", storyPadding: false },
  argTypes: {
    layout: { control: "select", options: ["stacked", "grid"] },
    columns: { control: { type: "number", min: 1, max: 4 } },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");

    return (
      <Form
        {...args}
        onSubmit={(event) => event.preventDefault()}
        actions={
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Save
          </Button>
        }
        footer={
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary, #757575)",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Build your pages by composing fields inside the reusable form shell.
          </p>
        }
      >
        <Input
          label="Full name"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
          allowClear
          rounded="5"
        />
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
        <TextArea
          label="About"
          placeholder="Tell us about yourself"
          value={about}
          onChange={setAbout}
          rows={4}
          showCount
          maxLength={200}
          rounded="5"
        />
      </Form>
    );
  },
  args: {
    badge: "UI Common Components",
    title: "Reusable form",
    description: "A form shell for composing your own fields and actions.",
    layout: "stacked",
    columns: 2,
    maxWidth: 560,
    shellStyle: {
      background:
        "linear-gradient(135deg, var(--color-accent-sky-10, #E6F2FF) 0%, var(--color-accent-lavender-10, #EEE7FF) 100%)",
    },
  },
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
        footer={
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary, #757575)",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Use `layout="grid"` with `columns={2}` for side-by-side field design.
          </p>
        }
        actions={
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Create profile
          </Button>
        }
      >
        <Input
          label="First name"
          placeholder="First name"
          value={firstName}
          onChange={setFirstName}
          allowClear
          rounded="5"
        />
        <Input
          label="Last name"
          placeholder="Last name"
          value={lastName}
          onChange={setLastName}
          allowClear
          rounded="5"
        />
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
          <TextArea
            label="About"
            placeholder="Tell us about yourself"
            value={about}
            onChange={setAbout}
            rows={4}
            showCount
            maxLength={250}
            rounded="5"
          />
        </div>
      </Form>
    );
  },
  args: {
    badge: "UI Common Components",
    title: "Grid form",
    description: "Arrange fields in two columns while allowing larger fields to span full width.",
    layout: "grid",
    columns: 2,
    maxWidth: 760,
    shellStyle: {
      background:
        "linear-gradient(135deg, var(--color-accent-lavender-10, #EEE7FF) 0%, var(--color-accent-sky-10, #E6F2FF) 100%)",
    },
  },
};
