# Tasks

## 1. Date picker and calendar

- [x] 1.1 Add a `DatePicker` test for the `data-slot="calendar"` root and `button[data-day]` buttons, then delete `calendar/`, `date-picker/calendar.tsx`, the four `DatePickerCalendar*` exports, the `./calendar` export, the pack entry and the barrel line, and the alias-identity tests. Evidence: `date-picker.test.tsx` "marks its root with data-slot calendar…" passes; the removed `calendar.test.tsx` checks (root slot, `data-day` buttons, `data-selected-single` after a click) are covered there and by "selects a single date and notifies onSelect".

## 2. Card

- [ ] 2.1 Remove the `interactive` variant and prop; delete the tests that only pinned it and keep the passive-surface tests.
- [ ] 2.2 Update the Card showcase to stop passing `interactive`.

## 3. Gate

- [ ] 3.1 `vp check`, `vp test run`, `vp pack`, `vpx size-limit`, `vpx knip` and `vpr docs` pass.
