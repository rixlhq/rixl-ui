import {forwardRef, type ComponentProps} from "react";
import type {Chevron} from "react-day-picker";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {cn} from "cn";

export const DatePickerChevron = forwardRef<SVGSVGElement, ComponentProps<typeof Chevron>>(({className, orientation, ...props}, ref) => {
  const Icon = orientation === "left" ? ChevronLeftIcon : orientation === "right" ? ChevronRightIcon : ChevronDownIcon;
  return <Icon ref={ref} className={cn("size-4", className)} {...props} />;
});
DatePickerChevron.displayName = "DatePickerChevron";
