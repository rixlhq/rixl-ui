# Tasks

## 1. Shared flip class

- [x] 1.1 `rtlFlip` in `src/lib/classes.ts`; used by pagination, tabs overflow, dropdown sub, breadcrumb separator, date-picker chevron. Evidence: the `rtlFlip` block in `classes.test.tsx` and the date-picker chevron test failed on the missing export, then passed; with `rtlFlip` removed from `PaginationNavButton`, the four pagination icon tests in `pagination-rtl.browser.test.tsx` fail.

## 2. Logical positions

- [x] 2.1 Mobile sidebar sheet: `start-0 border-e` / `end-0 border-s`, slide toward the edge in both directions. Evidence: `sidebar-rtl.browser.test.tsx` failed on the right-edge, left-edge and border cases (32 px off the viewport), then passed.
- [x] 2.2 `DialogCloseButton` safe-area inset follows `end`. Evidence: `dialog-rtl.test.tsx` failed on both inset classes, then passed. Chromium has no safe-area inset to simulate, so geometry is covered by `dialog-rtl.browser.test.tsx` (close button on the left, content centred).

## 3. Direction provider

- [x] 3.1 `@rixl/ui/direction-provider` (pack.entry, package.json exports, barrel). Evidence: `direction-provider.browser.test.tsx`; with the provider removed from `test/rtl.tsx`, the tabs and dropdown-menu arrow-key tests fail. A jsdom version of the keyboard test failed even in LTR (Base UI's composite needs layout), so the test lives in the browser project.

## 4. Browser tests

- [x] 4.1 `*-rtl.browser.test.tsx` for tabs, sidebar, pagination, breadcrumb, dialog, dropdown menu, input group, switch, slider, select and date picker, each with an axe check, on the `renderRtl` helper in `test/rtl.tsx`.

## 5. Docs app

- [x] 5.1 Header RTL toggle (`use-direction.ts`, `DirectionProvider` around the app), a Direction showcase, and `border-inline-end` on the mini sidebar preview. Evidence: two cases in `navigation.browser.test.tsx` (toggle mirrors the sidebar to the right edge; header stays within a 390 px viewport).

## 6. Verification

- [x] 6.1 From the repo root, `vp check`: no warnings, lint errors or type errors in 238 files. From `packages/ui`: `vp test --run --coverage` 121 files, 1068 tests passed, exit 0, floor held (all files 97.7% statements); `vp pack` builds; `vpx publint` reports "All good!"; `vpx size-limit` reports 56.58 kB of 58 kB for JS and 3.49 kB of 3.5 kB for the preset, budgets unchanged; `vpr docs:build` builds; docs tests (`vp test --run` in `apps/docs`) 18 passed. `vpr lint:suppressions` and `knip` are not defined on this branch.
