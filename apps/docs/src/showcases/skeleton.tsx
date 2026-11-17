import {Skeleton} from "@rixl/ui/skeleton";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "skeleton";
export const title = "Skeleton";
export const description =
  "Placeholder for loading UI. Shape and size come from consumer classes; animation is pulse (default), shimmer, or none — all reduced-motion safe.";

export function Showcase() {
  return <Skeleton className="h-4 w-40" />;
}

function AnimationsComparisonExample() {
  return (
    <Group label="Pulse / shimmer / none">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {(["pulse", "shimmer", "none"] as const).map((animation) => (
          <div key={animation} className="flex flex-col gap-2">
            <span className="text-xs text-rixl-fg-muted capitalize">{animation}</span>
            <Skeleton className="h-24 w-full" animation={animation} />
            <Skeleton className="h-4 w-3/4" animation={animation} />
          </div>
        ))}
      </div>
    </Group>
  );
}

function ShapesExample() {
  return (
    <Group label="Basic shapes">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-56" />
    </Group>
  );
}

function CirclesExample() {
  return (
    <Group label="Circle (avatar-shaped)">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="size-12 rounded-full" />
    </Group>
  );
}

function CardRowExample() {
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

function TableRowsExample() {
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

function BlockExample() {
  return (
    <Group label="Block (image / hero placeholder)">
      <Skeleton className="h-40 w-full" />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "animations",
    title: "Animations",
    description: "Pulse, shimmer, and none side by side.",
    render: AnimationsComparisonExample,
    code: `<Skeleton className="h-4 w-40" animation="pulse" />
<Skeleton className="h-4 w-40" animation="shimmer" />
<Skeleton className="h-4 w-40" animation="none" />`,
  },
  {id: "shapes", title: "Basic shapes", render: ShapesExample},
  {id: "circles", title: "Circles", render: CirclesExample},
  {id: "card", title: "Card row", render: CardRowExample},
  {id: "table", title: "Table rows", render: TableRowsExample},
  {id: "block", title: "Block", render: BlockExample},
];
