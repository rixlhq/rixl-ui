import {forwardRef, useContext} from "react";
import {cn} from "../../lib/cn";
import {InputControl, type InputControlProps} from "../input/input-control";
import {useWarnUnnamedInput} from "../input/use-warn-unnamed-input";
import {InputGroupContext} from "./input-group-context";

export type InputGroupInputProps = Omit<InputControlProps, "size" | "surface">;

/** The text input of an InputGroup: borderless, flexible, and sized, required and disabled by the group. */
export const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>(({className, required, disabled, ...props}, ref) => {
  const group = useContext(InputGroupContext);
  useWarnUnnamedInput({
    component: "InputGroupInput",
    label: group.labelled,
    ariaLabel: props["aria-label"],
    ariaLabelledBy: props["aria-labelledby"],
  });
  return (
    <InputControl
      ref={ref}
      data-slot="input-group-input"
      size={group.size}
      surface="bare"
      required={required ?? group.required}
      disabled={disabled ?? group.disabled}
      className={cn("h-full flex-1 px-2", className)}
      {...props}
    />
  );
});
InputGroupInput.displayName = "InputGroupInput";
