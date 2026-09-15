import { Label } from "@rixl/ui/label";
import { Textarea } from "@rixl/ui/textarea";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "textarea";
export const title = "Textarea";
export const group = "Forms";
export const description =
  "Auto-growing multi-line input with hover, focus, read-only, and invalid states.";

export function Showcase() {
  return <Textarea placeholder="Tell us what you think…" className="max-w-md" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const rows = Number(state.rows);
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <Label htmlFor="live-msg">Message</Label>
      <Textarea
        id="live-msg"
        rows={rows}
        placeholder="Type something…"
        disabled={disabled}
        aria-invalid={invalid}
      />
      {invalid ? <p className="text-xs text-rixl-danger">Please correct the value.</p> : null}
    </div>
  );
}

function AutoGrowExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Auto-grow">
      <Textarea
        className="max-w-md"
        defaultValue={
          "The field-sizing:content utility makes the textarea grow to fit the text you type without JS. Try adding a few more lines here — the box expands automatically."
        }
      />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Tweak rows, disabled, and invalid states live.",
    render: LiveExample,
    controls: [
      {
        name: "rows",
        label: "Rows",
        type: "select",
        options: [
          { value: "3", label: "3" },
          { value: "6", label: "6" },
          { value: "10", label: "10" },
        ],
        defaultValue: "3",
      },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="msg">Message</Label>
  <Textarea id="msg" placeholder="Tell us what you think…" />
</div>`,
  },
  { id: "autogrow", title: "Auto-grow", render: AutoGrowExample },
];
