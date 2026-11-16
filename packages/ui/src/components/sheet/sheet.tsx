import {Dialog as SheetPrimitive} from "@base-ui/react/dialog";

import {SheetContent, type SheetContentProps} from "./content";
import {SheetDescription, SheetFooter, SheetHeader, SheetTitle, type SheetDescriptionProps, type SheetTitleProps} from "./layout";
import type {SheetOverlayProps} from "./overlay";

export function Sheet({...props}: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export function SheetTrigger({...props}: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose({...props}: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export {SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle};
export type SheetProps = SheetPrimitive.Root.Props;
export type SheetTriggerProps = SheetPrimitive.Trigger.Props;
export type SheetCloseProps = SheetPrimitive.Close.Props;
export type SheetPortalProps = SheetPrimitive.Portal.Props;
export type {SheetContentProps, SheetDescriptionProps, SheetOverlayProps, SheetTitleProps};
