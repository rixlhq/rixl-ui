# Tasks

## 1. DatePicker

- [x] 1.1 Replace the `value`/`onSelect` tests with `selected`/`onChange`, add the removed-name, forwarded-prop and outside-day tests, watch them fail, then rework `date-picker.tsx`, `date-picker.types.ts`, the grid; delete `selection-handler.ts` and `shared-grid-props.ts`. Evidence: `date-picker.test.tsx` cases named in the spec delta; the multi-month outside-days and `weekStartsOn` tests failed before the change and pass after.
- [x] 1.2 Browser tests use the Kumo props and still pass axe. Evidence: `date-picker.browser.test.tsx` passes in `vp test run` (axe check unchanged).
- [x] 1.3 DatePicker showcase uses the Kumo props. Evidence: `vp check` type-checks `apps/docs`; `vpr docs` result recorded in 5.1.

## 2. Button

- [x] 2.1 Remove `color`, `colorClasses`, `isButtonColor` and the `color`/`primary`/`icon-*` alias wording; update tests and the showcase. Evidence: `button.test.tsx` "does not restyle for the native color attribute" failed before and passes after; `git grep "colorClasses\|isButtonColor\|fumadocs"` over packages and apps is empty.

## 3. Table

- [x] 3.1 Drop `data-[state=selected]` from `TableRow`; update the browser test and the showcase note. Evidence: `table.browser.test.tsx` "does not give a row with data-state=selected the selected background" failed with the old class and passes after.

## 4. Docs app

- [x] 4.1 Make `Showcase.examples` required and delete the `Detail` fallback. Evidence: `vp check` type-checks every showcase against the required `examples`; `detail.test.tsx` and `discovery.test.ts` pass.

## 5. Gate

- [x] 5.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs`. Evidence: `vp check` no warnings, lint or type errors; `vp test run` in `packages/ui` 93 files, 878 tests passed; `vp pack` build complete; `vpx size-limit` 54.27 kB of 58 kB, preset 3.49 kB of 3.5 kB; `vpr docs` built. Not caused by this change: `apps/docs` `navigation.browser.test.tsx` expects 33 overview tiles and the registry has 32.
