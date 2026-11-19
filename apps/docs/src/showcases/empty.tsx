import {Button} from "@rixl/ui/button";
import {Empty} from "@rixl/ui/empty";
import type {ControlValue, Example} from "./registry";

export const path = "empty";
export const title = "Empty";
export const description = "Explain why a view is empty and offer a next step.";
export const notes = "commandLine shows a shell command in a copy block; its copy button is named Copy to clipboard, as in Kumo.";

export function Showcase() {
  return <Empty title="No media" description="Upload your first asset." size="sm" />;
}

type EmptySize = "sm" | "default" | "lg";

function BasicExample(props: {state: Record<string, ControlValue>}) {
  // The select control only emits the options declared below.
  const size = props.state.size as EmptySize;
  return <Empty title="No media" description="Upload your first asset to see it here." size={size} />;
}

function WithActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <Empty title="No projects" description="Create a project to organize your work." action={<Button>New project</Button>} />;
}

function WithCommandExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <Empty title="No apps yet" description="Create your first app from the terminal." commandLine="npm create rixl" />;
}

export const examples: Example[] = [
  {
    id: "basic",
    title: "Basic",
    render: BasicExample,
    controls: [
      {
        name: "size",
        label: "Size",
        type: "select",
        defaultValue: "default",
        options: [
          {value: "sm", label: "sm"},
          {value: "default", label: "default"},
          {value: "lg", label: "lg"},
        ],
      },
    ],
    code: `<Empty title="No media" description="Upload your first asset to see it here." />`,
  },
  {
    id: "action",
    title: "With action",
    description: "Pass any element as the action; Empty adds no icon or styling to it.",
    render: WithActionExample,
    code: `<Empty title="No projects" description="Create a project to organize your work." action={<Button>New project</Button>} />`,
  },
  {
    id: "command",
    title: "With command line",
    description: "A copyable command for onboarding states.",
    render: WithCommandExample,
    code: `<Empty title="No apps yet" commandLine="npm create rixl" />`,
  },
];
