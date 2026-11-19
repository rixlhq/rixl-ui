# Spec Delta

## ADDED Requirements

### Requirement: Disabled toggle controls look and feel disabled

`Checkbox`, `RadioGroupItem` and `Switch` SHALL dim to half opacity and show a `not-allowed` cursor while disabled, and SHALL NOT strengthen their border on hover or scale on press while disabled.

#### Scenario: Disabled in a browser

- **WHEN** each control renders with `disabled` in Chromium
- **THEN** its computed `opacity` is `0.5` and `cursor` is `not-allowed` (`toggle-controls.browser.test.tsx`)

### Requirement: Label owns the optional marker and the tooltip

`Label` SHALL take `showOptional`, `optionalLabel`, `tooltip` and `tooltipAriaLabel`. `showOptional` shows `optionalLabel`, else the provider's `label.optional`, else `(optional)`. `tooltip` renders a trigger named by `tooltipAriaLabel`; without that name `Label` SHALL warn in development and SHALL NOT invent one.

#### Scenario: Marker and tooltip

- **WHEN** `<Label showOptional tooltip="Help" tooltipAriaLabel="About">Name</Label>` renders
- **THEN** it shows `(optional)` and a button named `About` (`label.test.tsx`)

### Requirement: Checkbox and Switch take field chrome

`Checkbox` and `Switch` SHALL take `label`, `labelTooltip`, `labelTooltipAriaLabel`, `controlFirst` (default `true`) and `required`. With `label` the control SHALL be named by that label and `(optional)` SHALL show only for `required={false}`. Without `label` the bare control SHALL render. `Checkbox` SHALL take `variant="error"`, which sets `aria-invalid`.

#### Scenario: Named by the label

- **WHEN** `<Checkbox label="Accept" />` renders
- **THEN** `getByRole("checkbox", {name: "Accept"})` finds it, and clicking the text toggles it (`checkbox-field.test.tsx`, `switch-field.test.tsx`)

#### Scenario: Label after the control

- **WHEN** `controlFirst={false}` is set
- **THEN** the label text precedes the control in the DOM (`checkbox-field.test.tsx`)

### Requirement: CheckboxGroup and RadioGroup take legend, description, error and orientation

`CheckboxGroup` and `RadioGroup` SHALL render a fieldset that is the group, named by `legend`, with `description` and `error` linked through `aria-describedby`, and `orientation` `vertical` (default) or `horizontal`. `error` SHALL set `aria-invalid` on the group. `RadioGroupItem` SHALL take `label` and `variant`.

#### Scenario: Group name and description

- **WHEN** `<RadioGroup legend="Plan" description="Billed monthly" error="Pick one">…</RadioGroup>` renders
- **THEN** `getByRole("radiogroup", {name: "Plan"})` has an accessible description with both texts (`radio-group-field.test.tsx`)

## REMOVED Requirements

### Requirement: buttonPressClasses is exported from the button entry

**Reason**: the press classes are a shared package constant, not a Button API.
**Migration**: none outside the package; nothing consumed it.

## MODIFIED Requirements

### Requirement: Components with built-in copy take `labels`

The provider group for the optional marker SHALL be `label` (was `input`). `Input`, `InputArea`, `InputGroup` and `Select` keep `labels={{optional}}`, which beats the provider.

#### Scenario: Provider key

- **WHEN** a provider sets `translations={{label: {optional: "(optionnel)"}}}` and a field has `required={false}`
- **THEN** it shows `(optionnel)` (`input-field-labels.test.tsx`)
