import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "label";
export const title = "Label";
export const group = "Forms";
export const description =
  "Form-field label. Dims automatically when a peer or ancestor field is disabled.";

export function Showcase() {
  return <Label htmlFor="showcase">Label</Label>;
}

function BasicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic">
      <Label htmlFor="email">Email address</Label>
    </Group>
  );
}

function WiredExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Wired to an input">
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <Label htmlFor="playground-email">Email address</Label>
        <Input id="playground-email" type="email" placeholder="you@example.com" />
      </div>
    </Group>
  );
}

function DisabledExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Peer-disabled (label dims when input is disabled)">
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <input
          id="playground-disabled"
          type="text"
          disabled
          defaultValue="Read only"
          className="peer h-9 rounded-rixl-md border border-rixl-border bg-rixl-surface px-3 text-sm text-rixl-fg placeholder:text-rixl-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rixl-ring disabled:opacity-50"
        />
        <Label htmlFor="playground-disabled">Field label</Label>
      </div>
    </Group>
  );
}

function GroupDisabledExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Group-disabled (data-disabled ancestor)">
      <div data-disabled="true" className="group flex w-full max-w-sm flex-col gap-1.5">
        <Label htmlFor="playground-group">Grouped label</Label>
        <input
          id="playground-group"
          type="text"
          defaultValue="Under a disabled group"
          className="h-9 rounded-rixl-md border border-rixl-border bg-rixl-surface px-3 text-sm text-rixl-fg"
        />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "wired", title: "Wired to an input", render: WiredExample },
  { id: "disabled", title: "Peer disabled", render: DisabledExample },
  { id: "group", title: "Group disabled", render: GroupDisabledExample },
];
