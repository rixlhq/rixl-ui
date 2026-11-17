import {useEffect, useState} from "react";
import {Progress} from "@rixl/ui/progress";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "progress";
export const title = "Progress";
export const group = "Feedback";
export const description = "Determinate horizontal progress bar. Pass null for indeterminate.";

export function Showcase() {
  return <Progress value={50} className="w-full" />;
}

function IndeterminateExample() {
  return (
    <Group label="Indeterminate (value=null)">
      <Progress value={null} className="w-full" />
    </Group>
  );
}

function StaticValuesExample() {
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

function CustomHeightExample() {
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
    id: "indeterminate",
    title: "Indeterminate",
    description: "Pass null while the duration is unknown.",
    render: IndeterminateExample,
    code: `<Progress value={null} className="w-full" />`,
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
