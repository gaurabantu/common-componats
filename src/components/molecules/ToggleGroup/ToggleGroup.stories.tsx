import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ToggleGroup from "./index";
import ToggleButton from "../../atoms/ToggleButton";

const meta: Meta<typeof ToggleGroup> = {
  title: "Design System/Molecules/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const Glyph = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d={d} />
  </svg>
);

/** Bold / Italic / Underline — `type="multiple"`, icon-only children with `ariaLabel`. */
export const TextFormatting: Story = {
  render: () => {
    const [v, setV] = useState<string[]>(["bold"]);
    return (
      <div style={{ display: "grid", gap: 8 }}>
        <ToggleGroup type="multiple" ariaLabel="Text formatting" value={v} onValueChange={setV}>
          <ToggleButton value="bold" ariaLabel="Bold" icon={<Glyph d="M4 3h5a3 3 0 0 1 0 6H4zM4 9h6a3 3 0 0 1 0 6H4z" />} />
          <ToggleButton value="italic" ariaLabel="Italic" icon={<Glyph d="M10 3H6M10 13H6M9 3L7 13" />} />
          <ToggleButton value="underline" ariaLabel="Underline" icon={<Glyph d="M4 3v5a4 4 0 0 0 8 0V3M3 14h10" />} />
        </ToggleGroup>
        <code style={{ fontSize: "var(--text-small-size)" }}>{JSON.stringify(v)}</code>
      </div>
    );
  },
};

/** Alignment — `type="single"` via the `items` prop. */
export const Alignment: Story = {
  args: {
    type: "single",
    ariaLabel: "Text alignment",
    defaultValue: "left",
    items: [
      { value: "left", ariaLabel: "Align left", icon: <Glyph d="M2 4h12M2 8h8M2 12h10" /> },
      { value: "center", ariaLabel: "Align centre", icon: <Glyph d="M2 4h12M4 8h8M3 12h10" /> },
      { value: "right", ariaLabel: "Align right", icon: <Glyph d="M2 4h12M6 8h8M4 12h10" /> },
    ],
  },
};

/** Text items, outline variant (filter chips). */
export const OutlineTextItems: Story = {
  args: {
    type: "multiple",
    ariaLabel: "Entities",
    variant: "outline",
    size: "xs",
    defaultValue: ["uae"],
    items: [
      { value: "uae", label: "UAE" },
      { value: "ksa", label: "KSA" },
      { value: "uk", label: "UK" },
      { value: "us", label: "US", disabled: true },
    ],
  },
};
