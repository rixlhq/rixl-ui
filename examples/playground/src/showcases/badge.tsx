import {Badge} from "@rixl/ui/badge";
import {Group, Section} from "./_layout";

export const path = "badge";
export const title = "Badge";
export const group = "Feedback";

export function Showcase() {
  return (
    <Section title="Badge" description="Compact status / count label. Four variants; polymorphic via Base UI useRender.">
      <Group label="Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Group>

      <Group label="With a leading icon">
        <Badge>
          <CheckIcon /> Active
        </Badge>
        <Badge variant="destructive">
          <XIcon /> Failed
        </Badge>
        <Badge variant="outline">
          <DotIcon /> Draft
        </Badge>
      </Group>

      <Group label="As a link (render={<a/>})">
        <Badge render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />}>Docs →</Badge>
        <Badge render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />} variant="outline">
          Changelog
        </Badge>
      </Group>

      <Group label="Custom className (pill)">
        <Badge className="rounded-full px-3">Pill</Badge>
        <Badge variant="secondary" className="rounded-full px-3">
          Rounded
        </Badge>
      </Group>
    </Section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
