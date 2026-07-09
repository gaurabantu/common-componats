import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import CloseIcon from "../../../assets/close.svg";

const variantOptions = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost",
] as const;

const roundedOptions = ["0", "1", "2", "3", "4", "5", "pill", "circle"] as const;

const meta: Meta<typeof Button> = {
  title: "Design System/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "select",
      options: [...variantOptions],
      description: '"default" = primary. Others: fill, outline, link, ghost.',
    },
    size: {
      control: "select",
      options: ["xxs", "xs", "sm", "md", "lg"],
      description: "Height/density tier: xxs, xs, sm, md, lg.",
    },
    textSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Legacy text size override. Prefer size for normal button density.",
    },
    width: { control: "text", description: "Optional CSS width, e.g. 240px or 100%." },
    height: { control: "text", description: "Optional CSS height override." },
    fullWidth: { control: "boolean" },
    block: { control: "boolean", description: "Alias of fullWidth" },
    disabled: { control: "boolean" },
    loading: { control: "boolean", description: "Shows spinner and disables interaction" },
    rounded: {
      control: "select",
      options: [...roundedOptions],
      description: "Border radius: 0–5, pill, circle",
    },
    backgroundColor: {
      control: "text",
      description: "Override background (CSS color). Text control avoids heavy color pickers on the Docs page.",
    },
    borderColor: {
      control: "text",
      description: "Override border color (CSS color).",
    },
    textColor: {
      control: "text",
      description: "Override text color (CSS color).",
    },
    gradient: { control: "text", description: "Optional gradient background for premium CTA buttons" },
    gradientHover: { control: "text", description: "Optional hover gradient override" },
    gradientActive: { control: "text", description: "Optional active gradient override" },
    iconPosition: { control: "radio", options: ["left", "right"] },
    iconGap: { control: { type: "number", min: 0, max: 16, step: 4 } },
    iconWidth: { control: "text" },
    iconHeight: { control: "text" },
    iconColor: { control: "text" },
    preserveIconColor: { control: "boolean" },
    icon: { control: false },
    ariaLabel: { control: "text" },
    href: { control: "text", description: "If set, renders an <a> (link button)" },
    ripple: { control: "boolean" },
    className: {
      control: "text",
      description: "Layout-only class hook. Do not use for colors/radius when props exist.",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    rounded: "3",
    ripple: true,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/** Change Controls below — variant, size, disabled, etc. The button and the label update live. */
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    rounded: "3",
    ripple: true,
  },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Playground</h3>
      <p className="sb-section-subtitle">Use Controls to change props and present behavior.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Live preview</p>
          <p className="sb-card-hint">
            Variant: <strong>{args.variant}</strong> · Size: <strong>{args.size}</strong>
            {args.rounded ? ` · Rounded: ${args.rounded}` : ""}
            {args.disabled ? " · Disabled" : ""}
          </p>
        </div>
        <Button key={`${String(args.variant)}-${args.size}-${args.rounded}-${args.disabled}`} {...args} />
      </div>
    </div>
  ),
};

/** Same as Playground — use Controls to try all variants (default, primary, rounded, backgroundColor, etc.). */
export const Default: Story = {
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Default</h3>
      <p className="sb-section-subtitle">Variant "default" = primary. Use Controls for rounded, backgroundColor, borderColor, textColor.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Preview</p>
          <p className="sb-card-hint">
            Variant: <strong>{args.variant}</strong> · Size: <strong>{args.size}</strong>
            {args.rounded ? ` · Rounded: ${args.rounded}` : ""}
          </p>
        </div>
        <Button key={`${String(args.variant)}-${args.size}-${args.rounded}`} {...args} />
      </div>
    </div>
  ),
};

/** No variant / default = primary. Same appearance as primary. */
export const DefaultVariant: Story = {
  args: { children: "Default (same as primary)", variant: "default", size: "md" },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Default variant</h3>
      <p className="sb-section-subtitle">variant="default" or omit variant → primary style.</p>
      <div className="sb-card">
        <div className="sb-inline">
          <Button variant="default" size="md">Default</Button>
          <Button variant="primary" size="md">Primary</Button>
        </div>
      </div>
    </div>
  ),
};

/** When you pass backgroundColor / borderColor / textColor they override the variant. */
export const CustomColors: Story = {
  render: () => (
    <div className="sb-page">
      <h3 className="sb-section-title">Custom colors override</h3>
      <p className="sb-section-subtitle">backgroundColor, borderColor, textColor apply on top of variant (works in main app too).</p>
      <div className="sb-card">
        <div className="sb-inline">
          <Button variant="default" size="md" backgroundColor="var(--color-accent-lavender-40)" borderColor="var(--color-accent-lavender-40)" textColor="var(--color-text-on-primary)">
            Custom fill
          </Button>
          <Button variant="default" size="md" backgroundColor="transparent" borderColor="var(--color-accent-lavender-40)" textColor="var(--color-accent-lavender-40)">
            Custom outline
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const GradientButton: Story = {
  args: {
    children: "Upgrade plan",
    variant: "primary",
    gradient: "linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)",
    gradientHover: "linear-gradient(135deg, var(--color-theme-active) 0%, var(--color-state-success) 100%)",
    gradientActive: "linear-gradient(135deg, var(--color-theme-active) 0%, var(--color-theme-hover) 100%)",
  },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Gradient button</h3>
      <p className="sb-section-subtitle">Use `gradient`, `gradientHover`, and `gradientActive` for premium CTA buttons.</p>
      <div className="sb-card">
        <div className="sb-inline">
          <Button {...args} />
          <Button {...args} rounded="pill">Rounded CTA</Button>
          <Button {...args} disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: { children: "Loading...", variant: "primary", size: "md", loading: true },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Loading</h3>
      <p className="sb-section-subtitle">Spinner + disables click.</p>
      <div className="sb-card">
        <div className="sb-inline">
          <Button {...args} />
          <Button {...args} variant="outlinePrimary" />
          <Button {...args} variant="link" />
        </div>
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  args: { children: "Go to example.com", variant: "link", href: "https://example.com", target: "_blank" },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">Link button (href)</h3>
      <p className="sb-section-subtitle">When href is provided, Button renders an anchor.</p>
      <div className="sb-card">
        <div className="sb-inline">
          <Button {...args} />
          <Button {...args} variant="primary" />
          <Button {...args} variant="outlinePrimary" />
        </div>
      </div>
    </div>
  ),
};

/** All variants: primary/secondary = fill; outlinePrimary/outlineSecondary = outline (no fill); success/danger/warning = fill; link = no bg, no border. */
export const Variants: Story = {
  render: () => (
    <div className="sb-page">
      <h3 className="sb-section-title">Variants</h3>
      <p className="sb-section-subtitle">All visual variants at a glance.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Style matrix</p>
          <p className="sb-card-hint">Filled, outline, link and ghost</p>
        </div>
        <div className="sb-grid">
          <div className="sb-swatch">
            <span className="sb-swatch-label">Primary (fill)</span>
            <Button variant="primary" size="md">Primary</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Secondary (fill)</span>
            <Button variant="secondary" size="md">Secondary</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Outline Primary</span>
            <Button variant="outlinePrimary" size="md">Outline</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Outline Secondary</span>
            <Button variant="outlineSecondary" size="md">Outline</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Success (fill)</span>
            <Button variant="success" size="md">Success</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Danger (fill)</span>
            <Button variant="danger" size="md">Danger</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Warning (fill)</span>
            <Button variant="warning" size="md">Warning</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Link</span>
            <Button variant="link" size="md">Link</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Ghost</span>
            <Button variant="ghost" size="md">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Primary: Story = {
  args: { children: "Primary Button", variant: "primary", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Secondary: Story = {
  args: { children: "Secondary Button", variant: "secondary", size: "md" },
  render: (args) => <Button {...args} />,
};

export const OutlinePrimary: Story = {
  args: { children: "Outline Primary", variant: "outlinePrimary", size: "md" },
  render: (args) => <Button {...args} />,
};

export const OutlineSecondary: Story = {
  args: { children: "Outline Secondary", variant: "outlineSecondary", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Success: Story = {
  args: { children: "Success", variant: "success", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Danger: Story = {
  args: { children: "Danger", variant: "danger", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Warning: Story = {
  args: { children: "Warning", variant: "warning", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Ghost: Story = {
  args: { children: "Ghost Button", variant: "ghost", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Link: Story = {
  args: { children: "Link Button", variant: "link", size: "md" },
  render: (args) => <Button {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-page">
      <h3 className="sb-section-title">Sizes</h3>
      <p className="sb-section-subtitle">sm / md / lg padding and height.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Primary size scale</p>
          <p className="sb-card-hint">Use this to validate vertical rhythm</p>
        </div>
        <div className="sb-inline">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="sb-page">
      <h3 className="sb-section-title">Disabled</h3>
      <p className="sb-section-subtitle">All key variants in disabled state.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Disabled matrix</p>
          <p className="sb-card-hint">Check contrast and affordance</p>
        </div>
        <div className="sb-grid">
          <div className="sb-swatch">
            <span className="sb-swatch-label">Primary</span>
            <Button variant="primary" size="md" disabled>Primary</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Secondary</span>
            <Button variant="secondary" size="md" disabled>Secondary</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Outline Primary</span>
            <Button variant="outlinePrimary" size="md" disabled>Outline</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Success</span>
            <Button variant="success" size="md" disabled>Success</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Danger</span>
            <Button variant="danger" size="md" disabled>Danger</Button>
          </div>
          <div className="sb-swatch">
            <span className="sb-swatch-label">Link</span>
            <Button variant="link" size="md" disabled>Link</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="sb-page">
      <h3 className="sb-section-title">Full width</h3>
      <p className="sb-section-subtitle">Button should stretch to its container.</p>
      <div className="sb-card sb-story-max-w">
        <div className="sb-card-header">
          <p className="sb-card-title">Container: 448px</p>
          <p className="sb-card-hint">`fullWidth` uses CSS class</p>
        </div>
        <Button variant="primary" fullWidth>Full width button</Button>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "With icon",
    variant: "primary",
    icon: CloseIcon,
    iconPosition: "right",
  },
  render: (args) => (
    <div className="sb-page">
      <h3 className="sb-section-title">With icon</h3>
      <p className="sb-section-subtitle">Icon + text alignment and spacing.</p>
      <div className="sb-card">
        <div className="sb-card-header">
          <p className="sb-card-title">Icon on the right</p>
          <p className="sb-card-hint">Use `iconPosition` to swap sides</p>
        </div>
        <Button {...args} />
        <div className="sb-divider" />
        <div className="sb-inline">
          <Button {...args} iconPosition="left" children="Icon left" />
          <Button {...args} iconPosition="right" children="Icon right" />
        </div>
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  /** Do not inherit meta `children: "Button"` — icon-only means no label node. */
  args: {
    variant: "primary",
    size: "md",
    icon: CloseIcon,
    ariaLabel: "Close",
    children: "",
  },
  render: (args) => {
    const { children: _noLabel, ...props } = args;
    return (
      <div className="sb-page">
        <h3 className="sb-section-title">Icon only</h3>
        <p className="sb-section-subtitle">
          Square touch targets (§20). No visible label — use <code>ariaLabel</code> for accessibility.
        </p>
        <div className="sb-card">
          <div className="sb-card-header">
            <p className="sb-card-title">Icon-only sizes</p>
            <p className="sb-card-hint">sm / md / lg</p>
          </div>
          <div className="sb-inline">
            <Button {...props} size="sm" ariaLabel="Close (small)" />
            <Button {...props} size="md" ariaLabel="Close (medium)" />
            <Button {...props} size="lg" ariaLabel="Close (large)" />
          </div>
        </div>
      </div>
    );
  },
};
