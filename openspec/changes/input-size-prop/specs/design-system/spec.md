# Spec Delta

## ADDED Requirements

### Requirement: Text inputs take a single size prop

`Input`, `InputArea` and `InputGroup` SHALL accept one `size` prop with the values `xs`, `sm`, `base` and `lg`, defaulting to `base`. `inputSize` SHALL NOT be accepted, and `InputGroupInput` SHALL take its size from the enclosing `InputGroup`.

#### Scenario: Each size applies its height

- **WHEN** a consumer renders `<Input size="xs" />`, `sm`, `base` and `lg`
- **THEN** the controls carry `h-7`, `h-8`, `h-9` and `h-10` respectively, and an `Input` without `size` carries `h-9`

#### Scenario: Multiline uses the same scale

- **WHEN** a consumer renders `<InputArea size="lg" />`
- **THEN** the textarea uses the large minimum height, and one without `size` uses the base one

#### Scenario: Group sizes its input

- **WHEN** a consumer renders `<InputGroup size="lg"><InputGroupInput aria-label="Search" /></InputGroup>`
- **THEN** the group carries the large height and the inner input fills it

#### Scenario: Variants helper

- **WHEN** a consumer calls `inputVariants({size: "sm"})`
- **THEN** the result contains `h-8`

### Requirement: Input error styling follows the error state

`Input` SHALL NOT accept a `variant` prop. The invalid appearance SHALL come from `error` or `aria-invalid`.

#### Scenario: Error marks the control invalid

- **WHEN** a consumer renders `<Input label="Email" error="Bad" />`
- **THEN** the input has `aria-invalid="true"`, which the control surface styles as the danger state

### Requirement: Required and validation follow Kumo

`required={false}` SHALL show an "(optional)" marker and `required` SHALL add no visual mark while still reaching the control. There SHALL be no custom `validate` prop; native validity is expressed through `error` with `{message, match}`.

#### Scenario: Required reaches the control without a mark

- **WHEN** a consumer renders `<Input label="Email" required />`
- **THEN** the input is required and the label shows no "(optional)" text
