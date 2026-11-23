# Design

## Context

Kumo's Pagination page (https://kumo-ui.com/components/pagination.md, fetched 2026-11-18 with curl as raw markdown) documents: `setPage` (required), `page` (1-indexed), `perPage`, `totalCount`, `hasNextPage` (ignored when `totalCount` is given), `controls` (`"full"` default, `"simple"`), `labels` (aria-labels `firstPage`, `previousPage`, `nextPage`, `lastPage`, `pageNumber`, `pageSize`), `text` (render function), `className`, `children`. Compound parts: `Pagination.Info` (children as a render function receiving `page`, `totalCount`, `pageShowingRange`), `Pagination.PageSize` (`value`, `onChange`, `options` default `[25, 50, 100, 250]`, `label`), `Pagination.Controls` (`pageSelector="dropdown"`), `Pagination.Separator`.

Behaviour in the page: unknown totals hide first, last and the page selector; `totalCount={0}` is one empty page and `setPage` is never called with 0; the page input navigates on whole numbers, clamps out-of-range numbers and restores the current page, without calling `setPage`, for `abc`, `2.5` or `1e1`.

## Kumo mapping

| Kumo                                              | `@rixl/ui` before                                       | `@rixl/ui` after                                                       |
| ------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| `setPage` (required)                              | `onPageChange`                                          | `setPage`                                                              |
| `page`                                            | `page` + `currentPage`                                  | `page` (default 1)                                                     |
| `perPage`                                         | `pageSize` + `limit`                                    | `perPage`                                                              |
| `totalCount`                                      | `totalCount` or `totalPages`                            | `totalCount`; the page count is derived                                |
| `hasNextPage`                                     | none                                                    | `hasNextPage`                                                          |
| `controls`                                        | `PaginationControls mode`                               | `controls` on `Pagination` and `PaginationControls`                    |
| `labels`                                          | `navLabel`, `firstLabel`…, `limitLabel` props           | `labels` (Kumo's six keys plus `navigation`)                           |
| `text`                                            | `getPageLabel`                                          | `text` on `Pagination`; `children` render function on `PaginationInfo` |
| `Pagination.Info`                                 | `PaginationInfo`                                        | `PaginationInfo`                                                       |
| `Pagination.PageSize` `value`/`onChange`          | `onPageSizeChange`; also `limit`/`setLimit` on the root | `value`/`onChange`                                                     |
| `Pagination.PageSize` `options` `[25,50,100,250]` | `[10, 20, 50, 100]`                                     | `[25, 50, 100, 250]`                                                   |
| `Pagination.PageSize` `label`                     | `label` ("Rows per page")                               | `label`, default `labels.pageSize`                                     |
| `Pagination.Controls` full: input in the middle   | buttons only; `PaginationPageInput` composed by hand    | `PaginationControls` renders the page input in full mode               |
| `pageSelector="dropdown"`                         | none                                                    | `pageSelector="dropdown"`                                              |
| `Pagination.Separator`                            | none                                                    | `PaginationSeparator`                                                  |
| `totalCount={0}` is one empty page                | page 0, `Page 0 of 0`                                   | page 1 of 1, `Showing 0–0 of 0`, all buttons disabled                  |
| dot notation (`Pagination.Info`)                  | named exports                                           | named exports (package convention)                                     |
| nav landmark label                                | `navLabel`                                              | `labels.navigation`, default `Pagination` (Kumo has no equivalent)     |

## Decisions

### D1. One model: `totalCount` + `perPage`, or `hasNextPage`

**Chosen**: the page count is always derived (`max(1, ceil(totalCount / perPage))`). `totalPages` is removed. `perPage` is required whenever `totalCount` is passed (a union type), so a known total can always be turned into pages.

**Alternatives considered**: keeping `totalPages` as the "no records" model. Kumo has no such prop, and a consumer with a page count can pass `totalCount = pages * perPage`. Two ways to say how many pages there are is the duplication being removed.

### D2. Empty results are one empty page

**Chosen**: `totalCount` 0 gives `totalPages` 1 and `page` 1. This drops the `empty` special case from the controls (first and previous are disabled because `page <= 1`, next and last because `page >= totalPages`) and matches Kumo's "single empty page".

**Alternatives considered**: page 0 of 0 (today). It needs a branch in the clamp, the buttons, the info text and the page input, and Kumo does not do it.

### D3. A single "has a next page" fact

**Chosen**: the normalised state carries `hasNextPage`: derived (`page < totalPages`) when the total is known, taken from the prop otherwise. Next is disabled on `!hasNextPage`, so known and unknown totals share one rule. The last-page button exists only when the total is known.

### D4. Labels live on the root

**Chosen**: `labels` (Partial) on `Pagination` is the only place strings are set; parts read them from context with `DEFAULT_LABELS` as the single default table. `PaginationControls` no longer takes `firstLabel` etc., and `getPageLabel` becomes `text`. `PaginationPageSize` keeps Kumo's `label` prop for the visible text.

**Alternatives considered**: per-part overrides as today. They are a second way to set the same string.

### D5. Parts require `Pagination`

**Chosen**: `usePaginationContext` throws outside `Pagination`. The null branches in `PaginationControls`, `PaginationInfo` and `PaginationPageInput` (and the duplicate English defaults in `PaginationControls`) go. `PaginationNavButton` stays standalone: it takes `target` and `setPage`.

### D6. Page selector

**Chosen**: `pageSelector="dropdown"` renders our `Select` with one item per page, named by `labels.pageNumber`. Default is the page input (`PaginationPageInput`, our `Input`), named by `labels.pageNumber` too.

## Risks

- The default layout now includes a page input and info reads `Showing a–b of n` (it already did with `totalCount`), so existing screens change look. Passing `controls="simple"` removes the input.
- Consumers that passed `totalPages` need `perPage` and a `totalCount`.
- Default page-size options change to Kumo's.
