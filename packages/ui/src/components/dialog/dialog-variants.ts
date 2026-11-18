import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
export const dialogContentSizeClasses = {
  sm: "sm:max-w-sm",
  default: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
} as const;

export const dialogContentVariants = cva(
  cn(
    "bg-rixl-bg fixed top-0 left-0 z-50 grid h-dvh w-full max-w-full content-start auto-rows-min gap-4 sm:top-1/2 sm:left-1/2 sm:h-auto sm:translate-x-[-50%] sm:translate-y-[-50%]",
    "border-rixl-border p-5 sm:rounded-rixl-lg sm:border sm:p-6 sm:shadow-rixl-lg",
    "max-h-dvh overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0 sm:max-h-[calc(100dvh-2rem)] max-sm:pt-[max(1.25rem,env(safe-area-inset-top))] max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:pl-[max(1.25rem,env(safe-area-inset-left))] max-sm:pr-[max(1.25rem,env(safe-area-inset-right))]",
    "transition-[scale,opacity] duration-rixl-base data-ending-style:duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
    "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
  ),
  {
    variants: {
      size: dialogContentSizeClasses,
    },
    defaultVariants: {size: "default"},
  }
);

export const alertDialogContentClasses = cn(
  "bg-rixl-bg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-rixl-lg border-rixl-border border p-5 sm:p-6 shadow-rixl-lg sm:max-w-lg",
  "max-h-[calc(100dvh-2rem)] auto-rows-min overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0",
  "transition-[scale,opacity] duration-rixl-base data-ending-style:duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
  "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
);
