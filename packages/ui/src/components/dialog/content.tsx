import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

import {DialogOverlay} from "./overlay";

export const dialogContentVariants = cva(
  cn(
    "bg-rixl-bg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4",
    "rounded-rixl-lg border border-rixl-border p-5 sm:p-6 shadow-rixl-lg",
    "max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain",
    "transition-[scale,opacity] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
    "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
  ),
  {
    variants: {
      size: {
        sm: "sm:max-w-sm",
        default: "sm:max-w-lg",
        lg: "sm:max-w-2xl",
        xl: "sm:max-w-4xl",
      },
    },
    defaultVariants: {size: "default"},
  }
);

export type DialogContentProps = DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
  };

export function DialogContent({className, children, size, showCloseButton = true, ...props}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Popup data-slot="dialog-content" className={cn(dialogContentVariants({size}), className)} {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              "absolute top-3.5 end-3.5 flex size-8 sm:size-7 items-center justify-center rounded-rixl-sm opacity-70",
              "transition-[scale,opacity,background-color,box-shadow] duration-rixl-fast ease-rixl-out",
              "hover:bg-rixl-surface-muted hover:opacity-100",
              "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
              "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
              "disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            )}
          >
            <CloseIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

function CloseIcon() {
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
