# Tasks

## 1. Shared surface

- [x] 1.1 Export `controlSurface` and `controlSizes`; move `read-only:` into the text-field part (test first: `input-variants.test.ts`, class set of `inputVariants`/`inputAreaVariants` unchanged) — `input-variants.test.ts` passes; `vp test run` 887 passed

## 2. Select

- [x] 2.1 Trigger composes the surface and the size scale; `xs|sm|base|lg`, no `default` (test first: `select.test.tsx` sizes, parity with `inputVariants`; browser: not read-only styled) — `select.test.tsx` sizes/parity/surface and the browser read-only test pass
- [x] 2.2 `Select` built-in field: `label`, `labelTooltip`, `description`, `error` (test first: `select-field.test.tsx`; browser: axe with label and error) — `select-field.test.tsx` and the browser axe test pass

## 3. Input OTP

- [x] 3.1 Slot composes the surface and keeps the joined bar (test first: `input-otp.test.tsx`; browser: joined edges and invalid) — `input-otp.test.tsx` and `input-otp.browser.test.tsx` pass; removing `not-first:border-s-0` fails the joined-bar test

## 4. Pagination

- [x] 4.1 `PaginationPageInput` renders `Input` (test first: `pagination-composition.test.tsx`) — `pagination-composition.test.tsx` passes (commit, clamp, Escape, slot, surface, width override)
- [x] 4.2 `PaginationPageSize` renders `Select` with a visible label (test first: `pagination.test.tsx`, `pagination.browser.test.tsx`) — `pagination.test.tsx`, `forward-refs.test.tsx` and `pagination.browser.test.tsx` (pick 50, axe with popup open) pass

## 5. Docs

- [ ] 5.1 Update the select, input-otp and pagination showcases

## 6. Verify

- [ ] 6.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs`
