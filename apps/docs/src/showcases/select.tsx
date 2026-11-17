import {Label} from "@rixl/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue} from "@rixl/ui/select";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "select";
export const title = "Select";
export const group = "Forms";
export const description =
  "Portalled Base UI Select. Trigger with hover/open states and a chevron that flips on open; options highlight on keyboard + pointer; the popup animates in and out.";

export function Showcase() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SizesExample() {
  return (
    <Group label="Trigger sizes">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Select>
          <SelectTrigger size="sm">
            <SelectValue>{(v) => (v ? String(v) : "Small")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue>{(v) => (v ? String(v) : "Default")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Group>
  );
}

function StatesExample() {
  return (
    <Group label="States">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Select disabled>
          <SelectTrigger>
            <SelectValue>{(v) => (v ? String(v) : "Disabled")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="invalid-select">Favourite fruit</Label>
          <Select>
            <SelectTrigger id="invalid-select" aria-invalid>
              <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-rixl-danger">Please make a selection.</p>
        </div>
      </div>
    </Group>
  );
}

function GroupedExample() {
  return (
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </Group>
  );
}

function DisabledOptionExample() {
  return (
    <Group label="Disabled option">
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
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Small and default trigger sizes.",
    render: SizesExample,
    code: `<Select>
  <SelectTrigger size="sm">
    <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "states",
    title: "States",
    description: "Disabled trigger and invalid with an error message.",
    render: StatesExample,
    code: `<Select disabled>
  <SelectTrigger>
    <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
  </SelectTrigger>
</Select>`,
  },
  {id: "grouped", title: "Grouped options", render: GroupedExample},
  {id: "disabled-option", title: "Disabled option", render: DisabledOptionExample},
];
