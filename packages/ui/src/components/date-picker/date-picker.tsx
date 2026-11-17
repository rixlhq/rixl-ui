import {useCallback, useState, type ReactNode} from "react";
import {CalendarIcon} from "lucide-react";
import {type DateRange, type Matcher, type PropsBase} from "react-day-picker";
import {cn} from "cn";
import {Button} from "../button/button";
import {Popover, PopoverContent, PopoverTrigger} from "../popover/popover";
import {DatePickerPanel, formatDatePickerLabel} from "./panel";

/**
 * Rixl DatePicker — the unified date-selection component.
 *
 * Two setups via the `setup` setting: `popover` (default) renders the date
 * trigger over the calendar panel in a Popover; `bare` renders just the
 * panel — the Kumo-style grid with `mode="single" | "multiple" | "range"`,
 * `min`/`max`, `captionLayout="dropdown"` and a `footer` slot for presets
 * and usage hints. The `@rixl/ui/calendar` entry is a deprecated thin alias
 * over the same grid (`DatePickerCalendar`).
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
 *
 * Kumo mapping: `selected` is a deprecated alias for `value`, `onChange` for
 * `onSelect`. Both fire together when set; `value`/`onSelect` win for
 * display when both are provided.
 */
type DatePickerBaseProps = {
  /**
   * `popover` renders the trigger + panel in a Popover; `bare` renders just
   * the calendar panel with no trigger chrome. Trigger and Popover props
   * below only apply to `popover`. Defaults to `popover`.
   */
  setup?: "popover" | "bare";
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
  /** date-fns locale for month and weekday names, forwarded to the Calendar. */
  locale?: PropsBase["locale"];
  /** Keep a fixed 6-week grid. Pairs with a single month; leave unset for multi-month views. */
  fixedWeeks?: boolean;
  /**
   * Show days outside the month. Defaults to false when `numberOfMonths`
   * is greater than 1 (Kumo parity: outside days would duplicate across
   * panels), true for a single month.
   */
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
  /** Kumo alias for `value`. Deprecated: prefer `value`. */
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  /** Kumo alias for `onSelect`. Deprecated: prefer `onSelect`. */
  onChange?: (date: Date | undefined) => void;
  onApply?: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: "range";
  value?: DateRange;
  /** Kumo alias for `value`. Deprecated: prefer `value`. */
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  /** Kumo alias for `onSelect`. Deprecated: prefer `onSelect`. */
  onChange?: (range: DateRange | undefined) => void;
  onApply?: (range: DateRange | undefined) => void;
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
  onApply?: (dates: Date[] | undefined) => void;
  /** Min/max selected days. */
  min?: number;
  max?: number;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps;

function resolveDatePickerPlaceholder(mode: DatePickerProps["mode"], placeholder: string | undefined): string {
  if (placeholder) return placeholder;
  if (mode === "range") return "Pick a date range";
  if (mode === "multiple") return "Pick dates";
  return "Pick a date";
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

function DatePicker(props: DatePickerProps) {
  const {
    setup = "popover",
    placeholder,
    align = "start",
    side = "bottom",
    triggerClassName,
    contentClassName,
    triggerDisabled,
    children,
  } = props;
  const [isOpen, setOpen] = useDatePickerOpen(props.open, props.defaultOpen, props.onOpenChange);

  if (setup === "bare") {
    return <DatePickerPanel picker={props} onCommit={() => {}} />;
  }

  const resolvedPlaceholder = resolveDatePickerPlaceholder(props.mode, placeholder);
  const label = children ?? formatDatePickerLabel(props.value ?? props.selected, resolvedPlaceholder);
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

export {DatePicker, formatDatePickerLabel};
export type {DateRange};
