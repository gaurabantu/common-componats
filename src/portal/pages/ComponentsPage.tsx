import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import InputSearch from "../../components/atoms/TextInputSearch";
import CodeBlock from "../../components/molecules/CodeBlock";
import { EmptyState } from "../../components/molecules/FeedbackStates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/molecules/Tabs";
import { INVENTORY, PRODUCT, type ComponentStatus, type InventoryItem } from "../data";
import { IconArrowRight, IconExternal, IconFileCode, IconPackage } from "../icons";
import { portalLinkProps } from "../navigation";
import { PortalPage } from "../components/Portal";
import { ALL_ITEMS, COMPONENT_TOTAL, NEW_TOTAL, STATS, type PropInfo } from "../components/dashboardData";
import { getPreview } from "../components/previews";

type GalleryItem = InventoryItem & { group: string };

const STATUS_BADGE: Record<ComponentStatus, { label: string; variant: "success" | "info" | "warning" | "neutral" }> = {
  stable: { label: "Stable", variant: "success" },
  new: { label: "New", variant: "info" },
  beta: { label: "Beta", variant: "warning" },
  legacy: { label: "Legacy", variant: "neutral" },
};

/** Props whose literal values are worth showing as "variants". */
const VARIANT_PROPS = ["variant", "size", "tone", "appearance", "shape", "orientation", "type", "side", "layout", "status"];
const PROPS_PREVIEW = 10;

/** `Badge / Chip / Tag` → `Badge, Chip, Tag`; `LineChart · AreaChart` → `LineChart, AreaChart`. */
export function importNames(name: string): string[] {
  return name.split(/\s*[/·]\s*/).filter(Boolean);
}

export function importLine(item: InventoryItem): string {
  const names = item.status === "legacy" && item.replacement ? [item.replacement] : importNames(item.name);
  return `import { ${names.join(", ")} } from "${item.from ?? PRODUCT.packageName}";`;
}

export function filterItems(items: GalleryItem[], category: string, query: string): GalleryItem[] {
  const q = query.trim().toLowerCase();
  return items.filter(
    (i) => (category === "all" || i.group === category) && (!q || `${i.name} ${i.description}`.toLowerCase().includes(q)),
  );
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ------------------------------------------------------------------ */
/* Preview frame                                                       */
/* ------------------------------------------------------------------ */

function PreviewFrame({ item, size = "card" }: { item: InventoryItem; size?: "card" | "panel" }) {
  const preview = getPreview(item.name);
  return (
    <div
      className="pt-gcard__preview"
      data-size={size}
      data-kind={preview?.kind ?? "none"}
      aria-hidden="true"
      // Thumbnails are pictures of the component: nothing inside is focusable or clickable.
      inert
    >
      {preview ? preview.render() : <span className="pt-pv-muted">No preview</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Detail panel                                                        */
/* ------------------------------------------------------------------ */

function PropRow({ p }: { p: PropInfo }) {
  return (
    <tr data-deprecated={p.deprecated ? "true" : undefined}>
      <th scope="row">
        <code>{p.name}</code>
        {p.required ? <span className="pt-prop-req" title="Required">required</span> : null}
        {p.deprecated ? <span className="pt-prop-dep">deprecated</span> : null}
      </th>
      <td>
        <code className="pt-prop-type">{p.type}</code>
        {p.doc ? <span className="pt-prop-doc">{p.doc}</span> : null}
      </td>
    </tr>
  );
}

function DetailPanel({ item, headingRef }: { item: GalleryItem; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const status = STATUS_BADGE[item.status];
  const info = item.props ? STATS.props[item.props] : undefined;
  const props = info?.props ?? [];
  const variants = props.filter((p) => p.values && p.values.length > 1 && VARIANT_PROPS.includes(p.name)).slice(0, 4);
  const sorted = [...props].sort((a, b) => Number(b.required) - Number(a.required) || Number(!!a.deprecated) - Number(!!b.deprecated));
  const head = sorted.slice(0, PROPS_PREVIEW);
  const rest = sorted.slice(PROPS_PREVIEW);
  const group = INVENTORY.find((g) => g.id === item.group);
  const kind = getPreview(item.name)?.kind;

  return (
    <div className="pt-detail__inner">
      <div className="pt-detail__head">
        <span className="pt-eyebrow">{group?.title ?? "Component"}</span>
        <h2 ref={headingRef} tabIndex={-1} className="pt-detail__title" id="pt-detail-title">
          {item.name}
        </h2>
        <div className="pt-row">
          <Badge variant={status.variant} dot>
            {status.label}
          </Badge>
          {item.replacement ? <Badge tone="outline">{item.status === "legacy" ? `Use ${item.replacement}` : item.replacement}</Badge> : null}
          {kind === "schematic" ? <Badge tone="outline">Schematic preview</Badge> : null}
        </div>
        <p className="pt-detail__desc">{item.description}</p>
      </div>

      <PreviewFrame item={item} size="panel" />

      <CodeBlock code={importLine(item)} language="tsx" title="Import" wrap />

      {variants.length ? (
        <section aria-labelledby="pt-detail-variants" className="pt-detail__block">
          <h3 id="pt-detail-variants">Variants</h3>
          <dl className="pt-variants">
            {variants.map((v) => (
              <div key={v.name}>
                <dt>
                  <code>{v.name}</code>
                </dt>
                <dd>
                  {v.values?.map((val) => (
                    <span key={val} className="pt-variant-chip">
                      {val}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section aria-labelledby="pt-detail-props" className="pt-detail__block">
        <h3 id="pt-detail-props">
          Props {props.length ? <span className="pt-muted pt-small">({props.length})</span> : null}
        </h3>
        {props.length ? (
          <>
            <div className="pt-table-scroll" tabIndex={0} role="region" aria-label={`${item.name} props`}>
              <table className="pt-props-table">
                <thead>
                  <tr>
                    <th scope="col">Prop</th>
                    <th scope="col">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {head.map((p) => (
                    <PropRow key={p.name} p={p} />
                  ))}
                </tbody>
              </table>
            </div>
            {rest.length ? (
              <details className="pt-detail__more">
                <summary>Show {rest.length} more props</summary>
                <div className="pt-table-scroll" tabIndex={0} role="region" aria-label={`More ${item.name} props`}>
                  <table className="pt-props-table">
                    <tbody>
                      {rest.map((p) => (
                        <PropRow key={p.name} p={p} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ) : null}
            {info ? (
              <p className="pt-small pt-muted">
                From <code className="pt-inline-code">{item.props}</code> in <code className="pt-inline-code">{info.file}</code>
              </p>
            ) : null}
          </>
        ) : (
          <p className="pt-small pt-muted">{item.status === "legacy" ? "Deprecated alias — see its replacement." : "No props interface recorded."}</p>
        )}
      </section>

      {item.story ? (
        <Button variant="primary" icon={<IconArrowRight />} iconPosition="right" fullWidth {...portalLinkProps(item.story, "component")}>
          Open {importNames(item.name)[0]} docs
        </Button>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function ComponentsPage() {
  const reduced = useReducedMotion() ?? false;
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(ALL_ITEMS[0]?.name ?? "");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const items = useMemo(() => filterItems(ALL_ITEMS, category, query), [category, query]);
  const current = ALL_ITEMS.find((i) => i.name === selected) ?? ALL_ITEMS[0];

  const select = useCallback((name: string) => {
    setSelected(name);
    // Narrow layouts stack the panel under the grid: take the reader there.
    if (typeof window !== "undefined" && window.matchMedia?.("(max-width: 71.99rem)").matches) {
      requestAnimationFrame(() => {
        headingRef.current?.focus({ preventScroll: true });
        panelRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
    }
  }, [reduced]);

  // Keep the selection inside the visible set when filtering.
  useEffect(() => {
    if (items.length && !items.some((i) => i.name === selected)) setSelected(items[0].name);
  }, [items, selected]);

  const counts = useMemo(
    () => INVENTORY.reduce<Record<string, number>>((acc, g) => ({ ...acc, [g.id]: g.items.length }), {}),
    [],
  );

  return (
    <PortalPage
      section="Overview / Components"
      icon={<IconPackage />}
      title="Components"
      description="Every component with a live preview. Select a card for its props and variants, or open its documentation."
      actions={
        <Button variant="outlinePrimary" size="md" {...portalLinkProps("Overview/Dashboard")}>
          Dashboard
        </Button>
      }
    >
      <ul className="pt-chips" aria-label="Gallery facts">
        <li>{COMPONENT_TOTAL} components</li>
        <li>{NEW_TOTAL} new</li>
        {ALL_ITEMS.length > COMPONENT_TOTAL ? <li>{ALL_ITEMS.length - COMPONENT_TOTAL} legacy alias</li> : null}
        <li>{INVENTORY.length} categories</li>
        <li>{PRODUCT.standard}</li>
      </ul>

      <MotionConfig reducedMotion="user">
        <Tabs value={category} onValueChange={setCategory} variant="line" listLayout="nowrap" contentAnimation="none" size="sm">
          <div className="pt-gallery__bar">
            <TabsList ariaLabel="Component categories">
              <TabsTrigger value="all">All ({ALL_ITEMS.length})</TabsTrigger>
              {INVENTORY.map((g) => (
                <TabsTrigger key={g.id} value={g.id}>
                  {g.title} ({counts[g.id]})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="pt-gallery__search">
            <InputSearch id="pt-gallery-search" value={query} onChange={setQuery} placeholder="Search components…" ariaLabel="Search components" showClearButton fullWidth />
            <p className="pt-small pt-muted" role="status" aria-live="polite">
              Showing {items.length} of {ALL_ITEMS.length}
            </p>
          </div>

          <div className="pt-gallery">
            <TabsContent value={category} className="pt-gallery__main">
              {items.length ? (
                <LayoutGroup>
                  <motion.ul className="pt-gallery__grid" aria-label="Components" layout={!reduced}>
                    <AnimatePresence mode="popLayout" initial={!reduced}>
                      {items.map((item, i) => {
                        const isSel = current?.name === item.name;
                        const status = STATUS_BADGE[item.status];
                        const id = `pt-card-${slug(item.name)}`;
                        return (
                          <motion.li
                            key={item.name}
                            layout={!reduced}
                            className="pt-gcard"
                            data-selected={isSel ? "true" : undefined}
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.28, delay: reduced ? 0 : Math.min(i, 10) * 0.03 } }}
                            exit={reduced ? undefined : { opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                            whileHover={reduced ? undefined : { y: -3 }}
                            transition={{ type: "tween", ease: "easeOut", duration: reduced ? 0 : 0.25 }}
                          >
                            <PreviewFrame item={item} />
                            <div className="pt-gcard__body">
                              <div className="pt-gcard__title-row">
                                <h3 className="pt-gcard__name" id={id}>
                                  <button
                                    type="button"
                                    className="pt-gcard__select"
                                    aria-pressed={isSel}
                                    aria-controls="pt-detail"
                                    onClick={() => select(item.name)}
                                  >
                                    {item.name}
                                  </button>
                                </h3>
                                <Badge variant={status.variant} size="sm">
                                  {status.label}
                                </Badge>
                              </div>
                              <p className="pt-gcard__desc">{item.description}</p>
                              {item.story ? (
                                <a className="pt-gcard__docs" aria-label={`${item.name} documentation`} {...portalLinkProps(item.story, "component")}>
                                  Docs <IconExternal />
                                </a>
                              ) : null}
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </motion.ul>
                </LayoutGroup>
              ) : (
                <EmptyState
                  title="No components match"
                  description="Try another name or switch to All."
                  compact
                  action={
                    <Button
                      variant="outlinePrimary"
                      size="sm"
                      onClick={() => {
                        setQuery("");
                        setCategory("all");
                      }}
                    >
                      Reset filters
                    </Button>
                  }
                />
              )}
            </TabsContent>

            <aside ref={panelRef} id="pt-detail" className="pt-detail" aria-labelledby="pt-detail-title">
              {current ? <DetailPanel key={current.name} item={current} headingRef={headingRef} /> : null}
              <p className="pt-small pt-muted pt-detail__foot">
                <IconFileCode /> Props are extracted from the <code className="pt-inline-code">*.types.ts</code> sources at build time.
              </p>
            </aside>
          </div>
        </Tabs>
      </MotionConfig>
    </PortalPage>
  );
}
