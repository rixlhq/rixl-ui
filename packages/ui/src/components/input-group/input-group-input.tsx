import {forwardRef, useContext} from "react";
import {cn} from "../../lib/cn";
import {InputControl, type InputControlProps} from "../input/input-control";
import {warnInputProps} from "../input/warn-input-props";
import {InputGroupContext} from "./input-group-context";

export type InputGroupInputProps = Omit<InputControlProps, "inputSize" | "size">;

/** The text input of an InputGroup: borderless, flexible, and sized, required and disabled by the group. */
export const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>(({className, required, disabled, ...props}, ref) => {
  const group = useContext(InputGroupContext);
  warnInputProps({
    component: "InputGroupInput",
    label: group.labelled,
    ariaLabel: props["aria-label"],
    ariaLabelledBy: props["aria-labelledby"],
  });
  return (
    <InputControl
      ref={ref}
      data-slot="input-group-input"
      inputSize={group.inputSize}
      required={required ?? group.required}
      disabled={disabled ?? group.disabled}
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent px-0 shadow-none",
        "focus-visible:ring-0 aria-invalid:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";
