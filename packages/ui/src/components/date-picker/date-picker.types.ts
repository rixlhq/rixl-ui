import type {ReactNode} from "react";
import type {DateRange, Matcher, PropsBase} from "react-day-picker";

type DatePickerBaseProps = Pick<
  PropsBase,
  "id" | "dir" | "aria-label" | "aria-labelledby" | "classNames" | "components" | "formatters" | "labels" | "autoFocus"
> & {
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
