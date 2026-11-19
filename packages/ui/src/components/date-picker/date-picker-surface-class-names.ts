import {cn} from "../../lib/cn";

/**
 * Standalone, the calendar is a small inline surface: the popup surface's colour, border and radius with the
 * shadow of an input, since it does not float. Inside a popover, card or dialog that container already draws the
 * surface and the padding (as in Kumo's `<Popover.Content className="p-3">`), so the calendar resets its own.
 * The reset is an ancestor variant, so it only raises specificity where a consumer is not styling the surface.
 * Each class is written out in full so Tailwind finds it.
 */
export const datePickerSurface = cn(
  "bg-rixl-surface border border-rixl-border rounded-md shadow-xs p-3",
  "[:is([data-slot=popover-content],[data-slot=card-content],[data-slot=dialog-content])_&]:border-0",
  "[:is([data-slot=popover-content],[data-slot=card-content],[data-slot=dialog-content])_&]:bg-transparent",
  "[:is([data-slot=popover-content],[data-slot=card-content],[data-slot=dialog-content])_&]:shadow-none",
  "[:is([data-slot=popover-content],[data-slot=card-content],[data-slot=dialog-content])_&]:rounded-none",
  "[:is([data-slot=popover-content],[data-slot=card-content],[data-slot=dialog-content])_&]:p-0"
);
