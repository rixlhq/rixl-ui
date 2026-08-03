import * as React from "react";
import {Dialog as DialogPrimitive} from "@base-ui-components/react/dialog";
import {cn} from "../../lib/cn";

/**
 * Rixl Dialog — a modal surface layered over a backdrop.
 *
 * Ported from dashboard's shadcn Dialog (Base UI Dialog). Composition:
 * - `<Dialog>` — root; modal by default (dialog=modal), closes on
 *   backdrop press / Escape / scroll.
 * - `<DialogTrigger>` — the anchor element.
 * - `<DialogContent>` — the portalled popup with an auto-included
 *   backdrop and a close (X) button (opt out with `showCloseButton`).
 * - `<DialogHeader>` / `<DialogFooter>` — layout helpers.
 * - `<DialogTitle>` / `<DialogDescription>` — accessible labelling.
 * - `<DialogPortal>`, `<DialogClose>`, `<DialogOverlay>` — escape
 *   hatches for custom structures.
 *
 * Class names swapped to `--rixl-*` tokens; surface is `bg-rixl-bg`
 * with `border-rixl-border` and `shadow-rixl-lg`. The close icon is an
 * inlined local SVG to keep @rixl/ui icon-dep-free.
 */
function Dialog({...props}: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({...props}: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({...props}: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({...props}: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({className, ...props}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "bg-rixl-bg data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-rixl-lg border-rixl-border border p-6 shadow-rixl-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-rixl-bg focus:ring-rixl-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <CloseIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />;
}

function DialogFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

function DialogTitle({className, ...props}: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} />;
}

function DialogDescription({className, ...props}: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />;
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

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
export type DialogProps = DialogPrimitive.Root.Props;
export type DialogTriggerProps = DialogPrimitive.Trigger.Props;
export type DialogPortalProps = DialogPrimitive.Portal.Props;
export type DialogCloseProps = DialogPrimitive.Close.Props;
export type DialogOverlayProps = DialogPrimitive.Backdrop.Props;
export type DialogContentProps = DialogPrimitive.Popup.Props & {showCloseButton?: boolean};
export type DialogTitleProps = DialogPrimitive.Title.Props;
export type DialogDescriptionProps = DialogPrimitive.Description.Props;
