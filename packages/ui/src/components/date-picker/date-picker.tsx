import type {ReactNode} from "react";
import {labelDayButton, type DateRange, type Matcher, type PropsBase} from "react-day-picker";
import {Calendar} from "./calendar";

/**
 * Rixl DatePicker — the bare calendar grid (Kumo parity).
 *
 * Single, multiple and range modes over the styled DayPicker grid.
 * `value`/`onSelect` are the primary names; `selected`/`onChange` are the
 * deprecated Kumo aliases and both fire together when set — `value` wins
 * for display when both are provided. Popover composition stays with the
 * consumer: trigger Button + Popover + DatePicker (see the docs showcase).
 */
type DatePickerBaseProps = {
  /** Months visible in the grid. Defaults to 1. */
  numberOfMonths?: number;
  /** react-day-picker matcher forwarded to the grid. */
  disabled?: Matcher | Matcher[];
  /** Month the grid opens on. */
  defaultMonth?: Date;
  /** Controlled month (pairs with `onMonthChange` for preset navigation). */
  month?: Date;
  onMonthChange?: (month: Date) => void;
  /** Bounds for `captionLayout="dropdown"`. */
  startMonth?: Date;
  endMonth?: Date;
  /** `label` | `dropdown` — dropdown jumps straight to month/year. */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /** Footer rendered below the calendar (usage limits, hints). */
  footer?: ReactNode;
  /** date-fns locale for month and weekday names. */
  locale?: PropsBase["locale"];
  /** Keep a fixed 6-week grid. Pairs with a single month; leave unset for multi-month views. */
  fixedWeeks?: boolean;
  /**
   * Show days outside the month, dimmed. Defaults to true: leading and
   * trailing cells always render (slightly off in color), so the grid never
   * reflows between months with different week coverage.
   */
  showOutsideDays?: boolean;
  /** className for the grid (consumer wins via `cn`). */
  className?: string;
};

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode?: "single";
  value?: Date;
  /** Kumo alias for `value`. Deprecated: prefer `value`. */
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  /** Kumo alias for `onSelect`. Deprecated: prefer `onSelect`. */
  onChange?: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: "range";
  value?: DateRange;
  /** Kumo alias for `value`. Deprecated: prefer `value`. */
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  /** Kumo alias for `onSelect`. Deprecated: prefer `onSelect`. */
  onChange?: (range: DateRange | undefined) => void;
  /** Min/max range length in days. */
  min?: number;
  max?: number;
};

export type DatePickerMultipleProps = DatePickerBaseProps & {
  mode: "multiple";
  value?: Date[];
  /** Kumo alias for `value`. Deprecated: prefer `value`. */
  selected?: Date[];
  onSelect?: (dates: Date[] | undefined) => void;
  /** Kumo alias for `onSelect`. Deprecated: prefer `onSelect`. */
  onChange?: (dates: Date[] | undefined) => void;
  /** Min/max selected days. */
  min?: number;
  max?: number;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps;

/**
 * Day-button naming for the grid. react-day-picker's default
 * `labelDayButton` reads "Monday, June 15th, 2026" while the button shows
 * "15" — axe tokenises both, so "15" is not contained in "15th" and the grid
 * fails WCAG 2.5.3 Label in Name. Prefixing the bare day number keeps the
 * full context for screen readers and the visible label as a name token.
 */
const datePickerLabels: PropsBase["labels"] = {
  // oxlint-disable-next-line max-params -- react-day-picker invokes labels with (date, modifiers, options, dateLib); all four are forwarded below.
  labelDayButton: (date, modifiers, options, dateLib) => `${date.getDate()}, ${labelDayButton(date, modifiers, options, dateLib)}`,
};

function sharedGridProps(picker: DatePickerProps) {
  const numberOfMonths = picker.numberOfMonths ?? 1;
  return {
    numberOfMonths,
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
    labels: datePickerLabels,
    className: picker.className,
  };
}

/**
 * Dual-callback forwarder for `onSelect`/`onChange`. Returns undefined when
 * neither is set so the grid stays uncontrolled — DayPicker drives the
 * display from `selected` only while `onSelect` is defined.
 */
function selectionHandler<T>(primary: ((value: T) => void) | undefined, alias: ((value: T) => void) | undefined) {
  if (primary === undefined && alias === undefined) return undefined;
  return (value: T) => {
    primary?.(value);
    alias?.(value);
  };
}

function DatePicker(props: DatePickerProps) {
  const shared = sharedGridProps(props);
  if (props.mode === "range") {
    const {value, selected, onSelect, onChange, min, max} = props;
    return (
      <Calendar mode="range" {...shared} min={min} max={max} selected={value ?? selected} onSelect={selectionHandler(onSelect, onChange)} />
    );
  }
  if (props.mode === "multiple") {
    const {value, selected, onSelect, onChange, min, max} = props;
    return (
      <Calendar
        mode="multiple"
        {...shared}
        min={min}
        max={max}
        selected={value ?? selected}
        onSelect={selectionHandler(onSelect, onChange)}
      />
    );
  }
  const {value, selected, onSelect, onChange} = props;
  return <Calendar mode="single" {...shared} selected={value ?? selected} onSelect={selectionHandler(onSelect, onChange)} />;
}

export {DatePicker};
export type {DateRange};
