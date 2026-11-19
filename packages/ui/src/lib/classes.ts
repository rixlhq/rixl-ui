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
 * Focus ring of the sidebar parts: 2 px in `--rixl-sidebar-ring`, which a consumer can retune with the
 * rest of the sidebar theme. Narrower and stronger than `focusRingBorderless`, so a sidebar keeps its own look.
 */
export const focusRingSidebar = "ring-rixl-sidebar-ring focus-visible:ring-2";

/**
 * Press feedback shared by every pressable component through `--rixl-press-scale`. `motion-reduce` drops
 * the transform only, so a colour or shadow change still shows the press. The scale is plain `active:`
 * so a consumer `active:scale-100` merges over it; a native disabled button cannot be pressed, and
 * `toggleControl` cancels it for the span roots Base UI renders.
 */
export const pressFeedback = "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100";

/** Press feedback plus the transition that animates it, for a pressable whose surface also changes colour or shadow (Button, Tabs trigger). */
export const pressable = cn(
  pressFeedback,
  "transition-[scale,background-color,box-shadow,border-color,color] duration-(--rixl-motion-fast) ease-out"
);

/** The colours of a control marked `aria-invalid`: a danger ring colour and border. Controls add their own ring width and fill. */
export const invalidRing = "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger";

/**
 * Base of the small toggle controls (Checkbox, RadioGroupItem, Switch): a bordered, shadowed box with a
 * focus ring, press feedback and a disabled look. Base UI renders their roots as a `<span>`, so
 * `:enabled` and `:disabled` never match; the disabled state is read from `data-disabled`. Each control
 * adds its display, size, radius and checked colours; Switch replaces the border colour.
 */
export const toggleControl = cn(
  "shrink-0 items-center border border-rixl-border shadow-xs outline-none touch-manipulation",
  "transition-[scale,box-shadow,border-color,background-color] duration-(--rixl-motion-fast) ease-out",
  pressFeedback,
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:active:scale-100",
  focusRing
);

/** The text style of a form label (`Label`, and the label a field renders around its control). */
export const fieldLabel = "flex items-center gap-2 text-sm leading-none font-medium select-none";

/** Mirrors a directional icon (chevron, arrow) under `dir="rtl"`. Not for icons that point up or down. */
export const rtlFlip = "rtl:-scale-x-100";

/**
 * Surface of a floating popup (Popover, DropdownMenu, Select) with its scale-and-fade
 * enter and exit. Each popup adds its own width, padding and positioning.
 */
export const popupSurface = cn(
  "bg-rixl-surface text-rixl-fg z-50 max-h-(--available-height) max-w-[calc(100dvw-2rem)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere",
  "rounded-md border border-rixl-border shadow-md outline-hidden",
  "transition-[scale,opacity] duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none",
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
  "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 text-sm outline-hidden select-none",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
);

/**
 * The box that holds the check mark of a selectable menu or listbox row (the DropdownMenu checkbox and
 * radio items, `SelectItem`). It is inert, so a press lands on the row. Each row adds the side it sits on:
 * `start-2` in front of the label, `end-2` after it.
 */
export const menuItemIndicator = "pointer-events-none absolute flex size-3.5 items-center justify-center";

/**
 * Scale-and-fade for an indicator that Base UI mounts and unmounts with the checked state
 * (Checkbox, RadioGroup, the DropdownMenu checked and radio items). Select's item indicator is kept
 * mounted and driven by `data-selected`, so it has its own classes.
 */
export const indicatorPop = cn(
  "transition-[scale,opacity] duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none",
  "data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0"
);
