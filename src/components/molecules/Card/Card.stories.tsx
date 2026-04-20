import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../atoms/Button";
import Badge from "../../atoms/Badge";
import Card, {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

const meta: Meta<typeof Card> = {
  title: "Design System/Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Project summary",
    subtitle: "Flexible card with title, content, and footer",
    children:
      "Use this card for dashboards, settings panels, profile summaries, and feature callouts.",
    footer: "Last updated 2 hours ago",
  },
};

export const Elevated: Story = {
  args: {
    title: "Material-style elevated card",
    subtitle: "Higher emphasis surface",
    variant: "elevated",
    hoverable: true,
    children:
      "This card uses elevation and hover motion similar to material-style surfaces.",
    actions: (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary">Primary action</Button>
        <Button variant="outlinePrimary">Secondary action</Button>
      </div>
    ),
    actionsAlign: "right",
  },
};

export const WithCover: Story = {
  args: {
    title: "Analytics report",
    subtitle: "Ant-like header + extra area",
    extra: <a href="#">View more</a>,
    cover: (
      <div
        style={{
          height: 160,
          background:
            "linear-gradient(135deg, var(--color-accent-sky-10, #E6F2FF), var(--color-accent-lavender-10, #EEE7FF))",
        }}
      />
    ),
    children:
      "Cards can include top media/cover areas for dashboards, product tiles, and promotional sections.",
  },
};

export const WithSelectionIndicator: Story = {
  args: {
    title: "Selected row",
    subtitle: "§26 — elevated surface + left indicator when selected",
    variant: "withIndicator",
    selected: true,
    hoverable: true,
    children: "Use for active list items or current tab content.",
  },
};

export const RightAlignedActions: Story = {
  args: {
    title: "Action alignment",
    subtitle: "Buttons aligned to the right side",
    cover: (
      <div
        style={{
          height: 140,
          background:
            "linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)",
        }}
      />
    ),
    children:
      "Use `actionsAlign` to place card buttons on the left, center, right, or spaced between.",
    actions: (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary">Preview</Button>
        <Button variant="outlinePrimary">Details</Button>
      </div>
    ),
    actionsAlign: "right",
  },
};

/** Composed API (shadcn-style): Header, Title, Description, Action, Content, Footer */
export const Composed: Story = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your workspace.
        </CardDescription>
        <CardAction>
          <Button variant="link" size="sm">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>
          Use <code>CardHeader</code>, <code>CardTitle</code>, <code>CardDescription</code>,{" "}
          <code>CardAction</code>, <code>CardContent</code>, and <code>CardFooter</code> for full
          control over layout.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Continue</Button>
        <Button variant="outlinePrimary">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};

/** Denser padding and typography (matches compact card patterns) */
export const ComposedSmall: Story = {
  render: () => (
    <Card size="sm" variant="elevated" hoverable style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>
          Uses <code>size=&quot;sm&quot;</code> for tighter padding.
        </CardDescription>
        <CardAction>
          <Badge variant="neutral" tone="soft">
            Featured
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: "var(--text-secondary-size)" }}>
          Pair with <code>Button</code> sizes and form controls for dense dashboards.
        </p>
      </CardContent>
      <CardFooter borderTop={false}>
        <span style={{ opacity: 0.8 }}>Optional metadata without a footer border</span>
      </CardFooter>
    </Card>
  ),
};

/** Cover image before header (full width; overflow clips to card radius) */
export const ComposedWithImage: Story = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: 400 }}>
      <div
        aria-hidden
        style={{
          height: 140,
          width: "100%",
          background:
            "linear-gradient(135deg, var(--color-accent-sky-10, #E6F2FF), var(--color-accent-lavender-10, #EEE7FF))",
        }}
      />
      <CardHeader>
        <CardTitle>Event cover</CardTitle>
        <CardDescription>Design systems meetup — practical talk on components.</CardDescription>
        <CardAction>
          <Button variant="outlinePrimary" size="sm">
            View event
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Place media as the first child, then header and content.</p>
      </CardContent>
    </Card>
  ),
};

/** Static namespace: Card.Title etc. */
export const ComposedStaticNamespace: Story = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title as="h2">Namespace</Card.Title>
        <Card.Description>Same as named exports via Card.Title.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p style={{ margin: 0 }}>
          Use <code>Card.Header</code> when you prefer a single import.
        </p>
      </Card.Content>
    </Card>
  ),
};
