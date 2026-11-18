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
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-rixl-primary data-[selected-single=true]:text-rixl-primary-fg data-[range-middle=true]:bg-rixl-surface-muted data-[range-middle=true]:text-rixl-fg data-[range-start=true]:bg-rixl-primary data-[range-start=true]:text-rixl-primary-fg data-[range-end=true]:bg-rixl-primary data-[range-end=true]:text-rixl-primary-fg group-data-[focused=true]/day:border-rixl-ring group-data-[focused=true]/day:ring-rixl-ring/50 flex size-[calc(var(--cell-size)-6px)] shrink-0 flex-col items-center justify-center gap-1 leading-none font-normal tabular-nums transition-[scale,color,box-shadow,border-color] group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-rixl-md data-[range-end=true]:rounded-e-rixl-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-rixl-md data-[range-start=true]:rounded-s-rixl-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
});

DatePickerDayButton.displayName = "DatePickerDayButton";
export {DatePickerDayButton};
