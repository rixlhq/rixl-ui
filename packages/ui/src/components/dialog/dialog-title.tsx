import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";
export type DialogTitleProps = DialogPrimitive.Title.Props;
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({className, ...props}, ref) => (
  <DialogPrimitive.Title ref={ref} data-slot="dialog-title" className={cn("text-lg leading-none font-semibold", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";
