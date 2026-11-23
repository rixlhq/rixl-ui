import {InputArea} from "@rixl/ui/input";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "input-area";
export const title = "Input Area";
export const description = "Enter and edit multiple lines of text.";
export const notes =
  "Multiline input exported from @rixl/ui/input next to Input. It takes the same label, labelTooltip, description, error, required and size props, wired through Base UI Field so the label focuses it and the description and error are announced. It grows with its content. The info-icon button is icon-only, so name it with labelTooltipAriaLabel; setting labelTooltip without it warns in development. (optional) shows after the label only when required is explicitly false (nothing for true or undefined, as in Kumo). Translate it with labels={{optional}} on the field, or app-wide with RixlLocaleProvider (input.optional); labels wins.";

export function Showcase() {
  return <InputArea aria-label="Feedback" placeholder="Tell us what you think…" className="w-full max-w-md" />;
}

function BasicExample() {
  return (
    <InputArea label="Message" description="We read every message." placeholder="Tell us what you think…" className="w-full max-w-md" />
  );
}

function SizesExample() {
  return (
    <Group label="Sizes">
      <InputArea size="xs" label="Extra small" placeholder="Extra small" className="w-full max-w-md" />
      <InputArea size="sm" label="Small" placeholder="Small" className="w-full max-w-md" />
      <InputArea label="Base" placeholder="Base (default)" className="w-full max-w-md" />
      <InputArea size="lg" label="Large" placeholder="Large" className="w-full max-w-md" />
    </Group>
  );
}

function StatesExample() {
  return (
    <Group label="States">
      <InputArea label="Disabled" placeholder="Cannot edit" disabled className="w-full max-w-md" />
      <InputArea label="Optional" required={false} placeholder="Anything else?" className="w-full max-w-md" />
      <InputArea
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
      <InputArea
        aria-label="Auto-growing message"
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
    code: `<InputArea label="Message" description="We read every message." placeholder="Tell us what you think…" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<InputArea size="xs" label="Extra small" />
<InputArea size="sm" label="Small" />
<InputArea label="Base" />
<InputArea size="lg" label="Large" />`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<InputArea label="Disabled" disabled />
<InputArea label="Optional" required={false} />
<InputArea label="Message" error="Please correct the value." defaultValue="oops" />`,
  },
  {id: "autogrow", title: "Auto-grow", render: AutoGrowExample},
];
