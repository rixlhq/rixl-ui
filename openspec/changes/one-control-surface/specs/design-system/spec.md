# Spec Delta

## ADDED Requirements

### Requirement: Bordered form controls share one control surface

`Input`, `InputArea`, the `Select` trigger and `InputOTP` slots SHALL take their border, hover, focus and invalid appearance from the same `controlSurface` definition in `input/input-variants.ts`. A control that is not a text field SHALL NOT get the read-only appearance.

#### Scenario: Trigger carries the shared surface

- **WHEN** a consumer renders a `SelectTrigger`
- **THEN** it has the `controlSurface` classes (`border-rixl-border`, `hover:border-rixl-border-strong`, `focus-visible:border-rixl-ring`, `aria-invalid:border-rixl-danger`)

#### Scenario: Trigger is not read-only styled

- **WHEN** a consumer renders a `SelectTrigger` in the browser
- **THEN** its background is transparent and its class list has no `read-only:` utility

#### Scenario: Input is unchanged

- **WHEN** a consumer renders `Input` or `InputArea`
- **THEN** each keeps `read-only:bg-rixl-surface-muted` and every class it had before

#### Scenario: OTP slot shares the surface

- **WHEN** a consumer renders `<InputOTPSlot index={0} aria-invalid />`
- **THEN** it carries `controlSurface`'s border, hover and `aria-invalid:` classes

#### Scenario: OTP slots still join into one bar

- **WHEN** an `InputOTPGroup` holds three slots
- **THEN** only the first has a rounded start edge and a start border, only the last has a rounded end edge

### Requirement: Select takes Input's size scale

`SelectTrigger` and `selectTriggerVariants` SHALL accept `size` with the values `xs`, `sm`, `base` and `lg`, defaulting to `base`, with the same heights as `Input`. `default` SHALL NOT be accepted.

#### Scenario: Each size applies its height

- **WHEN** a consumer renders `<SelectTrigger size="xs" />`, `sm`, `base` and `lg`
- **THEN** the triggers carry `h-7`, `h-8`, `h-9` and `h-10`, and one without `size` carries `h-9`

#### Scenario: Same height as Input

- **WHEN** a consumer reads `selectTriggerVariants({size})` and `inputVariants({size})` for each size
- **THEN** both contain the same height utility

### Requirement: Select has a built-in field

`Select` SHALL accept `label`, `labelTooltip`, `description` and `error` (the same shapes as `Input`) and render them as a field around the trigger. Without them it SHALL render no wrapper.

#### Scenario: Label names the trigger

- **WHEN** a consumer renders `<Select label="Fruit">…</Select>`
- **THEN** the `combobox` has the accessible name "Fruit"

#### Scenario: Error marks the trigger invalid

- **WHEN** a consumer renders `<Select label="Fruit" error="Pick one">…</Select>`
- **THEN** the message is shown, the trigger has `aria-invalid="true"`, and the description is hidden

#### Scenario: No chrome, no wrapper

- **WHEN** a consumer renders `<Select>` without `label`, `description` or `error`
- **THEN** no `input-field` element is rendered

#### Scenario: Optional marker

- **WHEN** a consumer renders `<Select label="Fruit" required={false}>`
- **THEN** the label shows "(optional)"

### Requirement: Pagination reuses Input and Select

`PaginationPageInput` SHALL render `Input`. `PaginationPageSize` SHALL render `Select` with a visible label, and SHALL report the chosen size as a number through `onPageSizeChange`.

#### Scenario: Page input is an Input

- **WHEN** a consumer renders `<PaginationPageInput aria-label="Go to page" />`
- **THEN** the textbox carries the `controlSurface` classes and keeps `data-slot="pagination-page-input"`

#### Scenario: Page input commits as before

- **WHEN** the consumer types `99` into a 5-page pager and presses Enter
- **THEN** `onPageChange` is called with `5`; invalid drafts and Escape restore the current page

#### Scenario: Page size is a labelled select

- **WHEN** a consumer renders `<Pagination limit={20} setLimit={fn} />`
- **THEN** a `combobox` named "Rows per page" shows `20`, and no native `<select>` is rendered

#### Scenario: Choosing a size

- **WHEN** the consumer opens the select and picks `50`
- **THEN** `setLimit` is called with the number `50`
