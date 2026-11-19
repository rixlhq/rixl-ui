import {useState} from "react";
import {DatePicker, type DateRange} from "@rixl/ui/date-picker";
import {Button} from "@rixl/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@rixl/ui/popover";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "date-picker";
export const title = "Date Picker";
export const description = "Choose a date, several dates, or a date range.";
export const notes =
  "Calendar grid with single, multiple, and range modes. Number of months, disabled matchers, min/max, dropdown captions, and footers stay on the grid; popover behaviour is consumer composition (trigger Button + Popover + DatePicker). On its own the calendar draws a surface (border, background, shadow, 12px padding); inside a `Popover`, `Card` or `Dialog` it draws neither and the container supplies both, so give the popover `className=\"w-auto p-3\"` as in Kumo. Cells are 36px, so one month fits a default `PopoverContent` (`w-72 p-4`). Previous and next flank the caption, and the month select truncates a name that does not fit, so every `captionLayout` stays inside the grid. The API follows Kumo: `mode` is required, the selection is `selected` and `onChange`, and every other prop goes to react-day-picker. Multi-month views hide outside days unless `showOutsideDays` is set. Localize it with a react-day-picker locale (`import {fr} from 'react-day-picker/locale'`, then `locale={fr}`): month and weekday names, navigation and day-button labels all follow it, and the `labels` prop overrides one string.";

export function Showcase() {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline">
            {value ? value.toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"}) : "Pick a date"}
            <span aria-hidden="true">⌄</span>
          </Button>
        }
      />
      <PopoverContent className="w-auto p-3">
        <DatePicker mode="single" selected={value} onChange={setValue} />
      </PopoverContent>
    </Popover>
  );
}

function SingleExample() {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Group label="Single date">
      <DatePicker mode="single" selected={value} onChange={setValue} />
    </Group>
  );
}

function MultipleExample() {
  const [value, setValue] = useState<Date[] | undefined>();
  return (
    <Group label="Multiple dates (max 5)">
      <DatePicker mode="multiple" max={5} selected={value} onChange={setValue} />
    </Group>
  );
}

function RangeExample() {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <Group label="Date range">
      <DatePicker mode="range" numberOfMonths={2} selected={value} onChange={setValue} />
    </Group>
  );
}

function MinMaxExample() {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <Group label="Range with min/max (3–7 nights)">
      <DatePicker mode="range" min={3} max={7} selected={value} onChange={(next) => setValue(next)} footer="Select 3-7 nights" />
    </Group>
  );
}

function DropdownExample() {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Group label="Month/year dropdowns">
      <DatePicker
        mode="single"
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
        selected={value}
        onChange={(next) => setValue(next)}
      />
    </Group>
  );
}

/** Page-load "today" for the presets demo. Module scope keeps it stable across re-renders. */
const TODAY = startOfDay(new Date());

/** Unavailable month-days for the disabled-dates demo, derived from the same stable today. */
const UNAVAILABLE = [5, 12, 18, 25].map((day) => new Date(TODAY.getFullYear(), TODAY.getMonth(), day));

function DisabledFooterExample() {
  const [value, setValue] = useState<Date[] | undefined>();
  const selectedCount = value?.length ?? 0;
  const maxDays = 5;
  return (
    <Group label="Disabled dates with usage limits">
      <DatePicker
        mode="multiple"
        max={maxDays}
        disabled={UNAVAILABLE}
        fixedWeeks
        selected={value}
        onChange={(next) => setValue(next)}
        footer={`${selectedCount}/${maxDays} days selected. Grayed dates are unavailable.`}
      />
    </Group>
  );
}

function formatRangeLabel(range: DateRange | undefined, empty: string): string {
  if (!range?.from) return empty;
  if (!range.to) return range.from.toLocaleDateString();
  return `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`;
}

function WithPopoverExample() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  return (
    <Group label="Single in a popover">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline">{date ? date.toLocaleDateString() : "Pick a date"}</Button>} />
        <PopoverContent className="w-auto p-3">
          <DatePicker
            mode="single"
            selected={date}
            onChange={(next) => {
              setDate(next);
              if (next) setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Group>
  );
}

function RangePopoverExample() {
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <Group label="Range in a popover (two months)">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">{formatRangeLabel(range, "Select dates")}</Button>} />
        <PopoverContent className="w-auto p-3">
          <DatePicker mode="range" numberOfMonths={2} selected={range} onChange={setRange} />
        </PopoverContent>
      </Popover>
    </Group>
  );
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysBefore(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

const PRESETS: {label: string; range: DateRange}[] = [
  {label: "Today", range: {from: TODAY, to: TODAY}},
  {label: "Last 7 days", range: {from: daysBefore(TODAY, 6), to: TODAY}},
  {label: "Last 30 days", range: {from: daysBefore(TODAY, 29), to: TODAY}},
  {label: "This month", range: {from: startOfMonth(TODAY), to: new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0)}},
  {
    label: "Last month",
    range: {from: new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1), to: new Date(TODAY.getFullYear(), TODAY.getMonth(), 0)},
  },
];

function isSameRange(a: DateRange | undefined, b: DateRange): boolean {
  if (!a?.from || !a.to || !b.from || !b.to) return false;
  return a.from.getTime() === b.from.getTime() && a.to.getTime() === b.to.getTime();
}

function PresetsExample() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(startOfMonth(TODAY));
  return (
    <Group label="Range in a popover with presets">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">{formatRangeLabel(range, "Select dates")}</Button>} />
        {/* align="start": the trigger label changes width with the range, and a centered popover would recenter a few px on every preset click. */}
        <PopoverContent align="start" className="w-auto p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-row flex-wrap gap-1 border-b border-rixl-border p-2 sm:flex-col sm:border-e sm:border-b-0">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRange(preset.range);
                    if (preset.range.from) setMonth(startOfMonth(preset.range.from));
                  }}
                  data-active={isSameRange(range, preset.range)}
                  className="rounded-md px-3 py-1.5 text-start text-sm whitespace-nowrap text-rixl-fg-muted hover:bg-rixl-surface-muted data-[active=true]:bg-rixl-primary data-[active=true]:text-rixl-primary-fg"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="p-3">
              <DatePicker mode="range" numberOfMonths={2} selected={range} onChange={setRange} month={month} onMonthChange={setMonth} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Group>
  );
}

export const examples: Example[] = [
  {id: "single", title: "Single", render: SingleExample},
  {id: "multiple", title: "Multiple", render: MultipleExample},
  {id: "range", title: "Range", render: RangeExample},
  {id: "min-max", title: "Min/Max", render: MinMaxExample},
  {id: "dropdowns", title: "Dropdowns", render: DropdownExample},
  {id: "disabled-footer", title: "Disabled + Footer", render: DisabledFooterExample},
  {id: "with-popover", title: "With Popover", render: WithPopoverExample},
  {id: "range-popover", title: "Range with Popover", render: RangePopoverExample},
  {id: "range-presets", title: "Range with Presets", render: PresetsExample},
];
