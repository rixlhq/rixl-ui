## Context

Sources read: https://kumo-ui.com/components/{button,empty,dialog,tabs}.md and Kumo's `button.tsx`, `empty.tsx`, `dialog.tsx`, `tabs.tsx` at commit 989cc18.

| Component | Kumo sizes      | Rixl before            | Rixl after      |
| --------- | --------------- | ---------------------- | --------------- |
| Button    | `xs sm base lg` | `sm default lg icon-*` | `xs sm base lg` |
| Empty     | `sm base lg`    | `sm default lg`        | `sm base lg`    |
| Dialog    | `sm base lg xl` | `sm default lg xl`     | `sm base lg xl` |
| Tabs      | `base sm`       | `sm md`                | `sm base`       |

## Decisions

1. **Heights stay.** The rename changes names, not pixels: `Button` `sm`, `base`, `lg` keep `h-8`, `h-9`, `h-10`. `xs` is `h-7`, the same step `Input` uses and the old `icon-xs` square. Kumo's own heights (`h-5`, `h-6.5`) are not copied; the scale already matches `Input`.
2. **`shape` replaces the icon sizes.** `square` and `circle` set `size-7|8|9|10` for `xs|sm|base|lg` with no padding; `circle` adds `rounded-full`. Old `icon` → `shape="square"`, `icon-sm` → `shape="square" size="sm"`, `icon-xs` → `shape="square" size="xs"`, `icon-lg` → `shape="square" size="lg"`.
3. **Default variant stays the filled one.** Kumo's bare `<Button>` is `secondary`; Rixl's is `primary` (the old `default`). Flipping it would restyle every call site that relies on the default, so the default stays and only the name changes.
4. **`link` is removed.** Kumo's `Button` has no `link` variant. A button-styled anchor is `<Button render={<a />} variant="ghost">` (Kumo's `LinkButton`); inline text links are Kumo's `Link`, which Rixl does not have yet.
5. **`icon` accepts a component or a node.** A valid element renders as is; a component type is rendered with no props. While `loading`, the spinner takes the icon's place, as in Kumo. Children still follow.
6. **`title` is a tooltip, not the native attribute.** It is a `ReactNode`, never reaches the DOM, and wraps the button in `Tooltip`. A string or number `title` becomes `aria-label` when there are no children and no `aria-label` or `aria-labelledby`. A disabled or loading button is wrapped in an `inline-flex` span so the tooltip can still open, as in Kumo.
7. **Dev warning for unnamed icon-only buttons is not added.** Kumo enforces the name through a type union; Rixl's `ButtonProps` is reused through `Omit` by `InputGroupButton` and `PaginationNavButton`, which a union would collapse. `DatePickerDayButton` is square and named by its text, so a shape-based warning would be wrong.

## Migration

- `size="default"` → `size="base"` (or nothing) on `Button`, `Empty`, `Dialog`; `size="md"` → `size="base"` on `Tabs`.
- `variant="default"` → `variant="primary"` (or nothing).
- `size="icon"` → `shape="square"`; `size="icon-sm"` → `shape="square" size="sm"`; `size="icon-xs"` → `shape="square" size="xs"`; `size="icon-lg"` → `shape="square" size="lg"`.
- `variant="link"` → `variant="ghost"` for a button-styled anchor; inline text links need a plain anchor.
