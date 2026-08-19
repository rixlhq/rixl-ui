import { Label } from "@rixl/ui/label";
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
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "select";
export const title = "Select";
export const group = "Forms";
export const description =
  "Portalled Base UI Select. Composition of Trigger, Value, Content, Groups, Items, and Separators.";

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

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const size = state.size as "sm" | "default";
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="live-select">Favourite fruit</Label>
      <Select disabled={disabled}>
        <SelectTrigger id="live-select" size={size} aria-invalid={invalid}>
          <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="date">Date</SelectItem>
        </SelectContent>
      </Select>
      {invalid ? <p className="text-xs text-rixl-danger">Please make a selection.</p> : null}
    </div>
  );
}

function GroupedExample(props: { state: Record<string, ControlValue> }) {
  void props;
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

function DisabledOptionExample(props: { state: Record<string, ControlValue> }) {
  void props;
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
    id: "live",
    title: "Interactive",
    description: "Tweak trigger size, disabled, and invalid states live.",
    render: LiveExample,
    controls: [
      {
        name: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "default", label: "Default" },
        ],
        defaultValue: "default",
      },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<Select>
  <SelectTrigger>
    <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
  </SelectContent>
</Select>`,
  },
  { id: "grouped", title: "Grouped options", render: GroupedExample },
  { id: "disabled-option", title: "Disabled option", render: DisabledOptionExample },
];
