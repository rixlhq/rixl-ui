import * as React from "react";
import {DayButton, getDefaultClassNames} from "react-day-picker";
import {cn} from "../../lib/cn";
import {Button} from "../button";
import {mergeDatePickerRefs} from "./merge-date-picker-refs";

export type DatePickerDayButtonProps = React.ComponentProps<typeof DayButton>;
const DatePickerDayButton = React.forwardRef<HTMLButtonElement, DatePickerDayButtonProps>(({className, day, modifiers, ...props}, ref) => {
  const defaultClassNames = getDefaultClassNames();

  const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (modifiers.focused && buttonElement) {
      buttonElement.focus();
    }
  }, [modifiers.focused, buttonElement]);

  return (
    <Button
      ref={React.useMemo(() => mergeDatePickerRefs(setButtonElement, ref), [ref])}
      variant="ghost"
      size="icon"
      data-slot="calendar-day-button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "size-(--cell-size) shrink-0 border border-transparent text-sm leading-none font-normal tabular-nums",
        // No background-color: a selection or range change repaints many cells at once, and the band on the cell is not animated, so fading the button would lag behind it.
        "transition-[scale,color,box-shadow,border-color]",
        // Positioned and raised so the focus ring is not covered by the neighbouring cells.
        "focus-visible:relative focus-visible:z-10",
        "[&>span]:text-xs [&>span]:opacity-70",
        "data-[selected-single=true]:bg-rixl-primary data-[selected-single=true]:text-rixl-primary-fg data-[selected-single=true]:hover:bg-rixl-primary-hover",
        "data-[range-start=true]:bg-rixl-primary data-[range-start=true]:text-rixl-primary-fg data-[range-start=true]:hover:bg-rixl-primary-hover",
        "data-[range-end=true]:bg-rixl-primary data-[range-end=true]:text-rixl-primary-fg data-[range-end=true]:hover:bg-rixl-primary-hover",
        // The band is drawn on the cell so it stays continuous; the hover has to be darker than the band to show.
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:hover:bg-rixl-secondary-hover",
        // Today is an outline: a fill is the ghost button's hover colour, and a selected today must not show a halo.
        modifiers.today && !modifiers.selected && "border-rixl-fg-muted font-medium",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
});

DatePickerDayButton.displayName = "DatePickerDayButton";
export {DatePickerDayButton};
