import {Calendar} from "@rixl/ui/calendar";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "calendar";
export const title = "Calendar";
export const group = "Content";
export const description = "Date grid built on react-day-picker v9. Single and range selection, outside days, and caption dropdowns.";

export function Showcase() {
  return <Calendar mode="single" />;
}

function SingleExample() {
  return (
    <Group label="Single selection">
      <Calendar mode="single" />
    </Group>
  );
}

function RangeExample() {
  return (
    <Group label="Range selection">
      <Calendar mode="range" numberOfMonths={2} />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "single",
    title: "Single",
    render: SingleExample,
    code: `<Calendar mode="single" />`,
  },
  {
    id: "range",
    title: "Range",
    render: RangeExample,
    code: `<Calendar mode="range" numberOfMonths={2} />`,
  },
];
