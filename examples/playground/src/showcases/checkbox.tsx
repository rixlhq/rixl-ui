import { Checkbox } from "@rixl/ui/checkbox";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "checkbox";
export const title = "Checkbox";
export const group = "Forms";
export const description =
  "Boolean form control. Composes with Label; supports indeterminate and controlled state.";

export function Showcase() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="showcase" />
      <Label htmlFor="showcase">Accept terms</Label>
    </div>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <div className="flex items-center gap-2">
      <Checkbox id="live-checkbox" defaultChecked disabled={disabled} aria-invalid={invalid} />
      <Label htmlFor="live-checkbox" className={invalid ? "text-rixl-danger" : undefined}>
        Accept the terms and conditions
      </Label>
    </div>
  );
}

function StatesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="States">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="d1" disabled />
          <Label htmlFor="d1">Locked / unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="d2" disabled defaultChecked />
          <Label htmlFor="d2">Locked / checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="bad" aria-invalid />
          <Label htmlFor="bad" className="text-rixl-danger">
            You must agree before continuing
          </Label>
        </div>
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Tweak disabled and invalid states live.",
    render: LiveExample,
    controls: [
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Accept the terms and conditions</Label>
</div>`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Checkbox id="d1" disabled />
<Checkbox id="d2" disabled defaultChecked />
<Checkbox id="bad" aria-invalid />`,
  },
];
