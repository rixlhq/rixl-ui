import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import type {VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {DialogPortal} from "./dialog-portal";
import {DialogOverlay, type DialogOverlayProps} from "./dialog-overlay";
import {dialogContentVariants} from "./dialog-variants";
import {useDialogRole} from "./use-dialog-role";
export type DialogContentProps = DialogPrimitive.Popup.Props &
  Omit<VariantProps<typeof dialogContentVariants>, "placement"> & {
    overlayProps?: DialogOverlayProps;
  };
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(({className, children, size, overlayProps, ...props}, ref) => {
  const role = useDialogRole();
  const placement = role === "alertdialog" ? "centered" : "responsive";
  return (
    <DialogPortal>
      <DialogOverlay {...overlayProps} />
      <DialogPrimitive.Popup
        ref={ref}
        data-slot="dialog-content"
        className={cn(dialogContentVariants({size, placement}), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";
