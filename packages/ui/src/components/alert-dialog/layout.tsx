import * as React from "react";
import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {cn} from "cn";

export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>;
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>;

export function AlertDialogHeader({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-header" className={cn("flex min-w-0 flex-col gap-2 text-center sm:text-start", className)} {...props} />
  );
}

export function AlertDialogFooter({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  );
}

export function AlertDialogTitle({className, ...props}: AlertDialogTitleProps) {
  return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("text-lg font-semibold", className)} {...props} />;
}

export function AlertDialogDescription({className, ...props}: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-rixl-fg-muted text-sm", className)}
      {...props}
    />
  );
}
