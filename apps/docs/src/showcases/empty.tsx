import {Button} from "@rixl/ui/button";
import {Empty} from "@rixl/ui/empty";
import type {ControlValue, Example} from "./registry";

export const path = "empty";
export const title = "Empty";
export const description = "Explain why a view is empty and offer a next step.";

export function Showcase() {
  return <Empty title="No media" description="Upload your first asset." size="sm" />;
}

function WithoutActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <Empty title="No media" description="Upload your first asset to see it here." />;
}

function WithActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <Empty title="No projects" description="Create a project to organize your work." action={<Button>New project</Button>} />;
}

export const examples: Example[] = [
  {id: "basic", title: "Without action", render: WithoutActionExample},
  {id: "action", title: "With action", render: WithActionExample},
];
