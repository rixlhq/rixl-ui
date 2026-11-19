import {Switch} from "@rixl/ui/switch";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "switch";
export const title = "Switch";
export const description = "Turn a setting on or off.";
export const notes =
  "label wraps the control in a Base UI Field, so the text names the switch and a click on it toggles. controlFirst={false} puts the text before the switch; required={false} adds (optional); labelTooltip adds an info trigger, which needs labelTooltipAriaLabel. Without a label the bare switch needs an aria-label or aria-labelledby, and warns in development when it has none.";

export function Showcase() {
  return (
    <div className="grid gap-4">
      <Switch label="Notifications" defaultChecked />
      <Switch label="Weekly digest" />
    </div>
  );
}

function BasicExample() {
  return <Switch label="Enable notifications" defaultChecked />;
}

function StatesExample() {
  return (
    <Group label="States">
      <div className="flex flex-col gap-2">
        <Switch label="Locked / off" disabled />
        <Switch label="Locked / on" disabled defaultChecked />
      </div>
    </Group>
  );
}

function LabelExample() {
  return (
    <Group label="Label">
      <div className="flex flex-col gap-2">
        <Switch label="Dark mode" controlFirst={false} />
        <Switch label="Weekly digest" required={false} />
        <Switch label="Share usage data" labelTooltip="Anonymous, never sold" labelTooltipAriaLabel="About usage data" />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "basic",
    title: "Basic",
    render: BasicExample,
    code: `<Switch label="Enable notifications" defaultChecked />`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Switch label="Locked / off" disabled />
<Switch label="Locked / on" disabled defaultChecked />`,
  },
  {
    id: "label",
    title: "Label",
    render: LabelExample,
    code: `<Switch label="Dark mode" controlFirst={false} />
<Switch label="Weekly digest" required={false} />
<Switch label="Share usage data" labelTooltip="Anonymous, never sold" labelTooltipAriaLabel="About usage data" />`,
  },
];
