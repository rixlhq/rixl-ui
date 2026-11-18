# Design

## Context

Kumo's DatePicker (https://kumo-ui.com/components/date-picker.md, fetched 2026-11-18) is a bare calendar. Its examples add the padding from outside: `className="p-3"` standalone and `<Popover.Content className="p-3">` in a popover. Our component already differs from that: the root paints `bg-rixl-bg` and `p-3` and turns the background transparent inside a popover or card. Our `PopoverContent` is `w-72 p-4`, so Kumo's composition cannot be copied as is.

Measured on the unchanged component (Chromium, `de` locale, September, `captionLayout="dropdown"`): the day columns are 224px wide and the caption row is wider, which also widens the `w-fit` root, so the previous and next buttons stick out past the columns.

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

### D2. Caption: previous and next flank the caption, and the cell is 36px

**Chosen**: `nav` is `absolute inset-x-0 top-0 flex justify-between`, `pointer-events-none` with `pointer-events-auto` buttons, so the empty middle does not cover the dropdowns. Each button is `--cell-size` square, which centres it over the first and last weekday column. Every `month_caption` is `h-(--cell-size)` with `px-(--cell-size)`, so the caption area is the grid width minus two cells whatever the number of months (180px at 36px cells, 216px with week numbers), and `w-0 min-w-full`, so the caption has no intrinsic width and a long month name cannot widen the calendar (the root is `w-fit`). In `dropdown` layouts the month select is `flex-1` and its label `truncate`s; the year select is `shrink-0`. In `label` layout the caption text is centred and truncates. `--cell-size` goes from `--spacing(8)` to `--spacing(9)`.

Why it fits: the only width that depends on the month name is the month select, and it is the flexible item. The year is four tabular digits, so the previous and next buttons and the year select never move when the month changes, and the month select is the same width for every month. At 32px cells the zone was 160px, and English "September" plus a year with both chevrons needs about 170px (measured: the month label truncated at 106px), so 32px could not fit the most common long name. At 36px the zone is 180px and "September" is not truncated in English or German (`shows the whole month name 'September' …`). A name that is still too long (Greek "Σεπτέμβριος") truncates in the closed select; the native option list shows it in full.

Why 36px is also the right cell: it equals a default `Button` (`size-9`), and seven cells are 252px, which fits a default `PopoverContent` (`w-72 p-4`, 256px inside) with no overrides (`fits the default popover width without padding of its own`).

**Alternatives considered**:

- _Compact dropdowns (h-7, smaller text) at 32px cells._ The arithmetic still fails for "September" plus a year; it only shrinks the overflow.
- _Nav at the end and the caption left-aligned (the previous layout)._ With `numberOfMonths={2}` both buttons sit above the second month. Flanking puts previous above the first month and next above the last.
- _`navLayout="around"` (react-day-picker puts the buttons inside the first and last month)._ The first and last captions would then be narrower than the middle ones, so the month select would change width between months of a multi-month view.
- _Month and year as one combined select._ Not a react-day-picker caption layout; would need a custom `MonthCaption`.

**Dropped**: `NAV_CLEARING` (`pe-[calc(var(--cell-size)*2+0.5rem)]`) and `first:min-w-[9ch]` / `min-w-[5.5ch]` on the dropdown roots: both guessed widths. The `rtl:` chevron rotation is kept as is.

**Implementation notes**: the dropdown wrapper carries the focus ring with `has-focus-visible:` because the native `<select>` inside is a transparent overlay (the shared `focusRing` is `focus-visible:` on the element itself). The month and year roots are told apart with `has-[select[class*=months]]` and `has-[select[class*=years]]`, because an underscore in a Tailwind arbitrary value becomes a space and the class names are `rdp-months_dropdown` and `rdp-years_dropdown`.

**Evidence**: `date-picker-layout.browser.test.tsx` measures every control's `getBoundingClientRect()` against the weekday columns (the month grid itself is `w-full`, so it stretches with an oversized caption, and so does the `w-fit` root: measuring either would pass while the buttons stuck out) for each layout, one and two months (side by side at 1100px, stacked at 414px), week numbers and `de`, `ru`, `el`, `fi` in their longest month. It failed 29 of 41 cases on the unchanged component.

### D3. Cells: the button fills the cell, the band lives on the cell

**Chosen**: the day button is `size-(--cell-size)`; the cell has no fill of its own except in a range. Selected single and range caps are `bg-rixl-primary`; the range middle is `bg-rixl-surface-muted` on the cell so it is continuous (the middle button is transparent and darkens to `secondary-hover` on hover, since the ghost hover colour equals the band); start and end cells carry the same muted band behind a rounded primary cap, so the band runs into the cap. Today is `border-rixl-fg-muted` (an outline) with `font-medium`, applied only when the day is not selected, so a selected today has no halo. Focus is the Button's own `focusRing`, with `relative z-10` on `focus-visible` so the ring is not clipped by its neighbours. The button keeps the transition list without `background-color`: a selection change repaints many cells at once, and the band on the cell is not animated, so a fading button would lag behind it (the existing `paints range and selection backgrounds instantly` test).

**Alternatives considered**: today as a muted fill (the previous look). It is the hover colour of the ghost button, so a hovered day looked like today, and a selected today showed a muted halo around the smaller primary button. Today's outline in `border-rixl-border-strong` (about 1.6:1 against the surface) was too faint for a state that carries meaning; `fg-muted` is the colour already used for secondary text. A dot under the number needs a pseudo-element and a second line of layout in a cell.

**Dropped**: `group-data-[focused=true]/day:` ring classes (a second focus implementation beside the Button's), the `size-[calc(var(--cell-size)-6px)]` button, the `[&:first-child[data-selected=true]_button]` rounding hack, the `today` cell class, and the cell's `opacity-50` on disabled days (the disabled Button already dims itself, so the two compounded to 25%).

**Not done**: rounding the band at the ends of a week row. It would need `:nth-child(1 of [data-day])` because the week number is also a `td`; the band ends square at the row edge, as in shadcn's calendar.

**Evidence**: `date-picker-layout.browser.test.tsx` (`DatePicker cells`: computed colours, borders, box-shadow, adjacency of the band cells).

### D4. Spacing

**Chosen**: caption row `--cell-size`; 8px (`gap-2`) between caption and weekdays; weekday labels `h-8 text-xs font-medium` muted (the weekday is a label, the date is the content); weeks 4px apart (`mt-1`), so a range band reads as one block yet rows stay separate; months 16px apart; `footer` gets `mt-1 pt-2` and `text-xs` muted. Numbers are `tabular-nums`, so digits do not move the grid. Press feedback is the Button's (`--rixl-press-scale`), not a second transition list. The month height still follows the number of weeks (`fixedWeeks` stays Kumo's off); the width does not change between months, and the caption does not move (D2).

**Evidence**: screenshots reviewed by the author in light and dark for single, multiple, range, two months, each caption layout, `de`/`el`, week numbers and footer (not committed); `keeps the footer a gap below the grid`.

### D5. Docs follow Kumo's compositions

**Chosen**: `PopoverContent className="w-auto p-3"` (the default is `w-72 p-4`, wider than the calendar), presets as `p-0` content with a bordered preset column and a `p-3` calendar, as in Kumo's "Date Range with Presets".

## Risks

- A container that is not a known host gets two surfaces (D1 trade-off).
- Visual change for every consumer on upgrade; no prop changes. Marked `!` on the surface commit.
- Ancestor selectors depend on `data-slot` names of `Popover`, `Card` and `Dialog`; `date-picker-layout.browser.test.tsx` renders each, so a rename fails a test.
