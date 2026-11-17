import {EmptyState} from "@rixl/ui/empty-state";
import type {ControlValue, Example} from "./registry";

export const path = "empty-state";
export const title = "Empty State";
export const description = "Explain why a view is empty and offer a next step.";

export function Showcase() {
  return <EmptyState title="No media" description="Upload your first asset." size="compact" />;
}

function WithoutActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <EmptyState title="No media" description="Upload your first asset to see it here." />;
}

function WithActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <EmptyState
      title="No projects"
      description="Create a project to organize your work."
      action={{label: "New project", onClick: () => {}}}
    />
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Without action", render: WithoutActionExample},
  {id: "action", title: "With action", render: WithActionExample},
];
