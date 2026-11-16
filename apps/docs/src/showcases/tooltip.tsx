import {Button} from "@rixl/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@rixl/ui/tooltip";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "tooltip";
export const title = "Tooltip";
export const group = "Overlays";
export const description =
  "Portalled contextual label anchored to a trigger. Scales from its trigger origin and skips transition duration on adjacent hovers (`data-instant:duration-0`).";

export function Showcase() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="sm">
            Hover me
          </Button>
        }
      />
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  );
}

function ToolbarGroupExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Hover across buttons — first tooltip animates in, adjacent ones open instantly">
      <TooltipProvider delay={250}>
        {(["Bold (⌘B)", "Italic (⌘I)", "Underline (⌘U)", "Code (⌘E)"] as const).map((label) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={
                <Button variant="outline" size="sm">
                  {label.split(" ")[0]}
                </Button>
              }
            />
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </Group>
  );
}

function SidesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sides">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
          <TooltipContent side={side}>Side: {side}</TooltipContent>
        </Tooltip>
      ))}
    </Group>
  );
}

function AlignmentsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Alignments (side=bottom)">
      {(["start", "center", "end"] as const).map((align) => (
        <Tooltip key={align}>
          <TooltipTrigger render={<Button variant="outline">align={align}</Button>} />
          <TooltipContent side="bottom" align={align}>
            Aligned {align}
          </TooltipContent>
        </Tooltip>
      ))}
    </Group>
  );
}

function IconTriggerExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Icon button trigger">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon-sm" className="rounded-full" aria-label="Info">
              <InfoIcon />
            </Button>
          }
        />
        <TooltipContent>What is this?</TooltipContent>
      </Tooltip>
    </Group>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample},
  {
    id: "toolbar",
    title: "Instant neighbor hover (TooltipProvider)",
    description: "Once one tooltip is open in a TooltipProvider group, hovering adjacent triggers skips the entrance delay and duration.",
    render: ToolbarGroupExample,
  },
  {id: "sides", title: "Sides", render: SidesExample},
  {id: "alignments", title: "Alignments", render: AlignmentsExample},
  {id: "icon", title: "Icon trigger", render: IconTriggerExample},
];

function InfoIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
