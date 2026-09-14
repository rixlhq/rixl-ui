import { Skeleton } from "@rixl/ui/skeleton";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "skeleton";
export const title = "Skeleton";
export const group = "Feedback";
export const description =
  "Placeholder for loading UI. Shape and size come from consumer classes; animation is pulse (default), shimmer, or none — all reduced-motion safe.";

export function Showcase() {
  return <Skeleton className="h-4 w-40" />;
}

function AnimationExample({ state }: { state: Record<string, ControlValue> }) {
  const animation = state.animation as "pulse" | "shimmer" | "none";
  return (
    <Group label="Animation">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-10 rounded-full" animation={animation} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" animation={animation} />
          <Skeleton className="h-3 w-24" animation={animation} />
        </div>
      </div>
    </Group>
  );
}

function AnimationsComparisonExample(props: { state: Record<string, ControlValue> }) {
  void props;
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
  {
    id: "animation",
    title: "Animation",
    description: "Switch between pulse, shimmer, and none.",
    render: AnimationExample,
    controls: [
      {
        name: "animation",
        label: "Animation",
        type: "select",
        options: [
          { value: "pulse", label: "Pulse" },
          { value: "shimmer", label: "Shimmer" },
          { value: "none", label: "None" },
        ],
        defaultValue: "shimmer",
      },
    ],
    code: `<Skeleton className="h-4 w-40" animation="shimmer" />`,
  },
  { id: "animations", title: "Pulse / shimmer / none", render: AnimationsComparisonExample },
  { id: "shapes", title: "Basic shapes", render: ShapesExample },
  { id: "circles", title: "Circles", render: CirclesExample },
  { id: "card", title: "Card row", render: CardRowExample },
  { id: "table", title: "Table rows", render: TableRowsExample },
  { id: "block", title: "Block", render: BlockExample },
];
