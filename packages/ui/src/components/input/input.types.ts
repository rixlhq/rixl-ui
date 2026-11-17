import type {ComponentProps, ReactNode} from "react";
import type {Input as InputPrimitive} from "@base-ui/react/input";
import type {VariantProps} from "class-variance-authority";
import type {FieldErrorProp} from "../field/field";
import {inputVariants} from "./input-variants";
import type {SizeAlias} from "./resolve-input-size";

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    /** Decorative or interactive node pinned to the leading edge (e.g. a search glyph). */
    startIcon?: ReactNode;
    /** Node pinned to the trailing edge (e.g. a password-visibility toggle). */
    endIcon?: ReactNode;
    /** className for the wrapper rendered when `startIcon`/`endIcon` are present. */
    wrapperClassName?: string;
    /** Label content (enables the built-in Field wrapper); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the input (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: FieldErrorProp;
    /** Kumo-style size alias; `inputSize` wins when both are set. */
    size?: SizeAlias;
    /** @deprecated Error styling now applies automatically when `error` is truthy. */
    variant?: "default" | "error";
    /** Opts non-credential fields out of password-manager overlays. */
    passwordManagerIgnore?: boolean;
    /** Base UI convenience handler receiving the value directly. */
    onValueChange?: ComponentProps<typeof InputPrimitive>["onValueChange"];
  };
