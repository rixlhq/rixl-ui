import {labelDayButton, type PropsBase} from "react-day-picker";

type DayButtonLabel = typeof labelDayButton;

export const datePickerLabels: PropsBase["labels"] = {
  // Lead with the visible day number so the accessible name contains the visible label (WCAG 2.5.3); the rest comes from the locale.
  // oxlint-disable-next-line max-params -- react-day-picker invokes labels with (date, modifiers, options, dateLib); all four are forwarded below.
  labelDayButton: (date, modifiers, options, dateLib) => {
    // DayPickerLocale types its labels as string | function; a locale's labelDayButton is always the function form.
    const localeLabel = options?.locale?.labels?.labelDayButton as DayButtonLabel | undefined;
    return `${date.getDate()}, ${(localeLabel ?? labelDayButton)(date, modifiers, options, dateLib)}`;
  },
};
