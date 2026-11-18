import {cn} from "./cn";

/**
 * Class strings that several components repeat. Compose them with `cn` so a
 * consumer `className` still wins (tailwind-merge, last write wins).
 */

/** Focus ring for a part with a border: the ring is drawn and the border takes the ring colour. */
export const focusRing = "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";

/** Focus ring for a part with no border of its own, so there is no border colour to change. */
export const focusRingBorderless = "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";

/** Mirrors a directional icon (chevron, arrow) under `dir="rtl"`. Not for icons that point up or down. */
export const rtlFlip = "rtl:-scale-x-100";

/**
 * Surface of a floating popup (Popover, DropdownMenu, Select) with its scale-and-fade
 * enter and exit. Each popup adds its own width, padding and positioning.
 */
export const popupSurface = cn(
  "bg-rixl-surface text-rixl-fg z-50 max-h-(--available-height) max-w-[calc(100dvw-2rem)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere",
  "rounded-rixl-md border border-rixl-border shadow-rixl-md outline-hidden",
  "transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
  "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
);

/**
 * A selectable row in a menu or listbox: highlight on `data-highlighted` (keyboard and pointer, not
 * `:focus`), dimmed and inert when disabled, and svg children sized and kept from shrinking. No
 * transition on the highlight, so fast hover or arrow keys leave no fading trail. Each row adds its
 * own horizontal padding.
 */
export const menuItem = cn(
  "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg",
  "relative flex cursor-default items-center gap-2 rounded-rixl-sm py-1.5 text-sm outline-hidden select-none",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
);

/**
 * Scale-and-fade for an indicator that Base UI mounts and unmounts with the checked state
 * (Checkbox, RadioGroup, the DropdownMenu checked and radio items). Select's item indicator is kept
 * mounted and driven by `data-selected`, so it has its own classes.
 */
export const indicatorPop = cn(
  "transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
  "data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0"
);
