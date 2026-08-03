import {useState} from "react";
import {Label} from "@rixl/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@rixl/ui/select";
import {Group, Section} from "./_layout";

export const path = "select";
export const title = "Select";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Select" description="Portalled Base UI Select. Composition of Trigger, Value, Content, Groups, Items, and Separators.">
      <Group label="Basic">
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <Label htmlFor="fruit-trigger">Favourite fruit</Label>
          <Select>
            <SelectTrigger id="fruit-trigger" className="w-full">
              <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Group>

      <Group label="Sizes">
        <div className="flex items-center gap-3">
          <Select defaultValue="daily">
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="daily">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Group>

      <Group label="Grouped options with separator">
        <Select>
          <SelectTrigger>
            <SelectValue>{(v) => (v ? String(v) : "Pick a timezone")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Group>

      <Group label="Disabled option + disabled trigger">
        <div className="flex items-center gap-3">
          <Select defaultValue="pro">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise" disabled>
                Enterprise (contact sales)
              </SelectItem>
            </SelectContent>
          </Select>

          <Select disabled defaultValue="pro">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Group>

      <Group label="Invalid (aria-invalid on trigger)">
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <Label htmlFor="region-trigger" className="text-rixl-danger">
            Region
          </Label>
          <Select>
            <SelectTrigger id="region-trigger" aria-invalid>
              <SelectValue>{(v) => (v ? String(v) : "Choose a region")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-rixl-danger">You must pick a region.</p>
        </div>
      </Group>

      <Group label="Controlled">
        <ControlledDemo />
      </Group>
    </Section>
  );
}

function ControlledDemo() {
  const [value, setValue] = useState<string>("comfortable");
  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="compact">Compact</SelectItem>
          <SelectItem value="comfortable">Comfortable</SelectItem>
          <SelectItem value="spacious">Spacious</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-rixl-fg-muted">Selected: {value}</p>
    </div>
  );
}
