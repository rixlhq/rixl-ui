# Tasks

## 1. DatePicker

- [x] 1.1 Replace the `value`/`onSelect` tests with `selected`/`onChange`, add the removed-name, forwarded-prop and outside-day tests, watch them fail, then rework `date-picker.tsx`, `date-picker.types.ts`, the grid; delete `selection-handler.ts` and `shared-grid-props.ts`. Evidence: `date-picker.test.tsx` cases named in the spec delta; the multi-month outside-days and `weekStartsOn` tests failed before the change and pass after.
- [x] 1.2 Browser tests use the Kumo props and still pass axe. Evidence: `date-picker.browser.test.tsx` passes in `vp test run` (axe check unchanged).
- [x] 1.3 DatePicker showcase uses the Kumo props. Evidence: `vp check` type-checks `apps/docs`; `vpr docs` result recorded in 5.1.

## 2. Button

- [ ] 2.1 Remove `color`, `colorClasses`, `isButtonColor` and the `color`/`primary`/`icon-*` alias wording; update tests and the showcase. Evidence: `button.test.tsx` "does not restyle for `color`"; `git grep colorClasses` empty.

## 3. Table

- [ ] 3.1 Drop `data-[state=selected]` from `TableRow`; update the browser test and the showcase note. Evidence: `table.browser.test.tsx`.

## 4. Docs app

- [ ] 4.1 Make `Showcase.examples` required and delete the `Detail` fallback. Evidence: `detail.test.tsx`, `vp check`.

## 5. Gate

- [ ] 5.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpr docs`. Evidence: the summary lines recorded here when run.
