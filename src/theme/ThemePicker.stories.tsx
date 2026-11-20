import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/atoms/Button";
import { ThemePicker, ThemeToggle, useTheme } from "./ThemeProvider";
import { initTheme } from "./themeController";

const meta: Meta<typeof ThemePicker> = {
  title: "Design System/Theming/ThemePicker",
  component: ThemePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Runtime theme selection. `tokens.css` defines every theme as a `data-theme` block; `initTheme()` / `setTheme()` choose one, keep `color-scheme` and `<meta name=\"theme-color\">` in step, remember the choice (localStorage) and can follow the OS (`\"system\"`). Apps never hard-code `data-theme`. Storage is off in these stories so the toolbar Theme stays in charge after you leave.",
      },
    },
  },
  args: { themes: ["infinia-light", "infinia-dark"], includeSystem: true },
};
export default meta;

type Story = StoryObj<typeof ThemePicker>;

function CurrentTheme() {
  const { theme, preference } = useTheme();
  return (
    <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
      preference <code>{preference}</code> → applied <code>{theme.id}</code> ({theme.mode})
    </p>
  );
}

function Demo(props: React.ComponentProps<typeof ThemePicker>) {
  useEffect(() => {
    initTheme({ defaultTheme: "infinia-light", storageKey: null, system: { light: "infinia-light", dark: "infinia-dark" } });
  }, []);
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <ThemePicker {...props} />
        <ThemeToggle />
      </div>
      <CurrentTheme />
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="outlinePrimary">Outline</Button>
      </div>
    </div>
  );
}

export const InfiniaOnly: Story = { render: (args) => <Demo {...args} /> };

export const AllThemes: Story = {
  args: { themes: undefined, includeSystem: false },
  render: (args) => <Demo {...args} />,
};
