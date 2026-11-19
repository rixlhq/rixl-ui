import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
const dialogContentSizeClasses = {
  sm: "sm:max-w-sm",
  default: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
} as const;

export const dialogContentVariants = cva(
  cn(
    "bg-rixl-bg border-rixl-border fixed z-50 grid w-full auto-rows-min gap-4 p-5 sm:p-6",
    "overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0",
    "transition-[scale,opacity] duration-(--rixl-motion-base) data-ending-style:duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none",
    "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
  ),
  {
    variants: {
      size: dialogContentSizeClasses,
      placement: {
        // Full-screen on small viewports, centered from sm up.
        responsive: cn(
          "top-0 left-0 h-dvh max-h-dvh max-w-full content-start sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:translate-x-[-50%] sm:translate-y-[-50%]",
          "sm:rounded-lg sm:border sm:shadow-lg",
          "max-sm:pt-[max(1.25rem,env(safe-area-inset-top))] max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:pl-[max(1.25rem,env(safe-area-inset-left))] max-sm:pr-[max(1.25rem,env(safe-area-inset-right))]"
        ),
        // An alert dialog stays a card at every viewport so its action is never full-bleed.
        centered:
          "top-[50%] left-[50%] max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border shadow-lg",
      },
    },
    defaultVariants: {size: "default", placement: "responsive"},
  }
);
