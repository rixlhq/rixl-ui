# Spec Delta

## ADDED Requirements

### Requirement: DatePicker is the only date grid export

`@rixl/ui/date-picker` SHALL export `DatePicker`, `DatePickerProps`, `DatePickerDayButton` and `DatePickerDayButtonProps` for the date grid, and the package SHALL NOT export `Calendar`, `CalendarProps`, `CalendarDayButton`, `CalendarDayButtonProps`, `DatePickerCalendar`, `DatePickerCalendarProps`, `DatePickerCalendarDayButton` or `DatePickerCalendarDayButtonProps`, nor a `@rixl/ui/calendar` subpath.

#### Scenario: Subpath removed

- **WHEN** `package.json#exports` and `vite.config.ts#pack.entry` are read
- **THEN** `./date-picker` exists and `./calendar` does not

#### Scenario: Aliases removed

- **WHEN** a consumer imports `@rixl/ui/date-picker`
- **THEN** it has no `DatePickerCalendar` export (`vp pack` output and knip report no `date-picker/calendar` module)

### Requirement: DatePicker marks its root as a calendar

`DatePicker` SHALL render its root with `data-slot="calendar"` and one `button[data-day]` per visible day.

#### Scenario: Root marker

- **WHEN** a consumer renders `<DatePicker mode="single" />`
- **THEN** an element with `data-slot="calendar"` exists and contains `button[data-day]` elements (`date-picker.test.tsx`)

## MODIFIED Requirements

### Requirement: Cards are passive containers

`Card` SHALL provide surface and layout styling without built-in click affordances or press movement, and SHALL NOT accept an `interactive` prop.

#### Scenario: Passive by default

- **WHEN** a consumer renders `<Card>` containing a `Button`
- **THEN** the card's classes include none of `cursor-pointer`, `active:scale`, `hover:shadow` or `focus-visible:ring`, and the button remains reachable (`passive-card.test.tsx`)

#### Scenario: No interactive variant

- **WHEN** a consumer passes `interactive` to `Card` or `cardVariants`
- **THEN** the compiler rejects it (`card.test.tsx`, `has no interactive variant`)
