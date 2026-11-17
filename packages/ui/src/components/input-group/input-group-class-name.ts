import type {VariantProps} from "class-variance-authority";
import {cn} from "cn";
import {inputVariants, resolveInputSize} from "../input/input";

export function inputGroupClassName(
  inputSize: VariantProps<typeof inputVariants>["inputSize"],
  size: "xs" | "sm" | "base" | "lg" | undefined,
  className: string | undefined
) {
  return cn(
    inputVariants({inputSize: resolveInputSize(inputSize, size)}),
    "items-center gap-1.5 px-2.5 py-0",
    "has-[[data-slot=input]:focus-visible]:border-rixl-ring",
    "has-[[data-slot=input]:focus-visible]:ring-rixl-ring/50",
    "has-[[data-slot=input]:focus-visible]:ring-[3px]",
    "has-[[data-slot=input][aria-invalid=true]]:border-rixl-danger",
    "has-[[data-slot=input][aria-invalid=true]]:bg-rixl-danger/10",
    "has-[[data-slot=input][aria-invalid=true]]:ring-rixl-danger/20",
    "has-[[data-slot=input][aria-invalid=true]]:ring-[3px]",
    "has-[[data-slot=input][aria-invalid=true]]:hover:border-rixl-danger",
    "has-[[data-slot=input]:disabled]:opacity-50",
    "[&_[data-slot=input]]:h-full",
    "[&_[data-slot=input]]:flex-1",
    "[&_[data-slot=input]]:rounded-none",
    "[&_[data-slot=input]]:border-0",
    "[&_[data-slot=input]]:bg-transparent",
    "[&_[data-slot=input]]:px-0",
    "[&_[data-slot=input]]:shadow-none",
    "[&_[data-slot=input]]:focus-visible:ring-0",
    "[&_[data-slot=input-wrapper]]:h-full",
    "[&_[data-slot=input-wrapper]]:flex-1",
    className
  );
}
