import type {ReactElement, ReactNode} from "react";
import {cn} from "../../lib/cn";
import type {InputSize} from "./resolve-input-size";

const startInset: Record<InputSize, string> = {sm: "start-2.5", default: "start-3", lg: "start-3.5"};
const endInset: Record<InputSize, string> = {sm: "end-2.5", default: "end-3", lg: "end-3.5"};

const iconBase = cn(
  "absolute top-1/2 flex -translate-y-1/2 items-center text-rixl-fg-muted",
  "transition-colors duration-rixl-fast ease-rixl-out group-focus-within:text-rixl-fg",
  "[&_svg]:size-4 [&_svg]:shrink-0"
);

type InputIconGroupProps = {
  startIcon: ReactNode;
  endIcon: ReactNode;
  wrapperClassName: string | undefined;
  resolvedSize: InputSize;
  children: ReactElement;
};

/** The icon-in-field group; renders the control untouched when no icon is set. */
export function InputIconGroup({startIcon, endIcon, wrapperClassName, resolvedSize, children}: InputIconGroupProps) {
  if (!startIcon && !endIcon) return children;
  return (
    <div data-slot="input-wrapper" className={cn("group relative w-full", wrapperClassName)}>
      {/* Decorative by default: clicks fall through to the field. */}
      {startIcon ? (
        <span data-slot="input-start-icon" className={cn(iconBase, "pointer-events-none", startInset[resolvedSize])}>
          {startIcon}
        </span>
      ) : null}
      {children}
      {/* Interactive by default so a toggle/clear button inside it works. */}
      {endIcon ? (
        <span data-slot="input-end-icon" className={cn(iconBase, endInset[resolvedSize])}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}
