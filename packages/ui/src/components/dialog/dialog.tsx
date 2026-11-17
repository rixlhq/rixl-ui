import {createContext, useContext} from "react";
import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";

import {DialogContent, dialogContentVariants, type DialogContentProps} from "./content";
import {DialogDescription, DialogFooter, DialogHeader, DialogTitle, type DialogDescriptionProps, type DialogTitleProps} from "./layout";
import {DialogOverlay, type DialogOverlayProps} from "./overlay";

export type DialogRole = "dialog" | "alertdialog";

const DialogRoleContext = createContext<DialogRole>("dialog");

/** Which presentation the dialog parts render. Set by `Dialog role`, read by `DialogContent`. */
export function useDialogRole(): DialogRole {
  return useContext(DialogRoleContext);
}

export type DialogProps = DialogPrimitive.Root.Props & {
  /**
   * ARIA role of the popup. `alertdialog` renders Base UI AlertDialog
   * primitives under the hood: Base UI derives the role, forced modal state
   * and no pointer dismissal from the root mode, so one Root keeps axe
   * WCAG 2.2 AA clean without hand-rolled semantics. `modal`,
   * `disablePointerDismissal` and `handle` are dialog-only settings and are
   * dropped for `alertdialog` (alerts are always modal with explicit close).
   */
  role?: DialogRole;
};

export function Dialog({role = "dialog", ...props}: DialogProps) {
  if (role === "alertdialog") {
    const alertProps = {...props};
    delete alertProps.modal;
    delete alertProps.disablePointerDismissal;
    delete alertProps.handle;
    // The compiler can't know the stripped props match the alert root: the
    // two roots' `onOpenChange` details are structurally identical but
    // nominally distinct, and the dialog-only settings above don't exist on
    // the alert root (alerts are always modal with explicit close).
    return (
      <DialogRoleContext.Provider value="alertdialog">
        <AlertDialogPrimitive.Root data-slot="dialog" {...(alertProps as AlertDialogPrimitive.Root.Props)} />
      </DialogRoleContext.Provider>
    );
  }
  return (
    <DialogRoleContext.Provider value={role}>
      <DialogPrimitive.Root data-slot="dialog" {...props} />
    </DialogRoleContext.Provider>
  );
}

export type DialogTriggerProps = DialogPrimitive.Trigger.Props;

export function DialogTrigger({...props}: DialogTriggerProps) {
  // No role branch: Base UI's AlertDialogTrigger is the same component as
  // DialogTrigger (it only differs by its branded `handle` type), and the
  // trigger reads the alert semantics from the root store.
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal({...props}: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogClose({...props}: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, dialogContentVariants};
export type DialogPortalProps = DialogPrimitive.Portal.Props;
export type DialogCloseProps = DialogPrimitive.Close.Props;
export type {DialogContentProps, DialogDescriptionProps, DialogOverlayProps, DialogTitleProps};
