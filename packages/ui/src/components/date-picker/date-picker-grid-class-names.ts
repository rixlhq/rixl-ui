import {getDefaultClassNames} from "react-day-picker";
import {cn} from "../../lib/cn";
type CalendarClassNames = ReturnType<typeof getDefaultClassNames>;

export function gridClassNames(defaultClassNames: CalendarClassNames) {
  return {
    month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
    weekdays: cn("flex", defaultClassNames.weekdays),
    weekday: cn(
      "flex h-8 w-(--cell-size) shrink-0 items-center justify-center text-xs font-medium text-rixl-fg-muted select-none",
      defaultClassNames.weekday
    ),
    week: cn("mt-1 flex w-full", defaultClassNames.week),
    week_number_header: cn("w-(--cell-size) shrink-0 select-none", defaultClassNames.week_number_header),
    week_number: cn("text-xs text-rixl-fg-muted tabular-nums select-none", defaultClassNames.week_number),
    day: cn(
      "group/day relative flex size-(--cell-size) shrink-0 items-center justify-center p-0 text-center tabular-nums select-none",
      defaultClassNames.day
    ),
    // The band is the cell's background; each end cell carries it behind a rounded primary cap, so the band runs into the cap.
    range_start: cn("rounded-s-md bg-rixl-surface-muted", defaultClassNames.range_start),
    range_middle: cn("rounded-none bg-rixl-surface-muted", defaultClassNames.range_middle),
    range_end: cn("rounded-e-md bg-rixl-surface-muted", defaultClassNames.range_end),
    outside: cn("text-rixl-fg-muted aria-selected:text-rixl-fg-muted", defaultClassNames.outside),
    disabled: cn("text-rixl-fg-muted", defaultClassNames.disabled),
    hidden: cn("invisible", defaultClassNames.hidden),
    // `w-0 min-w-full`, as on the caption: the footer takes the grid's width and wraps, so long text cannot widen the `w-fit` root.
    footer: cn("mt-1 w-0 min-w-full pt-2 text-xs text-pretty text-rixl-fg-muted", defaultClassNames.footer),
  };
}
