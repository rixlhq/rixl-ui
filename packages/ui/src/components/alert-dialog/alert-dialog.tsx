import * as React from "react";
import {AlertDialog as AlertDialogPrimitive} from "@base-ui-components/react/alert-dialog";
import {cn} from "cnfast";
import {Button} from "../button";

/**
 * Rixl AlertDialog — a modal confirmation surface.
 *
 * Ported from dashboard's shadcn AlertDialog (Base UI AlertDialog).
 * Composition mirrors Dialog but adds semantics:
 * - `<AlertDialog>` — root; modal with focus trap.
 * - `<AlertDialogTrigger>` — the anchor element.
 * - `<AlertDialogContent>` — portalled popup + auto backdrop.
 * - `<AlertDialogTitle>` / `<AlertDialogDescription>` — required
 *   accessible labelling.
 * - `<AlertDialogAction>` — a primary `<Button>` for the confirm action.
 * - `<AlertDialogCancel>` — an outline `<Button>` closing the dialog.
 *
 * Class names swapped to `--rixl-*` tokens; surface is `bg-rixl-bg`
 * with `border-rixl-border` and `shadow-rixl-lg`. Backdrop is a softer
 * `bg-black/50` than Dialog's.
 */
function AlertDialog({...props}: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({...props}: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({...props}: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({className, ...props}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({className, ...props}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "bg-rixl-bg data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-rixl-lg border-rixl-border border p-6 shadow-rixl-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="alert-dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />;
}

function AlertDialogFooter({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  );
}

function AlertDialogTitle({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("text-lg font-semibold", className)} {...props} />;
}

function AlertDialogDescription({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-rixl-fg-muted text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({className, ...props}: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size,
  ...props
}: AlertDialogPrimitive.Close.Props & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
export type AlertDialogProps = AlertDialogPrimitive.Root.Props;
export type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;
export type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props;
export type AlertDialogOverlayProps = AlertDialogPrimitive.Backdrop.Props;
export type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props;
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>;
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>;
export type AlertDialogActionProps = React.ComponentProps<typeof Button>;
export type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props & Pick<React.ComponentProps<typeof Button>, "variant" | "size">;
