import * as React from "react";
import {AlertDialog as AlertDialogPrimitive} from "@base-ui/react/alert-dialog";
import {cn} from "cn";

import {Button} from "../button";

export type AlertDialogActionProps = React.ComponentProps<typeof Button>;
export type AlertDialogCancelProps = AlertDialogPrimitive.Close.Props & Pick<React.ComponentProps<typeof Button>, "variant" | "size">;

export function AlertDialogAction({className, ...props}: AlertDialogActionProps) {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />;
}

export function AlertDialogCancel({className, variant = "outline", size, ...props}: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}
