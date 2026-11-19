import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "../../lib/cn";
export type DialogOverlayProps = DialogPrimitive.Backdrop.Props;
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(({className, ...props}, ref) => (
  <DialogPrimitive.Backdrop
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-rixl-overlay backdrop-blur-sm transition-opacity duration-(--rixl-motion-base) data-ending-style:duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none data-starting-style:opacity-0 data-ending-style:opacity-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";
