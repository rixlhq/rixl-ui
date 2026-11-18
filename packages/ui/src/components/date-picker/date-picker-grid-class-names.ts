import {getDefaultClassNames} from "react-day-picker";
import {cn} from "../../lib/cn";
type CalendarClassNames = ReturnType<typeof getDefaultClassNames>;

export function gridClassNames(defaultClassNames: CalendarClassNames) {
  return {
    month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
    weekdays: cn("flex", defaultClassNames.weekdays),
    weekday: cn(
      "text-rixl-fg rounded-rixl-md flex w-(--cell-size) shrink-0 items-center justify-center font-normal text-[0.8rem] tabular-nums select-none",
      defaultClassNames.weekday
    ),
    week: cn("flex w-full mt-2", defaultClassNames.week),
    week_number_header: cn("select-none w-(--cell-size) shrink-0", defaultClassNames.week_number_header),
    week_number: cn("text-[0.8rem] tabular-nums select-none text-rixl-fg-muted", defaultClassNames.week_number),
    day: cn(
      "relative flex size-(--cell-size) shrink-0 items-center justify-center p-0 text-center tabular-nums [&:first-child[data-selected=true]_button]:rounded-s-rixl-md [&:last-child[data-selected=true]_button]:rounded-e-rixl-md group/day select-none",
      defaultClassNames.day
    ),
    range_start: cn("rounded-s-rixl-md bg-rixl-primary", defaultClassNames.range_start),
    range_middle: cn("rounded-none bg-rixl-surface-muted", defaultClassNames.range_middle),
    range_end: cn("rounded-e-rixl-md bg-rixl-primary", defaultClassNames.range_end),
    today: cn("bg-rixl-surface-muted text-rixl-fg rounded-rixl-md data-[selected=true]:rounded-none", defaultClassNames.today),
    outside: cn("text-rixl-fg-muted aria-selected:text-rixl-fg-muted", defaultClassNames.outside),
    disabled: cn("text-rixl-fg-muted opacity-50", defaultClassNames.disabled),
    hidden: cn("invisible", defaultClassNames.hidden),
  };
}
