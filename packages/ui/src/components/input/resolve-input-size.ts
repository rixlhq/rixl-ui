import type {VariantProps} from "class-variance-authority";
import {inputVariants} from "./input-variants";

type InputSize = NonNullable<VariantProps<typeof inputVariants>["inputSize"]>;

/** Kumo-style size aliases resolved onto the `inputSize` scale. */
const sizeAliases = {xs: "sm", sm: "sm", base: "default", lg: "lg"} as const;
export type SizeAlias = keyof typeof sizeAliases;

export function resolveInputSize(inputSize: InputSize | null | undefined, size: SizeAlias | undefined): InputSize {
  return inputSize ?? (size ? sizeAliases[size] : undefined) ?? "default";
}

export type {InputSize};
