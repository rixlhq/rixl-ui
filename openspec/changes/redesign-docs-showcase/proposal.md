# Proposal

## Why

The showcase needs better demo composition, visual hierarchy and example browsing while retaining its existing sidebar and simple live-demo grid.

## What Changes

- Rework the overview into a continuous grid of demos with shared dividers and clearly separated navigation links.
- Improve the actual demo compositions and use compact previews where full examples crowd the grid.
- Refine the existing sidebar's typography without changing its structure.
- Show search matches in the main pane from every route.
- Add example navigation, reset controls, code highlighting, copy feedback and adjacent component links.

## Capabilities

### New Capabilities

- `docs-showcase`: Component discovery and example browsing in the showcase app.

### Modified Capabilities

None.

## Non-goals

No changes to packages/ui, public component APIs, dependencies, or the sidebar's information architecture. No curated dashboard or replacement of the demo grid with an index.

## Acceptance

All registered demos remain in the overview. Search ignores surrounding whitespace. Example reset restores the preview without changing other examples. Both themes and narrow layouts work.

## Impact

Only apps/docs and this change's planning artifacts. No breaking changes for package consumers.
