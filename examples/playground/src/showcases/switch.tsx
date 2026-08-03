import {useState} from "react";
import {Label} from "@rixl/ui/label";
import {Switch} from "@rixl/ui/switch";
import {Group, Section} from "./_layout";

export const path = "switch";
export const title = "Switch";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Switch" description="A two-state toggle. Composes with Label for accessible labelling.">
      <Group label="Basic">
        <div className="flex items-center gap-2">
          <Switch id="notifs" />
          <Label htmlFor="notifs">Enable notifications</Label>
        </div>
      </Group>

      <Group label="Default on">
        <div className="flex items-center gap-2">
          <Switch id="wifi" defaultChecked />
          <Label htmlFor="wifi">Wi-Fi</Label>
        </div>
      </Group>

      <Group label="Disabled (both states)">
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

      <Group label="Controlled">
        <ControlledDemo />
      </Group>

      <Group label="Row of settings">
        <div className="w-full max-w-md divide-y divide-rixl-border rounded-rixl-lg border border-rixl-border">
          {[
            {id: "row-a", label: "Marketing emails", desc: "Receive tips and product updates."},
            {id: "row-b", label: "Security alerts", desc: "Get notified about unusual sign-ins."},
            {id: "row-c", label: "Weekly digest", desc: "A summary every Monday morning."},
          ].map((row) => (
            <label key={row.id} htmlFor={row.id} className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-rixl-fg">{row.label}</p>
                <p className="text-xs text-rixl-fg-muted">{row.desc}</p>
              </div>
              <Switch id={row.id} />
            </label>
          ))}
        </div>
      </Group>
    </Section>
  );
}

function ControlledDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Switch id="ctl" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="ctl">Airplane mode ({on ? "on" : "off"})</Label>
      </div>
      <div className="flex gap-2">
        <button className="text-xs underline" onClick={() => setOn(true)}>
          turn on
        </button>
        <button className="text-xs underline" onClick={() => setOn(false)}>
          turn off
        </button>
      </div>
    </div>
  );
}
