# Tasks

## 1. Pagination core

- [x] 1.1 Replace the legacy-model tests with Kumo-prop tests (`setPage`, `perPage`, `totalCount`, `hasNextPage`, empty page, labels, `text`), watch them fail, then reduce `normalize-pagination.ts` to the single model and rework the root, provider, context and view. Evidence: `pagination.test.tsx` and `pagination-composition.test.tsx` failed (missing `pagination-separator`, old props) before the rework and pass after; replacing the last button's `disabled={!hasNextPage}` with `false` fails 3 tests.
- [x] 1.2 Delete `PaginationLimitNode`, its export and the legacy props and tests.

## 2. Parts

- [x] 2.1 `PaginationControls`: `controls`, page input in full mode, unknown-total buttons, labels from context, `pageSelector="dropdown"`.
- [x] 2.2 `PaginationInfo` render function, `PaginationPageSize` `value`/`onChange`/`options`/`label`, `PaginationSeparator`, `PaginationNavButton` `setPage`, `usePaginationContext` throws outside `Pagination`.
- [x] 2.3 Browser tests use the new props and keep the axe checks; add the dropdown selector.

## 3. Docs app

- [x] 3.1 Rewrite the Pagination showcase with the Kumo props. Evidence: `vp check` type-checks `apps/docs`.

## 4. Verification

- [x] 4.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, docs tests and `vpr docs` pass.
