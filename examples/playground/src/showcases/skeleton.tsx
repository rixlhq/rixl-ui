import { Skeleton } from "@rixl/ui/skeleton";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "skeleton";
export const title = "Skeleton";
export const group = "Feedback";
export const description =
  "Pulsing placeholder for loading UI. Shape and size come from consumer classes.";

export function Showcase() {
  return <Skeleton className="h-4 w-40" />;
}

function ShapesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic shapes">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-56" />
    </Group>
  );
}

function CirclesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Circle (avatar-shaped)">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="size-12 rounded-full" />
    </Group>
  );
}

function CardRowExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Card row">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </Group>
  );
}

function TableRowsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Table rows">
      <div className="flex w-full flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </Group>
  );
}

function BlockExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Block (image / hero placeholder)">
      <Skeleton className="h-40 w-full" />
    </Group>
  );
}

export const examples: Example[] = [
  { id: "shapes", title: "Basic shapes", render: ShapesExample },
  { id: "circles", title: "Circles", render: CirclesExample },
  { id: "card", title: "Card row", render: CardRowExample },
  { id: "table", title: "Table rows", render: TableRowsExample },
  { id: "block", title: "Block", render: BlockExample },
];
