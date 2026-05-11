import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "./components/atoms/Button";
import Divider from "./components/atoms/Divider";
import TextView from "./components/atoms/TextView";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/molecules/Card";

const INLINE_CODE_STYLE: React.CSSProperties = {
  borderRadius: "var(--radius-base)",
  padding: "2px var(--space-1)",
  background: "var(--color-surface-mist)",
  fontSize: "var(--text-small-size)",
};

const THEME_ITEMS: { label: string; detail: React.ReactNode }[] = [
  {
    label: "Classic (default)",
    detail: (
      <>
        No <span style={{ fontWeight: 600 }}>data-theme</span> on{' '}
        <code style={INLINE_CODE_STYLE}>&lt;html&gt;</code> — noir + classic blue surfaces.
      </>
    ),
  },
  {
    label: "Blue (explicit)",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;blue&quot;</code> — explicit contract; aligns with{' '}
        <code style={INLINE_CODE_STYLE}>:root</code> palette.
      </>
    ),
  },
  {
    label: "Dark",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;dark&quot;</code> — dark surfaces and inverted text.
      </>
    ),
  },
  {
    label: "Green accents",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;green&quot;</code> — §42 interaction tint on light UI.
      </>
    ),
  },
  {
    label: "Ion mist",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;mist&quot;</code> — mist page + sidebar shells.
      </>
    ),
  },
  {
    label: "Custom (rose)",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;custom&quot;</code> — example §42 accent (rose stack).
      </>
    ),
  },
  {
    label: "Blue + mist",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;blue-mist&quot;</code> — blue interaction + Ion mist shells.
      </>
    ),
  },
  {
    label: "Green + mist",
    detail: (
      <>
        <code style={INLINE_CODE_STYLE}>data-theme=&quot;green-mist&quot;</code> — green interaction + Ion mist shells.
      </>
    ),
  },
];

/**
 * Live preview for every `data-theme` block in `src/design-system/tokens.css`.
 * Switch themes from the Storybook toolbar control **Theme** (document root mirrors host apps).
 */
function ThemeGallery() {
  return (
    <div
      className="min-h-[min(100vh,1200px)] w-full bg-surface-page px-4 py-8 pb-24 sm:px-8 sm:py-10"
      style={{ color: "var(--color-text-primary)" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="max-w-3xl space-y-4">
          <TextView as="h1" variant="h2">
            Theme system
          </TextView>
          <TextView variant="body" color="secondary">
            Use the toolbar <strong style={{ color: "var(--color-text-primary)" }}>Theme</strong> control to
            mirror production: it sets{' '}
            <code style={INLINE_CODE_STYLE}>data-theme</code> on{' '}
            <code style={INLINE_CODE_STYLE}>&lt;html&gt;</code>. This canvas uses{' '}
            <code style={INLINE_CODE_STYLE}>--color-bg-page</code> plus your real tokens,{' '}
            <code style={INLINE_CODE_STYLE}>Card</code>, <code style={INLINE_CODE_STYLE}>Divider</code>,{' '}
            <code style={INLINE_CODE_STYLE}>Button</code>, and <code style={INLINE_CODE_STYLE}>TextView</code>.
          </TextView>
        </header>

        <Card variant="elevated" className="shadow-md">
          <CardHeader>
            <CardTitle>Themes in tokens.css</CardTitle>
            <CardDescription>
              Every toolbar option maps to{' '}
              <code style={INLINE_CODE_STYLE}>src/design-system/tokens.css</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="m-0 mt-4 list-none space-y-5 p-0 sm:columns-2 sm:gap-x-10">
              {THEME_ITEMS.map((item) => (
                <li key={item.label} className="break-inside-avoid">
                  <TextView as="span" variant="body" color="primary" fontWeight="semibold">
                    {item.label}
                  </TextView>
                  <div className="mt-2">
                    <TextView variant="small" color="secondary" style={{ lineHeight: 1.6, margin: 0 }}>
                      {item.detail}
                    </TextView>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card variant="elevated" className="shadow-md">
          <CardHeader>
            <CardTitle>§42 interaction tokens</CardTitle>
            <CardDescription>
              Primary fill and hover surface reflect the branded interaction layer for the active toolbar theme.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-0">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <TextView variant="small" color="secondary">
                  <span style={{ wordBreak: 'break-word' }}>
                    <code>--color-theme-primary</code> / <code>--color-theme-text</code>
                  </span>
                </TextView>
                <div
                  className="flex min-h-touch items-center justify-center rounded-lg px-6 py-6 text-body"
                  style={{
                    background: "var(--color-theme-primary)",
                    color: "var(--color-theme-text)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  Primary fill preview
                </div>
              </div>
              <div className="space-y-4">
                <TextView variant="small" color="secondary">
                  <code>--color-theme-surface-hover</code>
                </TextView>
                <div
                  className="flex min-h-touch items-center justify-center rounded-lg border px-6 py-6 text-small text-text-primary"
                  style={{
                    borderWidth: "var(--border-width-default)",
                    borderStyle: "solid",
                    borderColor: "var(--color-border-strong)",
                    color: "var(--color-theme-primary)",
                    background: "var(--color-theme-surface-hover)",
                  }}
                >
                  Theme hover / soft surface preview
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="shadow-md">
          <CardHeader>
            <CardTitle>Button mapping</CardTitle>
            <CardDescription>Primary / secondary / outline / link follow semantic button tokens.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap pt-2" style={{ gap: "var(--space-3)" }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outlinePrimary">Outline</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="shadow-md">
          <CardHeader>
            <CardTitle>Surfaces & brand</CardTitle>
            <CardDescription>Row mist and brand accents inherit from each theme.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-0">
            <div
              className="rounded-lg p-8 text-small leading-relaxed"
              style={{
                background: "var(--color-surface-mist)",
                color: "var(--color-text-primary)",
              }}
            >
              Row / inactive card surface (<span style={{ wordBreak: 'break-word' }}>
                <code>--color-surface-mist</code>
              </span>
              ) — contrast versus the page canvas (<code style={INLINE_CODE_STYLE}>bg-surface-page</code>
              ).
            </div>

            <Divider margin={`var(--space-2) 0`} />

            <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-start">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <TextView variant="small" color="secondary">
                  Brand secondary
                </TextView>
                <div className="flex flex-wrap items-center gap-6">
                  <span
                    className="inline-block size-14 min-h-touch min-w-touch shrink-0 rounded-lg shadow-sm"
                    style={{ backgroundColor: "var(--color-brand-secondary)" }}
                    title="Brand secondary accent"
                    aria-label="Brand secondary accent swatch"
                  />
                  <TextView variant="small" color="secondary" style={{ wordBreak: "break-word" }}>
                    <code>--color-brand-secondary</code>
                  </TextView>
                </div>
              </div>
              <div
                className="min-w-0 flex-1 sm:border-l sm:pl-8"
                style={{ borderLeftColor: "var(--color-border-subtle)" }}
              >
                <TextView variant="small" color="secondary" className="mb-3">
                  Governance link tone
                </TextView>
                <TextView
                  variant="body"
                  style={{ margin: 0, color: "var(--color-brand-link)", fontWeight: 500 }}
                >
                  Inline link styling — inspect <code style={INLINE_CODE_STYLE}>--color-brand-link</code>
                </TextView>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design System/Theme showcase",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Demonstrates semantic tokens and buttons across Storybook toolbar themes aligned with design-system/tokens.css.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  name: "All theme tokens",
  render: () => <ThemeGallery />,
};
