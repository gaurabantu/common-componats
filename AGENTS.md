# Project AI memory

**Canonical copy: [`docs/AGENTS.md`](docs/AGENTS.md)** — edit that file; this root file stays a short pointer for tools that only open the repository root.

**Read every Markdown file under [`docs/`](docs/)** in the order in [`docs/README.md`](docs/README.md) (includes [`docs/internal/`](docs/internal/) and flow diagrams).

- Full reading order + diagrams: [`docs/README.md`](docs/README.md)  
- Design system: [`docs/design-system/DESIGN_SYSTEM.md`](docs/design-system/DESIGN_SYSTEM.md)  
- Tokens (import / hooks): [`docs/design-system/tokens.md`](docs/design-system/tokens.md)  
- Components: [`docs/UI_COMPONENTS_GUIDE.md`](docs/UI_COMPONENTS_GUIDE.md)  
- Internal map: [`docs/internal/DOC_INDEX.md`](docs/internal/DOC_INDEX.md)  

Import **`ui-common-components/design-system/tokens.css`** once in the app root. Prefer components from **`ui-common-components`** over bespoke UI. For smaller bundles on focused screens, use subpaths **`ui-common-components/charts`**, **`/shell`**, or **`/table`** (see **`docs/UI_COMPONENTS_GUIDE.md`**).
