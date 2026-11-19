import {Button} from "@rixl/ui/button";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "button";
export const title = "Button";
export const description = "Trigger an action or navigate to another page.";
export const notes = "Primary action primitive. Six variants, seven sizes, token-driven press feedback, and a loading state.";

export function Showcase() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Button>
          Continue <span aria-hidden="true">→</span>
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
      <Button variant="ghost" size="sm">
        Learn more
      </Button>
    </div>
  );
}

function PressExample() {
  return (
    <div className="space-y-6">
      <Group label="Press — every variant depresses and drops its shadow">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary-destructive">Secondary destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </Group>

      <Group label="Amplitude by size — lg presses shallower so the travel reads the same">
        <Button size="sm">Small · 0.97</Button>
        <Button>Default · 0.97</Button>
        <Button size="lg">Large · 0.98</Button>
      </Group>

      <p className="text-sm text-rixl-fg-muted">
        Press scale comes from <code className="text-rixl-fg">--rixl-press-scale</code>, shared by every pressable component so a button,
        tab and checkbox depress by the same amount. Change it once and the whole system follows. Under{" "}
        <code className="text-rixl-fg">prefers-reduced-motion</code> the transform is dropped and the colour and shadow changes remain, so
        the press stays legible without movement.
      </p>
    </div>
  );
}

function VariantGridExample() {
  return (
    <Group>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="secondary-destructive">Secondary destructive</Button>
    </Group>
  );
}

function SizesExample() {
  return (
    <div className="space-y-6">
      <Group label="Text sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Group>
      <Group label="Icon sizes">
        <Button size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button size="icon-xs" variant="ghost" aria-label="Search">
          <SearchIcon />
        </Button>
      </Group>
    </div>
  );
}

function StatesExample() {
  return (
    <div className="space-y-6">
      <Group label="Loading — disables clicks, sets aria-busy, and renders an inline spinner">
        <Button loading>Saving</Button>
        <Button variant="secondary" loading>
          Processing
        </Button>
        <Button variant="outline" loading>
          Syncing
        </Button>
      </Group>
      <Group label="Disabled">
        <Button disabled>Disabled</Button>
        <Button variant="destructive" disabled>
          Delete
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
      </Group>
      <Group label="Focus — tab into these, the ring is a 3px token-coloured halo">
        <Button>Tab to me</Button>
        <Button variant="destructive">Then me</Button>
        <Button variant="outline">And me</Button>
      </Group>
      <p className="text-sm text-rixl-fg-muted">
        Keyboard focus is drawn with <code className="text-rixl-fg">focus-visible</code>, so it appears for keyboard users without ringing
        on every mouse click. Destructive carries its own ring colour.
      </p>
    </div>
  );
}

function PolymorphicExample() {
  return (
    <Group label="Polymorphic (render={<a/>})">
      <Button render={<a href="https://rixl.com" target="_blank" rel="noreferrer" aria-label="Open rixl.com" />} variant="ghost">
        Open rixl.com
      </Button>
      <Button
        render={<a href="https://rixl.com" target="_blank" rel="noreferrer" aria-label="Anchor styled as button" />}
        variant="outline"
      >
        <PlusIcon /> Anchor styled as button
      </Button>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "variants",
    title: "Variants",
    description: "All six variants side by side.",
    render: VariantGridExample,
    code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="secondary-destructive">Secondary destructive</Button>`,
  },
  {
    id: "press",
    title: "Press & motion",
    description: "Press feedback is a scale plus a shadow collapse, driven by one shared token.",
    render: PressExample,
    code: `/* preset.css — shared by every pressable component */
--rixl-press-scale: 0.97;
--rixl-press-scale-lg: 0.98;

/* button.tsx */
active:scale-[var(--rixl-press-scale)]
motion-reduce:active:scale-100
shadow-xs active:shadow-none
transition-[scale,background-color,box-shadow,border-color,color]
duration-(--rixl-motion-fast) ease-out`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "All six supported sizes side-by-side.",
    render: SizesExample,
    code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Search"><SearchIcon /></Button>
<Button size="icon-sm" aria-label="Search"><SearchIcon /></Button>
<Button size="icon-xs" aria-label="Search"><SearchIcon /></Button>`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Button disabled>Disabled</Button>
<Button variant="destructive" disabled>
  Delete
</Button>`,
  },
  {
    id: "polymorphic",
    title: "Polymorphic",
    description: "Render as a different element while keeping button styling.",
    render: PolymorphicExample,
    code: `<Button render={<a href="https://rixl.com" />} variant="ghost">
  Open rixl.com
</Button>`,
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
