# Tasks

## 1. Shared surface

- [ ] 1.1 Export `controlSurface` and `controlSizes`; move `read-only:` into the text-field part (test first: `input-variants.test.ts`, class set of `inputVariants`/`inputAreaVariants` unchanged)

## 2. Select

- [ ] 2.1 Trigger composes the surface and the size scale; `xs|sm|base|lg`, no `default` (test first: `select.test.tsx` sizes, parity with `inputVariants`; browser: not read-only styled)
- [ ] 2.2 `Select` built-in field: `label`, `labelTooltip`, `description`, `error` (test first: `select-field.test.tsx`; browser: axe with label and error)

## 3. Input OTP

- [ ] 3.1 Slot composes the surface and keeps the joined bar (test first: `input-otp.test.tsx`; browser: joined edges and invalid)

## 4. Pagination

- [ ] 4.1 `PaginationPageInput` renders `Input` (test first: `pagination-composition.test.tsx`)
- [ ] 4.2 `PaginationPageSize` renders `Select` with a visible label (test first: `pagination.test.tsx`, `pagination.browser.test.tsx`)

## 5. Docs

- [ ] 5.1 Update the select, input-otp and pagination showcases

## 6. Verify

- [ ] 6.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs`
