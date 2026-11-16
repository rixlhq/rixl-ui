import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";

export const path = "label";
export const title = "Label";
export const group = "Forms";
export const description =
  "Form-field label. Dims automatically when a peer or ancestor field is disabled.";

export function Showcase() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <Label htmlFor="showcase-email">Email address</Label>
      <Input id="showcase-email" type="email" placeholder="you@example.com" />
    </div>
  );
}

function WiredExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="playground-email">Email address</Label>
      <Input id="playground-email" type="email" placeholder="you@example.com" />
    </div>
  );
}

function DisabledExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Input
        id="playground-disabled"
        type="text"
        disabled
        defaultValue="Read only"
        className="peer"
      />
      <Label htmlFor="playground-disabled">Field label (dims via peer-disabled)</Label>
    </div>
  );
}

function GroupDisabledExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div data-disabled="true" className="group flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="playground-group">Grouped label (dims via group-data-[disabled])</Label>
      <Input id="playground-group" type="text" disabled defaultValue="Under a disabled group" />
    </div>
  );
}

export const examples: Example[] = [
  { id: "wired", title: "Wired to an input", render: WiredExample },
  { id: "disabled", title: "Peer disabled", render: DisabledExample },
  { id: "group", title: "Group disabled", render: GroupDisabledExample },
];
