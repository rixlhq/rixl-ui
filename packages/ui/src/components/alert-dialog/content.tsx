import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {cn} from "cn";

import {AlertDialogOverlay} from "./overlay";

export type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props;

export function AlertDialogContent({className, ...props}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal">
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "bg-rixl-bg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-rixl-lg border-rixl-border border p-6 shadow-rixl-lg sm:max-w-lg",
          "max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain",
          "transition-[scale,opacity] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
          "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
          className
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}
