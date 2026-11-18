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
  "Bare calendar grid with single, multiple, and range modes. Number of months, disabled matchers, min/max, dropdown captions, and footers stay on the grid; popover behaviour is consumer composition (trigger Button + Popover + DatePicker). The API follows Kumo: `mode` is required, the selection is `selected` and `onChange`, and every other prop goes to react-day-picker. Multi-month views hide outside days unless `showOutsideDays` is set. Localize it with a react-day-picker locale (`import {fr} from 'react-day-picker/locale'`, then `locale={fr}`): month and weekday names, navigation and day-button labels all follow it, and the `labels` prop overrides one string.";

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
      <PopoverContent>
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
      <DatePicker
        mode="range"
        min={3}
        max={7}
        selected={value}
        onChange={(next) => setValue(next)}
        footer={<span className="text-xs text-rixl-fg-muted">Select 3-7 nights</span>}
      />
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
        footer={
          <p className="w-full pt-2 text-xs text-rixl-fg-muted">
            {selectedCount}/{maxDays} days selected. Grayed dates are unavailable.
          </p>
        }
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
        <PopoverContent>
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
        <PopoverContent>
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

function PresetsExample() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(startOfMonth(TODAY));
  const presets: {label: string; range: DateRange}[] = [
    {label: "Today", range: {from: TODAY, to: TODAY}},
    {
      label: "Last 7 days",
      range: {from: new Date(TODAY.getTime() - 6 * 24 * 60 * 60 * 1000), to: TODAY},
    },
    {
      label: "Last 30 days",
      range: {from: new Date(TODAY.getTime() - 29 * 24 * 60 * 60 * 1000), to: TODAY},
    },
  ];
  const isActive = (preset: DateRange): boolean => {
    if (!range?.from || !range?.to || !preset.from || !preset.to) return false;
    return range.from.getTime() === preset.from.getTime() && range.to.getTime() === preset.to.getTime();
  };
  return (
    <Group label="Range in a popover with presets">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">{formatRangeLabel(range, "Select dates")}</Button>} />
        {/* align="start": the trigger label changes width with the range, and a centered popover would recenter a few px on every preset click. */}
        <PopoverContent align="start">
          <div className="flex flex-col gap-3 p-3 sm:flex-row">
            <div className="flex flex-row gap-1 sm:flex-col">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRange(preset.range);
                    if (preset.range.from) setMonth(startOfMonth(preset.range.from));
                  }}
                  data-active={isActive(preset.range)}
                  className="rounded-rixl-md px-3 py-1.5 text-left text-sm whitespace-nowrap text-rixl-fg-muted hover:bg-rixl-surface-muted data-[active=true]:bg-rixl-primary data-[active=true]:text-rixl-primary-fg"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <DatePicker mode="range" numberOfMonths={2} selected={range} onChange={setRange} month={month} onMonthChange={setMonth} />
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
