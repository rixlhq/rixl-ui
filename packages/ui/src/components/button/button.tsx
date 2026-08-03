import {isValidElement} from "react";
import {Button as ButtonPrimitive} from "@base-ui-components/react/button";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";

/**
 * Rixl Button — the primary action primitive.
 *
 * Ported from dashboard's shadcn Button (Base UI + cva). Class names
 * mapped to `--rixl-*` tokens; variant and size names preserved
 * verbatim so downstream call sites in dashboard/landing/docs migrate
 * one-for-one.
 *
 * Base UI's polymorphism (`render`, `nativeButton`) is preserved: pass
 * `render={<Link/>}` to render a styled anchor while keeping keyboard
 * semantics correct.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-between gap-2 whitespace-nowrap",
    "font-medium select-none",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-[--rixl-motion-fast] ease-[--rixl-ease-out]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rixl-ring focus-visible:ring-offset-2 focus-visible:ring-offset-rixl-bg",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-rixl-primary text-rixl-primary-fg shadow-rixl-xs hover:bg-rixl-primary-hover",
        destructive: "bg-rixl-danger text-rixl-danger-fg shadow-rixl-xs hover:bg-rixl-danger-hover focus-visible:ring-rixl-danger/20",
        outline: "border border-rixl-border bg-rixl-bg shadow-rixl-xs hover:bg-rixl-surface-muted hover:text-rixl-fg",
        secondary: "bg-rixl-secondary text-rixl-secondary-fg shadow-rixl-xs hover:bg-rixl-secondary-hover",
        ghost: "hover:bg-rixl-surface-muted hover:text-rixl-fg",
        link: "text-rixl-primary underline underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-rixl-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-rixl-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({className, variant, size, nativeButton, render, ...props}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  // When rendered as a non-<button> element (e.g. render={<Link/>}), tell Base UI so it drops native button semantics.
  const isNativeButton = nativeButton ?? (isValidElement(render) ? render.type === "button" : true);
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={isNativeButton}
      render={render}
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    />
  );
}

export {Button, buttonVariants};
export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;
