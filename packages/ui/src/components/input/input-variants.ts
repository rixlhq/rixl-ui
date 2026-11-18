import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";

export const inputVariants = cva(
  cn(
    "file:text-rixl-fg placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
    "border-rixl-border flex w-full min-w-0 rounded-rixl-md border bg-transparent py-1 shadow-rixl-xs outline-none",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
    "hover:border-rixl-border-strong",
    "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
    "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
  ),
  {
    variants: {
      inputSize: {
        sm: "h-8 px-2.5 text-base sm:text-xs",
        default: "h-9 px-3 text-base sm:text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: {inputSize: "default"},
  }
);
