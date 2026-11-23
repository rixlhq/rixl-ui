# Tasks

## 1. Caption

- [x] 1.1 Previous and next flank the caption; controls stay inside the day columns for every layout. Test: `date-picker-layout.browser.test.tsx` (containment and no overlap, per layout, one and two months, week numbers, `de`/`ru`/`el`/`fi`; position stability across months; no truncation of 'September'). Evidence: 29 of 41 cases failed on the old caption, all pass after (commit `fix(date-picker): flank the caption …`).

## 2. Surface

- [x] 2.1 Standalone surface and host reset. Tests: `date-picker-surface.test.tsx`, `date-picker-layout.browser.test.tsx` (standalone, `Popover`, `Card`, `Dialog`, default `PopoverContent` width). Evidence: 5 unit and 6 browser tests failed before, pass after.

## 3. Cells and spacing

- [x] 3.1 Button fills the cell; today, selected, range and focus visuals; spacing; footer. Tests: `date-picker-layout.browser.test.tsx` (`DatePicker cells`, 7 tests; 6 failed before).

## 4. Docs

- [x] 4.1 Showcase examples: standalone, popover, dropdown caption, two months, presets. Check: `vpr docs` builds.

## 5. Verification

- [x] 5.1 From the repo root, `vp check`: 235 files, no warnings, lint or type errors. From `packages/ui`: `vp test --run` 110 files, 1088 tests passed (unit and browser, with axe checks); `vp test --run --coverage` passes the floor (statements 97.79%, branches 90.43%, functions 98.46%, lines 98.52%); `vp pack` builds; `vpx publint` reports "All good!"; `vpx size-limit` reports 56.88 kB of 58 kB for JS and 3.49 kB of 3.5 kB for the preset, budgets unchanged; `vpr docs` builds. `vpr publint`, `budget` and `docs:build` are not defined on this branch.
