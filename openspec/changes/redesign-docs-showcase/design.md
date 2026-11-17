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

**Chosen:** Keep hash routes, use example buttons with scrollIntoView, key details by component, add unique control IDs and a compact example selector on narrow layouts.
**Alternatives considered:** Nested hash anchors collide with existing routing. A router dependency is unnecessary.
**Dropped:** Reset buttons; the user prefers ordinary demo state reset on navigation without a dedicated toolbar action.
**Evidence:** Verified against use-hash-route.ts and detail.tsx.

### Search

**Chosen:** Keep search state inside a header popover, show native links as results and preserve the content underneath. Use Cmd/Ctrl+K, arrow navigation, Enter, Escape and ordinary Tab navigation.
**Alternatives considered:** Filtering the sidebar and replacing the detail page hides context and destroys the current demo when typing.
**Dropped:** Main-pane search results, replaced following user feedback.
**Evidence:** Chromium interaction tests in navigation.browser.test.tsx, including axe checks.

### Presentation

**Chosen:** Transparent showcase containers, typographic hierarchy, thin dividers and functional link hover feedback. Home tiles show the component name without example counts; components retain their own surfaces. Keep frequent navigation instant.
**Alternatives considered:** Animated card entrances add latency to repeated documentation use.
**Dropped:** None.
**Evidence:** Emil Kowalski and Apple design skill principles; Kumo and shadcn documentation references.

## Risks / Trade-offs

Search popovers add a focus boundary → use the existing Base UI popover, with browser tests for dismissal, focus restoration and axe checks.

## Migration Plan

Build and deploy docs as usual. Reverting apps/docs restores the old presentation; no data migration.
