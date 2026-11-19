import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {focusRing} from "../../lib/classes";

/**
 * Border, hover, focus, disabled and invalid states shared by every bordered form control (Input, InputArea, the Select trigger, OTP slots).
 * The read-only look is not here: `read-only:` is `:read-only`, which matches buttons and divs too.
 */
export const controlSurface = cn(
  "placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
  "border-rixl-border flex w-full min-w-0 rounded-md border bg-transparent shadow-xs outline-none",
  "transition-[color,box-shadow,border-color] duration-(--rixl-motion-fast) ease-out",
  "hover:border-rixl-border-strong",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  focusRing,
  "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
  "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
);

/** Height, padding and text size of single-line controls; Input and the Select trigger share them. */
export const controlSizes = {
  xs: "h-7 px-2 text-base sm:text-xs",
  sm: "h-8 px-2.5 text-base sm:text-xs",
  base: "h-9 px-3 text-base sm:text-sm",
  lg: "h-10 px-3.5 text-base",
} as const;

/** The muted background and default cursor of a text field the user can read but not edit. */
const readOnlyTextField = "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border";

export const inputVariants = cva(
  cn(
    controlSurface,
    readOnlyTextField,
    "file:text-rixl-fg py-1",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium"
  ),
  {
    variants: {size: controlSizes},
    defaultVariants: {size: "base"},
  }
);

export const inputAreaVariants = cva(cn(controlSurface, readOnlyTextField, "field-sizing-content"), {
  variants: {
    size: {
      xs: "min-h-12 px-2 py-1 text-base sm:text-xs",
      sm: "min-h-14 px-2.5 py-1.5 text-base sm:text-xs",
      base: "min-h-16 px-3 py-2 text-base sm:text-sm",
      lg: "min-h-20 px-3.5 py-2.5 text-base",
    },
  },
  defaultVariants: {size: "base"},
});
