import {forwardRef} from "react";
import {cn} from "../../lib/cn";
import {Button, type ButtonProps} from "../button";

export const InputGroupButton = forwardRef<HTMLButtonElement, ButtonProps>(({className, type = "button", size = "sm", ...props}, ref) => (
  <Button
    ref={ref}
    data-slot="input-group-button"
    type={type}
    size={size}
    className={cn("h-full shrink-0 rounded-sm", size?.startsWith("icon") && "aspect-square w-auto", className)}
    {...props}
  />
));
InputGroupButton.displayName = "InputGroupButton";

export type InputGroupButtonProps = ButtonProps;
