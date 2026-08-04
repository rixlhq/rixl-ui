import {Calendar} from "@rixl/ui/calendar";
import {Group, Section} from "./_layout";

export const path = "calendar";
export const title = "Calendar";
export const group = "Content";

export function Showcase() {
  return (
    <Section
      title="Calendar"
      description="Date grid built on react-day-picker v9. Single and range selection, outside days, and caption dropdowns."
    >
      <Group label="Single selection">
        <Calendar mode="single" />
      </Group>

      <Group label="Range selection">
        <Calendar mode="range" numberOfMonths={2} />
      </Group>
    </Section>
  );
}