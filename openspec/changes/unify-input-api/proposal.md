## Why

Form inputs are spread over three overlapping public surfaces: `@rixl/ui/field` (FieldRoot, FieldLabel, FieldDescription, FieldError), `@rixl/ui/input` (an Input that already renders label, description and error through a private copy of Field, and also renders icons through `startIcon`/`endIcon`) and `@rixl/ui/input-group` (a second way to put an icon next to an input). `@rixl/ui/textarea` is a deprecated alias of `@rixl/ui/input-area`. A consumer has to choose between Field-around-Input, Input-with-label and InputGroup-with-label, and between two ways to add an icon.

Kumo UI documents one shape: `Input` and `InputArea` take `label`, `labelTooltip`, `description` and `error` directly; `InputGroup` is the only place for icons, text and buttons around an input and accepts the same field props. This change adopts that shape.

## What Changes

- **BREAKING** Remove `@rixl/ui/field` and its exports (`FieldRoot`, `FieldLabel`, `FieldDescription`, `FieldError`, `normalizeFieldError`, `FieldRootProps`, `FieldRootActions`, `FieldLabelProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldErrorMatch`, `FieldErrorProp`, `NormalizedFieldError`). Label, description, error, required and disabled are props of `Input`, `InputArea` and `InputGroup`. The Base UI Field primitives stay an internal detail.
- **BREAKING** Remove `startIcon`, `endIcon` and `wrapperClassName` from `Input`. Icons, text addons and buttons go through `InputGroup`.
- **BREAKING** `InputGroup` holds a new `InputGroupInput` instead of a bare `Input`. `InputGroupAddon` gains `align="start" | "end"`. `InputGroup` keeps `label`, `labelTooltip`, `description`, `error`, `required`, `disabled`, `size`.
- **BREAKING** `InputArea` moves into `@rixl/ui/input` (same entry as `Input`, as in Kumo). `@rixl/ui/input-area` is removed.
- **BREAKING** Remove `Textarea` and `@rixl/ui/textarea`; it was a deprecated alias of `InputArea`.
- `InputArea` gains `size` (`xs | sm | base | lg`) and `onValueChange`, and shares its field chrome, size scale and control surface with `Input`.
- Rename the field data slots `field`, `field-label`, `field-description`, `field-error` to `input-field`, `input-label`, `input-description`, `input-error`.

**Breaking status**: breaking; ships as the next major through `feat(input)!:` commits.

## Capabilities

### Modified Capabilities

- `design-system`: single-component form input API.

## Out of scope

- Kumo's `InputGroup.Suffix` and `InputGroupButton` `tooltip`/`icon` props.
- Kumo's `InputArea` `autoResize`/`minRows`/`maxRows`. Rixl's textarea already grows with its content through `field-sizing: content`; changing the default is a separate decision.
