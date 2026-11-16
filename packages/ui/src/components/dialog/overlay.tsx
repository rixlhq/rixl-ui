import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";

export type DialogOverlayProps = DialogPrimitive.Backdrop.Props;

export function DialogOverlay({className, ...props}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-rixl-base ease-rixl-out motion-reduce:transition-none",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}
