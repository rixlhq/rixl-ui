import {forwardRef, type ReactNode} from "react";
import {cn} from "../../lib/cn";
import {Button, type ButtonProps} from "../button";
import {Tooltip, type TooltipProps} from "../tooltip";

export type InputGroupButtonProps = ButtonProps & {
  /** Wraps the button in a `Tooltip`. A string also names the button when it has no `aria-label`. */
  tooltip?: ReactNode;
  /** @default "bottom" */
  tooltipSide?: TooltipProps["side"];
};

export const InputGroupButton = forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  ({className, type = "button", size = "sm", shape, tooltip, tooltipSide = "bottom", ...props}, ref) => {
    const button = (
      <Button
        ref={ref}
        data-slot="input-group-button"
        type={type}
        size={size}
        shape={shape}
        aria-label={typeof tooltip === "string" ? tooltip : undefined}
        className={cn("h-full shrink-0 rounded-sm", shape && shape !== "base" && "aspect-square w-auto", className)}
        {...props}
      />
    );
    return tooltip ? <Tooltip content={tooltip} side={tooltipSide} render={button} /> : button;
  }
);
InputGroupButton.displayName = "InputGroupButton";
