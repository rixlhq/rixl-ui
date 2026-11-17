import type {ComponentProps} from "react";
import type {DayPicker} from "react-day-picker";
import {DatePickerRoot} from "./date-picker-root";
import {DatePickerDayButton} from "./date-picker-day-button";
import {DatePickerChevron} from "./date-picker-chevron";
import {DatePickerWeekNumber} from "./date-picker-week-number";

export const datePickerComponents = {
  Root: DatePickerRoot,
  DayButton: DatePickerDayButton,
  Chevron: DatePickerChevron,
  WeekNumber: DatePickerWeekNumber,
} as ComponentProps<typeof DayPicker>["components"];
