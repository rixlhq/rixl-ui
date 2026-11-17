import type {DatePickerProps} from "./date-picker.types";
import {datePickerLabels} from "./date-picker-labels";

export function sharedGridProps(picker: DatePickerProps) {
  const numberOfMonths = picker.numberOfMonths ?? 1;
  return {
    numberOfMonths,
    id: picker.id,
    dir: picker.dir,
    "aria-label": picker["aria-label"],
    "aria-labelledby": picker["aria-labelledby"],
    classNames: picker.classNames,
    components: picker.components,
    formatters: picker.formatters,
    autoFocus: picker.autoFocus,
    disabled: picker.disabled,
    defaultMonth: picker.defaultMonth,
    month: picker.month,
    onMonthChange: picker.onMonthChange,
    startMonth: picker.startMonth,
    endMonth: picker.endMonth,
    captionLayout: picker.captionLayout,
    footer: picker.footer,
    locale: picker.locale,
    fixedWeeks: picker.fixedWeeks,
    showOutsideDays: picker.showOutsideDays ?? true,
    labels: {...datePickerLabels, ...picker.labels},
    className: picker.className,
  };
}
