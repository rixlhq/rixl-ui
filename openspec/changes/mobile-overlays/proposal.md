# Proposal

## Why

Dialogs use the same inset layout on phones as desktops. Long content can escape sheets and popovers, making controls unreachable.

## What Changes

- **BREAKING** visual default: regular dialogs fill screens below 640px; desktop size variants remain centered. No exports change.
- Keep confirmation alerts inset and scrollable; wrap long text and contain wide data.
- Bound and scroll sheets, popovers and submenus; enlarge mobile close controls and avoid mobile text-field zoom.
- Add mobile browser regression tests and a long-content docs example.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-system`: responsive overlay layout, overflow containment and mobile text-field sizing.

## Impact

UI overlay and text-field styles, browser tests and docs. No new dependencies.

## Non-goals

Gesture dismissal, a new drawer primitive, consumer application layouts, and replacing Base UI interaction behavior.

## Acceptance

At 320px portrait and short landscape dimensions, overlays fit the viewport and final content/actions remain reachable. Desktop dialogs retain size variants. Checks and browser accessibility tests pass. Device keyboard/safe-area behavior remains a hardware verification item.
