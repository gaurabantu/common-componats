import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Combobox } from "./index";
import type { ComboboxGroup, ComboboxOption } from "./Combobox.types";

const flat: ComboboxOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

const withIcons: ComboboxOption[] = [
  {
    value: "in",
    label: "Inbox",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 4h16v16H4z" />
      </svg>
    ),
  },
  {
    value: "sent",
    label: "Sent",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

const grouped: ComboboxGroup[] = [
  {
    label: "Favorites",
    options: [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta" },
    ],
  },
  {
    label: "Other",
    options: [
      { value: "g", label: "Gamma" },
      { value: "d", label: "Delta" },
    ],
  },
];

const meta: Meta<typeof Combobox> = {
  title: "Design System/Molecules/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const surface = {
  padding: "var(--space-3, 24px)",
  maxWidth: 420,
  margin: "0 auto",
  background: "var(--color-bg-surface, #ffffff)",
  borderRadius: "var(--radius-md, 8px)",
  border: "1px solid var(--color-border-default, #999999)",
} as const;

export const SearchableSingle: Story = {
  name: "Search + single",
  render: function SearchSingle() {
    const [v, setV] = useState("en");
    return (
      <div style={surface}>
        <Combobox
          label="Language"
          placeholder="Choose language…"
          options={flat}
          searchable
          searchPlaceholder="Filter languages…"
          value={v}
          onValueChange={(next) => setV(typeof next === "string" ? next : v)}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  name: "Icon + label options",
  render: () => (
    <div style={surface}>
      <Combobox label="Folder" placeholder="Pick…" options={withIcons} defaultValue="in" />
    </div>
  ),
};

export const Grouped: Story = {
  name: "Grouped sections",
  render: () => (
    <div style={surface}>
      <Combobox label="Items" groups={grouped} defaultValue="b" searchable searchPlaceholder="Search…" />
    </div>
  ),
};

export const MultiSelect: Story = {
  name: "Multi-select",
  render: function Multi() {
    const [v, setV] = useState<string[]>(["en"]);
    return (
      <div style={surface}>
        <Combobox
          label="Locales"
          options={flat}
          multiple
          searchable
          value={v}
          onValueChange={(next) => setV(Array.isArray(next) ? next : v)}
        />
      </div>
    );
  },
};
