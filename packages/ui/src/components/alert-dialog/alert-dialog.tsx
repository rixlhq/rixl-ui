import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";

import {AlertDialogAction, AlertDialogCancel, type AlertDialogActionProps, type AlertDialogCancelProps} from "./actions";
import {AlertDialogContent, type AlertDialogContentProps} from "./content";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  type AlertDialogDescriptionProps,
  type AlertDialogTitleProps,
} from "./layout";
import {AlertDialogOverlay, type AlertDialogOverlayProps} from "./overlay";

export function AlertDialog({...props}: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export function AlertDialogTrigger({...props}: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

export function AlertDialogPortal({...props}: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

export {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
};
export type AlertDialogProps = AlertDialogPrimitive.Root.Props;
export type AlertDialogTriggerProps = AlertDialogPrimitive.Trigger.Props;
export type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props;
export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogOverlayProps,
  AlertDialogTitleProps,
};
