# componant-ui-harness — agent harness

**Goal:** React component library (ui-common-components) — design-system-governed component, hook, and screen authoring with WCAG 2.2 AA / security / responsiveness compliance review

For React component library (ui-common-components) — design-system-governed component, hook, and screen authoring with WCAG 2.2 AA / security / responsiveness compliance review tasks, run the fleet orchestrator instead of working solo. Simple questions can be answered directly.

## Invoking the fleet

- **opencode:** run `/run-componant-ui-harness`, or switch to the `run-componant-ui-harness` primary agent (fleet subagents live in `.opencode/agents/`).
- **goose:** `goose run --recipe .goose/recipes/run-componant-ui-harness.yaml`
- **Claude Code:** the `run-componant-ui-harness` skill triggers on domain requests (see CLAUDE.md).

## Coordination

Fleet coordination is file-based under `_fleet/`: handoff documents in `_fleet/handoffs/` (template provided) and a task ledger at `_fleet/LEDGER.md`. Handoff files are the source of truth between agents — read them before resuming or auditing fleet work, and never delete them mid-run.

## Changelog

| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-08-18 | Initial fleet build (fleetsmith) | all | - |
