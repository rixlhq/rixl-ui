## Why

Kumo's `Checkbox`, `Switch` and `Radio` wrap their control in a Base UI `Field` with `label`, `labelTooltip`, `controlFirst` and `required` (an explicit `required={false}` shows "(optional)"). Their groups (`Checkbox.Group`, `Radio.Group`) sit on a Base UI `Fieldset` with `legend`, `description`, `error` and `orientation`. Kumo's `Label` owns `showOptional` and `tooltip`, and every field renders through it (https://raw.githubusercontent.com/cloudflare/kumo/989cc18a642ebd87dd632b52a6f4fa282c14f5e1/packages/kumo/src/components/label/label.tsx, checkbox/checkbox.tsx, switch/switch.tsx, radio/radio.tsx; fetched 2026-11-19).

Here, `Checkbox`, `Switch` and `RadioGroup` take none of that, so every use wires `<Label htmlFor>` by hand (`apps/docs/src/showcases/{checkbox,switch,radio-group,popover,label}.tsx`, `components/detail.tsx`). The optional marker and the label tooltip live only in `InputLabelRow` (`input/input-field.tsx`), and the label classes are repeated in `label/label.tsx` and `InputLabelRow`.

A browser probe (2026-11-19, Chromium) also found that the three controls render a `<span>`, so `:enabled` and `:disabled` never match them. A disabled `Checkbox` and a disabled `RadioGroupItem` measured `opacity: 1`, `cursor: auto`; the `enabled:hover`, `enabled:active` classes never apply on any of the three.

Seven files repeat the press-feedback, invalid-ring and toggle-base class strings.

## What Changes

- **Fix.** `Checkbox`, `RadioGroupItem` and `Switch` key hover, press and disabled styling on `data-disabled`, which Base UI sets on its span roots, instead of `enabled:` / `disabled:`.
- **Shared classes** in `lib/classes.ts`: `pressFeedback`, `invalidRing`, `toggleControl`, `fieldLabel`. Used by Button, Checkbox, RadioGroupItem, Switch, Select trigger, the sidebar menu and sub-menu, Tabs trigger, and the Input surface.
- **Label** takes `showOptional`, `optionalLabel`, `tooltip` and `tooltipAriaLabel`, as in Kumo. The optional marker and the tooltip trigger render once, for `Label`, `Input`, `InputArea`, `InputGroup`, `Select`, `Checkbox`, `Switch` and `RadioGroupItem`.
- **Checkbox and Switch** take `label`, `labelTooltip`, `labelTooltipAriaLabel`, `controlFirst` and `required`. With a `label` they render inside `Field.Root` and `Field.Label`; without one, the bare control. `Checkbox` also takes `variant="error"`.
- **`CheckboxGroup`** (new, `@rixl/ui/checkbox`): Base UI `CheckboxGroup` on a `Fieldset` with `legend`, `description`, `error` and `orientation`. A `Checkbox` with a `value` inside it is the item.
- **`RadioGroup`** takes `legend`, `description`, `error` and `orientation`; **`RadioGroupItem`** takes `label` and `variant="error"`.
- **Docs** showcases use the new props.

## Breaking

- `buttonPressClasses` is removed from `@rixl/ui/button` (the package's own Button and Tabs trigger now share `pressable` from `lib/classes.ts`). Only the Tabs trigger imported it in this repository; a consumer outside it should write the same two utilities, `active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100`, itself.
- The locale provider group `input` is now `label` (`translations={{label: {optional}}}`), because `Label` owns the marker. `labels={{optional}}` on `Input`, `InputArea`, `InputGroup` and `Select` is unchanged. The type `InputFieldLabels` becomes `LabelLabels`, exported from `@rixl/ui/label`.
- `RadioGroup` renders a `<fieldset role="radiogroup">` instead of a `<div role="radiogroup">`, as Kumo does, so its `ref` is an `HTMLFieldSetElement`.

| Before                                          | After                                          |
| ----------------------------------------------- | ---------------------------------------------- |
| `translations={{input: {optional: "(opt.)"}}}`  | `translations={{label: {optional: "(opt.)"}}}` |
| `ref: Ref<HTMLDivElement>` on `RadioGroup`      | `Ref<HTMLFieldSetElement>`                     |
| `import {buttonPressClasses} from ".../button"` | removed                                        |

## Capabilities

### Modified Capabilities

- `design-system`: field chrome on the toggle controls, `Label`, `CheckboxGroup`, `RadioGroup` chrome.

## Non-goals

- Kumo's `appearance="card"` and `"segmented"`.
- `Switch.Group` and Kumo's `Switch`/`Checkbox` `Item` sub-components: `Checkbox` with a `value` is the group item.
- Unifying `Input`'s and the OTP slot's invalid look with the toggles'. Input keeps its tinted background and always-on ring; only the colour classes are shared.
- Any hidden English for screen readers: tooltip triggers still take their name from the app (`app-supplied-names`).

## Acceptance

- `git grep -n "buttonPressClasses" packages apps` finds nothing.
- The repeated strings appear once in `lib/classes.ts` (`git grep -c "active:scale-\[var(--rixl-press-scale)\]" packages/ui/src`).
- In Chromium a disabled `Checkbox`, `RadioGroupItem` and `Switch` measure `opacity: 0.5`, `cursor: not-allowed`.
- Browser tests with axe pass for a labelled `Checkbox`, `Switch`, `CheckboxGroup` and `RadioGroup` with legend, description and error.
- `vp check`, `vp test --run` (packages/ui and apps/docs), `vpr knip`, `vpr budget`, `vpr publint` and `vpr ci` pass; `.size-limit.json` is unchanged.
