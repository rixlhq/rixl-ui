import {forwardRef, type ComponentProps} from "react";
import type {VariantProps} from "class-variance-authority";
import {Input as InputPrimitive} from "@base-ui/react/input";
import {cn} from "../../lib/cn";
import {inputVariants} from "./input-variants";

const passwordManagerAttributes = {
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
  "data-lpignore": "true",
} as const;

export type InputControlProps = Omit<ComponentProps<typeof InputPrimitive>, "size"> &
  VariantProps<typeof inputVariants> & {
    /** Opts non-credential fields out of password-manager overlays. */
    passwordManagerIgnore?: boolean;
  };

/** The bare Base UI `<input>` shared by Input and InputGroupInput. */
export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(({size, passwordManagerIgnore, className, ...props}, ref) => (
  <InputPrimitive
    ref={ref}
    data-slot="input"
    className={cn(inputVariants({size}), passwordManagerIgnore && "keeper-ignore", className)}
    {...(passwordManagerIgnore ? passwordManagerAttributes : null)}
    {...props}
  />
));
InputControl.displayName = "InputControl";
