import {EmptyState} from "@rixl/ui/empty-state";
import type {ControlValue, Example} from "./registry";

export const path = "empty-state";
export const title = "Empty State";
export const description = "Placeholder for empty content, with an optional primary action and custom icon.";

export function Showcase() {
  return <EmptyState title="No media" description="Upload your first asset." className="min-h-24 p-4" />;
}

function WithoutActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="w-full">
      <EmptyState title="No media" description="Upload your first asset to see it here." />
    </div>
  );
}

function WithActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="w-full">
      <EmptyState
        title="No projects"
        description="Create a project to organize your work."
        action={{label: "New project", onClick: () => {}}}
      />
    </div>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Without action", render: WithoutActionExample},
  {id: "action", title: "With action", render: WithActionExample},
];
