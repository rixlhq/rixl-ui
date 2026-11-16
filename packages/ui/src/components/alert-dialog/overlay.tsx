import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {cn} from "cn";

export type AlertDialogOverlayProps = AlertDialogPrimitive.Backdrop.Props;

export function AlertDialogOverlay({className, ...props}: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
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
