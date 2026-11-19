import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {focusRing} from "../../lib/classes";

/** Placeholder, selection, disabled and transition behaviour of every text control, boxed or not. */
const controlBase = cn(
  "placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
  "flex w-full min-w-0 bg-transparent outline-none",
  "transition-[color,box-shadow,border-color] duration-(--rixl-motion-fast) ease-out",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
);

/** Border, hover, focus and invalid states of a control that draws its own box. */
const controlBorder = cn(
  "border-rixl-border border",
  "hover:border-rixl-border-strong",
  focusRing,
  "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
  "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
);

const controlShadow = "shadow-xs";

/** The corner radius of a bordered control. Kept apart so a part that shapes its own corners (an OTP slot) adds none. */
export const controlRadius = "rounded-md";

/**
 * Base, border, hover, focus, disabled, invalid states and shadow shared by every bordered form control (Input, InputArea, the Select trigger, OTP slots).
 * It sets no radius: a rounded control adds `controlRadius`, an OTP slot adds its own corners.
 * The read-only look is not here: `read-only:` is `:read-only`, which matches buttons and divs too.
 */
export const controlSurface = cn(controlBase, controlBorder, controlShadow);

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
    controlBase,
    readOnlyTextField,
    "file:text-rixl-fg py-1",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium"
  ),
  {
    variants: {
      size: controlSizes,
      /**
       * `raised` is the bordered, shadowed field; `flat` drops the shadow; `bare` draws no box at all,
       * for an input that sits inside a box something else draws (the InputGroup).
       */
      surface: {
        raised: cn(controlBorder, controlShadow, controlRadius),
        flat: cn(controlBorder, controlRadius),
        bare: "",
      },
    },
    defaultVariants: {size: "base", surface: "raised"},
  }
);

export const inputAreaVariants = cva(cn(controlSurface, controlRadius, readOnlyTextField, "field-sizing-content"), {
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
