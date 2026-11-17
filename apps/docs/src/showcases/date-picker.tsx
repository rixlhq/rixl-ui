import {useState} from "react";
import {DatePicker, type DateRange} from "@rixl/ui/date-picker";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "date-picker";
export const title = "DatePicker";
export const group = "Overlays";
export const description =
  "Date trigger over the base Calendar in a Popover. Single, multiple, and range modes; presets and footers stay with the consumer. Kumo mapping: selected maps to value, onChange maps to onSelect; bare-calendar Popover composition via DatePickerPanel.";

export function Showcase() {
  const [value, setValue] = useState<Date | undefined>();
  return <DatePicker mode="single" value={value} onSelect={(date) => setValue(date)} />;
}

function LiveExample({state}: {state: Record<string, ControlValue>}) {
  const mode = state.mode as "single" | "multiple" | "range";
  const [single, setSingle] = useState<Date | undefined>();
  const [multiple, setMultiple] = useState<Date[] | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  if (mode === "range") {
    return <DatePicker mode="range" numberOfMonths={2} value={range} onSelect={(next) => setRange(next)} />;
  }
  if (mode === "multiple") {
    return <DatePicker mode="multiple" max={5} value={multiple} onSelect={(next) => setMultiple(next)} />;
  }
  return <DatePicker mode="single" value={single} onSelect={(next) => setSingle(next)} />;
}

function SingleExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Group label="Single date">
      <DatePicker mode="single" value={value} onSelect={(next) => setValue(next)} />
    </Group>
  );
}

function RangeExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <Group label="Date range">
      <DatePicker mode="range" numberOfMonths={2} value={value} onSelect={(next) => setValue(next)} />
    </Group>
  );
}

function LabelSlotExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <Group label="Custom label slot">
      <DatePicker mode="range" value={value} onSelect={(next) => setValue(next)}>
        Last 7 days
      </DatePicker>
    </Group>
  );
}

function MultipleExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [value, setValue] = useState<Date[] | undefined>();
  return (
    <Group label="Multiple dates (max 5)">
      <DatePicker mode="multiple" max={5} value={value} onSelect={(next) => setValue(next)} />
    </Group>
  );
}

function DropdownExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Group label="Month/year dropdowns">
      <DatePicker
        mode="single"
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
        value={value}
        onSelect={(next) => setValue(next)}
      />
    </Group>
  );
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Page-load "today" for the presets demo. Module scope keeps it stable across re-renders. */
const TODAY = startOfDay(new Date());

function PresetsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(TODAY);
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
    <Group label="Range with presets">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-row gap-1 sm:flex-col">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setRange(preset.range);
                if (preset.range.from) setMonth(preset.range.from);
              }}
              data-active={isActive(preset.range)}
              className="rounded-rixl-md px-3 py-1.5 text-left text-sm whitespace-nowrap text-rixl-fg-muted hover:bg-rixl-surface-muted data-[active=true]:bg-rixl-primary data-[active=true]:text-rixl-primary-fg"
            >
              {preset.label}
            </button>
          ))}
        </div>
        <DatePicker
          mode="range"
          numberOfMonths={2}
          value={range}
          onSelect={(next) => setRange(next)}
          month={month}
          onMonthChange={setMonth}
        />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Switch between single and range selection.",
    render: LiveExample,
    controls: [
      {
        name: "mode",
        label: "Mode",
        type: "select",
        options: [
          {value: "single", label: "Single"},
          {value: "multiple", label: "Multiple"},
          {value: "range", label: "Range"},
        ],
        defaultValue: "single",
      },
    ],
    code: `<DatePicker mode="single" value={value} onSelect={setValue} />
<DatePicker mode="multiple" max={5} value={dates} onSelect={setDates} />
<DatePicker mode="range" numberOfMonths={2} value={range} onSelect={setRange} />`,
  },
  {id: "single", title: "Single", render: SingleExample},
  {id: "multiple", title: "Multiple", render: MultipleExample},
  {id: "dropdown", title: "Dropdowns", render: DropdownExample},
  {id: "range", title: "Range", render: RangeExample},
  {id: "presets", title: "Presets", render: PresetsExample},
  {id: "label-slot", title: "Custom label", render: LabelSlotExample},
];
