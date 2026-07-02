/**
 * Real-world zone-aware usage of FeedbackStates inside DashboardShell.
 *
 * Per COMPOSITION_RULES_1 the AI must define zones BEFORE code:
 *
 * ┌──────────────────────────────────────────┐
 * │ ZONE 1: AppTopbar — title + primary CTA  │
 * ├──────────────────────────────────────────┤
 * │ ZONE 2: OfflineBanner (when offline)     │  ← sticky strip, warning tone
 * ├──────────────────────────────────────────┤
 * │ ZONE 3: Filters / tabs / date range      │
 * ├──────────────────────────────────────────┤
 * │ ZONE 4: Main content                     │
 * │   ✓ Table (when data exists)             │
 * │   ✓ EmptyState (when list is empty)      │
 * │   ✓ ErrorState (when fetch failed)       │
 * │   ✓ OfflineBanner full-panel (offline)   │
 * ├──────────────────────────────────────────┤
 * │ ZONE 5: Pagination / footer              │
 * └──────────────────────────────────────────┘
 *
 * CTA hierarchy (COMPOSITION_RULES_1):
 *   Zone 1 Add button → variant="primary"   size="md"   (main action)
 *   Zone 1 Import     → variant="outlineSecondary"  size="sm"  (alt action)
 *   Zone 4 EmptyState action → variant="primary"   (same intent as Zone 1)
 *   Zone 4 EmptyState extra  → variant="ghost"     (escape hatch)
 *   Zone 4 ErrorState retry  → variant="outlinePrimary"
 *   Zone 4 ErrorState extra  → variant="ghost"
 */

import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useRef, useState } from "react";
import { useAsyncContentPhase, useClientTableState, useDebounce, useOnlineStatus } from "ui-common-hooks";

import Button from "../../components/atoms/Button";
import TextView from "../../components/atoms/TextView";
import TextInput from "../../components/atoms/TextInput";
import Card, { CardContent, CardHeader, CardTitle, CardAction } from "../../components/molecules/Card";
import { FeedbackState, OfflineBanner } from "../../components/molecules/FeedbackStates";
import {
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
} from "../../components/molecules/FeedbackStates/FeedbackStates.animations";

const meta = {
  title: "Design System/Molecules/Feedback states/Real-world usage",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

// ─── Shared demo data ─────────────────────────────────────────────────────────

type User = { id: string; name: string; email: string; status: "active" | "inactive"; role: string };

const SEED_USERS: User[] = [
  { id: "u1", name: "Alice Chen",    email: "alice@corp.com",   status: "active",   role: "Admin" },
  { id: "u2", name: "Bob Kapur",     email: "bob@corp.com",     status: "active",   role: "Editor" },
  { id: "u3", name: "Carol Müller",  email: "carol@corp.com",   status: "inactive", role: "Viewer" },
  { id: "u4", name: "David Park",    email: "david@corp.com",   status: "active",   role: "Editor" },
  { id: "u5", name: "Eva Johansson", email: "eva@corp.com",     status: "inactive", role: "Viewer" },
];

// ─── Story 1: User Management table with EmptyState + ErrorState ──────────────

/**
 * Zone plan:
 *   Zone 1  AppTopbar surrogate — "User Management" heading + "Add User" (primary) + "Import CSV" (outlineSecondary)
 *   Zone 2  OfflineBanner (shown when forced offline)
 *   Zone 3  Search filter input
 *   Zone 4  Table OR EmptyState (no data) OR ErrorState (fetch failed)
 *   Zone 5  Row count footer
 */
export const UserManagementTable: StoryObj = {
  name: "User management — table with feedback states",
  render: function Render() {
    const [data, setData] = useState<User[]>(SEED_USERS);
    const [simulateError, setSimulateError] = useState(false);
    const [simulateOffline, setSimulateOffline] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const filteredData = useMemo(
      () =>
        data.filter(
          (u) =>
            u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
        ),
      [data, debouncedSearch]
    );

    const view = useAsyncContentPhase<User>({
      items: filteredData,
      loading: false,
      error: simulateError ? new Error("Failed to load users — 503 Service Unavailable") : null,
      requireNetwork: simulateOffline,
    });

    // ── Zone 1: Page header with CTAs following hierarchy ──────────────────
    const zone1 = (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "var(--space-3, 12px)",
        padding: "var(--space-4, 16px) 0",
        borderBottom: "1px solid var(--color-border-subtle)",
        marginBottom: "var(--space-4, 16px)",
      }}>
        <TextView as="h1" variant="h3">User Management</TextView>
        <div style={{ display: "flex", gap: "var(--space-2, 8px)" }}>
          {/* Zone 1: primary CTA — main action (lg or md, leftmost) */}
          <Button variant="primary" size="md" type="button" onClick={() => setData((d) => [
            { id: `u${Date.now()}`, name: "New User", email: "new@corp.com", status: "active", role: "Viewer" },
            ...d,
          ])}>
            Add User
          </Button>
          {/* Zone 1: secondary — alternative action (smaller, right of primary) */}
          <Button variant="outlineSecondary" size="sm" type="button">
            Import CSV
          </Button>
        </div>
      </div>
    );

    // ── Zone 2: OfflineBanner — sticky warning strip ───────────────────────
    const zone2 = simulateOffline ? (
      <OfflineBanner
        sticky
        tone="warning"
        message="Reconnect to load and save user data."
        onRetry={() => setSimulateOffline(false)}
        style={{ marginBottom: "var(--space-3, 12px)" }}
      />
    ) : null;

    // ── Zone 3: Filters ────────────────────────────────────────────────────
    const zone3 = (
      <div style={{ marginBottom: "var(--space-4, 16px)" }}>
        <TextInput
          label="Search users"
          placeholder="Name or email…"
          value={search}
          onChange={setSearch}
        />
      </div>
    );

    // ── Zone 4: Content ────────────────────────────────────────────────────
    let zone4: React.ReactNode;

    if (view.phase === "offline") {
      zone4 = (
        <FeedbackState
          variant="offline"
          image={<OfflineAnimation size={110} />}
          headline="You're offline."
          message="User data can't be loaded without a connection."
          onRetry={() => setSimulateOffline(false)}
        />
      );
    } else if (view.phase === "error") {
      zone4 = (
        <FeedbackState
          variant="error"
          image={<ErrorAnimation size={110} />}
          title="Could not load users"
          description="The server returned an error. Retry or contact support."
          onRetry={() => setSimulateError(false)}
          extra={
            <Button variant="ghost" size="sm" type="button">
              View status page
            </Button>
          }
        />
      );
    } else if (view.phase === "empty") {
      const hasSearch = debouncedSearch.length > 0;
      zone4 = (
        <FeedbackState
          variant="empty"
          image={hasSearch ? <NoSearchResultsAnimation size={110} /> : <NoDataAnimation size={110} />}
          title={hasSearch ? "No matching users" : "No users yet"}
          description={
            hasSearch
              ? "Try a different name or email."
              : "Add your first team member to get started."
          }
          action={
            !hasSearch ? (
              /* Primary action: same intent as Zone 1 "Add User" */
              <Button variant="primary" size="md" type="button" onClick={() => setData((d) => [
                { id: `u${Date.now()}`, name: "New User", email: "new@corp.com", status: "active", role: "Viewer" },
                ...d,
              ])}>
                Add User
              </Button>
            ) : undefined
          }
          extra={
            hasSearch ? (
              /* Escape hatch — ghost, lower hierarchy */
              <Button variant="ghost" size="sm" type="button" onClick={() => setSearch("")}>
                Clear search
              </Button>
            ) : (
              <Button variant="ghost" size="sm" type="button">Import CSV</Button>
            )
          }
        />
      );
    } else {
      zone4 = (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border-subtle)" }}>
                {["Name", "Email", "Status", "Role", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "var(--space-2, 8px) var(--space-3, 12px)", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <td style={{ padding: "var(--space-2, 8px) var(--space-3, 12px)" }}>{u.name}</td>
                  <td style={{ padding: "var(--space-2, 8px) var(--space-3, 12px)", color: "var(--color-text-secondary)" }}>{u.email}</td>
                  <td style={{ padding: "var(--space-2, 8px) var(--space-3, 12px)" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                      background: u.status === "active" ? "var(--color-success-fill)" : "var(--color-fill-muted)",
                      color: u.status === "active" ? "var(--color-success-strong)" : "var(--color-text-secondary)",
                    }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: "var(--space-2, 8px) var(--space-3, 12px)" }}>{u.role}</td>
                  <td style={{ padding: "var(--space-2, 8px) var(--space-3, 12px)" }}>
                    {/* Row actions: ghost — lowest hierarchy, contextual */}
                    <div style={{ display: "flex", gap: 4 }}>
                      <Button variant="ghost" size="sm" type="button">Edit</Button>
                      <Button variant="ghost" size="sm" type="button" onClick={() => setData((d) => d.filter((x) => x.id !== u.id))}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // ── Zone 5: Footer ─────────────────────────────────────────────────────
    const zone5 = view.phase === "ready" ? (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-3, 12px) 0", marginTop: "var(--space-3, 12px)", borderTop: "1px solid var(--color-border-subtle)" }}>
        <TextView as="p" variant="small" color="secondary">
          {filteredData.length} user{filteredData.length !== 1 ? "s" : ""}
        </TextView>
        {/* Zone 5 CTAs: ghost — lowest hierarchy */}
        <Button variant="ghost" size="sm" type="button">Export CSV</Button>
      </div>
    ) : null;

    return (
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Simulate controls (story-only) */}
        <Card style={{ marginBottom: "var(--space-4, 16px)" }}>
          <CardHeader>
            <CardTitle>Story controls</CardTitle>
            <CardAction>
              <TextView as="p" variant="small" color="secondary">Toggle to simulate states</TextView>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", gap: "var(--space-2, 8px)", flexWrap: "wrap" }}>
              <Button
                variant={simulateError ? "primary" : "outlineSecondary"}
                size="sm" type="button"
                onClick={() => { setSimulateError((v) => !v); setSimulateOffline(false); }}
              >
                {simulateError ? "✓ Error simulated" : "Simulate API error"}
              </Button>
              <Button
                variant={simulateOffline ? "primary" : "outlineSecondary"}
                size="sm" type="button"
                onClick={() => { setSimulateOffline((v) => !v); setSimulateError(false); }}
              >
                {simulateOffline ? "✓ Offline simulated" : "Simulate offline"}
              </Button>
              <Button
                variant="outlineSecondary"
                size="sm" type="button"
                onClick={() => setData([])}
              >
                Clear all data
              </Button>
              <Button
                variant="ghost"
                size="sm" type="button"
                onClick={() => { setData(SEED_USERS); setSearch(""); setSimulateError(false); setSimulateOffline(false); }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* The actual 5-zone page */}
        {zone1}
        {zone2}
        {zone3}
        {zone4}
        {zone5}
      </div>
    );
  },
};

// ─── Story 2: Metric dashboard with OfflineBanner sticky strip ────────────────

/**
 * Zone plan:
 *   Zone 1  Dashboard heading + Export button
 *   Zone 2  OfflineBanner sticky (when offline) — warns metrics may be stale
 *   Zone 3  — (no filters on this view)
 *   Zone 4  Metric cards grid (2×2)
 *   Zone 5  "Last updated" timestamp
 */
export const MetricsDashboardOffline: StoryObj = {
  name: "Metrics dashboard — offline strip (Zone 2)",
  render: function Render() {
    const [offline, setOffline] = useState(true);
    const metrics = [
      { label: "Total Users",  value: "12 345",  delta: "+3.2%", up: true },
      { label: "Revenue",      value: "$45 678",  delta: "+8.1%", up: true },
      { label: "Orders",       value: "890",      delta: "-1.4%", up: false },
      { label: "Avg Order",    value: "$51.32",   delta: "+0.7%", up: true },
    ];

    return (
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Zone 1 ── Page header, primary CTA hierarchy */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "var(--space-4, 16px) 0",
          borderBottom: "1px solid var(--color-border-subtle)",
          marginBottom: "var(--space-4, 16px)",
        }}>
          <TextView as="h1" variant="h3">Sales Dashboard</TextView>
          {/* Zone 1 CTA: outlineSecondary — export is not the primary goal of viewing */}
          <Button variant="outlineSecondary" size="sm" type="button">Export report</Button>
        </div>

        {/* Zone 2 ── Sticky offline strip */}
        {offline ? (
          <OfflineBanner
            tone="warning"
            compact
            message="Metrics may be stale. Connect to fetch live data."
            actionLabel="Reconnect"
            onRetry={() => setOffline(false)}
            onDismiss={() => setOffline(false)}
            style={{ marginBottom: "var(--space-4, 16px)" }}
          />
        ) : null}

        {/* Zone 4 ── Metric cards — same type, scannable grid */}
        {/* Rule: 4 cards same type → grid, no visual inconsistency */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "var(--space-4, 16px)",
          marginBottom: "var(--space-6, 32px)",
        }}>
          {metrics.map((m) => (
            <Card key={m.label} style={{ opacity: offline ? 0.6 : 1, transition: "opacity 0.2s" }}>
              <CardContent>
                <TextView as="p" variant="small" color="secondary">{m.label}</TextView>
                <TextView as="h2" variant="h3">{m.value}</TextView>
                <TextView as="p" variant="small" color={m.up ? "secondary" : "secondary"} style={{
                  color: m.up ? "var(--color-success-strong)" : "var(--color-danger-strong)"
                }}>
                  {m.delta} vs last month
                </TextView>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zone 5 ── Footer secondary context */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-3, 12px) 0", borderTop: "1px solid var(--color-border-subtle)" }}>
          <TextView as="p" variant="small" color="secondary">
            {offline ? "⚠ Data may be stale" : "Updated just now"}
          </TextView>
          <Button variant="ghost" size="sm" type="button" onClick={() => setOffline(false)}>
            Refresh
          </Button>
        </div>
      </div>
    );
  },
};

// ─── Story 3: Wizard step with ErrorState inside Card ────────────────────────

/**
 * Zone plan:
 *   Zone 1  "Create Product" heading
 *   Zone 2  —
 *   Zone 3  Step indicator
 *   Zone 4  Card with form — if fetch fails → ErrorState replaces CardContent
 *   Zone 5  Back + Next buttons with hierarchy
 */
export const WizardWithErrorInCard: StoryObj = {
  name: "Wizard — ErrorState inside Card (Zone 4)",
  render: function Render() {
    const [step, setStep] = useState(0);
    const [fetchError, setFetchError] = useState(false);
    const STEPS = ["Basic info", "Images", "Pricing", "Review"];

    return (
      <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-5, 24px)" }}>
        {/* Zone 1 */}
        <TextView as="h1" variant="h3">Create Product</TextView>

        {/* Zone 3 — Step indicator */}
        <div style={{ display: "flex", gap: "var(--space-2, 8px)", alignItems: "center" }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                opacity: i > step ? 0.4 : 1,
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600,
                  background: i === step ? "var(--color-theme-primary)" : i < step ? "var(--color-success-strong)" : "var(--color-fill-muted)",
                  color: i <= step ? "var(--color-text-on-primary)" : "var(--color-text-secondary)",
                }}>
                  {i < step ? "✓" : i + 1}
                </span>
                <TextView as="span" variant="small">{s}</TextView>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: "var(--color-border-subtle)", minWidth: 16 }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Zone 4 — Card with step content or ErrorState */}
        <Card>
          <CardHeader>
            <CardTitle>Step {step + 1}: {STEPS[step]}</CardTitle>
            <CardAction>
              {/* Contextual secondary: ghost, scoped to this card */}
              <Button variant="ghost" size="sm" type="button" onClick={() => setFetchError((v) => !v)}>
                {fetchError ? "Clear error" : "Simulate error"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {fetchError ? (
              /* Zone 4 inner — ErrorState replaces content; start-aligned compact to fit card */
              <FeedbackState
                variant="error"
                align="start"
                size="sm"
                compact
                tone="danger"
                title="Could not load step data"
                description="We couldn't fetch the data needed for this step."
                onRetry={() => setFetchError(false)}
                extra={
                  <Button variant="ghost" size="sm" type="button">Go back to start</Button>
                }
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4, 16px)" }}>
                <TextInput label="Product name" placeholder="e.g. Wireless Headphones" onChange={() => {}} />
                <TextInput label="SKU" placeholder="e.g. WH-1234" onChange={() => {}} />
                <TextView as="p" variant="small" color="secondary">
                  Step {step + 1} of {STEPS.length} — fill in the details above.
                </TextView>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Zone 5 — Navigation CTAs with clear hierarchy */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-2, 8px)" }}>
          {/* Left: ghost escape */}
          <Button
            variant="ghost"
            size="md"
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            ← Back
          </Button>
          <div style={{ display: "flex", gap: "var(--space-2, 8px)" }}>
            {/* Secondary: outlineSecondary — save draft, lower intent */}
            <Button variant="outlineSecondary" size="md" type="button">Save draft</Button>
            {/* Primary: main forward action — largest and rightmost */}
            <Button
              variant="primary"
              size="md"
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              {step === STEPS.length - 1 ? "Publish" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
