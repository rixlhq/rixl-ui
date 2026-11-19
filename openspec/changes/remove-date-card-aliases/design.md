# Design

## Context

`calendar/calendar.tsx` re-exports `DatePicker as Calendar` and `date-picker/calendar.tsx` re-exports `DatePickerGrid as Calendar` and `DatePickerDayButton as CalendarDayButton`. `date-picker/index.ts` re-exports those as `DatePickerCalendar*`. Every name points at the same implementation (`date-picker-unification.test.tsx` asserted reference equality). `Card`'s `interactive` variant maps both values to `""`.

## Decisions

**Delete, don't redirect.** The package is mid-major, so a removed export is a compile error for consumers, which is the clearest migration signal. A runtime `console.warn` stub would be a new deprecated export, the thing being removed.

**Keep `DatePicker` as the single name.** The canonical export is `DatePicker` (with `DatePickerProps`, `DatePickerDayButton`, `DatePickerDayButtonProps`), already used by the docs showcase.

**Tests follow behaviour, not names.** A test is deleted only when it asserts the existence or identity of a removed name. Anything about rendering, selection or the DOM contract is checked against `DatePicker`. The `data-slot="calendar"` root marker that `Calendar` tests asserted is a DOM contract of the date picker (other tests and the browser test query it), so it gets its own `DatePicker` test.

**Card.** `interactive` is removed from the `cva` config, `defaultVariants` and the destructured props. TypeScript users passing it get an excess-property error. JavaScript users passing it forward an unknown `interactive` attribute to the `div`, which React logs as a warning for a non-boolean attribute; the migration note says to remove it.

## Risks

- Consumers importing `@rixl/ui/calendar` fail at resolve time. Release Please turns the `!` commits into the next major.

## Spec bookkeeping

No Calendar requirement exists in `openspec/specs/`, so removing `Calendar` is stated as an ADDED requirement ("DatePicker is the only date grid export"), as `empty-component` did for `EmptyState`; a REMOVED block would have no header to match. "Cards are passive containers" is MODIFIED against the requirement in `unify-component-architecture`, which must be archived first.
