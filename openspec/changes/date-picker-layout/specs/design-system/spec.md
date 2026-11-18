# Spec Delta

## ADDED Requirements

### Requirement: DatePicker caption controls stay inside the calendar

`DatePicker` SHALL lay out its caption as previous, caption, next, with the previous and next buttons at the start and end of the first and last month. Every caption control (previous, next, month and year dropdowns) SHALL lie inside the calendar's box and SHALL NOT overlap another control, for `captionLayout` `label`, `dropdown`, `dropdown-months` and `dropdown-years`, for one or several months, with `showWeekNumber`, and with any `react-day-picker` locale.

#### Scenario: Dropdown caption fits the grid

- **WHEN** a consumer renders `captionLayout="dropdown"` with a long-name locale such as German or Russian
- **THEN** the previous button, next button, month dropdown and year dropdown are inside the root's bounding box and do not overlap (`date-picker-layout.browser.test.tsx`)

#### Scenario: Several months and week numbers

- **WHEN** a consumer renders `numberOfMonths={2}` or `showWeekNumber`
- **THEN** the same containment and no-overlap holds (`date-picker-layout.browser.test.tsx`)

#### Scenario: The caption does not move when the month changes

- **WHEN** the displayed month changes from a short name to a long one with `captionLayout="dropdown"`
- **THEN** the previous and next buttons and the year dropdown keep their positions (`date-picker-layout.browser.test.tsx`)

### Requirement: DatePicker draws a surface only when it stands alone

`DatePicker` SHALL draw a surface (`--rixl-surface` background, `--rixl-border` border, `--rixl-radius-md`, `--rixl-shadow-xs`) with `--spacing(3)` padding when it is not inside a `Popover`, `Card` content or `Dialog` content. Inside one of those it SHALL draw no background, border or shadow and have no padding of its own, so the container's surface and padding apply once. A consumer `className` SHALL still override the standalone surface.

#### Scenario: Standalone

- **WHEN** a consumer renders `<DatePicker mode="single" />` in the page
- **THEN** its root has a 1px border, a non-transparent background and 12px padding (`date-picker-surface.test.tsx`, `date-picker-layout.browser.test.tsx`)

#### Scenario: Inside a popover or card

- **WHEN** it is rendered inside `PopoverContent`, `CardContent` or `DialogContent`
- **THEN** its root has no border, a transparent background, no shadow and zero padding (`date-picker-layout.browser.test.tsx`)

#### Scenario: className wins standalone

- **WHEN** a consumer passes `className="border-0 p-0"` standalone
- **THEN** the root has no border and no padding (`date-picker-surface.test.tsx`)

### Requirement: DatePicker day cells read as one system

A day button SHALL fill its cell. A selected day (single, multiple, range start and range end) SHALL use the primary background, a range's middle days a muted band that is continuous across cells, and today an outline that is hidden once the day is selected. Keyboard focus SHALL show the shared focus ring.

#### Scenario: Today and selected do not stack

- **WHEN** today is selected in `mode="single"`
- **THEN** its button has the primary background and a transparent border (`date-picker-layout.browser.test.tsx`)

#### Scenario: Keyboard focus ring

- **WHEN** a consumer moves focus between days with the arrow keys
- **THEN** the focused day button has a non-empty `box-shadow` ring (`date-picker-layout.browser.test.tsx`)
