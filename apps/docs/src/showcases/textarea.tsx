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
  return <Textarea label="Message" id="basic-msg" placeholder="Tell us what you think…" className="w-full max-w-md" />;
}

function StatesExample() {
  return (
    <Group label="States">
      <Textarea placeholder="Disabled" disabled className="w-full max-w-md" />
      <Textarea
        label="Message"
        error="Please correct the value."
        placeholder="Tell us what you think…"
        defaultValue="oops"
        className="w-full max-w-md"
      />
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
    code: `<Textarea label="Message" id="msg" placeholder="Tell us what you think…" />`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Textarea placeholder="Disabled" disabled />
<Textarea label="Message" error="Please correct the value." defaultValue="oops" />`,
  },
  {id: "autogrow", title: "Auto-grow", render: AutoGrowExample},
];
