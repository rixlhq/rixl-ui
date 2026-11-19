import type {ComponentProps, ReactNode} from "react";
import type {Input as InputPrimitive} from "@base-ui/react/input";
import type {VariantProps} from "class-variance-authority";
import type {InputErrorProp} from "./input-field-error";
import type {LabelLabels} from "../label/label-labels";
import {inputVariants} from "./input-variants";

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    /** Label content (enables the built-in field); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the input (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: InputErrorProp;
    /** Names the `labelTooltip` trigger, which is an icon-only button. The app supplies it; setting `labelTooltip` without it warns in development. */
    labelTooltipAriaLabel?: string;
    /** Overrides the field chrome copy (`optional`); each key falls back to `RixlLocaleProvider`, then English. */
    labels?: Partial<LabelLabels>;
    /** Opts non-credential fields out of password-manager overlays. */
    passwordManagerIgnore?: boolean;
    /** Base UI convenience handler receiving the value directly. */
    onValueChange?: ComponentProps<typeof InputPrimitive>["onValueChange"];
  };
