# Spec Delta

## ADDED Requirements

### Requirement: Pagination takes Kumo's props

`Pagination` SHALL take the current page as `page` (1-indexed, default 1), report changes through the required `setPage`, take the item count as `totalCount` with `perPage`, or `hasNextPage` when the total is unknown, and take `controls` (`"full"` or `"simple"`), `labels` and `text`. It SHALL NOT accept the removed names listed in the proposal's migration table.

#### Scenario: Buttons report through setPage

- **WHEN** a consumer renders `<Pagination page={3} setPage={fn} perPage={10} totalCount={50} />` and clicks first, previous, next and last
- **THEN** `fn` is called with 1, 2, 4 and 5 (`pagination.test.tsx`)

#### Scenario: Page count is derived

- **WHEN** a consumer renders `perPage={10}` and `totalCount={25}` on page 3
- **THEN** next and last are disabled and info reads `Showing 21–25 of 25` (`pagination.test.tsx`)

#### Scenario: Removed names are rejected

- **WHEN** a consumer passes `currentPage`, `totalPages`, `limit`, `onPageChange`, `getPageLabel`, or `totalCount` without `perPage`
- **THEN** the compiler rejects it (`pagination.test.tsx`, `@ts-expect-error` cases)

#### Scenario: The page is clamped for display

- **WHEN** a consumer renders `page={9}` with five pages
- **THEN** the page input shows 5, next is disabled, and previous calls `setPage(4)` (`pagination-composition.test.tsx`)

### Requirement: Pagination handles unknown totals and empty results

With `hasNextPage` and no `totalCount`, `Pagination` SHALL render previous and next only, hide first, last and the page input, and disable next while `hasNextPage` is false. With `totalCount={0}` it SHALL render one empty page, disable every button and never call `setPage`.

#### Scenario: Unknown total

- **WHEN** a consumer renders `<Pagination page={2} setPage={fn} hasNextPage />`
- **THEN** only the previous and next buttons exist, next is enabled, and info reads `Page 2` (`pagination.test.tsx`)

#### Scenario: No next page

- **WHEN** a consumer renders the same with `hasNextPage={false}`
- **THEN** next is disabled (`pagination.test.tsx`)

#### Scenario: Empty results

- **WHEN** a consumer renders `perPage={10}` and `totalCount={0}` on page 9
- **THEN** every button is disabled, info reads `Showing 0–0 of 0`, the page input shows 1 and `setPage` is not called (`pagination-composition.test.tsx`)

### Requirement: Full controls include a page input

`PaginationControls` with `controls="full"` (the default) SHALL render first, previous, a page input, next and last; `controls="simple"` SHALL render previous and next only. `pageSelector="dropdown"` SHALL render a `Select` of pages in place of the input. The input SHALL go to a whole page number on Enter or blur, clamp numbers outside the range, restore the current page, without calling `setPage`, for anything else, and restore it on Escape.

#### Scenario: Full and simple controls

- **WHEN** a consumer renders `controls="full"` and then `controls="simple"`
- **THEN** four buttons and a textbox named by `labels.pageNumber` appear, then two buttons and no textbox (`pagination.test.tsx`)

#### Scenario: Page input commits and recovers

- **WHEN** a user types `99` and presses Enter on a five-page set, then types `2.5`, `1e1`, `abc` or nothing and blurs, then types `4` and presses Escape
- **THEN** `setPage` is called with 5 once, and the input shows the current page after each of the others (`pagination-composition.test.tsx`)

#### Scenario: Dropdown selector

- **WHEN** a consumer renders `pageSelector="dropdown"` and picks page 4
- **THEN** a combobox named by `labels.pageNumber` replaces the textbox and `setPage` is called with 4 (`pagination.browser.test.tsx`)

### Requirement: Pagination page size and labels follow Kumo

`PaginationPageSize` SHALL render a visibly labelled `Select` taking `value`, `onChange` and `options` (default `[25, 50, 100, 250]`), named by `label`, which defaults to `labels.pageSize`. `PaginationInfo` SHALL take `children` as text or a function of the page state. Every string SHALL come from `labels`, with English defaults.

#### Scenario: Page-size Select

- **WHEN** a consumer renders `<PaginationPageSize value={25} onChange={fn} />` and picks 50
- **THEN** a combobox named `Rows per page` shows 25 and `fn` is called with 50 (`pagination.browser.test.tsx`)

#### Scenario: Labels

- **WHEN** a consumer passes `labels={{navigation: "Seiten", nextPage: "Weiter", pageSize: "Pro Seite"}}`
- **THEN** the nav landmark, next button and page-size combobox use those names, and the other buttons keep their English defaults (`pagination.test.tsx`)

#### Scenario: Info render function

- **WHEN** a consumer passes `text={({page, pageShowingRange}) => …}` or `<PaginationInfo>{fn}</PaginationInfo>`
- **THEN** the info text is the function's result and stays a polite live region (`pagination.test.tsx`)

### Requirement: Pagination keeps its accessibility contract

`Pagination` SHALL render a `nav` landmark named by `labels.navigation`, disable first and previous on page 1 and next and last on the last page, and show no axe violations with the page-size popup open.

#### Scenario: Landmark and bounds

- **WHEN** a consumer renders page 1 of 5
- **THEN** `navigation` named `Pagination` exists and first and previous are disabled (`pagination.test.tsx`)

#### Scenario: Axe

- **WHEN** a consumer renders the full layout with the page-size popup open
- **THEN** `axeViolations(document.body)` is empty (`pagination.browser.test.tsx`)
