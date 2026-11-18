## Why

Several components copy the same implementation instead of sharing it.

- **Icons.** `lucide-react` is a runtime dependency and ten files import it, yet `checkbox`, `radio-group`, `dropdown-menu`, `select`, `input-otp` and `button` each inline their own `<svg>` paths, and `dropdown-menu/icons.tsx` and `select/icons.tsx` carry three icons apiece that duplicate each other's `CheckIcon`. Comments in six files still say the library is "icon-dep-free", which is no longer true.
- **Class strings.** The same Tailwind strings are pasted into many files: the focus ring (`focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]`), the popup surface and its enter/exit transition (Popover, DropdownMenu, Select), the highlighted/disabled row (the five menu and listbox rows), and the indicator scale-and-fade (Checkbox, RadioGroup, two DropdownMenu items). A tweak to one copy has to be repeated by hand in the others, and the copies have already drifted: the sub-trigger has no disabled style and no gap, the Select popup has no `outline-hidden`.

## What Changes

- **Icons**: every inline `<svg>` in the six components becomes a `lucide-react` import. `dropdown-menu/icons.tsx` and `select/icons.tsx` are deleted. The `data-slot`, `aria-hidden` and sizes that tests and consumers rely on stay.
- **Shared constants** in `packages/ui/src/lib/classes.ts`: `focusRing`, `focusRingBorderless`, `popupSurface`, `menuItem` and `indicatorPop`. Components compose them with `cn`, so a consumer `className` still wins.
- **Drift fixed on purpose**, listed in `design.md`: the sub-trigger gains the disabled style, the icon gap and the svg rules the other rows have; the Select popup gains `outline-hidden`.

**Breaking status**: Not breaking. No export, prop, variant or `data-slot` changes. Rendered markup differs only where `design.md` lists a unified drift.

## Non-goals

- Moving `buttonPressClasses`: it is a public export of `@rixl/ui/button`, and only Button and Tabs use it.
- The text-field surface (`select/trigger.tsx`, `input/input-variants.ts`, `input-otp/slot.tsx`, `pagination/**`) and `date-picker/**`: other work owns them, so their copies of the focus ring stay and are the next call sites.
- The Tooltip popup, whose colours and `scale-[0.97]` transition differ from the other popups.
- The Toaster focus ring, which is `!important` because it overrides Sonner's own styles.
- Select's item indicator, which stays mounted and is driven by `data-selected`, not `data-starting-style`.

## Acceptance

- `grep -rn "<svg" packages/ui/src` finds no component `<svg>` outside tests.
- `packages/ui/src/components/dropdown-menu/icons.tsx` and `packages/ui/src/components/select/icons.tsx` no longer exist.
- Each shared constant is imported by at least three components, and no component repeats its string.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass with `.size-limit.json` unchanged.

## Capabilities

### Modified Capabilities

- `design-system`: components share their icon set and their repeated class strings.

## Impact

`packages/ui/src/components/{checkbox,radio-group,dropdown-menu,select,input-otp,button,popover,badge,switch,collapsible,tabs,breadcrumb}`, new `packages/ui/src/lib/classes.ts` with tests in `src/lib/__tests__/`.
