import * as React from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";

export type DialogTitleProps = DialogPrimitive.Title.Props;
export type DialogDescriptionProps = DialogPrimitive.Description.Props;

export function DialogHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex min-w-0 flex-col gap-2 text-center sm:text-start", className)} {...props} />;
}

export function DialogFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

export function DialogTitle({className, ...props}: DialogTitleProps) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} />;
}

export function DialogDescription({className, ...props}: DialogDescriptionProps) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />;
}
