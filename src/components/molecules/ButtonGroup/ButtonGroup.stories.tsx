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
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

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
