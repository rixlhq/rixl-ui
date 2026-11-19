import {Input} from "@rixl/ui/input";
import {Label} from "@rixl/ui/label";
import type {ControlValue, Example} from "./registry";

export const path = "label";
export const title = "Label";
export const description = "Give a form control a clear, visible name.";
export const notes =
  "Accessible names: the app supplies them. A control needs a visible label (the label prop of Input, Select and the other field components, or a Label wired with htmlFor), an aria-label, or an aria-labelledby; an icon-only control needs its own aria-label. The library renders no hidden screen-reader text. In development, Input, InputArea, InputGroup, Select (labelTooltipAriaLabel), SidebarTrigger, SidebarRail and the mobile Sidebar warn once per instance when their name is missing. A Label next to an Input that has no label prop does not name it for the check: add aria-labelledby with the Label's id, as the examples here do.";

export function Showcase() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label id="showcase-email-label" htmlFor="showcase-email">
        Email address
      </Label>
      <Input
        id="showcase-email"
        aria-labelledby="showcase-email-label"
        type="email"
        placeholder="you@example.com"
        className="w-full max-w-xs"
      />
    </div>
  );
}

function WiredExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="flex flex-col gap-1.5">
      <Label id="playground-email-label" htmlFor="playground-email">
        Email address
      </Label>
      <Input
        id="playground-email"
        aria-labelledby="playground-email-label"
        type="email"
        placeholder="you@example.com"
        className="w-full max-w-sm"
      />
    </div>
  );
}

function DisabledExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="flex flex-col gap-1.5">
      <Input
        id="playground-disabled"
        aria-labelledby="playground-disabled-label"
        type="text"
        disabled
        defaultValue="Read only"
        className="peer w-full max-w-sm"
      />
      <Label id="playground-disabled-label" htmlFor="playground-disabled">
        Field label (dims via peer-disabled)
      </Label>
    </div>
  );
}

function GroupDisabledExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div data-disabled="true" className="group flex flex-col gap-1.5">
      <Label id="playground-group-label" htmlFor="playground-group">
        Grouped label (dims via group-data-[disabled])
      </Label>
      <Input
        id="playground-group"
        aria-labelledby="playground-group-label"
        type="text"
        disabled
        defaultValue="Under a disabled group"
        className="w-full max-w-sm"
      />
    </div>
  );
}

export const examples: Example[] = [
  {id: "wired", title: "Wired to an input", render: WiredExample},
  {id: "disabled", title: "Peer disabled", render: DisabledExample},
  {id: "group", title: "Group disabled", render: GroupDisabledExample},
];
