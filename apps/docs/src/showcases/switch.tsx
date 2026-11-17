import {Label} from "@rixl/ui/label";
import {Switch} from "@rixl/ui/switch";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "switch";
export const title = "Switch";
export const description =
  "A two-state toggle with a sliding thumb, hover-deepened track, and focus ring. Composes with Label for accessible labelling.";

export function Showcase() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="overview-switch" />
      <Label htmlFor="overview-switch">Enable notifications</Label>
    </div>
  );
}

function BasicExample() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="basic-switch" defaultChecked />
      <Label htmlFor="basic-switch">Enable notifications</Label>
    </div>
  );
}

function StatesExample() {
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
    id: "basic",
    title: "Basic",
    render: BasicExample,
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
