import * as React from "react";
import {Dialog as SheetPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";

export type SheetTitleProps = SheetPrimitive.Title.Props;
export type SheetDescriptionProps = SheetPrimitive.Description.Props;

export function SheetHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex min-w-0 flex-col gap-1.5 p-4 pe-16", className)} {...props} />;
}

export function SheetFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}

export function SheetTitle({className, ...props}: SheetTitleProps) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("text-rixl-fg font-semibold", className)} {...props} />;
}

export function SheetDescription({className, ...props}: SheetDescriptionProps) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn("text-rixl-fg-muted text-sm", className)} {...props} />;
}
