## Why

Owner review of `DatePicker` found three layout defects, all in `packages/ui/src/components/date-picker/`:

1. **No visible surface.** The grid root is `bg-rixl-bg` (`oklch(0.99 …)`, one step off the page), so a standalone calendar reads as bare numbers floating on the page. Inside a `Popover` or `Card` it is forced transparent, but its fixed `p-3` still stacks on the popover's own `p-4`, which is 28px of padding.
2. **`captionLayout="dropdown"` overflows.** The grid is 7 × `--cell-size` (32px) = 224px, but the caption row needs a month select (`min-w-[9ch]`), a year select (`min-w-[5.5ch]`) and a reserved `pe-[calc(var(--cell-size)*2+0.5rem)]` for the absolutely positioned `nav` (`absolute end-0 top-0`). The row is wider than the grid, so the prev and next buttons stick out of the component (measured in a Chromium screenshot at `de` locale, "September").
3. **Uneven spacing and visuals.** 16px between the caption and the weekday row, `mt-2` between weeks, a 26px day button inside a 32px cell (so "today" is a 32px muted square behind a 26px selected circle), the range band drawn on the cell and the caps on the button, a hand-rolled focus ring instead of `focusRing`, and no spacing for `footer`.

## What Changes

- **Caption.** Previous and next flank the caption (`prev | caption | next`), each one a `--cell-size` square above the first and last column. The caption is centred between them. The month select takes the remaining width and truncates; the year select keeps its content width, so the row does not shift when the month changes. The same layout serves `label`, `dropdown`, `dropdown-months`, `dropdown-years`, several months and week numbers. The cell grows from 32px to 36px (a default `Button`), which the caption needs for "September" plus a year and which makes one month fit a default `PopoverContent` (`w-72 p-4`).
- **Surface.** Standalone, the calendar draws a card-like surface (`bg-rixl-surface`, `border-rixl-border`, `rounded-md`, `shadow-xs`, `p-3`). Inside `popover-content`, `card-content` or `dialog-content` it draws nothing and has no padding: the container supplies both, as in Kumo's `<Popover.Content className="p-3">`.
- **Cells.** The day button fills the cell. Today is an outline, not a fill. Range start and end are caps on the button over a muted band on the cell. Focus uses the shared `focusRing`. Weekday labels are muted, weeks are 4px apart, `footer` gets a top gap and muted text.
- **Docs.** The Date Picker showcase examples follow Kumo's compositions: standalone, `PopoverContent className="w-auto p-3"`, dropdown caption, two months, and presets with a divider.

**Breaking (visual default).** A `DatePicker` placed in a container that is not one of the three hosts now draws its own border, background and shadow, and one placed in a host loses its `p-3`. No prop or export changes.

## Capabilities

### Modified Capabilities

- `design-system`: `DatePicker` surface and caption layout.

## Non-goals

- No new props, no new preset tokens (the preset is 3.49 of 3.5 kB), no new export.
- No change to selection behaviour, `locale` handling or labels.
- No `fixedWeeks` default: Kumo leaves it off, so the height still follows the number of weeks, and the width does not change.
- No change to the month slide animation.

## Acceptance

- In Chromium, every caption control (previous, next, each dropdown) sits inside the columns of day cells and overlaps no other control, for each `captionLayout`, one and two months, `showWeekNumber` and a long-name locale (`date-picker-layout.browser.test.tsx`).
- A standalone calendar has a border, a `--rixl-surface` background and 12px padding; inside a `Popover` or `Card` it has none of them (`date-picker-surface.test.tsx`, `date-picker-layout.browser.test.tsx`).
- axe reports no WCAG 2.2 AA violation for each of those compositions.
- `vp check`, `vp test --run`, coverage floor, `vp pack`, `vpx publint`, `vpx size-limit` (JS 56.4 of 58 kB, preset 3.49 of 3.5 kB, unchanged) and the docs build pass.
