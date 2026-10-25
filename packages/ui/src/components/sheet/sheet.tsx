import * as React from "react";
import {Dialog as SheetPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";

/**
 * Rixl Sheet — a slide-in panel anchored to an edge.
 *
 * Ported from dashboard's shadcn Sheet (Base UI Dialog). A Dialog under
 * the hood with edge placement via `side`:
 * - `<Sheet>` — root; modal, closes on Escape / backdrop / scroll.
 * - `<SheetTrigger>` — the anchor element.
 * - `<SheetContent>` — portalled popup + auto backdrop; `side` is
 *   "top" | "right" | "bottom" | "left" (default "right"). Uses the
 *   Base UI `data-starting-style` / `data-ending-style` transition API
 *   for the slide-in/out, and always renders an X close button.
 * - `<SheetHeader>` / `<SheetFooter>` — padded layout helpers
 *   (footer uses `mt-auto`).
 * - `<SheetTitle>` / `<SheetDescription>` — accessible labelling.
 *
 * Class names swapped to `--rixl-*` tokens; surface is `bg-rixl-bg`
 * with `shadow-rixl-lg`. The close icon is an inlined local SVG.
 */
function Sheet({...props}: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({...props}: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({...props}: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({...props}: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({className, ...props}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-rixl-bg fixed z-50 flex flex-col gap-4 shadow-rixl-lg transition duration-300 ease-in-out",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          data-slot="sheet-close"
          className="ring-offset-rixl-bg focus:ring-rixl-ring absolute top-4 end-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
        >
          <CloseIcon />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />;
}

function SheetFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

function SheetTitle({className, ...props}: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("text-rixl-fg font-semibold", className)} {...props} />;
}

function SheetDescription({className, ...props}: SheetPrimitive.Description.Props) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />;
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

export {Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription};
export type SheetProps = SheetPrimitive.Root.Props;
export type SheetTriggerProps = SheetPrimitive.Trigger.Props;
export type SheetCloseProps = SheetPrimitive.Close.Props;
export type SheetPortalProps = SheetPrimitive.Portal.Props;
export type SheetOverlayProps = SheetPrimitive.Backdrop.Props;
export type SheetContentProps = SheetPrimitive.Popup.Props & {side?: "top" | "right" | "bottom" | "left"};
export type SheetTitleProps = SheetPrimitive.Title.Props;
export type SheetDescriptionProps = SheetPrimitive.Description.Props;
