# Design

## Context

Kumo's DatePicker (https://kumo-ui.com/components/date-picker.md, fetched 2026-11-18) is a bare calendar. Its examples add the padding from outside: `className="p-3"` standalone and `<Popover.Content className="p-3">` in a popover. Our component already differs from that: the root paints `bg-rixl-bg` and `p-3` and turns the background transparent inside a popover or card. Our `PopoverContent` is `w-72 p-4`, so Kumo's composition cannot be copied as is.

Measured on the unchanged component (Chromium, `de` locale, September, `captionLayout="dropdown"`): the grid is 224px wide and the caption row is wider, with the previous and next buttons outside the grid.

## Decisions

### D1. Surface: standalone draws one, hosts draw it for us

**Chosen**: the root carries `bg-rixl-surface border border-rixl-border rounded-rixl-md shadow-rixl-xs p-3` by default. Under `popover-content`, `card-content` or `dialog-content` it resets to no border, transparent background, no shadow, `rounded-none` and `p-0` through ancestor variants (`[[data-slot=popover-content]_&]:…`, the mechanism the component already used for the background). The container owns surface and padding there, which is what Kumo's `Popover.Content className="p-3"` does. A standalone consumer `className` overrides the defaults normally (`cn`, last write wins).

Why these tokens: `popupSurface` (`lib/classes.ts`) is `bg-rixl-surface`, `border-rixl-border`, `rounded-rixl-md`, `shadow-rixl-md`. The calendar is inline, not floating, so it takes the same surface, border and radius with the `xs` shadow that `Input` and `Button` use. `Card` is `rounded-rixl-xl` with `py-6`, which is too soft and too airy around a 224px grid of `rounded-rixl-md` cells (the inner radius should be the cell radius plus the padding gap, not smaller than it).

**Alternatives considered**:

- _Bare, Kumo style (no surface, no padding anywhere)._ Matches Kumo's DOM exactly but is the state the owner called unfinished: a standalone calendar has no edge. Every consumer would have to rebuild a surface.
- _Always a surface, even in hosts._ A bordered card inside a popover is a double surface.
- _Padding kept inside hosts (`p-3` always) with only the background reset._ This is the current state and stacks with the popover's `p-4`.
- _An opt-in prop (`bare`, `variant`)._ It adds API Kumo does not have and every popover use would need it.
- _`not-[…]` variants for the standalone surface, so hosts need no reset._ `:not(:is(…))` raises specificity, which would beat a consumer's `className="border-0"`. The reset form raises specificity only inside a host, where the consumer is not styling the surface.

**Dropped**: `bg-rixl-bg` (`oklch(0.99 0.002 264)` against a `oklch(1 0 0)` surface and a page that is usually `--rixl-bg` too), which is why the calendar looked surface-less.

**Trade-off**: a container that is not one of the three hosts (a consumer's own panel) gets a double surface and passes `className="border-0 bg-transparent p-0 shadow-none"`. Detection by `data-slot` is a known limit of ancestor selectors; the hosts are the three components this package ships that draw a surface.

**Evidence**: `date-picker-surface.test.tsx` (classes), `date-picker-layout.browser.test.tsx` (computed border, background, padding standalone and in `Popover`, `Card` and `Dialog`).

### D2. Caption: previous and next flank the caption

**Chosen**: `nav` is `absolute inset-x-0 top-0 flex justify-between`, `pointer-events-none` with `pointer-events-auto` buttons, so the empty middle does not cover the dropdowns. Each button is `--cell-size` square, which centres it over the first and last weekday column. Every `month_caption` is `h-(--cell-size)` with `px-(--cell-size)`, so the caption area is the grid width minus two cells (160px at 32px cells, 192px with week numbers) whatever the number of months. In `dropdown` layouts the `dropdowns` row is `flex min-w-0 flex-1 gap-1`: the month select is `min-w-0 flex-1` and its label `truncate`s; the year select is `shrink-0`. In `label` layout the caption text is centred and truncates.

Why it fits for any locale: the only width that depends on the month name is the month select, and it is the flexible item. The year is four tabular digits, so the previous and next buttons and the year select never move when the month changes, and the month select's box is the same width for every month. The worst case is a name too long for about 98px (Greek "Σεπτέμβριος" at `text-sm`), which truncates in the closed select; the native option list shows the full name.

**Alternatives considered**:

- _Compact dropdowns (h-7, smaller text), nav still at the end._ The arithmetic still fails: month ≥ 9ch + year ≥ 5.5ch + two chevrons + nav clearing exceeds 224px for long names, so it only moves the overflow.
- _Raise `--cell-size` to 36px._ 252px grid. It fits "September" but not Greek or Finnish plus a year, makes the calendar larger than its siblings (Select, Input are 32 to 40px tall), and does not fix the structure.
- _Nav at the end and the caption left-aligned (the previous layout)._ With `numberOfMonths={2}` both buttons sit above the second month. Flanking puts previous above the first month and next above the last.
- _Month and year as one combined select._ Not a react-day-picker caption layout; would need a custom `MonthCaption`.

**Dropped**: `NAV_CLEARING` (`pe-[calc(var(--cell-size)*2+0.5rem)]`) and `first:min-w-[9ch]` / `min-w-[5.5ch]` on the dropdown roots: both guessed widths. `rtl:` chevron rotation is kept as is.

**Evidence**: `date-picker-layout.browser.test.tsx` measures every control's `getBoundingClientRect()` against the root's, for each layout, one and two months, week numbers and `de`, `ru` and `el` locales.

### D3. Cells: the button fills the cell, the band lives on the cell

**Chosen**: the day button is `size-(--cell-size)`; the cell has no fill of its own except in a range. Selected single and range caps are `bg-rixl-primary`; the range middle is `bg-rixl-surface-muted` on the cell so it is continuous; start and end cells carry the same muted band behind a rounded primary cap. Today is `border-rixl-border-strong` (an outline), applied only when the day is not selected, so a selected today has no halo. Focus is `focusRing` through the Button's own `focus-visible`, with `relative z-10` on focus so the ring is not clipped by its neighbours.

**Alternatives considered**: today as a muted fill (the previous look). It is the hover colour of the ghost button, so a hovered day looked like today and a selected today showed a muted halo around the smaller primary button. A dot under the number would need a pseudo-element and a second line of layout in a 32px cell.

**Dropped**: `group-data-[focused=true]/day:` ring classes (a second focus implementation next to the Button's), the `size-[calc(var(--cell-size)-6px)]` button, and the `[&:first-child[data-selected=true]_button]` rounding hack.

**Evidence**: `date-picker-layout.browser.test.tsx` (computed colours and box-shadow).

### D4. Spacing

**Chosen**: caption row `--cell-size`; 8px (`gap-2`) between caption and weekdays; weekday labels `text-xs` muted (the weekday is a label, the date is the content); weeks 4px apart (`mt-1`), so a range band reads as one block yet rows stay separate; months 16px apart; `footer` gets `mt-1 pt-2` and `text-xs` muted. Numbers are `tabular-nums`, so digits do not move the grid. Press feedback is the Button's (`--rixl-press-scale`), not a second transition list.

**Evidence**: screenshots reviewed by the author for single, range, dropdown, week numbers and footer (not committed).

### D5. Docs follow Kumo's compositions

**Chosen**: `PopoverContent className="w-auto p-3"` (the default is `w-72 p-4`, wider than the calendar), presets as `p-0` content with a bordered preset column and a `p-3` calendar, as in Kumo's "Date Range with Presets".

## Risks

- A container that is not a known host gets two surfaces (D1 trade-off).
- Visual change for every consumer on upgrade; no prop changes. Marked `!` on the surface commit.
- Ancestor selectors depend on `data-slot` names of `Popover`, `Card` and `Dialog`; `date-picker-layout.browser.test.tsx` renders each, so a rename fails a test.
