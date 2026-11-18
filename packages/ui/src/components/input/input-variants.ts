import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";

/** Border, focus, hover, read-only, disabled and invalid states shared by Input and InputArea. */
const controlSurface = cn(
  "placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
  "border-rixl-border flex w-full min-w-0 rounded-rixl-md border bg-transparent shadow-rixl-xs outline-none",
  "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
  "hover:border-rixl-border-strong",
  "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
  "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
);

export const inputVariants = cva(
  cn(controlSurface, "file:text-rixl-fg py-1", "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium"),
  {
    variants: {
      size: {
        xs: "h-7 px-2 text-base sm:text-xs",
        sm: "h-8 px-2.5 text-base sm:text-xs",
        base: "h-9 px-3 text-base sm:text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: {size: "base"},
  }
);

export const inputAreaVariants = cva(cn(controlSurface, "field-sizing-content"), {
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
