import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Hyperlink from "./index";
import { HYPERLINK_SIZES, HYPERLINK_UNDERLINES, HYPERLINK_VARIANTS } from "./Hyperlink.config";

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" focusable="false">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" focusable="false">
    <path d="M4 1.5h5l3 3v10H4z M9 1.5v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof Hyperlink> = {
  title: "Design System/Atoms/Hyperlink",
  component: Hyperlink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text link. `variant` sets the role (`default` UI link, `subtle` meta link, `inline` inside running text — always underlined and inherits font size, `standalone` emphasised call-to-action). `underline` and `size` fine-tune. `href` is sanitised (`javascript:`/`data:` are dropped). `openInNewTab` adds `target=\"_blank\"`, `rel=\"noopener noreferrer\"`, an external icon and a visually hidden \"(opens in new tab)\". `disabled` removes the href and exposes `aria-disabled`. For router links use `asChild`: `<Hyperlink asChild><Link href=\"/x\">X</Link></Hyperlink>`.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
    href: { control: "text" },
    variant: { control: "inline-radio", options: HYPERLINK_VARIANTS },
    underline: { control: "inline-radio", options: [undefined, ...HYPERLINK_UNDERLINES] },
    size: { control: "inline-radio", options: [undefined, ...HYPERLINK_SIZES] },
    openInNewTab: { control: "boolean" },
    external: { control: "boolean" },
    disabled: { control: "boolean" },
    asChild: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Hyperlink>;

export const Playground: Story = {
  args: {
    children: "Design system link",
    href: "#",
    variant: "default",
  },
};

export const Default: Story = {
  args: {
    children: "Design system link",
    href: "#",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Hyperlink {...args} href="#" variant="default">
        Default — account settings
      </Hyperlink>
      <Hyperlink {...args} href="#" variant="subtle">
        Subtle — privacy policy
      </Hyperlink>
      <p>
        Inline — read the{" "}
        <Hyperlink {...args} href="#" variant="inline">
          migration guide
        </Hyperlink>{" "}
        before upgrading; it inherits this paragraph&apos;s size.
      </p>
      <Hyperlink {...args} href="#" variant="standalone" trailingIcon={<ArrowRight />}>
        Standalone — view all invoices
      </Hyperlink>
    </div>
  ),
};

export const Underline: Story = {
  render: (args) => (
    <div className="sb-inline">
      {HYPERLINK_UNDERLINES.map((underline) => (
        <Hyperlink key={underline} {...args} href="#" underline={underline}>
          underline=&quot;{underline}&quot;
        </Hyperlink>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-inline">
      {HYPERLINK_SIZES.map((size) => (
        <Hyperlink key={size} {...args} href="#" size={size}>
          size {size}
        </Hyperlink>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Hyperlink {...args} href="#" leadingIcon={<DocIcon />}>
        API reference
      </Hyperlink>
      <Hyperlink {...args} href="#" variant="standalone" trailingIcon={<ArrowRight />}>
        Continue
      </Hyperlink>
    </div>
  ),
};

export const NewTab: Story = {
  args: {
    children: "Opens in new tab",
    href: "https://example.com",
    openInNewTab: true,
  },
};

export const External: Story = {
  args: {
    children: "External, same tab",
    href: "https://example.com",
    external: true,
  },
  parameters: {
    docs: { description: { story: "`external` without `openInNewTab`: secure `rel` and the external icon, no new-tab announcement." } },
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled link",
    href: "#",
    disabled: true,
  },
};

const FakeRouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function FakeRouterLink(props, ref) {
    return <a ref={ref} data-router-link="" {...props} />;
  },
);

export const AsChild: Story = {
  render: (args) => (
    <Hyperlink {...args} asChild variant="standalone" trailingIcon={<ArrowRight />}>
      <FakeRouterLink href="#settings">Router link (e.g. Next.js Link)</FakeRouterLink>
    </Hyperlink>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`asChild` renders the child element and merges className, data attributes, handlers and ref onto it. The child's `href` is still sanitised.",
      },
    },
  },
};
