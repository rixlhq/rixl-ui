import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import type {VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {DialogPortal} from "./dialog-portal";
import {DialogOverlay, type DialogOverlayProps} from "./dialog-overlay";
import {DialogCloseButton, type DialogCloseButtonProps} from "./dialog-close-button";
import {dialogContentVariants, dialogContentSizeClasses, alertDialogContentClasses, dialogEdgeClasses} from "./dialog-variants";
import {useDialogRole} from "./use-dialog-role";
export type DialogContentProps = DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
    /** Slides the content in from an edge as a sheet instead of centering it. */
    side?: "top" | "right" | "bottom" | "left";
    closeButtonProps?: DialogCloseButtonProps;
    overlayProps?: DialogOverlayProps;
  };
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({className, children, size, showCloseButton, side, closeButtonProps, overlayProps, ...props}, ref) => {
    const role = useDialogRole();
    const showX = showCloseButton ?? role === "dialog";
    const centeredClasses =
      role === "alertdialog" ? cn(alertDialogContentClasses, dialogContentSizeClasses[size ?? "default"]) : dialogContentVariants({size});
    return (
      <DialogPortal>
        <DialogOverlay {...overlayProps} />
        <DialogPrimitive.Popup
          ref={ref}
          data-slot="dialog-content"
          data-side={side}
          className={cn(side ? dialogEdgeClasses : centeredClasses, showX && !side && "[&_[data-slot=dialog-header]]:pe-10", className)}
          {...props}
        >
          {children}
          {showX && <DialogCloseButton {...closeButtonProps} />}
        </DialogPrimitive.Popup>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";
