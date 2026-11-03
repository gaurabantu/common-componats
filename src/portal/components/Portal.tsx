import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Card, { CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/molecules/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";
import IconBox from "../../components/atoms/IconBox";
import { copyText } from "../../components/molecules/CodeBlock/CodeBlock.utils";
import { PRODUCT } from "../data";
import { IconCheck, IconCopy, IconDownload, IconLayers } from "../icons";
import { portalLinkProps } from "../navigation";
import "../portal.css";

/* ---------- Page ---------- */

export interface PortalPageProps {
  section: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** Skip the standard header (Welcome uses a hero instead). */
  bare?: boolean;
  children: React.ReactNode;
}

export function PortalPage({ section, icon, title, description, actions, bare, children }: PortalPageProps) {
  return (
    <div className="pt-root">
      <main className="pt-container">
        {bare ? (
          <h1 className="pt-sr-only">{title}</h1>
        ) : (
          <header className="pt-header">
            <div className="pt-header__text">
              <span className="pt-eyebrow">
                {icon ? (
                  <IconBox size="sm" tone="strong">
                    {icon}
                  </IconBox>
                ) : null}
                {section}
              </span>
              <h1 className="pt-title">{title}</h1>
              {description ? <p className="pt-lead">{description}</p> : null}
            </div>
            {actions ? <div className="pt-header__actions">{actions}</div> : null}
          </header>
        )}
        {children}
        <PortalFooter />
      </main>
    </div>
  );
}

export function PortalFooter() {
  return (
    <footer className="pt-footer">
      <div className="pt-footer__brand">
        <IconBox size="sm" tone="strong">
          <IconLayers />
        </IconBox>
        <span>
          <strong>{PRODUCT.name}</strong> · {PRODUCT.packageName} v{PRODUCT.version} · tokens v{PRODUCT.tokensVersion}
        </span>
      </div>
      <div className="pt-row">
        <a className="pt-link" {...portalLinkProps("Overview/Roadmap")}>
          Roadmap
        </a>
        <span aria-hidden>·</span>
        <a className="pt-link" {...portalLinkProps("Overview/Release Notes")}>
          Release notes
        </a>
        <span aria-hidden>·</span>
        <a className="pt-link" {...portalLinkProps("Overview/Downloads")}>
          Downloads
        </a>
        <span aria-hidden>·</span>
        <span>Maintained by {PRODUCT.owner}</span>
      </div>
    </footer>
  );
}

/* ---------- Section (Card with header) ---------- */

export interface SectionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, description, action, children, className }: SectionProps) {
  const id = useId();
  return (
    <section aria-labelledby={id}>
      <Card className={["pt-section", className].filter(Boolean).join(" ")}>
        <CardHeader>
          <CardTitle as="h2" id={id}>
            {title}
          </CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
          {action ? <CardAction>{action}</CardAction> : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

/** Heading between cards (no surface) — for long pages with groups of cards. */
export function SectionHeading({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="pt-section-heading">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ---------- Token chip (copy `var(--x)`) ---------- */

export function TokenName({ name, asVar = true }: { name: string; asVar?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const text = asVar ? `var(${name})` : name;
  const onClick = useCallback(async () => {
    if (await copyText(text)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    }
  }, [text]);
  return (
    <button
      type="button"
      className="pt-token"
      onClick={onClick}
      data-copied={copied ? "true" : undefined}
      aria-label={copied ? `Copied ${text}` : `Copy ${text}`}
      title={`Copy ${text}`}
    >
      <span>{name}</span>
      {copied ? <IconCheck /> : <IconCopy />}
    </button>
  );
}

/* ---------- Downloads ---------- */

export interface DownloadAsset {
  id: string;
  name: string;
  kind: "css" | "package" | "js";
  version: string;
  description: string;
  available: boolean;
  file?: string;
  bytes?: number;
  sha256?: string;
}

const FALLBACK_ASSETS: DownloadAsset[] = [
  { id: "tokens", name: "tokens.css", kind: "css", version: PRODUCT.tokensVersion, description: "All design tokens.", available: true, file: "design-system/tokens.css" },
];

/** Reads `downloads/manifest.json` (written by scripts/prepare-storybook-downloads.mjs). */
export function useDownloads(): { assets: DownloadAsset[]; status: "loading" | "ready" | "fallback" } {
  const [state, setState] = useState<{ assets: DownloadAsset[]; status: "loading" | "ready" | "fallback" }>({
    assets: FALLBACK_ASSETS,
    status: "loading",
  });
  useEffect(() => {
    let alive = true;
    fetch("downloads/manifest.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((m: { assets: DownloadAsset[] }) => alive && setState({ assets: m.assets, status: "ready" }))
      .catch(() => alive && setState({ assets: FALLBACK_ASSETS, status: "fallback" }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export function formatBytes(bytes?: number): string {
  if (bytes === undefined) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function DownloadButton({
  asset,
  variant = "outlinePrimary",
  size = "sm",
  label,
}: {
  asset?: DownloadAsset;
  variant?: "primary" | "outlinePrimary" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  if (!asset?.available || !asset.file) {
    return (
      <Button size={size} variant="outlineSecondary" disabled>
        Unavailable
      </Button>
    );
  }
  return (
    <Button
      size={size}
      variant={variant}
      href={asset.file}
      download={asset.name}
      icon={<IconDownload />}
      ariaLabel={`Download ${asset.name}${asset.bytes ? `, ${formatBytes(asset.bytes)}` : ""}`}
    >
      {label ?? "Download"}
    </Button>
  );
}

/** Header action: download tokens.css (always available — served from /design-system). */
export function DownloadTokensButton({ variant = "outlinePrimary" as "primary" | "outlinePrimary", size = "md" as "sm" | "md" | "lg" }) {
  const { assets } = useDownloads();
  const tokens = assets.find((a) => a.id === "tokens") ?? FALLBACK_ASSETS[0];
  return <DownloadButton asset={tokens} variant={variant} size={size} label="Download tokens.css" />;
}

/* ---------- Filter (toggle buttons — not Tabs: there is one shared result list, no panels) ---------- */

export function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="pt-filter" role="group" aria-label={label}>
      {options.map((o) => (
        <Button
          key={o.value}
          size="sm"
          variant={o.value === value ? "secondary" : "outlineSecondary"}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          ripple={false}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}

/* ---------- Misc ---------- */

export function VersionBadge() {
  return (
    <Badge variant="neutral" tone="outline" size="md">
      v{PRODUCT.version} · tokens {PRODUCT.tokensVersion}
    </Badge>
  );
}

/** Wraps children in a scoped `data-theme` so a preview can differ from the page theme. */
export const ThemeScope = React.forwardRef<HTMLDivElement, { theme: string | null; children: React.ReactNode; className?: string; label?: string }>(
  function ThemeScope({ theme, children, className, label }, ref) {
    return (
      <div
        ref={ref}
        data-theme={theme ?? "blue"}
        className={["pt-theme-scope", className].filter(Boolean).join(" ")}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
    );
  },
);
