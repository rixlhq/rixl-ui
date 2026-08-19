import { Calendar } from "@rixl/ui/calendar";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "calendar";
export const title = "Calendar";
export const group = "Content";
export const description =
  "Date grid built on react-day-picker v9. Single and range selection, outside days, and caption dropdowns.";

export function Showcase() {
  return <Calendar mode="single" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const mode = state.mode as "single" | "range";
  return mode === "range" ? (
    <Calendar mode="range" numberOfMonths={2} />
  ) : (
    <Calendar mode="single" />
  );
}

function SingleExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Single selection">
      <Calendar mode="single" />
    </Group>
  );
}

function RangeExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Range selection">
      <Calendar mode="range" numberOfMonths={2} />
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
          { value: "single", label: "Single" },
          { value: "range", label: "Range" },
        ],
        defaultValue: "single",
      },
    ],
    code: `<Calendar mode="single" />
<Calendar mode="range" numberOfMonths={2} />`,
  },
  { id: "single", title: "Single", render: SingleExample },
  { id: "range", title: "Range", render: RangeExample },
];
