# Spec Delta

## ADDED Requirements

### Requirement: DatePicker takes Kumo's selection props

`DatePicker` SHALL require `mode` (`"single"`, `"multiple"` or `"range"`), take the current selection as `selected` and report changes through `onChange`, and SHALL NOT accept `value` or `onSelect`. It SHALL forward its other props to react-day-picker.

#### Scenario: Single mode reports through onChange

- **WHEN** a consumer renders `<DatePicker mode="single" selected={d} onChange={fn} />` and clicks a day
- **THEN** `fn` is called once with that date, and the day carries `data-selected-single` once the consumer updates `selected` (`date-picker.test.tsx`)

#### Scenario: Range and multiple modes

- **WHEN** a consumer clicks two days in `mode="range"`, or two days in `mode="multiple"`
- **THEN** `onChange` is called after each click with a `DateRange` or a `Date[]` (`date-picker.test.tsx`)

#### Scenario: Removed names are rejected

- **WHEN** a consumer passes `value` or `onSelect`, or omits `mode`
- **THEN** the compiler rejects it (`date-picker.test.tsx`, `@ts-expect-error` cases)

#### Scenario: react-day-picker props pass through

- **WHEN** a consumer passes `weekStartsOn={1}`
- **THEN** the first weekday header is Monday (`date-picker.test.tsx`)

### Requirement: DatePicker hides outside days in multi-month views

`DatePicker` SHALL show outside days, dimmed, when it renders one month, and SHALL hide them when it renders several months, unless `showOutsideDays` is passed.

#### Scenario: One month

- **WHEN** a consumer renders `numberOfMonths` 1 without `showOutsideDays`
- **THEN** outside-day cells are visible (`date-picker.test.tsx`)

#### Scenario: Several months

- **WHEN** a consumer renders `numberOfMonths={2}` without `showOutsideDays`
- **THEN** every outside-day cell is hidden, and `showOutsideDays` shows them (`date-picker.test.tsx`)

### Requirement: A table row is selected through aria-selected

`TableRow` SHALL style a row as selected from `aria-selected="true"` and SHALL NOT style `data-state="selected"`.

#### Scenario: data-state is ignored

- **WHEN** a row has `data-state="selected"` and no `aria-selected`
- **THEN** its background is not the selected background (`table.browser.test.tsx`)

### Requirement: Button picks its look from variant only

`Button` SHALL take its look from `variant` (default when omitted) and SHALL NOT accept `color` as a variant alias.

#### Scenario: color does not restyle

- **WHEN** a `Button` gets `color="destructive"`
- **THEN** it renders the default variant (`button.test.tsx`, `does not restyle for the native color attribute`)

## REMOVED Requirements

### Requirement: Button resolves its look from `variant`, then `color`

**Reason**: `color` only served fumadocs call sites; nothing in this repo passes it and the package is pre-v1.

**Migration**: replace `color="destructive"` with `variant="destructive"` and `color="primary"` with `variant="default"`.
