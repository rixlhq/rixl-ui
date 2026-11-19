# Tasks

## 1. One size prop

- [x] 1.1 Rename the `cva` variant key to `size` with `xs | sm | base | lg`, default `base`, for `Input` and `InputArea` (test first)
- [x] 1.2 Apply `size` to `InputGroup` and `InputGroupInput` through the group context
- [x] 1.3 Delete `resolve-input-size.ts` and `inputSize`

## 2. Drop the deprecated variant

- [x] 2.1 Remove `variant="error"` from `Input` and its development warning; keep the accessible-name warning

## 3. Callers and docs

- [x] 3.1 Update internal callers and the input, input-area and input-group showcases

## 4. Verify

- [x] 4.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs`
