import {forwardRef, type ButtonHTMLAttributes, type ReactNode} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";

/**
 * Rixl Button — the primary action primitive.
 *
 * Design intent:
 * - Solid, quiet, or destructive intent expressed via `variant`.
 * - Size scale matches the rest of the system (sm | md | lg | icon).
 * - Renders a real <button>. For non-button triggers (e.g. an <a>
 *   styled like a button), apply `buttonVariants({variant, size})` to
 *   the target element directly — an `asChild` slot pattern will land
 *   with the next batch alongside a shared Slot primitive.
 *
 * Styling is 100% Tailwind classes resolving against @rixl/ui tokens
 * (see src/styles/preset.css). No third-party UI kit is layered on
 * top of this — the goal is a distinctly Rixl visual language.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium select-none",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-[--rixl-motion-fast] ease-[--rixl-ease-out]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rixl-ring focus-visible:ring-offset-2 focus-visible:ring-offset-rixl-bg",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-rixl-primary text-rixl-primary-fg hover:bg-rixl-primary-hover active:bg-rixl-primary-active shadow-rixl-xs",
        secondary: "bg-rixl-secondary text-rixl-secondary-fg hover:bg-rixl-secondary-hover shadow-rixl-xs",
        outline:
          "border border-rixl-border bg-rixl-surface text-rixl-fg hover:bg-rixl-surface-muted hover:border-rixl-border-strong shadow-rixl-xs",
        ghost: "text-rixl-fg hover:bg-rixl-surface-muted",
        destructive: "bg-rixl-danger text-rixl-danger-fg hover:bg-rixl-danger-hover shadow-rixl-xs",
        link: "text-rixl-primary underline-offset-4 hover:underline focus-visible:ring-offset-0",
      },
      size: {
        sm: "h-8 rounded-rixl-sm px-3 text-xs",
        md: "h-9 rounded-rixl-md px-4 text-sm",
        lg: "h-11 rounded-rixl-md px-6 text-sm",
        icon: "h-9 w-9 rounded-rixl-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * Show a loading state — disables interactions and hides the button's
   * label. Consumers can supply their own spinner via `loadingIcon`.
   */
  loading?: boolean;
  loadingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {className, variant, size, type = "button", loading = false, loadingIcon, disabled, children, ...rest},
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled ?? loading}
      data-loading={loading || undefined}
      className={cn(buttonVariants({variant, size}), className)}
      {...rest}
    >
      {loading ? (loadingIcon ?? <ButtonSpinner />) : null}
      {loading ? <span className="sr-only">Loading</span> : children}
    </button>
  );
});

function ButtonSpinner() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
