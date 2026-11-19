import {forwardRef, type ComponentProps} from "react";
import type {DayPicker} from "react-day-picker";
import {DatePickerGrid} from "./date-picker-grid";
import type {DatePickerProps} from "./date-picker.types";

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({onChange, ...props}, ref) => {
  // as: DayPicker's props are a union keyed on `mode`; once `onChange` is
  // renamed to `onSelect` the compiler can't pair each `mode` with its
  // `selected` and `onSelect` again, though every DatePickerProps variant has
  // exactly one matching DayPicker variant.
  const dayPickerProps = {...props, onSelect: onChange} as ComponentProps<typeof DayPicker>;
  return <DatePickerGrid ref={ref} {...dayPickerProps} />;
});
DatePicker.displayName = "DatePicker";
export {DatePicker};
export type {DatePickerProps, DatePickerSingleProps, DatePickerRangeProps, DatePickerMultipleProps} from "./date-picker.types";
export type {DateRange} from "react-day-picker";
