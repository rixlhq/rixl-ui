import {forwardRef} from "react";
import {cn} from "cn";
import {Button, type ButtonProps} from "../button";

export const InputGroupButton = forwardRef<HTMLButtonElement, ButtonProps>(({className, type = "button", size = "sm", ...props}, ref) => (
  <Button ref={ref} data-slot="input-group-button" type={type} size={size} className={cn("shrink-0", className)} {...props} />
));
InputGroupButton.displayName = "InputGroupButton";

export type InputGroupButtonProps = ButtonProps;
