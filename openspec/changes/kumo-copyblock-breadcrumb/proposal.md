## Why

Kumo documents `ClipboardText` with `size`, `textToCopy` and `masked` (https://kumo-ui.com/components/clipboard-text.md) and `Breadcrumbs` with `size`, `icon` and a `loading` current item (https://kumo-ui.com/components/breadcrumbs.md). `CopyBlock` has no size, copies only what it shows, and cannot hide a secret; `Breadcrumb` has no size, no icon slot and no loading state.

Two internal duplications are cleaned up in the same pass: five sidebar parts repeat the same focus-ring classes and read `data-sidebar` attributes that duplicate `data-slot`, and the check-mark wrapper of the menu and select items is written three times.

## What Changes

- **BREAKING** `CopyBlock`'s `value` prop is renamed `text`, as in Kumo.
- `CopyBlock` gains `textToCopy` (copied instead of `text`), `size` (`sm | base | lg`, default `lg`) and `masked`. A masked block shows bullets until a reveal button is pressed; `labels` gains `revealAction` and `hideAction` (defaults "Reveal value" and "Hide value"), resolved labels, then provider, then default like the other labels.
- `Breadcrumb` gains `size` (`sm | base`, default `base`); `BreadcrumbLink` and `BreadcrumbPage` gain `icon`; `BreadcrumbPage` gains `loading`.
- Sidebar: the five repeated focus-ring class strings become one `focusRingSidebar` in `src/lib/classes.ts`; the `data-sidebar` attributes are removed and the one selector that read them reads `data-slot`.
- `dropdown-menu` and `select` items share one `menuItemIndicator` class for the check-mark wrapper.

**Breaking status**: breaking (`value` to `text`); ships as the next major through `feat(copy-block)!:`. The other items are additive or internal. Removing `data-sidebar` drops an attribute consumers could have used as a selector hook; `data-slot` is the supported hook.

## Capabilities

### Modified Capabilities

- `design-system`: Kumo's `ClipboardText` and `Breadcrumbs` options.

## Non-goals

- Kumo's `onCopy` callback on `ClipboardText`, `Breadcrumbs.Clipboard`, and Kumo's mobile truncation of long trails.
- Renaming the `Breadcrumb*` parts to Kumo's `Link`, `Current`, `Separator` (see design 4).
- Changing the sidebar focus ring's look (see design 6).

## Acceptance

- `vpr ci` is green from the repository root.
- `vpr budget` stays within `.size-limit.json`, which this change does not edit.
