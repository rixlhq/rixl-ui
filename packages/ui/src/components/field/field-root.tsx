import {forwardRef} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {cn} from "../../lib/cn";
import {FieldContext} from "./field-context";

export const FieldRoot = forwardRef<HTMLDivElement, FieldPrimitive.Root.Props>(({className, ...props}, ref) => (
  <FieldContext.Provider value={true}>
    <FieldPrimitive.Root ref={ref} data-slot="field" className={cn("flex w-full flex-col gap-1.5", className)} {...props} />
  </FieldContext.Provider>
));
FieldRoot.displayName = "FieldRoot";
export type FieldRootProps = FieldPrimitive.Root.Props;
export type FieldRootActions = FieldPrimitive.Root.Actions;
