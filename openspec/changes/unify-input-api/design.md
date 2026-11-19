## Context

`Input` already accepts `label`, `labelTooltip`, `description`, `error`, `required`, `size`, `onValueChange` and `passwordManagerIgnore`, the same props as Kumo's `Input`. It delegates to `FieldLayout` from `field/`, which is also exported publicly as `FieldRoot`/`FieldLabel`/`FieldDescription`/`FieldError`. `InputArea` reuses the same `FieldLayout`. `InputGroup` wraps a plain `Input` and passes `required`/`disabled` to it through context. Icons exist twice: `Input` `startIcon`/`endIcon` (an absolutely positioned wrapper) and `InputGroupAddon`.

Sources read: https://kumo-ui.com/components/input.md, input-area.md, input-group.md (all three loaded).

## API before and after

| Concern                                        | Before                                                                                     | After                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Label, description, error on a text input      | `Input` props, or `FieldRoot` + `FieldLabel` + `Input` + `FieldDescription` + `FieldError` | `Input` props only                            |
| Label, description, error on a multiline input | `InputArea` props, or the Field parts                                                      | `InputArea` props only                        |
| Icon at the start or end of an input           | `Input startIcon`/`endIcon`, or `InputGroup` + `InputGroupAddon`                           | `InputGroup` + `InputGroupAddon` only         |
| Input inside a group                           | `<InputGroup><Input/></InputGroup>`                                                        | `<InputGroup><InputGroupInput/></InputGroup>` |
| Multiline import                               | `@rixl/ui/input-area`, `@rixl/ui/textarea`                                                 | `import {InputArea} from "@rixl/ui/input"`    |
| Subpath exports                                | `field`, `input`, `input-group`, `input-area`, `textarea`                                  | `input`, `input-group`                        |

## Kumo mapping

| Kumo                                                                                                                                                                                       | Rixl                                                                  | Note                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------- |
| `Input` `label`, `labelTooltip`, `description`, `error` (string or `{message, match}`), `required={false}` shows "(optional)", `size`, `variant`, `passwordManagerIgnore`, `onValueChange` | same props, unchanged                                                 | `variant="error"` stays the existing deprecated alias    |
| `Input` without `label` needs `aria-label`; console warning in development                                                                                                                 | unchanged, and the same warning for `InputArea` and `InputGroupInput` |                                                          |
| `InputArea` same field props, `size`, `onValueChange`                                                                                                                                      | same; `size` and `onValueChange` are new                              | `autoResize`/`minRows`/`maxRows` deferred (see proposal) |
| `Textarea` alias of `InputArea`                                                                                                                                                            | removed                                                               | The owner wants one name, `InputArea`                    |
| `InputGroup` `label`, `description`, `error`, `required`, `labelTooltip`, `size`, `disabled`; `role="group"`                                                                               | same                                                                  | `role="group"` added                                     |
| `InputGroup.Input`                                                                                                                                                                         | `InputGroupInput`                                                     | Flat exports match the rest of the library               |
| `InputGroup.Addon align`                                                                                                                                                                   | `InputGroupAddon align`                                               |                                                          |
| `InputGroup.Button`                                                                                                                                                                        | `InputGroupButton` (unchanged)                                        |                                                          |
| `InputGroup.Suffix`                                                                                                                                                                        | not added                                                             | out of scope                                             |

## Decisions

1. **Field becomes internal to `input/`.** Base UI `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error` and `Field.Validity` stay the primitives, so `htmlFor`, `aria-describedby` and `aria-invalid` are still wired by Base UI. One internal component, `InputField`, renders root, label row and message for `Input`, `InputArea` and `InputGroup`. The standalone `FieldRoot`/`FieldLabel`/`FieldDescription`/`FieldError` wrappers had no caller left once the public surface goes and are deleted rather than kept for one internal use each.
2. **`Input` has no knowledge of groups.** `InputGroupInput` renders the same control with the group's borderless styling and reads `required`/`disabled` from the group context. `Input` stops reading the group context and the Field context, and no longer needs to detect an enclosing field because `InputGroupInput` never renders a label, description or error.
3. **`InputArea` lives in `input/`.** It reuses `InputField`, `resolveInputSize`, the error normalisation and a shared control-surface class string; only the padding, minimum height and `field-sizing` differ. This mirrors Kumo, where both are exported from one entry.
4. **Textarea is a pure alias.** `Textarea` only forwards to `InputArea` and sets a `data-slot`; it is removed in this change, as the owner asked for the single name.
5. **Required indicator.** Kumo shows nothing for `required` and "(optional)" for `required={false}`. Rixl keeps that behaviour; native `required` still reaches the control so `aria-required` and form validation apply.
6. **Data slots** are renamed with the components they belong to (`input-field`, `input-label`, `input-description`, `input-error`), because `field-*` named a component that no longer exists.

## Migration

- `FieldRoot` + `FieldLabel` + `Input` + `FieldDescription` + `FieldError` → `<Input label description error />`. A custom `validate` on `FieldRoot` has no equivalent; use `error` (`{message, match}` or a string).
- `<Input startIcon={<SearchIcon/>} />` → `<InputGroup><InputGroupAddon><SearchIcon/></InputGroupAddon><InputGroupInput aria-label="Search" /></InputGroup>`.
- `<Input endIcon={…} />` → `InputGroupAddon align="end"` after `InputGroupInput`.
- `<InputGroup><Input/></InputGroup>` → `<InputGroup><InputGroupInput/></InputGroup>`.
- `import {Textarea} from "@rixl/ui/textarea"` and `import {InputArea} from "@rixl/ui/input-area"` → `import {InputArea} from "@rixl/ui/input"`.
- Selectors on `[data-slot="field"]`, `field-label`, `field-description`, `field-error` → `input-field`, `input-label`, `input-description`, `input-error`.
