import type {ComponentProps} from "react";
import {getDefaultClassNames, type DayPicker} from "react-day-picker";
import {cn} from "../../lib/cn";
import {Button, buttonVariants} from "../button";

type CalendarClassNames = ReturnType<typeof getDefaultClassNames>;
type ButtonVariant = ComponentProps<typeof Button>["variant"];
type CaptionLayout = ComponentProps<typeof DayPicker>["captionLayout"];

const NAV_CLEARING = "pe-[calc(var(--cell-size)*2+0.5rem)]";

export function captionClassNames(defaultClassNames: CalendarClassNames, buttonVariant: ButtonVariant, captionLayout: CaptionLayout) {
  return {
    root: cn("w-fit", defaultClassNames.root),
    months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
    month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
    nav: cn("absolute end-0 top-0 flex items-center gap-1", defaultClassNames.nav),
    button_previous: cn(
      buttonVariants({variant: buttonVariant}),
      "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
      defaultClassNames.button_previous
    ),
    button_next: cn(
      buttonVariants({variant: buttonVariant}),
      "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
      defaultClassNames.button_next
    ),
    month_caption: cn(`flex h-(--cell-size) w-full items-center justify-start ${NAV_CLEARING}`, defaultClassNames.month_caption),
    dropdowns: cn(
      `flex h-(--cell-size) w-full items-center justify-start gap-1.5 ${NAV_CLEARING} text-sm font-medium`,
      defaultClassNames.dropdowns
    ),
    dropdown_root: cn(
      "relative has-focus:border-rixl-ring border border-rixl-border shadow-rixl-xs has-focus:ring-rixl-ring/50 has-focus:ring-[3px] rounded-rixl-md",
      "min-w-[5.5ch] first:min-w-[9ch] justify-center",
      defaultClassNames.dropdown_root
    ),
    dropdown: cn("absolute bg-rixl-surface inset-0 opacity-0", defaultClassNames.dropdown),
    caption_label: cn(
      "select-none font-medium",
      captionLayout === "label"
        ? "text-sm"
        : "rounded-rixl-md ps-2 pe-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-rixl-fg-muted [&>svg]:size-3.5",
      defaultClassNames.caption_label
    ),
  };
}
