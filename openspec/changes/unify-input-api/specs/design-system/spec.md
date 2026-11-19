# Spec Delta

## ADDED Requirements

### Requirement: Input owns its label, description and error

`Input` and `InputArea` SHALL accept `label`, `labelTooltip`, `description`, `error` and `required` and SHALL render them with correct accessible wiring, without a separate Field component.

#### Scenario: Label focuses the control

- **WHEN** a consumer renders `<Input label="Email" />` and clicks the label
- **THEN** the input has focus

#### Scenario: Description and error are announced

- **WHEN** a consumer renders `<Input label="Email" description="Help" error="Bad" />`
- **THEN** the input's `aria-describedby` references the error, the input has `aria-invalid="true"`, and the description is not rendered while the error shows

#### Scenario: Conditional error stays dormant

- **WHEN** `error` is `{message, match: "tooShort"}` and the value is not too short
- **THEN** the error is not rendered and the input is not `aria-invalid`

#### Scenario: Optional marker

- **WHEN** a consumer renders `<Input label="Phone" required={false} />`
- **THEN** the label shows "(optional)" and the input is not required

#### Scenario: Multiline follows the same contract

- **WHEN** a consumer renders `<InputArea label="Notes" description="Help" size="lg" />`
- **THEN** the textarea is named by the label, described by the description, and uses the large size class

#### Scenario: Missing accessible name

- **WHEN** `Input`, `InputArea` or `InputGroupInput` render with no `label`, `aria-label` or `aria-labelledby`
- **THEN** a development console warning names the missing accessible name

### Requirement: There is no public Field component

The package SHALL NOT export `FieldRoot`, `FieldLabel`, `FieldDescription`, `FieldError` or a `@rixl/ui/field` entry, and SHALL NOT export `Textarea`.

#### Scenario: Removed entries

- **WHEN** a consumer inspects `package.json#exports`
- **THEN** there is no `./field`, `./input-area` or `./textarea` entry, and `@rixl/ui/input` exports `Input` and `InputArea`

### Requirement: Only InputGroup holds adornments

`Input` SHALL NOT accept `startIcon`, `endIcon` or `wrapperClassName`. Icons, text addons and buttons SHALL be composed with `InputGroup`, `InputGroupAddon`, `InputGroupInput` and `InputGroupButton`.

#### Scenario: Icon addon

- **WHEN** a consumer renders `<InputGroup><InputGroupAddon><svg/></InputGroupAddon><InputGroupInput aria-label="Search"/></InputGroup>`
- **THEN** the group has `role="group"`, the icon sits before the input, and the input has no border of its own

#### Scenario: Addon alignment

- **WHEN** an `InputGroupAddon align="end"` is written before the `InputGroupInput`
- **THEN** it renders after the input

#### Scenario: Group carries the field chrome

- **WHEN** a consumer renders `<InputGroup label="Website" description="Help" error="Bad" required={false}>` with an addon and an input
- **THEN** the label focuses the input, the input is described by the error, is `aria-invalid`, and "(optional)" shows

#### Scenario: Group disabled and required

- **WHEN** `<InputGroup disabled required>` contains an `InputGroupInput`
- **THEN** the input is disabled and required

#### Scenario: Accessibility in a real browser

- **WHEN** Input, InputArea and InputGroup render labelled, described, invalid and with an icon addon in Chromium
- **THEN** axe reports no WCAG 2.2 AA violations
