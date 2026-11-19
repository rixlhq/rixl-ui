import {forwardRef, type ComponentProps} from "react";
import type {WeekNumber} from "react-day-picker";

export const DatePickerWeekNumber = forwardRef<HTMLTableCellElement, ComponentProps<typeof WeekNumber>>(({children, ...props}, ref) => (
  <td data-slot="calendar-week-number" {...props} ref={ref}>
    <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
  </td>
));
DatePickerWeekNumber.displayName = "DatePickerWeekNumber";
