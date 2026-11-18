import type {ComponentProps} from "react";
import {getDefaultClassNames, type DayPicker} from "react-day-picker";
import {cn} from "../../lib/cn";
import {buttonVariants} from "../button";

type CalendarClassNames = ReturnType<typeof getDefaultClassNames>;
type CaptionLayout = ComponentProps<typeof DayPicker>["captionLayout"];

/**
 * `nav` spans the whole calendar but its empty middle must not cover the caption, so only the buttons take
 * pointer events. Each button is one `--cell-size` square above the first or last column.
 */
const NAV_BUTTON = "size-(--cell-size) pointer-events-auto p-0 select-none aria-disabled:opacity-50";

/**
 * The caption leaves a cell on each side for the nav buttons. `w-0 min-w-full` gives it no intrinsic width, so a
 * long month name cannot widen the calendar (the root is `w-fit`); it truncates instead.
 */
const CAPTION_ROW = "flex h-(--cell-size) w-0 min-w-full items-center justify-center px-(--cell-size) text-sm font-medium";

/** A static month or year next to a dropdown, in `dropdown-months` and `dropdown-years`; matches a dropdown's inner padding. */
const STATIC_PART =
  "[&>span:not([class],[role])]:min-w-0 [&>span:not([class],[role])]:truncate [&>span:not([class],[role])]:px-2 [&>span:not([class],[role])]:select-none";

export function captionClassNames(defaultClassNames: CalendarClassNames, captionLayout: CaptionLayout) {
  return {
    root: cn("w-fit", defaultClassNames.root),
    months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
    month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
    nav: cn("pointer-events-none absolute inset-x-0 top-0 flex h-(--cell-size) items-center justify-between", defaultClassNames.nav),
    button_previous: cn(buttonVariants({variant: "ghost"}), NAV_BUTTON, defaultClassNames.button_previous),
    button_next: cn(buttonVariants({variant: "ghost"}), NAV_BUTTON, defaultClassNames.button_next),
    month_caption: cn(CAPTION_ROW, defaultClassNames.month_caption),
    // The month select takes the width the year select leaves, so a longer month name never moves the year or the nav buttons.
    dropdowns: cn("flex h-(--cell-size) min-w-0 flex-1 items-center justify-center gap-1", STATIC_PART, defaultClassNames.dropdowns),
    dropdown_root: cn(
      "relative flex h-8 min-w-0 items-center rounded-rixl-md border border-rixl-border shadow-rixl-xs",
      "transition-[box-shadow,border-color] duration-rixl-fast ease-rixl-out hover:border-rixl-border-strong",
      // The select is a transparent overlay, so the focus ring belongs to the visible wrapper.
      "has-focus-visible:border-rixl-ring has-focus-visible:ring-rixl-ring/50 has-focus-visible:ring-[3px]",
      "has-[select[class*=months]]:flex-1 has-[select[class*=years]]:shrink-0",
      defaultClassNames.dropdown_root
    ),
    dropdown: cn("absolute inset-0 cursor-pointer opacity-0", defaultClassNames.dropdown),
    caption_label: cn(
      "select-none truncate",
      captionLayout === "label"
        ? "min-w-0"
        : "relative block h-full min-w-0 flex-1 ps-2 pe-5 leading-[calc(var(--spacing)*8-2px)] [&>svg]:pointer-events-none [&>svg]:absolute [&>svg]:end-1 [&>svg]:top-1/2 [&>svg]:size-3.5 [&>svg]:-translate-y-1/2 [&>svg]:text-rixl-fg-muted",
      defaultClassNames.caption_label
    ),
  };
}
