import {DatePickerCalendar} from "@rixl/ui/date-picker";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "calendar";
export const title = "Calendar";
export const group = "Content";
export const description =
  'Deprecated alias: the grid now lives in DatePicker (`setup="bare"`). `@rixl/ui/calendar` re-exports the same `DatePickerCalendar` reference and will be removed in a future major.';

export function Showcase() {
  return <DatePickerCalendar mode="single" />;
}

function SingleExample() {
  return (
    <Group label="Single selection">
      <DatePickerCalendar mode="single" />
    </Group>
  );
}

function RangeExample() {
  return (
    <Group label="Range selection">
      <DatePickerCalendar mode="range" numberOfMonths={2} />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "single",
    title: "Single",
    render: SingleExample,
    code: `import {DatePickerCalendar} from "@rixl/ui/date-picker";\n\n<DatePickerCalendar mode="single" />`,
  },
  {
    id: "range",
    title: "Range",
    render: RangeExample,
    code: `import {DatePickerCalendar} from "@rixl/ui/date-picker";\n\n<DatePickerCalendar mode="range" numberOfMonths={2} />`,
  },
];
