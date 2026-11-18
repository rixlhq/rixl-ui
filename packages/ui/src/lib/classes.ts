import {cn} from "./cn";

/**
 * Class strings that several components repeat. Compose them with `cn` so a
 * consumer `className` still wins (tailwind-merge, last write wins).
 */

/** Focus ring for a part with a border: the ring is drawn and the border takes the ring colour. */
export const focusRing = "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";

/** Focus ring for a part with no border of its own, so there is no border colour to change. */
export const focusRingBorderless = "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]";

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
