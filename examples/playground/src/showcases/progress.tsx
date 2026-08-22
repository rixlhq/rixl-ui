import { useEffect, useState } from "react";
import { Progress } from "@rixl/ui/progress";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "progress";
export const title = "Progress";
export const group = "Feedback";
export const description = "Determinate horizontal progress bar. Pass null for indeterminate.";

export function Showcase() {
  return <Progress value={50} className="w-full" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const raw = state.value as string;
  const value = raw === "indeterminate" ? null : Number(raw);
  const valueLabel = raw === "indeterminate" ? "Indeterminate" : `${raw}%`;

  return (
    <div className="flex w-full flex-col gap-2">
      <Progress value={value} className="w-full" />
      <p className="text-xs text-rixl-fg-muted">{valueLabel}</p>
    </div>
  );
}

function StaticValuesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Static values">
      <div className="flex w-full flex-col gap-3">
        <Progress value={0} />
        <Progress value={25} />
        <Progress value={50} />
        <Progress value={75} />
        <Progress value={100} />
      </div>
    </Group>
  );
}

function CustomHeightExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Custom height (className)">
      <div className="flex w-full flex-col gap-3">
        <Progress value={60} className="h-1" />
        <Progress value={60} className="h-3" />
        <Progress value={60} className="h-4" />
      </div>
    </Group>
  );
}

function AnimatedExample() {
  const animated = useAnimatedValue();
  return (
    <Group label="Animated (loops 0→100)">
      <Progress value={animated} className="w-full" />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Pick a value or switch to indeterminate.",
    render: LiveExample,
    controls: [
      {
        name: "value",
        label: "Value",
        type: "select",
        options: [
          { value: "0", label: "0%" },
          { value: "25", label: "25%" },
          { value: "50", label: "50%" },
          { value: "75", label: "75%" },
          { value: "100", label: "100%" },
          { value: "indeterminate", label: "Indeterminate" },
        ],
        defaultValue: "50",
      },
    ],
    code: `<Progress value={50} className="w-full" />
<Progress value={null} className="w-full" />`,
  },
  { id: "static", title: "Static values", render: StaticValuesExample },
  { id: "heights", title: "Custom heights", render: CustomHeightExample },
  { id: "animated", title: "Animated", render: AnimatedExample },
];

function useAnimatedValue() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setV((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 200);
    return () => window.clearInterval(id);
  }, []);
  return v;
}
