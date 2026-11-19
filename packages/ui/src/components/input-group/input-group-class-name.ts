import type {VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {inputVariants} from "../input/input-variants";

export function inputGroupClassName(size: VariantProps<typeof inputVariants>["size"], className: string | undefined) {
  return cn(
    inputVariants({size}),
    // An even 2px inset on every side, so an edge button sits as far from the
    // end as from the top and bottom; children own the inner spacing.
    "items-center gap-0 p-0.5",
    "has-[[data-slot=input-group-input]:focus-visible]:border-rixl-ring",
    "has-[[data-slot=input-group-input]:focus-visible]:ring-rixl-ring/50",
    "has-[[data-slot=input-group-input]:focus-visible]:ring-[3px]",
    "has-[[data-slot=input-group-input][aria-invalid=true]]:border-rixl-danger",
    "has-[[data-slot=input-group-input][aria-invalid=true]]:bg-rixl-danger/10",
    "has-[[data-slot=input-group-input][aria-invalid=true]]:ring-rixl-danger/20",
    "has-[[data-slot=input-group-input][aria-invalid=true]]:ring-[3px]",
    "has-[[data-slot=input-group-input][aria-invalid=true]]:hover:border-rixl-danger",
    "has-[[data-slot=input-group-input]:disabled]:opacity-50",
    className
  );
}
