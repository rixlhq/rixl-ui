import {useEffect, useState} from "react";
import {Progress} from "@rixl/ui/progress";
import {Group, Section} from "./_layout";

export const path = "progress";
export const title = "Progress";
export const group = "Feedback";

export function Showcase() {
  const animated = useAnimatedValue();

  return (
    <Section title="Progress" description="Determinate horizontal progress bar. Pass null for indeterminate.">
      <Group label="Static values">
        <div className="flex w-full flex-col gap-3">
          <Progress value={0} />
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
          <Progress value={100} />
        </div>
      </Group>

      <Group label="Animated (loops 0→100)">
        <Progress value={animated} />
      </Group>

      <Group label="Custom height (className)">
        <div className="flex w-full flex-col gap-3">
          <Progress value={60} className="h-1" />
          <Progress value={60} className="h-3" />
          <Progress value={60} className="h-4" />
        </div>
      </Group>
    </Section>
  );
}

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
