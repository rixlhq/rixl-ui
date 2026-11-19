## Why

`Tooltip`, `Progress` and `Slider` are compound parts that every caller assembles by hand. Four files compose `Tooltip` + `TooltipTrigger` + `TooltipContent` themselves, `Progress` has no label, and `Slider` needs five parts and an `aria-label` per thumb for the common case.

Kumo documents one component for each (https://kumo-ui.com/components/tooltip.md, `meter.md`, `slider.md`, `input-group.md`). Pre-v1 is the time to match it.

## What Changes

- **BREAKING** `Tooltip` is one component: `<Tooltip content render side align delay closeDelay>children</Tooltip>`. `TooltipTrigger` and `TooltipContent` are removed; Kumo has no equivalents. `TooltipProvider` stays.
- `Button` (`title`), `CopyBlock`, field labels and `SidebarMenuButton` move to the shorthand.
- **BREAKING** `SidebarMenuButton`'s object `tooltip` is `{content, side, align}`, not the popup's props.
- `InputGroupButton` gains `tooltip` and `tooltipSide` (default `bottom`); a string `tooltip` names the button when it has no `aria-label`.
- `Progress` gains `label`, `showValue` and `customValue`, on Base UI Progress's `Label` and `Value`, and warns when it has no accessible name.
- `Slider` is one component with `label`, `size` (`sm | base`) and `getAriaLabel`, rendering one thumb per value. `SliderControl`, `SliderTrack`, `SliderIndicator` and `SliderThumb` are removed; Kumo exposes none. `Slider` has no `pack.entry` or `exports` entry yet, so the removal breaks no consumer, and publishing it is left to a follow-up (see design 7).

**Breaking status**: breaking; ships as the next major through `feat(<component>)!:` commits.

## Capabilities

### Modified Capabilities

- `design-system`: Kumo's `Tooltip`, `Meter`-style `Progress` and one-piece `Slider`.

## Out of scope

- Kumo's slider value badges and min/max labels, and its tooltip arrow and outline styling: Rixl keeps its own surface.
- Kumo's `KumoPortalProvider` `container` prop on `Tooltip`.
