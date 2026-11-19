import {useEffect, useState} from "react";
import {Progress} from "@rixl/ui/progress";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "progress";
export const title = "Progress";
export const description = "Show how far a task has progressed.";

export function Showcase() {
  return (
    <div className="w-full max-w-64 space-y-3">
      <Progress label="Uploading assets" value={64} />
      <p className="text-xs text-rixl-fg-muted">16 of 25 files</p>
    </div>
  );
}

function LabelExample() {
  return (
    <Group label="Label and value">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Progress label="Storage used" value={65} />
        <Progress label="API requests" value={75} customValue="750 / 1,000" />
        <Progress label="Progress" value={40} showValue={false} />
      </div>
    </Group>
  );
}

function IndeterminateExample() {
  return (
    <Group label="Indeterminate (value=null)">
      <Progress value={null} aria-label="Loading" />
    </Group>
  );
}

function StaticValuesExample() {
  return (
    <Group label="Static values">
      <div className="flex w-full flex-col gap-3">
        <Progress value={0} aria-label="0 percent" />
        <Progress value={25} aria-label="25 percent" />
        <Progress value={50} aria-label="50 percent" />
        <Progress value={75} aria-label="75 percent" />
        <Progress value={100} aria-label="100 percent" />
      </div>
    </Group>
  );
}

function CustomHeightExample() {
  return (
    <Group label="Custom height (trackClassName)">
      <div className="flex w-full flex-col gap-3">
        <Progress value={60} trackClassName="h-1" aria-label="Thin" />
        <Progress value={60} trackClassName="h-3" aria-label="Medium" />
        <Progress value={60} trackClassName="h-4" aria-label="Thick" />
      </div>
    </Group>
  );
}

function AnimatedExample() {
  const animated = useAnimatedValue();
  return (
    <Group label="Animated (loops 0→100)">
      <Progress value={animated} aria-label="Animated" />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "indeterminate",
    title: "Indeterminate",
    description: "Pass null while the duration is unknown.",
    render: IndeterminateExample,
    code: `<Progress value={null} aria-label="Loading" />`,
  },
  {
    id: "label",
    title: "Label and value",
    description:
      "label names the bar and shows above it with the value. showValue={false} hides the value; customValue replaces its text. Without a label, set aria-label or aria-labelledby: Progress warns in development otherwise.",
    render: LabelExample,
    code: `<Progress label="Storage used" value={65} />
<Progress label="API requests" value={75} customValue="750 / 1,000" />
<Progress label="Progress" value={40} showValue={false} />`,
  },
  {id: "static", title: "Static values", render: StaticValuesExample},
  {id: "heights", title: "Custom heights", render: CustomHeightExample},
  {id: "animated", title: "Animated", render: AnimatedExample},
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
