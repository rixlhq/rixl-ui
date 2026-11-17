import {labelDayButton, type PropsBase} from "react-day-picker";

export const datePickerLabels: PropsBase["labels"] = {
  // oxlint-disable-next-line max-params -- react-day-picker invokes labels with (date, modifiers, options, dateLib); all four are forwarded below.
  labelDayButton: (date, modifiers, options, dateLib) => `${date.getDate()}, ${labelDayButton(date, modifiers, options, dateLib)}`,
};
