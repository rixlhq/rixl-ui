import { EmptyState } from "@rixl/ui/empty-state";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "empty-state";
export const title = "EmptyState";
export const group = "Content";
export const description =
  "Placeholder for empty content, with an optional primary action and custom icon.";

export function Showcase() {
  return <EmptyState title="No media" description="Upload your first asset to see it here." />;
}

function WithoutActionExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Without action">
      <EmptyState title="No media" description="Upload your first asset to see it here." />
    </Group>
  );
}

function WithActionExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With action">
      <EmptyState
        title="No projects"
        description="Create a project to organize your work."
        action={{ label: "New project", onClick: () => {} }}
      />
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Without action", render: WithoutActionExample },
  { id: "action", title: "With action", render: WithActionExample },
];
