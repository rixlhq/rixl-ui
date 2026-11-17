export {
  DatePicker,
  type DatePickerMultipleProps,
  type DatePickerProps,
  type DatePickerRangeProps,
  type DatePickerSingleProps,
  type DateRange,
} from "./date-picker";
/**
 * @deprecated Use `DatePicker` instead — same component reference, no fork.
 * Kept so the `@rixl/ui/calendar` entry and older imports keep working.
 */
export {DatePicker as DatePickerCalendar} from "./date-picker";
/** @deprecated Use `DatePickerProps` instead. */
export type DatePickerCalendarProps = import("./date-picker").DatePickerProps;
export {
  CalendarDayButton as DatePickerCalendarDayButton,
  type CalendarDayButtonProps as DatePickerCalendarDayButtonProps,
} from "./calendar";
