import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./index";

const meta: Meta<typeof CodeBlock> = {
  title: "Design System/Molecules/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Read-only source panel with copy-to-clipboard and a polite live-region announcement. Content renders as plain text — safe for user-provided snippets.",
      },
    },
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["dark", "light"] },
  },
  args: {
    code: 'import "ui-common-components/design-system/tokens.css";\nimport "ui-common-components/index.css";',
    language: "tsx",
    title: "app/layout.tsx",
    tone: "dark",
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Playground: Story = {};

export const Minimal: Story = {
  args: { title: undefined, language: undefined, code: "npm install ui-common-components" },
};

export const Light: Story = {
  args: { tone: "light" },
};

export const LineNumbers: Story = {
  args: {
    title: "tailwind.config.js",
    language: "js",
    showLineNumbers: true,
    code: `module.exports = {
  presets: [require("ui-common-components/tailwind.preset.js")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ui-common-components/dist/**/*.js",
  ],
};`,
  },
};
