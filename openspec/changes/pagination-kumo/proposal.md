## Why

`@rixl/ui` is not yet v1 and aims to match Kumo's component APIs. `Pagination` carries two models side by side: the canonical `page` / `totalPages` / `pageSize` / `totalCount` / `onPageChange`, and a legacy one (`currentPage`, `limit`, `setLimit`, `limitOptions`, `limitLabel`, `showLimitSelector`, `renderLimitSelector`, `PaginationLimitNode`). `normalize-pagination.ts` merges the two. The built-in page-size control is now our `Select`, so `renderLimitSelector` ("replace it with an `@rixl/ui/select`") describes what the component already is.

Kumo's page (https://kumo-ui.com/components/pagination.md, fetched 2026-11-18) documents one model: `page`, `setPage`, `perPage`, `totalCount`, `hasNextPage`, `controls`, `labels`, `text`, and compound parts for info, page size, controls and a separator. Two names for one thing is the duplication; matching Kumo removes it.

## What Changes

- **Pagination (breaking).** One prop model, Kumo's: `page`, `setPage` (required), `perPage`, `totalCount`, `hasNextPage`, `controls` (`"full"` or `"simple"`), `labels`, `text`. `onPageChange`, `pageSize`, `totalPages`, `currentPage`, `limit`, `setLimit`, `limitOptions`, `limitLabel`, `showLimitSelector`, `renderLimitSelector`, `navLabel`, `firstLabel`, `prevLabel`, `nextLabel`, `lastLabel` and `getPageLabel` are removed. Every string moves into `labels`.
- **Unknown totals.** `hasNextPage` without `totalCount` shows previous and next only; first, last and the page input are hidden.
- **Empty results.** `totalCount={0}` is one empty page (`page` 1 of 1), not page 0. Every button is disabled and `setPage` is never called.
- **Full controls include the page input.** `controls="full"` renders first, previous, a page input, next and last. `pageSelector="dropdown"` swaps the input for a `Select` of pages.
- **Parts.** `PaginationInfo` takes a render function as `children`; `PaginationPageSize` takes `value`, `onChange` and `options` (default `[25, 50, 100, 250]`); `PaginationControls` takes `controls` and `pageSelector` and no per-button labels; new `PaginationSeparator`. `PaginationLimitNode`, `PaginationControls`'s `mode` and `PaginationPageSize`'s `onPageSizeChange` are removed. Parts read `page`, `labels` and `setPage` from `Pagination` and throw outside it.
- **Docs app.** The Pagination showcase uses the Kumo props and one example per Kumo variant that applies.

Migration:

| Before                                                               | After                                                                                   |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `onPageChange={fn}`                                                  | `setPage={fn}`                                                                          |
| `currentPage={p}`                                                    | `page={p}`                                                                              |
| `pageSize={n}`                                                       | `perPage={n}`                                                                           |
| `totalPages={n}` (page count)                                        | `totalCount={n * perPage}` with `perPage`; or `hasNextPage` when the total is unknown   |
| `limit={n} setLimit={fn}` (built-in selector)                        | `<PaginationPageSize value={n} onChange={fn} />` inside `<Pagination>`                  |
| `limitOptions={[10, 20]}`                                            | `<PaginationPageSize options={[10, 20]} />`                                             |
| `limitLabel="Per page"`                                              | `labels={{pageSize: "Per page"}}`                                                       |
| `showLimitSelector`, `renderLimitSelector={node}`                    | render `<PaginationPageSize />` or your own node as a child                             |
| `navLabel="…"`                                                       | `labels={{navigation: "…"}}`                                                            |
| `firstLabel` / `prevLabel` / `nextLabel` / `lastLabel`               | `labels={{firstPage, previousPage, nextPage, lastPage}}`                                |
| `getPageLabel={(c, t) => …}`                                         | `text={({page, totalCount, pageShowingRange}) => …}` or `<PaginationInfo>{(info) => …}` |
| `<PaginationControls mode="simple" />`                               | `<PaginationControls controls="simple" />`                                              |
| `<PaginationControls firstLabel="…" />` (per-part labels)            | `labels` on `Pagination`                                                                |
| `<PaginationPageSize onPageSizeChange={fn} />`                       | `<PaginationPageSize onChange={fn} />`                                                  |
| `<PaginationNavButton onPageChange={fn} />`                          | `<PaginationNavButton setPage={fn} />`                                                  |
| page-size default options `[10, 20, 50, 100]`                        | `[25, 50, 100, 250]` (pass `options` to keep the old ones)                              |
| empty results showed `Page 0 of 0`                                   | one empty page: page input `1`, info `Showing 0–0 of 0`                                 |
| `PaginationLimitNode`, `normalizePagination`'s `currentPage`/`limit` | removed                                                                                 |

## Capabilities

### Modified Capabilities

- `design-system`: Pagination API (Kumo's props, unknown totals, empty results, page input in full controls, labels).

## Non-goals

- No `Pagination.Info` dot notation. Every component in this package is a named export from its subpath; Pagination follows that (`PaginationInfo`, not `Pagination.Info`).
- No change to press feedback, RTL chevron mirroring or the `Select` and `Input` the parts are built on.
- No fix for a `perPage` that is missing from `PaginationPageSize` options: the Select shows no value, as before.

## Acceptance

- `git grep -nE "currentPage|setLimit|limitOptions|renderLimitSelector|PaginationLimitNode|onPageChange|getPageLabel" packages/ui/src apps/docs/src` finds only the `@ts-expect-error` cases in `pagination.test.tsx` that prove the removed names are rejected.
- `vp check`, `vp test run`, `vp pack`, `vpx size-limit` and `vpr docs` pass, and the browser test keeps its axe checks.
