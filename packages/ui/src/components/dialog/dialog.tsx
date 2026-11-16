import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";

import {DialogContent, dialogContentVariants, type DialogContentProps} from "./content";
import {DialogDescription, DialogFooter, DialogHeader, DialogTitle, type DialogDescriptionProps, type DialogTitleProps} from "./layout";
import {DialogOverlay, type DialogOverlayProps} from "./overlay";

export function Dialog({...props}: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger({...props}: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal({...props}: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogClose({...props}: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, dialogContentVariants};
export type DialogProps = DialogPrimitive.Root.Props;
export type DialogTriggerProps = DialogPrimitive.Trigger.Props;
export type DialogPortalProps = DialogPrimitive.Portal.Props;
export type DialogCloseProps = DialogPrimitive.Close.Props;
export type {DialogContentProps, DialogDescriptionProps, DialogOverlayProps, DialogTitleProps};
