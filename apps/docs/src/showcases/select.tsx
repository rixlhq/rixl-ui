import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue} from "@rixl/ui/select";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "select";
export const title = "Select";
export const description = "Choose one value from a list of options.";
export const notes =
  "Portalled Base UI Select on the same control surface and sizes as Input. The root takes label, labelTooltip, description and error for the built-in field; the trigger takes size (xs, sm, base, lg) and fills its container, so set a width with className. A trigger without a label needs an aria-label. The info-icon button is icon-only, so name it with labelTooltipAriaLabel; setting labelTooltip without it warns in development. (optional) shows after the label only when required is explicitly false (nothing for true or undefined, as in Kumo). Translate it with labels={{optional}} on the field, or app-wide with RixlLocaleProvider (input.optional); labels wins.";

const triggerWidth = "w-full max-w-sm";

const fruits = (
  <>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </>
);

export function Showcase() {
  return (
    <Select label="Favourite fruit">
      <SelectTrigger className={triggerWidth}>
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>{fruits}</SelectContent>
    </Select>
  );
}

function SizesExample() {
  return (
    <Group label="Trigger sizes">
      {(["xs", "sm", "base", "lg"] as const).map((size) => (
        <Select key={size}>
          <SelectTrigger size={size} aria-label={`Fruit, ${size}`} className={triggerWidth}>
            <SelectValue placeholder={`Size ${size}`} />
          </SelectTrigger>
          <SelectContent>{fruits}</SelectContent>
        </Select>
      ))}
    </Group>
  );
}

function FieldExample() {
  return (
    <Group label="Built-in field">
      <Select label="Favourite fruit" description="Shown on your profile.">
        <SelectTrigger className={triggerWidth}>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>{fruits}</SelectContent>
      </Select>
      <Select label="Snack" required={false} labelTooltip="Only used for team events." labelTooltipAriaLabel="About snacks">
        <SelectTrigger className={triggerWidth}>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>{fruits}</SelectContent>
      </Select>
    </Group>
  );
}

function ErrorExample() {
  return (
    <Group label="Error">
      <Select label="Favourite fruit" error="Please make a selection.">
        <SelectTrigger className={triggerWidth}>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>{fruits}</SelectContent>
      </Select>
    </Group>
  );
}

function DisabledExample() {
  return (
    <Group label="Disabled">
      <Select disabled>
        <SelectTrigger aria-label="Fruit" className={triggerWidth}>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>{fruits}</SelectContent>
      </Select>
    </Group>
  );
}

function GroupedExample() {
  return (
    <Group label="Grouped options with separator">
      <Select>
        <SelectTrigger aria-label="Timezone" className={triggerWidth}>
          <SelectValue placeholder="Pick a timezone" />
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
        <SelectTrigger aria-label="Plan" className={triggerWidth}>
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
    description: "xs, sm, base (default) and lg, the same heights as Input.",
    render: SizesExample,
    code: `<Select>
  <SelectTrigger size="sm" aria-label="Fruit">
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "field",
    title: "Built-in field",
    description: "label, description, required={false} and labelTooltip, as on Input.",
    render: FieldExample,
    code: `<Select label="Favourite fruit" description="Shown on your profile.">
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    id: "error",
    title: "Error",
    description: "error replaces the description and marks the trigger invalid.",
    render: ErrorExample,
    code: `<Select label="Favourite fruit" error="Please make a selection.">
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  …
</Select>`,
  },
  {id: "disabled", title: "Disabled", render: DisabledExample},
  {id: "grouped", title: "Grouped options", render: GroupedExample},
  {id: "disabled-option", title: "Disabled option", render: DisabledOptionExample},
];
