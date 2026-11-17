import {Checkbox} from "@rixl/ui/checkbox";
import {Label} from "@rixl/ui/label";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "checkbox";
export const title = "Checkbox";
export const description = "Let people select one or more independent options.";

export function Showcase() {
  return (
    <div className="w-full max-w-56 space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="overview-checkbox" defaultChecked />
        <Label htmlFor="overview-checkbox">Email updates</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="overview-marketing" />
        <Label htmlFor="overview-marketing">Product announcements</Label>
      </div>
    </div>
  );
}

function BasicExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="basic-checkbox" defaultChecked />
      <Label htmlFor="basic-checkbox">Accept the terms and conditions</Label>
    </div>
  );
}

function StatesExample() {
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
          <Checkbox id="ind" indeterminate />
          <Label htmlFor="ind">Indeterminate (dash)</Label>
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
    id: "basic",
    title: "Basic",
    render: BasicExample,
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
