import {forwardRef, type ComponentProps} from "react";
import {Input as InputPrimitive} from "@base-ui/react/input";
import {cn} from "cn";
import {inputVariants} from "./input-variants";
import type {InputSize} from "./resolve-input-size";

const startPad: Record<InputSize, string> = {sm: "ps-8", default: "ps-9", lg: "ps-10"};
const endPad: Record<InputSize, string> = {sm: "pe-8", default: "pe-9", lg: "pe-10"};
const passwordManagerAttributes = {
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
  "data-lpignore": "true",
} as const;

type InputControlProps = {
  type: ComponentProps<"input">["type"];
  required: boolean | undefined;
  onValueChange: ComponentProps<typeof InputPrimitive>["onValueChange"];
  invalid: boolean | undefined;
  resolvedSize: InputSize;
  paddedStart: boolean;
  paddedEnd: boolean;
  passwordManagerIgnore: boolean | undefined;
  className: string | undefined;
  rest: ComponentProps<"input">;
};

/** The bare `<input>` itself; ref always lands here, with or without the Field. */
export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({type, required, onValueChange, invalid, resolvedSize, paddedStart, paddedEnd, passwordManagerIgnore, className, rest}, ref) => (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      required={required}
      onValueChange={onValueChange}
      aria-invalid={invalid}
      className={cn(
        inputVariants({inputSize: resolvedSize}),
        paddedStart && startPad[resolvedSize],
        paddedEnd && endPad[resolvedSize],
        passwordManagerIgnore && "keeper-ignore",
        className
      )}
      {...(passwordManagerIgnore ? passwordManagerAttributes : null)}
      {...rest}
    />
  )
);
InputControl.displayName = "InputControl";
