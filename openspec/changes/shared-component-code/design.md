# Design

## Context

Measured by grep over `packages/ui/src` before the change.

| Duplicated thing                                                                          | Copies                                                                                                                                        |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]` | checkbox, radio-group, button, collapsible trigger, switch, badge, plus `select/trigger.tsx`, `input/input-variants.ts` (owned by other work) |
| `focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]` without the border             | tabs trigger, tabs content, breadcrumb link, plus `pagination-page-size.tsx` (other work)                                                     |
| popup surface + `transition-[scale,opacity] … scale-95`                                   | popover, dropdown-menu content, select content                                                                                                |
| `data-highlighted:bg-rixl-surface-muted … data-disabled:opacity-50 [&_svg]:…` row         | dropdown-menu item, checkbox item, radio item, sub-trigger (partial), select item                                                             |
| `transition-[scale,opacity] … data-starting-style:scale-50 …`                             | checkbox, radio-group, dropdown-menu checkbox item, radio item                                                                                |
| inline `<svg>` check, minus, circle, chevrons, spinner                                    | checkbox, radio-group, dropdown-menu, select, input-otp, button                                                                               |

Every row has at least three call sites, so extraction meets the rule in `anti-slop.md`.

## Decisions

### Icons: lucide-react everywhere

**Chosen:** import `Check`, `Minus`, `Circle`, `ChevronRight`, `ChevronDown`, `ChevronUp` and `LoaderCircle` from `lucide-react`; delete the two `icons.tsx` files.
**Alternatives considered:** keep the inline SVGs (rejected: `lucide-react` is already a dependency, so the "icon-dep-free" reason is gone and the copies only diverge); one shared `icons.tsx` (rejected: lucide already is that file).
**Dropped:** nothing.
**Evidence:** `package.json` lists `lucide-react` under `dependencies`; `breadcrumb`, `collapsible`, `dialog`, `pagination`, `sidebar`, `tabs` and `copy-block` already import it. lucide's `LoaderCircle` path is `M21 12a9 9 0 1 1-6.219-8.56`, the path `ButtonSpinner` drew. Size is measured in `tasks.md`.

Details that keep the look the same:

- Checkbox passes `strokeWidth={3}` (it drew 3); the others use lucide's default 2, which the inline copies used.
- The RadioGroup dot was a filled circle with no stroke. lucide's `Circle` strokes by default, so it gets `strokeWidth={0}` to keep the 8 px dot the same size.
- Button spinner passes `strokeWidth={2.5}`.
- lucide adds `lucide lucide-<name>` classes and sets `aria-hidden="true"` when no `aria-*` prop is passed. `[&_svg:not([class*='size-'])]` selectors are unaffected because no lucide class contains `size-` or `text-`.

### One module, `src/lib/classes.ts`

**Chosen:** one file with five named exports.
**Alternatives considered:** one file per constant (rejected: five two-line files add imports and no clarity); a `cva` per concept (rejected: none has variants).
**Dropped:** moving `buttonPressClasses` into the module. It is a public export of `@rixl/ui/button`, so removing it from there is breaking, and only Button and Tabs use it.
**Evidence:** `.agents/rules/code-style.md` (compose with `cn`, relative imports).

### What each constant holds

| Export                | Holds                                                                                                                                                                          | Left to the component                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `focusRing`           | `focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]`                                                                                      | `outline-none`, `aria-invalid` ring                                                                    |
| `focusRingBorderless` | `focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]`                                                                                                                     | the borderless parts that must not recolour their border                                               |
| `popupSurface`        | surface colours, max size, overflow, `origin-(--transform-origin)`, `rounded-rixl-md`, border, `shadow-rixl-md`, `outline-hidden`, and the scale/opacity enter/exit transition | `min-w`, `w-72`, padding, `relative`                                                                   |
| `menuItem`            | highlighted bg/text, `relative flex cursor-default items-center gap-2 rounded-rixl-sm py-1.5 text-sm outline-hidden select-none`, disabled, svg pointer-events/shrink/size     | horizontal padding, inset, destructive, `w-full`, muted svg colour, `data-popup-open`, `data-selected` |
| `indicatorPop`        | `transition-[scale,opacity]`, duration, ease, `motion-reduce:transition-none`, starting/ending `scale-50 opacity-0`                                                            | `text-rixl-primary-fg`, flex centring                                                                  |

`focusRingBorderless` is a second constant, not a flag: Tabs and Breadcrumb draw a ring with no border colour because the part has no border. Forcing the border class on would add a border colour to a borderless element. `[Toaster]` keeps its own `!important` ring.

The muted svg colour (`[&_svg:not([class*='text-'])]:text-rixl-fg-muted`) is on two rows only (dropdown item, select item), so it stays inline until a third row needs it.

### Deliberate differences

Every other component renders the same classes as before (order may differ).

| Component                | Change                                                                                                           | Why                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DropdownMenuSubTrigger` | gains `relative`, `gap-2`, `data-disabled:pointer-events-none data-disabled:opacity-50`, and the three svg rules | The row had no disabled look although `SubmenuTrigger` can be disabled, and an icon next to the label had no gap, unlike `DropdownMenuItem`. |
| `SelectContent` popup    | gains `outline-hidden`                                                                                           | Popover and DropdownMenu popups already have it; Select was the odd one.                                                                     |

### Call sites left for the other work

`select/trigger.tsx`, `input/input-variants.ts` and `pagination/pagination-page-size.tsx` still hold the focus-ring string. They are being reworked elsewhere, so this change does not touch their class strings. They are the next call sites for `focusRing` once that work lands.

## Risks

- Tailwind finds class names by scanning source. `src/lib/*.ts` is inside the docs app `@source` glob (`../../../packages/ui/src/**/*.{ts,tsx}`), and the built `dist/*.js` carries the strings for consumers, as it does for `button.tsx` today. The browser project builds the preset from the same tree, so a missing class would show in the existing browser tests.
