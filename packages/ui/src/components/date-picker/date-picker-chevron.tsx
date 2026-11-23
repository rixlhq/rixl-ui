import {forwardRef, type ComponentProps} from "react";
import type {Chevron} from "react-day-picker";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {cn} from "../../lib/cn";
import {rtlFlip} from "../../lib/classes";

export const DatePickerChevron = forwardRef<SVGSVGElement, ComponentProps<typeof Chevron>>(({className, orientation, ...props}, ref) => {
  const Icon = orientation === "left" ? ChevronLeftIcon : orientation === "right" ? ChevronRightIcon : ChevronDownIcon;
  return (
    <Icon
      ref={ref}
      data-slot="calendar-chevron"
      className={cn("size-4", orientation === "left" || orientation === "right" ? rtlFlip : undefined, className)}
      {...props}
    />
  );
});
DatePickerChevron.displayName = "DatePickerChevron";
