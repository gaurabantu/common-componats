import React from "react";
import Card from "../../components/molecules/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";
import IconBox from "../../components/atoms/IconBox";
import StatCard from "../../components/molecules/StatCard";
import { List, ListItem } from "../../components/molecules/List";
import { COMPONENT_COUNT, HOOKS, INVENTORY, PRODUCT, THEMES } from "../data";
import {
  IconAccessibility,
  IconArrowRight,
  IconBook,
  IconCheck,
  IconCheckCircle,
  IconDownload,
  IconHook,
  IconPackage,
  IconPalette,
  IconRocket,
  IconShield,
  IconSwatch,
  IconTerminal,
  IconWind,
} from "../icons";
import { portalLinkProps } from "../navigation";
import { TOKEN_COUNT } from "../tokens/useTokens";
import { DownloadTokensButton, PortalPage, Section, SectionHeading } from "../components/Portal";
import { PRINCIPLES, ProductMock, ThemeLab } from "../components/Showcase";

const NEW_COUNT = INVENTORY.flatMap((g) => g.items).filter((i) => i.status === "new").length;

const PILLARS = [
  {
    icon: <IconPackage />,
    title: "Components",
    text: `${COMPONENT_COUNT} production components — forms, data, overlays, feedback and a full dashboard shell.`,
    meta: ["React 18+", "TypeScript", "ESM + CJS"],
    link: portalLinkProps("Overview/Component Inventory"),
  },
  {
    icon: <IconSwatch />,
    title: "Design tokens",
    text: `${TOKEN_COUNT} CSS variables in one file. Import once — every component, theme and app screen follows.`,
    meta: ["tokens.css", `v${PRODUCT.tokensVersion}`],
    link: portalLinkProps("Foundations/Colors"),
  },
  {
    icon: <IconHook />,
    title: "Hooks",
    text: `${HOOKS.length} typed hooks for async phases, focus traps, tables, selection, gestures and storage.`,
    meta: [PRODUCT.hooksPackage, `v${PRODUCT.hooksVersion}`],
    link: portalLinkProps("Design System/Hooks/ui-common-hooks", "component"),
  },
  {
    icon: <IconWind />,
    title: "Tailwind preset",
    text: "Utilities like bg-surface, text-h2 and gap-3 mapped to the same tokens — no second source of truth.",
    meta: ["tailwind.preset.js"],
    link: portalLinkProps("Overview/Getting Started"),
  },
];

const ADOPTION = [
  { title: "Install the package", text: "From the npm registry or the downloadable tarball — no build step on your side.", icon: <IconTerminal /> },
  { title: "Import tokens.css once", text: "One line in the app root gives every screen the same colour, type and spacing.", icon: <IconPalette /> },
  { title: "Compose screens from components", text: "Use the 5-zone layout and one primary action per zone.", icon: <IconPackage /> },
  { title: "Brand with a theme", text: "Set data-theme on <html> or override the six brand slots.", icon: <IconSwatch /> },
];

export function WelcomePage() {
  return (
    <PortalPage section="Overview" title={PRODUCT.name} bare>
      {/* Hero */}
      <section className="pt-hero" aria-labelledby="pt-hero-title">
        <div className="pt-hero__copy">
          <div className="pt-row">
            <Badge variant="neutral" tone="outline" size="md" dot>
              v{PRODUCT.version} · tokens {PRODUCT.tokensVersion}
            </Badge>
            {NEW_COUNT ? (
              <Badge variant="info" size="md">
                {NEW_COUNT} new components
              </Badge>
            ) : null}
          </div>
          <h2 id="pt-hero-title" className="pt-hero__title">
            One system for every product screen. <span>Designed, coded and governed.</span>
          </h2>
          <p className="pt-hero__lead">
            {PRODUCT.name} is the shared React library, token set and set of rules our teams use to build consistent,
            accessible enterprise applications — faster, and without re-inventing the basics.
          </p>
          <div className="pt-hero__ctas">
            <Button size="lg" icon={<IconRocket />} {...portalLinkProps("Overview/Getting Started")}>
              Get started
            </Button>
            <DownloadTokensButton size="lg" />
            <Button size="lg" variant="ghost" icon={<IconArrowRight />} iconPosition="right" {...portalLinkProps("Overview/Component Inventory")}>
              Browse components
            </Button>
          </div>
          <div className="pt-hero__trust">
            <span><IconAccessibility /> {PRODUCT.standard}</span>
            <span><IconSwatch /> {THEMES.length} themes</span>
            <span><IconShield /> XSS-safe rendering</span>
            <span><IconCheck /> Unit-tested</span>
          </div>
        </div>
        <div className="pt-hero__stage">
          <ProductMock />
        </div>
      </section>

      {/* KPIs */}
      <section aria-label="Key figures" className="pt-grid pt-grid--kpi">
        <StatCard label="Components" value={COMPONENT_COUNT} icon={<IconPackage />} description="Atoms, molecules, shell & charts" delta={NEW_COUNT ? { value: `+${NEW_COUNT}`, trend: "up", label: "in next release" } : undefined} />
        <StatCard label="Design tokens" value={TOKEN_COUNT} icon={<IconSwatch />} description="Generated from tokens.css" />
        <StatCard label="Hooks" value={HOOKS.length} icon={<IconHook />} description={PRODUCT.hooksPackage} />
        <StatCard label="Themes" value={THEMES.length} icon={<IconPalette />} description="Light, dark, mist & brand" />
        <StatCard label="Accessibility" value="AA" icon={<IconAccessibility />} iconTone="success" description="WCAG 2.2 target on every control" />
      </section>

      {/* What's inside */}
      <SectionHeading title="What's in the box" description="Four deliverables, one version number." />
      <div className="pt-grid pt-grid--tiles">
        {PILLARS.map((p, i) => (
          <a key={p.title} className="pt-tile-link" {...p.link}>
          <Card interactive>
            <div className="pt-tile">
              <IconBox size="lg" tone={i === 0 ? "strong" : "neutral"}>{p.icon}</IconBox>
              <h3 className="pt-tile__title">{p.title}</h3>
              <p className="pt-tile__desc">{p.text}</p>
              <div className="pt-tile__meta">
                {p.meta.map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}
              </div>
              <span className="pt-tile__cta" aria-hidden>
                Explore <IconArrowRight />
              </span>
            </div>
          </Card>
          </a>
        ))}
      </div>

      {/* Principles */}
      <Section
        title="Why it matters"
        description="Shared foundations remove whole classes of rework — every team inherits accessibility, theming and security instead of rebuilding them."
      >
        <div className="pt-grid">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="pt-value">
              <IconBox tone="neutral" size="lg">{p.icon}</IconBox>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="pt-checks">
                {p.checks.map((c) => (
                  <li key={c}><IconCheckCircle /> {c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Theme lab */}
      <Section
        title="One token file, many brands"
        description="Pick a theme — the preview re-skins instantly because every component reads the same tokens. No component code changes."
        action={
          <Button size="sm" variant="outlinePrimary" {...portalLinkProps("Foundations/Themes")}>
            All themes
          </Button>
        }
      >
        <ThemeLab compact />
      </Section>

      {/* Adoption */}
      <Section
        title="Adopt in four steps"
        description="Most teams render their first governed screen in under an hour."
        action={
          <Button size="sm" variant="outlinePrimary" icon={<IconDownload />} {...portalLinkProps("Overview/Downloads")}>
            Downloads
          </Button>
        }
      >
        <List ordered aria-label="Adoption steps">
          {ADOPTION.map((s, i) => (
            <ListItem
              key={s.title}
              leading={<IconBox tone={i === 0 ? "strong" : "outline"}>{s.icon}</IconBox>}
              title={s.title}
              badge={<Badge tone="outline">Step {i + 1}</Badge>}
              description={s.text}
            />
          ))}
        </List>
        <div className="pt-row" style={{ marginTop: "var(--space-2)" }}>
          <Button icon={<IconBook />} {...portalLinkProps("Overview/Getting Started")}>
            Read the guide
          </Button>
          <Button variant="outlinePrimary" {...portalLinkProps("Governance/Accessibility")}>
            Governance & quality
          </Button>
        </div>
      </Section>
    </PortalPage>
  );
}
