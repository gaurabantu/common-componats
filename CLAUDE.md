## Harness: componant-ui-harness

**Goal:** React component library (ui-common-components) — design-system-governed component, hook, and screen authoring with WCAG 2.2 AA / security / responsiveness compliance review

**Trigger:** For React component library (ui-common-components) — design-system-governed component, hook, and screen authoring with WCAG 2.2 AA / security / responsiveness compliance review tasks, use the `run-componant-ui-harness` skill. Simple questions can be answered directly.

**Handover gate:** `.claude/settings.json` registers a `SubagentStop` hook running `_fleet/scripts/validate-handoff.sh`, which blocks a fleet agent from finishing until its handoff file exists and carries every required section. Note that project-level hooks do not run until this workspace is trusted — until you accept that dialog the gate is silently skipped and the fleet degrades to advisory instructions.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-08-18 | Initial fleet build (fleetsmith) | all | - |
