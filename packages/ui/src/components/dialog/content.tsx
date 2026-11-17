import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

import {DialogOverlay} from "./overlay";

export const dialogContentVariants = cva(
  cn(
    "bg-rixl-bg fixed top-0 left-0 z-50 grid h-dvh w-full max-w-full content-start auto-rows-min gap-4 sm:top-1/2 sm:left-1/2 sm:h-auto sm:translate-x-[-50%] sm:translate-y-[-50%]",
    "border-rixl-border p-5 sm:rounded-rixl-lg sm:border sm:p-6 sm:shadow-rixl-lg",
    "max-h-dvh overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0 sm:max-h-[calc(100dvh-2rem)] max-sm:pt-[max(1.25rem,env(safe-area-inset-top))] max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:pl-[max(1.25rem,env(safe-area-inset-left))] max-sm:pr-[max(1.25rem,env(safe-area-inset-right))]",
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
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({size}), showCloseButton && "[&_[data-slot=dialog-header]]:pe-10", className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              "absolute top-[max(0.875rem,env(safe-area-inset-top))] end-[max(0.875rem,env(safe-area-inset-right))] flex size-11 sm:size-7 items-center justify-center rounded-rixl-sm opacity-70",
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
