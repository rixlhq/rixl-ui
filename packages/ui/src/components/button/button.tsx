import {forwardRef, isValidElement} from "react";
import {Button as ButtonPrimitive} from "@base-ui/react/button";
import {cva, type VariantProps} from "class-variance-authority";
import {LoaderCircle} from "lucide-react";
import {cn} from "../../lib/cn";
import {focusRing, invalidRing, pressable} from "../../lib/classes";

/**
 * Rixl Button — the primary action primitive.
 *
 * Base UI's polymorphism (`render`, `nativeButton`) is preserved: pass
 * `render={<Link/>}` to render a styled anchor while keeping keyboard
 * semantics correct.
 */

/** Shadow collapses as the surface depresses, so it reads as pushed in rather than merely smaller. */
const pressShadow = "shadow-xs active:shadow-none";

const variantClasses = {
  default: cn("bg-rixl-primary text-rixl-primary-fg hover:bg-rixl-primary-hover active:bg-rixl-primary-active", pressShadow),
  destructive: cn(
    "bg-rixl-danger text-rixl-danger-fg hover:bg-rixl-danger-hover active:bg-rixl-danger-active focus-visible:ring-rixl-danger/20",
    pressShadow
  ),
  outline: cn(
    "border border-rixl-border bg-rixl-bg hover:bg-rixl-surface-muted hover:text-rixl-fg hover:border-rixl-border-strong active:bg-rixl-secondary-active",
    pressShadow
  ),
  secondary: cn("bg-rixl-secondary text-rixl-secondary-fg hover:bg-rixl-secondary-hover active:bg-rixl-secondary-active", pressShadow),
  ghost: "hover:bg-rixl-surface-muted hover:text-rixl-fg active:bg-rixl-secondary-active",
  // Inline text: scaling it against surrounding copy looks broken, so `link`
  // opts out of the press transform and signals with colour alone.
  link: "text-rixl-primary underline underline-offset-4 active:scale-100 active:text-rixl-primary-active",
} as const;

const buttonVariants = cva(
  cn(
    "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium select-none touch-manipulation",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none",
    focusRing,
    invalidRing,
    pressable
  ),
  {
    variants: {
      variant: variantClasses,
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        // Wider surface, shallower press: same ratio reads as more travel.
        lg: "h-10 px-6 has-[>svg]:px-4 active:scale-[var(--rixl-press-scale-lg)]",
        icon: "size-9",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  loading?: boolean;
};

function ButtonSpinner() {
  return <LoaderCircle data-slot="button-spinner" strokeWidth={2.5} className="size-4 animate-spin motion-reduce:animate-none" />;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, loading, disabled, nativeButton, render, children, ...props}, ref) => {
    // When rendered as a non-<button> element (e.g. render={<Link/>}), tell Base UI so it drops native button semantics.
    const isNativeButton = nativeButton ?? (isValidElement(render) ? render.type === "button" : true);
    // Falling back to `default` keeps a bare <Button> styled.
    const resolved: ButtonVariant = variant ?? "default";
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        data-loading={loading || undefined}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        nativeButton={isNativeButton}
        render={render}
        className={cn(buttonVariants({variant: resolved, size, className}))}
        {...props}
      >
        {loading && <ButtonSpinner />}
        {children}
      </ButtonPrimitive>
    );
  }
);
Button.displayName = "Button";

export {Button, buttonVariants};
