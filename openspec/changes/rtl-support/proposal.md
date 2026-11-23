## Why

Parts of `@rixl/ui` already mirror under `dir="rtl"` (`ms-`/`me-`/`start-`/`end-` utilities, `rtl:-scale-x-100` on pagination, tabs overflow and the dropdown sub-menu chevron, the progress and switch travel, the date-picker slide), but nothing tests it and four things still break:

- The mobile sidebar sheet is pinned with `left-0 border-r` / `right-0 border-l` and slides with `-translate-x-full`, while the desktop sidebar already maps `side="left"` to `start-0`. In RTL the two disagree.
- `DialogCloseButton` sits at `end-[max(…, env(safe-area-inset-right))]`. In RTL `end` is the left edge, so the notch inset applied is the wrong one.
- `BreadcrumbSeparator`'s default chevron points away from the reading direction in RTL.
- Base UI reads direction from its own `DirectionProvider` (default `ltr`), not from the DOM `dir`. Without it, menu sub-menu keys, slider, tabs and radio arrow keys and popup `start`/`end` alignment stay left-to-right. Kumo exposes it as `primitives/direction-provider`; `@rixl/ui` has no way to reach it.

Kumo's own sidebar is physical (`left-0`, `border-r`, https://github.com/cloudflare/kumo/blob/main/packages/kumo/src/components/sidebar/sidebar.tsx), so parity here means keeping its API and fixing the behaviour, not copying its classes.

## What Changes

- **Logical mobile sidebar.** `side="left"` pins the sheet to the inline start (`start-0 border-e`), `side="right"` to the inline end, and the sheet slides out toward that edge in both directions. The prop values stay `"left" | "right"` (Kumo's API); they already meant start and end on desktop.
- **One flip class.** `rtlFlip` (`rtl:-scale-x-100`) joins `src/lib/classes.ts` and replaces the four copies: pagination, tabs overflow, dropdown sub-menu, and the breadcrumb separator, which gains it. The date picker's descendant-selector rotation moves into `DatePickerChevron` and uses the same class.
- **New `@rixl/ui/direction-provider` subpath** re-exporting Base UI's `DirectionProvider`, as Kumo does.
- **Left physical on purpose:** dialog `left-1/2` plus `translate-x` centring and its `pl`/`pr` safe-area padding (insets are physical), the tabs indicator's `left-0` plus `--active-tab-left` (Base UI measures a physical offset), `bg-linear-to-r`/`-l` fades (flipped with `rtl:`), and sonner's physical `position` prop.
- **Browser tests** render tabs, sidebar, pagination, breadcrumb, dialog and dropdown menu inside `dir="rtl"` and assert computed geometry, plus axe.
- **Docs app.** A direction toggle in the header sets `dir` on the document and wraps the app in `DirectionProvider`.

## Capabilities

### Modified Capabilities

- `design-system`: RTL requirement, `DirectionProvider` subpath.

## Non-goals

- No new tokens (the preset is at its size budget).
- No `start`/`end` rename of `Sidebar side`, no Sonner `position` mapping.
- No automatic detection of `dir`: Base UI needs `DirectionProvider`, which the consumer renders.

## Acceptance

- Browser tests in `dir="rtl"` pass for each component named above.
- `vp check`, `vp test --run`, coverage floor, `vp pack`, `vpx publint`, `vpx size-limit` (budgets unchanged) and the docs build pass.
