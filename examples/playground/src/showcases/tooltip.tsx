import {Button} from "@rixl/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@rixl/ui/tooltip";
import {Group, Section} from "./_layout";

export const path = "tooltip";
export const title = "Tooltip";
export const group = "Overlays";

export function Showcase() {
  return (
    <Section title="Tooltip" description="Portalled contextual label. Base UI Tooltip with an arrow; position via side/align props.">
      <Group label="Basic">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
      </Group>

      <Group label="Sides">
        <div className="flex flex-wrap items-center gap-6">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
              <TooltipContent side={side}>Side: {side}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Group>

      <Group label="Alignments (side=bottom)">
        <div className="flex items-center gap-6">
          {(["start", "center", "end"] as const).map((align) => (
            <Tooltip key={align}>
              <TooltipTrigger render={<Button variant="outline">align={align}</Button>} />
              <TooltipContent side="bottom" align={align}>
                Aligned {align}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Group>

      <Group label="Rich content (paragraph, wraps)">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Learn more</Button>} />
          <TooltipContent className="max-w-xs">
            Tooltips shouldn't be used for anything critical — screen readers may skip them and touch users have no hover state.
          </TooltipContent>
        </Tooltip>
      </Group>

      <Group label="On a non-button trigger (icon)">
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                aria-label="Info"
                className="inline-flex size-8 items-center justify-center rounded-full border border-rixl-border bg-rixl-surface text-rixl-fg-muted hover:bg-rixl-surface-muted"
              >
                <InfoIcon />
              </button>
            }
          />
          <TooltipContent>What's this?</TooltipContent>
        </Tooltip>
      </Group>
    </Section>
  );
}

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
