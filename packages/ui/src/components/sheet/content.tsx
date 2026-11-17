import {Dialog as SheetPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";

import {SheetOverlay} from "./overlay";

export type SheetContentProps = SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
};

export function SheetContent({className, children, side = "right", ...props}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal data-slot="sheet-portal">
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-rixl-bg fixed z-50 flex max-h-dvh flex-col gap-4 overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0 [&>*]:shrink-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] shadow-rixl-lg transition-transform duration-rixl-slow ease-rixl-drawer motion-reduce:transition-none",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-[85%] data-[side=right]:border-l data-[side=right]:sm:max-w-sm data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-[85%] data-[side=left]:border-r data-[side=left]:sm:max-w-sm data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:max-h-[calc(100dvh-2rem)] data-[side=bottom]:rounded-t-rixl-xl data-[side=bottom]:border-t data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          data-slot="sheet-close"
          className={cn(
            "ring-offset-rixl-bg focus:ring-rixl-ring absolute top-[max(0.875rem,env(safe-area-inset-top))] end-[max(0.875rem,env(safe-area-inset-right))] flex size-11 sm:size-7 items-center justify-center rounded-rixl-sm opacity-70",
            "transition-[scale,opacity,background-color,box-shadow] duration-rixl-fast ease-rixl-out",
            "hover:bg-rixl-surface-muted hover:opacity-100",
            "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
            "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] focus:outline-hidden disabled:pointer-events-none"
          )}
        >
          <CloseIcon />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
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
