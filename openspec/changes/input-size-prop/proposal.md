## Why

`Input` has two size props for one concept. `inputSize` (`sm | default | lg`) is a `cva` variant; `size` (`xs | sm | base | lg`) is a Kumo-style alias that `resolveInputSize` maps onto it, with `inputSize` winning when both are set. `InputArea`, `InputGroup` and `InputGroupInput` repeat the split. `Input` also keeps a deprecated `variant="error"` that duplicates what `error` and `aria-invalid` already do.

Kumo UI documents one prop, `size`, with `xs | sm | base | lg` and `base` as the default (https://kumo-ui.com/components/input.md). The `unify-input-api` change already adopted Kumo's field shape; this change finishes the job for sizing and drops the leftover deprecated surface in the same major release.

## What Changes

- **BREAKING** `Input`, `InputArea` and `InputGroup` take a single `size` prop: `"xs" | "sm" | "base" | "lg"`, default `"base"`. `inputSize` is removed.
- **BREAKING** `xs` is a real size (it was an alias of `sm`); `sm` stays `h-8`, `base` is the former `default` (`h-9`), `lg` stays `h-10`.
- **BREAKING** `Input` no longer accepts `variant="error"`. Error styling follows `error` and `aria-invalid`.
- **BREAKING** `resolveInputSize` is no longer exported from `input/input.tsx`; the alias module and the `variant` deprecation warning are deleted.
- The `cva` variant key is renamed from `inputSize` to `size`; `inputVariants({size})` stays exported.

**Breaking status**: breaking; ships as the next major through a `feat(input)!:` commit.

## Capabilities

### Modified Capabilities

- `design-system`: one size prop for text inputs.

## Out of scope

- Kumo's `InputArea` `autoResize`/`minRows`/`maxRows` (already deferred in `unify-input-api`).
- A custom `validate` prop (see design.md, decision 3).
