import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import AppSidebar from "./index";
import Icon from "../../atoms/Icon";
import type { AppSidebarNavItem, AppSidebarSection } from "./AppSidebar.types";

const gridIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const chatIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3v-3H5a8 8 0 0 1-8-8 8 8 0 0 1 16-8 8 8 0 0 1 8 8z" />
  </svg>
);

const folderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 6h6l2 2h8v10H4z" />
  </svg>
);

const gearIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
  </svg>
);

const logoutIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M10 17l5-5-5-5M15 12H3M21 21V3" />
  </svg>
);

const workspaceChildren: AppSidebarNavItem[] = [
  { id: "ws-1", label: "Northwind", icon: folderIcon },
  { id: "ws-2", label: "Contoso", icon: folderIcon, trailing: "lock", trailingLabel: "Restricted" },
];

const sections: AppSidebarSection[] = [
  {
    id: "primary",
    tier: "primary",
    grouping: "spacing",
    items: [
      { id: "dash", label: "Dashboard", icon: gridIcon },
      {
        id: "chat",
        label: "Chat",
        icon: chatIcon,
        defaultExpanded: true,
        children: workspaceChildren,
        createAction: { label: "Create workspace", onClick: () => {} },
      },
    ],
  },
  {
    id: "secondary",
    tier: "secondary",
    grouping: "label",
    label: "Tools",
    items: [
      { id: "files", label: "Drive", icon: folderIcon },
      { id: "agents", label: "Agents", icon: gridIcon, trailing: "check", trailingLabel: "Configured" },
    ],
  },
  {
    id: "tertiary",
    tier: "tertiary",
    grouping: "divider",
    items: [
      { id: "market", label: "Marketplace", icon: gridIcon },
      { id: "settings", label: "Settings", icon: gearIcon },
    ],
  },
];

const meta: Meta<typeof AppSidebar> = {
  title: "Design System/Molecules/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh", background: "#e5e5e5" }}>
        <Story />
        <main
          style={{
            marginLeft: 320,
            padding: 24,
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          <p style={{ marginTop: 0, color: "#525252" }}>Content margin-left 320px when expanded</p>
        </main>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const GovernanceNoir: Story = {
  render: function Render() {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState<string | null>("ws-1");
    return (
      <AppSidebar
        fixed={false}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        activeItemId={active}
        onItemSelect={(id) => setActive(id)}
        header={{
          icon: <Icon src={gridIcon} decorative width={24} height={24} color="currentColor" />,
          title: "Control",
          subtitle: "Workspace",
        }}
        sections={sections}
        user={{
          name: "Jordan Lee",
          role: "Admin · Engineering",
          onClick: () => {},
        }}
        footerActions={[{ id: "logout", icon: logoutIcon, label: "Log out", onClick: () => {} }]}
      />
    );
  },
};

export const CollapsedRail: Story = {
  render: function Render() {
    const [active, setActive] = useState<string | null>("dash");
    return (
      <AppSidebar
        fixed={false}
        defaultCollapsed
        activeItemId={active}
        onItemSelect={(id) => setActive(id)}
        header={{
          icon: <Icon src={gridIcon} decorative width={24} height={24} />,
          title: "App",
          subtitle: "Ops",
        }}
        sections={sections}
        user={{ name: "Jordan Lee", role: "Admin", onClick: () => {} }}
        footerActions={[{ id: "logout", icon: logoutIcon, label: "Log out", onClick: () => {} }]}
      />
    );
  },
};
