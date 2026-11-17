# Design

## Context

See proposal.md. Existing dialogs and alerts have height bounds; side/top sheets and popovers lack complete overflow containment. Use existing tokens and Tailwind responsive utilities.

## Goals / Non-Goals

Keep content readable and reachable without changing composition APIs. No gesture or focus-management changes.

## Decisions

### Responsive dialogs

**Chosen:** Fullscreen below the existing sm breakpoint, centered size variants above it. Use dynamic viewport height, safe-area padding, natural-height content rows, text wrapping and horizontal containment. Keep alerts compact because confirmation tasks benefit from a smaller surface.

**Alternatives considered:** Fullscreen all overlays wastes space for short confirmations; a new mobile prop adds configuration for the requested default; fixed headers/footers require new body composition or assumptions about child structure.

**Dropped:** None.

**Evidence:** Verified against source: dialog/content.tsx and alert-dialog/content.tsx currently share centered layouts; mobile browser tests will measure bounds and scrolling.

### Overflow and touch

**Chosen:** Scroll the overlay itself; let Table own horizontal data scrolling. Bound anchored surfaces with Base UI's available-height variable, retaining existing positioning. Keep submenu vertical scrolling. Use 44px phone close targets, safe-area spacing and 16px phone text fields.

**Alternatives considered:** Hiding overflowing text/data loses information; global touch/scroll overrides affect consuming applications; JavaScript viewport detection adds unnecessary state.

**Dropped:** None.

**Evidence:** Verified against source: select/content.tsx and dropdown-menu/content.tsx already use --available-height; table/table.tsx owns horizontal scrolling. Browser regression tests cover popup height and sheet end actions.

## Risks / Trade-offs

- Fullscreen is a changed visual default on phones → flag in proposal and docs, retain consumer className overrides.
- Entire dialog scrolls, including its header → explicit footer close controls remain reachable at the end.
- Browser viewport tests cannot prove iOS keyboard/safe-area behavior → document the remaining device check.

## Migration Plan

No import migration. Consumers relying on the inset phone layout must review the new default. Reverting the style changes restores it.
