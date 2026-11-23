import {Checkbox, CheckboxGroup} from "@rixl/ui/checkbox";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "checkbox";
export const title = "Checkbox";
export const description = "Let people select one or more independent options.";
export const notes =
  'label wraps the control in a Base UI Field, so the text names the checkbox and a click on it toggles. controlFirst={false} puts the text before the box; required={false} adds (optional); labelTooltip adds an info trigger, which needs labelTooltipAriaLabel. variant="error" marks the box aria-invalid. Without a label the bare box needs an aria-label or aria-labelledby, and warns in development when it has none. CheckboxGroup takes legend, description, error and orientation; a Checkbox with a value inside it is the item.';

export function Showcase() {
  return (
    <div className="grid gap-3">
      <Checkbox label="Email updates" defaultChecked />
      <Checkbox label="Product announcements" />
    </div>
  );
}

function BasicExample() {
  return <Checkbox label="Accept the terms and conditions" defaultChecked />;
}

function StatesExample() {
  return (
    <Group label="States">
      <div className="flex flex-col gap-2">
        <Checkbox label="Locked / unchecked" disabled />
        <Checkbox label="Locked / checked" disabled defaultChecked />
        <Checkbox label="Indeterminate (dash)" indeterminate />
        <Checkbox label="You must agree before continuing" variant="error" />
      </div>
    </Group>
  );
}

function LabelExample() {
  return (
    <Group label="Label">
      <div className="flex flex-col gap-2">
        <Checkbox label="Remember me" controlFirst={false} defaultChecked />
        <Checkbox label="Newsletter" required={false} />
        <Checkbox label="Marketing emails" labelTooltip="One message a month" labelTooltipAriaLabel="About marketing emails" />
      </div>
    </Group>
  );
}

function GroupExample() {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup legend="Notifications" description="Choose where we reach you" defaultValue={["email"]}>
        <Checkbox value="email" label="Email" />
        <Checkbox value="sms" label="SMS" />
        <Checkbox value="push" label="Push" />
      </CheckboxGroup>
      <CheckboxGroup legend="Channels" orientation="horizontal" error="Choose at least one channel">
        <Checkbox value="web" label="Web" />
        <Checkbox value="ios" label="iOS" />
        <Checkbox value="android" label="Android" />
      </CheckboxGroup>
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "basic",
    title: "Basic",
    render: BasicExample,
    code: `<Checkbox label="Accept the terms and conditions" defaultChecked />`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Checkbox label="Locked" disabled />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="You must agree" variant="error" />`,
  },
  {
    id: "label",
    title: "Label",
    render: LabelExample,
    code: `<Checkbox label="Remember me" controlFirst={false} />
<Checkbox label="Newsletter" required={false} />
<Checkbox label="Marketing emails" labelTooltip="One message a month" labelTooltipAriaLabel="About marketing emails" />`,
  },
  {
    id: "group",
    title: "Group",
    render: GroupExample,
    code: `<CheckboxGroup legend="Notifications" description="Choose where we reach you" defaultValue={["email"]}>
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
</CheckboxGroup>
<CheckboxGroup legend="Channels" orientation="horizontal" error="Choose at least one channel">
  <Checkbox value="web" label="Web" />
</CheckboxGroup>`,
  },
];
