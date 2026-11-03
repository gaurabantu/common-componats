import React, { useRef, useState } from "react";
import Card from "../../components/molecules/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";
import IconBox from "../../components/atoms/IconBox";
import Switch from "../../components/atoms/Switch";
import Input from "../../components/atoms/TextInput";
import StatCard from "../../components/molecules/StatCard";
import { List, ListItem } from "../../components/molecules/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/molecules/Tabs";
import { THEMES } from "../data";
import { IconChart, IconDevices, IconGrid, IconLayers, IconScale, IconShield, IconSparkle } from "../icons";
import { ThemeScope } from "./Portal";

/* ---------- Hero product mock — a real screen built only from library components ---------- */

const PROCESS_OPTIONS = [
  { id: "local", title: "Local", desc: "Entity currency" },
  { id: "translated", title: "Translated", desc: "Parent currency" },
  { id: "consolidated", title: "Consolidated", desc: "Eliminations" },
];

const Diamond = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden>
    <path d="m12 3 9 9-9 9-9-9 9-9Z" />
  </svg>
);

export function ProductMock() {
  const [process, setProcess] = useState("local");
  const [auto, setAuto] = useState(true);
  return (
    <div className="pt-mock" role="group" aria-label="Example screen built with the library">
      <div className="pt-mock__bar">
        <IconBox size="sm" tone="strong">
          <IconScale />
        </IconBox>
        <span className="pt-mock__title">Consolidation Rules</span>
        <Badge variant="success" dot>
          Live
        </Badge>
      </div>
      <div className="pt-mock__body">
        <Tabs defaultValue="process" size="sm" listLayout="nowrap" triggerAlign="start">
          <TabsList ariaLabel="Rule areas">
            <TabsTrigger value="process" icon={<IconLayers width={16} height={16} />}>Process</TabsTrigger>
            <TabsTrigger value="rules" icon={<IconGrid width={16} height={16} />}>System rules</TabsTrigger>
            <TabsTrigger value="report" icon={<IconChart width={16} height={16} />}>Report</TabsTrigger>
          </TabsList>
          <TabsContent value="process">
            <div className="pt-stack" style={{ paddingTop: "var(--space-2)" }}>
              <div className="pt-mock__options" role="group" aria-label="Process type">
                {PROCESS_OPTIONS.map((o) => (
                  <Card
                    key={o.id}
                    size="sm"
                    interactive
                    selected={process === o.id}
                    onClick={() => setProcess(o.id)}
                    aria-label={`${o.title} — ${o.desc}`}
                  >
                    <div className="pt-mock__option">
                      <IconBox size="sm" tone={process === o.id ? "strong" : "neutral"}>
                        {Diamond}
                      </IconBox>
                      <strong>{o.title}</strong>
                      <span className="pt-muted">{o.desc}</span>
                    </div>
                  </Card>
                ))}
              </div>
              <List size="sm" aria-label="Process steps">
                <ListItem
                  title="Opening balance carry forward"
                  badge={<Badge>System</Badge>}
                  action={<Button size="sm" variant="outlinePrimary">Settings</Button>}
                />
                <ListItem
                  title="Final calculations"
                  badge={<Badge variant="info">Configurable</Badge>}
                  action={<Button size="sm" variant="outlinePrimary">Configure</Button>}
                />
              </List>
            </div>
          </TabsContent>
          <TabsContent value="rules">
            <div style={{ paddingTop: "var(--space-2)" }}>
              <Input label="Rule name" placeholder="e.g. Equity pickup" size="sm" fullWidth />
            </div>
          </TabsContent>
          <TabsContent value="report">
            <div style={{ paddingTop: "var(--space-2)" }}>
              <StatCard size="sm" label="Entities processed" value="1,284" delta={{ value: "+12%", trend: "up", label: "vs last close" }} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="pt-mock__footer">
        <Switch size="sm" checked={auto} onCheckedChange={setAuto} label="Auto-run nightly" />
        <Button size="sm">Run process</Button>
      </div>
    </div>
  );
}

/* ---------- Theme lab — switch a scoped preview between the 8 shipped themes ---------- */

function ThemeDots({ theme }: { theme: string | null }) {
  return (
    <span className="pt-theme-dots" data-theme={theme ?? "blue"} aria-hidden>
      <span style={{ background: "var(--color-bg-page)" }} />
      <span style={{ background: "var(--color-bg-surface)" }} />
      <span style={{ background: "var(--color-theme-primary)" }} />
      <span style={{ background: "var(--button-primary-default-bg)" }} />
    </span>
  );
}

function ThemePreviewContent() {
  return (
    <>
      <div className="pt-toolbar">
        <div>
          <strong style={{ fontSize: "var(--text-h3-size)" }}>Quarter close</strong>
          <p className="pt-muted pt-small">Every surface, border and control below reads from tokens.</p>
        </div>
        <div className="pt-row">
          <Button size="sm" variant="outlinePrimary">Export</Button>
          <Button size="sm">Approve</Button>
        </div>
      </div>
      <div className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Revenue" value="$4.2M" delta={{ value: "+8%", trend: "up" }} />
        <StatCard size="sm" label="Open tasks" value={14} delta={{ value: "-3", trend: "down", invert: true }} />
        <StatCard size="sm" label="Entities" value={62} delta={{ value: "0", trend: "neutral" }} />
      </div>
      <Card size="sm">
        <List size="sm" aria-label="Approvals">
          <ListItem
            leading={<IconBox size="sm" tone="success"><IconShield /></IconBox>}
            title="Intercompany reconciliation"
            badge={<Badge variant="success">Done</Badge>}
            description="All 18 pairs matched"
            action={<Switch size="sm" defaultChecked label="Lock" />}
          />
          <ListItem
            leading={<IconBox size="sm" tone="warning"><IconSparkle /></IconBox>}
            title="Currency triangulation"
            badge={<Badge variant="warning">Review</Badge>}
            description="2 rates older than 24h"
            action={<Button size="sm" variant="outlinePrimary">Open</Button>}
          />
        </List>
      </Card>
    </>
  );
}

export function ThemeLab({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(THEMES[0].id);
  const scopeRef = useRef<HTMLDivElement>(null);
  const theme = THEMES.find((t) => t.id === active) ?? THEMES[0];
  const list = compact ? THEMES.slice(0, 6) : THEMES;
  return (
    <div className="pt-themes">
      <div className="pt-theme-list" role="group" aria-label="Choose a theme to preview">
        {list.map((t) => (
          <Card key={t.id} size="sm" interactive selected={active === t.id} onClick={() => setActive(t.id)} aria-label={`${t.name} theme`}>
            <div className="pt-theme-option">
              <ThemeDots theme={t.dataTheme} />
              <span className="pt-theme-option__text">
                <strong>{t.name}</strong>
                <span>{t.dataTheme ? `data-theme="${t.dataTheme}"` : "default (no attribute)"}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>
      <ThemeScope ref={scopeRef} theme={theme.dataTheme} label={`${theme.name} theme preview`}>
        <ThemePreviewContent />
      </ThemeScope>
    </div>
  );
}

/* ---------- Principle cards ---------- */

export const PRINCIPLES = [
  {
    icon: <IconShield />,
    title: "Accessible by default",
    text: "Every control ships with WCAG 2.2 AA behaviour — keyboard paths, visible focus, labelled inputs, 4.5:1 text contrast.",
    checks: ["Keyboard & screen-reader tested", "Focus ring on every control", "Reduced-motion aware"],
  },
  {
    icon: <IconLayers />,
    title: "One token file",
    text: "A single tokens.css drives colour, type, spacing, radius, elevation and motion — brand changes are a CSS edit, not a rewrite.",
    checks: ["No hard-coded colours in components", "6 brand slots per theme", "Tailwind preset on the same tokens"],
  },
  {
    icon: <IconDevices />,
    title: "Responsive & fast",
    text: "Desktop-first layouts that hold at 375px, with subpath bundles so a page only ships the JavaScript it uses.",
    checks: ["375 · 768 · 1440 verified", "/charts /shell /table subpaths", "Native SVG charts — no chart lib"],
  },
  {
    icon: <IconSparkle />,
    title: "Secure building blocks",
    text: "Text-only rendering, safe link handling and file uploads validated by content signature, not just extension.",
    checks: ["No dangerouslySetInnerHTML", "rel=noopener on new tabs", "Magic-byte upload checks"],
  },
];
