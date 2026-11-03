import React from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import IconBox from "../../components/atoms/IconBox";
import CodeBlock from "../../components/molecules/CodeBlock";
import { List, ListItem } from "../../components/molecules/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/molecules/Tabs";
import { PRODUCT, THEMES } from "../data";
import { IconChart, IconDownload, IconLayout, IconPalette, IconPanel, IconRocket, IconSwatch, IconTable, IconTerminal, IconWind } from "../icons";
import { portalLinkProps } from "../navigation";
import { DownloadTokensButton, PortalPage, Section } from "../components/Portal";

function Step({ n, title, children, description }: { n: number; title: string; description?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <li className="pt-step">
      <span className="pt-step__num" aria-hidden>
        {n}
      </span>
      <div className="pt-step__body">
        <h3 className="pt-step__title">
          <span className="pt-sr-only">Step {n}: </span>
          {title}
        </h3>
        {description ? <p className="pt-step__desc">{description}</p> : null}
        {children}
      </div>
    </li>
  );
}

const ic = { width: 16, height: 16 };

export function GettingStartedPage() {
  return (
    <PortalPage
      section="Overview"
      icon={<IconRocket />}
      title="Getting started"
      description={`Install ${PRODUCT.packageName}, load the tokens once, and render your first governed screen. Every snippet below is copy-ready.`}
      actions={
        <>
          <Button variant="outlinePrimary" size="md" icon={<IconDownload />} {...portalLinkProps("Overview/Downloads")}>
            All downloads
          </Button>
          <DownloadTokensButton variant="primary" />
        </>
      }
    >
      <Tabs defaultValue="install" variant="line" listLayout="nowrap" triggerAlign="start" contentAnimation="fade">
        <TabsList ariaLabel="Setup topics">
          <TabsTrigger value="install" icon={<IconTerminal {...ic} />}>Install</TabsTrigger>
          <TabsTrigger value="tokens" icon={<IconSwatch {...ic} />}>Tokens</TabsTrigger>
          <TabsTrigger value="theming" icon={<IconPalette {...ic} />}>Theming</TabsTrigger>
          <TabsTrigger value="tailwind" icon={<IconWind {...ic} />}>Tailwind</TabsTrigger>
          <TabsTrigger value="bundles" icon={<IconChart {...ic} />}>Bundles</TabsTrigger>
          <TabsTrigger value="nextjs" icon={<IconLayout {...ic} />}>Next.js example</TabsTrigger>
        </TabsList>

        <div style={{ paddingTop: "var(--space-3)" }}>
          <TabsContent value="install">
            <Section title="Install in four steps" description="React 18+ is required. Next.js 14+ and the hooks package are optional.">
              <ol className="pt-steps">
                <Step n={1} title="Add the package" description="From the registry, or from the tarball on the Downloads page (no registry access needed).">
                  <CodeBlock language="bash" title="Terminal" code={`npm install ${PRODUCT.packageName}\n\n# or from a downloaded tarball\nnpm install ./ui-common-components-${PRODUCT.version}.tgz`} />
                </Step>
                <Step n={2} title="Add the hooks companion (recommended)" description="Needed for FeedbackStates async phases, debounced search and table state.">
                  <CodeBlock language="bash" title="Terminal" code={`npm install ${PRODUCT.hooksPackage}\n# or: npm install ./ui-common-hooks-${PRODUCT.hooksVersion}.tgz`} />
                </Step>
                <Step n={3} title="Import the styles once, at the app root" description="Tokens first, then the compiled component CSS.">
                  <CodeBlock language="tsx" title="app/layout.tsx · src/main.tsx" code={`import "ui-common-components/design-system/tokens.css";\nimport "ui-common-components/index.css";`} />
                </Step>
                <Step n={4} title="Render a component">
                  <CodeBlock
                    language="tsx"
                    title="Example.tsx"
                    showLineNumbers
                    code={`import { Button, Card, CardHeader, CardTitle, CardContent } from "ui-common-components";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarter close</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Approve</Button>
      </CardContent>
    </Card>
  );
}`}
                  />
                </Step>
              </ol>
            </Section>
            <div style={{ height: "var(--space-3)" }} />
            <Section title="Peer dependencies" description="Installed by your app; the library never bundles React.">
              <List aria-label="Peer dependencies">
                <ListItem leading={<IconBox size="sm">R</IconBox>} title="react · react-dom" badge={<Badge variant="danger" tone="outline">Required</Badge>} meta=">= 18" />
                <ListItem leading={<IconBox size="sm">H</IconBox>} title={PRODUCT.hooksPackage} badge={<Badge variant="info" tone="outline">Recommended</Badge>} meta={`>= ${PRODUCT.hooksVersion}`} />
                <ListItem leading={<IconBox size="sm">N</IconBox>} title="next" badge={<Badge tone="outline">Optional</Badge>} meta=">= 14" />
                <ListItem leading={<IconBox size="sm">V</IconBox>} title="ui-pan-validators" badge={<Badge tone="outline">Optional</Badge>} description="Validation-heavy input flows (PAN, masks)." meta="0.0.1" />
              </List>
            </Section>
          </TabsContent>

          <TabsContent value="tokens">
            <Section
              title="Design tokens"
              description="tokens.css is the single source of truth. Components only read var(--…) — so overriding a token re-skins everything that uses it."
              action={<Button size="sm" variant="outlinePrimary" {...portalLinkProps("Foundations/All Tokens")}>Browse all tokens</Button>}
            >
              <ol className="pt-steps">
                <Step n={1} title="Import once" description="Or download tokens.css and link it directly in a non-bundled page.">
                  <CodeBlock language="tsx" code={`import "ui-common-components/design-system/tokens.css";`} />
                  <CodeBlock language="html" title="Plain HTML" code={`<link rel="stylesheet" href="/assets/tokens.css" />`} />
                </Step>
                <Step n={2} title="Use tokens in your own CSS" description="Never hard-code hex values or pixel spacing in app code.">
                  <CodeBlock
                    language="css"
                    title="dashboard.css"
                    code={`.panel {
  padding: var(--space-3);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
}`}
                  />
                </Step>
                <Step n={3} title="Override the font or brand slots" description="Declare after the import — the cascade does the rest.">
                  <CodeBlock
                    language="css"
                    title="brand.css"
                    code={`:root {
  --font-family: "Source Sans 3", system-ui, sans-serif;
  --color-theme-primary: #0b5fff;
  --color-theme-hover: #084ad1;
  --color-theme-active: #063aa6;
}`}
                  />
                </Step>
              </ol>
            </Section>
          </TabsContent>

          <TabsContent value="theming">
            <Section
              title="Themes"
              description="Set data-theme on <html>. Each theme is a block in tokens.css — no JavaScript theme provider."
              action={<Button size="sm" variant="outlinePrimary" {...portalLinkProps("Foundations/Themes")}>Live theme lab</Button>}
            >
              <div className="pt-stack">
                <CodeBlock language="html" code={`<html data-theme="dark">`} />
                <CodeBlock
                  language="ts"
                  title="Toggle at runtime"
                  code={`document.documentElement.setAttribute("data-theme", "dark");\n// back to default (Classic)\ndocument.documentElement.removeAttribute("data-theme");`}
                />
                <List aria-label="Available themes">
                  {THEMES.map((t) => (
                    <ListItem
                      key={t.id}
                      title={t.name}
                      badge={<code className="pt-inline-code">{t.dataTheme ? `data-theme="${t.dataTheme}"` : "no attribute"}</code>}
                      description={t.description}
                    />
                  ))}
                </List>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="tailwind">
            <Section title="Tailwind preset" description="Optional. Maps Tailwind utilities onto the same tokens so utility classes and components never disagree.">
              <ol className="pt-steps">
                <Step n={1} title="Register the preset and content path">
                  <CodeBlock
                    language="js"
                    title="tailwind.config.js"
                    showLineNumbers
                    code={`module.exports = {
  presets: [require("ui-common-components/tailwind.preset.js")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ui-common-components/dist/**/*.js",
  ],
};`}
                  />
                </Step>
                <Step n={2} title="Use token-backed utilities">
                  <CodeBlock language="tsx" code={`<section className="bg-surface border border-border rounded-lg p-3 text-text-primary">\n  <h2 className="text-h2">Revenue</h2>\n</section>`} />
                </Step>
              </ol>
            </Section>
          </TabsContent>

          <TabsContent value="bundles">
            <Section title="Import paths & bundle size" description="Everything is available from the main entry. Prefer a subpath when a route only needs one area.">
              <List aria-label="Entry points">
                <ListItem leading={<IconBox tone="strong"><IconLayout /></IconBox>} title={<code>ui-common-components</code>} badge={<Badge>Main</Badge>} description="Forms, layout, overlays, feedback — anything." />
                <ListItem leading={<IconBox><IconChart /></IconBox>} title={<code>ui-common-components/charts</code>} badge={<Badge variant="info">Subpath</Badge>} description="LineChart, BarChart, PieChart, AreaChart, ChartTooltip." />
                <ListItem leading={<IconBox><IconPanel /></IconBox>} title={<code>ui-common-components/shell</code>} badge={<Badge variant="info">Subpath</Badge>} description="DashboardShell, AppSidebar, AppTopbar and helpers." />
                <ListItem leading={<IconBox><IconTable /></IconBox>} title={<code>ui-common-components/table</code>} badge={<Badge variant="info">Subpath</Badge>} description="Data Table and semantic table primitives." />
              </List>
              <div style={{ marginTop: "var(--space-2)" }}>
                <CodeBlock
                  language="tsx"
                  code={`import { LineChart } from "ui-common-components/charts";\nimport { DashboardShell, AppTopbar } from "ui-common-components/shell";\nimport { Table } from "ui-common-components/table";`}
                />
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="nextjs">
            <Section title="Next.js App Router" description="Root layout with tokens, theme attribute and the dashboard shell.">
              <CodeBlock
                language="tsx"
                title="app/layout.tsx"
                showLineNumbers
                code={`import "ui-common-components/design-system/tokens.css";
import "ui-common-components/index.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="mist">
      <body>{children}</body>
    </html>
  );
}`}
              />
              <div style={{ height: "var(--space-2)" }} />
              <CodeBlock
                language="tsx"
                title="app/(dashboard)/layout.tsx"
                showLineNumbers
                code={`"use client";
import { DashboardShell, AppTopbar } from "ui-common-components/shell";
import { sections } from "./navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      sidebar={{ header: { title: "ConsolidateAI" }, sections, responsive: true }}
      topbar={<AppTopbar title="Consolidation Rules" titleAs="h1" />}
    >
      {children}
    </DashboardShell>
  );
}`}
              />
            </Section>
          </TabsContent>
        </div>
      </Tabs>
    </PortalPage>
  );
}
