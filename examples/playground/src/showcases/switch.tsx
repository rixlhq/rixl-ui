import { Label } from "@rixl/ui/label";
import { Switch } from "@rixl/ui/switch";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "switch";
export const title = "Switch";
export const group = "Forms";
export const description =
  "A two-state toggle with a sliding thumb, hover-deepened track, and focus ring. Composes with Label for accessible labelling.";

export function Showcase() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="showcase" />
      <Label htmlFor="showcase">Enable notifications</Label>
    </div>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <div className="flex items-center gap-2">
      <Switch id="live-switch" defaultChecked disabled={disabled} aria-invalid={invalid} />
      <Label htmlFor="live-switch" className={invalid ? "text-rixl-danger" : undefined}>
        Enable notifications
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
          <Switch id="s-off" disabled />
          <Label htmlFor="s-off">Locked / off</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s-on" disabled defaultChecked />
          <Label htmlFor="s-on">Locked / on</Label>
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
  <Switch id="notifs" defaultChecked />
  <Label htmlFor="notifs">Enable notifications</Label>
</div>`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Switch id="s-off" disabled />
<Switch id="s-on" disabled defaultChecked />`,
  },
];
