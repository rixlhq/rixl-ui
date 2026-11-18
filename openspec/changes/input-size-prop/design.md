## Context

`Input`, `InputArea`, `InputGroup` and `InputGroupInput` accept `inputSize` and, on all but `InputGroupInput`, a `size` alias resolved by `resolve-input-size.ts`. Source for the target API: https://kumo-ui.com/components/input.md, which documents `size` as `"xs" | "sm" | "base" | "lg"` with default `"base"`. The page gives no pixel heights; the heights below are Rixl's own.

## Decisions

1. **One prop, `size`, Kumo's scale.** The native `size` attribute is already omitted from `InputProps`/`InputAreaProps` (`Omit<ComponentProps<"input">, "size">`), so the name is free. The `cva` variant key is `size`, so `VariantProps<typeof inputVariants>` already carries the right type and no alias module is needed.

   | `size` | Input height | Before                             |
   | ------ | ------------ | ---------------------------------- |
   | `xs`   | `h-7`        | alias of `sm` (`h-8`), now its own |
   | `sm`   | `h-8`        | `inputSize="sm"`                   |
   | `base` | `h-9`        | `inputSize="default"` (default)    |
   | `lg`   | `h-10`       | `inputSize="lg"`                   |

   `InputArea` follows the same four steps on `min-h`.

2. **`variant="error"` is removed.** `error` (string or `{message, match}`) and `aria-invalid` already drive the invalid styling through the control surface's `aria-invalid:` classes. The deprecated prop and its development warning go; the accessible-name warning stays because it is still tested and covers `Input`, `InputArea` and `InputGroupInput`.

3. **Required marker follows Kumo.** `required={false}` shows a muted "(optional)" after the label; `required` adds no visual mark but still reaches the control, so `aria-required` and native form validation apply. Kept as is.

4. **No custom `validate` prop.** Kumo has none. `error` with `{message, match}` covers native validity (`match` is a Base UI `ValidityState` key); custom validation belongs to the consumer's form library, which sets `error` or `aria-invalid`.

## Migration

- `inputSize="sm"` → `size="sm"`; `inputSize="default"` (or no prop) → `size="base"` (or no prop); `inputSize="lg"` → `size="lg"`.
- Kumo's former alias keeps working as written: `size="xs"` now renders a smaller control than `size="sm"` did.
- `variant="error"` → `error="Message"` (a message below the control) or `aria-invalid` (styling only).
- `resolveInputSize` has no replacement; read `size` directly.
