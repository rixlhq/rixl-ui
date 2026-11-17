import {Button} from "@rixl/ui/button";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "button";
export const title = "Button";
export const description = "Trigger an action or navigate to another page.";
export const notes =
  "Primary action primitive. Six variants, six sizes, token-driven press feedback, and a fumadocs-compatible `color` alias so dashboard, docs and landing share one button.";

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
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </Group>

      <Group label="Amplitude by size — lg presses shallower so the travel reads the same">
        <Button size="sm">Small · 0.97</Button>
        <Button>Default · 0.97</Button>
        <Button size="lg">Large · 0.98</Button>
      </Group>

      <Group label="Link opts out — scaling inline text against copy looks broken">
        <Button variant="link">Press me, I only change colour</Button>
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
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
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
      <Group label="Icon sizes — icon-sm and icon-xs exist for docs/landing density">
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

function CrossAppExample() {
  return (
    <div className="space-y-6">
      <Group label="Same button, two naming conventions">
        <Button variant="default">variant=&quot;default&quot;</Button>
        <Button color="primary">color=&quot;primary&quot;</Button>
      </Group>
      <p className="text-sm text-rixl-fg-muted">
        Dashboard call sites say <code className="text-rixl-fg">variant</code>; fumadocs — which docs and landing are built on — passes{" "}
        <code className="text-rixl-fg">color</code> from its own internals. Both render identically, and{" "}
        <code className="text-rixl-fg">variant</code> wins when both are supplied. A <code className="text-rixl-fg">color</code> that is not
        a known variant (the deprecated HTML <code className="text-rixl-fg">color</code> attribute, which Calendar&apos;s day button
        spreads) is ignored rather than applied.
      </p>
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
      <Button render={<a href="https://rixl.com" target="_blank" rel="noreferrer" aria-label="Open rixl.com" />} variant="link">
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
    code: `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
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
shadow-rixl-xs active:shadow-none
transition-[scale,background-color,box-shadow,border-color,color]
duration-rixl-fast ease-rixl-out`,
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
    id: "cross-app",
    title: "Cross-app API",
    description: "One button for dashboard, docs and landing.",
    render: CrossAppExample,
    code: `// dashboard (shadcn-shaped)
<Button variant="default">Save</Button>

// docs / landing (fumadocs passes \`color\`)
<Button color="primary">Save</Button>

// \`variant\` wins when both are given
<Button variant="destructive" color="primary">Delete</Button>`,
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
    code: `<Button render={<a href="https://rixl.com" />} variant="link">
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
