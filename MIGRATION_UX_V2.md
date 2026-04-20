# Migration — UX Governance v2 alignment (library changes)

This document summarizes **breaking** and notable behaviour changes when upgrading to the revision that aligns **AlertDialog**, **Modal**, **Button**, **Card**, and **theme tokens** with the UX Governance spec (modal §27, button §20, card §26, destructive dialogs §27, theme §42).

---

## SemVer

Treat this upgrade as **major** (`1.x.0`) if you depend on previous defaults for:

- Default **Button** height (was 44px via `md`, now default size is **`lg`** = 44px — same pixel height, **size name** changed).
- **`data-theme="green"`** full-page palette (mint page background, borders, accents).
- **Card** `filled` / combined border + shadow.
- **Modal** default max widths or **z-index** 1050.
- **AlertDialog** `destructive` using red **filled** confirm.

---

## 1. Button

| Change | Migration |
|--------|-----------|
| Five heights: `xxs` (28) · `xs` (32) · `sm` (36) · **`md` (40)** · **`lg` (44)** | Screen **primary** → `variant="primary"` **`size="lg"`** (default size is now `lg`). **Outlined secondary** actions → `size="md"` (40px). |
| Default **`size`** is **`lg`** (was `md`) | If you relied on **implicit default** for **secondary** height, set **`size="md"`** explicitly on outline/cancel buttons. |
| Icon-only hit areas | All icon-only presets use at least **44×44px** for touch compliance. |

---

## 2. Modal

| Change | Migration |
|--------|-----------|
| Default **max-width**: `sm` **400px**, `md` **480px**, `lg` **560px** | Wider layouts: use **`xl`** (800px) or **`xxl`**. |
| Default **`zIndex`** **400** (matches `var(--z-modal)`) | If you stacked layers assuming `1050`, update stacking or pass `zIndex` explicitly. |

---

## 3. AlertDialog

| Change | Migration |
|--------|-----------|
| **`destructive`** default confirm is **`outlinePrimary`** with **`size="md"`** — **not** red `danger` fill | To recover old behaviour, pass **`confirmButtonVariant="danger"`** (not recommended by §27). |

---

## 4. Card

| Change | Migration |
|--------|-----------|
| **Border XOR shadow** enforced | **`bordered` + elevation** on the same surface: use **`variant="bordered"`** (no shadow) or **`variant="elevated"`** / **`withIndicator`** (shadow, no border). |
| **`variant="withIndicator"`** + **`selected`** | Renders the **4px** lavender indicator bar (§26). |
| **`filled`** | Treated like **`bordered`**; **page-tint background removed** — cards use **`--color-bg-surface`**. To tint locally, wrap content or pass **`style`**. |

---

## 5. Theme (`data-theme="green"`) — §42 strict scope

| Change | Migration |
|--------|-----------|
| Green preset only overrides **interaction / theme** tokens (`--color-theme-*`, wired **primary fill** + **outline primary** + link) | **Page, text, borders, accents** follow **classic blue** `:root` tokens again. |
| Need the **old full green skin** | Copy the previous green block from git history into your **app** global CSS, or fork tokens locally. |

---

## 6. New / updated CSS variables

Apps should rely on:

- `--space-0`, `--z-modal`, `--button-height-*`, `--color-bg-overlay`, `--color-bg-elevated`, `--color-theme-surface-hover`, `--size-indicator-bar`

Import continues via `ui-common-components/design-system/tokens.css` (or package-relative path).

---

## Governance-only rules

**One primary Fill per screen** and **inputs vs actions rows** are still enforced by **product/docs**, not by components. See [`docs/design-system/DESIGN_SYSTEM.md`](docs/design-system/DESIGN_SYSTEM.md) and [`docs/UI_COMPONENTS_GUIDE.md`](docs/UI_COMPONENTS_GUIDE.md).
