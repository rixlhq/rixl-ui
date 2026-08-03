import {useState} from "react";
import {Button} from "@rixl/ui/button";
import {Group, Section} from "./_layout";

export const path = "button";
export const title = "Button";
export const group = "Actions";

export function Showcase() {
  return (
    <Section title="Button" description="Primary action primitive. Six variants × four sizes × loading state.">
      <Group label="Variants (size=md)">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Group>

      <Group label="Sizes (variant=primary)">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
      </Group>

      <Group label="With leading icon">
        <Button variant="primary">
          <PlusIcon /> New feed
        </Button>
        <Button variant="secondary">
          <PlusIcon /> Invite member
        </Button>
        <Button variant="outline">
          <PlusIcon /> Add domain
        </Button>
      </Group>

      <Group label="States">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <LoadingDemo />
      </Group>
    </Section>
  );
}

function LoadingDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="primary"
      loading={busy}
      onClick={() => {
        setBusy(true);
        window.setTimeout(() => setBusy(false), 1400);
      }}
    >
      Click me
    </Button>
  );
}

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
