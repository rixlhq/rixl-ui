import * as React from "react";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {DayButton, DayPicker, getDefaultClassNames} from "react-day-picker";

import {cn} from "cn";
import {Button, buttonVariants} from "../button";

/**
 * Rixl Calendar — date grid built on react-day-picker v9.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
type CalendarClassNames = ReturnType<typeof getDefaultClassNames>;
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];
type CaptionLayout = React.ComponentProps<typeof DayPicker>["captionLayout"];

/**
 * Month-switch motion gate (animate skill sequence): navigating months is
 * tens-of-times-per-day, so the budget is one short directional slide —
 * implemented with DayPicker's native snapshot cross-slide (`animate`), the
 * same mechanism Kumo uses: the old weeks slide out while the new weeks
 * slide in, captions crossfade, direction-aware with RTL mirroring from the
 * framework. Keyframes below ride on `--rixl-motion-slow` +
 * `--ease-rixl-out` and are fully disabled under reduced motion. No WAAPI,
 * no remount-by-key (it would drop keyboard focus and skip the first
 * navigation — the native snapshot handles the first click like the rest).
 * The framework itself skips the slide while a day holds focus, so keyboard
 * month navigation stays instant for free.
 */

/**
 * End padding keeping captions clear of the grouped nav cluster: two
 * cell-sized buttons plus their gap, with a little breathing room.
 */
const NAV_CLEARING = "pe-[calc(var(--cell-size)*2+0.5rem)]";

function captionClassNames(defaultClassNames: CalendarClassNames, buttonVariant: ButtonVariant, captionLayout: CaptionLayout) {
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

function animationClassNames() {
  // Single tokens only: DayPicker applies these via classList.add, which
  // throws on whitespace-joined strings — so no cn() merge with rdp
  // defaults here (our keyframes carry the full motion).
  return {
    weeks_before_enter: "rixl-anim-weeks-before-enter",
    weeks_before_exit: "rixl-anim-weeks-before-exit",
    weeks_after_enter: "rixl-anim-weeks-after-enter",
    weeks_after_exit: "rixl-anim-weeks-after-exit",
    caption_before_enter: "rixl-anim-caption-enter",
    caption_before_exit: "rixl-anim-caption-exit",
    caption_after_enter: "rixl-anim-caption-enter",
    caption_after_exit: "rixl-anim-caption-exit",
  };
}

function gridClassNames(defaultClassNames: CalendarClassNames) {
  return {
    month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
    weekdays: cn("flex", defaultClassNames.weekdays),
    weekday: cn(
      "text-rixl-fg-muted rounded-rixl-md flex w-(--cell-size) shrink-0 items-center justify-center font-normal text-[0.8rem] tabular-nums select-none",
      defaultClassNames.weekday
    ),
    week: cn("flex w-full mt-2", defaultClassNames.week),
    week_number_header: cn("select-none w-(--cell-size) shrink-0", defaultClassNames.week_number_header),
    week_number: cn("text-[0.8rem] tabular-nums select-none text-rixl-fg-muted", defaultClassNames.week_number),
    day: cn(
      "relative size-(--cell-size) shrink-0 p-0 text-center tabular-nums [&:first-child[data-selected=true]_button]:rounded-s-rixl-md [&:last-child[data-selected=true]_button]:rounded-e-rixl-md group/day select-none",
      defaultClassNames.day
    ),
    range_start: cn("rounded-s-rixl-md bg-rixl-surface-muted", defaultClassNames.range_start),
    range_middle: cn("rounded-none", defaultClassNames.range_middle),
    range_end: cn("rounded-e-rixl-md bg-rixl-surface-muted", defaultClassNames.range_end),
    today: cn("bg-rixl-surface-muted text-rixl-fg rounded-rixl-md data-[selected=true]:rounded-none", defaultClassNames.today),
    outside: cn("text-rixl-fg-muted aria-selected:text-rixl-fg-muted", defaultClassNames.outside),
    disabled: cn("text-rixl-fg-muted opacity-50", defaultClassNames.disabled),
    hidden: cn("invisible", defaultClassNames.hidden),
  };
}

const calendarComponents: React.ComponentProps<typeof DayPicker>["components"] = {
  Root({className, rootRef, ...props}) {
    return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
  },
  Chevron({className, orientation, ...props}) {
    if (orientation === "left") {
      return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
    }

    if (orientation === "right") {
      return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
    }

    return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
  },
  DayButton: CalendarDayButton,
  WeekNumber({children, ...props}) {
    return (
      <td {...props}>
        <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
      </td>
    );
  },
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      animate
      className={cn(
        "bg-rixl-bg group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        "rtl:**:[.rdp-button\\_next>svg]:rotate-180",
        "rtl:**:[.rdp-button\\_previous>svg]:rotate-180",
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown(date) {
          return date.toLocaleString("default", {month: "long"});
        },
        ...formatters,
      }}
      classNames={{
        ...captionClassNames(defaultClassNames, buttonVariant, captionLayout),
        ...gridClassNames(defaultClassNames),
        ...animationClassNames(),
        ...classNames,
      }}
      components={{
        ...calendarComponents,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({className, day, modifiers, ...props}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (modifiers.focused && buttonElement) {
      buttonElement.focus();
    }
  }, [modifiers.focused, buttonElement]);

  return (
    <Button
      ref={setButtonElement}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-rixl-primary data-[selected-single=true]:text-rixl-primary-fg data-[range-middle=true]:bg-rixl-surface-muted data-[range-middle=true]:text-rixl-fg data-[range-start=true]:bg-rixl-primary data-[range-start=true]:text-rixl-primary-fg data-[range-end=true]:bg-rixl-primary data-[range-end=true]:text-rixl-primary-fg group-data-[focused=true]/day:border-rixl-ring group-data-[focused=true]/day:ring-rixl-ring/50 flex size-(--cell-size) shrink-0 flex-col items-center justify-center gap-1 leading-none font-normal tabular-nums group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-rixl-md data-[range-end=true]:rounded-e-rixl-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-rixl-md data-[range-start=true]:rounded-s-rixl-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};
export type CalendarDayButtonProps = React.ComponentProps<typeof DayButton>;

export {Calendar, CalendarDayButton};
