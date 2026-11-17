import {useCallback, useState, type ReactNode} from "react";
import {CalendarIcon} from "lucide-react";
import {labelDayButton, type DateRange, type Matcher, type PropsBase} from "react-day-picker";
import {cn} from "cn";
import {Button} from "../button/button";
import {Calendar} from "../calendar/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "../popover/popover";

/**
 * Rixl DatePicker — a date trigger over the base Calendar, in a Popover.
 *
 * Settings on the existing Calendar, not a block: the trigger (outline
 * Button + calendar glyph + label slot) and the panel (Calendar in
 * `mode="single" | "multiple" | "range"`) live here. Presets, custom footers and
 * Apply buttons stay with the consumer — dashboard keeps its
 * `PresetsPanel`/`CustomRangeFooter` and composes them around this.
 *
 * The panel inherits the Popover motion language: origin-aware
 * `origin-(--transform-origin)`, transform/opacity only, `duration-rixl-base`
 * (180ms) `ease-rixl-out`, snapped under reduced motion.
 *
 * Single mode closes on pick; range mode stays open until two distinct days
 * are set — a first click yields a same-day range react-day-picker reports as
 * complete, so closing on any complete range would make multi-day ranges
 * unreachable. `onSelect` fires on every day click, `onApply` only on the
 * commit that closes the panel.
 */
type DatePickerBaseProps = {
  /** Placeholder label while nothing is selected. Defaults per mode. */
  placeholder?: string;
  /** Custom label slot — rendered in the trigger instead of the formatted date. */
  children?: ReactNode;
  /** Months visible in the panel. Defaults to 1. */
  numberOfMonths?: number;
  /** react-day-picker matcher forwarded to the Calendar. */
  disabled?: Matcher | Matcher[];
  /** Month the Calendar opens on. */
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
  /** Keep a fixed 6-week grid. */
  fixedWeeks?: boolean;
  /** Show days outside the month. */
  showOutsideDays?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Panel alignment to the trigger. Defaults to start. */
  align?: "start" | "center" | "end";
  /** Panel side. Defaults to bottom. */
  side?: "top" | "right" | "bottom" | "left";
  /** Disables the trigger button. Unrelated to the `disabled` day matcher. */
  triggerDisabled?: boolean;
  /** className for the trigger Button (consumer wins via `cn`). */
  triggerClassName?: string;
  /** className for the PopoverContent panel (consumer wins via `cn`). */
  contentClassName?: string;
  /** className for the Calendar (consumer wins via `cn`). */
  calendarClassName?: string;
};

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode?: "single";
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
  onApply?: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: "range";
  value?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  onApply?: (range: DateRange | undefined) => void;
  /** Min/max range length in days. */
  min?: number;
  max?: number;
};

export type DatePickerMultipleProps = DatePickerBaseProps & {
  mode: "multiple";
  value?: Date[];
  onSelect?: (dates: Date[] | undefined) => void;
  onApply?: (dates: Date[] | undefined) => void;
  /** Min/max selected days. */
  min?: number;
  max?: number;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps;

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

function resolveDatePickerPlaceholder(mode: DatePickerProps["mode"], placeholder: string | undefined): string {
  if (placeholder) return placeholder;
  if (mode === "range") return "Pick a date range";
  if (mode === "multiple") return "Pick dates";
  return "Pick a date";
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function useDatePickerOpen(
  open: boolean | undefined,
  defaultOpen: boolean | undefined,
  onOpenChange: ((open: boolean) => void) | undefined
): [boolean, (open: boolean) => void] {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return [isControlled ? open : internalOpen, setOpen];
}

/**
 * Day-button naming for the panel. react-day-picker's default
 * `labelDayButton` reads "Monday, June 15th, 2026" while the button shows
 * "15" — axe tokenises both, so "15" is not contained in "15th" and the panel
 * fails WCAG 2.5.3 Label in Name. Prefixing the bare day number keeps the
 * full context for screen readers and the visible label as a name token.
 * Scoped to the panel: the shared Calendar keeps react-day-picker defaults.
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
    fixedWeeks,
    showOutsideDays,
    labels: panelLabels,
    className: calendarClassName,
  };
}

function SingleDatePanel({picker, shared, onCommit}: {picker: DatePickerSingleProps; shared: PanelSharedProps; onCommit: () => void}) {
  return (
    <Calendar
      mode="single"
      {...shared}
      selected={picker.value}
      onSelect={(date) => {
        picker.onSelect?.(date);
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
      selected={picker.value}
      onSelect={(dates) => {
        picker.onSelect?.(dates);
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
      selected={picker.value}
      onSelect={(range) => {
        picker.onSelect?.(range);
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

function DatePicker(props: DatePickerProps) {
  const {placeholder, align = "start", side = "bottom", triggerClassName, contentClassName, triggerDisabled, children} = props;
  const [isOpen, setOpen] = useDatePickerOpen(props.open, props.defaultOpen, props.onOpenChange);
  const resolvedPlaceholder = resolveDatePickerPlaceholder(props.mode, placeholder);
  const label = children ?? formatDatePickerLabel(props.value, resolvedPlaceholder);
  const isEmpty = children == null && label === resolvedPlaceholder;

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={triggerDisabled}
            className={cn("justify-start gap-2 text-start font-normal", triggerClassName)}
          >
            <CalendarIcon className="size-4 shrink-0" aria-hidden="true" />
            <span data-slot="date-picker-label" className={cn("truncate", isEmpty && "text-rixl-fg-muted")}>
              {label}
            </span>
          </Button>
        }
      />
      <PopoverContent align={align} side={side} className={cn("w-auto p-0 duration-rixl-base", contentClassName)}>
        <DatePickerPanel picker={props} onCommit={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

export {DatePicker, DatePickerPanel, formatDatePickerLabel};
export type {DateRange};
