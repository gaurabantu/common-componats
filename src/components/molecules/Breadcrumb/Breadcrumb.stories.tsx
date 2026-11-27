import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./index";
import type { BreadcrumbItemData } from "./Breadcrumb.types";

const longTrail: BreadcrumbItemData[] = [
  { label: "Home", href: "#home" },
  { label: "Billing", href: "#billing" },
  { label: "Invoices", href: "#invoices" },
  { label: "2026", href: "#2026" },
  { label: "November", href: "#november" },
  { label: "INV-104" },
];

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" focusable="false">
    <path d="M8 1.5 1 7.2V15h5v-4.5h4V15h5V7.2L8 1.5Z" />
  </svg>
);

const meta: Meta<typeof Breadcrumb> = {
  title: "Design System/Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Landmark navigation for the current page's location. Pass `items` (data API) or `BreadcrumbItem` children. " +
          "Set `maxItems` to collapse the middle of long trails into an accessible \"Show N more\" button; trails longer than " +
          "three segments also collapse automatically at ≤ 640px (`responsiveCollapse`). `separator` takes `\"slash\"`, " +
          "`\"chevron\"` or any decorative node. Use `renderLink` (or `asChild` on `BreadcrumbItem`) for router links such as " +
          "Next `<Link>`. Unsafe hrefs (`javascript:`, `data:` …) are dropped and render as text.",
      },
    },
  },
  argTypes: {
    separator: { control: "radio", options: ["slash", "chevron"] },
    size: { control: "radio", options: ["sm", "md"] },
    maxItems: { control: { type: "number", min: 2, max: 8 } },
    itemsBeforeCollapse: { control: { type: "number", min: 0, max: 4 } },
    itemsAfterCollapse: { control: { type: "number", min: 0, max: 4 } },
    responsiveCollapse: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {
  args: {
    ariaLabel: "Breadcrumb",
    separator: "slash",
    size: "sm",
    items: longTrail,
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    responsiveCollapse: true,
  },
};

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumb>
  ),
  args: {
    ariaLabel: "Breadcrumb",
    separator: "slash",
    size: "sm",
  },
};

export const ItemsApi: Story = {
  name: "Items (data API)",
  args: {
    items: [
      { label: "Home", href: "#home", icon: <HomeIcon /> },
      { label: "Settings", href: "#settings" },
      { label: "Profile" },
    ],
  },
};

export const Collapsed: Story = {
  args: { items: longTrail, maxItems: 3 },
};

export const CollapsedKeepTwoEachSide: Story = {
  args: { items: longTrail, maxItems: 4, itemsBeforeCollapse: 2, itemsAfterCollapse: 2 },
};

export const Chevron: Story = {
  render: () => (
    <Breadcrumb separator="chevron" size="md">
      <BreadcrumbItem href="/app">App</BreadcrumbItem>
      <BreadcrumbItem href="/app/settings">Settings</BreadcrumbItem>
      <BreadcrumbItem>Profile</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: <span>›</span>,
    items: longTrail.slice(0, 3),
  },
};

export const CurrentWithHref: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem href="/docs/api" current>
        API
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/** Stand-in for a router `<Link>` (e.g. Next.js) — receives href + className + aria-current. */
const RouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function RouterLink(props, ref) {
    return <a ref={ref} data-router-link="" {...props} />;
  },
);

export const RouterLinks: Story = {
  render: () => (
    <div className="sb-stack">
      <Breadcrumb
        ariaLabel="Breadcrumb (renderLink)"
        items={longTrail.slice(0, 3)}
        renderLink={({ href, className, children, ...rest }) => (
          <RouterLink href={href} className={className} {...rest}>
            {children}
          </RouterLink>
        )}
      />
      <Breadcrumb ariaLabel="Breadcrumb (asChild)">
        <BreadcrumbItem asChild>
          <RouterLink href="#home">Home</RouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem asChild current>
          <RouterLink href="#reports">Reports</RouterLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  ),
};

export const Mobile: Story = {
  args: { items: longTrail },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
