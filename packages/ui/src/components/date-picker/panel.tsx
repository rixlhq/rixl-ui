import type {ReactNode} from "react";
import {labelDayButton, type DateRange, type Matcher, type PropsBase} from "react-day-picker";
import {Calendar} from "./calendar";
import type {DatePickerMultipleProps, DatePickerProps, DatePickerRangeProps, DatePickerSingleProps} from "./date-picker";

function formatDay(date: Date): string {
  return date.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
}

function formatDateArrayLabel(dates: Date[], placeholder: string): string {
  if (dates.length === 0) return placeholder;
  if (dates.length === 1) return formatDay(dates[0]);
  return `${dates.length} dates`;
}

function formatDateRangeLabel(range: DateRange, placeholder: string): string {
  if (range.from && range.to) return `${formatDay(range.from)} – ${formatDay(range.to)}`;
  if (range.from) return formatDay(range.from);
  return placeholder;
}

function formatDatePickerLabel(value: Date | DateRange | Date[] | undefined, placeholder: string): string {
  if (value instanceof Date) return formatDay(value);
  if (Array.isArray(value)) return formatDateArrayLabel(value, placeholder);
  if (value) return formatDateRangeLabel(value, placeholder);
  return placeholder;
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * Day-button naming for the panel. react-day-picker's default
 * `labelDayButton` reads "Monday, June 15th, 2026" while the button shows
 * "15" — axe tokenises both, so "15" is not contained in "15th" and the panel
 * fails WCAG 2.5.3 Label in Name. Prefixing the bare day number keeps the
 * full context for screen readers and the visible label as a name token.
 * Scoped to the panel: the bare grid keeps react-day-picker defaults.
 */
const panelLabels: PropsBase["labels"] = {
  // oxlint-disable-next-line max-params -- react-day-picker invokes labels with (date, modifiers, options, dateLib); all four are forwarded below.
  labelDayButton: (date, modifiers, options, dateLib) => `${date.getDate()}, ${labelDayButton(date, modifiers, options, dateLib)}`,
};

type PanelSharedProps = {
  numberOfMonths: number;
  disabled?: Matcher | Matcher[];
  defaultMonth?: Date;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  startMonth?: Date;
  endMonth?: Date;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  footer?: ReactNode;
  locale?: PropsBase["locale"];
  fixedWeeks?: boolean;
  showOutsideDays?: boolean;
  labels: PropsBase["labels"];
  className?: string;
};

function panelSharedProps(picker: DatePickerProps): PanelSharedProps {
  const {
    numberOfMonths = 1,
    disabled,
    defaultMonth,
    month,
    onMonthChange,
    startMonth,
    endMonth,
    captionLayout,
    footer,
    locale,
    fixedWeeks,
    showOutsideDays,
    calendarClassName,
  } = picker;
  return {
    numberOfMonths,
    disabled,
    defaultMonth,
    month,
    onMonthChange,
    startMonth,
    endMonth,
    captionLayout,
    footer,
    locale,
    fixedWeeks,
    // Kumo parity: outside days duplicate across panels, so multi-month
    // views hide them unless the consumer opts back in.
    showOutsideDays: showOutsideDays ?? numberOfMonths === 1,
    labels: panelLabels,
    className: calendarClassName,
  };
}

function SingleDatePanel({picker, shared, onCommit}: {picker: DatePickerSingleProps; shared: PanelSharedProps; onCommit: () => void}) {
  return (
    <Calendar
      mode="single"
      {...shared}
      selected={picker.value ?? picker.selected}
      onSelect={(date) => {
        picker.onSelect?.(date);
        picker.onChange?.(date);
        if (date) {
          picker.onApply?.(date);
          onCommit();
        }
      }}
    />
  );
}

function MultipleDatePanel({picker, shared}: {picker: DatePickerMultipleProps; shared: PanelSharedProps}) {
  return (
    <Calendar
      mode="multiple"
      {...shared}
      min={picker.min}
      max={picker.max}
      selected={picker.value ?? picker.selected}
      onSelect={(dates) => {
        picker.onSelect?.(dates);
        picker.onChange?.(dates);
      }}
    />
  );
}

function RangeDatePanel({picker, shared, onCommit}: {picker: DatePickerRangeProps; shared: PanelSharedProps; onCommit: () => void}) {
  return (
    <Calendar
      mode="range"
      {...shared}
      min={picker.min}
      max={picker.max}
      selected={picker.value ?? picker.selected}
      onSelect={(range) => {
        picker.onSelect?.(range);
        picker.onChange?.(range);
        if (range?.from && range?.to && !isSameCalendarDay(range.from, range.to)) {
          picker.onApply?.(range);
          onCommit();
        }
      }}
    />
  );
}

function DatePickerPanel({picker, onCommit}: {picker: DatePickerProps; onCommit: () => void}) {
  const shared = panelSharedProps(picker);
  if (picker.mode === "range") {
    return <RangeDatePanel picker={picker} shared={shared} onCommit={onCommit} />;
  }
  if (picker.mode === "multiple") {
    return <MultipleDatePanel picker={picker} shared={shared} />;
  }
  return <SingleDatePanel picker={picker} shared={shared} onCommit={onCommit} />;
}

export {DatePickerPanel, formatDatePickerLabel};
