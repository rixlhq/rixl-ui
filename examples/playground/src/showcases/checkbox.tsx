import {useState} from "react";
import {Checkbox} from "@rixl/ui/checkbox";
import {Label} from "@rixl/ui/label";
import {Group, Section} from "./_layout";

export const path = "checkbox";
export const title = "Checkbox";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Checkbox" description="Boolean form control. Composes with Label; supports indeterminate and controlled state.">
      <Group label="Basic">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept the terms and conditions</Label>
        </div>
      </Group>

      <Group label="Default checked">
        <div className="flex items-center gap-2">
          <Checkbox id="news" defaultChecked />
          <Label htmlFor="news">Send me the weekly newsletter</Label>
        </div>
      </Group>

      <Group label="Disabled (both states)">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="d1" disabled />
            <Label htmlFor="d1">Locked / unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="d2" disabled defaultChecked />
            <Label htmlFor="d2">Locked / checked</Label>
          </div>
        </div>
      </Group>

      <Group label="Invalid (aria-invalid)">
        <div className="flex items-center gap-2">
          <Checkbox id="bad" aria-invalid />
          <Label htmlFor="bad" className="text-rixl-danger">
            You must agree before continuing
          </Label>
        </div>
      </Group>

      <Group label="Controlled">
        <ControlledDemo />
      </Group>
    </Section>
  );
}

function ControlledDemo() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="ctl" checked={checked === true} onCheckedChange={(v) => setChecked(v)} />
        <Label htmlFor="ctl">Currently: {String(checked)}</Label>
      </div>
      <div className="flex gap-2">
        <button className="text-xs underline" onClick={() => setChecked(true)}>
          set true
        </button>
        <button className="text-xs underline" onClick={() => setChecked(false)}>
          set false
        </button>
      </div>
    </div>
  );
}
