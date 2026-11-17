import {Label} from "@rixl/ui/label";
import {Textarea} from "@rixl/ui/textarea";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "textarea";
export const title = "Textarea";
export const description = "Enter and edit multiple lines of text.";

export function Showcase() {
  return <Textarea placeholder="Tell us what you think…" className="w-full max-w-md" />;
}

function BasicExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <Label htmlFor="basic-msg">Message</Label>
      <Textarea id="basic-msg" placeholder="Tell us what you think…" />
    </div>
  );
}

function StatesExample() {
  return (
    <Group label="States">
      <div className="grid w-full max-w-md grid-cols-1 gap-3">
        <Textarea placeholder="Disabled" disabled />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="invalid-msg">Message</Label>
          <Textarea id="invalid-msg" aria-invalid placeholder="Tell us what you think…" defaultValue="oops" />
          <p className="text-xs text-rixl-danger">Please correct the value.</p>
        </div>
      </div>
    </Group>
  );
}

function AutoGrowExample() {
  return (
    <Group label="Auto-grow">
      <Textarea
        className="w-full max-w-md"
        defaultValue={
          "The field-sizing:content utility makes the textarea grow to fit the text you type without JS. Try adding a few more lines here — the box expands automatically."
        }
      />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "basic",
    title: "Basic",
    render: BasicExample,
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="msg">Message</Label>
  <Textarea id="msg" placeholder="Tell us what you think…" />
</div>`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Textarea placeholder="Disabled" disabled />
<Textarea aria-invalid defaultValue="oops" />`,
  },
  {id: "autogrow", title: "Auto-grow", render: AutoGrowExample},
];
