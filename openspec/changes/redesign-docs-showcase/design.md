# Design

## Context

The existing hash registry already owns component routing. Keep that contract and the library primitives. See proposal.md for motivation.

## Goals / Non-Goals

Create a restrained, dense documentation workspace. Do not redesign the published library.

## Decisions

### Discovery

**Chosen:** Preserve the existing flat component sidebar and live-demo overview. Use shared grid dividers, smaller demo stages, readable names and richer component compositions.
**Alternatives considered:** Independent rounded cards repeat the frame around every control and create a disconnected layout.
**Dropped:** A curated dashboard and category index; the user explicitly requires a simple grid of demos and the existing sidebar. Replaced by improvements to that grid.
**Evidence:** User clarification; rendered desktop and narrow-layout checks.

### Detail navigation

**Chosen:** Keep hash routes, use example buttons with scrollIntoView, key details by component, add unique control IDs and reset buttons.
**Alternatives considered:** Nested hash anchors collide with existing routing. A router dependency is unnecessary.
**Dropped:** None.
**Evidence:** Verified against use-hash-route.ts and detail.tsx.

### Presentation

**Chosen:** Transparent showcase containers, typographic hierarchy, thin dividers and functional link hover feedback. Home tiles show the component name without example counts; components retain their own surfaces. Keep frequent navigation instant.
**Alternatives considered:** Animated card entrances add latency to repeated documentation use.
**Dropped:** None.
**Evidence:** Emil Kowalski and Apple design skill principles; Kumo and shadcn documentation references.

## Risks / Trade-offs

Curated previews cover fewer components at once → the full searchable index retains every route.

## Migration Plan

Build and deploy docs as usual. Reverting apps/docs restores the old presentation; no data migration.
