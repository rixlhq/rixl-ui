import {Slider} from "@rixl/ui/slider";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "slider";
export const title = "Slider";
export const description = "Pick a number, or a range, by dragging a thumb.";
export const notes =
  "One component, as in Kumo: label shows above the track and names the thumbs; size is sm or base; getAriaLabel names each thumb, which a range needs to tell them apart. An array in value or defaultValue renders one thumb per value. format and locale (Base UI) shape the value text a screen reader hears. Without label, getAriaLabel or aria-labelledby the slider warns in development. The thumb tracks the pointer 1:1 with no transform transition.";

export function Showcase() {
  return (
    <div className="w-full max-w-64">
      <Slider label="Volume" defaultValue={40} />
    </div>
  );
}

function BasicExample() {
  return (
    <div className="w-full max-w-sm">
      <Slider label="Volume" defaultValue={40} />
    </div>
  );
}

function RangeExample() {
  return (
    <div className="w-full max-w-sm">
      <Slider label="Price" defaultValue={[25, 75]} getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")} />
    </div>
  );
}

function SizesExample() {
  return (
    <Group label="Sizes">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Slider label="Small" size="sm" defaultValue={30} />
        <Slider label="Base" size="base" defaultValue={60} />
      </div>
    </Group>
  );
}

function UnlabelledExample() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={50} getAriaLabel={() => "Brightness"} />
    </div>
  );
}

function DisabledExample() {
  return (
    <div className="w-full max-w-sm">
      <Slider label="Volume" defaultValue={40} disabled />
    </div>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample, code: `<Slider label="Volume" defaultValue={40} />`},
  {
    id: "range",
    title: "Range",
    description: "An array of values renders one thumb each; getAriaLabel names them.",
    render: RangeExample,
    code: `<Slider
  label="Price"
  defaultValue={[25, 75]}
  getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
/>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<Slider label="Small" size="sm" defaultValue={30} />
<Slider label="Base" size="base" defaultValue={60} />`,
  },
  {
    id: "unlabelled",
    title: "No visible label",
    description: "getAriaLabel names the thumb when the surrounding UI already says what the slider is for.",
    render: UnlabelledExample,
    code: `<Slider defaultValue={50} getAriaLabel={() => "Brightness"} />`,
  },
  {id: "disabled", title: "Disabled", render: DisabledExample, code: `<Slider label="Volume" defaultValue={40} disabled />`},
];
