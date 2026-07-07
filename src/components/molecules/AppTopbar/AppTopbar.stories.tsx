import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import AppTopbar from "./index";
import type { AppTopbarProps } from "./AppTopbar.types";

type AppTopbarStoryArgs = AppTopbarProps & { showSearch?: boolean };

const bellIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const plusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const meta: Meta<AppTopbarStoryArgs> = {
  title: "Design System/Molecules/AppTopbar",
  component: AppTopbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    theme: { control: "radio", options: ["dark", "light"] },
    title: { control: "text" },
    titleAs: { control: "radio", options: ["h1", "h2"] },
    sticky: { control: "boolean" },
    responsive: { control: "boolean" },
    showSearch: {
      control: "boolean",
      description: "Toggle search region visibility (story-only control)",
    },
    search: { control: false },
    actions: { control: false },
    profile: { control: false },
    mobileMenuItems: { control: false },
    onMobileMenuClick: { control: false },
    centerSlot: { control: false },
    leftSlot: { control: false },
    rightSlot: { control: false },
  },
};

export default meta;

type Story = StoryObj<AppTopbarStoryArgs>;

export const Playground: Story = {
  render: function PlaygroundDemo(args) {
    const { showSearch, ...topbarArgs } = args;
    return (
      <AppTopbar
        {...topbarArgs}
        search={
          showSearch !== false
            ? topbarArgs.search ?? { value: "", onChange: () => {}, placeholder: "Search..." }
            : undefined
        }
      />
    );
  },
  args: {
    theme: "dark",
    title: "Revenue",
    titleAs: "h1",
    showSearch: true,
    sticky: true,
    search: {
      value: "",
      onChange: () => {},
      placeholder: "Search...",
    },
    actions: [
      { id: "create", icon: plusIcon, label: "Create", variant: "outlinePrimary", onClick: () => {} },
      { id: "notify", icon: bellIcon, label: "Notifications", badgeCount: 3, onClick: () => {} },
    ],
    profile: { name: "Alex Morgan", onClick: () => {} },
  },
  decorators: [
    (StoryEl) => (
      <div style={{ minHeight: "100vh", background: "var(--color-noir-80)" }}>
        <StoryEl />
        <p style={{ color: "var(--color-noir-20)", padding: 24 }}>Page content scrolls under the sticky bar.</p>
      </div>
    ),
  ],
};

export const DarkFull: Story = {
  args: {
    theme: "dark",
    title: "Revenue",
    titleAs: "h1",
    search: {
      value: "",
      onChange: () => {},
      placeholder: "Search...",
    },
    actions: [
      { id: "create", icon: plusIcon, label: "Create", variant: "outlinePrimary", onClick: () => {} },
      { id: "notify", icon: bellIcon, label: "Notifications", badgeCount: 3, onClick: () => {} },
    ],
    profile: { name: "Alex Morgan", onClick: () => {} },
    sticky: true,
  },
  decorators: [
    (StoryEl) => (
      <div style={{ minHeight: "100vh", background: "var(--color-noir-80)" }}>
        <StoryEl />
        <p style={{ color: "var(--color-noir-20)", padding: 24 }}>Page content scrolls under the sticky bar.</p>
      </div>
    ),
  ],
};

export const LightMinimal: Story = {
  args: {
    theme: "light",
    title: "Settings",
    search: {
      placeholder: "Search workspace…",
    },
    actions: [{ id: "notify", icon: bellIcon, label: "Notifications", badgeDot: true, onClick: () => {} }],
  },
};

export const MobileNav: Story = {
  args: {
    theme: "dark",
    title: "Overview",
    mobileMenuItems: [
      { id: "nav", label: "Open navigation", onClick: () => {} },
      { id: "new", label: "New item", onClick: () => {} },
      { id: "help", label: "Help", href: "#help" },
    ],
    search: { placeholder: "Search...", showClearButton: true },
    actions: [{ id: "n", icon: bellIcon, label: "Notifications", onClick: () => {} }],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const MobileSidebarOnly: Story = {
  args: {
    theme: "dark",
    title: "Legacy",
    onMobileMenuClick: () => {},
    search: { placeholder: "Search..." },
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const ControlledSearch: Story = {
  render: function Controlled() {
    const [q, setQ] = useState("");
    return (
      <AppTopbar
        theme="dark"
        title="Command"
        search={{
          value: q,
          onChange: setQ,
          onSearch: (v) => {
            console.log("search", v);
          },
        }}
      />
    );
  },
};
