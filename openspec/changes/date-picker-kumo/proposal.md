## Why

`@rixl/ui` is not yet v1 and aims to match Kumo's component APIs. `DatePicker` takes `value`/`onSelect` as its primary props and carries Kumo's `selected`/`onChange` as "deprecated aliases" next to them (`selectionHandler` fans one change out to both). Kumo's page (https://kumo-ui.com/components/date-picker.md) shows `selected`/`onChange` as the only pair, with `mode` required, props forwarded to react-day-picker, and outside days hidden in multi-month views. Two names for one thing is the duplication; matching Kumo removes it.

Other legacy remains: `Button`'s `color` prop (an alias of `variant` for fumadocs call sites that nothing in this repo uses), `TableRow`'s `data-[state=selected]` (shadcn habit next to `aria-selected`), and the docs app's single-`Showcase` fallback in `Detail` that no showcase needs.

## What Changes

- **DatePicker (breaking).** `selected` and `onChange` are the selection props in all three modes; `value` and `onSelect` are removed, as are `selectionHandler` and `sharedGridProps` (an allow-list that dropped every other react-day-picker prop). `DatePicker` forwards the rest of react-day-picker's props to the grid. `mode` is required. `showOutsideDays` defaults to `true` for one month and `false` for several.
- **Button (breaking).** Remove `color`, the `primary` colour and `colorClasses`. `variant` is the only way to pick the look. The `icon-sm` and `icon-xs` sizes stay (used by `CopyBlock`, `InputGroupButton` and the docs); their "fumadocs-only" comment goes.
- **Table (breaking).** `TableRow` no longer styles `data-state="selected"`; `aria-selected="true"` is the selected state.
- **Docs app.** The DatePicker showcase uses the Kumo props. The Button "Cross-app API" example and the Table note stop describing the removed aliases. `Showcase.examples` becomes required and `Detail` loses its single-example fallback.

Migration:

| Before                                                     | After                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| `<DatePicker value={d} onSelect={setD} />`                 | `<DatePicker mode="single" selected={d} onChange={setD} />`   |
| `<DatePicker />` (mode defaulted to `"single"`)            | `<DatePicker mode="single" />`                                |
| `<DatePicker mode="range" value={r} onSelect={setR} />`    | `<DatePicker mode="range" selected={r} onChange={setR} />`    |
| `<DatePicker mode="multiple" value={ds} onSelect={set} />` | `<DatePicker mode="multiple" selected={ds} onChange={set} />` |
| multi-month grid relying on outside days showing           | add `showOutsideDays`                                         |
| `<Button color="destructive">` / `color="primary"`         | `<Button variant="destructive">` / `variant="default"`        |
| `<tr data-state="selected">`                               | `<tr aria-selected="true">`                                   |

## Capabilities

### Modified Capabilities

- `design-system`: DatePicker selection API; Button resolves its look from `variant` only (the `color` requirement is removed); Table row selected state.

## Non-goals

- No change to the month cross-slide animation or its reduced-motion rule.
- No `Presets` component: Kumo documents presets, popovers and footers as composition in its page, not as props, and so do we (showcase examples).
- Nothing in `pagination/`, `checkbox/`, `radio-group/`, `dropdown-menu/`, `popover/`, `select/`, `input-otp/`, `input/input-variants.ts` or `src/lib/`; other work owns them. Their legacy items are listed in `design.md`.

## Acceptance

- `git grep -nE "onSelect|value=" packages/ui/src/components/date-picker apps/docs/src/showcases/date-picker.tsx` finds no DatePicker selection prop named that (react-day-picker's own `onSelect` inside the grid is the only hit).
- `git grep -n "colorClasses\|isButtonColor" packages/ui/src` finds nothing.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass.
