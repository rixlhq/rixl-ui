# Design

## D1. The label content lives in `Label`, field labels share one internal wrapper

**Chosen**: `Label` takes Kumo's `showOptional`, `optionalLabel`, `tooltip` and `tooltipAriaLabel`. The control fields (`Input` family, `Checkbox`, `Switch`, `RadioGroupItem`) render `Field.Label` and, inside it, an internal `FieldLabelContent` (`label/field-label-content.tsx`) that shows the same optional marker and tooltip trigger, and names the owning component in the missing-name warning. Both read the default `(optional)` from `label/label-labels.ts` through `useTranslations("label", …)`.

**Alternatives considered**

- Kumo's `asContent` flag on `Label`. A `<label>` cannot sit inside the `Field.Label` that encloses a checkbox, so Kumo renders a `<span>` from the same component. That makes one component return two element types and forces `ref` and the native label props to lie for one of them. Rejected; the span is internal.
- `Field.Label render={<Label …/>}`. Works for `Input`, whose label does not enclose the control, but not for the enclosing checkbox and switch pattern, so it would leave two label structures.

**Deviation from Kumo**: no public `asContent`. The tooltip trigger is a Base UI `TooltipTrigger` (existing markup), not a `Button`.

**Evidence**: Kumo `label/label.tsx`; the existing `input-field-names.test.tsx` and `input-field-labels.test.tsx` stay as the guard for the Input family (only the provider key changes).

## D2. Provider group `input` becomes `label`

The marker's owner is `Label`, so the group follows it (Kumo's provider group is `label`). Keeping `input` would make `Checkbox` read a group named after another component. Breaking, pre-v1, noted in the proposal.

## D3. The toggle roots are spans: style on `data-disabled`

**Chosen**: `not-data-disabled:` replaces `enabled:` for hover; `data-disabled:` replaces `disabled:` for the dimmed look. Base UI sets `data-disabled` on every disabled part.

`pressFeedback` itself stays plain `active:` (a consumer `active:scale-100` still merges over it, which Button's `link` variant and `ButtonGroup` rely on). The span controls cancel it while disabled with `data-disabled:active:scale-100` inside `toggleControl`. The Select trigger is a real `<button disabled data-disabled>` (probe, jsdom), where `:enabled` worked, so it uses the plain constant too.

**Alternatives considered**: a `not-data-disabled:` prefix inside `pressFeedback`. tailwind-merge sees `not-data-disabled:active:scale-…` and `active:scale-100` as different variants and keeps both, so `link` and the group could no longer opt out. Rejected. `nativeButton` with `render={<button/>}` on each root (what Kumo's `Switch` does). It changes the element, the ref type and Base UI's hidden-input wiring for three controls to fix a class problem. Rejected.

**Evidence**: Chromium probe, 2026-11-19: `checkbox`, `switch` and `radio-group-item` are `SPAN`; `matches(":enabled")` is `false` for all; a disabled checkbox measured `opacity: 1`, `cursor: auto`. Regression tests are in `toggle-controls.browser.test.tsx`.

## D4. Shared classes and the drift found

`pressFeedback` (7 sites), `invalidRing` (Button, Checkbox, RadioGroupItem, and the colour classes of `controlSurface`), `toggleControl` (Checkbox, RadioGroupItem, Switch), `fieldLabel`.

Drift, listed rather than hidden:

- Press: Button, the sidebar menu and sub-menu used `active:scale-…` with no `enabled:`; Checkbox, RadioGroupItem, Switch and the Select trigger used `enabled:active:scale-…`. All now use the plain `active:scale-…` in `pressFeedback`; the span controls cancel it when disabled. `buttonPressClasses` (press feedback plus a five-property transition) becomes `pressable`, shared by Button and the Tabs trigger.
- Invalid: Button, Checkbox, Radio use `aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger`. `controlSurface` adds a 3px ring, a tinted background and a hover border on top of the same two colours, so it composes `invalidRing` and keeps its extras. The OTP slot applies them only to the active slot (`data-[active=true]:aria-invalid:`) and the input group uses `has-[…[aria-invalid=true]]`; both stay as they are.
- Transition lists: Checkbox and Switch transitioned `scale, box-shadow, border-color, background-color`; Radio left out `background-color`. One list now; Radio has no background change, so nothing visible moves.
- Disabled: Checkbox and Radio used `disabled:`, Switch `data-disabled:`; one `data-disabled:` pair in `toggleControl`. The collapsible trigger keeps its own `disabled:` pair (another change owns that file).

`rounded-[4px]` becomes `rounded-xs`, registered as `--radius-xs: var(--rixl-radius-xs)` = `0.25rem` (`styles/preset.css`). At a 16px root that is 4px; the browser test measures both. Unlike `4px`, it scales with the root font size, like the rest of the radii.

## D5. Checkbox and Switch follow Kumo's single-control model

`label` turns on the `Field.Root` + enclosing `Field.Label` form; `controlFirst` (default `true`) orders control and text; `required={false}` shows `(optional)`; `true` and `undefined` show nothing. `required` is also forwarded to Base UI's `Checkbox.Root` (form validation). Without `label` the bare control renders, with the dev warning that it needs `aria-label`, `aria-labelledby` or a label (`useWarnMissingName`, same wording style as `Input`).

**Deviation from Kumo**: Kumo's `variant="error"` is visual only. Here it sets `aria-invalid` on the control, which the shared `invalidRing` styles and screen readers announce.

**Deviation from Kumo**: Kumo's `Switch` falls back to `aria-label="Switch"` when no label is given. That is hidden English, which `app-supplied-names` forbids; here it warns instead.

## D6. Groups: a fieldset that is the group

`RadioGroup` and `CheckboxGroup` render a Base UI `Field.Root` whose `render` is a `Fieldset.Root` whose `render` is the Base UI group with `render={<fieldset/>}` (the `ControlGroup` module). The `radiogroup` or `group` is the fieldset, named from the legend by Base UI, so there is no nameless group wrapped around a named fieldset (the reason Kumo's `Radio.Group` does the same). The `Field.Root` is needed because Base UI's `Field.Item` and `Field.Label` throw without one. `error` and `description` are paragraphs linked with `aria-describedby`, error first, joined with the app's own `aria-describedby`.

- `error` sets `aria-invalid` on a `RadioGroup` (the `radiogroup` role allows it) but not on a `CheckboxGroup`, whose `group` role does not.
- A labelled `Checkbox` inside `CheckboxGroup` opens a `Field.Item` instead of a `Field.Root`, which Base UI documents for grouped controls, so each checkbox keeps its own label. `RadioGroupItem` is always in a group, so it always uses `Field.Item`.
- `Fieldset.Legend` renders a `<div>`, not a `<legend>`; Base UI names the group through `aria-labelledby`.
- Items sit in an inner `data-slot="<group>-items"` wrapper (`data-orientation`), so `orientation` does not depend on a consumer's `className`.

**Dropped**: Kumo's separate `Checkbox.Item` and the `Radio.Legend`/`Checkbox.Legend` sub-components. `Checkbox` with `value` is the item (one component, no duplicated markup); `legend` takes a `ReactNode`, so a visually hidden legend is `legend={<span className="sr-only">…</span>}`.

**Deviation from Kumo**: `controlFirst` is a prop of `RadioGroupItem` (and `Checkbox`), not of the group (Kumo's group-level `controlPosition`); and `RadioGroupItem` has no `labelTooltip` or optional marker, as Kumo's `Radio.Item` has none.

**Not built**: `Switch.Group` (Kumo has it); the task named only the checkbox and radio groups. It would reuse `ControlGroup`.

**Evidence**: `radio-group-field.test.tsx`, `checkbox-group.test.tsx` (name, description, orientation, ref), and the two `*-field.browser.test.tsx` / `checkbox-group.browser.test.tsx` axe checks.

## D7. Why the browser project pre-bundles two entries

Adding `@base-ui/react/fieldset` and `@base-ui/react/checkbox-group` to the component code made a warm Vite cache reload the page mid-run ("optimized dependencies changed", then `Invalid hook call` and failed suites). Both entries are now in `optimizeDeps.include` of the browser project in `packages/ui/vite.config.ts`.
