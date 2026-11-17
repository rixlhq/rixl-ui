import {Separator} from "@rixl/ui/separator";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "separator";
export const title = "Separator";
export const description = "Visually separate related groups of content.";

export function Showcase() {
  return (
    <div className="w-full max-w-56 space-y-3 text-xs">
      <span className="font-medium">Workspace</span>
      <Separator />
      <div className="flex h-4 items-center gap-3 text-rixl-fg-muted">
        <span>Settings</span>
        <Separator orientation="vertical" />
        <span>Members</span>
        <Separator orientation="vertical" />
        <span>Billing</span>
      </div>
    </div>
  );
}

function HorizontalExample() {
  return (
    <Group label="Horizontal (default)">
      <div className="w-full">
        <p className="text-sm text-rixl-fg">Above the line</p>
        <Separator className="my-3" />
        <p className="text-sm text-rixl-fg-muted">Below the line</p>
      </div>
    </Group>
  );
}

function VerticalExample() {
  return (
    <Group label="Vertical (inside a flex row)">
      <div className="flex h-6 items-center gap-3 text-sm text-rixl-fg">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Guides</span>
      </div>
    </Group>
  );
}

function CustomClassExample() {
  return (
    <Group label="Custom className (last-write-wins via cn)">
      <div className="w-full">
        <Separator className="my-2 h-0.5 bg-rixl-primary" />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "horizontal",
    title: "Horizontal",
    render: HorizontalExample,
    code: `<p className="text-sm text-rixl-fg">Above the line</p>
<Separator className="my-3" />
<p className="text-sm text-rixl-fg-muted">Below the line</p>`,
  },
  {
    id: "vertical",
    title: "Vertical",
    description: "Pass orientation='vertical' inside a flex row.",
    render: VerticalExample,
    code: `<div className="flex h-6 items-center gap-3">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Guides</span>
</div>`,
  },
  {id: "custom", title: "Custom className", render: CustomClassExample},
];
