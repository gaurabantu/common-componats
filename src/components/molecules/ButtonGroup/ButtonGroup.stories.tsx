import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../../atoms/Button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./index";

const meta: Meta<typeof ButtonGroup> = {
  title: "Design System/Molecules/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Groups related buttons under `role=\"group\"` — always give it an `aria-label`. Segments are joined by default " +
          "(`attached`); set `attached={false}` for spaced buttons. `size`, `variant` and `disabled` cascade to direct " +
          "`Button` children that leave those props unset (child props win; nested groups inherit). `fullWidth` stretches " +
          "the group and shares the width equally. Components that wrap a Button can read the group via `useButtonGroupContext()`.",
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    attached: { control: "boolean" },
    size: { control: "select", options: [undefined, "xxs", "xs", "sm", "md", "lg"] },
    variant: {
      control: "select",
      options: [
        undefined,
        "primary",
        "secondary",
        "outlinePrimary",
        "outlineSecondary",
        "success",
        "danger",
        "warning",
        "ghost",
      ],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args} aria-label="Document actions">
      <Button>Archive</Button>
      <Button>Report</Button>
      <Button>Snooze</Button>
    </ButtonGroup>
  ),
  args: {
    orientation: "horizontal",
    attached: true,
    size: "md",
    variant: "outlinePrimary",
    disabled: false,
    fullWidth: false,
  },
};

export const Basic: Story = {
  render: () => (
    <ButtonGroup aria-label="Document actions">
      <Button variant="outlinePrimary" size="md">
        Archive
      </Button>
      <Button variant="outlinePrimary" size="md">
        Report
      </Button>
      <Button variant="outlinePrimary" size="md">
        Snooze
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup aria-label="Editor actions">
      <Button variant="secondary" size="md">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="md">
        Paste
      </Button>
    </ButtonGroup>
  ),
};

export const SplitButton: Story = {
  render: () => (
    <ButtonGroup aria-label="Add item">
      <Button variant="primary" size="md">
        Button
      </Button>
      <ButtonGroupSeparator />
      <Button variant="primary" size="md" aria-label="More options">
        +
      </Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Vertical actions">
      <Button variant="outlineSecondary" size="sm">
        One
      </Button>
      <Button variant="outlineSecondary" size="sm">
        Two
      </Button>
      <Button variant="outlineSecondary" size="sm">
        Three
      </Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup aria-label="Search with label">
      <ButtonGroupText>Search</ButtonGroupText>
      <Button variant="ghost" size="md">
        Go
      </Button>
    </ButtonGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ButtonGroup aria-label="Toolbar">
      <ButtonGroup>
        <Button variant="outlinePrimary" size="sm">
          A
        </Button>
        <Button variant="outlinePrimary" size="sm">
          B
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outlinePrimary" size="sm">
          C
        </Button>
        <Button variant="outlinePrimary" size="sm">
          D
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const Detached: Story = {
  render: () => (
    <ButtonGroup aria-label="Spaced actions" attached={false} size="md" variant="outlineSecondary">
      <Button>Cancel</Button>
      <Button>Save draft</Button>
      <Button variant="primary">Publish</Button>
    </ButtonGroup>
  ),
};

export const CascadedSizeAndVariant: Story = {
  render: () => (
    <div className="sb-stack">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup key={size} aria-label={`Size ${size}`} size={size} variant="outlinePrimary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ButtonGroup aria-label="Disabled actions" disabled size="md" variant="outlinePrimary">
      <Button>Archive</Button>
      <Button>Report</Button>
      <Button disabled={false}>Help (opted out)</Button>
    </ButtonGroup>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <ButtonGroup aria-label="View mode" fullWidth size="md" variant="outlineSecondary">
      <Button>List</Button>
      <Button>Board</Button>
      <Button>Calendar</Button>
    </ButtonGroup>
  ),
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
