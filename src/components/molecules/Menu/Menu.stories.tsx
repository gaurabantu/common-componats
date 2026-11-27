import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "./index";
import type { MenuPlacement } from "./Menu.types";
import { MENU_PLACEMENTS } from "./Menu.config";
import Button from "../../atoms/Button";

const EditIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
  </svg>
);
const TrashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
  </svg>
);

interface PlaygroundArgs {
  placement: MenuPlacement;
  loop: boolean;
  disabledItem: boolean;
}

const meta: Meta<PlaygroundArgs> = {
  title: "Design System/Molecules/Menu",
  component: MenuContent as unknown as React.ComponentType<PlaygroundArgs>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "APG menu button (`DropdownMenu` alias when imported from this module). `MenuTrigger` (use `asChild` with a library `Button`) opens a portalled `role=\"menu\"` that flips to stay in the viewport. Keyboard: Enter / Space / ArrowDown open on the first item, ArrowUp on the last; ArrowUp/Down, Home/End and typeahead move focus; ArrowRight/Left open/close submenus; Escape closes one level and returns focus; Tab closes the menu. Items: plain (`variant=\"danger\"` for destructive), checkbox, radio (in a labelled `MenuRadioGroup`), groups, separators, link rows (`href`, unsafe schemes dropped), disabled, and `shortcut={[\"mod\",\"k\"]}` rendered with `Kbd` + `aria-keyshortcuts`. Rows are 44px on touch devices.",
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: MENU_PLACEMENTS },
    loop: { control: "boolean" },
    disabledItem: { control: "boolean", name: "Disable 'Archive'" },
  },
  args: { placement: "bottom-start", loop: true, disabledItem: true },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({ placement, loop, disabledItem }) => (
    <div className="sb-page">
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outlineSecondary" size="md">
            Actions
          </Button>
        </MenuTrigger>
        <MenuContent placement={placement} loop={loop}>
          <MenuItem icon={EditIcon} shortcut={["mod", "e"]}>
            Edit
          </MenuItem>
          <MenuItem shortcut={["mod", "d"]}>Duplicate</MenuItem>
          <MenuItem disabled={disabledItem} description="Moves the project to the archive">
            Archive
          </MenuItem>
          <MenuSub>
            <MenuSubTrigger>Share</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Email link</MenuItem>
              <MenuItem>Copy link</MenuItem>
              <MenuSub>
                <MenuSubTrigger>More apps</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>Slack</MenuItem>
                  <MenuItem>Teams</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuSubContent>
          </MenuSub>
          <MenuSeparator />
          <MenuItem variant="danger" icon={TrashIcon} shortcut={["mod", "backspace"]}>
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const CheckboxAndRadio: Story = {
  render: () => {
    const [grid, setGrid] = useState(true);
    const [rulers, setRulers] = useState(false);
    const [density, setDensity] = useState("comfortable");
    return (
      <div className="sb-page sb-stack">
        <Menu>
          <MenuTrigger asChild>
            <Button variant="outlineSecondary" size="md">
              View
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuGroup label="Show">
              <MenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
                Grid
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={rulers} onCheckedChange={setRulers}>
                Rulers
              </MenuCheckboxItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuRadioGroup label="Density" value={density} onValueChange={setDensity}>
              <MenuRadioItem value="compact">Compact</MenuRadioItem>
              <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
              <MenuRadioItem value="spacious">Spacious</MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
        <span aria-live="polite">
          Grid {grid ? "on" : "off"}, rulers {rulers ? "on" : "off"}, density {density}
        </span>
      </div>
    );
  },
};

export const LinksAndGroups: Story = {
  render: () => (
    <div className="sb-page">
      <Menu>
        <MenuTrigger>Account</MenuTrigger>
        <MenuContent>
          <MenuGroup label="Signed in as demo@example.com">
            <MenuItem href="#profile">Profile</MenuItem>
            <MenuItem href="#settings">Settings</MenuItem>
            <MenuItem href="https://example.com/help" target="_blank" description="Opens in a new tab">
              Help centre
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem variant="danger">Sign out</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};

export const EdgeFlip: Story = {
  parameters: {
    docs: { description: { story: "Trigger at the bottom-right corner: the menu flips upward and its submenu flips left." } },
  },
  render: () => (
    <div className="sb-page" style={{ minHeight: "22rem", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
      <Menu>
        <MenuTrigger>Near the edge</MenuTrigger>
        <MenuContent placement="bottom-end">
          <MenuItem>First</MenuItem>
          <MenuSub>
            <MenuSubTrigger>Submenu</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Nested one</MenuItem>
              <MenuItem>Nested two</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>Last</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};
