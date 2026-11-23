## Why

Components size themselves with three vocabularies: `Input`, `Select` and `InputArea` use Kumo's `xs | sm | base | lg`, while `Button`, `Empty` and `Dialog` call the middle step `default` and `Tabs` calls it `md`. `Button` also encodes icon-only buttons as four extra sizes (`icon`, `icon-sm`, `icon-xs`, `icon-lg`), names its primary look `default`, and has no `icon` or `title` prop.

Kumo documents one scale and one `Button` API (https://kumo-ui.com/components/button.md, `empty.md`, `dialog.md`, `tabs.md`). Pre-v1 is the time to match it.

## What Changes

- **BREAKING** `Button`, `Empty`, `Dialog` and `Tabs` use `base` for the middle size: `default` → `base` in the first three, `md` → `base` in `Tabs`. `Button` gains `xs`.
- **BREAKING** `Button` variant `default` → `primary`; `secondary-destructive` is new; `link` is removed (Kumo's `Button` has none; inline links are Kumo's `Link`, a different component).
- **BREAKING** `Button` sizes `icon`, `icon-sm`, `icon-xs`, `icon-lg` are replaced by `shape="square" | "circle"` with the regular `size`.
- `Button` gains `icon` (a component or a node, rendered before the children; replaced by the spinner while `loading`) and `title` (wraps the button in a `Tooltip` and names an icon-only button).
- Internal callers (`CopyButton`, `DatePickerDayButton`, `PaginationNavButton`, `SidebarTrigger`, `InputGroupButton`, `TabsOverflowControl`) and the docs showcases move to the new names.

**Breaking status**: breaking; ships as the next major through `feat(<component>)!:` commits.

## Capabilities

### Modified Capabilities

- `design-system`: one size vocabulary, and Kumo's `Button` variants, shapes, `icon` and `title`.

## Out of scope

- The sidebar's internal size scale.
- Kumo's `LinkButton` and `RefreshButton`: `Button` keeps Base UI's `render` for anchors.
- Kumo's emphasis gradient on `primary` and `destructive`; Rixl keeps its token-based fills.
